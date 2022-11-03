var cityInputVal = "";
var searchButtonEl = $("#search-button");

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
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
});
