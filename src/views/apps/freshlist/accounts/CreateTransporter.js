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
import { Route, useHistory, useParams } from "react-router-dom";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  Createtransportersave,
  Get_RoleList,
  _BulkUpload,
  _Get,
  _GetList,
  _Put,
} from "../../../../ApiEndPoint/ApiCalling";

import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";

import {
  Bulk_Upload_Customer,
  Create_transporter_xmlView,
  Update_TransporterByID,
  View_TransporterByID,
} from "../../../../ApiEndPoint/Api";
import Multiselect from "multiselect-react-dropdown";

const CreateCustomer = () => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [RoleList, setRoleList] = useState([]);
  const [Countries, setCountry] = useState({});
  const [BulkImport, setBulkImport] = useState(null);
  const [States, setState] = useState({});
  const [Cities, setCities] = useState([]);
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState([]);
  const [transporterType, settransporterType] = useState("Create");
  const [index, setindex] = useState("");
  const [error, setError] = useState("");

  const Context = useContext(UserContext);
  let history = useHistory();
  let Params = useParams();

  const handleFileChange = (e, type, i) => {
    const { name, value, checked } = e.target;
    let allimages = Array.from(e.target.files);
    setindex(i);
    setFormData({
      ...formData,
      [name]: allimages,
    });
  };

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
        }
      } else if (type == "file") {
        if (e.target.files) {
          setFormData({
            ...formData,
            [name]: e.target.files[0],
          });
        }
      } else {
        if (value.length <= 10) {
          setFormData({
            ...formData,
            [name]: value,
          });

          setError("");
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      }
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const date = new Date(position.timestamp);
          const CurentTime = date.toLocaleString();
          formData.Geotagging = `${position.coords.latitude},${position.coords.longitude}`;
        },
        (error) => {
          swal(`Error: ${error}`);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      swal(`Error: Geolocation not found`);
    }
  }, []);

  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userData"));
    Get_RoleList(userdata?._id, userdata?.database)
      .then((res) => {
        let ShowList = res?.Role?.filter((item, i) =>
          item?.roleName?.toLowerCase()?.includes("transporter")
        );
        setRoleList(ShowList);
      })
      .catch((err) => {
        console.log(err);
        swal("Roles List Not found");
      });
  }, []);

  useEffect(() => {
    console.log(Params?.id);
    if (Params?.id == 0) {
      settransporterType("Create");
    } else {
      settransporterType("Edit");

      _Get(View_TransporterByID, Params?.id)
        .then((res) => {
          let transporter = res?.Transporter[0];
          transporter.Duedate = transporter?.Duedate?.split("T")[0];
          setFormData(transporter);
          if (transporter?.Country) {
            let countryselected = Country?.getAllCountries()?.filter(
              (ele, i) => ele?.name == transporter?.Country
            );
            setCountry(countryselected);
            if (transporter?.State) {
              let stateselected = State?.getStatesOfCountry(
                countryselected[0]?.isoCode
              )?.filter((ele, i) => ele?.name == transporter?.State);
              setState(stateselected);
              console.log(stateselected);
              if (transporter?.City) {
                // let cityselected = City.getCitiesOfState(
                //   stateselected[0]?.countryCode,
                //   stateselected[0]?.isoCode
                // )?.filter((ele, i) => ele?.name == transporter?.City);
                setCities(transporter?.City);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    _GetList(Create_transporter_xmlView)
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, {
          compact: true,
          spaces: 2,
        });

        console.log(JSON.parse(jsonData)?.CreateCustomer);
        setCreatAccountView(JSON.parse(jsonData)?.CreateCustomer?.input);

        setdropdownValue(JSON.parse(jsonData)?.CreateCustomer?.MyDropDown);
      })
      .catch((err) => {
        console.log(err);
        swal("Something Went Wrong");
      });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (BulkImport !== null || BulkImport != undefined) {
      let formdata = new FormData();
      formdata.append("file", BulkImport);

      await _BulkUpload(Bulk_Upload_Customer, formdata)
        .then((res) => {
          swal(`${res?.message}`);
        })
        .catch((err) => {
          console.log(err);
          swal("Something Went Wrong");
        });
    } else {
      let userdata = JSON.parse(localStorage.getItem("userData"));
      let formdata = new FormData();

      formdata.append(
        `${dropdownValue?.dropdown?.name?._text}`,
        formData[dropdownValue?.dropdown?.name?._text]
      );
      CreatAccountView?.map((ele, i) => {
        if (ele?.type?._attributes?.type == "text") {
          if (ele?.name?._text == "City") {
            formdata.append(`${ele?.name?._text}`, JSON.stringify(Cities));
          } else {
            formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
          }
        } else if (ele?.type?._attributes?.type == "file") {
          if (ele?.name?._text == "Shopphoto") {
            formData[ele?.name?._text]?.map((val, index) => {
              formdata.append("file", formData[ele?.name?._text][index]);
            });
          }
          if (ele?.name?._text == "photo") {
            formData[ele?.name?._text]?.map((val, index) => {
              formdata.append("files", formData[ele?.name?._text][index]);
            });
          }
        } else {
          formdata.append(`${ele?.name?._text}`, formData[ele?.name?._text]);
        }
      });

      formdata.append("status", formData?.status);
      formdata.append("database", userdata?.database);
      formdata.append("rolename", formData?.rolename);

      formdata.forEach((value, key) => {
        console.log(key, value);
      });

      if (error) {
        // swal("Error occured while Entering Details");
      } else {
        if (Params?.id == "0") {
          Createtransportersave(formdata)
            .then((res) => {
              console.log(res);

              if (res.status) {
                history.goBack();
                swal("Transporter Created Successfully");
              }
            })
            .catch((err) => {
              console.log(err.response);
              swal("Please Fill correct details");
            });
        } else {
          // Update_TransporterByID
          _Put(Update_TransporterByID, Params?.id, formdata)
            .then((res) => {
              console.log(res);
              if (res.status) {
                history.goBack();
                swal("Transporter Updated Successfully");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };
  const onSelect1 = (selectedList, selectedItem) => {
    setCities(selectedList);
    console.log(selectedList);
  };
  const onRemove1 = (selectedList, selectedItem) => {
    console.log(selectedList);
    setCities(selectedList);
  };
  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">
                {transporterType && transporterType} Transporter
              </h1>
            </Col>
            <Col>
              <div className="float-right">
                <Route
                  render={({ history }) => (
                    <Button
                      style={{ cursor: "pointer" }}
                      className="float-right mr-1"
                      color="primary"
                      onClick={() => history.goBack()}>
                      Back
                    </Button>
                  )}
                />
              </div>
            </Col>
          </Row>
          {/* <hr /> */}

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                <Col lg="4" md="4">
                  <FormGroup>
                    <Label className="mb-1">Role List *</Label>
                    <CustomInput
                      required
                      type="select"
                      name="rolename"
                      value={formData["rolename"]}
                      onChange={(e) => {
                        const selected = e.target.options[
                          e.target.selectedIndex
                        ]
                          .getAttribute("data-name")
                          ?.split(" ");

                        setFormData({
                          ...formData,
                          ["rolename"]: e.target.value,
                          ["roleName"]: selected[1],
                        });
                      }}>
                      <option>--select Role--</option>
                      {RoleList &&
                        RoleList?.length &&
                        RoleList?.map((ele, i) => {
                          return (
                            <option
                              data-name={`${ele?.position} ${ele?.roleName}`}
                              value={ele?._id}>
                              {ele?.roleName}
                            </option>
                          );
                        })}
                    </CustomInput>
                  </FormGroup>
                </Col>
                {dropdownValue && dropdownValue ? (
                  <>
                    <Col lg="4" md="4" sm="12">
                      <FormGroup>
                        <Label className="mb-1">
                          {dropdownValue?.dropdown?.label?._text &&
                            dropdownValue?.dropdown?.label?._text}{" "}
                          *
                        </Label>
                        <CustomInput
                          required
                          type="select"
                          name={dropdownValue?.dropdown?.name?._text}
                          value={formData[dropdownValue?.dropdown?.name?._text]}
                          onChange={handleInputChange}>
                          <option value="">--Select --</option>
                          {dropdownValue?.dropdown?.option?.map(
                            (option, index) => (
                              <option
                                key={index}
                                value={option?._attributes?.value}>
                                {option?._attributes?.value}
                              </option>
                            )
                          )}
                        </CustomInput>
                      </FormGroup>
                    </Col>
                    {/* {dropdownValue?.map((ele, i) => {
                      return (
                        <>
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label className="mb-1">
                                {ele?.dropdown?.label?._text &&
                                  ele?.dropdown?.label?._text}
                              </Label>
                              <CustomInput
                                required
                                type="select"
                                name={ele?.dropdown?.name?._text}
                                value={formData[ele?.dropdown?.name?._text]}
                                onChange={handleInputChange}>
                                <option value="">--Select --</option>
                                {ele?.dropdown?.option?.map((option, index) => (
                                  <option
                                    key={index}
                                    value={option?._attributes?.value}>
                                    {option?._attributes?.value}
                                  </option>
                                ))}
                              </CustomInput>
                            </FormGroup>
                          </Col>
                        </>
                      );
                    })} */}
                  </>
                ) : null}

                {CreatAccountView &&
                  CreatAccountView?.map((ele, i) => {
                    if (
                      formData?.Registration_Type &&
                      formData?.Registration_Type == "Unregistered"
                    ) {
                      if (ele?.label?._text.includes("GST Number")) {
                        return null;
                      }
                    }
                    if (
                      formData?.roleName &&
                      formData?.roleName == "Transporter"
                    ) {
                    }
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
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
                              <PhoneInput
                                inputClass="myphoneinput"
                                country={"us"}
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
                        {
                          /* console.log(ele); */
                        }
                        return (
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
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
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
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
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
                              <Multiselect
                                required
                                isObject="false"
                                options={City?.getCitiesOfState(
                                  States?.countryCode,
                                  States?.isoCode
                                )} // Options to display in the dropdown
                                selectedValues={Cities && Cities} // Preselected value to persist in dropdown
                                onSelect={onSelect1} // Function will trigger on select event
                                onRemove={onRemove1} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                              />
                              {/* <Select
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
                              /> */}
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
                                    <Label className="mb-1">
                                      {ele?.label?._text}
                                    </Label>

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
                                    <Label className="mb-1">
                                      {ele?.label?._text}
                                    </Label>

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
                                  <Label className="mb-1">
                                    {ele?.label?._text}
                                  </Label>

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
                                {ele?.type?._attributes?.type &&
                                ele?.type?._attributes?.type == "file" ? (
                                  <>
                                    <Label className="mb-1">
                                      {ele?.label?._text}
                                    </Label>

                                    <Input
                                      multiple
                                      className="form-control"
                                      type={ele?.type?._attributes?.type}
                                      placeholder={ele?.placeholder?._text}
                                      name={ele?.name?._text}
                                      //   value={formData[ele?.name?._text]}
                                      onChange={(e) => {
                                        // const value = e.target.value;
                                        // // Use regular expression to allow only numbers
                                        // const numericValue = value.replace(
                                        //   /\D/g,
                                        //   ""
                                        // );
                                        handleFileChange(
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
                                  </>
                                ) : (
                                  <>
                                    <Label className="mb-1">
                                      {ele?.label?._text}
                                    </Label>

                                    <Input
                                      className="form-control"
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
                                  </>
                                )}

                                {/* <Label className="mb-1">
                                  {ele?.label?._text}
                                </Label>

                                <Input
                                  className="form-control"
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
                                )} */}
                              </FormGroup>
                            </Col>
                          )}
                        </>
                      );
                    }
                  })}
              </Row>

              <Row className="mt-2">
                <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-0">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        ["status"]: e.target.value,
                      });
                    }}>
                    <input
                      style={{ marginRight: "3px" }}
                      checked={formData?.status == "Active"}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      checked={formData?.status == "Deactive"}
                      name="status"
                      value="Deactive"
                    />
                    <span style={{ marginRight: "3px" }}>Deactive</span>
                  </div>
                </Col>
              </Row>

              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2">
                  Submit
                </Button.Ripple>
              </Row>
            </Form>
            <Form className="m-1" onSubmit={submitHandler}>
              <hr />
              <Row>
                <Col lg="12" md="12" sm="12">
                  <Label>OR</Label>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <FormGroup>
                    <Label>Bulk Import</Label>

                    <Input
                      className="form-control"
                      type="file"
                      placeholder=""
                      name="BulkImport"
                      onChange={(e) => {
                        setBulkImport(e.target.files[0]);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2">
                  Import
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default CreateCustomer;
