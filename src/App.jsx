import { useState, useEffect } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import dailyForecast from "./components/dailyForecast.jsx";
import hourlyForecast from "./components/hourlyForecast.jsx";
import weeklyForecast from "./components/weeklyForecast.jsx";
import map from "./components/map.jsx";
import search from "./components/search.jsx";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Footer from "./components/Footer.jsx";

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

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchBar
          getState={getState}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
        />
        <CurrentWeather apiData={apiData} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
