import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  FormGroup,
  CustomInput,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    hub_name: "",
    desc: "",
    email: "",
    phone: "",
    address: "",
    d_zone: "",
    cat: "",
    subcat: "",
    status: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler", formData);

    axiosConfig
      .post("/admin/addcategory", formData)
      .then((response) => {
        console.log(response);
        this.props.history.push("/app/freshlist/order/orderList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Card>
        <Row className="m-2">
          <Col>
            <h1 col-sm-6 className="float-left">
              Add Customer
            </h1>
          </Col>
          <Col>
            <Route
              render={({ history }) => (
                <Button
                  className="btn btn-danger float-right"
                  onClick={() =>
                    history.push("/app/freshlist/customer/customerList")
                  }
                >
                  Back
                </Button>
              )}
            />
          </Col>
        </Row>
        <CardBody>
          <Form className="m-1" onSubmit={submitHandler}>
            <Row className="mb-2">
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Customer Name</Label>
                  <Input
                    type="text"
                    placeholder="Customer_Name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Mobile No.</Label>
                  <Input
                    type="Number"
                    placeholder="Enter No."
                    name="phone"
                    value={formData.phone}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                <Label className="mb-1">Status</Label>
                <div className="form-label-group" onChange={changeHandler}>
                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Active"
                  />
                  <span style={{ marginRight: "20px" }}>Active</span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Inactive"
                  />
                  <span style={{ marginRight: "3px" }}>Inactive</span>
                </div>
              </Col>
            </Row>

            <Row className="m-2">
              <Button color="primary" type="submit" className="mr-1 mb-1">
                Add Customer
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddCustomer;
