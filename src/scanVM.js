import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import TableFormExample from "./GridPage";
import { useNavigate } from "react-router-dom";

const ScanVM = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ip_address: "",
    username: "",
    password: "",
    os_type: 3,
  });
  const [pingStatus, setPingStatus] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validation
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const isValid = Object.values(formData).every((value) => value !== "");
    setIsFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    // Check if the access token is present in local storage
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Redirect to the login page if the token is not present
      // navigate("/login");
    }
  }, [navigate]);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    const form = e.currentTarget;
    console.log("triggered", form.checkValidity());
    setValidated(!form.checkValidity());
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // Redirect to the login page if the token is not present
        navigate("/login");
      }
      const response = await fetch(
        "http://20.235.244.160:9781/cis/hostconfig/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include Bearer token in the Authorization header
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        // Check response status
        console.log("API call successful");
        setShowForm(false);
      } else {
        // API call failed
        console.error("API call failed");
        // You can handle error scenarios here
      }
    } catch (error) {
      console.error("Error during API call:", error);
      // Handle other errors, such as network issues
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setValidated(false);
    setPingStatus(false);
    setFormData({
      ip_address: "",
      username: "",
      password: "",
      os_type: 3,
    });
  };

  const validateForm = () => {
    console.log(
      !!(formData.ip_address && formData.os_type !== 3),
      formData.os_type
    );
    const status = !!(
      formData.ip_address &&
      formData.os_type !== 3 &&
      formData.password &&
      formData.username
    );
    setValidated(!status);
    console.log(status, "chekc");
    return !status;
  };

  const handlePingCheck = async () => {
    if (validateForm()) {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://20.235.244.160:9781/cis/checkconnection/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include Bearer token in the Authorization header
            },
            body: JSON.stringify(formData),
          }
        );

        // Assuming the API response has a 'status' field indicating success or failure
        if (response.status === 200) {
          setPingStatus("pass");
        } else {
          setPingStatus("fail");
        }
      } catch (error) {
        console.error("Error during ping check:", error);
        setPingStatus("error");
      }
    }
  };

  const handleRadioChange = (e) => {
    let value;
    if (e.target.value === "CentOS") {
      value = 1;
    } else {
      value = 2;
    }

    setFormData({
      ...formData,
      os_type: value,
    });
  };

  const handleLogout = () => {};

  return (
    <Container
      fluid
      className="m-2 p-4"
      style={{
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0.5, 0.2)",
        backgroundColor: "",
        width: "99%",
      }}
    >
      <Row
        className="p-lg-3"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1,
          backgroundColor: "white",
          height: "85px",
          top: 0,
        }}
      >
        <Col
          xs={6}
          md={6}
          className="text-md-left mb-3 mb-md-0"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h1>Welcome to the VMPAGE</h1>
        </Col>
        <Col
          xs={6}
          md={3}
          className="text-md-right mb-3 mb-md-0"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={handleButtonClick}
          >
            Create New VM
          </Button>
        </Col>
        <Col
          xs={6}
          md={3}
          className="text-md-right mb-3 mb-md-0"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <div style={{ marginTop: "70px", overflowY: "auto" }}>
        <Modal show={showForm} onHide={handleFormClose}>
          <Modal.Header closeButton>
            <Modal.Title>IP Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="vmware-form"
              noValidate
              validated={validated}
              onSubmit={handleFormSubmit}
              className="mb-3"
            >
              <Form.Group controlId="formIpAddress">
                <Form.Label>Host </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter IP Address"
                  name="ip_address"
                  required
                  value={formData.ip_address}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please hst.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formInput2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  required
                  value={formData.input2}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please pwd.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formOperatingSystem">
                <Form.Label>Operating System</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="CentOS"
                    name="os_type"
                    value="CentOS"
                    required
                    checked={formData.os_type === 1}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Ubuntu"
                    name="os_type"
                    value="Ubuntu"
                    required
                    checked={formData.os_type === 2}
                    onChange={handleRadioChange}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please radio.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                controlId="formPingCheck"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <Button
                  variant="primary"
                  type="button"
                  style={{
                    width: "50%",
                    alignSelf: "center",
                  }}
                  onClick={handlePingCheck}
                >
                  Connection Check
                </Button>
                {pingStatus && (
                  <Alert variant={pingStatus === "pass" ? "success" : "danger"}>
                    {pingStatus === "pass"
                      ? "Connected successfully"
                      : "Please check your connection and try again"}
                  </Alert>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={pingStatus !== "pass"}
                style={{
                  cursor: "pointer",
                  margin: "0% 35%",
                  marginTop: "15px",
                }}
              >
                Save changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <TableFormExample />
      </div>
    </Container>
  );
};

export default ScanVM;
