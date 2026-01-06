const RAPID_API_KEY = "YOUR_RAPIDAPI_KEY_HERE"; 
const RAPID_API_HOST = "YOUR_API_HOST_HERE"; 

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST
  }
};

const cityname = document.getElementById("cityname");

const getWeatherSingle = async (city) => {
  if (!city) return;

  const url =
    `https://yahoo-weather5.p.rapidapi.com/weather?format=json&u=c&location=${city}`; //This URL will change according to to your host

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    cityname.innerHTML = data.location.city;

    temp.innerHTML = data.current_observation.condition.temperature;
    max_temp.innerHTML = data.forecasts[0].high;
    min_temp.innerHTML = data.forecasts[0].low;
    humidity.innerHTML = data.current_observation.atmosphere.humidity;
    sunrise.innerHTML = data.current_observation.astronomy.sunrise;
    sunset.innerHTML = data.current_observation.astronomy.sunset;
    condition.innerHTML = data.current_observation.condition.text;
    wind_speed.innerHTML = data.current_observation.wind.speed;
    wind_direction.innerHTML = data.current_observation.wind.direction;

  } catch (err) {
    console.error(err);
  }
};

// Multi-city fetch
const getWeatherMultiple = async (cities) => {
  try {
    const requests = cities.map(city =>
      fetch(
        `https://yahoo-weather5.p.rapidapi.com/weather?format=json&u=c&location=${city}`,   //This URL will change according to to your host
        options
      ).then(res => res.json())
    );

    const citiesData = await Promise.all(requests);

    citiesData.forEach((cityData, i) => {
      if (!cityData.current_observation) return;

      document.getElementById(`temp-${i}`).textContent =
        cityData.current_observation.condition.temperature;

      document.getElementById(`min_temp-${i}`).textContent =
        cityData.forecasts[0].low;

      document.getElementById(`max_temp-${i}`).textContent =
        cityData.forecasts[0].high;

      document.getElementById(`humidity-${i}`).textContent =
        cityData.current_observation.atmosphere.humidity;

      document.getElementById(`condition-${i}`).textContent =
        cityData.current_observation.condition.text;

      document.getElementById(`wind_speed-${i}`).textContent =
        cityData.current_observation.wind.speed;

      document.getElementById(`wind_direction-${i}`).textContent =
        cityData.current_observation.wind.direction;
    });
  } catch (err) {
    console.error("Weather fetch failed:", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("temp-0")) {
    const commonCities = [
      "New York",
      "Chicago",
      "Kolkata",
      "Shanghai",
      "London"
    ];
    getWeatherMultiple(commonCities);
  }
});

// Event listener for index.html
submit?.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherSingle(city.value);
});

// Default calls
if (document.getElementById("temp")) {
  getWeatherSingle("Kolkata");
}

if (document.getElementById("temp-0")) {
  const commonCities = ["New York", "Chicago", "Kolkata", "Shanghai", "London"];
  getWeatherMultiple(commonCities);
}
