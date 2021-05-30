let currentCityNameInfo;
let weatherInfo;
const WEEKDAYS_NAMES = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato"
];

function getBgImage(id) {
  let classBg;
  if (id >= 200 && id < 300) {
    classBg = "thunder";
  } else if (id >= 300 && id < 600) {
    classBg = "rain";
  } else if (id >= 600 && id < 700) {
    classBg = "snow";
  } else if (id >= 700 && id < 800) {
    classBg = "mist";
  } else if (id === 800) {
    classBg = "clear";
  } else if (id > 800) {
    classBg = "clouds";
  }
  return classBg;
}

function generateGui() {
  $("#city-name").append(`<h1> ${currentCityNameInfo}</h1>`);
  $("#current").append(
    `<div class="d-flex mx-auto mt-2 mb-5"><h1 class="mr-2">${weatherInfo.current.temp}&#x2103;</h1> <h2 class="capitalize ">${weatherInfo.current.weather.description}</h2><div>`
  );
  let classBg = getBgImage(weatherInfo.current.weather.id);
  $("#main-card").addClass(classBg);
  let currentDay = new Date().getDay();
  $("#current").after(
    "<h2 class='my-5'>Previsioni per i prossimi giorni:</h2>"
  );
  for (let i = 1; i < 7; i++) {
    currentDay < 7 ? currentDay++ : (currentDay = 0);

    const dayName = WEEKDAYS_NAMES[currentDay];
    const currentWeather = weatherInfo.daily[i].weather;
    const currentTemp = weatherInfo.daily[i].temp;

    $("#next-days-info").append(
      `<div class="card col-7 col-xl-2 mb-2 ratio ${getBgImage(
        currentWeather.id
      )}"> <h4>${dayName}</h4> <div class="flex"> <h3 class="mr-2">${
        currentTemp.max
      }&#x2103; - ${currentTemp.min}&#x2103;</h3> <h5 class="capitalize">${
        currentWeather.description
      }</h5> </div> </div>`
    );
  }

//   const boxW = $(".ratio").width();
//   $(".ratio").css({ height: boxW + "px" });
}
function fetchData(lat, long) {
  $.ajax({
    accept: "application/json",
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}8&lon=${long}&units=metric&exclude=minutely&lang=it&appid=${CONFIG.weatherAPIKey}`
  }).done(val => {
    weatherInfo = new WeatherAPIObject(val);
    console.log(weatherInfo);
    $(".loader").hide();
    generateGui();
  });
}
function getReverseGeocodingData(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: latlng }, function(results, status) {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      const city = `${results[0].address_components[2].long_name}, ${results[0].address_components[5].long_name}, ${results[0].address_components[6].long_name}`;
      currentCityNameInfo = city;
      fetchData(lat, lng);
    }
  });
}
$(".loader").show();
navigator.geolocation.getCurrentPosition(
  success => {
    getReverseGeocodingData(success.coords.latitude, success.coords.longitude);
  },
  error => {
    console.log(error.message);
  }
);
