import { useState, useEffect } from "react";
import countries from "i18n-iso-countries";

const kelvinToCelsius = (k) => (k - 273.15).toFixed(2);

function DailyForcast({ location }) {
  const [apiData, setApiData] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

  // Fetching data based on location prop
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data);
        const groupByDays = data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});
        setApiData({ groupByDays });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [location, apiUrl]);

  if (!apiData.groupByDays) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
      <div className="card-body text-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Morning Temp (°C)</th>
              <th>Day Temp (°C)</th>
              <th>Evening Temp (°C)</th>
              <th>Night Temp (°C)</th>
              <th>Weather Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(apiData.groupByDays).map((date) => {
              const items = apiData.groupByDays[date];
              if (!Array.isArray(items)) {
                console.error(`Expected array for date ${date}, but got ${typeof items}`);
                return null;
              }
              const morning = items.find((item) => item.dt_txt.includes("06:00:00"));
              const day = items.find((item) => item.dt_txt.includes("12:00:00"));
              const evening = items.find((item) => item.dt_txt.includes("18:00:00"));
              const night = items.find((item) => item.dt_txt.includes("00:00:00"));
              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{morning ? kelvinToCelsius(morning.main.temp) : "--"}&deg; C</td>
                  <td>{day ? kelvinToCelsius(day.main.temp) : "--"}&deg; C</td>
                  <td>{evening ? kelvinToCelsius(evening.main.temp) : "--"}&deg; C</td>
                  <td>{night ? kelvinToCelsius(night.main.temp) : "--"}&deg; C</td>
                  <td>
                    {morning ? (
                      <img
                        src={`http://openweathermap.org/img/w/${morning.weather[0].icon}.png`}
                        alt="weather status icon"
                        className="weather-icon"
                      />
                    ) : (
                      "--"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyForcast;
