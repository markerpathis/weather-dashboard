var cityInputVal = "";
var forecastFull = [];
var cityList = [];

$("button").on("click", function (event) {
  event.preventDefault();
  cityInputVal = $("#city-input").val();
  console.log(cityInputVal);
  if (cityInputVal === "") {
    return;
  }
  (async function () {
    try {
      const coordSearch = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          cityInputVal +
          "&units=imperial&appid=7e84530e4048780b769d94acf3761dbf"
      );
      const coordSearchData = await coordSearch.json();
      forecastFull[0] = coordSearchData;
      const forecastSearch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordSearchData.coord.lat}&lon=${coordSearchData.coord.lon}&units=imperial&appid=7e84530e4048780b769d94acf3761dbf`
      );
      const forecastSearchData = await forecastSearch.json();
      console.log(forecastSearchData);
      forecastFull[1] = forecastSearchData.list[6];
      forecastFull[2] = forecastSearchData.list[14];
      forecastFull[3] = forecastSearchData.list[22];
      forecastFull[4] = forecastSearchData.list[30];
      forecastFull[5] = forecastSearchData.list[38];
      console.log(forecastFull);

      // Loop to populate the current forecast and five day forecast sections
      populateCards();

      cityList.push(cityInputVal);
      storeCities();
    
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
});

function init() {}

function populateCards() {
  for (var i = 0; i < forecastFull.length; i++) {
    $("#city-name").text(cityInputVal);
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

function storeCities() {
  localStorage.setItem("cityList", JSON.stringify(cityList));
}


