import React from "react";
import { FormCheck } from "react-bootstrap";

const InputComp = (props) => {
  const { item, index, handleClick } = props;

  return (
    <FormCheck
      type="checkbox"
      id={index}
      name={index}
      onChange={handleClick}
      checked={item.selected ? true : false}
    />
  );
};

export default InputComp;
