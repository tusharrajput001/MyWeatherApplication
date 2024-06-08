// WeatherCard.js
import React from 'react';

const WeatherCard = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }
  const { name, main, weather } = data;

  return (
    <div className="WeatherCard">
      <h2>{name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
