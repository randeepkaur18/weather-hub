import React from "react";
import axios from "axios";

import Header from "../Header/Header";
import Form from "../Form/Form";
import WeatherContainer from "../WeatherContainer/WeatherContainer";
import WeatherContext from "../context/weatherContext";

import "./Layout.scss";

const Layout = () => {
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(false);

  const getWeather = async (location, countryCode) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location},${countryCode}&appid=305e8ece4e883a1156bbfc03bfe81004`
    );

    if (response) {
      console.log(response);
      if (response.data.cod === 200) {
        setData(response.data);
      } else {
        setData("Sorry! Could not find the location.");
        setError(true);
      }
    } else {
      setData("Oops! something went wrong.");
      setError(true);
    }
  };

  return (
    <WeatherContext.Provider value={{ data, error }}>
      <div data-test="component-layout" className="layout">
        <div className="layout__content">
          <Header />
          <Form getWeather={getWeather} />
          <WeatherContainer />
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default Layout;
