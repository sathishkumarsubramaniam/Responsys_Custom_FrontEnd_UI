import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <hr />
      <Row>
        <Col md={12} className="m-b-sm">
          <strong className="font-bold text-danger">
            Verticurl - A WPP Company &copy; 2023
          </strong>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
