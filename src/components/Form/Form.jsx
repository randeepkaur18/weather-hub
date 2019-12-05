import React from "react";
import Input from "../Input/Input";

import "./Form.scss";

const Form = () => {
  const [city, setCity] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");

  const submit = e => {
    e.preventDefault();
    console.log("city - ", city, "   country code - ", countryCode);
  };

  return (
    <div data-test="component-form">
      <form onSubmit={e => submit(e)}>
        <Input setInputValue={city => setCity(city)} />
        <Input setInputValue={countryCode => setCountryCode(countryCode)} />
        <button data-test="search-button" type="submit">
          search
        </button>
      </form>
    </div>
  );
};

export default Form;
