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
  Table,
} from "reactstrap";
import { history } from "../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import moment from "moment-timezone";
import { Route } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import {
  CreateAccountList,
  Edit_StatusDispatchList,
  Get_RoleList,
  GoodDispatchxmlView,
  Save_GoodDispatch,
} from "../../../../ApiEndPoint/ApiCalling";

import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";
import { array } from "prop-types";

const CreateDispach = (args) => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [DeliveryBoy, setDeliveryBoy] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const [Countries, setCountry] = useState({});
  const [formData, setFormData] = useState({});
  const [DispatchData, setDispatchData] = useState({});
  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [RoleList, setRoleList] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const Context = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();

  const handleFileChange = (e, type, i) => {
    const { name, value, files } = e.target;
    let allimages = Array.from(e.target.files[0]);
    setindex(i);
    setFormData({
      ...formData,
      [name]: e.target.files[0],
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
          // setError("Input length exceeds the maximum of 10 characters");
        }
      }
    }
  };
  useEffect(() => {
    debugger;
    if (!!location?.state?.data) {
      localStorage.setItem(
        "DispatchItem",
        JSON.stringify(location?.state.data)
      );

      setDispatchData(location?.state.data);
    } else {
      let dispatchdata = JSON.parse(localStorage.getItem("DispatchItem"));
      setDispatchData(dispatchdata);
    }
  }, [formData]);
  useEffect(() => {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let userid = pageparmission?._id;

    let userdata = JSON.parse(localStorage.getItem("userData"));

    GoodDispatchxmlView()
      .then((res) => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        setCreatAccountView(JSON.parse(jsonData)?.GoodDispatch?.input);
        setdropdownValue(JSON.parse(jsonData)?.GoodDispatch);
      })
      .catch((err) => {
        console.log(err);
        swal("Something Went Wrong");
      });
    let userData = JSON.parse(localStorage.getItem("userData"));
    CreateAccountList(userData?._id, userData?.database)
      .then((res) => {
        let value = res?.adminDetails;

        let Delevery = value?.filter(
          (ele) => ele?.rolename?.roleName == "Delivery Boy"
        );
        if (value) {
          setDeliveryBoy(Delevery);
          setAllUsers(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(DispatchData);

    let formdata = new FormData();

    formdata.append(`created_by`, DispatchData?.userId);
    formdata.append(`userId`, DispatchData?.userId);
    formdata.append(`partyId`, DispatchData?.partyId);
    formdata.append(`orderId`, DispatchData?.orderId);
    formdata.append(`grandTotal`, DispatchData?.grandTotal);
    formdata.append(`status`, "InProcess");
    formdata.append(`orderItems`, JSON.stringify(DispatchData?.orderItems));

    CreatAccountView?.map((ele, i) => {
      if (ele?.type?._attributes?.type == "text") {
        formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
      } else if (ele?.type?._attributes?.type == "file") {
        if (ele?.name?._text == "CNUpload") {
          formdata.append("file", formData?.CNUpload);
        }
        if (ele?.name?._text == "FetchSalesInvoice") {
        }
      } else {
        formdata.append(`${ele?.name._text}`, formData[ele?.name?._text]);
      }
    });
    formdata.append(
      `${dropdownValue?.MyDropdown?.dropdown.name?._text}`,
      formData.AssignDeliveryBoy
    );

    Save_GoodDispatch(formdata)
      .then((res) => {
        console.log(res);
        let payload = { status: "Inprocess" };
        Edit_StatusDispatchList(DispatchData?._id, payload)
          .then((res) => {
            console.log(res);
            history.goBack();
          })
          .catch((err) => {
            console.log(err);
          });
        if (res.status) {
          swal("Good Dispatch Created Successfully");
        }
      })
      .catch((err) => {
        console.log(err.response);
        swal("Something went wrong Please Try again After Some Time");
      });
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Create Dispatch</h1>
            </Col>
            <Col>
              <div className="float-right">
                <Route
                  render={({ history }) => (
                    <Button
                      style={{ cursor: "pointer" }}
                      className="float-right mr-1"
                      color="danger"
                      size="sm"
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
                {CreatAccountView &&
                  CreatAccountView?.map((ele, i) => {
                    if (ele?.Lookup?._text == "yes") {
                      return (
                        <>
                          <>
                            <Col key={i} lg="3" md="3" sm="12">
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>

                              <Input
                                disabled
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
                                placeholder="Click to fetch Details"
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
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggle();
                                }}
                                style={{
                                  position: "absolute",
                                  right: 14,
                                  top: 33,
                                }}
                                className="lookupview"
                                color="primary">
                                Fetch
                              </Button>
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
                            </Col>
                          </>
                        </>
                      );
                    }

                    if (!!ele?.phoneinput) {
                      return (
                        <>
                          <Col key={i} lg="3" md="3" sm="12">
                            <FormGroup>
                              <Label className="mb-1">
                                {ele?.label?._text}
                              </Label>
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
                        console.log(ele);
                        return (
                          <Col key={i} lg="3" md="3" sm="12">
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
                      } else {
                        return (
                          <>
                            {ele?.type?._attributes?.type == "date" ? (
                              <>
                                <Col key={i} lg="3" md="3" sm="12">
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
                                <Col key={i} lg="3" md="3" sm="12">
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
                              <Col key={i} lg="3" md="3" sm="12">
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
                            <Col key={i} lg="3" md="3" sm="12">
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
                {/* <Col lg="3" md="3">
                  <div className="mt-1">
                    <FormGroup>
                      <Label>Select Delivery Role *</Label>
                      <CustomInput
                        required
                        type="select"
                        name="rolename"
                        // value={formData["rolename"]}
                        onChange={(e) => {
                          let mySelected = AllUsers?.filter(
                            (ele) => ele?.rolename == e.target.value
                          );
                          setDeliveryBoy(mySelected);
                        }}>
                        <option>--select--</option>
                        {RoleList &&
                          RoleList?.length &&
                          RoleList?.map((ele, i) => {
                            return (
                              <option value={ele?._id}>{ele?.roleName}</option>
                            );
                          })}
                      </CustomInput>
                    </FormGroup>
                  </div>
                </Col> */}

                <Col lg="3" md="3" sm="12">
                  <div className="mt-1">
                    <FormGroup>
                      <Label>
                        {dropdownValue?.MyDropdown?.dropdown?.label?._text} *
                      </Label>
                      <CustomInput
                        required
                        type="select"
                        name={dropdownValue?.MyDropdown?.dropdown?.name?._text}
                        value={
                          formData[
                            dropdownValue?.MyDropdown?.dropdown?.name?._text
                          ]
                        }
                        onChange={handleInputChange}>
                        <option value="">--Assign Delivery Boy--</option>
                        {DeliveryBoy &&
                          DeliveryBoy?.map((option, index) => {
                            return (
                              <option key={option?._id} value={option?._id}>
                                {`${option?.firstName} ${option?.lastName}`}
                              </option>
                            );
                          })}
                      </CustomInput>
                    </FormGroup>
                  </div>
                </Col>
              </Row>

              {/* <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
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
                    type="radio"
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
              </Col> */}
              <Row>
                <Col>
                  <div className="d-flex justify-content-center">
                    <Button.Ripple
                      color="primary"
                      type="submit"
                      className="mr-1 mt-2 mx-2">
                      Submit
                    </Button.Ripple>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <Modal
          size="xl"
          // centered="true"
          isOpen={modal}
          toggle={toggle}
          {...args}
          // style={{ maxWidth: "1050px" }}
        >
          <ModalHeader toggle={toggle}>Invoice Details</ModalHeader>
          <ModalBody>
            <div className="container">
              <Row>
                <Col>
                  <Label>Party Name :</Label>
                  <h5 className="mx-1">
                    {DispatchData && DispatchData?.partyId?.firstName}
                  </h5>
                </Col>
                <Col>
                  <Label>Date Created :</Label>
                  <h5>
                    {DispatchData && DispatchData?.createdAt?.split("T")[0]}
                  </h5>
                </Col>
                <Col>
                  <Label>Taxable:</Label>
                  <h5>
                    <strong>{DispatchData && DispatchData?.amount}</strong>
                    Rs/-
                  </h5>
                </Col>
                {DispatchData?.igstTaxType && DispatchData?.igstTaxType == 1 ? (
                  <>
                    <Col>
                      <Label>IGST:</Label>
                      <h5>
                        <strong>
                          {DispatchData && DispatchData?.igstTotal}
                        </strong>
                        Rs/-
                      </h5>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col>
                      <Label>SGST:</Label>
                      <h5>
                        <strong>
                          {DispatchData && DispatchData?.sgstTotal}
                        </strong>
                        Rs/-
                      </h5>
                    </Col>
                    <Col>
                      <Label>CGST:</Label>
                      <h5>
                        <strong>
                          {DispatchData && DispatchData?.cgstTotal}
                        </strong>
                        Rs/-
                      </h5>
                    </Col>
                  </>
                )}
                <Col>
                  <Label>Address :</Label>
                  <h5>
                    <strong>{DispatchData && DispatchData?.address} </strong>
                  </h5>
                </Col>
                <Col>
                  <Label>Grand Total :</Label>
                  <h5>
                    <strong>{DispatchData && DispatchData?.grandTotal} </strong>
                    Rs/-
                  </h5>
                </Col>

                {/* <Col>
                <Label>Download Invoice :</Label>
                <div className="d-flex justify-content-center">
                  <FaDownload
                    onClick={this.handleStockTrxInvoiceShow}
                    color="#00c0e"
                    fill="#00c0e"
                    style={{ cursor: "pointer" }}
                    size={20}
                  />
                </div>
              </Col> */}
              </Row>
              <Row className="p-2">
                <Col>
                  <div className="d-flex justify-content-center">
                    <h4>Product Details</h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table style={{ cursor: "pointer" }} responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DispatchData?.orderItems &&
                        DispatchData?.orderItems?.map((ele, i) => (
                          <>
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{ele?.productId?.Product_Title}</td>
                              <td>{ele?.productId?.Product_MRP}</td>
                              <td>{ele?.Size}</td>
                              <td>{ele?.unitType}</td>
                              <td>{ele?.qty}</td>
                              <td>
                                {ele?.productId?.Product_MRP *
                                  ele?.Size *
                                  ele?.qty}
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default CreateDispach;
