import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

import axiosConfig from "../../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Trash2, ChevronDown, AtSign, Eye, UserPlus } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { FaWallet, Facart, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";
import "moment-timezone";
import { Route } from "react-router-dom";
import AssignClientCompoent from "./AssignClientCompoent";
import swal from "sweetalert";
import Multiselect from "multiselect-react-dropdown";
import AssignedCLientlist from "./AssignedCLientlist";

// class AssignToClient extends React.Component {
//   state = {
//     product: [],
//     rowData: [],
//     GetCategory: [],
//     Clientlist: [],
//     Brandlist: [],
//     Typelist: [],
//     ProductListData: [],
//     category_name: "",
//     Clientname: "",
//     Product: "",
//     showProduct: false,
//     Type: "",
//     assign_to_client: "",
//     Brand: "",
//     category: "",
//     Viewpermisson: null,
//     Editpermisson: null,
//     Createpermisson: null,
//     Deletepermisson: null,
//     paginationPageSize: 20,
//     currenPageSize: "",
//     getPageSize: "",
//     defaultColDef: {
//       sortable: true,
//       // editable: true,
//       // resizable: true,
//       suppressMenu: true,
//     },
//     columnDefs: [
//       {
//         headerName: "UID",
//         filter: true,

//         valueGetter: "node.rowIndex + 1",
//         field: "node.rowIndex + 1",
//         // checkboxSelection: true,
//         width: 150,
//       },

//       {
//         headerName: "PRODUCT Image",
//         field: "product",
//         filter: "agSetColumnFilter",
//         width: 150,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 {/* <span>{params.data?.title}</span> */}

//                 {params?.data?.product_images ? (
//                   <>
//                     <img
//                       style={{ borderRadius: "12px" }}
//                       width="60px"
//                       height="40px"
//                       src={params?.data?.product_images[0]}
//                       alt="image"
//                     />
//                   </>
//                 ) : (
//                   "NO Image"
//                 )}
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "PRODUCT",
//         field: "title",
//         filter: true,
//         width: 150,

//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.title}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "CATEGORY",
//         field: "category_name",
//         filter: "agSetColumnFilter",
//         width: 150,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.category_name}</span>
//                 {/* <span>vdfgvdfv</span> */}
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Description",
//         field: "description",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{ReactHtmlParser(params.data?.description)}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "PRICE",
//         field: "price",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.price}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "DiscountPrice",
//         field: "discountprice",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.discountprice}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Shipping Fee",
//         field: "shipping_fee",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.shipping_fee}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Tax Rate",
//         field: "tax_rate",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.tax_rate}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Tags",
//         field: "tags",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{params.data?.tags}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "STOCK",
//         field: "stock",

//         filter: "agSetColumnFilter",
//         width: 150,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>{ReactHtmlParser(params.data?.stock)}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Created ",
//         field: "created_date",
//         filter: "agSetColumnFilter",
//         width: 120,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div className="">
//                 <span>
//                   {ReactHtmlParser(params.data?.created_date?.split(" ")[0])}
//                 </span>
//               </div>
//             </div>
//           );
//         },
//       },
//       // {
//       //   headerName: "ASSIGN TO CLIENT",
//       //   field: "assigntoclient",
//       //   filter: "agSetColumnFilter",
//       //   width: 120,
//       //   cellRendererFramework: (params) => {
//       //     // console.log(params.data)
//       //     return (
//       //       <div className="d-flex align-items-center cursor-pointer">
//       //         <div className="">
//       //           <span>Demo</span>
//       //         </div>
//       //       </div>
//       //     );
//       //   },
//       // },
//       {
//         headerName: "Actions",
//         field: "transactions",
//         width: 150,
//         cellRendererFramework: (params) => {
//           return (
//             <div className="actions cursor-pointer">
//               {this.state.Editpermisson && (
//                 <Route
//                   render={({ history }) => (
//                     <UserPlus
//                       className="mr-50"
//                       color="green"
//                       size={20}
//                       onClick={() =>
//                         this.props.history.push({
//                           pathname: `/app/freshlist/house/AssignToClientlist`,
//                           state: params?.data,
//                         })
//                       }
//                     />
//                   )}
//                 />
//               )}
//               {this.state.Deletepermisson && (
//                 <Trash2
//                   className="mr-50"
//                   size="25px"
//                   color="Red"
//                   onClick={() => {
//                     let selectedData = this.gridApi.getSelectedRows();
//                     this.runthisfunction(params.data._id);
//                     this.gridApi.updateRowData({ remove: selectedData });
//                   }}
//                 />
//               )}
//             </div>
//           );
//         },
//       },
//     ],
//   };

