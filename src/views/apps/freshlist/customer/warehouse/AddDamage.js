// import React, { useRef } from "react";
// import { Route } from "react-router-dom";
// import xmlJs from "xml-js";
// import {
//   Card,
//   CardBody,
//   Input,
//   Row,
//   Modal,
//   Col,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   Button,
//   ModalHeader,
//   ModalBody,
//   Badge,
// } from "reactstrap";

// import { ContextLayout } from "../../../../../utility/context/Layout";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import EditAccount from "../../accounts/EditAccount";
// import ViewAccount from "../../accounts/ViewAccount";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import Logo from "../../../../../assets/img/profile/pages/logomain.png";
// import Papa from "papaparse";
// import { Eye, Trash2, ChevronDown, Edit } from "react-feather";
// import { IoMdRemoveCircleOutline } from "react-icons/io";
// import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
// import "../../../../../assets/scss/pages/users.scss";

// import {
//   FaArrowAltCircleLeft,
//   FaArrowAltCircleRight,
//   FaFilter,
//   FaPlus,
// } from "react-icons/fa";
// import moment from "moment-timezone";
// import swal from "sweetalert";
// import {
//   CreateAccountList,
//   CreateAccountView,
//   DeleteAccount,
//   Stock_trxFactorytoWList,
//   ViewFactoryStock,
//   View_Wareahouseid,
// } from "../../../../../ApiEndPoint/ApiCalling";
// import {
//   BsCloudDownloadFill,
//   BsFillArrowDownSquareFill,
//   BsFillArrowUpSquareFill,
// } from "react-icons/bs";
// import * as XLSX from "xlsx";
// import UserContext from "../../../../../context/Context";

// const SelectedColums = [];

// class AddDamage extends React.Component {
//   static contextType = UserContext;
//   constructor(props) {
//     super(props);
//     this.gridRef = React.createRef();
//     this.gridApi = null;
//     this.state = {
//       isOpen: false,
//       Arrindex: "",
//       rowData: [],
//       setMySelectedarr: [],
//       SelectedCols: [],
//       paginationPageSize: 5,
//       currenPageSize: "",
//       getPageSize: "",

//       columnDefs: [
//         {
//           headerName: "S.No",
//           valueGetter: "node.rowIndex + 1",
//           field: "node.rowIndex + 1",
//           width: 150,
//           filter: true,
//         },
//         {
//           headerName: "Product Title",
//           field: "productId.Product_Title",
//           filter: true,
//           width: 200,
//           cellRendererFramework: (params) => {
//             console.log(params?.data);
//             return (
//               <div>
//                 <span>{params.data?.productId.Product_Title}</span>
//               </div>
//             );
//           },
//         },
//         {
//           headerName: "Price",
//           field: "price",
//           filter: true,
//           width: 200,
//           cellRendererFramework: (params) => {
//             console.log(params);
//             return (
//               <div>
//                 <span>{params.data?.price}</span>
//               </div>
//             );
//           },
//         },

//         {
//           headerName: "UnitType",
//           field: "unitType",
//           filter: true,
//           width: 200,
//           cellRendererFramework: (params) => {
//             return (
//               <div>
//                 <span>{params.data?.unitType}</span>
//               </div>
//             );
//           },
//         },
//         {
//           headerName: "Current Stock",
//           field: "Size",
//           filter: true,
//           width: 200,
//           cellRendererFramework: (params) => {
//             return (
//               <div>
//                 <span>{params.data?.Size}</span>
//               </div>
//             );
//           },
//         },

//         // {
//         //   headerName: "Status",
//         //   field: "status",
//         //   filter: true,
//         //   width: 150,
//         //   cellRendererFramework: (params) => {
//         //     return params.data?.status === "transferring" ? (
//         //       <div className="badge badge-pill badge-success">
//         //         {params.data?.status}
//         //       </div>
//         //     ) : params.value === "false" ? (
//         //       <div className="badge badge-pill badge-warning">
//         //         {params.data?.status}
//         //       </div>
//         //     ) : null;
//         //   },
//         // },
//         // {
//         //   headerName: "Grand Total",
//         //   field: "grandTotal",
//         //   filter: true,
//         //   sortable: true,
//         //   cellRendererFramework: (params) => {
//         //     return (
//         //       <>
//         //         <div className="actions cursor-pointer">
//         //           <span>{params?.data?.grandTotal}</span>
//         //         </div>
//         //       </>
//         //     );
//         //   },
//         // },
//         // {
//         //   headerName: "Created date",
//         //   field: "createdAt",
//         //   filter: true,
//         //   sortable: true,
//         //   cellRendererFramework: (params) => {
//         //     return (
//         //       <>
//         //         <div className="actions cursor-pointer">
//         //           <span>{params?.data?.createdAt}</span>
//         //         </div>
//         //       </>
//         //     );
//         //   },
//         // },

//         {
//           headerName: "Actions",
//           field: "sortorder",
//           field: "transactions",
//           width: 150,
//           cellRendererFramework: (params) => {
//             return (
//               <div className="actions cursor-pointer">
//                 <Eye
//                   className="mr-50"
//                   size="25px"
//                   color="green"
//                   //   onClick={() =>
//                   //     history.push(
//                   //       `/app/freshlist/customer/viewCustomer/${params.data?._id}`
//                   //     )
//                   //   }
//                 />
//                 <Edit
//                   className="mr-50"
//                   size="25px"
//                   color="blue"
//                   //   onClick={() =>
//                   //     history.push(
//                   //       `/app/freshlist/customer/editCustomer/${params.data._id}`
//                   //     )
//                   //   }
//                 />
//                 <Trash2
//                   className="mr-50"
//                   size="25px"
//                   color="red"
//                   onClick={() => {
//                     let selectedData = this.gridApi.getSelectedRows();
//                     this.runthisfunction(params.data._id);
//                     this.gridApi.updateRowData({ remove: selectedData });
//                   }}
//                 />
//               </div>
//             );
//           },
//         },
//       ],
//       AllcolumnDefs: [],
//       SelectedcolumnDefs: [],
//       defaultColDef: {
//         sortable: true,
//         enablePivot: true,
//         enableValue: true,
//         resizable: true,
//         suppressMenu: true,
//       },
//     };
//   }

