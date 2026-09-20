function ForecastCards({ forecast, unit }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }
  const isCelsius = unit === "metric";
const symbol = isCelsius ? "°C" : "°F";

function formatTemperature(celsius) {
  const value = isCelsius ? celsius : (celsius * 9) / 5 + 32;
  return `${Math.round(value)}${symbol}`;
}

  const groupedByDay = {};

  forecast.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-CA");

    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = [];
    }

    groupedByDay[dayKey].push(item);
  });

  const dailyForecasts = Object.values(groupedByDay)
    .slice(0, 5)
    .map((items) => {
      return items.reduce((closest, item) => {
        const itemHour = new Date(item.dt * 1000).getHours();
        const closestHour = new Date(closest.dt * 1000).getHours();

        return Math.abs(itemHour - 12) < Math.abs(closestHour - 12)
          ? item
          : closest;
      });
    });

  return (
    <section className="forecast-grid">
      {dailyForecasts.map((day) => {
        const date = new Date(day.dt * 1000);
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        return (
          <article className="forecast-card" key={day.dt}>
            <h3>
              {date.toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h3>

            <img src={iconUrl} alt={day.weather[0].description} />

            <p>{day.weather[0].description}</p>

            <strong>
              {formatTemperature(day.main.temp_max)} /{" "}
{formatTemperature(day.main.temp_min)}
            </strong>
          </article>
        );
      })}
    </section>
  );
}

export default ForecastCards;