var citySearchListEl = document.querySelector("#citySearchList");
var searchButton = document.querySelector("#search-button");
var forecastFull = [];
var cityList = [];
var cityInputVal = "";
var cityListVal = "";

// Renders the set of buttons for the cities recently searched from the array
function renderCityList() {
  citySearchListEl.innerHTML = "";
  for (var i = 0; i < cityList.length; i++) {
    var citySearch = cityList[i];
    var newButton = document.createElement("button");
    newButton.classList.add("btn-block");
    newButton.textContent = citySearch;
    newButton.value = citySearch;
    citySearchListEl.appendChild(newButton);
    newButton.addEventListener("click", function (event) {
      handleSearch(event);
    });
  }
}

// Stores the searched city to local storage
function storeCities() {
  localStorage.setItem("cityList", JSON.stringify(cityList));
}

// Init function when page is loaded, pulls recent searches from local storage and renders the city list
function init() {
  var storedRecentSearches = JSON.parse(localStorage.getItem("cityList"));
  if (storedRecentSearches !== null) {
    cityList = storedRecentSearches;
    renderCityList();
  }
  searchButton.addEventListener("click", function (event) {
    handleSearch(event);
  });
}

// Populates the forecast cards
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

// Handles searching for a city in the API from the text search or from the recent search buttons
function handleSearch(event) {
  event.preventDefault();
  var buttonClicked = event.target;
  cityListVal = buttonClicked.value;
  cityInputVal = $(".city-input-text").val();

  if (cityInputVal === "" && cityListVal === "") {
    return;
  }
  (async function () {
    try {
      var coordSearch = "";
      if (cityListVal) {
        coordSearch = await fetch(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            cityListVal +
            "&units=imperial&appid=7e84530e4048780b769d94acf3761dbf"
        );
      } else {
        coordSearch = await fetch(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            cityInputVal +
            "&units=imperial&appid=7e84530e4048780b769d94acf3761dbf"
        );
      }

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
      $(".city-input-text").val("");
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
}

// Init function called when page is loaded
init();
