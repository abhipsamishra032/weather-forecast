import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/currentWeather';
import WeatherForecast from './components/weather-forecast/weatherForecast'
import { WEATHER_API_URL, WEATHER_API_KEY, WEATHER_FORECAST_FOR_5DAYS } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForcast, setWeatherForcast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log("search data => ", searchData)
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const weatherForecast = fetch(`${WEATHER_FORECAST_FOR_5DAYS}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, weatherForecast])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setWeatherForcast({city: searchData.label, ...forecastResponse});
      }).catch((error) => console.log('error =>', error))
  }
  console.log("Hii ", currentWeather, weatherForcast)
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {weatherForcast && <WeatherForecast data={weatherForcast} />}
    </div>
  );
}

export default App;
