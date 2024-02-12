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
import { Eye, Trash2, ChevronDown, Edit, CloudLightning } from "react-feather";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { Route, Link } from "react-router-dom";
import InvoicGenerator from "../subcategory/InvoiceRegenarator";
import swal from "sweetalert";

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
const AddedBill = [];
const AllProduct = [];
class inVoiceRegenerator extends React.Component {
  state = {
    rowData: [],
    AllbillMerged: [],
    rowData: [],
    modal: false,
    Applied_Charges: {},
    paginationPageSize: 20,
    currenPageSize: "",
    Mergebilllength: "",
    sgst: "",
    discount: "",
    ViewBill: false,
    wordsNumber: "",
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
      // {
      //   headerName: "Multi Selection",
      //   width: 180,
      //   filter: true,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center justify-content-center cursor-pointer">
      //         <div>
      //           <span>
      //             <input
      //               type="checkbox"
      //               className="customcheckbox"
      //               onClick={(e) => {
      //                 this.handleMultipleBillsAdd(
      //                   params?.data,
      //                   e.target.checked
      //                 );
      //                 // console.log(e.target.checked);
      //               }}
      //             />
      //             {/* <AiOutlineDownload
      //               onClick={() => this.handleBillDownload(params.data)}
      //               fill="green"
      //               size="30px"
      //             /> */}
      //           </span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Status",
      //   field: "order_status",
      //   filter: true,
      //   width: 160,
      //   cellRendererFramework: (params) => {
      //     return params.data?.order_status === "Completed" ? (
      //       <div className="badge badge-pill badge-success">Completed</div>
      //     ) : params.data?.order_status === "Pending" ? (
      //       <div className="badge badge-pill badge-warning">
      //         {params.data?.order_status}
      //       </div>
      //     ) : params.data?.order_status === "Inprogress" ? (
      //       <div className="badge badge-pill bg-primary">Inprogress</div>
      //     ) : params.data?.order_status === "canceled" ? (
      //       <div className="badge badge-pill bg-danger">
      //         {params.data.order_status}
      //       </div>
      //     ) : params.data?.order_status === "Completed" ? (
      //       <div className="badge badge-pill bg-success">Completed</div>
      //     ) : null;
      //   },
      // },
      {
        headerName: "order_ids",
        field: "order_ids",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          // console.log(params.data?.order_ids);

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
                <span>{params?.data?.order_ids}</span>
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
        cellRendererFramework: (params) => {
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
        headerName: "created_date",
        field: "created_date",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center justify-content-center cursor-pointer">
              <div>
                <span>
                  {params?.data?.created_date}
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
      {
        headerName: "suppliername",
        field: "supplier_name",
        filter: true,
        resizable: true,
        width: 210,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                {params.data?.orders != null ? (
                  <>
                    <span>{params.data?.orders[0]?.supplier_name}</span>
                  </>
                ) : null}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "CGST",
        field: "totcgst",
        filter: true,
        resizable: true,
        width: 210,
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
        width: 210,
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
      {
        headerName: "discount_value",
        field: "discount_value",
        filter: true,
        resizable: true,
        width: 210,
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
        headerName: "other_charges",
        field: "other_charges",
        filter: true,
        resizable: true,
        width: 210,
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
        width: 210,
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
        headerName: "Subtotal",
        field: "subtotal",
        filter: true,
        resizable: true,
        width: 210,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <Badge color="success">{params.data?.subtotal}</Badge>
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
        width: 210,
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
        cellRendererFramework: (params) => {
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
                        history.push({
                          pathname: "/app/freshlist/order/ViewoneInvoiceRegen",
                          state: params?.data,
                        })
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

      // {
      //   headerName: "total",
      //   field: "total",
      //   filter: true,
      //   resizable: true,
      //   width: 160,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.total}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
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
      // {
      //   headerName: "order Creation date",
      //   field: "order_date",
      //   filter: true,
      //   resizable: true,
      //   width: 230,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data?.order_date}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
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
  // handleMultipleBillsAdd = (data, check) => {
  //   this.setState({ PrintData: data });

  //   let pageparmission = JSON.parse(localStorage.getItem("userData"));
  //   if (check) {
  //     AddedBill.push({
  //       order_id: data?.order_id,
  //       user_id: pageparmission?.Userinfo?.id,
  //       role: pageparmission?.Userinfo?.role,
  //     });
  //   } else {
  //     let index = AddedBill.findIndex(
  //       (ele) => ele?.order_id === data?.order_id
  //     );
  //     AddedBill.splice(index, 1);
  //   }
  //   this.setState({ Mergebilllength: AddedBill?.length });
  // };
  MergeBillNow = (e) => {
    e.preventDefault();
    // let ids = AddedBill.map((ele) => {
    //   const formdata = new FormData();
    //   formdata.append("order_id", ele?.order_id);
    //   axiosConfig
    //     .post(`/order_detail`, formdata)
    //     .then((response) => {
    //       console.log(response.data.data.flat());
    //       AllProduct.push(response.data.data.flat());
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });

    this.toggleModal();
  };
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.sgst && this.state.cgst) {
      let pageparmission = JSON.parse(localStorage.getItem("userData"));
      let formdata = new FormData();

      formdata.append("user_id", pageparmission?.Userinfo?.id);
      formdata.append("order_id", JSON.stringify(AddedBill));
      formdata.append("role", pageparmission?.Userinfo?.role);
      formdata.append("sgst", this.state.sgst);
      formdata.append("cgst", this.state.cgst);
      formdata.append("discount_value", this.state.discount);
      formdata.append("delivery_charges", this.state.deliveryCharges);
      formdata.append("other_charges", this.state.otherCharges);

      axiosConfig
        .post(`/createmergebillapi`, formdata)
        .then((res) => {
          console.log(res.data?.data?.applied_charges);
          this.setState({ Applied_Charges: res.data?.data?.applied_charges });
          // console.log(res.data.data?.items);
          // this.setState({ AllbillMerged: res.data.data?.items });
          // this.setState({ ViewBill: true });

          // this.setState({ PrintData: res.data });
          const toWords = new ToWords();
          let words = toWords.convert(
            Number(res.data?.data?.applied_charges?.grandtotal),
            {
              currency: true,
            }
          );
          this.setState({ wordsNumber: words });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("Enter Values in field");
    }
  };

  handleBillDownload = (data) => {
    // console.log(data);
    this.setState({ PrintData: data?.orders[0] });
    this.setState({ AllbillMerged: data.allproducts });
    this.setState({ Applied_Charges: data });

    const toWords = new ToWords();
    let words = toWords.convert(Number(data.grandtotal), { currency: true });
    this.setState({ wordsNumber: words });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    // console.log(pageparmission.role);
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "invoice Re-Generator"
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

    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    // formdata.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig
      .post(`/getAllGenerateInvoiceView`, formdata)
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
                  Re-Generator invoice
                </h1>
              </Col>
              {this.state.Mergebilllength > 1 ? (
                <Col>
                  <Button
                    // style={{ marginRight: "-22rem" }}
                    className=" btn btn-danger float-right"
                    // onClick={() =>
                    // history.push("/app/freshlist/subcategory/SubCategoryList")
                    // }
                    onClick={this.MergeBillNow}
                  >
                    Merge Bill
                  </Button>
                </Col>
              ) : null}
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}
        >
          <ModalHeader toggle={this.toggleModal}>Download Bill</ModalHeader>
          <ModalBody>
            <div style={{ width: "100%" }} className="">
              <InvoicGenerator
                PrintData={this.state.PrintData}
                Applied_Charges={this.state.Applied_Charges}
                AllbillMerged={this.state.AllbillMerged}
                wordsNumber={this.state.wordsNumber}
                sgst={this.state.sgst}
                cgst={this.state.cgst}
                deliveryCharges={this.state.deliveryCharges}
                otherCharges={this.state.otherCharges}
                discount={this.state.discount}
                AddedBill={AddedBill}
              />
            </div>
            {/* {this.state.ViewBill && this.state.ViewBill ? (
              <>
               
              </>
            ) : (
              <>
                <div style={{ width: "100%" }} className="">
                  <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Row className="main div heading px-3 py-3">
                      <Col lg="6" className="mb-2">
                        <Label>SGST</Label>
                        <select
                          required
                          className="form-control"
                          value={this.state.sgst}
                          onChange={this.changeHandler}
                          name="sgst"
                        >
                          <option value="not selected">--Select--</option>
                          <option value="5">5%</option>
                          <option value="9">9%</option>
                          <option value="12">12%</option>
                        </select>
                      </Col>
                      <Col lg="6" className="mb-2">
                        <Label>CGST</Label>
                        <select
                          required
                          className="form-control"
                          name="cgst"
                          placeholder="Enter CGST"
                          value={this.state.cgst}
                          onChange={this.changeHandler}
                        >
                          <option value="not selected">--Select--</option>
                          <option value="5">5%</option>
                          <option value="9">9%</option>
                          <option value="12">12%</option>
                        </select>
                      </Col>
                      <Col lg="6">
                        <Label className="mt-2">Other Charges</Label>
                        <Input
                          type="number"
                          name="otherCharges"
                          placeholder="Enter Other Charges"
                          value={this.state.otherCharges}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="6">
                        <Label className="mt-2">Delivery Charges</Label>
                        <Input
                          type="number"
                          name="deliveryCharges"
                          placeholder="Enter Delivery Charges"
                          value={this.state.deliveryCharges}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="6">
                        <Label className="mt-2">Discount </Label>
                        <Input
                          type="number"
                          name="discount"
                          placeholder="Enter discount value"
                          value={this.state.discount}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" className="mt-2 mb-2">
                        <div className="d-flex justify-content-center">
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </>
            )} */}
          </ModalBody>
        </Modal>
      </Row>
    );
  }
}
export default inVoiceRegenerator;
