import React from "react";

import Input from "../Input/Input";

import "./Form.scss";

const Form = ({ getWeather }) => {
  const [location, setLocation] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");

  const onSearch = event => {
    event.preventDefault();
    getWeather(location, countryCode);
  };

  return (
    <form data-test="component-form" className="form">
      <Input
        placeholder="loaction"
        setInputValue={location => setLocation(location)}
      />
      <Input
        placeholder="country code"
        setInputValue={countryCode => setCountryCode(countryCode)}
      />
      <button
        data-test="search-button"
        className="btn"
        type="submit"
        onClick={event => onSearch(event)}
      >
        search
      </button>
    </form>
  );
};

export default Form;