//   LookupviewStart = () => {
//     this.setState((prevState) => ({
//       modal: !prevState.modal,
//     }));
//   };

//   handleChangeEdit = (data, types) => {
//     let type = types;
//     if (type == "readonly") {
//       this.setState({ ViewOneUserView: true });
//       this.setState({ ViewOneData: data });
//     } else {
//       this.setState({ EditOneUserView: true });
//       this.setState({ EditOneData: data });
//     }
//   };

//   async componentDidMount() {
//     const UserInformation = this.context?.UserInformatio;
//     let pageparmission = JSON.parse(localStorage.getItem("userData"));
//     let userid = pageparmission?._id;
//     await View_Wareahouseid(userid)
//       .then((res) => {
//         console.log(res?.User);
//         if (res?.User?.productItems) {
//           this.setState({ rowData: res?.User?.productItems });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // await ViewFactoryStock()
//     //   .then((res) => {
//     //     debugger;
//     //     console.log(res?.Factory);
//     //     this.setState({ rowData: res?.Factory });
//     //     this.setState({ AllcolumnDefs: this.state.columnDefs });

//     //     let userHeading = JSON.parse(localStorage.getItem("FactoryStock"));
//     //     if (userHeading?.length) {
//     //       this.setState({ columnDefs: userHeading });
//     //       this.gridApi.setColumnDefs(userHeading);
//     //       this.setState({ SelectedcolumnDefs: userHeading });
//     //     } else {
//     //       this.setState({ columnDefs: this.state.columnDefs });
//     //       this.setState({ SelectedcolumnDefs: this.state.columnDefs });
//     //     }
//     //     this.setState({ SelectedCols: this.state.columnDefs });
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//     // Stock_trxFactorytoWList(userid)
//     //   .then((res) => {
//     //     console.log(res);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   }

//   toggleDropdown = () => {
//     this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
//   };

//   runthisfunction(id) {
//     swal("Warning", "Sure You Want to Delete it", {
//       buttons: {
//         cancel: "cancel",
//         catch: { text: "Delete ", value: "delete" },
//       },
//     }).then((value) => {
//       switch (value) {
//         case "delete":
//           DeleteAccount(id)
//             .then((res) => {
//               let selectedData = this.gridApi.getSelectedRows();
//               this.gridApi.updateRowData({ remove: selectedData });
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//           break;
//         default:
//       }
//     });
//   }

//   onGridReady = (params) => {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;
//     this.gridRef.current = params.api;

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
//   handleChangeHeader = (e, value, index) => {
//     let check = e.target.checked;
//     if (check) {
//       SelectedColums?.push(value);
//     } else {
//       const delindex = SelectedColums?.findIndex(
//         (ele) => ele?.headerName === value?.headerName
//       );

//       SelectedColums?.splice(delindex, 1);
//     }
//   };
//   parseCsv(csvData) {
//     return new Promise((resolve, reject) => {
//       Papa.parse(csvData, {
//         header: true,
//         skipEmptyLines: true,
//         complete: (result) => {
//           if (result.data && result.data.length > 0) {
//             resolve(result.data);
//           } else {
//             reject(new Error("No data found in the CSV"));
//           }
//         },
//         error: (error) => {
//           reject(error);
//         },
//       });
//     });
//   }
//   generatePDF(parsedData) {
//     let pdfsize = [Object.keys(parsedData[0])][0].length;
//     let size = pdfsize > 15 ? "a1" : pdfsize < 14 > 10 ? "a3" : "a4";

//     const doc = new jsPDF("landscape", "mm", size, false);
//     doc.setTextColor(5, 87, 97);
//     const tableData = parsedData.map((row) => Object.values(row));
//     doc.addImage(Logo, "JPEG", 10, 10, 50, 30);
//     let date = new Date();
//     doc.setCreationDate(date);
//     doc.text("UserAccount", 14, 51);
//     doc.autoTable({
//       head: [Object.keys(parsedData[0])],
//       body: tableData,
//       startY: 60,
//     });

//     doc.save("UserList.pdf");
//   }

//   exportToPDF = async () => {
//     const csvData = this.gridApi.getDataAsCsv({
//       processCellCallback: this.processCell,
//     });
//     try {
//       const parsedData = await this.parseCsv(csvData);
//       this.generatePDF(parsedData);
//     } catch (error) {
//       console.error("Error parsing CSV:", error);
//     }
//   };
//   processCell = (params) => {
//     // console.log(params);
//     // Customize cell content as needed
//     return params.value;
//   };

//   convertCsvToExcel(csvData) {
//     return new Promise((resolve) => {
//       Papa.parse(csvData, {
//         header: true,
//         dynamicTyping: true,
//         skipEmptyLines: true,
//         complete: function (result) {
//           const worksheet = XLSX.utils.json_to_sheet(result.data);
//           const workbook = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//           const excelBuffer = XLSX.write(workbook, {
//             bookType: "xlsx",
//             type: "array",
//           });
//           const blob = new Blob([excelBuffer], {
//             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//           });
//           resolve(blob);
//         },
//       });
//     });
//   }
//   downloadExcelFile(blob) {
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Userlist.xlsx";
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }

//   exportToExcel = async (e) => {
//     const CsvData = this.gridApi.getDataAsCsv({
//       processCellCallback: this.processCell,
//     });
//     const blob = await this.convertCsvToExcel(CsvData);
//     this.downloadExcelFile(blob);
//   };

//   convertCSVtoExcel = () => {
//     const CsvData = this.gridApi.getDataAsCsv({
//       processCellCallback: this.processCell,
//     });
//     Papa.parse(CsvData, {
//       complete: (result) => {
//         const ws = XLSX.utils.json_to_sheet(result.data);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//         const excelType = "xls";
//         XLSX.writeFile(wb, `UserList.${excelType}`);
//       },
//     });
//   };

