var cityInputVal = "";
var searchButtonEl = $("#search-button");
var forecastDay1 = "";
var forecastDay2 = "";
var forecastDay3 = "";
var forecastDay4 = "";
var forecastDay5 = "";
var forecastDay6 = "";

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
          "&appid=7e84530e4048780b769d94acf3761dbf"
      );
      const coordSearchData = await coordSearch.json();
      forecastFull[0] = coordSearchData;
      const forecastSearch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordSearchData.coord.lat}&lon=${coordSearchData.coord.lon}&appid=7e84530e4048780b769d94acf3761dbf`
      );
      const forecastSearchData = await forecastSearch.json();
      console.log(forecastSearchData);
      forecastFull[1] = forecastSearchData.list[0];
      forecastFull[2] = forecastSearchData.list[8];
      forecastFull[3] = forecastSearchData.list[16];
      forecastFull[4] = forecastSearchData.list[24];
      forecastFull[5] = forecastSearchData.list[32];
      console.log(forecastFull);
      // for (var i = 0; i < forecast.length; i++) {
      //   forecast[i].date = forecastSearchData.list
      // }
      // return;
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
});
