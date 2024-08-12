import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 text-center">
      <p className="text-sm">
        Created by{" "}
        <a
          href="https://github.com/mohamedmoghazy/WeatherApp"
          className="underline hover:text-blue-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          CrossOver team
        </a>{" "}
        using React
      </p>
    </footer>
  );
};

export default Footer;
