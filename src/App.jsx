import { useState, useEffect } from "react";
import "./App.css";
import countries from "i18n-iso-countries";

import DailyForecast from './components/DailyForecast.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import WeeklyForecast from './components/WeeklyForecast.jsx';
import Map from './components/Map.jsx';
import Search from './components/Search.jsx';


function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("tamilnadu");
  const [state, setState] = useState("tamilnadu");

  // API KEY AND URL
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [state]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        

        <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {kelvinToFarenheit(apiData.main.temp)}&deg; C
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i className="fas fa-temperature-low"></i>{" "}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{" "}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {" "}
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    <strong>
                      {" "}
                      {countries.getName(apiData.sys.country, "en", {
                        select: "official",
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
      <footer className="footer">
        <code>
          Created by
          <a href="https://github.com/mohamedmoghazy/WeatherApp" target="none">
            {" "}
            CrossOver team{" "}
          </a>
          using React
        </code>
      </footer>
    </div>
  );
}

export default App;
