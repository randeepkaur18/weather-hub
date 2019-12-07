import React from "react";
import WeatherContext from "../context/weatherContext";

import "./WeatherData.scss";

const WeatherData = () => {
  // const { data } = React.useContext(WeatherContext);

  // React.useEffect(() => {
  //   console.log(374673437, data);
  // }, [data]);

  // const { weather, main, dt_txt, city } = data;
  // console.log("inside weather data section - ", data);
  return (
    // <section data-test="component-weather-data" className="weather-data">
    //   <h5 className="heading-5">{moment(dt_txt).format("LLLL")}</h5>
    //   <h1 className="heading-1">{(main.temp - 273.15).toFixed(0)}&deg;C</h1>
    //   <h4 className="heading-4">{city}</h4>
    //   <h4 className="heading-4">{weather[0].description}</h4>
    // </section>

    <section data-test="component-weather-data" className="weather-data">
      <h5 className="heading-5">December, 5, 2019</h5>
      <h1 className="heading-1">25&deg;C</h1>
      <h4 className="heading-4">Bangalore</h4>
      <h4 className="heading-4">Cloudly</h4>
    </section>
  );
};

export default WeatherData;
