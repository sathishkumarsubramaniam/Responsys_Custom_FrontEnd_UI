import React from "react";
import { Navbar, Container } from "react-bootstrap";
const TopNavBar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" sticky="top">
      <Container fluid className="m-r-sm m-l-md">
        <Navbar.Brand href="/" className="font-bold">
          Responsys Automation - Custom Tool
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
