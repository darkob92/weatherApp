document.querySelector('.btn').addEventListener('click', getCity);

function getCity(e) {
  const city = document.querySelector('input[type="text"]').value;
  const key = '8b02106ab01304b53cef59b8ce2ee589';

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      let todayDate = new Date().toLocaleString();

      let icon = document.querySelector('.weather-icon');
      if (response.weather[0].description.includes('drizzle')) {
        icon.src='icons/png/018-raining.png';
      } else if (response.weather[0].description.includes('rain')) {
        icon.src = 'icons/png/014-rain-4.png';
      } else if (response.weather[0].description.includes('snow')) {
        icon.src = 'icons/png/021-snowing-1.png';
      } else if (response.weather[0].description.includes('cloud')) {
        icon.src = 'icons/png/002-cloud.png';
      } else if (response.weather[0].description.includes('sun')) {
        icon.src = 'icons/png/024-sunny.png';
      } else if (response.weather[0].description.includes('mist') || response.weather[0].description.includes('haze')) {
        icon.src = 'icons/png/mist.png';
      }


      let output = `
        <h3 class="city-name">${response.name}, ${response.sys.country}</h3>
        <h5 id="date">${todayDate}</h5>
        <p class="weather-description">${response.weather[0].description}</p>
      `;

      document.querySelector('.output-main').innerHTML += output;

      let output2 = `
        <p class="stats"><span>${response.main.temp}<img src="icons/png/027-degree.png"></span><span>${response.wind.speed} km/h  <img src="icons/png/035-wind-sign.png"></span><span>${response.main.pressure} hpa<img src="icons/png/030-thermometer-2.png"></span></p>
      `
      document.querySelector('.output-stats').innerHTML += output2;
    }
  }

  xhr.send();

  e.preventDefault(); 
}

function remove_hash_from_url() {
  var uri = window.location.toString();
  if (uri.indexOf("#") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("#"));
    window.history.replaceState({}, document.title, clean_uri);
  }
}