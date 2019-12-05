import React from "react";

import "./TodaysWeather.scss";

const TodaysWeather = () => (
  <div data-test="component-todays-weather">
    <div className="weather">
      <h4 className="weather__time">Friday</h4>
      <p className="weather__description">Cloudy</p>
      <p className="weather__temp">26&degC;</p>
    </div>
    <div className="weather">
      <h4 className="weather__day">Saturday</h4>
      <p className="weather__description">Cloudy</p>
      <p className="weather__temp">26&degC;</p>
    </div>
  </div>
);

export default TodaysWeather;
