import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import './search.css';

function SearchApiConn() {
  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "851968191c14e9d9ba2494c10faf7c2d";

  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        if (data.message === "city not found") {
          setError("City not found. Please enter a valid city name or ZIP code.");
        } else {
          setError(data.message);
        }
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (zipCode.trim() !== "") {
      fetchWeatherData(`zip=${zipCode}`);
    } else if (cityName.trim() !== "") {
      fetchWeatherData(`q=${cityName}`);
    } else {
      setError("Please enter a city name or ZIP code.");
      setWeatherData(null);
    }
  };

  return (
    <div>
      <div className="searchbar">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter ZIP code"
        />
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="searchArea">
        {error && <p>{error}</p>}
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

export default SearchApiConn;