//   shiftElementUp = () => {
//     let currentIndex = this.state.Arrindex;
//     if (currentIndex > 0) {
//       const myArrayCopy = [...this.state.SelectedcolumnDefs];
//       const elementToMove = myArrayCopy.splice(currentIndex, 1)[0];
//       this.setState({ Arrindex: currentIndex - 1 });
//       myArrayCopy.splice(currentIndex - 1, 0, elementToMove);
//       this.setState({ SelectedcolumnDefs: myArrayCopy });
//     }
//   };

//   shiftElementDown = () => {
//     let currentIndex = this.state.Arrindex;
//     if (currentIndex < this.state.SelectedcolumnDefs.length - 1) {
//       const myArrayCopy = [...this.state.SelectedcolumnDefs];
//       const elementToMove = myArrayCopy.splice(currentIndex, 1)[0];
//       this.setState({ Arrindex: currentIndex + 1 });
//       myArrayCopy.splice(currentIndex + 1, 0, elementToMove);
//       this.setState({ SelectedcolumnDefs: myArrayCopy });
//     }
//   };
//   convertCsvToXml = () => {
//     const CsvData = this.gridApi.getDataAsCsv({
//       processCellCallback: this.processCell,
//     });
//     Papa.parse(CsvData, {
//       complete: (result) => {
//         const rows = result.data;

//         // Create XML
//         let xmlString = "<root>\n";

//         rows.forEach((row) => {
//           xmlString += "  <row>\n";
//           row.forEach((cell, index) => {
//             xmlString += `    <field${index + 1}>${cell}</field${index + 1}>\n`;
//           });
//           xmlString += "  </row>\n";
//         });

//         xmlString += "</root>";

//         // setXmlData(xmlString);

//         // Create a download link
//         const blob = new Blob([xmlString], { type: "text/xml" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = "output.xml";
//         link.click();
//       },
//     });
//   };

//   HandleSetVisibleField = (e) => {
//     e.preventDefault();
//     this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
//     this.setState({ columnDefs: this.state.SelectedcolumnDefs });
//     this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
//     this.setState({ rowData: this.state.rowData });
//     localStorage.setItem(
//       "FactoryStock",
//       JSON.stringify(this.state.SelectedcolumnDefs)
//     );
//     this.LookupviewStart();
//   };

//   HeadingRightShift = () => {
//     const updatedSelectedColumnDefs = [
//       ...new Set([
//         ...this.state.SelectedcolumnDefs.map((item) => JSON.stringify(item)),
//         ...SelectedColums.map((item) => JSON.stringify(item)),
//       ]),
//     ].map((item) => JSON.parse(item));
//     this.setState({
//       SelectedcolumnDefs: [...new Set(updatedSelectedColumnDefs)], // Update the state with the combined array
//     });
//   };
//   handleLeftShift = () => {
//     let SelectedCols = this.state.SelectedcolumnDefs.slice();
//     let delindex = this.state.Arrindex; /* Your delete index here */

//     if (SelectedCols && delindex >= 0) {
//       const splicedElement = SelectedCols.splice(delindex, 1); // Remove the element

//       this.setState({
//         SelectedcolumnDefs: SelectedCols, // Update the state with the modified array
//       });
//     }
//   };
//   render() {
//     const {
//       rowData,
//       columnDefs,
//       defaultColDef,
//       SelectedcolumnDefs,
//       isOpen,
//       SelectedCols,
//       AllcolumnDefs,
//     } = this.state;
//     return (
//       <>
//         {/* <ExcelReader /> */}
//         <Row className="app-user-list">
//           {this.state.EditOneUserView && this.state.EditOneUserView ? (
//             <Row className="card">
//               <Col>
//                 <div className="d-flex justify-content-end p-1">
//                   <Button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       this.setState({ EditOneUserView: false });
//                       this.componentDidMount();
//                     }}
//                     color="danger">
//                     Back
//                   </Button>
//                 </div>
//               </Col>

