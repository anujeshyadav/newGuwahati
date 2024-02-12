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
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  InputGroup,
} from "reactstrap";
import { history } from "../../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { Route } from "react-router-dom";
import swal from "sweetalert";
import "../../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  Warranty_ViewData,
  CreateTicketViewData,
  TicketTool_ViewData,
  ticketToolSave,
  ticketToolList,
} from "../../../../../ApiEndPoint/ApiCalling";
import { BiEnvelope } from "react-icons/bi";
import { FcPhoneAndroid } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import "../../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../../context/Context";
import { CloudLightning } from "react-feather";
import { AiOutlineSearch } from "react-icons/ai";

const CreateTicket = (args) => {
  const [CreatAccountView, setCreatAccountView] = useState({});
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [StatusDropDown, setStatusDropDown] = useState({});
  const [UserInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});
  const [randomNumber, setRandomNumber] = useState("");

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalone, setModalone] = useState(false);
  const toggleone = () => setModalone(!modalone);
  const createUserXmlView = useContext(UserContext);
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
  const handleopentoggle = () => {
    toggle();
  };
  const handleopentoggleone = () => {
    toggleone();
  };

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
    // console.log(formData);
    // console.log(Comments);
    // console.log(formValues);
  }, [formData, Comments, formValues]);
  useEffect(() => {
    ticketToolList()
      .then((res) => {
        console.log(res?.TicketTool);
        if (res?.TicketTool?.length) {
          const lastElement = res?.TicketTool[res?.TicketTool?.length - 1]?.id;
          const prefix = lastElement.substring(0, 5);
          const number = parseInt(lastElement.match(/\d+$/)[0], 10) + 1;
          const concatenatedString = prefix + number;
          setRandomNumber(concatenatedString);
        } else {
          let numb = "sup001";
          setRandomNumber(numb);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    let userInfo = JSON.parse(localStorage.getItem("userData"));
    setUserInfo(userInfo);
    TicketTool_ViewData()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        // console.log(JSON.parse(jsonData)?.createTicket);
        // console.log(
        //   JSON.parse(jsonData)?.createTicket?.CurrentStatus?.MyDropDown
        //     ?.dropdown
        // );
        setCreatAccountView(JSON.parse(jsonData));
        setdropdownValue(JSON.parse(jsonData));
        setStatusDropDown(
          JSON.parse(jsonData)?.createTicket?.CurrentStatus?.MyDropDown
            ?.dropdown
        );
        let value = JSON.parse(jsonData)?.createTicket?.CheckBox?.input;
        value?.map((ele) => {
          formData[ele?.name._text] = false;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(CreatAccountView?.createTicket);
    let formdata = new FormData();

    CreatAccountView?.createTicket?.CheckBox?.input?.map((ele) => {
      formdata.append(`${ele?.name._text}`, formData[ele?.name._text]);
    });

    CreatAccountView?.createTicket?.Parts?.MyDropDown?.map((ele) => {
      formdata.append(
        `${ele?.dropdown?.name?._text}`,
        formData[ele?.dropdown?.name?._text]
      );
    });

    let dropdown =
      CreatAccountView?.createTicket?.CurrentStatus?.MyDropDown?.dropdown;
    if (dropdown) {
      formdata.append(
        `${dropdown.name?._text}`,
        formData[dropdown?.name?._text]
      );
    }
    CreatAccountView?.createTicket?.Parts?.input?.map((ele) => {
      formdata.append(`${ele?.name?._text}`, formData[ele?.name?._text]);
    });

    CreatAccountView?.createTicket?.Product?.MyDropDown?.map((ele) => {
      formdata.append(
        `${ele?.dropdown?.name?._text}`,
        formData[ele?.dropdown?.name?._text]
      );
    });

    CreatAccountView?.createTicket?.Product?.input?.map((ele) => {
      formdata.append(`${ele?.name?._text}`, formData[ele?.name?._text]);
    });

    CreatAccountView?.createTicket?.input?.map((ele) => {
      formdata.append(`${ele?.name?._text}`, formData[ele?.name?._text]);
    });

    formdata.append("id", randomNumber);
    if (Comments.length > 0) {
      formdata.append(`Comments`, JSON.stringify(Comments));
    }

    let user = JSON.parse(localStorage.getItem("userData"));
    if (formValues.length) {
      let myarr = [];
      formValues?.map((ele, i) => {
        let newdata = Array.from(ele?.files);
        myarr.push(newdata);
      });
      let totalimg = myarr.flat();
      totalimg?.map((ele, i) => {
        formdata.append("files", ele);
      });
    }
    if (formValues.length || formValues.length) {
      formdata.append("Role", user?.Role);
      formdata.append("time", new Date().toString());
      formdata.append("userName", user?.UserName);
    }

    for (const [key, value] of formdata.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }

    await ticketToolSave(formdata)
      .then((res) => {
        console.log(res);
        swal(
          "successs",
          `Support Ticket Created Successfully with id ${res?.TicketTool?.id}`
        );
      })
      .catch((err) => {
        console.log(dropdown);
      });
    if (error) {
      swal("Error occured while Entering Details");
    } else {
    }
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col className="">
              <div
                style={{ justifyContent: "space-between" }}
                className="d-flex myclasswikiheading"
              >
                <h1 className="justify-content-start">Create Ticket</h1>
                <div className="mystatus">Status : (Draft) </div>
                <div className="mystatus">
                  <div>
                    {!!StatusDropDown && !!StatusDropDown ? (
                      <>
                        <Label>{StatusDropDown?.label?._text}</Label>
                        <CustomInput
                          required
                          type="select"
                          name={StatusDropDown?.name?._text}
                          value={formData[StatusDropDown?.name?._text]}
                          onChange={handleInputChange}
                        >
                          <option value="">--Select Status---</option>
                          {StatusDropDown?.option?.map((option, index) => {
                            let dropdownpermision =
                              option?._attributes?.permission?.split(",");
                            let permission = dropdownpermision?.includes(
                              UserInfo?.Role
                            );

                            return (
                              <>
                                {permission && (
                                  <option
                                    key={index}
                                    value={option?._attributes?.value}
                                  >
                                    {option?._attributes?.value}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </CustomInput>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <span>Ticket Id</span> <span># {randomNumber}</span>
              </div>
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                {dropdownValue?.createTicket?.MyDropDown?.map((drop, i) => {
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

                {/* dropdown product */}
                <hr />
                {CreatAccountView &&
                  CreatAccountView?.createTicket?.Product?.MyDropDown?.map(
                    (ele, i) => {
                      return (
                        <>
                          <Col key={i} lg="6" md="6" sm="12">
                            <FormGroup>
                              <Label>{ele?.dropdown?.label?._text}</Label>

                              <CustomInput
                                required
                                type="select"
                                name={ele?.dropdown?.name?._text}
                                value={formData[ele?.dropdown?.name?._text]}
                                onChange={handleInputChange}
                              >
                                <option value="">--Select---</option>
                                {ele?.dropdown?.option?.map((option, index) => {
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
                  )}

                {/* product inputs  */}
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
                {CreatAccountView &&
                  CreatAccountView?.createTicket?.Product?.input?.map(
                    (ele, i) => {
                      if (!!ele?.lookup) {
                        return (
                          <>
                            <>
                              <Col key={i} lg="6" md="6" sm="12">
                                <FormGroup>
                                  <Label>{ele?.label?._text}</Label>
                                  <InputGroup className="maininput">
                                    <Input
                                      className="form-control inputs"
                                      type="text"
                                      name={ele?.name?._text}
                                      placeholder={ele?.name._text}
                                      value={formData[ele?.name?._text]}
                                      onChange={handleInputChange}
                                      readOnly
                                    />{" "}
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
                          </>
                        );
                      } else if (!!ele?.Readonly) {
                        if (ele?.type._attributes?.type == "checkbox") {
                          return (
                            <>
                              <Label className="mx-1">
                                {ele?.heading?._text}
                              </Label>
                              <Col key={i} lg="12" md="12" sm="12">
                                <FormGroup>
                                  <Input
                                    disabled
                                    className="mx-1"
                                    type={ele?.type._attributes?.type}
                                    name={ele?.name?._text}
                                    placeholder={ele?.name._text}
                                    value={formData[ele?.value?._text]}
                                  />
                                  <span className="mx-3 py-1">
                                    {ele?.value?._text}
                                  </span>
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
                        } else {
                          return (
                            <>
                              <Col key={i} lg="6" md="6" sm="12">
                                <Label>{ele?.label?._text}</Label>
                                <FormGroup>
                                  <Input
                                    disabled
                                    className="form-control"
                                    type={ele?.type._attributes?.type}
                                    name={ele?.name?._text}
                                    placeholder={ele?.name._text}
                                    value={formData[ele?.value?._text]}
                                  />
                                  <span className="mx-2">
                                    {ele?.value?._text}
                                  </span>
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
                      } else {
                        return (
                          <>
                            <Col key={i} lg="6" md="6" sm="12">
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
                    }
                  )}

                {/* dropdown part */}
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
                {CreatAccountView &&
                  CreatAccountView?.createTicket?.Parts?.MyDropDown?.map(
                    (ele, i) => {
                      {
                        /* console.log(ele); */
                      }
                      return (
                        <>
                          <Col key={i} lg="6" md="6" sm="12">
                            <FormGroup>
                              <Label>{ele?.dropdown?.label?._text}</Label>

                              <CustomInput
                                required
                                type="select"
                                name={ele?.dropdown?.name?._text}
                                value={formData[ele?.dropdown?.name?._text]}
                                onChange={handleInputChange}
                              >
                                <option value="">--Select---</option>
                                {ele?.dropdown?.option?.map((option, index) => {
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
                  )}

                {/* part inputs  */}
                <hr />
                <hr />
                {CreatAccountView &&
                  CreatAccountView?.createTicket?.Parts?.input?.map(
                    (ele, i) => {
                      if (!!ele?.lookup) {
                        return (
                          <>
                            <>
                              <Col key={i} lg="6" md="6" sm="12">
                                <FormGroup>
                                  <Label>{ele?.label?._text}</Label>
                                  <InputGroup className="maininput">
                                    <Input
                                      className="form-control inputs"
                                      type="text"
                                      name={ele?.name?._text}
                                      placeholder={ele?.name._text}
                                      value={formData[ele?.name?._text]}
                                      onChange={handleInputChange}
                                      readOnly
                                    />{" "}
                                    <Button
                                      onClick={handleopentoggleone}
                                      color="primary"
                                      className="mybtn primary"
                                    >
                                      <AiOutlineSearch
                                        onClick={(e) => e.preventDefault()}
                                        fill="white"
                                      />
                                    </Button>
                                  </InputGroup>

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
                          </>
                        );
                      } else if (!!ele?.Readonly) {
                        if (ele?.type?._attributes?.type == "checkbox") {
                          return (
                            <>
                              <Label className="mx-1">
                                {ele?.heading?._text}
                              </Label>
                              <Col key={i} lg="12" md="12" sm="12">
                                <FormGroup>
                                  <Input
                                    disabled
                                    className="mx-1"
                                    type={ele?.type._attributes?.type}
                                    name={ele?.name?._text}
                                    placeholder={ele?.name._text}
                                    value={formData[ele?.value?._text]}
                                    onChange={handleInputChange}
                                  />
                                  <span className="mx-3 pt-1">
                                    {ele?.value?._text}
                                  </span>
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
                        } else {
                          return (
                            <>
                              <Col key={i} lg="6" md="6" sm="12">
                                <Label>{ele?.label?._text}</Label>
                                <FormGroup>
                                  <Input
                                    disabled
                                    className="form-control"
                                    type={ele?.type._attributes?.type}
                                    name={ele?.name?._text}
                                    placeholder={ele?.name._text}
                                    value={formData[ele?.value?._text]}
                                  />
                                  <span className="mx-2">
                                    {ele?.value?._text}
                                  </span>
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
                      } else {
                        return (
                          <>
                            <Col key={i} lg="6" md="6" sm="12">
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
                    }
                  )}

                <div className="container">
                  <Label className="py-1">Notification</Label>
                  <div>
                    {CreatAccountView &&
                      CreatAccountView?.createTicket?.CheckBox?.input?.map(
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
              </Row>

              <hr />
              {/* <Row className="mt-2 ">
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="">
                    <h4>Status</h4>
                  </Label>
                  <div className="form-label-group mx-1">
                    {CreatAccountView &&
                      CreatAccountView?.createTicket?.Radiobutton?.input?.map(
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
            <div className="mx-1 pt-1">
              {formValues.map((index, i) => (
                <>
                  <label className="mt-1">Attachment</label>
                  <Row className="">
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
                </>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <Modal
        fullscreen="xl"
        size="lg"
        backdrop={false}
        isOpen={modal}
        toggle={toggle}
        {...args}
      >
        <ModalHeader toggle={toggle}>Product List</ModalHeader>
        <ModalBody>
          <div className="modalheaderaddrol p-1">
            <h3>Product List</h3>
            <Table
              className="tableofrole"
              bordered
              borderless
              hover
              responsive
              size="sm"
              striped
            >
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        fullscreen="xl"
        size="lg"
        backdrop={false}
        isOpen={modal}
        toggle={toggle}
        {...args}
      >
        <ModalHeader toggle={toggle}>Part List</ModalHeader>
        <ModalBody>
          <div className="modalheaderaddrol p-1">
            <h3>Part List</h3>
            <Table
              className="tableofrole"
              bordered
              borderless
              hover
              responsive
              size="sm"
              striped
            >
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Part Name</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default CreateTicket;
