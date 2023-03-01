// an acquired API key to use OpenWeather API
var APIKey = '5d2d2bb20c65ab0c48043cb7483bf366';
// to collect user input for the city name and store it in a variable
var city;
// use string concatenation to create the queryURL variable, which will store the
// OpenWeather Current Weather Data URL and the necessary variables
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// to call the Fetch API to pass the query URL in as a parameter
fetch(queryURL)