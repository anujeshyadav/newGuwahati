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
  CreateCustomersave,
  CreateCustomerxmlView,
  _Get,
} from "../../../../ApiEndPoint/ApiCalling";
import { BiBorderRadius, BiEnvelope } from "react-icons/bi";
import { FcPhoneAndroid } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
import { CloudLightning } from "react-feather";
import { FaPlus } from "react-icons/fa";
import Multiselect from "multiselect-react-dropdown";
import {
  Create_Transporter_List,
  Image_URL,
} from "../../../../ApiEndPoint/Api";

const CreateCustomer = ({ ViewOneData }) => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [Countries, setCountry] = useState({});
  const [TransporterList, setTransporterList] = useState([]);
  const [AllTransporterList, setAllTransporterList] = useState([]);

  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState([]);
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});

  const Context = useContext(UserContext);

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
        //  else {
        //   setError(
        //     "Please enter a valid number with a maximum length of 10 digits"
        //   );
        // }
      } else if (type == "file") {
        // debugger;
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
  // useEffect(() => {
  //   let userData = JSON.parse(localStorage.getItem("userData"));
  //   _Get(Create_Transporter_List, userData?.database)
  //     .then((res) => {
  //       let value = res?.Transporter;
  //       console.log(ViewOneData?.assignTransporter);
  //       let selectedtransporter = ViewOneData?.assignTransporter?.map((ele) => {
  //         return ele?.id;
  //       });
  //       debugger;
  //       if (value?.length) {
  //         setTransporterList(selectedtransporter);
  //         setAllTransporterList(value);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(ViewOneData);
    debugger;
    setFormData(ViewOneData);
    let selectedtransporter = ViewOneData?.assignTransporter?.map((ele) => {
      return ele?.id;
    });

    if (selectedtransporter?.length) {
      setTransporterList(selectedtransporter);
    }
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
    CreateCustomerxmlView()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData)?.CreateCustomer);
        setCreatAccountView(JSON.parse(jsonData)?.CreateCustomer?.input);

        setdropdownValue(JSON.parse(jsonData)?.CreateCustomer?.MyDropDown);
      })
      .catch((err) => {
        console.log(err);
        swal("Something Went Wrong");
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(CreatAccountView);
    // console.log(dropdownValue);
    let formdata = new FormData();
    CreatAccountView?.map((ele, i) => {
      if (ele?.type?._attributes?.type == "text") {
        formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
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
        formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
      }
    });
    formdata.append(
      `${dropdownValue?.name?._text}`,
      formData[dropdownValue?.name?._text]
    );
    formdata.forEach((value, key) => {
      console.log(key, value);
    });
    if (error) {
      swal("Error occured while Entering Details");
    } else {
      CreateCustomersave(formdata)
        .then((res) => {
          console.log(res);
          setFormData({});
          if (res.status) {
            window.location.reload();
            swal("User Created Successfully");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
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
              <h1 className="float-left">View Customer</h1>
            </Col>
            <Col>
              {/* <div className="float-right">
                <Route
                  render={({ history }) => (
                    <Button
                      style={{ cursor: "pointer" }}
                      className="float-right mr-1"
                      color="primary"
                      onClick={() =>
                        history.push("/app/SoftNumen/CustomerSearch")
                      }
                    >
                      {" "}
                      Back
                    </Button>
                  )}
                />
              </div> */}
            </Col>
          </Row>
          {/* <hr /> */}

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                {dropdownValue && dropdownValue ? (
                  <>
                    {dropdownValue?.map((ele, i) => {
                      if (
                        formData?.roleName &&
                        formData?.roleName == "Transporter"
                      ) {
                        if (
                          ele?.dropdown?.label?._text == "Select Party Type"
                        ) {
                          return null;
                        } else {
                          return (
                            <>
                              <Col key={i} lg="4" md="4" sm="12">
                                <FormGroup>
                                  <Label className="mb-1">
                                    {ele?.dropdown?.label?._text &&
                                      ele?.dropdown?.label?._text}
                                  </Label>
                                  <CustomInput
                                    disabled
                                    type="select"
                                    name={ele?.dropdown?.name?._text}
                                    value={formData[ele?.dropdown?.name?._text]}
                                    onChange={handleInputChange}>
                                    <option value="">--Select --</option>
                                    {ele?.dropdown?.option?.map(
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
                            </>
                          );
                        }
                      } else {
                        return (
                          <>
                            <Col key={i} lg="4" md="4" sm="12">
                              <FormGroup>
                                <Label className="mb-1">
                                  {ele?.dropdown?.label?._text &&
                                    ele?.dropdown?.label?._text}
                                </Label>
                                <CustomInput
                                  disabled
                                  type="select"
                                  name={ele?.dropdown?.name?._text}
                                  value={formData[ele?.dropdown?.name?._text]}
                                  onChange={handleInputChange}>
                                  <option value="">--Select --</option>
                                  {ele?.dropdown?.option?.map(
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
                          </>
                        );
                      }
                    })}
                  </>
                ) : null}

                {CreatAccountView &&
                  CreatAccountView?.map((ele, i) => {
                    if (ele?.name?._text == "Category") {
                      return (
                        <>
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label className="mb-1">
                                {ele?.label?._text} *
                              </Label>
                              <Input
                                disabled
                                value={formData?.Category?.groupName}
                                // onChange={(e) => {
                                //   setFormData({
                                //     ...formData,
                                //     [ele?.name?._text]: e.target.value,
                                //   });
                                // }}
                                type="text"
                              />

                              {/* {CustomerGroup &&
                                  CustomerGroup?.map((ele, i) => (
                                    <option key={ele?._id} value={ele?._id}>
                                      {ele?.groupName}
                                    </option>
                                  ))} */}

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
                    }
                    if (
                      formData?.Registration_Type &&
                      formData?.Registration_Type == "Unregistered"
                    ) {
                      if (ele?.label?._text.includes("GST Number")) {
                        return null;
                      }
                    }
                    if (
                      ele?.label?._text &&
                      ele?.label?._text?.toLowerCase()?.includes("transporter")
                    ) {
                      return (
                        <>
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
                              <CustomInput
                                disabled
                                value={formData?.ele?.name?._text}
                                onChange={(e) => {
                                  //  if (e.target.value == "other") {
                                  //    handleSetShowTransporter(e.target.value);
                                  //  }
                                  setFormData({
                                    ...formData,
                                    [ele?.name?._text]: e.target.value,
                                  });
                                }}
                                type="select">
                                <option>--Select Transporter Type--</option>
                                <option value="Local">Local</option>
                                <option value="other">Other</option>
                              </CustomInput>

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
                          {formData?.transporter_detail &&
                          formData?.transporter_detail == "other" ? (
                            <>
                              <Col key={i} lg="4" md="4" sm="12">
                                <FormGroup>
                                  <Label className="mb-1">
                                    Transporter List
                                  </Label>
                                  <Multiselect
                                    disable
                                    isObject="false"
                                    // options={TransporterList} // Options to display in the dropdown
                                    selectedValues={
                                      TransporterList && TransporterList
                                    } // Preselected value to persist in dropdown
                                    // onSelect={onSelect1} // Function will trigger on select event
                                    // onRemove={onRemove1} // Function will trigger on remove event
                                    displayValue="firstName" // Property name to display in the dropdown options
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
                          ) : null}
                        </>
                      );
                    }
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
                                disabled
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
                        console.log(ele);
                        return (
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
                              <Select
                                disabled
                                inputClass="countryclass"
                                className="countryclassnw"
                                // options={Country.getAllCountries()}
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
                                      disabled
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
                                      disabled
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
                                {ele?.type?._attributes?.type &&
                                ele?.type?._attributes?.type == "file" ? (
                                  <>
                                    <Label className="mb-1">
                                      {ele?.label?._text}
                                    </Label>

                                    <Input
                                      disabled
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
                                      disabled
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
              <Row>
                {formData.Shopphoto &&
                  formData.Shopphoto?.map((ele) => {
                    return (
                      <>
                        <Col key={ele}>
                          <label>Shop Photo</label>
                          <img
                            style={{ borderRadius: "12px" }}
                            width={220}
                            height={280}
                            src={`${Image_URL}/Images/${ele}`}
                            alt="Img"
                          />
                        </Col>
                      </>
                    );
                  })}
                {formData.photo &&
                  formData.photo?.map((ele) => {
                    return (
                      <>
                        <Col key={ele}>
                          <label>Photo</label>
                          <img
                            style={{ borderRadius: "12px" }}
                            width={220}
                            height={280}
                            src={`${Image_URL}/Images/${ele}`}
                            alt="Img"
                          />
                        </Col>
                      </>
                    );
                  })}
                <Col></Col>
              </Row>
              <hr />
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default CreateCustomer;
