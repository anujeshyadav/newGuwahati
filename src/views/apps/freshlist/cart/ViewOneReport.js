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

class ViewOneReport extends React.Component {
  state = {
    rowData: [],
    paginationPageSize: 20,
    currenPageSize: "",
    CurrentDate: "",
    StartDate: "",
    EndDate: "",
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
        headerName: "PRODUCT Image",
        field: "product",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          // console.log(params.data);
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                {/* <span>{params.data?.title}</span> */}
                {params?.data?.product_images ? (
                  <img
                    style={{ borderRadius: "12px" }}
                    width="60px"
                    height="40px"
                    src={params?.data?.product_images[0]}
                    alt="image"
                  />
                ) : (
                  "No Image "
                )}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "PoNo",
        field: "po_no",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.po_no}</span>
            </div>
          );
        },
      },
      {
        headerName: "product_id",
        field: "product_id",
        filter: true,
        width: 160,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.product_id}</span>
            </div>
          );
        },
      },
      {
        headerName: "title",
        field: "title",
        filter: true,
        width: 160,
        cellRendererFramework: (params) => {
          return (
            <div>
              <Badge color="success">{params.data.title}</Badge>
            </div>
          );
        },
      },
      {
        headerName: "price",
        field: "price",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <Badge color="success">{params.data.price}</Badge>
            </div>
          );
        },
      },
      {
        headerName: "qty",
        field: "qty",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.qty}</span>
            </div>
          );
        },
      },
      {
        headerName: "Total",
        field: "qty",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <Badge color="success">
                {params.data.qty * params.data.price}
              </Badge>
            </div>
          );
        },
      },
      // {
      //   headerName: "mobileno",
      //   field: "product",
      //   filter: true,
      //   width: 190,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <span>{params.data.user_mobile_no}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "useremail",
      //   field: "user_email",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.user_email}</span>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "phoneno",
      //   field: "phone_no",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.phone_no}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "createdby",
      //   field: "created_by",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.created_by}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "state",
      //   field: "state_title",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.state_title}</span>
      //       </div>
      //     );
      //   },
      // },
      //   {
      //     headerName: "suppliername",
      //     field: "supplier_name",
      //     filter: true,
      //     width: 200,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.supplier_name}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "total",
      //     field: "total",
      //     filter: true,
      //     width: 200,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.total}</span>
      //         </div>
      //       );
      //     },
      //   },
      // {
      //   headerName: "suppliercity",
      //   field: "supplier_city_name",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.supplier_city_name}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "companyname",
      //   field: "company_name",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.company_name}</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "companytype",
      //   field: "company_type",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data.company_type}</span>
      //       </div>
      //     );
      //   },
      // },
      //   {
      //     headerName: "createddate",
      //     field: "created_date",
      //     filter: true,
      //     width: 200,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.created_date}</span>
      //         </div>
      //       );
      //     },
      //   },

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
      //   {
      //     headerName: "Actions",
      //     field: "sortorder",
      //     field: "transactions",
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div className="actions cursor-pointer">
      //           <Eye
      //             className="mr-50"
      //             size="25px"
      //             color="green"
      //             onClick={() =>
      //               history.push(
      //                 `/app/freshlist/subscriber/viewSubscriber/${params.data._id}`
      //               )
      //             }
      //           />
      //         </div>
      //       );
      //     },
      //   },
    ],
  };
  componentDidMount() {
    let data = this.props?.location.state?.products;
    console.log(data);
    this.setState({ rowData: data });
    const date = new Date().toISOString();
    // console.log(date.split("T")[0]);
    this.setState({ CurrentDate: date.split("T")[0] });
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    // console.log(pageparmission.role);
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Date Wise"
    );
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

    // const formdata = new FormData();
    // formdata.append("user_id", pageparmission?.Userinfo?.id);
    // formdata.append("role", pageparmission?.Userinfo?.role);
    // axiosConfig
    //   .post("/reportApi", formdata)
    //   .then((response) => {
    //     // console.log(response?.data?.data);
    //     let rowData = response?.data?.data;
    //     this.setState({ rowData });
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
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
  //   HandleDateWiseReport = (e) => {
  //     e.preventDefault();
  //     let pageparmission = JSON.parse(localStorage.getItem("userData"));
  //     // console.log("start", this.state.StartDate);
  //     // console.log("end", this.state.EndDate);
  //     const data = new FormData();
  //     data.append("user_id", pageparmission?.Userinfo?.id);
  //     data.append("role", pageparmission?.Userinfo?.role);
  //     data.append("from_date", this.state.StartDate);
  //     data.append("to_date", this.state.EndDate);
  //     axiosConfig
  //       .post("/reportApi", data)
  //       .then((response) => {
  //         // debugger;

  //         // console.log(response);
  //         let rowData = response?.data?.data;
  //         this.setState({ rowData });
  //       })
  //       .catch((err) => {
  //         console.log(err?.response?.message);
  //         swal("No Record Found");
  //       });
  //   };
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;

    return (
      // console.log(rowData),
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col sm="4" lg="4" md="4">
                <h1 className="float-left">View Report</h1>
              </Col>

              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" float-right"
                      color="danger"
                      onClick={
                        () => history.goBack()
                        // () => history.push("/app/softNumen/order/completed")
                        // history.push("/app/freshlist/order/addOrder")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
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
export default ViewOneReport;
