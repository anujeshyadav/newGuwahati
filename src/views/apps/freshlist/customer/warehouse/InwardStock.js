import React, { useRef } from "react";
import { ImDownload } from "react-icons/im";
import { Route } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Row,
  Modal,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  ModalHeader,
  ModalBody,
  Badge,
  Label,
  Table,
  CustomInput,
  FormGroup,
  Spinner,
} from "reactstrap";

import { ContextLayout } from "../../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../../../../assets/img/profile/pages/logomain.png";
import Papa from "papaparse";
import { Eye, Trash2, ChevronDown, Edit } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaDownload,
  FaFilter,
  FaInbox,
  FaPlus,
} from "react-icons/fa";
import swal from "sweetalert";
import {
  CreateAccountList,
  DeleteAccount,
  Stockupdate,
  ViewFactoryStock,
  ViewOneWarehouseStock,
  Warehouse_Inwardlist,
} from "../../../../../ApiEndPoint/ApiCalling";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";
import UserContext from "../../../../../context/Context";
import UpdateStockTrx from "../../accounts/UpdateStockTrx";
import StockTrxInvoice from "../../subcategory/InwardTrxInvoice";
import { CheckPermission } from "../../house/CheckPermission";
import SuperAdminUI from "../../../../SuperAdminUi/SuperAdminUI";
import ClosingStock from "../ProductWIKI/ClosingStock";

const SelectedColums = [];

