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
import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Edit, Trash2, ChevronDown } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";

class paymentcompleted extends React.Component {
  state = {
    rowData: [],
    paginationPageSize: 20,
    currenPageSize: "",
    Viewpermisson: null,
    Editpermisson: null,
    Createpermisson: null,
    Deletepermisson: null,
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
        width: 80,
        filter: true,
      },

      {
        headerName: "Orderid",
        field: "order_ids",
        filter: true,
        resizable: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params?.data?.order_ids}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Payment Status",
        field: "status",
        filter: true,
        resizable: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span color="green">
                  <Badge size="sm" color="success">
                    {params.data?.status}
                  </Badge>
                </span>
              </div>
            </div>
          );
        },
      },

      {
        headerName: "Grandtotal",
        field: "grandtotal",
        filter: true,
        resizable: true,
        width: 160,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <Badge color="success">{params.data?.grandtotal}</Badge>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "Invoice",
      //   field: "invoice",
      //   filter: true,
      //   resizable: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center justify-content-center cursor-pointer">
      //         <div>
      //           <span>
      //             <AiOutlineDownload
      //               onClick={() => this.handleBillDownload(params.data)}
      //               fill="green"
      //               size="30px"
      //             />
      //           </span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "created_date",
        field: "created_date",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center justify-content-center cursor-pointer">
              <div>
                <span>{params?.data?.created_date}</span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "Suppliername",
      //   field: "supplier_name",
      //   filter: true,
      //   resizable: true,
      //   width: 210,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.orders[0]?.supplier_name}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "CGST",
        field: "totcgst",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data?.totcgst}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "SGST",
        field: "totsgst",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data?.totsgst}</span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "discount_value",
      //   field: "discount_value",
      //   filter: true,
      //   resizable: true,
      //   width: 210,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.discount_value}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "other_charges",
        field: "other_charges",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data?.other_charges}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Discount",
        field: "discount_value",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data?.discount_value}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "delivery_charges",
        field: "delivery_charges",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data?.delivery_charges}</span>
              </div>
            </div>
          );
        },
      },

      // {
      //   headerName: "Add Payment",
      //   field: "category.category_name",
      //   filter: true,
      //   width: 300,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div
      //         style={{ padding: "6px 0px" }}
      //         className="d-flex align-items-center custominputbox"
      //       >
      //         <input
      //           type="text"
      //           className="form-control"
      //           placeholder="Enter Amount"
      //           onChange={(e) => {
      //             this.setState({ Addmoney: e.target.value });
      //           }}
      //         />
      //         <Button
      //           style={{
      //             position: "absolute",
      //             right: "26px",
      //             padding: "11px 11px",
      //           }}
      //           size="sm"
      //           onClick={(e) => this.handleAddMoney(e, params?.data)}
      //           color="primary"
      //         >
      //           add
      //         </Button>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Add Now",
      //   field: "type",
      //   filter: true,
      //   width: 210,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div
      //         style={{ padding: "6px 0px" }}
      //         className="d-flex align-items-center custombutton"
      //       >
      //         <Button
      //           size="sm"
      //           onClick={(e) => this.handleAddMoney(e, params?.data)}
      //           color="primary"
      //         >
      //           ADD Payment
      //         </Button>
      //       </div>
      //     );
      //   },
      // },
    ],
    // columnDefs: [
    //   {
    //     headerName: "S.No",
    //     valueGetter: "node.rowIndex + 1",
    //     field: "node.rowIndex + 1",
    //     width: 100,
    //     filter: true,
    //   },
    //   {
    //     headerName: "Image",
    //     field: "image",
    //     filter: true,
    //     width: 100,
    //     cellRendererFramework: (params) => {
    //       return (
    //         <img
    //           className=" rounded-circle mr-50"
    //           src={params.data.image}
    //           alt="user avatar"
    //           height="40"
    //           width="40"
    //         />
    //       );
    //     },
    //   },
    //   {
    //     headerName: "Name",
    //     field: "subcategory_name",
    //     filter: true,
    //     width: 150,
    //     cellRendererFramework: (params) => {
    //       return (
    //         <div className="d-flex align-items-center">
    //           <span>{params.data.subcategory_name}</span>
    //         </div>
    //       );
    //     },
    //   },

    //   {
    //     headerName: "Category",
    //     field: "category.category_name",
    //     filter: true,
    //     width: 150,
    //     cellRendererFramework: (params) => {
    //       return (
    //         <div className="d-flex align-items-center">
    //           <span>{params.data.category?.category_name}</span>
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     headerName: "Type",
    //     field: "type",
    //     filter: true,
    //     width: 150,
    //     cellRendererFramework: (params) => {
    //       return (
    //         <div className="d-flex align-items-center">
    //           <span>{params.data?.type}</span>
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     headerName: "Feature",
    //     field: "feature",
    //     filter: true,
    //     width: 150,
    //     cellRendererFramework: (params) => {
    //       return (
    //         <div className="d-flex align-items-center">
    //           <span>{params.data?.feature}</span>
    //         </div>
    //       );
    //     },
    //   },

    //   {
    //     headerName: "Status",
    //     field: "status",
    //     filter: true,
    //     width: 150,
    //     cellRendererFramework: (params) => {
    //       return params.value === "Active" ? (
    //         <div className="badge badge-pill badge-success">
    //           {params.data.status}
    //         </div>
    //       ) : params.value === "Inactive" ? (
    //         <div className="badge badge-pill badge-warning">
    //           {params.data.status}
    //         </div>
    //       ) : null;
    //     },
    //   },
    //   {
    //     headerName: "Actions",
    //     field: "sortorder",
    //     field: "transactions",
    //     width: 150,
    //     cellRendererFramework: (params) => {
    //       return (
    //         <div className="actions cursor-pointer">
    //           {/* <Eye
    //                             className="mr-50"
    //                             size="25px"
    //                             color="green"
    //                             onClick={() =>
    //                                 history.push(`/app/customer/viewCustomer/${params.data._id}`)}
    //                         /> */}
    //           <Route
    //             render={({ history }) => (
    //               <Edit
    //                 className="mr-50"
    //                 size="25px"
    //                 color="blue"
    //                 onClick={() =>
    //                   history.push(
    //                     `/app/freshlist/subcategory/editSubCategory/${params.data._id}`
    //                   )
    //                 }
    //               />
    //             )}
    //           />
    //           <Route
    //             render={({ history }) => (
    //               <Trash2
    //                 className="mr-50"
    //                 size="25px"
    //                 color="red"
    //                 onClick={() => {
    //                   let selectedData = this.gridApi.getSelectedRows();
    //                   this.runthisfunction(params.data._id);
    //                   this.gridApi.updateRowData({ remove: selectedData });
    //                 }}
    //               />
    //             )}
    //           />
    //         </div>
    //       );
    //     },
    //   },
    // ],
  };

  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    console.log(pageparmission.role);
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Payment completed"
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
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    // formdata.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig
      .post(`/getPaymentStatusComplete`, formdata)
      .then((res) => {
        console.log(res.data.data);
        let rowData = res.data.data;
        this.setState({ rowData });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async runthisfunction(id) {
    console.log(id);
    await axiosConfig.delete(`/admin/del_subcategory/${id}`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
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
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col>
                <h1 sm="6" className="float-left">
                  Payment completed
                </h1>
              </Col>
              {/* <Col>
                  <Button
                    style={{ marginRight: "-22rem" }}
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/subcategory/SubCategoryList")
                    }
                  >
                    Back
                  </Button>
                </Col> */}
              {/* <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className="btn float-right"
                      color="primary"
                      onClick={() =>
                        history.push(
                          "/app/freshlist/subcategory/addSubCategory"
                        )
                      }
                    >
                      Add New
                    </Button>
                  )}
                />
              </Col> */}
            </Row>
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
export default paymentcompleted;
