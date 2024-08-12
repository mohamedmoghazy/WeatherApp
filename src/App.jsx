import { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Footer from "./components/Footer.jsx";
import DailyForcast from "./components/DailyForcast.jsx";

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("tamilnadu");
  const [state, setState] = useState("tamilnadu");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
            <>
          <div className="transition-transform duration-500 transform hover:scale-105">
              <CurrentWeather apiData={apiData} />
              </div>
              <DailyForcast location={state } />
            </>
        )
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
