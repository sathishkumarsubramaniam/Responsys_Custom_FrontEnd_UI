import React from "react";
import { Row, Col } from "react-bootstrap";
import SideBarNav from "./SideBarNav";
import Footer from "./Footer";

const PageWrapper = (props) => {
  return (
    <Row>
      <Col md={2} className="border-right border-size-xs p-sm">
        <SideBarNav />
      </Col>
      <Col md={10}>
        <div className="wrapper wrapper-content p-xs">{props.children}</div>
        <Footer />
      </Col>
    </Row>
  );
};

export default PageWrapper;