//   async componentDidMount() {
//     let pageparmission = JSON.parse(localStorage.getItem("userData"));
//     let newparmisson = pageparmission?.role?.find(
//       (value) => value?.pageName === "Assign To Client"
//     );
//     this.setState({ Viewpermisson: newparmisson?.permission.includes("View") });
//     this.setState({
//       Createpermisson: newparmisson?.permission.includes("Create"),
//     });
//     this.setState({
//       Editpermisson: newparmisson?.permission.includes("Edit"),
//     });
//     this.setState({
//       Deletepermisson: newparmisson?.permission.includes("Delete"),
//     });
//     const formdata = new FormData();
//     formdata.append("user_id", pageparmission?.Userinfo?.id);
//     formdata.append("role", pageparmission?.Userinfo?.role);

//     await axiosConfig.post("/getbrand", formdata).then((response) => {
//       let Brandlist = response.data.data?.brands;

//       this.setState({ Brandlist });
//     });
//     await axiosConfig.post("/getclientlist", formdata).then((response) => {
//       let Clientlist = response.data.data;
//       console.log(Clientlist);
//       this.setState({ Clientlist });
//     });

//     await axiosConfig.post("/getcategory", formdata).then((response) => {
//       let GetCategory = response.data.data?.category;
//       console.log(GetCategory);
//       this.setState({ GetCategory });
//     });

//     await axiosConfig
//       .post("/productlistapi", formdata)
//       // .post("/productlistapi")
//       .then((response) => {
//         this.setState({ rowData: response.data.data });
//         // console.log(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axiosConfig
//       .post("/producttypelistview", formdata)
//       .then((response) => {
//         let Typelist = response.data.data;
//         // console.log(Typelist);
//         this.setState({ Typelist });
//       });

//     // await axiosConfig
//     //   .post("/productlistapi", formdata)
//     //   .then((response) => {
//     //     this.setState({ ProductListData: response.data.data });
//     //     console.log(response.data.data);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error.response);
//     //   });
//   }

//   async runthisfunction(id) {
//     console.log(id);
//     await axiosConfig.get(`/deltermcondition/${id}`).then((response) => {
//       console.log(response);
//     });
//   }
//   submitHandlerAssign = (e) => {
//     e.preventDefault();

//     let formdata = new FormData();
//     let pageparmission = JSON.parse(localStorage.getItem("userData"));
//     formdata.append("user_id", pageparmission?.Userinfo?.id);
//     formdata.append("category_id", this.state.category);
//     formdata.append("brand_id", this.state.Brand);
//     formdata.append("product_type_id", this.state.Type);
//     formdata.append("product_id", this.state.Product);
//     formdata.append("client_id", this.state.Clientname);
//     formdata.append("qty", this.state.quantity);

//     axiosConfig
//       .post(`/assign_to_client`, formdata)
//       .then((res) => {
//         console.log(res.data?.message);
//         if (res.data?.message) {
//           swal("Product Assigned Successfully");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   submitHandler = (e) => {
//     e.preventDefault();
//     let pageparmission = JSON.parse(localStorage.getItem("userData"));
//     const formdata = new FormData();
//     formdata.append("user_id", pageparmission?.Userinfo?.id);
//     formdata.append("role", pageparmission?.Userinfo?.role);
//     formdata.append("category_id", this.state.category);
//     formdata.append("brand_id", this.state.Brand);
//     formdata.append("product_type_id", this.state.Type);
//     if (this.state.category && this.state.Brand) {
//       axiosConfig
//         .post(`/getproducts`, formdata)
//         .then((res) => {
//           console.log(res.data.data);
//           this.setState({ showProduct: true });

