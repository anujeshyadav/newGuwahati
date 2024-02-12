import React, { useEffect, useState, useContext } from "react";

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
  Table,
  Spinner,
} from "reactstrap";
import Ledgers from "./Ledger";
import "react-phone-input-2/lib/style.css";
import LedgerPdf from "../house/LedgerPdf";
import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";

import { CreateCustomerList, _Get } from "../../../../ApiEndPoint/ApiCalling";

import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";

import { View_Ledger_by_id } from "../../../../ApiEndPoint/Api";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";
let SecondLast = null;
const PartyLedgersView = () => {
  const [Ledger, setLedger] = useState([]);
  const [PartyId, setPartyId] = useState("");
  const [Master, setMaster] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [PartyList, setPartyList] = useState([]);

  const Context = useContext(UserContext);

  const Apicalling = (id, db) => {
    setLoading(true);
    CreateCustomerList(id, db)
      .then((res) => {
        setLoading(false);

        let value = res?.Customer;
        if (value?.length) {
          setPartyList(value);
        }
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        setPartyList([]);
      });
  };
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData"));
    Apicalling(userId?._id, userId?.database);
    if (userId?.rolename?.roleName === "MASTER") {
      setMaster(true);
    }
  }, []);
  const handleParentSubmit = (e) => {
    e.preventDefault();
    let SuperAdmin = JSON.parse(localStorage.getItem("SuperadminIdByMaster"));
    let id = SuperAdmin.split(" ")[0];
    let db = SuperAdmin.split(" ")[1];
    Apicalling(id, db);
  };
  const handleDropdownChange = (selectedValue) => {
    localStorage.setItem("SuperadminIdByMaster", JSON.stringify(selectedValue));
  };
  const handleLedger = async (e) => {
    e.preventDefault();
    setLoading(true);

    await _Get(View_Ledger_by_id, PartyId)
      .then((res) => {
        setLoading(false);
        debugger;

        SecondLast = res?.Ledger?.length - 1;
        setLedger(res?.Ledger);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };
  return (
    <div>
      <div>
        {Loading && Loading ? (
          <>
            <div className="d-flex justify-content-center align-item-center">
              {" "}
              <Spinner
                style={{
                  height: "4rem",
                  width: "4rem",
                }}
                color="primary">
                Loading...
              </Spinner>
            </div>
          </>
        ) : (
          <>
            <Card>
              <Row className="m-2">
                <Col lg="2" md="2">
                  <div className="table-input mr-1">
                    <h3>Party Ledger</h3>
                  </div>
                </Col>
                <Col lg="5" md="5">
                  <SuperAdminUI
                    onDropdownChange={handleDropdownChange}
                    onSubmit={handleParentSubmit}
                  />
                </Col>
                <Col></Col>
                <Col lg="2" md="2">
                  <CustomInput
                    onChange={(e) => {
                      setPartyId(e.target.value);
                    }}
                    value={PartyId}
                    type="select">
                    <option value={0}>--Select Party--</option>
                    {PartyList?.length > 0 &&
                      PartyList?.map((ele, i) => {
                        return (
                          <option
                            value={
                              ele?._id
                            }>{`${ele?.firstName} ${ele?.lastName} `}</option>
                        );
                      })}
                  </CustomInput>
                </Col>
                <Col lg="1" md="1" sm="6">
                  <div className="table-input mr-1 ">
                    <Button
                      onClick={handleLedger}
                      type="submit"
                      className=""
                      color="primary">
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col></Col>
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
                  <div
                    className="table-input mr-1 mt-2 "
                    style={{ marginTop: "6px" }}>
                    <Button type="submit" className="" color="primary">
                      Submit
                    </Button>
                  </div>
                </Col>
                <Col lg="1" md="1" sm="1">
                  <div className="d-flex justify-content-center">
                    <LedgerPdf
                      downloadFileName="Ledger"
                      rootElementId="testId"
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
                            <div className="d-flex justify-content-center">
                              <h5 className="text-bold">Name</h5>
                            </div>
                          </th>
                          <th>
                            <div className="d-flex justify-content-center">
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
                              <td>
                                <div className="">
                                  <div>{ele?.createdAt?.split("T")[0]}</div>
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{ fontWeight: "bold" }}
                                  className="">
                                  <div>{ele?.name}</div>
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{ fontWeight: "bold" }}
                                  className="d-flex justify-content-center">
                                  {ele?.voucherType}
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{ fontWeight: "bold" }}
                                  className="d-flex justify-content-center">
                                  {ele?.reason}
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{ fontWeight: "bold" }}
                                  className="d-flex justify-content-center">
                                  {ele?.debit}
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{ fontWeight: "bold" }}
                                  className="d-flex justify-content-center">
                                  {ele?.creditBalance}
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
                                className="d-flex justify-content-center"></div>
                            </td>
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
          </>
        )}
      </div>
    </div>
  );
};
export default PartyLedgersView;
