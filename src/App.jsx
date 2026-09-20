import { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
  
} from "@mui/material";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastCards from "./components/ForecastCards";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  async function handleSearch(city) {
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (!apiKey) {
        throw new Error("API key is missing. Check the .env file.");
      }

      const currentWeatherUrl =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?q=${encodeURIComponent(city)}` +
        `&appid=${apiKey}` +
        `&units=metric`;

      const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast` +
        `?q=${encodeURIComponent(city)}` +
        `&appid=${apiKey}` +
        `&units=metric`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error(
          weatherData.message || forecastData.message || "Could not get weather data."
        );
      }

      setWeather(weatherData);
      setForecast(forecastData.list);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Real-Time Weather App
      </Typography>

      <Typography align="center" sx={{ mb: 4 }}>
        Enter The City Name to Get Current Weather and Forecast
      </Typography>

      <SearchBox onSearch={handleSearch} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {loading && <CircularProgress />}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      <WeatherCard weather={weather} unit={unit} setUnit={setUnit} />
<ForecastCards forecast={forecast} unit={unit} />
    </Container>
  );
}

export default App;