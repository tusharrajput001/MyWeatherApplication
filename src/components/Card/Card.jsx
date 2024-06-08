import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.css";

function Card() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        console.log(
          `Fetching weather data for latitude: ${latitude}, longitude: ${longitude}`
        );
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: "851968191c14e9d9ba2494c10faf7c2d",
              units: "metric",
            },
          }
        );
        console.log("Weather data:", response.data);
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(
              `User's location: latitude ${latitude}, longitude ${longitude}`
            );
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setError(error);
            setLoading(false);
          }
        );
      } else {
        setError(new Error("Geolocation is not supported by this browser."));
        setLoading(false);
      }
    };

    fetchLocation();

    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="WeatherCard">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="WeatherCard">
        <h2>Error fetching data</h2>
      </div>
    );
  }

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className="WeatherCard">
      <div className="dateTime">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
      <h2>Current Weather: {weather.name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p className="temp">{weather.main.temp}°C</p>
      <p className="feels-like">Feels Like: {weather.main.feels_like}°C</p>
      <div className="info">
        <div className="humidity">
          <img
            src="https://cdn-icons-png.freepik.com/512/6393/6393411.png"
            alt="Humidity Icon"
          />
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
        <div className="wind">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2045/2045893.png"
            alt="Wind Speed Icon"
          />
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
