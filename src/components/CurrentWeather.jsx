import React from "react";
import countries from "i18n-iso-countries";

const kelvinToCelsius = (k) => {
  return (k - 273.15).toFixed(1);
};

const CurrentWeather = ({ apiData }) => {
  return (
    <div className="bg-blue-50 rounded-3xl shadow-xl p-6 mt-6 mx-auto w-full max-w-md">
      {apiData.main ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="w-24 h-24"
            />
          </div>
          <p className="text-6xl font-bold text-gray-800">
            {kelvinToCelsius(apiData.main.temp)}&deg; C
          </p>
          <p className="text-2xl text-gray-600 mt-2">
            {apiData.name},{" "}
            {countries.getName(apiData.sys.country, "en", {
              select: "official",
            })}
          </p>
          <div className="flex justify-between mt-8">
            <div className="text-left">
              <p className="text-gray-600 flex items-center space-x-1">
                <i className="fas fa-temperature-low"></i>
                <span>
                  Low: {kelvinToCelsius(apiData.main.temp_min)}&deg; C
                </span>
              </p>
              <p className="text-gray-600 flex items-center space-x-1 mt-2">
                <i className="fas fa-temperature-high"></i>
                <span>
                  High: {kelvinToCelsius(apiData.main.temp_max)}&deg; C
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xl">
                {apiData.weather[0].main}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {apiData.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-gray-700">Loading...</h1>
      )}
    </div>
  );
};

export default CurrentWeather;