//           this.setState({ ProductListData: res.data.data });
//         })
//         .catch((err) => {
//           console.log(err.response.data);
//           if (err.response.data.message) {
//             swal("No Product Found");
//           }
//         });
//     } else {
//       swal("Error", "Select Mandatory Fields");
//     }
//   };

//   onGridReady = (params) => {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;
//     this.setState({
//       currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
//       getPageSize: this.gridApi.paginationGetPageSize(),
//       totalPages: this.gridApi.paginationGetTotalPages(),
//     });
//   };

//   updateSearchQuery = (val) => {
//     this.gridApi.setQuickFilter(val);
//   };

//   filterSize = (val) => {
//     if (this.gridApi) {
//       this.gridApi.paginationSetPageSize(Number(val));
//       this.setState({
//         currenPageSize: val,
//         getPageSize: val,
//       });
//     }
//   };
//   render() {
//     const { rowData, columnDefs, defaultColDef } = this.state;
//     return (
//       <>
//         <Row className="app-user-list">
//           <Col sm="12"></Col>
//           <Col sm="12">
//             <Card>
//               {/* <Row className="pt-1 mx-1"></Row> */}
//               <Row className="m-2">
//                 <Col>
//                   <h1 col-sm-6 className="float-left">
//                     Product Assign To Client
//                   </h1>
//                 </Col>
//                 {/* <Col>
//                   <Route
//                     render={({ history }) => (
//                       <Button
//                         className="float-right"
//                         color="primary"
//                         onClick={() =>
//                           history.push("/app/freshlist/options/AssignToClient")
//                         }
//                       >
//                         Add Type
//                       </Button>
//                     )}
//                   />
//                 </Col> */}
//               </Row>
//               <Row>
//                 <Col>
//                   <Form className="m-1 container" onSubmit={this.submitHandler}>
//                     <Row className="mb-2">
//                       <Col lg="3" md="3">
//                         <FormGroup>
//                           <Label> Choose Category *</Label>

//                           <select
//                             onChange={(e) =>
//                               this.setState({ category: e.target.value })
//                             }
//                             className="form-control"
//                             name="Select"
//                             id="Select"
//                           >
//                             <option value="volvo">--Select Category--</option>
//                             {this.state.GetCategory &&
//                               this.state.GetCategory?.map((val, i) => (
//                                 <option key={i} value={val?.id}>
//                                   {val?.category_name}
//                                 </option>
//                               ))}
//                           </select>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="3" md="3">
//                         <FormGroup>
//                           <Label> Choose Type *</Label>

//                           <select
//                             onChange={(e) =>
//                               this.setState({ Type: e.target.value })
//                             }
//                             className="form-control"
//                             name="Select"
//                             id="Select"
//                           >
//                             <option value="volvo">--Select Type--</option>
//                             {this.state.Typelist &&
//                               this.state.Typelist?.map((val, i) => (
//                                 <option key={i} value={val?.id}>
//                                   {val?.product_type}
//                                 </option>
//                               ))}
//                           </select>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="3" md="3">
//                         <FormGroup>
//                           <Label> Choose Brand *</Label>

