var cityInputVal = "";
var citySearchListEl = document.querySelector("#citySearchList");
var buttonsEl = document.getElementsByClassName("city-input-button");
var forecastFull = [];
var cityList = [];

function renderCityList() {
  citySearchListEl.innerHTML = "";
  for (var i = 0; i < cityList.length; i++) {
    var citySearch = cityList[i];
    var newButton = document.createElement("button");
    newButton.classList.add("city-input-button");
    newButton.classList.add("btn-block");
    newButton.textContent = citySearch;
    newButton.style.display = "block";
    newButton.value = citySearch;
    citySearchListEl.appendChild(newButton);
  }
}

function storeCities() {
  localStorage.setItem("cityList", JSON.stringify(cityList));
}

function init() {
  var storedRecentSearches = JSON.parse(localStorage.getItem("cityList"));
  if (storedRecentSearches !== null) {
    cityList = storedRecentSearches;
  }
  renderCityList();
}

function populateCards() {
  for (var i = 0; i < forecastFull.length; i++) {
    if (cityInputVal === "") {
      $("#city-name").text(cityListVal);
    } else {
      $("#city-name").text(cityInputVal);
    }
    $(".forecast-date").each(function (i) {
      const unixFormat = moment
        .unix(forecastFull[i].dt)
        .local()
        .format("MM/DD/YYYY");
      $(this).text(unixFormat);
    });
    $(".forecast-icons").each(function (i) {
      $(this).attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[i].weather[0].icon +
          ".png"
      );
    });
    $(".forecast-temps").each(function (i) {
      $(this).text("Temp: " + forecastFull[i].main.temp + " ℉");
    });
    $(".forecast-wind").each(function (i) {
      $(this).text("Wind: " + forecastFull[i].wind.speed + " MPH");
    });
    $(".forecast-humid").each(function (i) {
      $(this).text("Humidity: " + forecastFull[i].main.humidity + " %");
    });
  }
}

init();

for (var i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", function (event) {
    event.preventDefault();
    var buttonClicked = event.target;
    cityListVal = buttonClicked.value;
    cityInputVal = $(".city-input-text").val();
    if (cityInputVal === "" && cityListVal === "") {
      return;
    }
    (async function () {
      try {
        const coordSearch = await fetch(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            cityInputVal +
            cityListVal +
            "&units=imperial&appid=7e84530e4048780b769d94acf3761dbf"
        );
        const coordSearchData = await coordSearch.json();
        forecastFull[0] = coordSearchData;
        const forecastSearch = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordSearchData.coord.lat}&lon=${coordSearchData.coord.lon}&units=imperial&appid=7e84530e4048780b769d94acf3761dbf`
        );
        const forecastSearchData = await forecastSearch.json();
        forecastFull[1] = forecastSearchData.list[6];
        forecastFull[2] = forecastSearchData.list[14];
        forecastFull[3] = forecastSearchData.list[22];
        forecastFull[4] = forecastSearchData.list[30];
        forecastFull[5] = forecastSearchData.list[38];

        // Loop to populate the current forecast and five day forecast sections
        populateCards();
        if (cityInputVal !== "") {
          cityList.push(cityInputVal);
          storeCities();
          renderCityList();
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    })();
  });
}
