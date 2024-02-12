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
import FaceDetector from "../../../dashboard/ecommerce/FaceDetector";
import { history } from "../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import moment from "moment-timezone";
import { Route, useHistory } from "react-router-dom";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  CreateAccountSave,
  CreateAccountView,
  Get_RoleList,
  _BulkUpload,
  _Get,
  _GetList,
  _PostSave,
} from "../../../../ApiEndPoint/ApiCalling";

import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";

import {
  Assign_Role_To_SuperAdmin,
  Bulk_Upload_User,
  Created_Warehouse,
  Role_list_by_Master,
  Super_Admin_List,
  country_state_City_List,
} from "../../../../ApiEndPoint/Api";

const CreateAccount = () => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [WareHouseList, setWareHouseList] = useState([]);
  const [SelectedWareHouse, setSelectedWareHouse] = useState([]);

  const [BulkImport, setBulkImport] = useState(null);
  const [Master, setMaster] = useState(false);
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState([]);
  const [Country_State_city, setCountry_State_city] = useState([]);
  const [AllAssignRoleList, setAllAssignRoleList] = useState([]);
  const [SelectedRoleToAssign, setSelectedRoleToAssign] = useState([]);
  const [index, setindex] = useState("");
  const [error, setError] = useState("");

  const [WareHouseIncharge, setWareHouseIncharge] = useState(false);
  const [permissions, setpermissions] = useState({});

  const Context = useContext(UserContext);
  let history = useHistory();

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

  // useEffect(() => {
  // console.log(formData);
  // }, [formData]);
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userData"));
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
      _Get(Created_Warehouse, userInfo?.database)
        .then((res) => {
          setWareHouseList(res?.Warehouse);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getLocation();
  }, []);

  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userData"));
    _GetList(country_state_City_List)
      .then((res) => {
        setCountry_State_city(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (userdata?.rolename?.position === 0) {
      setMaster(true);
      _Get(Role_list_by_Master, userdata?._id)
        .then((res) => {
          let Superadmin = res?.Role?.filter((ele) =>
            ele?.roleName?.toLowerCase()?.includes("superadmin")
          );
          let WithoutSuperadmin = res?.Role?.filter(
            (ele) => ele?.roleName !== "SuperAdmin"
          );
          if (Superadmin) {
            setdropdownValue(Superadmin);
          }

          if (WithoutSuperadmin) {
            setAllAssignRoleList(res?.Role);
          }
        })
        .catch((err) => {
          console.log(err);
          swal("Roles List Not found");
        });
    } else {
      Get_RoleList(userdata?._id, userdata?.database)
        .then((res) => {
          let ShowList = res?.Role?.filter(
            (item, i) => item?.position > userdata?.rolename?.position
          );
          setdropdownValue(res?.Role);
          // console.log(ShowList);
        })
        .catch((err) => {
          console.log(err);
          swal("Roles List Not found");
        });
    }
    CreateAccountView()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        setCreatAccountView(JSON.parse(jsonData)?.CreateUser?.input);
        setdropdownValue(JSON.parse(jsonData));
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(userdata?._id);
    // formData["created_by"] = userdata?._id;
  }, []);

  // console.log(BulkImport);
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (WareHouseIncharge) {
      let wareHouse = SelectedWareHouse?.map((ele) => {
        return { id: ele?._id };
      });
      formData["warehouse"] = wareHouse;
    }

    if (Master) {
      formData["position"] = 1;
    }
    if (BulkImport !== null || BulkImport != undefined) {
      let formdata = new FormData();
      formdata.append("file", BulkImport);

      await _BulkUpload(Bulk_Upload_User, formdata)
        .then((res) => {
          swal(`${res?.message}`);
        })
        .catch((err) => {
          console.log(err);
          swal("Something Went Wrong");
        });
    } else {
      if (formData?.rolename && formData?.email && formData?.firstName) {
        if (error) {
          swal("Error occured while Entering Details");
        } else {
          CreateAccountSave(formData)
            .then((res) => {
              if (res?.status) {
                let userData = JSON.parse(localStorage.getItem("userData"));
                let AssignDataBase = [];

                if (SelectedRoleToAssign?.length) {
                  AssignDataBase = SelectedRoleToAssign?.map((ele) => {
                    return {
                      role: {
                        roleName: ele?.roleName,
                        position: 0,
                        desc: ele?.desc,
                        rank: 0,
                        rolePermission: ele?.rolePermission,
                        database: formData["database"],
                        createdBy: userData?._id,
                      },
                    };
                  });
                  let payload = {
                    Roles: AssignDataBase,
                  };

                  if (res?.User._id) {
                    _PostSave(Assign_Role_To_SuperAdmin, payload)
                      .then((res) => {
                        console.log(res);
                        _GetList(Super_Admin_List)
                          .then((res) => {
                            localStorage.setItem(
                              "AllSuper",
                              JSON.stringify(res?.SuperAdmin)
                            );
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        console.log(res);
                      })
                      .catch((err) => {
                        // setLoader(false);

                        console.log(err);
                      });
                  }
                }
                swal("User Created Successfully");
                history.goBack();
              }
            })
            .catch((err) => {
              if (!!err.response?.data?.message) {
                swal(`${err.response?.data?.message}`);
              }
            });
        }
      } else {
        swal("Enter User Name Email and Select Role");
      }
    }
  };
  const onSelect1 = (selectedList, selectedItem) => {
    console.log(selectedList);
    setSelectedRoleToAssign(selectedList);
    // setProductList(selectedList[0].productItems);
  };
  const onRemove1 = (selectedList, removedItem) => {
    console.log(selectedList);
    setSelectedRoleToAssign(selectedList);

    // console.log(index);
  };
  return (
    <div>
      <div>
        <Card>
          <Row>
            <Col>{/* <FaceDetector /> */}</Col>
          </Row>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Create User</h1>
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
                        history.push("/app/SoftNumen/accounSearch")
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
                <Col lg="4" md="4">
                  <FormGroup>
                    <Label>Role List</Label>
                    <CustomInput
                      required
                      type="select"
                      name="rolename"
                      value={formData["rolename"]}
                      onChange={(e) => {
                        const selectedName =
                          e.target.options[e.target.selectedIndex].getAttribute(
                            "data-name"
                          );
                        const selectedPosition =
                          e.target.options[e.target.selectedIndex].getAttribute(
                            "data-id"
                          );
                        if (selectedPosition == "WareHouse Incharge") {
                          setWareHouseIncharge(true);
                        } else {
                          setWareHouseIncharge(false);
                        }
                        if (
                          selectedPosition?.toLowerCase()?.includes("admin") ||
                          selectedPosition
                            ?.toLowerCase()
                            ?.includes("superadmin")
                        ) {
                          let userdata = JSON.parse(
                            localStorage.getItem("userData")
                          );

                          formData["created_by"] = userdata?._id;
                        }

                        setFormData({
                          ...formData,
                          ["rolename"]: e.target.value,
                          ["database"]: selectedName,
                        });
                      }}>
                      <option>--select Role--</option>
                      {dropdownValue &&
                        dropdownValue?.length &&
                        dropdownValue?.map((ele, i) => {
                          return (
                            <option
                              data-id={ele?.roleName}
                              data-name={ele?.database}
                              value={ele?._id}>
                              {ele?.roleName}
                            </option>
                          );
                        })}
                    </CustomInput>
                  </FormGroup>
                </Col>
                {WareHouseIncharge && WareHouseIncharge && (
                  <>
                    <Col className="mb-1" lg="4" md="4">
                      <Label>Selected WareHouse </Label>
                      <Multiselect
                        required
                        showCheckbox="true"
                        isObject="false"
                        options={WareHouseList} // Options to display in the dropdown
                        // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                        onSelect={(selectedList, selectedItem) => {
                          setSelectedWareHouse(selectedList);
                        }} // Function will trigger on select event
                        onRemove={(selectedList, removedItem) => {
                          setSelectedWareHouse(selectedList);
                        }} // Function will trigger on remove event
                        displayValue="warehouseName" // Property name to display in the dropdown options
                      />
                    </Col>
                  </>
                )}
                {Master && Master && (
                  <>
                    <Col className="mb-1" lg="4" md="4">
                      <div className="">
                        <Label>Select Roles to Assign * </Label>

                        <Multiselect
                          required
                          showCheckbox="true"
                          isObject="false"
                          options={AllAssignRoleList} // Options to display in the dropdown
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={onSelect1} // Function will trigger on select event
                          onRemove={onRemove1} // Function will trigger on remove event
                          displayValue="roleName" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>

                    <Col lg="4" md="4">
                      <FormGroup>
                        <Label>Database Name *</Label>
                        <Input
                          placeholder="one or two or three ..."
                          type="text"
                          value={formData["database"]}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              ["database"]: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </>
                )}

                {CreatAccountView &&
                  CreatAccountView?.map((ele, i) => {
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
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    ele?.type?._attributes?.type,
                                    i
                                  )
                                }
                              />
                              {/* <Select
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
                      } else if (ele?.label._text?.includes("tate")) {
                        return (
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
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
                              {/* <Select
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
                      } else if (ele?.label._text?.includes("ity")) {
                        return (
                          <Col key={i} lg="4" md="4" sm="12">
                            <FormGroup>
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
                    } else if (ele?.label._text?.includes("incode")) {
                      return (
                        <Col key={i} lg="4" md="4" sm="12">
                          <FormGroup>
                            <Label>{ele?.label?._text}</Label>
                            <Input
                              onKeyDown={(e) => {
                                if (ele?.type?._attributes?.type == "number") {
                                  ["e", "E", "+", "-"].includes(e.key) &&
                                    e.preventDefault();
                                }
                              }}
                              type={ele?.type?._attributes?.type}
                              placeholder={ele?.placeholder?._text}
                              name={ele?.name?._text}
                              value={formData[ele?.name?._text]}
                              onChange={(e) => {
                                let SelectedCity = Country_State_city?.filter(
                                  (ele) => ele?.Pincode == e.target.value
                                );
                                // console.log(SelectedCity);
                                if (SelectedCity?.length) {
                                  setFormData({
                                    ...formData,
                                    ["State"]: SelectedCity[0]?.StateName,
                                    ["City"]: SelectedCity[0]?.District,
                                    ["pincode"]: e.target.value,
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    [ele?.name?._text]: e.target.value,
                                  });
                                }
                                // handleInputChange(
                                //   e,
                                //   ele?.type?._attributes?.type,
                                //   i
                                // );
                              }}
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
                    required
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Active"
                  />
                  <span style={{ marginRight: "20px" }}>Active</span>

                  <input
                    required
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Deactive"
                  />
                  <span style={{ marginRight: "3px" }}>Deactive</span>
                </div>
              </Col>
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
export default CreateAccount;
