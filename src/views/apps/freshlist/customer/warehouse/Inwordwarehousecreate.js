import React, { useEffect, useState, useContext } from "react";
import xmlJs from "xml-js";
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
  Badge,
} from "reactstrap";

import { history } from "../../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import moment from "moment-timezone";
import { Route } from "react-router-dom";

import swal from "sweetalert";


import {
  createrowmaterial,
  CreateAccountSave,
  CreateAccountView,
  Get_RoleList,
  CreateWareHousegetXml,
} from "../../../../../../src/ApiEndPoint/ApiCalling";
import { BiEnvelope } from "react-icons/bi";
import { FcPhoneAndroid } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import "../../../../../assets/scss/pages/users.scss"


import UserContext from "../../../../../context/Context";
import { CloudLightning } from "react-feather";
import { FaPlus } from "react-icons/fa";




const Inwordwarehousecreate = () => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [viewdropdown,setViewdropdown] = useState([]);
  const [Countries, setCountry] = useState({});
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState([]);
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
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            console.log(position.coords);
          },
          (error) => {
            swal("error", error);
          },
          { enableHighAccuracy: true }
        );
      } else {
        swal("Your Browser does not support Location");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userData"));
    // Get_RoleList()
    //   .then((res) => {
        
    //     let ShowList = res?.Role?.filter(
    //       (item, i) => item?.position > userdata?.rolename?.position
    //     );
        
    //     setdropdownValue(ShowList);
    //     console.log(ShowList);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     swal("Roles List Not found");
    //   });
      CreateWareHousegetXml()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        setCreatAccountView(JSON.parse(jsonData)?.RowMaterialConfig?.input);
        console.log(jsonData);
        console.log(JSON.parse(jsonData)?.RowMaterialConfig?.MyDropdown);
        setdropdownValue(JSON.parse(jsonData)?.RowMaterialConfig?.MyDropdown);
        
        
      })
      .catch((err) => {
        console.log(err);
      });
      
      console.log(userdata?._id)
      formData["created_by"]=userdata?._id
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    createrowmaterial(formData)
    .then((res) => {
      setFormData({});
      if (res.status) {
        // window.location.reload();
        swal("Created Successfully");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Inword Row Create</h1>
            </Col>
            <Col>
              <div className="float-right">
                <Route
                  render={({ history }) => (
                    <Button
                      style={{ cursor: "pointer" }}
                      className="float-right mr-1"
                      color="primary"
                      onClick={() =>
                        history.push("/app/softNumen/warehouse/RawMaterialInward")
                      }>
                      {" "}
                      Back
                      {/* <FaPlus size={15} /> Create User */}
                    </Button>
                  )}
                />
              </div>
            </Col>
          </Row>
          {/* <hr /> */}

          <div className="px-1 ">
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
              
                
              { CreatAccountView &&
                CreatAccountView?.map((ele, i) => {
                  {
                    /* console.log(Context?.UserInformatio?.dateFormat); */
                  }
                  // console.log(Countries);
                  // console.log(States);
                  const convertedTime = moment("2022-08-05T12:00:00")
                    .tz("America/New_York")
                    .format("D MMM, YYYY HH:mm");

                  if (!!ele?.phoneinput) {
                    return (
                      <>
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <PhoneInput
                              inputClass="myphoneinput"
                              country={"in"}
                              onKeyDown={(e) => {
                                if (
                                  ele?.type?._attributes?.type == "number"
                                ) {
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
                    );
                  } else if (!!ele?.library) {
                    if (ele?.label._text?.includes("ountry")) {
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Select
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
                      );
                    } else if (ele?.label._text?.includes("tate")) {
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Select
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
                      );
                    } else if (ele?.label._text?.includes("ity")) {
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Select
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
                                    onKeyDown={(e) => {
                                      if (
                                        ele?.type?._attributes?.type ==
                                        "number"
                                      ) {
                                        ["e", "E", "+", "-"].includes(
                                          e.key
                                        ) && e.preventDefault();
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
                                    onKeyDown={(e) => {
                                      if (
                                        ele?.type?._attributes?.type ==
                                        "number"
                                      ) {
                                        ["e", "E", "+", "-"].includes(
                                          e.key
                                        ) && e.preventDefault();
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

              
              
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2">
                  Submit
                </Button.Ripple>
              </Row>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Inwordwarehousecreate;
