import React, { useState, useEffect } from "react";
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
import Select from "react-select";
import xmlJs from "xml-js";
import xml2js from "xml2js";
import { Country, State, City } from "country-state-city";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";
import { CreateParts } from "../../../../ApiEndPoint/ApiCalling";

const AddPart = () => {
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

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [CustomerRegistView, setCustomerRegistView] = useState({});
  const [CustomerDropdown, setCustomerDropdown] = useState({});
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const handleInputChange = e => {
  //     // Handle input changes and update formData state
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };
  useEffect(() => {
    CreateParts()
      .then((res) => {
        console.log(res.data);
        const jsonAllData = xmlJs.xml2json(res.data, {
          compact: true,
          spaces: 2,
        });
        console.log(JSON.parse(jsonAllData));
        setCustomerRegistView(JSON.parse(jsonAllData));
        setCustomerDropdown(JSON.parse(jsonAllData));
        xml2js.parseString(res?.data, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
          } else {
            console.log(result.ProductRgistration);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);

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
              Create Part
            </h1>
          </Col>
        </Row>
        <CardBody>
          <Form className="m-1" onSubmit={submitHandler}>
            <Row className="mb-2">
              {CustomerRegistView &&
                CustomerRegistView.ProductRgistration?.input?.map((val, i) => {
                  return (
                    <Col key={i} lg="6" md="6" sm="12">
                      <FormGroup>
                        <Label>{val?.label?._text}</Label>
                        <Input
                          // type="date"
                          type={val?.type?._attributes?.type}
                          name={val?.name?._text}
                          placeholder={val?.placeholder?._text}
                          // onChange={changeHandler}
                        />
                      </FormGroup>
                    </Col>
                  );
                })}

              {CustomerDropdown &&
                CustomerDropdown?.ProductRgistration?.MyDropdown?.dropdown?.map(
                  (val, i) => {
                    console.log(val);
                    return (
                      <Col lg="6" md="6">
                        <Label>{val?.label?._text}</Label>
                        <select
                          key={i}
                          className="form-control"
                          name={val?.name._text}
                          // value={selectedOption}
                          // onChange={handleOptionChange}
                        >
                          <option value="">Select an option</option>
                          {val?.option.map((option, index) => (
                            <option
                              key={index}
                              value={option?._attributes?.value}
                            >
                              {option?._text}
                            </option>
                          ))}
                        </select>
                      </Col>
                    );
                  }
                )}
              {/* <Col lg="6" md="6">
                <FormGroup>
                  <Label>Order Date</Label>
                  <Input
                    type="date"
                    name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col> */}
              {/* <Col lg="6" md="6">
                <FormGroup>
                  <Label>Invoice Date</Label>
                  <Input
                    type="date"
                    name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col> */}
              {/* <Col lg="6" md="6">
                <FormGroup>
                  <Label>Registered To</Label>
                  <Input
                    type="text"
                    placeholder="Registered To"
                    name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Product Price</Label>
                  <Input
                    type="number"
                    placeholder="Product Price"
                    name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label for="exampleSelect">Warranty Applied</Label>
                  <Input id="exampleSelect" name="select" type="select">
                    <option> Standard Warranty </option>
                    <option> Extended Warranty </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Warranty Start Date</Label>
                  <Input
                    type="date"
                    name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Warranty End Date</Label>
                  <Input
                    type="date"
                    name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Industry</Label>
                  <Input
                    type="text"
                    // name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Used as</Label>
                  <Input
                    type="text"
                    // name="customer_name"
                    // value={formData.customer_name}
                    onChange={changeHandler}
                  />
                </FormGroup>
              </Col>

              <Col lg="6" md="6" sm="12">
                <FormGroup>
                  <Label>ZipCode/PinCode</Label>
                  <Input
                    required
                    type="number"
                    // onKeyDown={e =>
                    //   ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    // }
                    // min={0}
                    placeholder="Enter ZipCode/PinCode"
                    // name="B_PinCode"
                    // value={B_PinCode}
                    // onChange={e => setB_PinCode(e.target.value)}
                  />
                </FormGroup>
              </Col> */}

              {/* <Col lg="6" md="6">
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
              </Col> */}
            </Row>

            <Row className="m-2">
              <Button color="primary" type="submit" className="mr-1 mb-1">
                Add Part
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPart;