//                           <select
//                             required
//                             onChange={(e) =>
//                               this.setState({ Brand: e.target.value })
//                             }
//                             className="form-control"
//                             name="Select"
//                             id="Select"
//                           >
//                             <option value="volvo">--Select Brand--</option>
//                             {this.state.Brandlist &&
//                               this.state.Brandlist?.map((val, i) => (
//                                 <option key={i} value={val?.id}>
//                                   {val?.brand_name}
//                                 </option>
//                               ))}
//                           </select>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="3" md="3">
//                         <Button.Ripple
//                           color="primary"
//                           type="submit"
//                           className="mt-2"
//                         >
//                           Search
//                         </Button.Ripple>
//                       </Col>
//                     </Row>
//                   </Form>
//                   {/* <AssignClientCompoent /> */}
//                 </Col>
//               </Row>
//               {this.state.showProduct && (
//                 <div className="container">
//                   <Form className="m-1" onSubmit={this.submitHandlerAssign}>
//                     <Row className="mb-2">
//                       <Col lg="4" md="4" className="mb-1 ">
//                         <Label>Product List</Label>
//                         <Input
//                           required
//                           type="select"
//                           name="Product"
//                           placeholder="Enter Iden Type"
//                           value={this.state.Product}
//                           onChange={(e) =>
//                             this.setState({ Product: e.target.value })
//                           }
//                         >
//                           <option value="12ROW">--Selecte--</option>
//                           {this.state.ProductListData &&
//                             this.state.ProductListData?.map((val, i) => (
//                               <option key={i} value={val?.id}>
//                                 {val?.title}
//                               </option>
//                             ))}
//                         </Input>
//                       </Col>
//                       <Col lg="4" md="4" className="mb-1 ">
//                         <Label>Client List</Label>
//                         <Input
//                           required
//                           type="select"
//                           name="Clientname"
//                           placeholder="Enter Iden Type"
//                           value={this.state.Clientname}
//                           onChange={(e) =>
//                             this.setState({ Clientname: e.target.value })
//                           }
//                         >
//                           <option value="12ROW">--Selecte--</option>
//                           {this.state.Clientlist &&
//                             this.state.Clientlist?.map((val, i) => (
//                               <option key={i} value={val?.id}>
//                                 {val?.full_name}
//                               </option>
//                             ))}
//                         </Input>
//                       </Col>
//                       {/* <Col lg="4" md="4" className="mb-1 ">
//                         <Label>Quantity</Label>
//                         <Input
//                           required
//                           type="number"
//                           name="quantity"
//                           placeholder="Enter Quantity..."
//                           value={this.state.quantity}
//                           onChange={(e) =>
//                             this.setState({ quantity: e.target.value })
//                           }
//                         />
//                       </Col> */}
//                       <Col lg="4" md="4" className="mb-1 ">
//                         <Button.Ripple
//                           color="primary"
//                           type="submit"
//                           className="mr-1 mt-2 mb-1"
//                         >
//                           Assign To Client
//                         </Button.Ripple>
//                       </Col>
//                     </Row>
//                   </Form>
//                 </div>
//               )}

