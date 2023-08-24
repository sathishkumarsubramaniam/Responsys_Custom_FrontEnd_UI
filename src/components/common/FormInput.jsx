import React from "react";
import { Form } from "react-bootstrap";

const FormInput = (props) => {
  const {
    label,
    type,
    id,
    value,
    onChange,
    defaultValue,
    required = false,
    disabled = false,
  } = props;
  return (
    <Form.Group className="mb-2">
      <Form.FloatingLabel label={label} className="font-bold" controlId={id}>
        <Form.Control
          name={id}
          type={type}
          value={value}
          autoComplete="off"
          className="b-r-sm"
          disabled={disabled}
          onChange={onChange}
          required={required}
          defaultValue={defaultValue}
          placeholder={`Enter ${label}`}
        />
      </Form.FloatingLabel>
    </Form.Group>
  );
};

export default FormInput;