//               <EditAccount EditOneData={this.state.EditOneData} />
//             </Row>
//           ) : (
//             <>
//               {this.state.ViewOneUserView && this.state.ViewOneUserView ? (
//                 <>
//                   <Row className="card">
//                     <Col>
//                       <h1 className="float-left">Stock Trx</h1>
//                     </Col>
//                     <Col>
//                       <div className="d-flex justify-content-end p-1">
//                         <Button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             this.setState({ ViewOneUserView: false });
//                           }}
//                           color="danger">
//                           Back
//                         </Button>
//                       </div>
//                     </Col>
//                     <ViewAccount ViewOneData={this.state.ViewOneData} />
//                   </Row>
//                 </>
//               ) : (
//                 <>
//                   <Col sm="12">
//                     <Card>
//                       <Row className="m-2">
//                         <Col>
//                           <h1 className="float-left">My Stock List</h1>
//                         </Col>
//                         <Col>
//                           <span className="mx-1">
//                             <FaFilter
//                               style={{ cursor: "pointer" }}
//                               title="filter coloumn"
//                               size="25px"
//                               onClick={this.LookupviewStart}
//                               color="#39cccc"
//                               className="float-right"
//                             />
//                           </span>
//                           <span className="mx-1">
//                             <div className="dropdown-container float-right">
//                               <BsCloudDownloadFill
//                                 style={{ cursor: "pointer" }}
//                                 title="download file"
//                                 size="25px"
//                                 className="dropdown-button "
//                                 color="#39cccc"
//                                 onClick={this.toggleDropdown}
//                               />
//                               {isOpen && (
//                                 <div
//                                   style={{
//                                     position: "absolute",
//                                     zIndex: "1",
//                                   }}
//                                   className="dropdown-content dropdownmy">
//                                   <h5
//                                     onClick={() => this.exportToPDF()}
//                                     style={{ cursor: "pointer" }}
//                                     className=" mx-1 myactive mt-1">
//                                     .PDF
//                                   </h5>
//                                   <h5
//                                     onClick={() =>
//                                       this.gridApi.exportDataAsCsv()
//                                     }
//                                     style={{ cursor: "pointer" }}
//                                     className=" mx-1 myactive">
//                                     .CSV
//                                   </h5>
//                                   <h5
//                                     onClick={this.convertCSVtoExcel}
//                                     style={{ cursor: "pointer" }}
//                                     className=" mx-1 myactive">
//                                     .XLS
//                                   </h5>
//                                   <h5
//                                     onClick={this.exportToExcel}
//                                     style={{ cursor: "pointer" }}
//                                     className=" mx-1 myactive">
//                                     .XLSX
//                                   </h5>
//                                   <h5
//                                     onClick={() => this.convertCsvToXml()}
//                                     style={{ cursor: "pointer" }}
//                                     className=" mx-1 myactive">
//                                     .XML
//                                   </h5>
//                                 </div>
//                               )}
//                             </div>
//                           </span>
//                           <span>
//                             <Route
//                               render={({ history }) => (
//                                 <Badge
//                                   style={{ cursor: "pointer" }}
//                                   className="float-right mr-1"
//                                   color="primary"
//                                   onClick={() => history.goBack()}>
//                                   <FaPlus size={15} /> Back
//                                 </Badge>
//                               )}
//                             />
//                           </span>
//                         </Col>
//                       </Row>
//                       <CardBody>
//                         {this.state.rowData === null ? null : (
//                           <div className="ag-theme-material w-100 my-2 ag-grid-table">
//                             <div className="d-flex flex-wrap justify-content-between align-items-center">
//                               <div className="mb-1">
//                                 <UncontrolledDropdown className="p-1 ag-dropdown">
//                                   <DropdownToggle tag="div">
//                                     {this.gridApi
//                                       ? this.state.currenPageSize
//                                       : "" * this.state.getPageSize -
//                                         (this.state.getPageSize - 1)}{" "}
//                                     -{" "}
//                                     {this.state.rowData.length -
//                                       this.state.currenPageSize *
//                                         this.state.getPageSize >
//                                     0
//                                       ? this.state.currenPageSize *
//                                         this.state.getPageSize
//                                       : this.state.rowData.length}{" "}
//                                     of {this.state.rowData.length}
//                                     <ChevronDown className="ml-50" size={15} />
//                                   </DropdownToggle>
//                                   <DropdownMenu right>
//                                     <DropdownItem
//                                       tag="div"
//                                       onClick={() => this.filterSize(5)}>
//                                       5
//                                     </DropdownItem>
//                                     <DropdownItem
//                                       tag="div"
//                                       onClick={() => this.filterSize(20)}>
//                                       20
//                                     </DropdownItem>
//                                     <DropdownItem
//                                       tag="div"
//                                       onClick={() => this.filterSize(50)}>
//                                       50
//                                     </DropdownItem>
//                                     <DropdownItem
//                                       tag="div"
//                                       onClick={() => this.filterSize(100)}>
//                                       100
//                                     </DropdownItem>
//                                     <DropdownItem
//                                       tag="div"
//                                       onClick={() => this.filterSize(134)}>
//                                       134
//                                     </DropdownItem>
//                                   </DropdownMenu>
//                                 </UncontrolledDropdown>
//                               </div>
//                               <div className="d-flex flex-wrap justify-content-end mb-1">
//                                 <div className="table-input mr-1">
//                                   <Input
//                                     placeholder="search Item here..."
//                                     onChange={(e) =>
//                                       this.updateSearchQuery(e.target.value)
//                                     }
//                                     value={this.state.value}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                             <ContextLayout.Consumer className="ag-theme-alpine">
//                               {(context) => (
//                                 <AgGridReact
//                                   id="myAgGrid"
//                                   // gridOptions={{
//                                   //   domLayout: "autoHeight",
//                                   //   // or other layout options
//                                   // }}
//                                   gridOptions={this.gridOptions}
//                                   rowSelection="multiple"
//                                   defaultColDef={defaultColDef}
//                                   columnDefs={columnDefs}
//                                   rowData={rowData}
//                                   // onGridReady={(params) => {
//                                   //   this.gridApi = params.api;
//                                   //   this.gridColumnApi = params.columnApi;
//                                   //   this.gridRef.current = params.api;

//                                   //   this.setState({
//                                   //     currenPageSize:
//                                   //       this.gridApi.paginationGetCurrentPage() +
//                                   //       1,
//                                   //     getPageSize:
//                                   //       this.gridApi.paginationGetPageSize(),
//                                   //     totalPages:
//                                   //       this.gridApi.paginationGetTotalPages(),
//                                   //   });
//                                   // }}
//                                   onGridReady={this.onGridReady}
//                                   colResizeDefault={"shift"}
//                                   animateRows={true}
//                                   floatingFilter={false}
//                                   pagination={true}
//                                   paginationPageSize={
//                                     this.state.paginationPageSize
//                                   }
//                                   pivotPanelShow="always"
//                                   enableRtl={context.state.direction === "rtl"}
//                                   ref={this.gridRef} // Attach the ref to the grid
//                                   domLayout="autoHeight" // Adjust layout as needed
//                                 />
//                               )}
//                             </ContextLayout.Consumer>
//                           </div>
//                         )}
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 </>
//               )}
//             </>
//           )}
//         </Row>

//         <Modal
//           isOpen={this.state.modal}
//           toggle={this.LookupviewStart}
//           className={this.props.className}
//           style={{ maxWidth: "1050px" }}>
//           <ModalHeader toggle={this.LookupviewStart}>Change Fileds</ModalHeader>
//           <ModalBody className="modalbodyhead">
//             <Row>
//               <Col lg="4" md="4" sm="12" xl="4" xs="12">
//                 <h4>Avilable Columns</h4>
//                 <div className="mainshffling">
//                   <div class="ex1">
//                     {AllcolumnDefs &&
//                       AllcolumnDefs?.map((ele, i) => {
//                         return (
//                           <>
//                             <div
//                               onClick={(e) =>
//                                 this.handleChangeHeader(e, ele, i)
//                               }
//                               key={i}
//                               className="mycustomtag mt-1">
//                               <span className="mt-1">
//                                 <h5
//                                   style={{ cursor: "pointer" }}
//                                   className="allfields">
//                                   <input
//                                     type="checkbox"
//                                     // checked={check && check}
//                                     className="mx-1"
//                                   />

