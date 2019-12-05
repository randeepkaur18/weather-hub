import React from "react";
import PropTypes from "prop-types";

import "./Input.scss";

const Input = ({ setInputValue }) => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      data-test="component-input"
      type="text"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );
};

Input.propTypes = {
  setInputValue: PropTypes.func.isRequired
};

export default Input;
