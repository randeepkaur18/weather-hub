import React from "react";

import Header from "../Header/Header";
import Form from "../Form/Form";
import WeatherContainer from "../WeatherContainer/WeatherContainer";

import "./Layout.scss";

const Layout = () => (
  <div data-test="component-layout" className="layout">
    <Header />
    <Form />
    <WeatherContainer />
  </div>
);

export default Layout;
