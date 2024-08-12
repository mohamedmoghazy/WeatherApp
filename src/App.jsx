import { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("tamilnadu");
  const [state, setState] = useState("tamilnadu");

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [state]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
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
