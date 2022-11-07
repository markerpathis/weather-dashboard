var cityInputVal = "";
var searchButtonEl = $("#search-button");
var forecastDay1 = "";
var forecastDay2 = "";
var forecastDay3 = "";
var forecastDay4 = "";
var forecastDay5 = "";
var forecastDay6 = "";
// var forecastIconsEl = document.querySelectorAll(".forecast-icons");

var forecastFull = [
  {
    name: "day-current",
    list: 0,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-one",
    list: 7,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-two",
    list: 15,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-three",
    list: 23,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-four",
    list: 31,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-five",
    list: 39,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
];

searchButtonEl.on("click", function (event) {
  event.preventDefault();
  cityInputVal = $("#city-input").val();
  console.log(cityInputVal);

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
      forecastFull[1] = forecastSearchData.list[0];
      forecastFull[2] = forecastSearchData.list[8];
      forecastFull[3] = forecastSearchData.list[16];
      forecastFull[4] = forecastSearchData.list[24];
      forecastFull[5] = forecastSearchData.list[32];
      console.log(forecastFull);
      // DATE
      $("#forecast-0-date").text(forecastFull[0].dt);
      $("#forecast-1-date").text(forecastFull[1].dt);
      $("#forecast-2-date").text(forecastFull[2].dt);
      $("#forecast-3-date").text(forecastFull[3].dt);
      $("#forecast-4-date").text(forecastFull[4].dt);
      $("#forecast-5-date").text(forecastFull[5].dt);
      // ICONS
      var forecastIconsEl = document.querySelectorAll(".forecast-icons");

      for (var i = 0; i < forecastIconsEl.length; i++) {
        forecastIconsEl[i].setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            forecastFull[i].weather[0].icon +
            ".png"
        );
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

      // for (var i = 0; i < forecastFull.length; i++) {
      //   var unixFormat = moment.unix(forecastFull[i].dt).format("MM/DD/YYYY");
      //   console.log(unixFormat);
      // }
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
});
