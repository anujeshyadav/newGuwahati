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
import { Route, useHistory } from "react-router-dom";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  AllCategoryList,
  CreateProductXMLView,
  SaveProduct,
  UnitListView,
  _BulkUpload,
  _Get,
} from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
import {
  Bulk_Upload_Product,
  WareahouseList_For_addProduct,
} from "../../../../ApiEndPoint/Api";

const AddProduct = () => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [UnitList, setUnitList] = useState([]);
  const [wareHouseList, setWareHouseList] = useState([]);
  const [subcatlist, setsubcatlist] = useState([]);
  const [Countries, setCountry] = useState({});
  const [Show, setShow] = useState(false);
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  const [formData, setFormData] = useState({});
  const [BulkImport, setBulkImport] = useState(null);

  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});

  const Context = useContext(UserContext);
  const history = useHistory();

  const handleInputChange = (e, type, i) => {
    const { name, value, checked } = e.target;
    if (name == "Unit") {
      let value = document.getElementById("unitType").value;
      const selectedOptionValue = e.target.value;
      const selectedIndex = e.target.selectedIndex;
      const selectedOptionText = e.target.options[selectedIndex]?.text;

      let list = formData;
      list["unitType"] = selectedOptionText;
      list["unitQty"] = selectedOptionValue;
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
    setShow(true);
    setFormData({
      ...formData,
      ["ProductType"]: e.target.value,
    });
  };
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  useEffect(() => {
    CreateProductXMLView()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData).createProduct);
        setCreatAccountView(JSON.parse(jsonData)?.createProduct);
        setdropdownValue(JSON.parse(jsonData)?.createProduct);
      })
      .catch((err) => {
        console.log(err);
      });
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    let userData = JSON.parse(localStorage.getItem("userData"));
    AllCategoryList(userData?._id, userData?.database)
      .then((res) => {
        console.log(res);
        if (res?.Category) {
          setcategoryList(res.Category);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    UnitListView(userData?._id, userData?.database)
      .then((res) => {
        console.log(res?.Unit);
        setUnitList(res?.Unit);
      })
      .catch((err) => {
        console.log(err);
      });

    _Get(WareahouseList_For_addProduct, userData?.database)
      .then((res) => {
        let value = res?.Warehouse;
        if (value) {
          setWareHouseList(value);
        }
        console.log(res?.Warehouse);
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
  

  const submitHandler = async (e) => {
    e.preventDefault();
   
   
    if (BulkImport !== null || BulkImport != undefined) {
      let formdata = new FormData();
      formdata.append("file", BulkImport);
      await _BulkUpload(Bulk_Upload_Product, formdata)
        .then((res) => {
          history.push("/app/freshlist/house/houseProductList");
          swal(`${res?.message}`);
        })
        .catch((err) => {
          console.log(err.response);
          swal("Something Went Wrong");
        });
    } else {
      let formdata = new FormData();
      let userData = JSON.parse(localStorage.getItem("userData"));
      formdata.append("created_by", userData?._id);
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
      if (formData?.unitQty) {
        formdata.append("unitQty", formData?.unitQty);
      }
      formdata.append("addProductType", formData?.ProductType);
      CreatAccountView?.MyDropDown?.map((ele, i) => {
        formdata.append(
          `${ele?.dropdown?.name?._text}`,
          formData[ele?.dropdown?.name?._text]
        );
      });
      if (error) {
        swal("Error occured while Entering Details");
      } else {
        if (formData?.ProductType) {
          SaveProduct(formdata)
            .then((res) => {
              console.log(res);
              setFormData({});
              if (res.status) {
                history.push("/app/freshlist/house/houseProductList");

                swal("Product Created Successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              swal("Enter All Details");
            });
        } else {
          swal("error", "Choose Product Type");
        }
      }
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

  console.log(formData);

  return (
    <div>
      <div>
        <Card>
          <Row>
            <Col lg="8" md="8" sm="8" className="mb-1 mt-1">
              <div className="px-2">
                <h3 className="mb-2 mx-2">Add Product Type</h3>
                <div className="form-label-group" onChange={changeHandler2}>
                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    // value={formData["status"]}
                    name="ProductType"
                    className="ml-1"
                    value="Product"
                  />
                  <span style={{ marginRight: "20px", fontSize: "18px" }}>
                    <strong>Add Product</strong>
                  </span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="ProductType"
                    className="ml-1"
                    value="Item"
                  />
                  <span style={{ marginRight: "20px", fontSize: "18px" }}>
                    <strong>Add Item</strong>
                  </span>
                </div>
              </div>
            </Col>
            <Col className="container p-2 mr-2">
              <div className="float-right">
                <Route
                  render={({ history }) => (
                    <Button
                      className="btn  float-right"
                      color="primary"
                      onClick={() =>
                        history.push("/app/freshlist/house/houseProductList")
                      }>
                      Go back
                    </Button>
                  )}
                />
              </div>
            </Col>
          </Row>

          {/* <hr /> */}

          <CardBody>
            {Show && Show && (
              <Form className="m-1" onSubmit={submitHandler}>
                <Row className="mb-2">
                  {dropdownValue?.MyDropDown?.length > 0 &&
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
                                {categoryList &&
                                  categoryList?.map((cat) => (
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
                                <option value="NA">
                                  --Select SubCategory--
                                </option>
                                {subcatlist &&
                                  subcatlist?.map((cat) => (
                                    <option value={cat?.name} key={cat?._id}>
                                      {cat?.name}
                                    </option>
                                  ))}
                              </CustomInput>
                            </Col>
                          </>
                        );
                      }
                      if (
                        ele?.dropdown?.name?._text
                          ?.toLowerCase()
                          ?.includes("arehouse")
                      ) {
                        return (
                          <>
                            <Col key={i} lg="4" md="4">
                              <Label className="mb-1">
                                {ele?.dropdown?.label?._text} *
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
                            {/* )} */}
                          </>
                        );
                      }
                      if (ele?.dropdown?.name?._text == "Unit") {
                        return (
                          <>
                            {formData.ProductType &&
                            formData?.ProductType == "Item" ? (
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
                                      value={
                                        formData[ele?.dropdown?.name?._text]
                                      }
                                      onChange={handleInputChange}>
                                      <option value="">--select Unit--</option>
                                      {UnitList?.length > 0 &&
                                        UnitList?.map((cat) => (
                                          <option
                                            // data-order={cat.primaryUnit}
                                            value={cat?.primaryUnit}
                                            key={cat?._id}>
                                            {cat?.primaryUnit}
                                          </option>
                                        ))}

                                      <option value="kg">Kilogram (kg)</option>
                                      <option value="Pcs">Pieces (Pcs)</option>
                                      <option value="g">Gram (g)</option>
                                      <option value="tonne">
                                        Metric Ton (tonne)
                                      </option>
                                      <option value="m">Meter (m)</option>
                                      <option value="cm">
                                        Centimeter (cm)
                                      </option>
                                      <option value="mm">
                                        Millimeter (mm)
                                      </option>
                                      <option value="in">Inch (in)</option>
                                      <option value="ft">Foot (ft)</option>
                                      <option value="m3">
                                        Cubic Meter (m³)
                                      </option>
                                      <option value="L">Liter (L)</option>
                                      <option value="ml">
                                        Milliliter (ml)
                                      </option>
                                      <option value="s">Second (s)</option>
                                      <option value="min">Minute (min)</option>
                                      <option value="hr">Hour (hr)</option>
                                      <option value="°C">Celsius (°C)</option>
                                      <option value="°F">
                                        Fahrenheit (°F)
                                      </option>
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
                                    placeholder="Select Category"
                                    name={ele?.dropdown?.name?._text}
                                    value={formData[ele?.dropdown?.name?._text]}
                                    onChange={handleInputChange}>
                                    <option value="NA">--Select Unit--</option>
                                    {UnitList &&
                                      UnitList?.map((cat) => (
                                        <option
                                          data-order={cat.primaryUnit}
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
                                {ele?.dropdown?.option &&
                                  ele?.dropdown?.option?.map(
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
                                            .tz(
                                              Context?.UserInformatio?.timeZone
                                            )
                                            .format(
                                              Context?.UserInformatio
                                                ?.dateFormat
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
                            ) : (
                              <Col
                                className="mt-1"
                                key={i}
                                lg="4"
                                md="4"
                                sm="12">
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
                <Row>
                  <Col lg="4" md="4" sm="6" className="mb-2 mt-1">
                    <Label className="mb-0">Status</Label>
                    <div className="form-label-group" onChange={changeHandler1}>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        // value={formData["status"]}
                        name="status"
                        value="Active"
                      />
                      <span style={{ marginRight: "20px" }}>Active</span>

                      <input
                        style={{ marginRight: "3px" }}
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
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default AddProduct;
