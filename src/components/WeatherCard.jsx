import { Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function WeatherCard({ weather, unit, setUnit }) {
  if (!weather) {
    return null;
  }

  const isCelsius = unit === "metric";
  const symbol = isCelsius ? "°C" : "°F";

  function formatTemperature(celsius) {
    const value = isCelsius ? celsius : (celsius * 9) / 5 + 32;
    return `${Math.round(value)}${symbol}`;
  }

  function handleUnitChange(event, newUnit) {
    if (newUnit) {
      setUnit(newUnit);
    }
  }

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <section className="weather-card">
      <div className="card-heading">
        <h2>Current Weather</h2>

        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={handleUnitChange}
          size="small"
        >
          <ToggleButton value="metric">°C</ToggleButton>
          <ToggleButton value="imperial">°F</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="weather-details">
        <div className="weather-main">
          <h3>{weather.name}</h3>

          <div className="temperature-row">
            <img
              src={weatherIcon}
              alt={weather.weather[0].description}
            />

            <span>{formatTemperature(weather.main.temp)}</span>
          </div>

          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="weather-extra">
          <h3>Feels like {formatTemperature(weather.main.feels_like)}</h3>

          <div className="high-low">
            <span>
              <ArrowUpwardIcon />
              {formatTemperature(weather.main.temp_max)}
            </span>

            <span>
              <ArrowDownwardIcon />
              {formatTemperature(weather.main.temp_min)}
            </span>
          </div>

          <p>
            <OpacityIcon />
            <span>Humidity</span>
            <strong>{weather.main.humidity}%</strong>
          </p>

          <p>
            <AirIcon />
            <span>Wind</span>
            <strong>{weather.wind.speed} m/s</strong>
          </p>

          <p>
            <SpeedIcon />
            <span>Pressure</span>
            <strong>{weather.main.pressure} hPa</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;