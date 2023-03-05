// an acquired API key to use OpenWeather API
var APIKey = '5d2d2bb20c65ab0c48043cb7483bf366';
// date format
var today = dayjs();
var date = today.format('M/DD/YYYY');
console.log(date);
// search city weather
var searchBtn = '.btn search';
// current weather
var currentDate = $('#current-date');
var currentTemp = $('#current-temp');
var currentWind = $('#current-wind');
var currentHumidity = $('#current-humidity');
// to collect user input for the city name and store it in a variable
var city = $('#search-city').val();
// Using Geocoding API, convert a city name into the exact geographical coordinates
var queryGeoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;

fetch(queryGeoURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;

    // Call for current weather data
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;

    fetch(queryURL)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      currentData.text(city + '(' + dayjs + ')')
    });
  });

searchBtn.click(searchBtnHandler);