//               {/* <CardBody>
//                 {this.state.rowData === null ? null : (
//                   <div className="ag-theme-material w-100 my-2 ag-grid-table">
//                     <div className="d-flex flex-wrap justify-content-between align-items-center">
//                       <div className="mb-1">
//                         <UncontrolledDropdown className="p-1 ag-dropdown">
//                           <DropdownToggle tag="div">
//                             {this.gridApi
//                               ? this.state.currenPageSize
//                               : "" * this.state.getPageSize -
//                                 (this.state.getPageSize - 1)}{" "}
//                             -{" "}
//                             {this.state.rowData.length -
//                               this.state.currenPageSize *
//                                 this.state.getPageSize >
//                             0
//                               ? this.state.currenPageSize *
//                                 this.state.getPageSize
//                               : this.state.rowData.length}{" "}
//                             of {this.state.rowData.length}
//                             <ChevronDown className="ml-50" size={15} />
//                           </DropdownToggle>
//                           <DropdownMenu right>
//                             <DropdownItem
//                               tag="div"
//                               onClick={() => this.filterSize(20)}
//                             >
//                               20
//                             </DropdownItem>
//                             <DropdownItem
//                               tag="div"
//                               onClick={() => this.filterSize(50)}
//                             >
//                               50
//                             </DropdownItem>
//                             <DropdownItem
//                               tag="div"
//                               onClick={() => this.filterSize(100)}
//                             >
//                               100
//                             </DropdownItem>
//                             <DropdownItem
//                               tag="div"
//                               onClick={() => this.filterSize(134)}
//                             >
//                               134
//                             </DropdownItem>
//                           </DropdownMenu>
//                         </UncontrolledDropdown>
//                       </div>
//                       <div className="d-flex flex-wrap justify-content-between mb-1">
//                         <div className="table-input mr-1">
//                           <Input
//                             placeholder="search..."
//                             onChange={(e) =>
//                               this.updateSearchQuery(e.target.value)
//                             }
//                             value={this.state.value}
//                           />
//                         </div>
//                         <div className="export-btn">
//                           <Button.Ripple
//                             color="primary"
//                             onClick={() => this.gridApi.exportDataAsCsv()}
//                           >
//                             Export as CSV
//                           </Button.Ripple>
//                         </div>
//                       </div>
//                     </div>
//                     <ContextLayout.Consumer>
//                       {(context) => (
//                         <AgGridReact
//                           gridOptions={{}}
//                           rowSelection="multiple"
//                           defaultColDef={defaultColDef}
//                           columnDefs={columnDefs}
//                           rowData={rowData}
//                           onGridReady={this.onGridReady}
//                           colResizeDefault={"shift"}
//                           animateRows={true}
//                           floatingFilter={false}
//                           pagination={true}
//                           paginationPageSize={this.state.paginationPageSize}
//                           pivotPanelShow="always"
//                           enableRtl={context.state.direction === "rtl"}
//                         />
//                       )}
//                     </ContextLayout.Consumer>
//                   </div>
//                 )}
//               </CardBody> */}
//             </Card>
//           </Col>
//         </Row>
//       </>
//     );
//   }
// }
// import React from "react";