class StockTransfer extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      ShowBill: false,
      InventorysShow: false,
      MasterShow: false,
      wareHouseViewOne: [],
      Arrindex: "",
      InsiderPermissions: {},

      rowData: [],
      setMySelectedarr: [],
      ViewOneData: {},
      SelectedCols: [],
      paginationPageSize: 5,
      currenPageSize: "",
      getPageSize: "",

      columnDefs: [
        {
          headerName: "S.No",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          width: 150,
          filter: true,
        },
        {
          headerName: "Actions",
          field: "sortorder",
          field: "transactions",
          width: 150,
          cellRendererFramework: (params) => {
            return (
              <div className="actions cursor-pointer">
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.View && (
                    <Eye
                      title="Warehouse Products"
                      className="mr-50"
                      size="25px"
                      color="green"
                      onClick={(e) => {
                        this.togglemodal();

                        this.setState({ ViewOneData: params?.data });
                        this.setState({ ViewOneUserView: true });
                        this.setState({ InventorysShow: false });

                        this.setState({ EditOneUserView: false });
                      }}
                    />
                  )}
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.Edit && (
                    <FaInbox
                      title="Inward Stock Products"
                      className="mr-20"
                      size="25px"
                      color="blue"
                      onClick={async (e) => {
                        // await ViewOneWarehouseStock(
                        //   params?.data?._id,
                        //   params?.data?.database
                        // )
                        //   .then((res) => {
                        //     console.log(res?.Factory);
                        //     debugger;
                        //   })
                        //   .catch((err) => {
                        //     console.log(err);
                        //   });
                        await this.ViewStockList(
                          params?.data?._id,
                          params?.data?.database
                        );

                        this.setState({ InventorysShow: true });
                        this.setState({ ViewOneUserView: true });
                        this.setState({ EditOneUserView: false });
                        // this.setState({ EditOneUserView: true });
                        // this.setState({ ViewOneUserView: false });
                      }}
                    />
                  )}
              </div>
            );
          },
        },
        // {
        //   headerName: "Status",
        //   field: "transferStatus",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return params.data?.transferStatus === "Completed" ? (
        //       <div className="badge badge-pill badge-success">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : params.data?.transferStatus === "InProcess" ? (
        //       <div className="badge badge-pill badge-warning">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : params.data?.transferStatus === "Hold" ? (
        //       <div className="badge badge-pill badge-danger">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : params.data?.transferStatus === "Pending" ? (
        //       <div className="badge badge-pill badge-warning">
        //         {params.data?.transferStatus}
        //       </div>
        //     ) : null;
        //   },
        // },
        {
          headerName: "Warehouse Name",
          field: "firstName",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div>
                <span>{params.data?.firstName}</span>
              </div>
            );
          },
        },
        {
          headerName: "address",
          field: "address",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div>
                <span>{params.data?.address}</span>
              </div>
            );
          },
        },
        {
          headerName: "mobileNumber",
          field: "mobileNumber",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div>
                <span>{params.data?.mobileNumber}</span>
              </div>
            );
          },
        },
        {
          headerName: "State",
          field: "State",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div>
                <span>{params.data?.State}</span>
              </div>
            );
          },
        },
        {
          headerName: "City",
          field: "City",
          filter: true,
          width: 200,
          cellRendererFramework: (params) => {
            console.log(params.data);
            return (
              <div>
                <span>{params.data?.City}</span>
              </div>
            );
          },
        },
        // {
        //   headerName: "From",
        //   field: "warehouseFromId",
        //   filter: true,
        //   width: 200,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div>
        //         <span>
        //           {params.data?.warehouseFromId &&
        //           params.data?.warehouseFromId ? (
        //             <>{params.data?.warehouseFromId?.firstName}</>
        //           ) : (
        //             "Factory"
        //           )}
        //         </span>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Total Product",
        //   field: "productItems",
        //   filter: true,
        //   width: 200,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div>
        //         <span>{params.data?.productItems?.length} Products</span>
        //       </div>
        //     );
        //   },
        // },

        // {
        //   headerName: "Grand Total",
        //   field: "grandTotal",
        //   filter: true,
        //   sortable: true,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <>
        //         <div className="actions cursor-pointer">
        //           <span>{params?.data?.grandTotal}</span>
        //         </div>
        //       </>
        //     );
        //   },
        // },
        {
          headerName: "Created date",
          field: "createdAt",
          filter: true,
          sortable: true,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.createdAt?.split("T")[0]}</span>
                </div>
              </>
            );
          },
        },
        {
          headerName: "updatedAt",
          field: "updatedAt",
          filter: true,
          sortable: true,
          cellRendererFramework: (params) => {
            return (
              <>
                <div className="actions cursor-pointer">
                  <span>{params?.data?.updatedAt.split("T")[0]}</span>
                </div>
              </>
            );
          },
        },
      ],
      AllcolumnDefs: [],
      SelectedcolumnDefs: [],
      defaultColDef: {
        sortable: true,
        enablePivot: true,
        enableValue: true,
        resizable: true,
        suppressMenu: true,
      },
    };
  }
  UpdateStock = (e) => {
    let payload = {
      transferStatus: e.target.value,
    };
    let id = this.state.ViewOneData?._id;

    swal("Warning", "Sure You Want to Update Status", {
      buttons: {
        cancel: "No",
        catch: { text: "Yes", value: "Sure" },
      },
    }).then((value) => {
      switch (value) {
        case "Sure":
          Stockupdate(id, payload)
            .then((res) => {
              console.log(res);
              swal("success", "Status Updated Successfully");
              this.togglemodal();
              this.componentDidMount();
            })
            .catch((err) => {
              console.log(err);
            });

          break;
        default:
      }
    });
  };
  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  togglemodal = () => {
    this.setState((prevState) => ({
      modalone: !prevState.modalone,
    }));
    this.setState({ ShowBill: false });
  };
  handleStockTrxInvoiceShow = () => {
    this.setState({ ShowBill: true });
  };

  handleChangeEdit = (data, types) => {
    let type = types;
    if (type == "readonly") {
      this.setState({ ViewOneUserView: true });
      this.setState({ ViewOneData: data });
    } else {
      this.setState({ EditOneUserView: true });
      this.setState({ EditOneData: data });
    }
  };

  async Apicalling(id, db) {
    this.setState({ Loading: true });
    await CreateAccountList(id, db)
      .then((res) => {
        console.log(res.adminDetails);

        let warehouse = res?.adminDetails?.filter(
          (ele) => ele?.rolename?.roleName == "WareHouse Incharge"
        );
        if (warehouse?.length) {
          this.setState({ rowData: warehouse });
          // this.setState({ wareHouseViewOne: warehouse });
        }
        this.setState({ AllcolumnDefs: this.state.columnDefs });
        this.setState({ Loading: false });

        let userHeading = JSON.parse(localStorage.getItem("InwardStock"));
        if (userHeading?.length) {
          this.setState({ columnDefs: userHeading });
          this.gridApi.setColumnDefs(userHeading);
          this.setState({ SelectedcolumnDefs: userHeading });
        } else {
          this.setState({ columnDefs: this.state.columnDefs });
          this.setState({ SelectedcolumnDefs: this.state.columnDefs });
        }
        this.setState({ SelectedCols: this.state.columnDefs });
      })
      .catch((err) => {
        this.setState({ Loading: false });
        this.setState({ rowData: [] });

        console.log(err);
      });
  }
  async componentDidMount() {
    const UserInformation = this.context?.UserInformatio;
    const InsidePermissions = CheckPermission("Inward Stock");
    this.setState({ InsiderPermissions: InsidePermissions });
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }

    await this.Apicalling(pageparmission?._id, pageparmission?.database);
  }

  ViewStockList = async (id, db) => {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let userid = pageparmission?._id;
    await Warehouse_Inwardlist(id)
      .then((res) => {
        debugger;
        console.log(res?.Warehouse);
        let inwardstock = res?.Warehouse?.filter(
          (ele, i) => ele?.transferStatus == "InProcess"
        );

        if (inwardstock?.length) {
          this.setState({ ViewOneData: inwardstock[0] });
          this.togglemodal();
        } else {
          swal("No inWard Stock Found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    await ViewOneWarehouseStock(userid, pageparmission?.database)
      .then((res) => {
        console.log(res?.Factory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  runthisfunction(id) {
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          DeleteAccount(id)
            .then((res) => {
              let selectedData = this.gridApi.getSelectedRows();
              this.gridApi.updateRowData({ remove: selectedData });
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        default:
      }
    });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridRef.current = params.api;

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
  handleChangeHeader = (e, value, index) => {
    let check = e.target.checked;
    if (check) {
      SelectedColums?.push(value);
    } else {
      const delindex = SelectedColums?.findIndex(
        (ele) => ele?.headerName === value?.headerName
      );

      SelectedColums?.splice(delindex, 1);
    }
  };
  parseCsv(csvData) {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.data && result.data.length > 0) {
            resolve(result.data);
          } else {
            reject(new Error("No data found in the CSV"));
          }
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  generatePDF(parsedData) {
    let pdfsize = [Object.keys(parsedData[0])][0].length;
    let size = pdfsize > 15 ? "a1" : pdfsize < 14 > 10 ? "a3" : "a4";

    const doc = new jsPDF("landscape", "mm", size, false);
    doc.setTextColor(5, 87, 97);
    const tableData = parsedData.map((row) => Object.values(row));
    doc.addImage(Logo, "JPEG", 10, 10, 50, 30);
    let date = new Date();
    doc.setCreationDate(date);
    doc.text("UserAccount", 14, 51);
    doc.autoTable({
      head: [Object.keys(parsedData[0])],
      body: tableData,
      startY: 60,
    });

    doc.save("UserList.pdf");
  }

  exportToPDF = async () => {
    const csvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    try {
      const parsedData = await this.parseCsv(csvData);
      this.generatePDF(parsedData);
    } catch (error) {
      console.error("Error parsing CSV:", error);
    }
  };
  processCell = (params) => {
    return params.value;
  };

  convertCsvToExcel(csvData) {
    return new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (result) {
          const worksheet = XLSX.utils.json_to_sheet(result.data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });
          const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          resolve(blob);
        },
      });
    });
  }
  downloadExcelFile(blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Userlist.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToExcel = async (e) => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    const blob = await this.convertCsvToExcel(CsvData);
    this.downloadExcelFile(blob);
  };

  convertCSVtoExcel = () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    Papa.parse(CsvData, {
      complete: (result) => {
        const ws = XLSX.utils.json_to_sheet(result.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const excelType = "xls";
        XLSX.writeFile(wb, `UserList.${excelType}`);
      },
    });
  };

  shiftElementUp = () => {
    let currentIndex = this.state.Arrindex;
    if (currentIndex > 0) {
      const myArrayCopy = [...this.state.SelectedcolumnDefs];
      const elementToMove = myArrayCopy.splice(currentIndex, 1)[0];
      this.setState({ Arrindex: currentIndex - 1 });
      myArrayCopy.splice(currentIndex - 1, 0, elementToMove);
      this.setState({ SelectedcolumnDefs: myArrayCopy });
    }
  };

  shiftElementDown = () => {
    let currentIndex = this.state.Arrindex;
    if (currentIndex < this.state.SelectedcolumnDefs.length - 1) {
      const myArrayCopy = [...this.state.SelectedcolumnDefs];
      const elementToMove = myArrayCopy.splice(currentIndex, 1)[0];
      this.setState({ Arrindex: currentIndex + 1 });
      myArrayCopy.splice(currentIndex + 1, 0, elementToMove);
      this.setState({ SelectedcolumnDefs: myArrayCopy });
    }
  };
  convertCsvToXml = () => {
    const CsvData = this.gridApi.getDataAsCsv({
      processCellCallback: this.processCell,
    });
    Papa.parse(CsvData, {
      complete: (result) => {
        const rows = result.data;

        // Create XML
        let xmlString = "<root>\n";

        rows.forEach((row) => {
          xmlString += "  <row>\n";
          row.forEach((cell, index) => {
            xmlString += `    <field${index + 1}>${cell}</field${index + 1}>\n`;
          });
          xmlString += "  </row>\n";
        });

        xmlString += "</root>";
        const blob = new Blob([xmlString], { type: "text/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.xml";
        link.click();
      },
    });
  };

  HandleSetVisibleField = (e) => {
    e.preventDefault();
    this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
    this.setState({ rowData: this.state.rowData });
    localStorage.setItem(
      "InwardStock",
      JSON.stringify(this.state.SelectedcolumnDefs)
    );
    this.LookupviewStart();
  };
  handleShowWarehouse = (e) => {
    e.preventDefault();
    if (this.state.warehouse != "NA") {
      console.log(this.state.wareHouseViewOne);
      let selecteddata = this.state.wareHouseViewOne?.filter(
        (ele, i) => ele?._id == this.state.warehouse
      );
      this.setState({ Show: true });
      this.setState({ rowData: selecteddata });
    } else {
      swal("You did not select Any Warehouse");
    }
  };
  changeHandler = (e) => {
    console.log(e.target.value, this.state.warehouse);

    this.setState({ [e.target.name]: e.target.value });
  };
  HeadingRightShift = () => {
    const updatedSelectedColumnDefs = [
      ...new Set([
        ...this.state.SelectedcolumnDefs.map((item) => JSON.stringify(item)),
        ...SelectedColums.map((item) => JSON.stringify(item)),
      ]),
    ].map((item) => JSON.parse(item));
    this.setState({
      SelectedcolumnDefs: [...new Set(updatedSelectedColumnDefs)], // Update the state with the combined array
    });
  };
  handleLeftShift = () => {
    let SelectedCols = this.state.SelectedcolumnDefs.slice();
    let delindex = this.state.Arrindex; /* Your delete index here */

    if (SelectedCols && delindex >= 0) {
      const splicedElement = SelectedCols.splice(delindex, 1); // Remove the element

      this.setState({
        SelectedcolumnDefs: SelectedCols, // Update the state with the modified array
      });
    }
  };
  handleParentSubmit = (e) => {
    e.preventDefault();
    let SuperAdmin = JSON.parse(localStorage.getItem("SuperadminIdByMaster"));
    let id = SuperAdmin.split(" ")[0];
    let db = SuperAdmin.split(" ")[1];
    this.Apicalling(id, db);
  };
  handleDropdownChange = (selectedValue) => {
    localStorage.setItem("SuperadminIdByMaster", JSON.stringify(selectedValue));
  };
  render() {
    if (this.state.Loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
          }}>
          <Spinner
            style={{
              height: "4rem",
              width: "4rem",
            }}
            color="primary">
            Loading...
          </Spinner>
        </div>
      );
    }
    const {
      rowData,
      columnDefs,
      defaultColDef,
      InsiderPermissions,
      SelectedcolumnDefs,
      isOpen,
      SelectedCols,
      AllcolumnDefs,
    } = this.state;
    return (
      <>
        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <Row className="mt-2 ml-2 mr-2">
                <Col lg="2" md="2">
                  <h1 className="float-left" style={{ fontWeight: "600" }}>
                    Inward Stock
                  </h1>
                </Col>
                {this.state.MasterShow && (
                  <Col>
                    <SuperAdminUI
                      onDropdownChange={this.handleDropdownChange}
                      onSubmit={this.handleParentSubmit}
                    />
                  </Col>
                )}
                {/* {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.View && (
                    <>
                      <Col lg="2" md="2">
                        <FormGroup>
                          <Label>Select Warehouse</Label>
                          <CustomInput
                            type="select"
                            placeholder="Select Warehouse"
                            name="warehouse"
                            value={this.state.warehouse}
                            onChange={this.changeHandler}>
                            <option value="">--Select WareHouse--</option>
                            {this.state.wareHouseViewOne?.map((cat) => {
                              return (
                                <option value={cat?._id} key={cat?._id}>
                                  {cat?.firstName}
                                </option>
                              );
                            })}
                          </CustomInput>
                        </FormGroup>
                      </Col>

                      <Col lg="2" md="2" className="mb-2">
                        <Button
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#39cccc",
                            color: "white",
                            fontWeight: "600",
                          }}
                          className="mt-2"
                          color="#39cccc"
                          onClick={this.handleShowWarehouse}>
                          Submit
                        </Button>
                      </Col>
                    </>
                  )} */}

                <Col>
                  {this.state.InsiderPermissions &&
                    this.state.InsiderPermissions?.View && (
                      <>
                        <span className="mx-1">
                          <FaFilter
                            style={{ cursor: "pointer" }}
                            title="filter coloumn"
                            size="35px"
                            onClick={this.LookupviewStart}
                            color="#39cccc"
                            className="float-right"
                          />
                        </span>
                      </>
                    )}
                  {this.state.InsiderPermissions &&
                    this.state.InsiderPermissions?.Download && (
                      <span className="mx-1">
                        <div className="dropdown-container float-right">
                          <ImDownload
                            style={{ cursor: "pointer" }}
                            title="download file"
                            size="35px"
                            className="dropdown-button "
                            color="#39cccc"
                            onClick={this.toggleDropdown}
                          />
                          {isOpen && (
                            <div
                              style={{
                                position: "absolute",
                                zIndex: "1",
                                border: "1px solid #39cccc",
                                backgroundColor: "white",
                              }}
                              className="dropdown-content dropdownmy">
                              <h5
                                onClick={() => this.exportToPDF()}
                                style={{ cursor: "pointer" }}
                                className=" mx-1 myactive mt-1">
                                .PDF
                              </h5>
                              <h5
                                onClick={() => this.gridApi.exportDataAsCsv()}
                                style={{ cursor: "pointer" }}
                                className=" mx-1 myactive">
                                .CSV
                              </h5>
                              <h5
                                onClick={this.convertCSVtoExcel}
                                style={{ cursor: "pointer" }}
                                className=" mx-1 myactive">
                                .XLS
                              </h5>
                              <h5
                                onClick={this.exportToExcel}
                                style={{ cursor: "pointer" }}
                                className=" mx-1 myactive">
                                .XLSX
                              </h5>
                              <h5
                                onClick={() => this.convertCsvToXml()}
                                style={{ cursor: "pointer" }}
                                className=" mx-1 myactive">
                                .XML
                              </h5>
                            </div>
                          )}
                        </div>
                      </span>
                    )}
                </Col>
              </Row>
              {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.View && (
                  <CardBody style={{ marginTop: "-1.5rem" }}>
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
                                  this.state.currenPageSize *
                                    this.state.getPageSize >
                                0
                                  ? this.state.currenPageSize *
                                    this.state.getPageSize
                                  : this.state.rowData.length}{" "}
                                of {this.state.rowData.length}
                                <ChevronDown className="ml-50" size={15} />
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(5)}>
                                  5
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(20)}>
                                  20
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(50)}>
                                  50
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(100)}>
                                  100
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(134)}>
                                  134
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                          <div className="d-flex flex-wrap justify-content-end mb-1">
                            <div className="table-input mr-1">
                              <Input
                                placeholder="search Item here..."
                                onChange={(e) =>
                                  this.updateSearchQuery(e.target.value)
                                }
                                value={this.state.value}
                              />
                            </div>
                          </div>
                        </div>
                        <ContextLayout.Consumer className="ag-theme-alpine">
                          {(context) => (
                            <AgGridReact
                              id="myAgGrid"
                              // gridOptions={{
                              //   domLayout: "autoHeight",
                              //   // or other layout options
                              // }}
                              gridOptions={this.gridOptions}
                              rowSelection="multiple"
                              defaultColDef={defaultColDef}
                              columnDefs={columnDefs}
                              rowData={rowData}
                              // onGridReady={(params) => {
                              //   this.gridApi = params.api;
                              //   this.gridColumnApi = params.columnApi;
                              //   this.gridRef.current = params.api;

                              //   this.setState({
                              //     currenPageSize:
                              //       this.gridApi.paginationGetCurrentPage() +
                              //       1,
                              //     getPageSize:
                              //       this.gridApi.paginationGetPageSize(),
                              //     totalPages:
                              //       this.gridApi.paginationGetTotalPages(),
                              //   });
                              // }}
                              onGridReady={this.onGridReady}
                              colResizeDefault={"shift"}
                              animateRows={true}
                              floatingFilter={false}
                              pagination={true}
                              paginationPageSize={this.state.paginationPageSize}
                              pivotPanelShow="always"
                              enableRtl={context.state.direction === "rtl"}
                              ref={this.gridRef} // Attach the ref to the grid
                              domLayout="autoHeight" // Adjust layout as needed
                            />
                          )}
                        </ContextLayout.Consumer>
                      </div>
                    )}
                  </CardBody>
                )}
            </Card>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modal}
          toggle={this.LookupviewStart}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.LookupviewStart}>Change Fileds</ModalHeader>
          <ModalBody className="modalbodyhead">
            <Row>
              <Col lg="4" md="4" sm="12" xl="4" xs="12">
                <h4>Avilable Columns</h4>
                <div className="mainshffling">
                  <div class="ex1">
                    {AllcolumnDefs &&
                      AllcolumnDefs?.map((ele, i) => {
                        return (
                          <>
                            <div
                              onClick={(e) =>
                                this.handleChangeHeader(e, ele, i)
                              }
                              key={i}
                              className="mycustomtag mt-1">
                              <span className="mt-1">
                                <h5
                                  style={{ cursor: "pointer" }}
                                  className="allfields">
                                  <input
                                    type="checkbox"
                                    // checked={check && check}
                                    className="mx-1"
                                  />

                                  {ele?.headerName}
                                </h5>
                              </span>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </Col>
              <Col lg="2" md="2" sm="12" xl="2" xs="12" className="colarrowbtn">
                <div className="mainarrowbtn">
                  <div style={{ cursor: "pointer" }}>
                    <FaArrowAltCircleRight
                      onClick={this.HeadingRightShift}
                      className="arrowassign"
                      size="30px"
                    />
                  </div>
                  <div style={{ cursor: "pointer" }} className="my-2">
                    <FaArrowAltCircleLeft
                      onClick={this.handleLeftShift}
                      className="arrowassign"
                      size="30px"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6" md="6" sm="12" xl="6" xs="12">
                <Row>
                  <Col lg="8" md="8" sm="12" xs="12">
                    <h4>Visible Columns</h4>
                    <div className="mainshffling">
                      <div class="ex1">
                        {SelectedcolumnDefs &&
                          SelectedcolumnDefs?.map((ele, i) => {
                            return (
                              <>
                                <div key={i} className="mycustomtag mt-1">
                                  <span className="mt-1">
                                    <h5
                                      onClick={() =>
                                        this.setState({ Arrindex: i })
                                      }
                                      style={{
                                        cursor: "pointer",
                                        backgroundColor: `${
                                          this.state.Arrindex === i
                                            ? "#1877f2"
                                            : ""
                                        }`,
                                      }}
                                      className="allfields">
                                      <IoMdRemoveCircleOutline
                                        onClick={() => {
                                          const SelectedCols =
                                            this.state.SelectedcolumnDefs.slice();
                                          const delindex =
                                            SelectedCols.findIndex(
                                              (element) =>
                                                element?.headerName ==
                                                ele?.headerName
                                            );

                                          if (SelectedCols && delindex >= 0) {
                                            const splicedElement =
                                              SelectedCols.splice(delindex, 1); // Remove the element
                                            // splicedElement contains the removed element, if needed

                                            this.setState({
                                              SelectedcolumnDefs: SelectedCols, // Update the state with the modified array
                                            });
                                          }
                                        }}
                                        style={{ cursor: "pointer" }}
                                        size="25px"
                                        color="red"
                                        className="mr-1"
                                      />

                                      {ele?.headerName}
                                    </h5>
                                  </span>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" md="4" sm="12" xs="12">
                    <div className="updownbtn justify-content-center">
                      <div>
                        <BsFillArrowUpSquareFill
                          className="arrowassign mb-1"
                          size="30px"
                          onClick={this.shiftElementUp}
                        />
                      </div>
                      <div>
                        <BsFillArrowDownSquareFill
                          onClick={this.shiftElementDown}
                          className="arrowassign"
                          size="30px"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                  <Button onClick={this.HandleSetVisibleField} color="primary">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.modalone}
          toggle={this.togglemodal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.togglemodal}>
            {this.state.ShowBill ? "Bill Download" : "All Products"}
          </ModalHeader>
          <ModalBody
            className={`${this.state.ShowBill ? "p-1" : "modalbodyhead"}`}>
            {this.state.ViewOneUserView ? (
              <>
                {this.state.ShowBill ? (
                  <>
                    <StockTrxInvoice ViewOneData={this.state.ViewOneData} />
                  </>
                ) : (
                  <>
                    <Row>
                      <Col>
                        <Label>WareHouse Name :</Label>
                        <h5 className="mx-1">
                          <span>
                            {this.state.ViewOneData?.warehouseToId?.firstName &&
                            this.state.ViewOneData?.warehouseToId?.firstName ? (
                              <>
                                {
                                  this.state.ViewOneData?.warehouseToId
                                    ?.firstName
                                }
                              </>
                            ) : (
                              <>
                                {this.state.ViewOneData?.firstName &&
                                this.state.ViewOneData?.firstName ? (
                                  <>{this.state.ViewOneData?.firstName}</>
                                ) : (
                                  "Factory"
                                )}
                              </>
                            )}
                          </span>
                        </h5>
                      </Col>
                      {this.state.InventorysShow &&
                        this.state.InventorysShow && (
                          <>
                            <Col>
                              <Label>Stock trx date :</Label>
                              <h5>
                                {this.state.ViewOneData &&
                                  this.state.ViewOneData?.stockTransferDate}
                              </h5>
                            </Col>

                            <Col>
                              <Label>Grand Total :</Label>
                              <h5>
                                <strong>
                                  {this.state.ViewOneData &&
                                    this.state.ViewOneData?.grandTotal}{" "}
                                </strong>
                                Rs/-
                              </h5>
                            </Col>

                            {this.state.ViewOneData?.transferStatus ==
                            "Completed" ? (
                              <>
                                <Col className="">
                                  <Label>status:</Label>
                                  <div>
                                    <Badge color="primary">
                                      {this.state.ViewOneData?.transferStatus}
                                    </Badge>
                                  </div>
                                </Col>
                              </>
                            ) : (
                              <>
                                {this.state.ViewOneData?.transferStatus ==
                                  "InProcess" && (
                                  <Col>
                                    <Label>Change Status</Label>
                                    <CustomInput
                                      onChange={this.UpdateStock}
                                      type="select">
                                      <option value="NA">--Select--</option>
                                      <option value="Completed">
                                        Completed
                                      </option>
                                      <option value="Pending">Pending</option>
                                      <option value="Hold">Hold</option>
                                    </CustomInput>
                                  </Col>
                                )}
                              </>
                            )}
                            {this.state.ViewOneData && (
                              <Col>
                                <Label>Download Receipt :</Label>
                                <div className="d-flex justify-content-center">
                                  <FaDownload
                                    onClick={this.handleStockTrxInvoiceShow}
                                    color="#00c0e"
                                    style={{ cursor: "pointer" }}
                                    size={20}
                                  />
                                </div>
                              </Col>
                            )}
                          </>
                        )}
                    </Row>
                    <Row className="p-2">
                      <Col>
                        <div className="d-flex justify-content-center">
                          <h4>Product Details</h4>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {this.state.ViewOneData?.productItems && (
                        <Col>
                          <Table style={{ cursor: "pointer" }} responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.ViewOneData?.productItems &&
                                this.state.ViewOneData?.productItems?.map(
                                  (ele, i) => (
                                    <>
                                      <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{ele?.productId?.Product_Title}</td>
                                        <td>{ele?.price}</td>
                                        <td>{ele?.Size}</td>
                                        <td>{ele?.unitType}</td>
                                        <td>{ele?.transferQty}</td>
                                        <td>
                                          {ele?.price *
                                            ele?.Size *
                                            ele?.transferQty}
                                        </td>
                                      </tr>
                                    </>
                                  )
                                )}
                            </tbody>
                          </Table>
                        </Col>
                      )}
                    </Row>
                  </>
                )}
              </>
            ) : (
              <>
                <UpdateStockTrx ViewOne={this.state.ViewOneData} />
              </>
            )}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default StockTransfer;