//                                   {ele?.headerName}
//                                 </h5>
//                               </span>
//                             </div>
//                           </>
//                         );
//                       })}
//                   </div>
//                 </div>
//               </Col>
//               <Col lg="2" md="2" sm="12" xl="2" xs="12" className="colarrowbtn">
//                 <div className="mainarrowbtn">
//                   <div style={{ cursor: "pointer" }}>
//                     <FaArrowAltCircleRight
//                       onClick={this.HeadingRightShift}
//                       className="arrowassign"
//                       size="30px"
//                     />
//                   </div>
//                   <div style={{ cursor: "pointer" }} className="my-2">
//                     <FaArrowAltCircleLeft
//                       onClick={this.handleLeftShift}
//                       className="arrowassign"
//                       size="30px"
//                     />
//                   </div>
//                 </div>
//               </Col>
//               <Col lg="6" md="6" sm="12" xl="6" xs="12">
//                 <Row>
//                   <Col lg="8" md="8" sm="12" xs="12">
//                     <h4>Visible Columns</h4>
//                     <div className="mainshffling">
//                       <div class="ex1">
//                         {SelectedcolumnDefs &&
//                           SelectedcolumnDefs?.map((ele, i) => {
//                             return (
//                               <>
//                                 <div key={i} className="mycustomtag mt-1">
//                                   <span className="mt-1">
//                                     <h5
//                                       onClick={() =>
//                                         this.setState({ Arrindex: i })
//                                       }
//                                       style={{
//                                         cursor: "pointer",
//                                         backgroundColor: `${
//                                           this.state.Arrindex === i
//                                             ? "#1877f2"
//                                             : ""
//                                         }`,
//                                       }}
//                                       className="allfields">
//                                       <IoMdRemoveCircleOutline
//                                         onClick={() => {
//                                           const SelectedCols =
//                                             this.state.SelectedcolumnDefs.slice();
//                                           const delindex =
//                                             SelectedCols.findIndex(
//                                               (element) =>
//                                                 element?.headerName ==
//                                                 ele?.headerName
//                                             );

//                                           if (SelectedCols && delindex >= 0) {
//                                             const splicedElement =
//                                               SelectedCols.splice(delindex, 1); // Remove the element
//                                             // splicedElement contains the removed element, if needed

//                                             this.setState({
//                                               SelectedcolumnDefs: SelectedCols, // Update the state with the modified array
//                                             });
//                                           }
//                                           // const delindex =
//                                           //   SelectedCols.findIndex(
//                                           //     (element) =>
//                                           //       element?.headerName ==
//                                           //       ele?.headerName
//                                           //   );

//                                           // SelectedCols?.splice(delindex, 1);
//                                           // this.setState({
//                                           //   SelectedcolumnDefs: SelectedCols,
//                                           // });
//                                         }}
//                                         style={{ cursor: "pointer" }}
//                                         size="25px"
//                                         color="red"
//                                         className="mr-1"
//                                       />

//                                       {ele?.headerName}
//                                     </h5>
//                                   </span>
//                                 </div>
//                               </>
//                             );
//                           })}
//                       </div>
//                     </div>
//                   </Col>
//                   <Col lg="4" md="4" sm="12" xs="12">
//                     <div className="updownbtn justify-content-center">
//                       <div>
//                         <BsFillArrowUpSquareFill
//                           className="arrowassign mb-1"
//                           size="30px"
//                           onClick={this.shiftElementUp}
//                         />
//                       </div>
//                       <div>
//                         <BsFillArrowDownSquareFill
//                           onClick={this.shiftElementDown}
//                           className="arrowassign"
//                           size="30px"
//                         />
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <div className="d-flex justify-content-center">
//                   <Button onClick={this.HandleSetVisibleField} color="primary">
//                     Submit
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </ModalBody>
//         </Modal>
//       </>
//     );
//   }
// }
// export default AddDamage;

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
  ModalBody,
  ModalHeader,
  Modal,
  InputGroup,
  Badge,
} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BiEnvelope } from "react-icons/bi";
import { BsFillChatDotsFill, BsWhatsapp } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FcPhoneAndroid } from "react-icons/fc";
import { AiOutlineSearch } from "react-icons/ai";
import Flatpickr from "react-flatpickr";

import Multiselect from "multiselect-react-dropdown";

import { FiSend } from "react-icons/fi";

import "../../../../../assets/scss/pages/users.scss";
import {
  ProductListView,
  CreatePartyList,
  Create_Sales_personList,
  Create_Targetsave,
  CreateWarehouseList,
  UnitListView,
  StocktrxFtoW,
  WarehousetoWareHouseTrx,
  Warehouse_Temporarlylist,
  Save_Damagedstock,
  CreateAccountList,
} from "../../../../../ApiEndPoint/ApiCalling";
import "../../../../../assets/scss/pages/users.scss";
import Timepickers from "../../../../forms/form-elements/datepicker/Timepicker";
import Pickers from "../../../../forms/form-elements/datepicker/Pickers";
import { Route } from "react-router-dom";

