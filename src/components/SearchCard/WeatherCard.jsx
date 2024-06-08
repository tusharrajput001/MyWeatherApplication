// WeatherCard.js
import React from "react";
import "./search.css";

const WeatherCard = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }
  const { name, main, weather, wind } = data;

  return (
    <div className="WeatherCard">
      <h2>Current Weather: {name}</h2>

      <p>Temperature: {main.temp}°C</p>
      <p className="feels-like">Feels Like: {main.feels_like}°C</p>
      <div className="container2">
        <div className="humidity">
          <img
            src="https://cdn-icons-png.freepik.com/512/6393/6393411.png"
            alt="Humidity Icon"
          />
          <p>Humidity: {main.humidity}%</p>
        </div>
        <div className="wind">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2045/2045893.png"
            alt="Wind Speed Icon"
          />
          <p>Wind Speed: {wind.speed} m/s</p>
        </div>
      </div>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
