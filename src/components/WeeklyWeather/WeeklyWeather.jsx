import React from "react";

import "./WeeklyWeather.scss";

const WeeklyWeather = () => (
  <div data-test="component-weekly-weather" className="weekly-weather">
    <div className="week">
      <h4 className="week__day">Friday</h4>
      <p className="week__description">Cloudy</p>
      <p className="week__temp">26&degC;</p>
    </div>
    <div className="week">
      <h4 className="week__day">Saturday</h4>
      <p className="week__description">Cloudy</p>
      <p className="week__temp">26&degC;</p>
    </div>
  </div>
);

export default WeeklyWeather;
