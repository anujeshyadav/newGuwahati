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
} from "reactstrap";
import { history } from "../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import moment from "moment-timezone";
import { Route, useParams } from "react-router-dom";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  AllCategoryList,
  CreateProductXMLView,
  SaveProduct,
  UnitListView,
  CreateWarehouseList,
  _Get,
  CreateAccountList,
  _Put,
} from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
import {
  Update_Product,
  ViewOne_Product,
  WareahouseList_For_addProduct,
} from "../../../../ApiEndPoint/Api";

const EditAddProduct = () => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [UnitList, setUnitList] = useState([]);
  const [wareHouseList, setWareHouseList] = useState([]);
  const [subcatlist, setsubcatlist] = useState([]);
  const [Countries, setCountry] = useState({});
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});

  const Context = useContext(UserContext);
  const Params = useParams();

  const handleInputChange = (e, type, i) => {
    const { name, value, checked } = e.target;

    if (name == "Unit") {
      let value = document.getElementById("unitType").value;
      const selectedOptionValue = e.target.value;
      const selectedIndex = e.target.selectedIndex;
      const selectedOptionText = e.target.options[selectedIndex]?.text;

      let list = formData;
      list["unitType"] = selectedOptionText;
      setFormData(list);
    }
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
      } else if (type == "file") {
        if (e.target.files) {
          setFormData({
            ...formData,
            [name]: e.target.files[0],
          });
        }
      } else {
        if (value.length) {
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
  const changeHandler1 = (e) => {
    setFormData({
      ...formData,
      ["status"]: e.target.value,
    });
  };
  const changeHandler2 = (e) => {
    setFormData({
      ...formData,
      ["ProductType"]: e.target.value,
    });
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    _Get(ViewOne_Product, Params?.id)
      .then((res) => {
        setFormData({
          ...res?.Product,
          ["ProductType"]: res?.Product?.addProductType,
        });
        AllCategoryList(userData?._id, userData?.database)
          .then((resp) => {
            // console.log(resp);
            if (resp?.Category) {
              let selectedcat = resp?.Category?.filter(
                (ele) => ele?.name == res?.Product?.category
              );
              let AllSubCategoried = selectedcat[0]?.subcategories;
              let selectedSubCat = AllSubCategoried?.filter(
                (ele) => ele?.name == res?.Product?.SubCategory
              );
              setcategoryList(resp.Category);
              setsubcatlist(AllSubCategoried);
              // setFormData({
              //   ...formData,
              //   ["category"]: selectedcat[0]?.name,
              //   ["SubCategory"]: selectedSubCat[0]?.name,
              // });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        UnitListView(userData?._id, userData?.database)
          .then((response) => {
            let selectedunit = response?.Unit?.filter(
              (ele) => ele.primaryUnit == res?.Product?.unitType
            );
            // setFormData({
            //   ...formData,
            //   ["Unit"]: selectedunit[0]?.unitQty,
            // });
            setUnitList(response?.Unit);
          })
          .catch((err) => {
            console.log(err);
          });

        _Get(WareahouseList_For_addProduct, userData?.database)
          .then((values) => {
            // console.log(res?.Product);
            // warehouse;
            let value = values?.Warehouse;
            if (value) {
              setWareHouseList(value);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    CreateProductXMLView()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        // console.log(JSON.parse(jsonData).createProduct);
        setCreatAccountView(JSON.parse(jsonData)?.createProduct);
        setdropdownValue(JSON.parse(jsonData)?.createProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFileChange = (e, type, i) => {
    const { name } = e.target;
    setindex(i);
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    let userData = JSON.parse(localStorage.getItem("userData"));
    formdata.append("created_by", userData._id);
    CreatAccountView?.input?.map((ele, i) => {
      if (ele?.type?._attributes?.type == "text") {
        formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
      } else if (ele?.type?._attributes?.type == "file") {
        formdata.append("file", formData[ele?.name?._text]);
      } else {
        formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
      }
    });

    formdata.append("unitType", formData?.unitType);

    formdata.append("addProductType", formData?.ProductType);
    CreatAccountView?.MyDropDown?.map((ele, i) => {
      formdata.append(
        `${ele?.dropdown?.name?._text}`,
        formData[ele?.dropdown?.name?._text]
      );
    });
    for (const value of formdata.values()) {
      console.log(value);
    }

    if (error) {
      swal("Error occured while Entering Details");
    } else {
      _Put(Update_Product, Params?.id, formdata)
        .then((res) => {
          console.log(res);
          setFormData({});
          if (res.status) {
            swal("Product Details Updated Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          swal("Please Fill All Details");
        });
    }
  };
  const handlechangeSubcat = (e) => {
    console.log(e.target.value);
    if (e.target.value != "NA") {
      let selecteddata = categoryList?.filter(
        (ele, i) => ele?.name == e.target.value
      );
      console.log(selecteddata[0]?.subcategories);
      setsubcatlist(selecteddata[0]?.subcategories);
    } else {
      swal("Select Category");
    }
  };

  return (
    <div>
      <div>
        <Card>
          <Row>
            <Col lg="8" md="8" sm="8" className="mb-1 mt-1">
              <div className="px-2">
                <h3 className="mb-2 mx-2">Edit Product Type</h3>
                <div className="form-label-group" onChange={changeHandler2}>
                  {formData?.ProductType == "Product" && (
                    <>
                      {/* <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        // value={formData["status"]}
                        name="ProductType"
                        className="ml-1"
                        value="Product"
                      /> */}
                      <span style={{ marginRight: "20px", fontSize: "18px" }}>
                        <strong>Edit Product</strong>
                      </span>
                    </>
                  )}

                  {formData?.ProductType == "Item" && (
                    <>
                      {/* <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="ProductType"
                        className="ml-1"
                        value="Item"
                      /> */}
                      <span style={{ marginRight: "20px", fontSize: "18px" }}>
                        <strong>Edit Item</strong>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {/* <hr /> */}

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                {dropdownValue &&
                  dropdownValue?.MyDropDown?.map((ele, i) => {
                    if (ele?.dropdown?.name?._text == "category") {
                      return (
                        <>
                          <Col key={i} lg="4" md="4">
                            <Label className="mb-1">
                              {ele?.dropdown?.label?._text}
                            </Label>
                            <CustomInput
                              required
                              type="select"
                              placeholder="Select Category"
                              name={ele?.dropdown?.name?._text}
                              value={formData[ele?.dropdown?.name?._text]}
                              onChange={(e) => {
                                handleInputChange(e);
                                handlechangeSubcat(e);
                              }}>
                              <option value="NA">--Select Category--</option>
                              {categoryList?.map((cat) => (
                                <option value={cat?.name} key={cat?._id}>
                                  {cat?.name}
                                </option>
                              ))}
                            </CustomInput>
                          </Col>
                        </>
                      );
                    }
                    if (ele?.dropdown?.name?._text == "SubCategory") {
                      return (
                        <>
                          <Col key={i} lg="4" md="4">
                            <Label className="mb-1">
                              {ele?.dropdown?.label?._text}
                            </Label>
                            <CustomInput
                              required
                              type="select"
                              placeholder="Select Category"
                              name={ele?.dropdown?.name?._text}
                              value={formData[ele?.dropdown?.name?._text]}
                              onChange={handleInputChange}>
                              <option value="NA">--Select SubCategory--</option>
                              {subcatlist?.map((cat) => (
                                <option value={cat?.name} key={cat?._id}>
                                  {cat?.name}
                                </option>
                              ))}
                            </CustomInput>
                          </Col>
                        </>
                      );
                    }
                    if (ele?.dropdown?.name?._text?.includes("arehouse")) {
                      return (
                        <>
                          <Col key={i} lg="4" md="4">
                            <Label className="mb-1 mt-1">
                              {ele?.dropdown?.label?._text}
                            </Label>
                            <CustomInput
                              required
                              type="select"
                              placeholder="Select WareHouse"
                              name={ele?.dropdown?.name?._text}
                              value={formData[ele?.dropdown?.name?._text]}
                              onChange={handleInputChange}>
                              <option value="NA">--Select WareHouse--</option>

                              {wareHouseList &&
                                wareHouseList?.map((whList) => {
                                  return (
                                    <option
                                      value={whList?._id}
                                      key={whList?._id}>
                                      {whList?.warehouseName}
                                    </option>
                                  );
                                })}
                            </CustomInput>
                          </Col>
                        </>
                      );
                    }
                    if (ele?.dropdown?.name?._text == "Unit") {
                      return (
                        <>
                          {formData?.ProductType == "AddItem" ? (
                            <>
                              <Col lg="4" md="4">
                                <div className="">
                                  <label className="mb-1" for="unit">
                                    Select Unit
                                  </label>
                                  <select
                                    id="unitType"
                                    className="form-control"
                                    name="Unit"
                                    placeholder="selecetedUnit"
                                    value={formData[ele?.dropdown?.name?._text]}
                                    onChange={handleInputChange}>
                                    <option value="">--select Unit--</option>
                                    <option value="kg">Kilogram (kg)</option>
                                    <option value="Pcs">Pieces (Pcs)</option>
                                    <option value="g">Gram (g)</option>
                                    <option value="tonne">
                                      Metric Ton (tonne)
                                    </option>
                                    <option value="m">Meter (m)</option>
                                    <option value="cm">Centimeter (cm)</option>
                                    <option value="mm">Millimeter (mm)</option>
                                    <option value="in">Inch (in)</option>
                                    <option value="ft">Foot (ft)</option>
                                    <option value="m3">Cubic Meter (m³)</option>
                                    <option value="L">Liter (L)</option>
                                    <option value="ml">Milliliter (ml)</option>
                                    <option value="s">Second (s)</option>
                                    <option value="min">Minute (min)</option>
                                    <option value="hr">Hour (hr)</option>
                                    <option value="°C">Celsius (°C)</option>
                                    <option value="°F">Fahrenheit (°F)</option>
                                    <option value="Pa">Pascal (Pa)</option>
                                    <option value="bar">Bar (bar)</option>
                                    <option value="m/s">
                                      Meters per Second (m/s)
                                    </option>
                                    <option value="km/h">
                                      Kilometers per Hour (km/h)
                                    </option>
                                    <option value="A">Ampere (A)</option>
                                    <option value="V">Volt (V)</option>
                                    <option value="W">Watt (W)</option>
                                    <option value="kW">Kilowatt (kW)</option>
                                  </select>
                                </div>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col key={i} lg="4" md="4">
                                <Label className="mb-1">
                                  {ele?.dropdown?.label?._text}
                                </Label>
                                <CustomInput
                                  required
                                  id="unitType"
                                  type="select"
                                  placeholder="Select UnitType"
                                  name={ele?.dropdown?.name?._text}
                                  value={formData[ele?.dropdown?.name?._text]}
                                  onChange={handleInputChange}>
                                  <option value="NA">--Select Unit--</option>
                                  {UnitList &&
                                    UnitList?.map((cat) => (
                                      <option
                                        value={cat?.unitQty}
                                        key={cat?._id}>
                                        {cat?.primaryUnit}
                                      </option>
                                    ))}
                                </CustomInput>
                              </Col>
                            </>
                          )}
                        </>
                      );
                    } else {
                      return (
                        <Col lg="4" md="4">
                          <FormGroup>
                            <Label>{ele?.dropdown?.label?._text}</Label>
                            <CustomInput
                              required
                              type="select"
                              name={ele?.dropdown?.name?._text}
                              value={formData[ele?.dropdown?.name?._text]}
                              onChange={handleInputChange}>
                              <option value="">--Select Role--</option>
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
                      );
                    }
                  })}
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

                {CreatAccountView &&
                  CreatAccountView?.input?.map((ele, i) => {
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
                          <Col className="mt-1" key={i} lg="4" md="4" sm="12">
                            <FormGroup>
                              <Label>{ele?.label?._text}</Label>
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
                        console.log(ele);
                        return (
                          <Col className="mt-1" key={i} lg="4" md="4" sm="12">
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
                          <Col className="mt-1" key={i} lg="4" md="4" sm="12">
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
                          <Col className="mt-1" key={i} lg="4" md="4" sm="12">
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
                                <Col
                                  className="mt-1"
                                  key={i}
                                  lg="4"
                                  md="4"
                                  sm="12">
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
                                <Col
                                  className="mt-1"
                                  key={i}
                                  lg="4"
                                  md="4"
                                  sm="12">
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
                              <Col
                                className="mt-1"
                                key={i}
                                lg="4"
                                md="4"
                                sm="12">
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
                            <Col className="mt-1" key={i} lg="4" md="4" sm="12">
                              <FormGroup key={i}>
                                {ele?.type?._attributes?.type &&
                                ele?.type?._attributes?.type == "file" ? (
                                  <>
                                    <Label className="mb-1">
                                      {ele?.label?._text}
                                    </Label>

                                    <Input
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

              <hr />
              <Row>
                <Col lg="4" md="4" sm="6" className="mb-2 mt-1">
                  <Label className="mb-0">Status</Label>
                  <div className="form-label-group" onChange={changeHandler1}>
                    <input
                      checked={formData["status"] == "Active"}
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      checked={formData["status"] == "Deactive"}
                      type="radio"
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default EditAddProduct;
