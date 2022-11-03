var searchFormEl = $("#search-form");

function handleSearchSubmit(event) {
  event.preventDefault();

  var cityInputVal = $("#city-input");
  if (!cityInputVal) {
    return;
  }
}

var requestUrl =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=7e84530e4048780b769d94acf3761dbf";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
