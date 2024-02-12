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
  CustomInput,
  ModalHeader,
  ModalBody,
  Table,
  InputGroup,
  Modal,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import AgGrid from "ag-grid-react";
import { history } from "../../../../history";
import YearPicker from "react-year-picker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { AiOutlineSearch } from "react-icons/ai";
import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  PolicySaveDataapis,
  PolicyViewData,
} from "../../../../ApiEndPoint/ApiCalling";
import { BiEnvelope } from "react-icons/bi";
import { FcPhoneAndroid } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
const importData = [
  "Product Registration",
  "SpareParts",
  "Orders",
  "PartsCatalogue",
  "Scrutiny / Inspections",
  "Invoices / Billing",
  "Support",
  "Servicing",
  "Warehouse",
  "Distributors",
  "Dealers",
  "Suppliers",
  "Service Centers",
  "Customer Data",
  "Campaigns",
];
const columns = [
  { headerName: "Name", field: "name" },
  { headerName: "Age", field: "age" },
  { headerName: "Country", field: "country" },
];

const data = [
  { name: "John", age: 30, country: "USA" },
  { name: "Mary", age: 25, country: "UK" },
  { name: "Peter", age: 40, country: "Canada" },
];
const CreatePolicy = args => {
  const [CreatePolicyView, setCreatePolicyView] = useState({});
  const [Countries, setCountry] = useState({});
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  const [Comments, setComments] = useState([
    {
      name: JSON.parse(localStorage.getItem("userData")).UserName,
      userRole: JSON.parse(localStorage.getItem("userData")).Role,
      comment: "",
      time: new Date(),
    },
  ]);
  const [formValues, setFormValues] = useState([{ files: [] }]);

  const newComment = {
    userName: JSON.parse(localStorage.getItem("userData")).UserName,
    Role: JSON.parse(localStorage.getItem("userData")).Role,
    comment: "",
    time: new Date().toString(),
  };
  const [product, setProduct] = useState([
    { productName: "", model: "", variant: "" },
  ]);
  const [part, setPart] = useState([{ productName: "", color: "" }]);
  const [modal, setModal] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    { field: "name" },
    // Using dot notation to access nested property
    { field: "medals.gold", headerName: "Gold" },
    // Show default header name
    { field: "person.age" },
  ]);
  const [allPart, setAllPart] = useState([]);
  const toggle = () => setModal(!modal);
  const createUserXmlView = useContext(UserContext);

  const handleInputChange = (e, type, i) => {
    console.log(e.target.value);
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
  const handleyear = (date) => {
    setSelectedYear(date);
  };
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const { UserName, Role } = JSON.parse(userData);
  }, [formData]);
  useEffect(() => {
    setAllPart(importData);
    PolicyViewData()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData).Policy);
        setCreatePolicyView(JSON.parse(jsonData));
        let value = JSON.parse(jsonData)?.MyDropdown?.CheckBox?.input;
        value?.map((ele) => {
          formData[ele?.name._text] = false;
        });

        setdropdownValue(JSON.parse(jsonData));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [Comments]);

  useEffect(() => {
    console.log(formData);
    console.log(CreatePolicyView);
  }, [formData, CreatePolicyView]);

  let handleComment = (i, e) => {
    let newFormValues = [...Comments];
    newFormValues[i][e.target.name] = e.target.value;
    setComments(newFormValues);
  };
  const SubmitComment = () => {
    alert("Comment Submit");
  };
  let addFormFields = () => {
    setComments([...Comments, newComment]);
  };

  let addFileInput = () => {
    setFormValues([...formValues, { files: [] }]);
  };

  let removeFileAttach = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleFileChange = (i, e) => {
    const newFormValues = [...formValues];
    const selectedFiles = e.target.files;
    newFormValues[i].files = selectedFiles;
    setFormValues(newFormValues);
  };
  let removeFormFields = (i) => {
    let newFormValues = [...Comments];
    newFormValues.splice(i, 1);
    setComments(newFormValues);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    let dropdown = CreatePolicyView?.Policy?.MyDropDown?.map((ele) => {
      formdata.append(
        `${ele?.dropdown?.name?._text}`,
        formData[ele?.dropdown?.name?._text]
      );
    });
    let inputs = CreatePolicyView?.Policy?.input?.map((ele) => {
      formdata.append(`${ele?.name?._text}`, formData[ele?.name?._text]);
    });

    for (var value of formdata.values()) {
      console.log(value);
    }
    // e.preventDefault();

    PolicySaveDataapis(formdata)
      .then((res) => {
        swal("Policy Added Successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // product addmore
  let handleProductChange = (i, e) => {
    let newFormValues = [...product];
    newFormValues[i][e.target.name] = e.target.value;
    setProduct(newFormValues);
  };

  let addMoreProduct = () => {
    setProduct([...product, { productName: "", model: "", variant: "" }]);
  };

  let removeMoreProduct = (i) => {
    let newFormValues = [...product];
    newFormValues.splice(i, 1);
    setProduct(newFormValues);
  };
  //  let handleSubmit = event => {
  //    event.preventDefault();
  //    alert(JSON.stringify(product));
  //  };
  // part addmore
  let handlePartChange = (i, e) => {
    let newFormValues = [...part];
    newFormValues[i][e.target.name] = e.target.value;
    setPart(newFormValues);
  };

  let addMorePart = () => {
    setPart([...part, { partName: "", color: "" }]);
  };

  let removeMorePart = (i) => {
    let newFormValues = [...part];
    newFormValues.splice(i, 1);
    setPart(newFormValues);
  };
  const handleopentoggle = () => {
    toggle();
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col className="">
              <div>
                <h1 className="">Create Policy </h1>
              </div>
              <div>
                <span>Policy Id</span> <span>#</span>
              </div>
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                {CreatePolicyView?.Policy?.MyDropDown.map((drop, i) => {
                  return (
                    <Col lg="6" md="6" key={i}>
                      <FormGroup>
                        <Label>{drop?.dropdown?.label?._text}</Label>
                        <CustomInput
                          required
                          type="select"
                          name={drop?.dropdown?.name?._text}
                          value={
                            formData[drop?.dropdown?.dropdown?.name?._text]
                          }
                          onChange={handleInputChange}
                        >
                          <option value="">
                            --Select {drop?.dropdown.name._text}---
                          </option>
                          {drop.dropdown.option.map((option, index) => {
                            return (
                              <option
                                key={index}
                                value={option?._attributes?.value}
                              >
                                {option?._attributes?.value}
                              </option>
                            );
                          })}
                        </CustomInput>
                      </FormGroup>
                    </Col>
                  );
                })}

                {CreatePolicyView &&
                  CreatePolicyView?.Policy?.input?.map((ele, i) => {
                    if (ele.label._text == "Policy Duration") {
                      return (
                        <>
                          <Col key={i} lg="6" md="6" sm="12">
                            <FormGroup>
                              <Label>Policy Duration</Label>
                              <Row>
                                <div className="mainDiv ">
                                  <div className="child">
                                    <Input type="number" placeholder="Number" />
                                  </div>

                                  <div className="dropdownselect">
                                    <CustomInput
                                      // required
                                      type="select"
                                      // name={drop?.dropdown?.name?._text}
                                      // value={
                                      //   formData[
                                      //     drop?.dropdown?.dropdown?.name?._text
                                      //   ]
                                      // }
                                      // onChange={handleInputChange}
                                    >
                                      <option value="day">Day</option>
                                      <option value="month">Month</option>
                                      <option value="year">Year</option>
                                    </CustomInput>
                                  </div>
                                </div>
                                <div className="mainDiv ">
                                  <div className="child">
                                    <Input type="number" placeholder="Number" />
                                  </div>

                                  <div className="dropdownselect">
                                    <CustomInput
                                      // required
                                      type="select"
                                      // name={drop?.dropdown?.name?._text}
                                      // value={
                                      //   formData[
                                      //     drop?.dropdown?.dropdown?.name?._text
                                      //   ]
                                      // }
                                      // onChange={handleInputChange}
                                    >
                                      <option value="day">Day</option>
                                      <option value="month">Month</option>
                                      <option value="year">Year</option>
                                    </CustomInput>
                                  </div>
                                </div>
                              </Row>
                            </FormGroup>
                          </Col>
                        </>
                      );
                    }
                    {
                      /* if (!!ele?.YearPicker) {
                      return (
                        <>
                          <Col key={i} lg="6" md="6" sm="12">
                            <FormGroup>
                              <Label>{ele?.label?._text}</Label>
                              <YearPicker
                                style={{ width: "100%" }}
                                onChange={handleyear}
                                selectedYear={selectedYear}
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
                    } */
                    }
                    if (!!ele?.phoneinput) {
                      return (
                        <>
                          <Col key={i} lg="6" md="6" sm="12">
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
                        return (
                          <Col key={i} lg="6" md="6" sm="12">
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
                          <Col key={i} lg="6" md="6" sm="12">
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
                          <Col key={i} lg="6" md="6" sm="12">
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
                          <Col key={i} lg="6" md="6" sm="12">
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
                        );
                      }
                    } else {
                      return (
                        <>
                          <Col key={i} lg="6" md="6" sm="12">
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
                      );
                    }
                  })}
              </Row>

              {formValues.map((index, i) => (
                <Row className="my-2">
                  <Col lg="6" md="6" sm="12" key={i}>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(i, e)}
                    />
                  </Col>
                  <Col className="d-flex mt-2" lg="3" md="3" sm="12">
                    <div>
                      {i ? (
                        <Button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeFileAttach(i)}
                        >
                          -
                        </Button>
                      ) : null}
                    </div>
                    <div>
                      <Button
                        className="ml-1"
                        color="primary"
                        type="button"
                        onClick={() => addFileInput()}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}
              {product.map((element, index) => (
                <Row className="" key={index}>
                  <Col className="" lg="2" md="2" sm="12">
                    <Label>Product#</Label>
                    <InputGroup className="maininput">
                      <Input
                        // value={Role}
                        // onChange={e => handleInputChange(e)}
                        className="form-control inputs"
                        disabled
                        type="text"
                        name="productN"
                        readOnly
                        placeholder="Product"
                        // value={element.productName || ""}
                        // onChange={e => handleProductChange(index, e)}
                      />
                      <Button
                        onClick={handleopentoggle}
                        color="primary"
                        className="mybtn primary"
                      >
                        <AiOutlineSearch
                          onClick={(e) => e.preventDefault()}
                          fill="white"
                        />
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col className="" lg="2" md="2" sm="12">
                    <FormGroup>
                      <Label>Product Name</Label>
                      <Input
                        type="text"
                        name="productName"
                        readOnly
                        placeholder="Product Name"
                        value={element.productName || ""}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="" lg="2" md="2" sm="12">
                    <FormGroup>
                      <Label>Model</Label>
                      <Input
                        type="text"
                        name="model"
                        readOnly
                        placeholder="Model"
                        value={element.model || ""}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="" lg="2" md="2" sm="12">
                    <FormGroup>
                      <Label>Variant</Label>
                      <Input
                        type="text"
                        name="variant"
                        readOnly
                        placeholder="Variant"
                        value={element.variant || ""}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="d-flex mt-2" lg="2" md="2" sm="12">
                    <div>
                      {index ? (
                        <Button
                          type="button"
                          className="button remove "
                          onClick={() => removeMoreProduct(index)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>

                    <div>
                      <Button
                        className="ml-1 "
                        color="primary"
                        type="button"
                        onClick={() => addMoreProduct()}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}
              {part.map((element, index) => (
                <Row className="" key={index}>
                  <Col className="" lg="3" md="3" sm="12">
                    <FormGroup>
                      <Label>Part#</Label>
                      <Input
                        type="text"
                        name="partName"
                        readOnly
                        placeholder="Part Name"
                        // value={element.partName || ""}
                        // onChange={e => handlePartChange(index, e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="" lg="3" md="3" sm="12">
                    <FormGroup>
                      <Label>Part Name</Label>
                      <Input
                        type="text"
                        name="partName"
                        readOnly
                        placeholder="Part Name"
                        value={element.partName || ""}
                        onChange={(e) => handlePartChange(index, e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="" lg="3" md="3" sm="12">
                    <FormGroup>
                      <Label>Color</Label>
                      <Input
                        type="text"
                        name="model"
                        placeholder="Color"
                        readOnly
                        value={element.color || ""}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </FormGroup>
                  </Col>

                  <Col className="d-flex mt-2" lg="3" md="3" sm="12">
                    <div>
                      {index ? (
                        <Button
                          type="button"
                          className="button remove "
                          onClick={() => removeMorePart(index)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>

                    <div>
                      <Button
                        className="ml-1 "
                        color="primary"
                        type="button"
                        onClick={() => addMorePart()}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}

              <hr />
              <Row className="mt-2 ">
                <div className="container my-2">
                  <Label className="py-1">Notification</Label>
                  <div>
                    {CreatePolicyView &&
                      CreatePolicyView?.Policy?.CheckBox?.input?.map(
                        (ele, i) => {
                          return (
                            <>
                              <span key={i} className="mx-2">
                                <Input
                                  style={{ marginRight: "3px" }}
                                  type={ele?.type?._attributes?.type}
                                  name={ele?.name?._text}
                                  onChange={(e) =>
                                    handleInputChange(e, "checkbox")
                                  }
                                />{" "}
                                <span
                                  className="mt-1 mx-1"
                                  style={{ marginRight: "40px" }}
                                >
                                  {ele?.label?._text == "Whatsapp" ? (
                                    <BsWhatsapp
                                      className="mx-1"
                                      color="#59CE72"
                                      size={25}
                                    />
                                  ) : (
                                    <>
                                      {ele.label?._text == "SMS" ? (
                                        <>
                                          <FcPhoneAndroid size={30} />
                                        </>
                                      ) : (
                                        <>
                                          <BiEnvelope className="" size={30} />
                                        </>
                                      )}
                                    </>
                                  )}
                                </span>
                              </span>
                            </>
                          );
                        }
                      )}
                  </div>
                </div>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="">
                    <h4>Status</h4>
                  </Label>
                  <div className="form-label-group mx-1">
                    {CreatePolicyView &&
                      CreatePolicyView?.Policy?.Radiobutton?.input?.map(
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
              </Row>

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

            {Comments &&
              Comments?.map((element, index) => (
                <>
                  <Row key={index} className="my-2">
                    <Col lg="6" md="6" sm="12">
                      <Label>Comment</Label>
                      <Input
                        type="textarea"
                        name="comment"
                        placeholder="Comment"
                        value={element.comment || ""}
                        onChange={(e) => handleComment(index, e)}
                      />
                    </Col>

                    <Col className="d-flex mt-2" lg="3" md="3" sm="12">
                      <div>
                        {index ? (
                          <Button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeFormFields(index)}
                          >
                            -
                          </Button>
                        ) : null}
                      </div>

                      <div>
                        <Button
                          className="ml-1 "
                          color="primary"
                          type="button"
                          onClick={() => addFormFields()}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </>
              ))}
            <Button
              className="ml-1 "
              color="primary"
              onClick={(e) => {
                SubmitComment(e);
              }}
            >
              Submit Comment
            </Button>
          </CardBody>
        </Card>
        <Modal
          fullscreen="xl"
          size="lg"
          backdrop={false}
          isOpen={modal}
          toggle={toggle}
          // {...args}
        >
          <ModalHeader toggle={toggle}>Product Look Up</ModalHeader>
          <ModalBody className="table-body shedulemodalbody">
            <div className="modalheaderaddrol p-1">
              <h3 className="table-item">Product List</h3>
              {/* <AgGrid columnDefs={columns} rowData={data} /> */}
              <Table
                className="scheduletble_heading"
                bordered
                hover
                responsive
                size="sm"
              >
                <thead className="tableRowStyle">
                  <tr className="tableRowStyle">
                    <th>S.No.</th>
                    <th>ProductName</th>
                    <th>Modal</th>
                    <th>Variant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>abc</td>
                    <td>ls123</td>
                    <td>ch84</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default CreatePolicy;
