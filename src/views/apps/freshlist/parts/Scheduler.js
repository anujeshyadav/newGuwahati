// import React, { Component, useDebugValue } from "react";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  CustomInput,
  Button,
  Label,
  Input,
  Form,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import Terrance from "./Terrance";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import { CloudLightning } from "react-feather";
import { timers } from "jquery";
import {
  CampaignUpload,
  CustomerDataUpload,
  DealerUpload,
  DistributorUpload,
  InspectionUpload,
  InvoiceUpload,
  Orders,
  PartCatelougue,
  ProdctsUpload,
  ServiceCenterUpload,
  ServiceRate,
  ServicingUpload,
  SpareParts,
  SupplierUpload,
  SupporttUpload,
  WareHouseUpload,
} from "../../../../ApiEndPoint/ApiCalling";
// import { dummytest } from "./test";
import HtmlParser from "react-html-parser";
import Pickers from "../../../forms/form-elements/datepicker/Pickers";
// const selectItem1 = [];

// const Selectedarray = [];

const importData = [
  "Product Registration",
  "SpareParts",
  "Orders",
  "PartsCatalogue",
  "Scrutiny / Inspections",
  "Invoices / Billing",
  "Support",
  "Service Rate",
  "Servicing",
  "Warehouse",
  "Distributors",
  "Dealers",
  "Suppliers",
  "Service Centers",
  "Customer Data",
  "Campaigns",
];
const Scheduler = () => {
  const [scheduler, setScheduler] = useState({});
  const [Adhocfile, setAdhocfile] = useState({});
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [Role, setRole] = useState("");
  const [allPart, setAllPart] = useState([]);

  useEffect(() => {
    // console.log(dummytest);
    // console.log("answer_steps--->", JSON.parse(dummytest?.answer_steps));
    // console.log("plan--->", dummytest?.plan);
    // console.log("question_text-->", dummytest?.question_text);
    setAllPart(importData);
    // let pageparmission = JSON.parse(localStorage.getItem("userData"));
    // let newparmisson = pageparmission?.role?.find(
    //   (value) => value?.pageName === "Create Account"
    // );
  }, []);

  useEffect(() => {
    console.log(scheduler);
    console.log(Adhocfile);
  }, [scheduler, Adhocfile]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setScheduler({
      ...scheduler,
      [name]: value,
    });
  };
  const handleopentoggle = () => {
    toggle();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    // let uniqueChars = [...new Set(selectItem1)];
    // let selectedOption = [...new Set(selectedOptions)];
  };

  const HandleSelectRole = (val) => {
    setRole(val);
    toggle();
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let formdata = new FormData();
    var selectType;
    var selectTypes;
    // debugger;
    console.log(Role.split(" ").join(""));
    if (Role.split(" ").join("").includes("/")) {
      selectType = Role.split("/").join("").split(" ")[0];
      selectTypes = Role.split("/").join("").split(" ")[1];
    } else {
      selectType = Role.split(" ").join("");
    }
    let adhodfile = Adhocfile[0].name.split(".")[0];
    // console.log(adhodfile.includes(selectType));
    if (adhodfile.includes(selectType) || adhodfile.includes(selectTypes)) {
      formdata.append("file", Adhocfile[0]);
      formdata.append("partType", selectType);

      if (Role == "SpareParts") {
        SpareParts(formdata)
          .then((res) => {
            console.log(res.message);
            swal(`${Role} ${res.message}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Orders") {
        Orders(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "PartsCatalogue") {
        PartCatelougue(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Product Registration") {
        ProdctsUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Scrutiny / Inspections") {
        InspectionUpload(formdata)
          .then((res) => {
            console.log(res);
            setLoading(false);

            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Invoices / Billing") {
        InvoiceUpload(formdata)
          .then((res) => {
            console.log(res);
            setLoading(false);

            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Support") {
        SupporttUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Servicing") {
        ServicingUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Warehouse") {
        WareHouseUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Distributors") {
        DistributorUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Dealers") {
        DealerUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Suppliers") {
        SupplierUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Service Centers") {
        ServiceCenterUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Customer Data") {
        CustomerDataUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Campaigns") {
        CampaignUpload(formdata)
          .then((res) => {
            setLoading(false);

            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (Role == "Service Rate") {
        ServiceRate(formdata)
          .then((res) => {
            setLoading(false);
            console.log(res);
            swal(`${Role} File Uploaded Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      swal(
        "Error!",
        `Note: ${selectType} Name and ${adhodfile} Name Prefix Should be Match`,
        "error"
      );
    }
  };
  return (
    <div>
      <div>
        <Row>
          <Col>{/* <Pickers /> */}</Col>
        </Row>
        <Card>
          {/* <Row className="p-3">
            <Col>
              {JSON.parse(dummytest?.answer_steps)?.map((ele) => {
                console.log(ele);
                return (
                  <>
                    <div>{ele?.sequence}</div>
                    <div>{ele?.header}</div>
                    <div>{HtmlParser(ele?.text)}</div>
                  </>
                );
              })}
              <div
                dangerouslySetInnerHTML={{
                  __html: dummytest?.plan.replace(/\n/g, "<br/>"),
                }}
              />
            </Col>
          </Row> */}
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Scheduler Time</h1>
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                <Col lg="6" md="6" sm="12">
                  <FormGroup>
                    <Label>Start Date</Label>
                    <Input
                      required
                      type="date"
                      name="StartDate"
                      value={scheduler?.StartDate}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="6" sm="12">
                  <FormGroup>
                    <Label>Start Time </Label>
                    <Input
                      required
                      type="time"
                      name="Start_Time"
                      value={scheduler?.Start_Time}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Recurrence Pattern</Label>
                  <div className="form-label-group mt-2">
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Yearly"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>Yearly</span>
                    </div>
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Monthly"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>Monthly</span>
                    </div>
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Weekly"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>Weekly</span>
                    </div>
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Daily"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>Daily</span>
                    </div>
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Hourly"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>Hourly</span>
                    </div>
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Minuts"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "20px" }}>Minuts</span>
                    </div>
                    <div>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Pattern"
                        value="Second"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "20px" }}>Second</span>
                    </div>
                  </div>
                </Col>

                <Col lg="6" md="6">
                  {scheduler?.Pattern && scheduler?.Pattern && (
                    <>
                      <Label className="mb-1">
                        If you want to Repeated Time
                      </Label>

                      <FormGroup className="d-flex">
                        <div className="mx-2">
                          <Input
                            type="radio"
                            name="Repeat_time"
                            value="Every"
                            onChange={(e) => handleInputChange(e)}
                          />
                          <span style={{ marginRight: "3px" }}>Every</span>
                        </div>
                        <div>
                          <Input
                            className="every"
                            style={{ marginRight: "3px", width: "80px" }}
                            type="text"
                            placeholder={scheduler?.Pattern}
                            name="Every_Interval"
                            value={scheduler?.Every_Interval}
                            onChange={(e) => handleInputChange(e)}
                            // value=""
                          />
                        </div>
                      </FormGroup>
                    </>
                  )}
                </Col>
                <hr />
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label className="my-1">Range Of Recurrence </Label>
                    <div className="ml-2 ">
                      <Input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Recurrence"
                        value="No_End_Date"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>No End Date</span>
                    </div>
                    <div className="ml-2 ">
                      <Input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Recurrence"
                        value="End_After"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>End After</span>
                    </div>
                    {scheduler?.Recurrence == "End_After" && (
                      <div className="d-flex py-1">
                        <div
                          className="OccurrencesStyle"
                          style={{ marginTop: "-5px" }}
                        >
                          <Input
                            style={{
                              marginRight: "3px",
                              width: "100px",
                              marginBottom: "2px",
                            }}
                            value={scheduler?.Occurance_frequency}
                            onChange={(e) => handleInputChange(e)}
                            type="number"
                            name="Occurance_frequency"
                            placeholder="Occurrences Time"
                          />
                        </div>
                        <div>
                          <span style={{ marginLeft: "10px" }}>
                            <b>Occurrences</b>
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="ml-2">
                      <Input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="Recurrence"
                        value="End_by"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span style={{ marginRight: "3px" }}>End by</span>
                    </div>
                    {scheduler?.Recurrence == "End_by" && (
                      <Input
                        value={scheduler?.End_by_date}
                        type="date"
                        name="End_by_date"
                        onChange={(e) => handleInputChange(e)}
                      />
                    )}
                  </FormGroup>
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

            <hr />
            <Row>{/* <Terrance /> */}</Row>
            <Form>
              <Row className="mt-2">
                <Col>
                  <Label>Import Type</Label>
                  <InputGroup className="maininput">
                    <Input
                      disabled
                      name="Role"
                      value={Role}
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      placeholder="Import Search"
                      className="form-control inputs"
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
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="">
                    <h4>Adhoc Upload</h4>
                  </Label>

                  <input
                    multiple
                    className="form-control"
                    style={{ marginRight: "3px" }}
                    name="adhocfiles"
                    type="file"
                    onChange={(e) => setAdhocfile(e.target.files)}
                  />
                </Col>
                <Col
                  lg="6"
                  md="6"
                  sm="6"
                  className="mb-2 d-flex justify-content-center"
                >
                  {loading ? (
                    <>
                      {" "}
                      <>
                        <Button.Ripple
                          color="primary"
                          // onClick={(e) => handleSubmit(e)}
                          className="mr-1 mt-2 mx-2"
                        >
                          Loading..
                        </Button.Ripple>
                      </>
                    </>
                  ) : (
                    <>
                      <Button.Ripple
                        color="primary"
                        onClick={(e) => handleSubmit(e)}
                        className="mr-1 mt-2 mx-2"
                      >
                        Upload
                      </Button.Ripple>
                    </>
                  )}
                </Col>
              </Row>
            </Form>
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
          <ModalHeader toggle={toggle}>Import Type List</ModalHeader>
          <ModalBody className="table-body shedulemodalbody">
            <div className="modalheaderaddrol p-1">
              <h3 className="table-item">Import Type</h3>

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
                    <th>Import Type Name</th>
                  </tr>
                </thead>
                <tbody>
                  {allPart.map((ele, i) => {
                    return (
                      <tr
                        className="tableRowStyles"
                        key={i}
                        name="Role"
                        onClick={(e) => HandleSelectRole(ele)}
                        // onClick={(e) => {
                        //   setScheduler({ ...scheduler, ["Role"]: ele });
                        //   HandleSelectRole(ele);
                        // }}
                        style={{ cursor: "pointer" }}
                      >
                        <th scope="row" className="tableRowStyles">
                          {i + 1}
                        </th>
                        <td className="tableRowStyles"> {ele}</td>
                      </tr>
                    );
                  })}
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
export default Scheduler;
