import React from "react";
import { Row, Col } from "react-bootstrap";

const TitleBar = (props) => {
  const { title, icon, children } = props;
  return (
    <Row className="border-bottom grey-bg">
      <Col className="m-t-sm">
        <i className={`fa fa-${icon} m-r-sm`}></i>
        <label className="font-bold">{title}</label>
      </Col>
      <Col className="m-t-sm m-b-xs">
        <div className="float-right">{children}</div>
      </Col>
    </Row>
  );
};

export default TitleBar;
