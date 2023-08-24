import React from "react";
import { Form } from "react-bootstrap";

const FormSelect = (props) => {
  const {
    label,
    id,
    value,
    onChange,
    options,
    required = false,
    disabled = false,
  } = props;
  return (
    <Form.Group className="mb-2">
      <Form.FloatingLabel label={label} className="font-bold" controlId={id}>
        <Form.Control
          name={id}
          as="select"
          value={value}
          className="b-r-sm"
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          <option key="Select" value="">
            Select Options
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      </Form.FloatingLabel>
    </Form.Group>
  );
};

export default FormSelect;