const AssignToClient = () => {
  const [product, setproduct] = useState([]);
  const [rowData, setrowData] = useState([]);
  const [GetCategory, setGetCategory] = useState([]);
  const [Clientlist, setClientlist] = useState([]);
  const [ProductListData, setProductListData] = useState([]);
  const [Brandlist, setBrandlist] = useState([]);
  const [Typelist, setTypelist] = useState([]);

  const [category_name, setcategory_name] = useState("");
  const [Clientname, setClientname] = useState("");
  const [Product, setProduct] = useState("");
  const [Type, setType] = useState("");
  const [assign_to_client, setassign_to_client] = useState("");
  const [Brand, setBrand] = useState("");
  const [category, setcategory] = useState("");
  const [Viewpermisson, setViewpermisson] = useState(null);
  const [Editpermisson, setEditpermisson] = useState(null);
  const [Createpermisson, setCreatepermisson] = useState(null);
  const [Deletepermisson, setDeletepermisson] = useState(null);
  const [showProduct, setshowProduct] = useState(false);

  useEffect(() => {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Assign To Client"
    );
    setViewpermisson(newparmisson?.permission.includes("View"));
    setCreatepermisson(newparmisson?.permission.includes("Create"));
    setEditpermisson(newparmisson?.permission.includes("Edit"));
    setDeletepermisson(newparmisson?.permission.includes("Delete"));

    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);

    axiosConfig
      .post(`/getproductlistapi`, formdata)
      .then((res) => {
        console.log(res.data.data);
        // setshowProduct(true);
        setProductListData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.message) {
          swal("No Product Found");
        }
      });
    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", pageparmission?.Userinfo?.role);

    // axiosConfig.post("/getbrand", data).then((response) => {
    //   let Brandlist = response.data.data?.brands;
    //   setBrandlist(Brandlist);
    // });
    axiosConfig.post("/getuserlistforassign", data).then((response) => {
      let Clientlist = response.data.data?.users;
      console.log(Clientlist);
      setClientlist(Clientlist);
    });

    // axiosConfig.post("/getcategory", formdata).then((response) => {
    //   let GetCategory = response.data.data?.category;
    //   console.log(GetCategory);
    //   setGetCategory(GetCategory);
    // });

    // axiosConfig
    //   .post("/productlistapi", formdata)
    //   // .post("/productlistapi")
    //   .then((response) => {
    //     // setrowData(response.data.data);
    //     // console.log(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axiosConfig.post("/producttypelistview", formdata).then((response) => {
    //   let Typelist = response.data.data;
    //   setTypelist(Typelist);
    //   // console.log(Typelist);
    // });
  }, []);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  // };
  const submitHandlerAssign = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);
    // formdata.append("category_id", category);
    // formdata.append("brand_id", Brand);
    // formdata.append("product_type_id", Type);
    formdata.append("product_id", JSON.stringify(Product));
    formdata.append("assign_user_id", Clientname);
    // formdata.append("qty", quantity);

    axiosConfig
      .post(`/assign_to_client`, formdata)
      .then((res) => {
        console.log(res.data);
        if (res.data?.success) {
          swal("Product Assigned Successfully");
          setProduct("");
          setClientname("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSelect = (selectedList, selectedItem) => {
    // setProduct(e.target.value)
    setProduct(selectedList);
    console.log(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
    setProduct(selectedList);
  };
  console.log(Product);
  return (
    <div>
      <>
        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 className="float-left">Product Assign To Client(User)</h1>
                </Col>
                {/* <Col>
                  <Route
                    render={({ history }) => (
                      <Button
                        className="float-right"
                        color="primary"
                        onClick={() =>
                          history.push(
                            "/app/freshlist/house/AssignToClientlist"
                          )
                        }
                      >
                        Assigned List
                      </Button>
                    )}
                  />
                </Col> */}
              </Row>

              <div className="container">
                <Form className="m-1" onSubmit={(e) => submitHandlerAssign(e)}>
                  <Row className="mb-2">
                    <Col lg="4" md="4" className="mb-1 ">
                      <Label>Product List</Label>

                      <Multiselect
                        // className="form-control"
                        options={ProductListData} // Options to display in the dropdown
                        // selectedValues={selectedValue} // Preselected value to persist in dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                        displayValue="title" // Property name to display in the dropdown options
                      />

                      {/* <Input
                        required
                        type="select"
                        name="Product"
                        placeholder="Enter Iden Type"
                        value={Product}
                        onChange={(e) => setProduct(e.target.value)}
                      >
                        <option value="12ROW">--Selecte--</option>
                        {ProductListData &&
                          ProductListData?.map((val, i) => (
                            <option key={i} value={val?.id}>
                              {val?.title}
                            </option>
                          ))}
                      </Input> */}
                    </Col>
                    <Col lg="4" md="4" className="mb-1 ">
                      <Label>Client List</Label>
                      <Input
                        required
                        type="select"
                        name="Clientname"
                        placeholder="Enter Iden Type"
                        value={Clientname}
                        onChange={(e) => setClientname(e.target.value)}
                      >
                        <option value="12ROW">--Selecte--</option>
                        {Clientlist &&
                          Clientlist?.map((val, i) => (
                            <option key={i} value={val?.id}>
                              {val?.full_name}
                            </option>
                          ))}
                      </Input>
                    </Col>
                    {/* <Col lg="4" md="4" className="mb-1 ">
                        <Label>Quantity</Label>
                        <Input
                          required
                          type="number"
                          name="quantity"
                          placeholder="Enter Quantity..."
                          value={this.state.quantity}
                          onChange={(e) =>
                            this.setState({ quantity: e.target.value })
                          }
                        />
                      </Col> */}
                    <Col lg="4" md="4" className="mb-1 ">
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-2 mb-1"
                      >
                        Assign To Client
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <AssignedCLientlist />
          </Col>
        </Row>
      </>
    </div>
  );
};
export default AssignToClient;
