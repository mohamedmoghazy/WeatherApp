// components/CurrentWeather.jsx
import React from 'react';
import countries from 'i18n-iso-countries';

const kelvinToCelsius = (k) => {
  return (k - 273.15).toFixed(2);
};

const CurrentWeather = ({ apiData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 mx-auto w-full max-w-md">
      {apiData.main ? (
        <div className="text-center">
          <img
            src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
            alt="weather status icon"
            className="w-20 h-20 mx-auto"
          />

          <p className="text-4xl font-bold mt-4">
            {kelvinToCelsius(apiData.main.temp)}&deg; C
          </p>

          <p className="text-xl text-gray-700 mt-2">
            <i className="fas fa-map-marker-alt"></i> {apiData.name}
          </p>

          <div className="flex justify-between mt-4">
            <div>
              <p className="text-gray-600">
                <i className="fas fa-temperature-low"></i> {kelvinToCelsius(apiData.main.temp_min)}&deg; C
              </p>
              <p className="text-gray-600">
                <i className="fas fa-temperature-high"></i> {kelvinToCelsius(apiData.main.temp_max)}&deg; C
              </p>
            </div>
            <div>
              <p className="text-gray-600">{apiData.weather[0].main}</p>
              <p className="text-gray-600">{countries.getName(apiData.sys.country, 'en', { select: 'official' })}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-gray-700">Loading</h1>
      )}
    </div>
  );
};

export default CurrentWeather;