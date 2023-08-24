import React from "react";
import { ToastContainer } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EntitiesLoader from "./pages/EntitiesLoader";
import UpdateCampaign from "./pages/UpdateCampaign";
import CreateCampaign from "./pages/CreateCampaign";
import TopNavBar from "./components/common/TopNavBar";

import "./css/app.css";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <TopNavBar />
        <Row>
          <ToastContainer
            draggable
            newestOnTop
            theme="light"
            autoClose={4000}
            closeButton={true}
            position="top-right"
            hideProgressBar={true}
          />
          <Col md={12}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/entities" element={<EntitiesLoader />} />
              <Route path="/createCampaign" element={<CreateCampaign />} />
              <Route path="/updateCampaign" element={<UpdateCampaign />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
