// an acquired API key to use OpenWeather API
var APIKey = '5d2d2bb20c65ab0c48043cb7483bf366';
// date format
var today = dayjs();
var date = today.format('M/DD/YYYY');
// search city weather
var searchBtn = $('.btn search');
var searchForm = $('#search-form');
// Weather information displayed on the right of the webpage
var weatherInfo = $('.weather-info');
// current weather
var currentDate = $('#current-date');
var currentTemp = $('#current-temp');
var currentWind = $('#current-wind');
var currentHumidity = $('#current-humidity');
// search list
var searchList = $('#search-list');
// search list item
var cities = [];

// hide the container of weather information when first loading the page
weatherInfo.hide();

// searchBtnHandler
var searchFormHandler = function(event){
  event.preventDefault();

  // if click/submit search form, collect user input for the city name
  // jQuery uses .is; js uses .matches
  if($(this).is('#search-form')){
    var city = $('#search-city').val();
  // if click search-item button, use city name of the button
  }else{
    var city = $(this).text();
  }
  
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
      // current weather information
      currentTemp.text('Temp: ' + currentTempData + ' ℉');
      currentWind.text('Wind: ' + currentWindData + ' MPH');
      currentHumidity.text('Humidity: ' + currentHumidityData + '%');

    // display future 5-day weather information
    var weatherForecast = function(){
      var queryForecastURL ='http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
      fetch(queryForecastURL)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        console.log(data); 

        for(var i=1; i<6; i++){
          // display future 5-day date
          var futureDate = today.add(i, 'day').format('M/DD/YYYY');
          $('#' + i).children('.date').text(futureDate);

          // select UTC 15:00 as the representative
          var index = i*8-1;
          // display icons for weather forecast
          var futureIcon = data.list[index].weather[0].icon;
          var futureIconURL = 'http://openweathermap.org/img/wn/' + futureIcon + '@2x.png';
          $('#' + i).children('.icon').attr('src', futureIconURL);
          // display weather forecast information
          $('#' + i).children('.temp').text('Temp: ' + data.list[index].main.temp + ' ℉');
          $('#' + i).children('.wind').text('Wind: ' + data.list[index].wind.speed + ' MPH');
          $('#' + i).children('.humidity').text('Humidity: ' + data.list[index].main.humidity + '%');
        };
      })    
    }

    weatherForecast();

    // when submit the search form, show weather information on the right
    weatherInfo.show();

    // show search items in a list
    function renderCities() {
      // jQuery uses .html(''); js uses .innerHTML=''
      searchList.html('');
      cities = JSON.parse(localStorage.getItem('cities'));
  
      for (var i = 0; i < cities.length; i++) {
        // create a clickable button for each city in the search list
        var searchListBtn = $('<button>');
        searchListBtn.addClass('btn search-item');
        searchListBtn.text(cities[i]);
        searchList.append(searchListBtn);
        // Add an event listenr to each of the search list buttons('submit'only works with form)
        searchListBtn.on('click', searchFormHandler);
      }
    }
    // store search items in local storage
    function storeCities() {
      localStorage.setItem('cities', JSON.stringify(cities));
    }

    // get search items from local storage. Include ||[] for when cities is an empty array
    cities = JSON.parse(localStorage.getItem('cities'))||[];

    // if a city already exist in the local storage, do not store it again
    if (!cities.includes(city)){
      cities.push(city);
      storeCities();
    }
    renderCities();
    // clear input area
    $('#search-city').val('');
    });
  });
}

// Add an event listenr to the searchForm
searchForm.on('submit', searchFormHandler);

//$(document).ready(searchFormHandler);
// adjust flexbox


