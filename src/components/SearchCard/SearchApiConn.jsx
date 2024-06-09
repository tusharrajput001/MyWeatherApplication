import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import './search.css';

function SearchApiConn() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "851968191c14e9d9ba2494c10faf7c2d";

  const fetchWeatherData = async () => {
    try {
      let apiUrl = "";
      if (/^\d+$/.test(query)) {
        // If query contains only digits, treat it as a ZIP code
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${query}&appid=${API_KEY}&units=metric`;
      } else {
        // Otherwise, treat it as a city name
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
      }

      const response = await fetch(apiUrl);
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
    if (query.trim() !== "") {
      fetchWeatherData();
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name or ZIP code"
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
