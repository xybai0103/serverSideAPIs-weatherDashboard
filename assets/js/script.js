// an acquired API key to use OpenWeather API
var APIKey = '5d2d2bb20c65ab0c48043cb7483bf366';
// date format
var today = dayjs();
var date = today.format('M/DD/YYYY');
// search city weather
var searchBtn = $('.btn search');
var searchForm = $('#search-form');
// current weather
var currentDate = $('#current-date');
var currentTemp = $('#current-temp');
var currentWind = $('#current-wind');
var currentHumidity = $('#current-humidity');


// searchBtnHandler
var searchFormHandler = function(event){
  event.preventDefault();
  
  // to collect user input for the city name and store it in a variable
  var city = $('#search-city').val();

  // Using Geocoding API, convert a city name into the exact geographical coordinates
  var queryGeoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;

  fetch(queryGeoURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
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
      var currentTempData = data.main.temp;
      var currentWindData = data.wind.speed;
      var currentHumidityData = data.main.humidity;
      // get the icon code
      var currentIcon = data.weather[0].icon;
      // Set the icon using an <img> tag with the icon URL
      var iconURL = 'http://openweathermap.org/img/wn/' + currentIcon + '@2x.png';
      var iconImg = $('<img>');
      iconImg.attr('src', iconURL);
      currentDate.text(city + '(' + date + ')');
      currentDate.append(iconImg);

      currentTemp.text('Temp: ' + currentTempData + '℉');
      currentWind.text('Wind: ' + currentWindData + ' MPH');
      currentHumidity.text('Humidity: ' + currentHumidityData + '%');
    });
  });
}

searchForm.on('submit', searchFormHandler);

