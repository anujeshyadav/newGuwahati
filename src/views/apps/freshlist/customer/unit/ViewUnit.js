import React, { useEffect, useState, useContext } from "react";
import xmlJs from "xml-js";
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
  Badge,
} from "reactstrap";
import { history } from "../../../../../history";
import { Route } from "react-router-dom";

import swal from "sweetalert";
import "../../../../../../src/layouts/assets/scss/pages/users.scss";

import { CreateunitxmlView } from "../../../../../ApiEndPoint/ApiCalling";
import "../../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../../context/Context";
const ViewUnit = ({ ViewOneData }) => {
  const [CreatAccountView, setCreatAccountView] = useState([]);

  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});

  const Context = useContext(UserContext);

  const handleInputChange = (e, type, i) => {
    const { name, value, checked } = e.target;
    setindex(i);
    if (type == "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          [name]: checked,
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
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
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    setFormData(ViewOneData);
    console.log(ViewOneData);
    if (ViewOneData?.status) {
      formData["status"] = ViewOneData?.status;
    }
    CreateunitxmlView()
      .then(res => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData)?.CreateUnit?.input);
        setCreatAccountView(JSON.parse(jsonData)?.CreateUnit?.input);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <Card>
          <Form className="mr-1 ml-1">
            <Row className="mb-2">
              {CreatAccountView &&
                CreatAccountView?.map((ele, i) => {
                  return (
                    <>
                      {!!ele?.number ? (
                        <>
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup key={i}>
                              <Label>{ele?.label?._text}</Label>

                              <Input
                                disabled
                                onWheel={e => {
                                  e.preventDefault(); // Prevent the mouse wheel scroll event
                                }}
                                onKeyDown={e => {
                                  if (
                                    ele?.type?._attributes?.type == "number"
                                  ) {
                                    ["e", "E", "+", "-"].includes(e.key) &&
                                      e.preventDefault();
                                  }
                                }}
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
                                    <span style={{ color: "red" }}>
                                      {error}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </FormGroup>
                          </Col>
                        </>
                      ) : (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup key={i}>
                            <Label>{ele?.label?._text}</Label>

                            <Input
                              disabled
                              //   onKeyDown={e => {
                              //     if (ele?.type?._attributes?.type == "number") {
                              //       ["e", "E", "+", "-"].includes(e.key) &&
                              //         e.preventDefault();
                              //     }
                              //   }}
                              type={ele?.type?._attributes?.type}
                              placeholder={ele?.placeholder?._text}
                              name={ele?.name?._text}
                              value={formData[ele?.name?._text]}
                              //   onChange={e => {
                              //     handleInputChange(
                              //       e,
                              //       ele?.type?._attributes?.type,
                              //       i
                              //     );
                              //   }}
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
                      )}
                    </>
                  );
                })}
            </Row>
            {/* <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
              <Label className="mb-0">Status</Label>
              <div
                className="form-label-group"
                // onChange={(e) => {
                //   setFormData({
                //     ...formData,
                //     ["status"]: e.target.value,
                //   });
                // }}
              >
                <input
                  disabled
                  checked={formData["status"] == "Active"}
                  style={{ marginRight: "3px" }}
                  type="radio"
                  name="status"
                  value="Active"
                />
                <span style={{ marginRight: "20px" }}>Active</span>

                <input
                  // checked={status == "Inactive"}
                  checked={formData["status"] == "Deactive"}
                  disabled
                  style={{ marginRight: "3px" }}
                  type="radio"
                  name="status"
                  value="Deactive"
                />
                <span style={{ marginRight: "3px" }}>Deactive</span>
              </div>
            </Col> */}
            <hr />
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default ViewUnit;
