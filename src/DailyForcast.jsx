import { useState, useEffect } from "react";
import "./App.css";
import countries from "i18n-iso-countries";

function DailyForcast() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("tamilnadu");
  const [state, setState] = useState("tamilnadu");

  // API KEY AND URL
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${state}&appid=${apiKey}`;

  // fetching data
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data); // Log the data to inspect the structure

        // group by date
        const groupByDays = data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!acc[data]) {
            acc[data] = [];
          }
          acc[data].push(item);
          return acc;
        });

        // Set the grouped data
        setApiData({ ...data, groupByDays });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [state, apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToCelsius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
          {apiData.groupByDays ? (
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
                    const morning = items.find((item) =>
                      item.dt_txt.includes("06:00:00")
                    );
                    const day = items.find((item) =>
                      item.dt_txt.includes("12:00:00")
                    );
                    const evening = items.find((item) =>
                      item.dt_txt.includes("18:00:00")
                    );
                    const night = items.find((item) =>
                      item.dt_txt.includes("00:00:00")
                    );

                    return (
                      <tr key={date}>
                        <td>{date}</td>
                        <td>
                          {morning ? kelvinToCelsius(morning.main.temp) : "--"}
                          &deg; C
                        </td>
                        <td>
                          {day ? kelvinToCelsius(day.main.temp) : "--"}&deg; C
                        </td>
                        <td>
                          {evening ? kelvinToCelsius(evening.main.temp) : "--"}
                          &deg; C
                        </td>
                        <td>
                          {night ? kelvinToCelsius(night.main.temp) : "--"}&deg;
                          C
                        </td>
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
              {/* {apiData.list.map((item, index) => (
                <div key={index} className="weather-item ">
                  <p className="h4">
                    {new Date(item.dt * 1000).toLocaleDateString()}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="weather status icon"
                    className="weather-icon"
                  />
                  <p className="h5">
                    Temp: {kelvinToCelsius(item.main.temp)}&deg; C
                  </p>
                  <p>
                    <strong>{item.weather[0].main}</strong>
                  </p>
                </div> */}
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default DailyForcast;
