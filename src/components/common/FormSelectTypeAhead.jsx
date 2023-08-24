import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const FormSelectTypeAhead = (props) => {
  const {
    label,
    id,
    value,
    onChange,
    required = false,
    multiple = false,
    options,
    placeholder,
  } = props;
  return (
    <Form.Group as={Row} className="mb-2">
      <Col md>
        <Form.Label>{label}</Form.Label>
        <Typeahead
          id={id}
          name={id}
          selected={value}
          options={options}
          required={required}
          multiple={multiple}
          onChange={onChange}
          placeholder={placeholder}
          minLength={3}
        />
      </Col>
    </Form.Group>
  );
};

export default FormSelectTypeAhead;
