import React from "react";
import { Row, Col, Form, ProgressBar } from "react-bootstrap";

const ProgressBarComp = (props) => {
  const { label, now = 100, variant = "primary" } = props;
  return (
    <Row className="mb-2">
      <Col md={4}>
        <Form.Label className="text-primary font-bold">{label}</Form.Label>
      </Col>
      <Col md={8}>
        <ProgressBar animated now={now} variant={variant} />
      </Col>
    </Row>
  );
};

export default ProgressBarComp;
