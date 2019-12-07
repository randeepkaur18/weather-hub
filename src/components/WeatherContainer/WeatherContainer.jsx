import React from "react";

import WeatherData from "../WeatherData/WeatherData";
import Statistics from "../Statistics/Statistics";
import Tabs from "../Tabs/Tabs";

import "./WeatherContainer.scss";

const WeatherContainer = () => (
  <div data-test="component-weather-container" className="weather-container">
    <WeatherData />
  </div>
);

export default WeatherContainer;
