var cityInputVal = "";
var searchButtonEl = $("#search-button");
var forecastDay1 = "";
var forecastDay2 = "";
var forecastDay3 = "";
var forecastDay4 = "";
var forecastDay5 = "";
var forecastDay6 = "";

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
      const forecastSearch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordSearchData.coord.lat}&lon=${coordSearchData.coord.lon}&appid=7e84530e4048780b769d94acf3761dbf`
      );
      const forecastSearchData = await forecastSearch.json();
      console.log(forecastSearchData);
      forecastDay1 = forecastSearchData.list[0];
      forecastDay2 = forecastSearchData.list[7];
      forecastDay3 = forecastSearchData.list[15];
      forecastDay4 = forecastSearchData.list[23];
      forecastDay5 = forecastSearchData.list[31];
      forecastDay6 = forecastSearchData.list[39];
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
});

