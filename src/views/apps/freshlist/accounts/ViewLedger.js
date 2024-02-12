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
import Ledgers from "./Ledger";
import { history } from "../../../../history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import moment from "moment-timezone";
import { Route, useParams } from "react-router-dom";
// import LedgerPdf from "../house/LedgerPdf";
import LedgerPdf from "../house/LedgerPdf";

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
import { View_Ledger_by_id } from "../../../../ApiEndPoint/Api";
let SecondLast = null;
const ViewLedger = () => {
  const [Ledger, setLedger] = useState([]);

  let Params = useParams();

  const Context = useContext(UserContext);

  useEffect(() => {
    _Get(View_Ledger_by_id, Params?.id)
      .then((res) => {
        SecondLast = res?.Ledger?.length - 1;
        setLedger(res?.Ledger);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Party Ledger</h1>
            </Col>
            <Col lg="2" md="2" sm="2">
              <div className="d-flex justify-content-end mr-1 mt-2">
                <LedgerPdf downloadFileName="Ledger" rootElementId="testId" />
              </div>
            </Col>

            <Col lg="2" md="2">
              <div className="table-input mr-1">
                <Label>Start Date</Label>
                <Input type="date" name="startDate" />
              </div>
            </Col>
            <Col lg="2" md="2">
              <div className="table-input mr-1">
                <Label>End Date</Label>
                <Input type="date" name="EndDate" />
              </div>
            </Col>
            <Col lg="1" md="1" sm="6">
              <div className="table-input mr-1 " style={{ marginTop: "6px" }}>
                <Button type="submit" className="" color="primary">
                  Submit
                </Button>
              </div>
            </Col>

            <Col lg="1" md="1" sm="6">
              <div className="float-right">
                <Route
                  render={({ history }) => (
                    <Button
                      style={{ cursor: "pointer" }}
                      className="float-right mr-1 mt-2"
                      color="primary"
                      onClick={() => history.goBack()}>
                      {" "}
                      Back
                    </Button>
                  )}
                />
              </div>
            </Col>
          </Row>
          {/* <hr /> */}

          <CardBody>
            <div className="p-4">
              <Table id="testId" bordered hover responsive size="sm">
                {Ledger?.length > 0 && Ledger && (
                  <thead>
                    <tr>
                      <th>
                        <div className="d-flex justify-content-center">
                          <h5 className="text-bold">Date</h5>
                        </div>
                      </th>
                      <th>
                        <div className="">
                          <h5 className="text-bold">Name</h5>
                        </div>
                      </th>
                      <th>
                        <div className="">
                          <h5 className="text-bold">Particular</h5>
                        </div>
                      </th>
                      <th>
                        <div className="d-flex justify-content-center">
                          <h5 className="text-bold">Reason</h5>
                        </div>
                      </th>
                      <th>
                        <div className="d-flex justify-content-center">
                          <h5 className="text-bold">Debit</h5>
                        </div>
                      </th>
                      <th>
                        <div className="d-flex justify-content-center">
                          <h5 className="text-bold">Credit</h5>
                        </div>
                      </th>
                      <th>
                        <div className="d-flex justify-content-center">
                          <h5 className="text-bold">Total</h5>
                        </div>
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {Ledger &&
                    Ledger?.map((ele, index) => {
                      return (
                        <tr key={ele?._id}>
                          <th scope="row">
                            <div
                              style={{ fontWeight: "bold" }}
                              className="d-flex justify-content-center">
                              {index + 1}
                            </div>
                          </th>
                          <td>
                            <div style={{ fontWeight: "bold" }} className="">
                              <div>{ele?.name}</div>
                            </div>
                            <div className="">
                              <div>{ele?.createdAt?.split("T")[0]}</div>
                            </div>
                          </td>
                          <td>
                            <div
                              style={{ fontWeight: "bold" }}
                              className="d-flex justify-content-center">
                              {ele?.debitBalance}
                            </div>
                          </td>
                          <td>
                            <div
                              style={{ fontWeight: "bold" }}
                              className="d-flex justify-content-center">
                              {ele?.credit}
                            </div>
                          </td>
                          <td>
                            <div
                              style={{ fontWeight: "bold" }}
                              className="d-flex justify-content-center">
                              {ele?.closingBalance}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  {Ledger?.length > 0 && Ledger && (
                    <>
                      <tr>
                        <th scope="row">
                          <div
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                            className="d-flex justify-content-center">
                            Total
                          </div>
                        </th>
                        <td>
                          <div
                            style={{ fontWeight: "bold" }}
                            className="d-flex justify-content-center"></div>
                        </td>
                        <td>
                          <div
                            style={{ fontWeight: "bold" }}
                            className="d-flex justify-content-center">
                            <div style={{ fontSize: "20px" }}>
                              <strong>
                                {" "}
                                {Ledger[SecondLast]?.debitBalance &&
                                  Ledger[SecondLast]?.debitBalance}
                              </strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ fontWeight: "bold" }}
                            className="d-flex justify-content-center">
                            <div style={{ fontSize: "20px" }}>
                              <strong>
                                {" "}
                                {Ledger[SecondLast]?.creditBalance &&
                                  Ledger[SecondLast]?.creditBalance}
                              </strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ fontWeight: "bold" }}
                            className="d-flex justify-content-center">
                            <div style={{ fontSize: "20px" }}>
                              <strong>
                                {Ledger[SecondLast]?.closingBalance &&
                                  Ledger[SecondLast]?.closingBalance}
                              </strong>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </div>
            <Row>
              {Ledger && Ledger?.length > 0 && (
                <Col>
                  <Ledgers Ledger={Ledger} />
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default ViewLedger;
