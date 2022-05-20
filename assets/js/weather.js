var name;
var local_names;
var lat;
var lon;
var state;
var country;

var geoData;
var cityComp;

var formSubmitHandler = function (weather) {
  weather.preventDefault();

  var name = nameInputEl.value.trim();

  if (name) {
    getWeather(weather);
    weatherInputEl.value = "";
  }
};

// OpenWeather Weather API
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//&exclude is optional

//        https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=ed7ad3517cceea24f5ddf34da86b3e00

// OpenWeather Direct Geocoding API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// &limit is optional

//        http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=ed7ad3517cceea24f5ddf34da86b3e00

var getWeather = function (weather) {
  var weatherApi =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    // lat +
    "39.9812" +
    "&lon=" +
    // lon +
    "82.9988" +
    "&units=imperial&appid=ed7ad3517cceea24f5ddf34da86b3e00";

  fetch(weatherApi)
    .then(function (response) {
      if (!response.ok) {
        throw alert("Error retrieving data, please try again");
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getWeatherReport(data);
    });
};
function getWeatherReport(weatherData) {
  console.log(weatherData);
  var weatherDesc = weatherData.daily[0].weather[0].description;
  weatherDesc = weatherDesc.toLowerCase();
  var temp = weatherData.daily[0].temp.eve;
  // add temp and weatherDesc to the cards
}

// var getCity = function () {
//   var geoApi =
//     "http://api.openweathermap.org/geo/1.0/direct?q=" +
//     // cityComp +
//     "New York" +
//     "&appid=ed7ad3517cceea24f5ddf34da86b3e00";

//   fetch(geoApi)
//     .then(function (response) {
//       if (!response.ok) {
//         throw alert("Error retrieving data, please try again");
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       lon = data.lon;
//       lat = data.lat;
//       cityComp = data.name;
//       console.log(cityComp);
//       console.log(lon);
//       console.log(lat);
//     });
// };

getWeather();
