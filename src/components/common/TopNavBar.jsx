import React from "react";
import { Navbar, Container } from "react-bootstrap";
const TopNavBar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" sticky="top">
      <Container fluid className="m-r-sm m-l-md">
        <Navbar.Brand href="/" className="font-bold">
          <img
            src={require("../../img/V_RAD_2.png")}
            width="150"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <i>Beta V1.0</i>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
