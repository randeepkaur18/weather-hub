import React from "react";

import "./Statistics.scss";

const Statistics = () => (
  <section data-test="component-statistics" className="statistics-section">
    <h4>Statistics</h4>
    <div className="statistics">
      <div className="stat">Humidity</div>
      <div className="stat">Wind</div>
      <div className="stat">Precipitation</div>
      <div className="stat">Pressure</div>
    </div>
  </section>
);

export default Statistics;
