import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import store from "../store/index.js";
import { userAuthenticate } from "../store/auth.js";

import Footer from "../components/common/Footer.jsx";
import FormInput from "../components/common/FormInput.jsx";
import BoxedContent from "../components/common/BoxedContent.jsx";

function Login() {
  const navigate = useNavigate();

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSave = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const buttonStatus = document.getElementById("formButton");

    buttonStatus.disabled = true;

    const notify = toast.loading("Authenticating User...");

    const inputPayload = {
      user_name,
      password,
      auth_type: "password",
    };

    const updateStatus = (status, error = null) => {
      toast.update(notify, {
        render: status === "fulfilled" ? "User Authenticated" : error,
        type: status === "fulfilled" ? "success" : "error",
        isLoading: false,
        autoClose: 2500,
        closeButton: true,
        draggable: true,
      });
      buttonStatus.disabled = false;

      if (status === "fulfilled") navigate("/createCampaign");
    };

    const userAuth = async () => {
      const req = await store.dispatch(userAuthenticate(inputPayload));
      const res = req.meta.requestStatus;
      updateStatus(res, req.payload || null);
    };

    userAuth();
  };

  return (
    <div className="loginColumns">
      <Row>
        <Col md={6}>
          <img
            alt="Company Logo"
            className="img-fluid"
            src={require("../img/V_RAD_2.png")}
          />
          <br />
          <h1 className="font-bold">Welcome to V RAD</h1>
          <h4>Responsys Automation Dashboard</h4>
        </Col>
        <Col md={6}>
          <BoxedContent title="Enter Login Credentials">
            <Form
              autoComplete="off"
              id="addCampaignForm"
              onSubmit={handleOnSave}
            >
              <FormInput
                required
                id="user_name"
                label="User Name"
                value={user_name}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
              <FormInput
                required
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <Button
                type="submit"
                id="formButton"
                className="btn btn-primary block full-width m-b sk-loading"
              >
                Login
              </Button>
            </Form>
          </BoxedContent>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Login;
