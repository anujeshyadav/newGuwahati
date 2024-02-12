import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
} from "reactstrap";
import axios from "axios";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash2, ChevronDown, Eye } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { Route, Link } from "react-router-dom";
// import { components } from "react-select";
import axiosConfig from "../../../../axiosConfig";
import swal from "sweetalert";

class BudgetAssignment extends React.Component {
  state = {
    rowData: [],
    RoleDefine: "",
    TopupAmount: "",
    topupdata: "",
    RequestedTopup: "",
    modalView: false,
    IsTopup: false,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      // editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "S.No",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 150,
        filter: true,
      },
      {
        // headerName: `${
        //   this.state.RoleDefine === "Super Admin" ? "TopUp" : "Amount"
        // }`,
        headerName: "TopUp",
        field: "username",
        filter: true,
        width: "200",
        cellRendererFramework: (params) => {
          return (
            <div>
              {this.state.RoleDefine === "Super Admin" && (
                <>
                  <Button
                    onClick={(e) => this.handleTopUp(e, params.data)}
                    className="btn "
                    color="primary"
                    size="sm"
                  >
                    Top Up
                  </Button>
                </>
              )}
            </div>
          );
        },
      },
      {
        headerName: "full_name",
        field: "full_name",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.full_name}</span>
            </div>
          );
        },
      },
      {
        headerName: "Requested ",
        field: "topup_budget",
        filter: true,
        width: 230,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{params.data.topup_budget}</span>
            </div>
          );
        },
      },
      {
        headerName: "created_date",
        field: "created_date",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.created_date}</span>
            </div>
          );
        },
      },
      // {
      //   headerName: "requiestedTopup",
      //   field: "requiestedTopup",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.requiestedTopup}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "How Many Remaining",
      //   field: "remaining",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: params => {
      //     return (
      //       <div>
      //         <span>{params.data.remaining}</span>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "Status",
      //   field: "status",
      //   filter: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return params.value === "Block" ? (
      //       <div className="badge badge-pill badge-success">
      //         {params.data.status}
      //       </div>
      //     ) : params.value === "Unblock" ? (
      //       <div className="badge badge-pill badge-warning">
      //         {params.data.status}
      //       </div>
      //     ) : null;
      //   },
      // },
      // {
      //   headerName: "Actions",
      //   field: "sortorder",
      //   field: "transactions",
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="actions cursor-pointer">
      //         <Eye
      //           className="mr-50"
      //           size="25px"
      //           color="green"
      //           onClick={() =>
      //             history.push(
      //               `/app/freshlist/subscriber/viewSubscriber/${params.data._id}`
      //             )
      //           }
      //         />
      //       </div>
      //     );
      //   },
      // },
    ],
  };
  handleTopUp = (e, params) => {
    e.preventDefault();
    this.setState({ modalView: true });
    this.setState({ topupdata: params });
    this.setState({ RequestedTopup: params?.topup_budget });
  };
  componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    this.setState({ RoleDefine: pageparmission.Userinfo.role });
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Budget Assignment"
    );
    // this.setState({ rowData: AssignList });
    // console.log(AssignList);
    // console.log(newparmisson);
    this.setState({ Viewpermisson: newparmisson?.permission.includes("View") });
    this.setState({
      Createpermisson: newparmisson?.permission.includes("Create"),
    });
    this.setState({
      Editpermisson: newparmisson?.permission.includes("Edit"),
    });
    this.setState({
      Deletepermisson: newparmisson?.permission.includes("Delete"),
    });
    // console.log(newparmisson?.permission.includes("View"));
    // console.log(newparmisson?.permission.includes("Create"));
    // console.log(newparmisson?.permission.includes("Edit"));
    // console.log(newparmisson?.permission.includes("Delete"));

    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);
    axiosConfig
      .post(`/getAllUsersTopupBuget`, formdata)
      .then((res) => {
        console.log(res.data?.data);
        this.setState({ rowData: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleTopup = () => {
    this.setState({ IsTopup: true });
  };

  HandleSubmitTopUpRequest = (e) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("topup_budget", this.state.TopupAmount);
    if (this.state.TopupAmount > 0) {
      axiosConfig
        .post(`/addtopuptouser`, data)
        .then((res) => {
          console.log(res.data);
          swal("Success", "TopUp Request Created Successfully");
          this.setState({ TopupAmount: "" });
        })
        .catch((err) => {
          console.log(err);
          swal("Something went Wrong");
        });
    } else {
      swal("Something is Missing.Enter details before Submit");
    }
  };
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };
  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  handleTopupAssign = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("topup_id", this.state.topupdata?.id);
    data.append("user_request_id", this.state.topupdata?.user_id);
    data.append("super_user_id", this.state.topupdata?.user_request_id);
    data.append("topup_budget", this.state.RequestedTopup);

    axiosConfig
      .post(`/updatetopupuser`, data)
      .then((res) => {
        console.log(res.data);
        this.setState({ modalView: false });

        swal("Success", "TopUp Added Successfully");
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col lg="4" md="4" sm="4">
                <h1
                // sm="6"
                // className="float-left"
                >
                  Budget Assignement
                </h1>
              </Col>
              {/* <Col>
                  <h5 sm="4" className="">
                    Assigned Budget-5000
                  </h5>
                </Col>
                <Col>
                  <h5 sm="4" className="">
                    Remaining Budget-5000
                  </h5>
                </Col> */}
              {this.state.RoleDefine === "User" ? (
                <>
                  {this.state.IsTopup == false ? (
                    <>
                      <Col className="d-flex justify-content-end">
                        <Button
                          color="primary"
                          className="float-right"
                          onClick={this.handleTopup}
                        >
                          TopUp Request
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col>
                        <Input
                          className="form-control"
                          type="number"
                          value={this.state.TopupAmount}
                          placeholder="Enter Top up"
                          onChange={(e) =>
                            this.setState({ TopupAmount: e.target.value })
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          className="float-right"
                          color="primary"
                          onClick={this.HandleSubmitTopUpRequest}
                        >
                          Submit
                        </Button>
                      </Col>
                    </>
                  )}
                </>
              ) : null}
            </Row>
            {/* <Row className="m-2">
              <Col>
                <input className="form-control " type="number" />
              </Col>
              <Col>
                <Button
                  color="primary"
                  // className="float-right"
                  onClick={this.handSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row> */}

            {/* <Col>
                  <input className="form-control mt-1" type="number" />
                </Col>
                <Col>
                  <Button color="primary" className="mt-1">
                    Assign Budget
                  </Button>
                </Col> */}
            {/* <Col>
                  <input className="form-control mt-1" type="number" />
                </Col>
                <Col>
                  <Button color="primary" className="mt-1">
                    TOPUP Budget
                  </Button>
                </Col>
                <Col>
                  <label className="selectClient">Select a Client</label>

                  <select className="form-control" name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </Col>
                <Col>
                  <Button color="primary" className="mt-1">
                    Submit
                  </Button>
                </Col> */}

            <CardBody>
              {this.state.rowData === null ? null : (
                <div className="ag-theme-material w-100 my-2 ag-grid-table">
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="mb-1">
                      <UncontrolledDropdown className="p-1 ag-dropdown">
                        <DropdownToggle tag="div">
                          {this.gridApi
                            ? this.state.currenPageSize
                            : "" * this.state.getPageSize -
                              (this.state.getPageSize - 1)}{" "}
                          -{" "}
                          {this.state.rowData.length -
                            this.state.currenPageSize * this.state.getPageSize >
                          0
                            ? this.state.currenPageSize * this.state.getPageSize
                            : this.state.rowData.length}{" "}
                          of {this.state.rowData.length}
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(20)}
                          >
                            20
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(50)}
                          >
                            50
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(100)}
                          >
                            100
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(134)}
                          >
                            134
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between mb-1">
                      {this.state.modalView && (
                        <>
                          <div className="table-input mr-1">
                            {/* <label className="">
                              User:
                              {this.state.topupdata &&
                                this.state.topupdata?.full_name}
                            </label> */}
                            <Input
                              className="form-control"
                              placeholder="Enter Topup Amount"
                              onChange={(e) =>
                                this.setState({
                                  RequestedTopup: e.target.value,
                                })
                              }
                              value={this.state.RequestedTopup}
                            />
                          </div>
                          <div className="table-input mr-1">
                            <Button
                              onClick={(e) => this.handleTopupAssign(e)}
                              color="primary"
                            >
                              Topup Now
                            </Button>
                          </div>
                          <div className="table-input mr-1">
                            <Button
                              className="float-right"
                              color="danger"
                              onClick={(e) => {
                                this.setState({ modalView: false });
                                e.preventDefault();
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      )}
                      <div className="table-input mr-1">
                        <Input
                          placeholder="search..."
                          onChange={(e) =>
                            this.updateSearchQuery(e.target.value)
                          }
                          value={this.state.value}
                        />
                      </div>
                      <div className="export-btn">
                        <Button.Ripple
                          color="primary"
                          onClick={() => this.gridApi.exportDataAsCsv()}
                        >
                          Export as CSV
                        </Button.Ripple>
                      </div>
                    </div>
                  </div>
                  <ContextLayout.Consumer>
                    {(context) => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={false}
                        pagination={true}
                        paginationPageSize={this.state.paginationPageSize}
                        pivotPanelShow="always"
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default BudgetAssignment;
