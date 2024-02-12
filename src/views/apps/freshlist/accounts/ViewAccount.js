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
import { history } from "../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import moment from "moment-timezone";
import { Route } from "react-router-dom";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  CreateAccountSave,
  CreateAccountView,
  Get_RoleList,
} from "../../../../ApiEndPoint/ApiCalling";
import { BiEnvelope } from "react-icons/bi";
import { FcPhoneAndroid } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
import { CloudLightning } from "react-feather";
import { FaPlus } from "react-icons/fa";

const EditAccount = ({ ViewOneData }) => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [Countries, setCountry] = useState({});
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
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
   let pageparmission = JSON.parse(localStorage.getItem("userData"));
   Get_RoleList(pageparmission?._id, pageparmission?.database)
     .then((res) => {
       setdropdownValue(res?.Role);
     })
     .catch((err) => {
       console.log(err);
       swal("Roles List Not found");
     });
    if (ViewOneData?.Country) {
      let countryselected = Country?.getAllCountries()?.filter(
        (ele, i) => ele?.name == ViewOneData?.Country
      );
      setCountry(countryselected);
      if (ViewOneData?.State) {
        let stateselected = State?.getStatesOfCountry(
          countryselected[0]?.isoCode
        )?.filter((ele, i) => ele?.name == ViewOneData?.State);
        setState(stateselected);
        console.log(stateselected);
        if (ViewOneData?.City) {
          let cityselected = City.getCitiesOfState(
            stateselected[0]?.countryCode,
            stateselected[0]?.isoCode
          )?.filter((ele, i) => ele?.name == ViewOneData?.City);
          setCities(cityselected);
        }
      }
    }
    if (ViewOneData?.status) {
      formData["status"] = ViewOneData?.status;
    }
    CreateAccountView()
      .then(res => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData)?.CreateUser?.input);

        setCreatAccountView(JSON.parse(jsonData)?.CreateUser?.input);

        setdropdownValue(JSON.parse(jsonData));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    console.log(formData);
    if (error) {
      swal("Error occured while Entering Details");
    } else {
      CreateAccountSave(formData)
        .then(res => {
          setFormData({});
          if (res.status) {
            window.location.reload();
            swal("User Created Successfully");
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
          {/* <hr /> */}

          <Form className="mr-1 ml-1" onSubmit={submitHandler}>
            <Row className="mb-2">
              {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>
                      {
                        dropdownValue.CreateAccount?.MyDropdown?.dropdown?.label
                          ?._text
                      }
                    </Label>
                    <CustomInput
                      required
                      type="select"
                      name={
                        dropdownValue.CreateAccount?.MyDropdown?.dropdown?.name
                          ?._text
                      }
                      value={
                        formData[
                          dropdownValue.CreateAccount?.MyDropdown?.dropdown
                            ?.name?._text
                        ]
                      }
                      onChange={handleInputChange}
                    >
                      <option value="">--Select Role--</option>
                      {dropdownValue?.CreateAccount?.MyDropdown?.dropdown?.option.map(
                        (option, index) => (
                          <option
                            key={index}
                            value={option?._attributes?.value}
                          >
                            {option?._attributes?.value}
                          </option>
                        )
                      )}
                    </CustomInput>
                  </FormGroup>
                </Col> */}
              <Col lg="4" md="4">
                <FormGroup>
                  <Label>
                    Role Name-
                    <strong>
                      {formData?.rolename?.roleName &&
                        formData?.rolename?.roleName}
                    </strong>
                  </Label>
                  <Input
                    readOnly
                    value={
                      formData?.rolename?.roleName &&
                      formData?.rolename?.roleName
                    }
                  />
                </FormGroup>
              </Col>
              {CreatAccountView &&
                CreatAccountView?.map((ele, i) => {
                  if (!!ele?.phoneinput) {
                    return (
                      <>
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <PhoneInput
                              disabled
                              inputClass="myphoneinput"
                              country={"in"}
                              onKeyDown={(e) => {
                                if (ele?.type?._attributes?.type == "number") {
                                  ["e", "E", "+", "-"].includes(e.key) &&
                                    e.preventDefault();
                                }
                              }}
                              countryCodeEditable={false}
                              name={ele?.name?._text}
                              value={formData[ele?.name?._text]}
                              onChange={(phone) => {
                                setFormData({
                                  ...formData,
                                  [ele?.name?._text]: phone,
                                });
                              }}
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
                      </>
                    );
                  } else if (!!ele?.library) {
                    if (ele?.label._text?.includes("ountry")) {
                      console.log(ele);
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Select
                              disabled
                              inputClass="countryclass"
                              className="countryclassnw"
                              options={Country.getAllCountries()}
                              getOptionLabel={(options) => {
                                return options["name"];
                              }}
                              getOptionValue={(options) => {
                                return options["name"];
                              }}
                              value={Countries}
                              onChange={(country) => {
                                setCountry(country);
                                setFormData({
                                  ...formData,
                                  ["Country"]: country?.name,
                                });
                              }}
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
                    } else if (ele?.label._text?.includes("tate")) {
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Select
                              disabled
                              options={State?.getStatesOfCountry(
                                Countries?.isoCode
                              )}
                              getOptionLabel={(options) => {
                                return options["name"];
                              }}
                              getOptionValue={(options) => {
                                return options["name"];
                              }}
                              value={States}
                              onChange={(State) => {
                                setState(State);
                                setFormData({
                                  ...formData,
                                  ["State"]: State?.name,
                                });
                              }}
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
                    } else if (ele?.label._text?.includes("ity")) {
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Select
                              disabled
                              options={City?.getCitiesOfState(
                                States?.countryCode,
                                States?.isoCode
                              )}
                              getOptionLabel={(options) => {
                                return options["name"];
                              }}
                              getOptionValue={(options) => {
                                return options["name"];
                              }}
                              value={Cities}
                              onChange={(City) => {
                                setCities(City);
                                setFormData({
                                  ...formData,
                                  ["City"]: City?.name,
                                });
                              }}
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
                    } else {
                      return (
                        <>
                          {ele?.type?._attributes?.type == "date" ? (
                            <>
                              <Col key={i} lg="4" md="4" sm="12">
                                <FormGroup key={i}>
                                  <Label>{ele?.label?._text}</Label>

                                  <Input
                                    disabled
                                    onKeyDown={(e) => {
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
                                    dateFormat={
                                      Context?.UserInformatio?.dateFormat
                                    }
                                    value={
                                      moment(formData[ele?.name?._text])
                                        .tz(Context?.UserInformatio?.timeZone)
                                        .format(
                                          Context?.UserInformatio?.dateFormat
                                        )
                                      // formData[ele?.name?._text]
                                    }
                                    // value={formData[ele?.name?._text]}
                                    onChange={(e) =>
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
                            <>
                              <Col key={i} lg="4" md="4" sm="12">
                                <FormGroup key={i}>
                                  <Label>{ele?.label?._text}</Label>
                                  <Input
                                    disabled
                                    onKeyDown={(e) => {
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
                                    onChange={(e) =>
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
                          )}
                        </>
                      );
                    }
                  } else {
                    return (
                      <>
                        {!!ele?.number ? (
                          <>
                            <Col key={i} lg="4" md="4" sm="12">
                              <FormGroup key={i}>
                                <Label>{ele?.label?._text}</Label>

                                <Input
                                  disabled
                                  onWheel={(e) => {
                                    e.preventDefault(); // Prevent the mouse wheel scroll event
                                  }}
                                  onKeyDown={(e) => {
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
                                  onChange={(e) =>
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
                                onKeyDown={(e) => {
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
                                onChange={(e) => {
                                  // const value = e.target.value;
                                  // // Use regular expression to allow only numbers
                                  // const numericValue = value.replace(
                                  //   /\D/g,
                                  //   ""
                                  // );
                                  handleInputChange(
                                    e,
                                    ele?.type?._attributes?.type,
                                    i
                                  );
                                }}
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
                        )}
                      </>
                    );
                  }
                })}
            </Row>
            <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
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
            </Col>
            <hr />
            {/* <Row className="mt-2 ">
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="">
                    <h4>Status</h4>
                  </Label>
                  <div className="form-label-group mx-1">
                    {CreatAccountView &&
                      CreatAccountView?.CreateAccount?.Radiobutton?.input?.map(
                        (ele, i) => {
                          return (
                            <FormGroup key={i}>
                              <Input
                                key={i}
                                style={{ marginRight: "3px" }}
                                required
                                type={ele?.type?._attributes?.type}
                                name={ele?.name?._text}
                                value={`${
                                  ele?.label?._text == "Active"
                                    ? "Active"
                                    : "Deactive"
                                }`}
                                onChange={handleInputChange}
                              />{" "}
                              <span
                                className="mx-1 mt-1"
                                style={{ marginRight: "20px" }}
                              >
                                {ele?.label?._text}
                              </span>
                            </FormGroup>
                          );
                        }
                      )}
                  </div>
                </Col>
              </Row> */}

            {/* <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2"
                >
                  Submit
                </Button.Ripple>
              </Row> */}
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default EditAccount;
