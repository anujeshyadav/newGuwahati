import React, { useEffect, useState, useRef, useContext } from "react";
import xmlJs from "xml-js";
import PhoneInput from "react-phone-input-2";
import Multiselect from "multiselect-react-dropdown";
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
import swal from "sweetalert";
import { Route } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

import { history } from "../../../../../history";
import "../../../../../../src/layouts/assets/scss/pages/users.scss";
import {
  CreateunitxmlView,
  SaveUnit,
} from "../../../../../ApiEndPoint/ApiCalling";
import "../../../../../assets/scss/pages/users.scss";
// import UserContext from "../../../../../context/Context";
const StateList = [
  { id: 1, state_title: "Clothing & Apparel." },
  { id: 2, state_title: "Footwear & Shoes." },
  { id: 3, state_title: "Electronics & Gadgets." },
  // Add more states as needed
];
const CreateUnit = () => {
  const [CreatUnitView, setCreatUnitView] = useState({});
  const [Countries, setCountry] = useState({});
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [formData, setFormData] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});

  const handleInputChange = (e, type, i) => {
    const { name, value } = e.target;
    console.log(value);
    setindex(i);
    if (type == "number") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
        setError("");
      } else {
        setError(
          "Please enter a valid number with a maximum length of 10 digits"
        );
      }
    } else {
      if (value.length <= 10) {
        setFormData({
          ...formData,
          [name]: value,
        });
        // console.log(value);
        setError("");
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
        // setError("Input length exceeds the maximum of 10 characters");
      }
    }
  };

  useEffect(() => {
    CreateunitxmlView()
      .then(res => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData).CreateUnit);
        setCreatUnitView(JSON.parse(jsonData));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onSelect1 = selectedList => {
    setSelectedValue(selectedList);
    console.log("Selected:", selectedList);
  };
  const onRemove1 = selectedList => {
    setSelectedValue(selectedList);
    console.log("Removed:", selectedList);
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(formData);
    if (error) {
      swal("Error occured while Entering Details");
    } else {
      let userData = JSON.parse(localStorage.getItem("userData"));
      formData["created_by"] = userData?._id;
      SaveUnit(formData)
        .then(res => {
          console.log(res);
          if (res.status) {
            swal(`${res.message}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Create Unit</h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/softNumen/Unit/UnitList")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <CardBody>
            <Form
              className="m-1"
              //   ref={formRef}
              onSubmit={submitHandler}
            >
              <Row className="mb-2">
                <Col lg="3" md="3" sm="12">
                  <Label>Select Product</Label>
                  <Multiselect
                    required
                    showCheckbox="true"
                    isObject="false"
                    options={StateList}
                    onSelect={onSelect1}
                    onRemove={onRemove1}
                    displayValue="state_title"
                  />
                </Col>
                {CreatUnitView &&
                  CreatUnitView?.CreateUnit?.input?.map((ele, i) => {
                    return (
                      <Col key={i} lg="3" md="3" sm="12">
                        <FormGroup key={i}>
                          <Label>{ele?.label?._text}</Label>

                          <Input
                            // onKeyDown={(e) => {
                            //   if (
                            //     ele?.type?._attributes?.type == "number"
                            //   ) {
                            //     ["e", "E", "+", "-"].includes(e.key) &&
                            //       e.preventDefault();
                            //   }
                            // }}
                            type={ele?.type?._attributes?.type}
                            placeholder={ele?.placeholder?._text}
                            name={ele?.name?._text}
                            value={formData[ele?.name?._text]}
                            onChange={e =>
                              handleInputChange(
                                e,
                                ele?.type?._attributes?.type,
                                i
                              )
                            }
                          />
                          {index === i ? (
                            <>
                              {error && (
                                <span style={{ color: "red" }}>{error}</span>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </FormGroup>
                      </Col>
                    );
                  })}
              </Row>
              <hr />
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2"
                >
                  Submit
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default CreateUnit;