let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
const CreateTarget = (args) => {
  const [formData, setFormData] = useState({});
  const [Index, setIndex] = useState("");
  const [StockTrxdate, setStockTrxDate] = useState("");
  const [targetEndDate, settargetEndDate] = useState("");
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [ProductWTWList, setProductWTWList] = useState([]);
  const [PartyList, setPartyList] = useState([]);
  const [Salesperson, setSalesperson] = useState("");
  const [WareHouseone, setWareHouseone] = useState([]);
  const [WareHousetwo, setWareHousetwo] = useState([]);
  const [TypeOfTrx, setTypeOfTrx] = useState("");
  const [grandTotalAmt, setGrandTotalAmt] = useState(0);
  const [UnitList, setUnitList] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState("");
  const [audit, setAudit] = useState(false);
  const [WareHouselist, setWarehouseList] = useState([]);
  const toggle = (item) => {
    setItems(item);
    setModal(!modal);
  };
  const audittoggle = () => {
    setAudit(!audit);
    // setModal(!modal);
  };
  const handleopentoggle = (iteam) => {
    toggle(iteam);
  };
  const handleHistory = () => {
    audittoggle();
  };
  const [product, setProduct] = useState([
    {
      product: "",
      productId: "",
      Reason: "",
      Damaged_Percent: null,
      AvailaleQty: null,
      availableQty: "",
      transferQty: 1,
      price: "",
      totalprice: "",
      Size: "",
      unitType: "",
      stockTrxDate: "",
      targetEndDate: "",
      discount: "",
      Shipping: "",
      tax: "",
      grandTotal: "",
    },
  ]);

  const handleProductChangeProduct = (e, index, avalaibleSize) => {
    const { name, value } = e.target;

    const list = [...product];
    if (name.includes("Damaged_Percent") || name.includes("Reason")) {
      list[index][name] = value;
    }
    if (avalaibleSize >= Number(e.target.value)) {
      setIndex(index);
      console.log(product);
      if (name.includes("transferQty")) {
        // list[index]["Size"] = Number(value);
        let available = Number(list[index]["AvailaleQty"]);
        let Askingfor = Number(value);
        if (available >= Askingfor) {
          list[index][name] = Askingfor;
        } else {
          swal("Can not Transfer More then Stock");
          list[index][name] = available - 1;
        }
      } else {
        list[index][name] = value;
      }
      console.log(GrandTotal);

      let amt = 0;
      if (list.length > 0) {
        const x = list?.map((val) => {
          GrandTotal[index] = val.Size * val.price * val.transferQty;
          list[index]["totalprice"] = val.Size * val.price * val.transferQty;
          return val.Size * val.price * val.transferQty;
        });
        amt = x.reduce((a, b) => a + b);
        console.log("GrandTotal", amt);
      }
      // console.log(list)
      setGrandTotalAmt(amt);
    }
    setProduct(list);
  };
  const handleProductChangeProductone = (e, index) => {
    setIndex(index);
    console.log(product);
    const { name, value } = e.target;
    const list = [...product];
    if (name.includes("transferQty")) {
      list[index][name] = Number(value);
    } else {
      list[index][name] = value;
    }
    console.log(GrandTotal);

    let amt = 0;
    if (list.length > 0) {
      const x = list?.map((val) => {
        GrandTotal[index] = val.Size * val.price * val.transferQty;
        list[index]["totalprice"] = val.Size * val.price * val.transferQty;
        return val.Size * val.price * val.transferQty;
      });
      amt = x.reduce((a, b) => a + b);
      console.log("GrandTotal", amt);
    }
    // console.log(list)
    setProduct(list);
    setGrandTotalAmt(amt);
  };

  const handleRemoveSelected = (selectedList, selectedItem, index) => {
    // console.log(selectedList);
    // console.log(selectedItem); // removed item
    // console.log(product);
    // console.log(index);
    // console.log(SelectedITems);
    SelectedITems.splice(index, 1);
    let myarr = product?.map((ele, i) => {
      console.log(ele?.qty * selectedItem[i]?.Product_MRP);
      let indextotal = ele?.qty * SelectedITems[i]?.Product_MRP;
      GrandTotal[index] = indextotal;
      return indextotal;
    });

    let amt = myarr.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);
  };
  const handleRemoveSelectedone = (selectedList, selectedItem, index) => {
    SelectedSize.splice(index, 1);
    let myarr = product?.map((ele, i) => {
      console.log(ele?.Size * ele?.price * SelectedSize[i]?.unitQty);
      let indextotal = ele?.Size * SelectedSize[i]?.unitQty;
      GrandTotal[index] = indextotal;
      return indextotal;
    });

    let amt = myarr.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);
  };
  const handleSelection = (selectedList, selectedItem, index) => {
    // product[index]["AvailaleQty"] = myproduct?.Size;
    SelectedITems.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?.productId?._id;
      updatedProduct.AvailaleQty = selectedItem?.Size;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleSelectionProduct = (selectedList, selectedItem, index) => {
    // product[index]["AvailaleQty"] = myproduct?.Size;
    SelectedITems.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?._id;
      updatedProduct.AvailaleQty = selectedItem?.Size;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleSelectionone = (selectedList, selectedItem, index) => {
    SelectedSize.push(selectedItem);

    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.Size = selectedItem?.unitQty; // Update the price of the copied product
      updatedProduct.unitType = selectedItem?.primaryUnit;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one
      let myarr = prevProductList?.map((ele, i) => {
        console.log(ele?.transferQty * ele?.price * SelectedSize[i]?.unitQty);
        let indextotal =
          ele?.transferQty * ele?.price * SelectedSize[i]?.unitQty;
        GrandTotal[index] = indextotal;
        return indextotal;
      });
      let amt = myarr.reduce((a, b) => a + b);
      setGrandTotalAmt(amt);
      return updatedProductList; // Return the updated product list to set the state
    });
    // onSelect1(selectedList, selectedItem, index);
  };
  const handleInputChange = (e, type, i) => {
    const { name, value, checked } = e.target;
    setindex(i);
    if (type == "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          [name]: checked,
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      if (type == "number") {
        if (/^\d{0,10}$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setError("");
        } else {
          setError(
            "Please enter a valid number with a maximum length of 10 digits"
          );
        }
      } else {
        if (value.length <= 10) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setError("");
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      }
    }
  };
  // handleInputChange;
  // useEffect(() => {
  //   console.log(window);
  //   console.log(product);
  //   console.log(GrandTotal);
  //   console.log(Salesperson);
  //   console.log(StockTrxdate);
  //   console.log(targetEndDate);
  // }, [product, targetEndDate]);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    CreateAccountList(userData?._id, userData?.database)
      .then((res) => {
        let value = res?.adminDetails;
        console.log(value);
        if (value.length) {
          setWarehouseList(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    UnitListView(userData?._id, userData?.database)
      .then((res) => {
        console.log(res?.Unit);
        let customADD = {
          primaryUnit: "PIECES(Pcs)",
          secondaryUnit: "PIECES(Pcs) 1",
          unitQty: 1,
        };
        let AllUnit = [...res?.Unit, customADD];
        setUnitList(AllUnit);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    console.log(userInfo);
    setUserInfo(userInfo);
    // CreateOrder_ID()
    //   .then((res) => {
    //     const lastElement = res?.Order[res?.Order?.length - 1].id;
    //     const prefix = lastElement?.substring(0, 5);
    //     const number = parseInt(lastElement?.match(/\d+$/)[0], 10) + 1;
    //     const concatenatedString = prefix + number;
    //     setOrderID(concatenatedString);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // CreateOrder_ViewData()
    //   .then((res) => {
    //     const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
    //     setCreatAccountView(JSON.parse(jsonData));
    //     setStatusDropDown(
    //       JSON.parse(jsonData)?.createOrder.CurrentStatus?.MyDropDown?.dropdown
    //     );
    //     setdropdownValue(JSON.parse(jsonData));
    //     setPartDetails(JSON.parse(jsonData)?.createOrder.PartDetails);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  let addMoreProduct = () => {
    setProduct([
      ...product,
      {
        product: "",
        productId: "",
        Reason: "",
        Damaged_Percent: null,
        AvailaleQty: null,
        availableQty: "",
        transferQty: 1,
        price: "",
        totalprice: "",
        Size: "",
        unitType: "",
        stockTrxDate: "",
        targetEndDate: "",
        discount: "",
        Shipping: "",
        tax: "",
        grandTotal: "",
      },
    ]);
  };
  let removeMoreProduct = (i) => {
    let newFormValues = [...product];
    newFormValues.splice(i, 1);
    GrandTotal.splice(i, 1);
    let amt = GrandTotal.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);

    setProduct(newFormValues);
  };
  // let handlePartChange = (i, e) => {
  //   let newFormValues = [...part];
  //   newFormValues[i][e.target.name] = e.target.value;
  //   setPart(newFormValues);
  // };

  const DamagedStockSubmitHandler = async (e) => {
    e.preventDefault();
    // body: warehouse, productId, Size, unitType, transferQty, price, totalPrice;

    let userdata = JSON.parse(localStorage.getItem("userData"));
    let payload = {
      typeStatus: "Damaged",
      warehouse: WareHouseone[0]?._id,
      productId: product[0]?.productId,
      demagePercentage: product[0]?.Damaged_Percent,
      reason: product[0]?.Reason,
      Size: product[0]?.Size,
      unitType: product[0]?.unitType,
      transferQty: product[0]?.transferQty,
      price: product[0]?.price,
      totalPrice:
        product[0]?.transferQty * product[0]?.Size * product[0]?.price,
      currentStock: product[0]?.transferQty * product[0]?.Size,
    };
    debugger;
    await Save_Damagedstock(payload)
      .then((res) => {
        //   window.location.reload();
        // history.goBack();
        swal("Damadged Stock Created");

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        swal("Something Went Wrong");
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let userdata = JSON.parse(localStorage.getItem("userData"));
    // console.log(product);
    // console.log(GrandTotal);
    // console.log(Salesperson[0]?._id);
    // console.log(targetStartDate);
    // console.log(targetEndDate);
    // console.log(grandTotalAmt);

    let Allproduct = product?.map((ele, i) => {
      console.log(ele);
      return {
        productId: ele?.productId,
        unitType: ele?.unitType,
        price: ele?.price,
        Size: ele?.Size,
        transferQty: ele?.transferQty,
        totalPrice: ele?.totalprice,
        currentStock: ele?.transferQty * ele?.Size,
      };
    });
    let payload = {
      productItems: Allproduct,
      warehouseToId: WareHouseone[0]?._id,
      stockTransferDate: StockTrxdate,
      grandTotal: grandTotalAmt,
      transferStatus: "InProcess",
      created_by: userdata?._id,
    };

    if (error) {
      swal("Error occured while Entering Details");
    } else {
      StocktrxFtoW(payload)
        .then((res) => {
          // if (res.status) {
          //   setFormData({});
          //   window.location.reload();
          swal("Stock Assigned to WareHouse");
          // }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onSelect1 = (selectedList, selectedItem, index) => {
    console.log(selectedList);
    setWareHouseone(selectedList);
    // setProductList(selectedList[0].productItems);
  };
  const onSelectone = (selectedList, selectedItem, index) => {
    console.log(selectedList);

    setWareHouseone(selectedList);
    // const list = [...product];
    let MySelectedwarehouseProduct = selectedList[0].productItems?.map(
      (ele, i) => {
        let myproduct = ele?.productId;
        ele["Product_Title"] = myproduct?.Product_Title;
        ele["Product_id"] = myproduct?._id;
        ele["Product_MRP"] = myproduct?.Product_MRP;
        ele["discount"] = myproduct?.discount;
        ele["transferQty"] = myproduct?.transferQty;
        ele["MIN_stockalert"] = myproduct?.MIN_stockalert;
      }
    );

    console.log(selectedList[0]?.productItems);

    setProductWTWList(selectedList[0]?.productItems);
  };
  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  const onRemoveone = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  const onSelect2 = (selectedList, selectedItem, index) => {
    console.log(selectedList);
    setWareHousetwo(selectedList);
  };
  const onRemove2 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  return (
    <div>
      <Card>
        <Row className="m-2">
          <Col lg="8" md="8" sm="8" className="mb-2 mt-1">
            <div>
              <h1 className="">Add Stock to Damage</h1>
            </div>
          </Col>
          <Col>
            <div className="float-right">
              <Route
                render={({ history }) => (
                  <Button
                    style={{ cursor: "pointer" }}
                    className="float-right mr-1"
                    color="primary"
                    onClick={() => history.goBack()}>
                    {" "}
                    Back
                    {/* <FaPlus size={15} /> Create User */}
                  </Button>
                )}
              />
            </div>
          </Col>
        </Row>
        <CardBody>
          <Form className="mx-1" onSubmit={DamagedStockSubmitHandler}>
            <Row>
              <Col className="mb-1" lg="3" md="3" sm="12">
                <div className="">
                  <Label>Choose Warehouse(from where) *</Label>
                  <Multiselect
                    required
                    selectionLimit={1}
                    // showCheckbox="true"
                    isObject="false"
                    options={WareHouselist} // Options to display in the dropdown
                    // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                    onSelect={onSelectone} // Function will trigger on select event
                    onRemove={onRemoveone} // Function will trigger on remove event
                    displayValue="firstName" // Property name to display in the dropdown options
                  />
                </div>
              </Col>
              {/* <Col className="mb-1" lg="3" md="3" sm="12">
                <div className="">
                  <Label>Choose Warehouse (to be Transfer) * </Label>

                  <Multiselect
                    required
                    selectionLimit={1}
                    // showCheckbox="true"
                    isObject="false"
                    options={WareHouselist} // Options to display in the dropdown
                    // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                    onSelect={onSelect2} // Function will trigger on select event
                    onRemove={onRemove2} // Function will trigger on remove event
                    displayValue="firstName" // Property name to display in the dropdown options
                  />
                </div>
              </Col> */}
              {/* <Col className="mb-1" lg="2" md="2" sm="12">
                <div className="">
                  <Label>Stock Transfer date</Label>
                  <Input
                    required
                    type="date"
                    name="targetEndDate"
                    placeholder="Date of Delivery"
                    value={StockTrxdate}
                    onChange={(e) => setStockTrxDate(e.target.value)}
                  />
                </div>
              </Col> */}
            </Row>
            {product &&
              product?.map((product, index) => (
                <Row className="" key={index}>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Product Name</Label>
                      <Multiselect
                        required
                        selectionLimit={1}
                        // showCheckbox="true"
                        isObject="true"
                        options={ProductWTWList}
                        // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                        onSelect={(selectedList, selectedItem) =>
                          handleSelection(selectedList, selectedItem, index)
                        }
                        onRemove={(selectedList, selectedItem) => {
                          handleRemoveSelected(
                            selectedList,
                            selectedItem,
                            index
                          );
                        }}
                        displayValue="Product_Title" // Property name to display in the dropdown options
                      />
                      {/* <CustomInput
                          name="productId"
                          onChange={(e) => handleProductChangeProduct(e, index)}
                          type="select">
                          <option>--Select--</option>
                          {ProductWTWList &&
                            ProductWTWList?.map((ele, i) => {
                              return (
                                <option value={ele?.productId?._id}>
                                  {ele?.productId.Product_Title}
                                </option>
                              );
                            })}
                        </CustomInput> */}
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Size</Label>
                      <Multiselect
                        required
                        selectionLimit={1}
                        // showCheckbox="true"
                        isObject="false"
                        options={UnitList}
                        // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                        onSelect={(selectedList, selectedItem) =>
                          handleSelectionone(selectedList, selectedItem, index)
                        }
                        onRemove={(selectedList, selectedItem) => {
                          handleRemoveSelectedone(
                            selectedList,
                            selectedItem,
                            index
                          );
                        }}
                        displayValue="primaryUnit" // Property name to display in the dropdown options
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Damadge %</Label>
                      <Input
                        type="number"
                        name="Damaged_Percent"
                        placeholder="Damage %"
                        value={product?.Damaged_Percent}
                        onChange={(e) =>
                          handleProductChangeProduct(
                            e,
                            index,
                            product?.AvailaleQty
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Damadge Qty</Label>
                      <Input
                        type="number"
                        min={0}
                        name="transferQty"
                        placeholder="Req_Qty"
                        value={product?.transferQty}
                        onChange={(e) =>
                          handleProductChangeProduct(
                            e,
                            index,
                            product?.AvailaleQty
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Reason</Label>
                      <Input
                        type="text"
                        name="Reason"
                        placeholder="Reason"
                        value={product?.Reason}
                        onChange={(e) =>
                          handleProductChangeProduct(
                            e,
                            index,
                            product?.AvailaleQty
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Available Qty</Label>
                      <Input
                        disabled
                        type="number"
                        min={0}
                        name="AvailaleQty"
                        placeholder="Available Qty"
                        value={product?.AvailaleQty}
                        // onChange={(e) => handleProductChangeProduct(e, index)}
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Price</Label>
                      <Input
                        type="number"
                        name="price"
                        readOnly
                        placeholder="Price"
                        value={product.price}
                      />
                    </div>
                  </Col>
                  <Col className="mb-1" lg="2" md="2" sm="12">
                    <div className="">
                      <Label>Total Price</Label>
                      <Input
                        type="number"
                        name="totalprice"
                        readOnly
                        placeholder="TtlPrice"
                        value={
                          product.Size * product.price * product.transferQty
                        }
                      />
                    </div>
                  </Col>

                  <Col className="d-flex mt-1 abb" lg="3" md="3" sm="12">
                    <div className="btnStyle">
                      {index ? (
                        <Badge
                          type="button"
                          color="danger"
                          className="button remove "
                          onClick={() => removeMoreProduct(index)}>
                          - Remove
                        </Badge>
                      ) : null}
                    </div>

                    {/* <div className="btnStyle">
                      <Badge
                        className="ml-1 mb-1"
                        color="primary"
                        type="button"
                        onClick={() => addMoreProduct()}>
                        + Add
                      </Badge>
                    </div> */}
                  </Col>
                </Row>
              ))}

            <Row>
              <Col className="mb-1" lg="12" md="12" sm="12">
                <div className=" d-flex justify-content-end">
                  <Label className="pr-5">
                    Grand Total :{" "}
                    <strong>
                      {grandTotalAmt && grandTotalAmt == "NaN"
                        ? 0
                        : grandTotalAmt}{" "}
                    </strong>
                  </Label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                  <Button.Ripple color="primary" type="submit" className="mt-2">
                    Submit
                  </Button.Ripple>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
export default CreateTarget;
