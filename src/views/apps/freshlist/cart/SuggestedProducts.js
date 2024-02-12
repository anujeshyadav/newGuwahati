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
  Label,
  FormGroup,
} from "reactstrap";
import Multiselect from "multiselect-react-dropdown";

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
const selectItem1 = [];
class SuggestedProducts extends React.Component {
  state = {
    rowData: [],
    userDataList: [],
    mainRole: "",
    userid: "",
    BudgetValue: "",
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
        headerName: "Name",
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
        headerName: "Assigned Budget",
        field: "budget",
        filter: true,
        width: 220,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex mt-1 align-items-center cursor-pointer">
              <Badge color="success">{params.data.budget}</Badge>
            </div>
          );
        },
      },
      {
        headerName: "Remaining Budget",
        field: "remaining_budget",
        filter: true,
        width: 220,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex mt-1 align-items-center cursor-pointer">
              <Badge color="warning">{params.data.remaining_budget}</Badge>
            </div>
          );
        },
      },
      {
        headerName: "Assigned Date",
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
      //   headerName: "How Many Orders Placed",
      //   field: "orders",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.orders}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "How Many Remaining",
      //   field: "remaining",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
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
  componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    // console.log("role", pageparmission.Userinfo.role);
    this.setState({ mainRole: pageparmission?.Userinfo?.role });
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Budget List"
    );
    console.log(newparmisson);
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

    const formdata = new FormData();
    formdata.append("role", pageparmission?.Userinfo?.role);
    formdata.append("user_id", pageparmission?.Userinfo?.id);

    axiosConfig
      .post("/getAllUsersBuget", formdata)
      .then((response) => {
        console.log(response.data.data);
        let rowData = response?.data?.data;
        this.setState({ rowData });
      })
      .catch((err) => {
        console.log(err);
      });

    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", "User");
    axiosConfig
      .post("/getUserlistforBudget", data)
      .then((response) => {
        let userDataList = response?.data?.data?.users;
        this.setState({ userDataList });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
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
  handleAssignBudget = (e) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    let uniqueChars = [...new Set(selectItem1)];
    // debugger;
    // console.log(uniqueChars);

    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("budget", this.state.BudgetValue);
    data.append("assign_user_id", JSON.stringify(uniqueChars));
    if (this.state.BudgetValue > 0) {
      axiosConfig
        .post(`/addbudget`, data)
        .then((res) => {
          swal("Budget Assigned Successfully");
          console.log(res.data);
          this.setState({ BudgetValue: "" });
          this.setState({ userid: "" });
          window.location.reload();
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("Something is Missing. Enter details before Submit");
    }
  };
  onSelect(selectedList, selectedItem) {
    console.log(selectedList);

    if (selectedList.length) {
      for (var i = 0; i < selectedList.length; i++) {
        selectItem1.push(selectedList[i].id);
      }
    }
    // console.log(selectItem1);
  }

  onRemove = (selectedList, removedItem) => {
    // selectItem1 = [];
    // console.log(selectedList);
    // if (selectedList.length) {
    //   for (var i = 0; i < selectedList.length; i++) {
    //     selectItem1.push({ userid: selectedList[i].id });
    //   }
    // }
    console.log(removedItem);

    // let arr1 = selectItem1.includes(removedItem?.id);
    // let newarr = selectItem1.filter((val) => {
    //   console.log(((val = removedItem?.id), i));
    //   debugger;
    //   if (val === removedItem?.id) {
    //     return null;
    //   } else {
    //     return val;
    //   }
    // });
    // console.log(arr1);
  };
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      // console.log(rowData),
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col lg="4" md="4" sm="4">
                <h1 sm="4" className="">
                  Budget List
                </h1>
              </Col>
              {this.state.mainRole === "Super Admin" && (
                <>
                  <Col>
                    <label className="selectClient">Add Amount</label>
                    <input
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      onChange={(e) => {
                        this.setState({ BudgetValue: e.target.value });
                      }}
                      className="form-control"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Select A User</Label>
                      <Multiselect
                        required
                        options={this.state.userDataList} // Options to display in the dropdown
                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="username" // Property name to display in the dropdown options
                      />
                      {/* <select
                        required
                        onChange={(e) =>
                          this.setState({ userid: e.target.value })
                        }
                        className="form-control"
                        name="Select"
                        id="Select"
                      >
                        <option value="">--Select A User--</option>
                        {this.state.userDataList &&
                          this.state.userDataList?.map((val, i) => (
                            <option key={i} value={val?.id}>
                              {val?.username}
                            </option>
                          ))}
                      </select> */}
                    </FormGroup>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button
                        title="Select user and Amount for Submit"
                        color="primary"
                        className="custom-button mt-2"
                        onClick={(e) => {
                          this.handleAssignBudget(e);
                        }}
                      >
                        Assign Now
                      </Button>
                    </div>
                  </Col>
                </>
              )}
            </Row>

            {/* <Col>
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
                </Col> */}

            {/* <Col>
                  <Button color="primary" className="mt-1">
                    Submit
                  </Button>
                </Col>
              </Row> */}
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
export default SuggestedProducts;
