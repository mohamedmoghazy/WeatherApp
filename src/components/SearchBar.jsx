import React from "react";

const SearchBar = ({ getState, inputHandler, submitHandler }) => {
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="mb-2">
        <label
          htmlFor="location-name"
          className="block text-lg font-medium text-gray-700"
        >
          Enter Location:
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          id="location-name"
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={inputHandler}
          value={getState}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={submitHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
