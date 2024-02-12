import React from "react";
import {
  Card,
  CardBody,
  Input,
  Label,
  Row,
  CustomInput,
  Col,
  Form,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
} from "reactstrap";
import { AiOutlineDownload } from "react-icons/ai";
import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
import { ToWords } from "to-words";
import InvoiceGenerator from "../subcategory/PurchaseOrderGenerator";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Trash2, ChevronDown, Edit, CloudLightning } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});
class Bills extends React.Component {
  state = {
    rowData: [],
    modal: false,
    sgst: "",
    wordsNumber: "",
    ViewBill: true,
    cgst: "",
    otherCharges: "",
    deliveryCharges: "",
    PrintData: {},
    paginationPageSize: 20,
    currenPageSize: "",
    Viewpermisson: null,
    Editpermisson: null,
    Createpermisson: null,
    Deletepermisson: null,
    getPageSize: "",
    defaultColDef: {
      sortable: true,
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
        headerName: "Status",
        field: "order_status",
        filter: true,
        width: 160,
        cellRendererFramework: params => {
          return params.data?.order_status === "Completed" ? (
            <div className="badge badge-pill badge-success">Completed</div>
          ) : params.data?.order_status === "Pending" ? (
            <div className="badge badge-pill badge-warning">
              {params.data?.order_status}
            </div>
          ) : params.data?.order_status === "Inprogress" ? (
            <div className="badge badge-pill bg-primary">Inprogress</div>
          ) : params.data?.order_status === "canceled" ? (
            <div className="badge badge-pill bg-danger">
              {params.data.order_status}
            </div>
          ) : params.data?.order_status === "Completed" ? (
            <div className="badge badge-pill bg-success">Completed</div>
          ) : null;
        },
      },
      {
        headerName: "order_id",
        field: "order_id",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: params => {
          // console.log(params.data?.order_id);

          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                {/* <select
                  // className="form-control"
                  defaultValue={params.data?.order_status}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    let data = new FormData();
                    data.append("order_id", params.data?.order_id);
                    data.append("order_status", e.target.value);
                    axiosConfig
                      .post(`/change_order_status`, data)
                      .then((res) => {
                        console.log(res?.data.message);
                        if (res?.data.message) {
                          this.componentDidMount();
                          swal("status Updated Succesfully");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  name="changestatus"
                  id="changeStatus"
                >
                  <option value={params.data?.order_status}>
                    {params.data?.order_status}
                  </option>
                  <option value="Pending">--UpdateStatus--</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select> */}
                <span>{params?.data?.order_id}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Invoice",
        field: "invoice",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center justify-content-center cursor-pointer">
              <div>
                <span>
                  <AiOutlineDownload
                    onClick={() => this.handleBillDownload(params.data)}
                    fill="green"
                    size="30px"
                  />
                </span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "username",
        field: "user_full_name",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center justify-content-center cursor-pointer">
              <div>
                <span>
                  {params?.data?.user_full_name}
                  {/* <AiOutlineDownload
                    onClick={() => this.handleBillDownload(params.data)}
                    fill="green"
                    size="30px"
                  /> */}
                </span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "order id ",
      //   field: "user_full_name",
      //   filter: true,
      //   resizable: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.user_full_name}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "Product Image",
      //   field: "product_images",
      //   filter: true,
      //   resizable: true,
      //   width: 160,
      //   cellRendererFramework: (params) => {
      //     // console.log(params.data);
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           {params?.data?.product_images &&
      //           params.data?.product_images?.length ? (
      //             <>
      //               <img
      //                 style={{ borderRadius: "12px" }}
      //                 src={params.data?.product_images[0]}
      //                 alt="image"
      //                 width="60px"
      //               />
      //             </>
      //           ) : (
      //             "No image"
      //           )}
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      {
        headerName: "Actions",
        field: "sortorder",
        field: "transactions",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="actions cursor-pointer">
              {this.state.Viewpermisson && (
                <Route
                  render={({ history }) => (
                    <Eye
                      className="mr-50"
                      size="25px"
                      color="green"
                      onClick={() =>
                        history.push(
                          `/app/freshlist/order/EditCompletedorders/${params.data?.order_id}`
                        )
                      }
                    />
                  )}
                />
              )}
              {/* {this.state.Editpermisson && (
                <Route
                  render={({ history }) => (
                    <Edit
                      className="mr-50"
                      size="25px"
                      color="blue"
                      onClick={() =>
                        history.push(
                          `/app/freshlist/order/editplaceorder/${params.data?.order_id}`
                        )
                      }
                    />
                  )}
                />
              )} */}

              {/* {this.state.Deletepermisson && (
                <Route
                  render={() => (
                    <Trash2
                      className="mr-50"
                      size="25px"
                      color="red"
                      onClick={() => {
                        let selectedData = this.gridApi.getSelectedRows();
                        this.runthisfunction(params.data.id);
                        this.gridApi.updateRowData({ remove: selectedData });
                      }}
                    />
                  )}
                />
              )} */}
            </div>
          );
        },
      },

      {
        headerName: "total",
        field: "total",
        filter: true,
        resizable: true,
        width: 160,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <Badge color="success">{params.data?.total}</Badge>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "brandname ",
      //   field: "brand_name",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.brand_name}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "city",
      //   field: "city",
      //   filter: true,
      //   resizable: true,
      //   width: 160,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.city}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "order Creation date",
        field: "order_date",
        filter: true,
        resizable: true,
        width: 230,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data?.order_date}</span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "deliverydate",
      //   field: "delivery_date",
      //   filter: true,
      //   resizable: true,
      //   width: 230,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.delivery_date}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "description",
      //   field: "description",
      //   filter: "true",
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div className="">
      //           <span>{params.data?.description}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "discountprice",
      //   field: "discountprice",
      //   filter: "true",
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div className="">
      //           <span>{params.data?.discountprice}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "email",
      //   field: "email",
      //   filter: true,
      //   resizable: true,
      //   width: 190,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.email}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "full_name",
      //   field: "full_name",
      //   filter: true,
      //   resizable: true,
      //   width: 170,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.full_name}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "mobile",
      //   field: "mobile",
      //   filter: true,
      //   resizable: true,
      //   width: 190,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.mobile}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "price",
      //   field: "price",
      //   filter: true,
      //   resizable: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.price}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "producttype",
      //   field: "product_type",
      //   filter: true,
      //   resizable: true,
      //   width: 190,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.product_type}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "shippingfee",
      //   field: "shipping_fee",
      //   filter: true,
      //   resizable: true,
      //   width: 190,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.shipping_fee}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "status",
      //   field: "status",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.status}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "stock",
      //   field: "stock",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.stock}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "subtotal",
      //   field: "subtotal",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.subtotal}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "tags",
      //   field: "tags",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.tags}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "tax_rate",
      //   field: "tax_rate",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.tax_rate}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "Permitions",
      //   field: "permitions",
      //   filter: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <CustomInput
      //         type="switch"
      //         className="mr-1"
      //         id="primary"
      //         name="primary"
      //         inline
      //         onChange={this.handleSwitchChange}
      //       ></CustomInput>
      //     );
      //   },
      // },
    ],
  };
  handleSubmit = e => {
    // e.preventDefault();
    this.setState({ ViewBill: true });
  };
  handleBillDownload = data => {
    debugger;
    console.log("InvoiceData", data);
    this.setState({ PrintData: data });
    const toWords = new ToWords();
    let words = toWords.convert(Number(data.sub_total), { currency: true });
    console.log("check", words);
    this.setState({ wordsNumber: words });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    // console.log(pageparmission.role);
    let newparmisson = pageparmission?.role?.find(
      value => value?.pageName === "Bills"
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
    formdata.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig
      .post(`/getallcompleteorders`, formdata)
      .then(res => {
        console.log(res.data.data);
        let rowData = res.data.data;
        this.setState({ rowData });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(newparmisson?.permission.includes("View"));
    // console.log(newparmisson?.permission.includes("Create"));
    // console.log(newparmisson?.permission.includes("Edit"));
    // console.log(newparmisson?.permission.includes("Delete"));

    // const formdata = new FormData();
    // formdata.append("user_id", pageparmission?.Userinfo?.id);
    // formdata.append("role", pageparmission?.Userinfo?.role);
    // await axiosConfig.get(`/admin/getalldata`).then((response) => {
    //   let rowData = response.data.data;
    //   console.log(rowData);
    //   this.setState({ rowData });
    // });
  }
  async runthisfunction(id) {
    console.log(id);
    await axiosConfig.delete(`/admin/del_subcategory/${id}`).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val);
  };
  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  handlePrint = e => {
    e.preventDefault();
    window.print();
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
                  Bills List
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
            {/* <Row>
              <div class="h-screen bg-red-300 flex justify-center items-center">
                <Button
                  color="primary"
                  onClick={this.handlePrint}
                  // class="bg-yellow-200 text-yellow-900 py-2 px-4 rounded shadow hover:shadow-xl hover:bg-yellow-300 duration-300"
                >
                  Print This Page
                </Button>
              </div>
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
                          onChange={e => this.updateSearchQuery(e.target.value)}
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
                    {context => (
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}
        >
          <ModalHeader toggle={this.toggleModal}>Download Bill</ModalHeader>
          <ModalBody>
            {this.state.ViewBill && this.state.ViewBill ? (
              <>
                <div style={{ width: "100%" }} className="">
                  <InvoiceGenerator
                    PrintData={this.state.PrintData}
                    wordsNumber={this.state.wordsNumber}
                    sgst={this.state.sgst}
                    cgst={this.state.cgst}
                    deliveryCharges={this.state.deliveryCharges}
                    otherCharges={this.state.otherCharges}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "100%" }} className="">
                  <Form onSubmit={() => this.handleSubmit()}>
                    <Row>
                      <Col lg="6" className="mb-2">
                        <Label>SGST</Label>
                        <Input
                          required
                          type="number"
                          name="sgst"
                          placeholder="Enter SGST"
                          value={this.state.sgst}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="6" className="mb-2">
                        <Label>CGST</Label>
                        <Input
                          required
                          type="number"
                          name="cgst"
                          placeholder="Enter CGST"
                          value={this.state.cgst}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="6">
                        <Label>Other Charges</Label>
                        <Input
                          type="number"
                          name="otherCharges"
                          placeholder="Enter Other Charges"
                          value={this.state.otherCharges}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="6">
                        <Label>Delivery Charges</Label>
                        <Input
                          type="number"
                          name="deliveryCharges"
                          placeholder="Enter Delivery Charges"
                          value={this.state.deliveryCharges}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="3" className="mt-2">
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </>
            )}
          </ModalBody>
        </Modal>
      </Row>
    );
  }
}
export default Bills;
