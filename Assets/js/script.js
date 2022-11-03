var searchFormEl = $("#search-form");
var cityInputVal = "";
var searchButtonEl = $("#search-button");

searchButtonEl.on("click", function (event) {
  event.preventDefault();
  cityInputVal = $("#city-input").val();
  console.log(cityInputVal);
});

var requestUrl =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=7e84530e4048780b769d94acf3761dbf";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
