import React, { useRef } from "react";
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
  Spinner,
} from "reactstrap";
import { ImDownload } from "react-icons/im";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Papa from "papaparse";
import { Eye, ChevronDown, Edit, CornerDownLeft } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import DebitView from "./DebitView";
import Logo from "../../../../../assets/img/profile/pages/logomain.png";
import { ContextLayout } from "../../../../../utility/context/Layout";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaFilter,
} from "react-icons/fa";
import swal from "sweetalert";
import {
  CreditnoteOrderList,
  Delete_targetINlist,
} from "../../../../../ApiEndPoint/ApiCalling";
import {
  BsCloudDownloadFill,
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";
import UserContext from "../../../../../context/Context";
import { CheckPermission } from "../../house/CheckPermission";
import SuperAdminUI from "../../../../SuperAdminUi/SuperAdminUI";

const SelectedColums = [];

class CreditNoteList extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      MasterShow: false,

      isOpen: false,
      Arrindex: "",
      rowData: [],
      InsiderPermissions: {},
      modal: false,
      modalone: false,
      ViewData: {},
      setMySelectedarr: [],
      SelectedCols: [],
      paginationPageSize: 5,
      currenPageSize: "",
      getPageSize: "",
      AllcolumnDefs: [],
      SelectedcolumnDefs: [],
      defaultColDef: {
        sortable: true,
        enablePivot: true,
        enableValue: true,
        resizable: true,
        suppressMenu: true,
      },
      columnDefs: [
        {
          headerName: "UID",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          width: 80,
          filter: true,
        },

        {
          headerName: "Actions",
          field: "transactions",
          width: 180,
          cellRendererFramework: (params) => {
            return (
              <div className="actions cursor-pointer">
                {this.state.InsiderPermissions &&
                  this.state.InsiderPermissions?.View && (
                    <Eye
                      className="mr-50"
                      size="25px"
                      color="green"
                      onClick={() => {
                        this.handleChangeView(params?.data, "readonly");
                      }}
                    />
                  )}
                {/* <Edit
                  className="mr-50"
                  size="25px"
                  color="blue"
                  onClick={() =>
                    this.props.history.push({
                      pathname: `/app/AJgroup/order/editPurchase/${params.data?._id}`,
                      state: params.data,
                    })
                  }
                /> */}
              </div>
            );
          },
        },
        {
          headerName: "order Creation date",
          field: "createdAt",
          filter: true,
          resizable: true,
          width: 230,
          cellRendererFramework: (params) => {
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div>
                  <span>{params.data?.createdAt?.split("T")[0]}</span>
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Party name",
          field: "partyId.OwnerName",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.partyId?.OwnerName}</span>
              </div>
            );
          },
        },
        {
          headerName: "Party Address",
          field: "partyId.OwnerAddress",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.partyId?.OwnerAddress}</span>
              </div>
            );
          },
        },
        {
          headerName: "Party Transporter",
          field: "partyId.transposrter_detail",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.partyId?.transposrter_detail}</span>
              </div>
            );
          },
        },
        {
          headerName: "Payment Term",
          field: "partyId.PaymentTerm",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.partyId?.PaymentTerm}</span>
              </div>
            );
          },
        },
        {
          headerName: "email",
          field: "partyId.email",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.partyId?.email}</span>
              </div>
            );
          },
        },
        {
          headerName: "City",
          field: "partyId.City",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.partyId?.City}</span>
              </div>
            );
          },
        },

        // {
        //   headerName: "GST Rate",
        //   field: "productId",
        //   filter: true,
        //   width: 220,
        //   valueGetter: (params) => {
        //     if (
        //       params.data?.productItems &&
        //       params.data?.productItems?.length > 0
        //     ) {
        //       return params?.data?.productItems?.map((val) => {
        //         return val?.productId["GSTRate"];
        //       });
        //     }
        //     return null;
        //   },
        // },

        // {
        //   headerName: "Product MRP",
        //   field: "productId",
        //   filter: true,
        //   width: 180,
        //   valueGetter: (params) => {
        //     if (
        //       params.data.productItems &&
        //       params.data.productItems.length > 0
        //     ) {
        //       return params?.data?.productItems?.map((val) => {
        //         return val?.productId?.Product_MRP;
        //       });
        //     }
        //     return null;
        //   },
        // },
        {
          headerName: "Total Amount",
          field: "totalAmount",
          filter: true,
          width: 220,
          cellRendererFramework: (params) => {
            return (
              <div>
                <span>{params.data?.totalAmount}</span>
              </div>
            );
          },
        },

        // {
        //   headerName: "Status",
        //   field: "status",
        //   filter: true,
        //   width: 150,
        //   cellRendererFramework: params => {
        //     return params.value == "comleted" ? (
        //       <div className="badge badge-pill badge-success">
        //         {params.data.status}
        //       </div>
        //     ) : params.value == "pending" ? (
        //       <div className="badge badge-pill badge-warning">
        //         {params.data.status}
        //       </div>
        //     ) : (
        //       <div className="badge badge-pill badge-success">
        //         {params.data.status}
        //       </div>
        //     );
        //   },
        // },
      ],
    };
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      modalone: !prevState.modalone,
    }));
  };
  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  handleChangeView = (data, types) => {
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
    await CreditnoteOrderList(id, db)
      .then((res) => {
        this.setState({ Loading: false });
        console.log(res?.CreditNote);
        if (res?.CreditNote?.length) {
          this.setState({ rowData: res?.CreditNote });
        }
        this.setState({ AllcolumnDefs: this.state.columnDefs });
        this.setState({ SelectedCols: this.state.columnDefs });

        let userHeading = JSON.parse(
          localStorage.getItem("CreditNoteListshow")
        );
        if (userHeading?.length) {
          this.setState({ columnDefs: userHeading });
          this.gridApi.setColumnDefs(userHeading);
          this.setState({ SelectedcolumnDefs: userHeading });
        } else {
          this.setState({ columnDefs: this.state.columnDefs });
          this.setState({ SelectedcolumnDefs: this.state.columnDefs });
        }
      })
      .catch((err) => {
        this.setState({ Loading: false });
        this.setState({ rowData: [] });

        console.log(err);
      });
  }
  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
    }
    const UserInformation = this.context?.UserInformatio;
    const InsidePermissions = CheckPermission("CreditNote");
    this.setState({ InsiderPermissions: InsidePermissions });
    await this.Apicalling(pageparmission?._id, pageparmission?.database);
  }
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
          Delete_targetINlist(id)
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
    debugger;
    this.gridApi.setColumnDefs(this.state.SelectedcolumnDefs);
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.setState({ SelectedcolumnDefs: this.state.SelectedcolumnDefs });
    this.setState({ rowData: this.state.rowData });
    localStorage.setItem(
      "CreditNoteListshow",
      JSON.stringify(this.state.SelectedcolumnDefs)
    );
    this.LookupviewStart();
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
    let SelectedCols = this.state.SelectedcolumnDefs?.slice();
    let delindex = this.state.Arrindex; /* Your delete index here */

    if (SelectedCols && delindex >= 0) {
      const splicedElement = SelectedCols?.splice(delindex, 1); // Remove the element

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
      SelectedcolumnDefs,
      isOpen,
      SelectedCols,
      AllcolumnDefs,
    } = this.state;
    return (
      <>
        <Col className="app-user-list">
          {this.state.EditOneUserView && this.state.EditOneUserView ? (
            <Row className="card">
              <Col>
                <div className="d-flex justify-content-end p-1">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ EditOneUserView: false });
                    }}
                    color="danger"
                    size="sm">
                    Back
                  </Button>
                </div>
              </Col>

              {/* <EditAccount EditOneData={this.state.EditOneData} /> */}
            </Row>
          ) : (
            <>
              {this.state.ViewOneUserView && this.state.ViewOneUserView ? (
                <>
                  <Row className="card">
                    <Col>
                      <div className="d-flex justify-content-end p-1">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ ViewOneUserView: false });
                          }}
                          color="danger"
                          size="sm">
                          Back
                        </Button>
                      </div>
                    </Col>
                    <DebitView ViewOneData={this.state.ViewOneData} />
                  </Row>
                </>
              ) : (
                <>
                  <Col sm="12">
                    <Card>
                      <Row className="ml-2 mt-2 mr-2">
                        <Col>
                          <h1
                            className="float-left"
                            style={{ fontWeight: "600" }}>
                            CreditNote List
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

                        <Col>
                          {this.state.InsiderPermissions &&
                            this.state.InsiderPermissions?.View && (
                              <>
                                <span className="mx-1">
                                  <FaFilter
                                    style={{ cursor: "pointer" }}
                                    title="filter coloumn"
                                    size="30px"
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
                                    size="30px"
                                    className="dropdown-button "
                                    color="#39cccc"
                                    onClick={this.toggleDropdown}
                                  />
                                  {isOpen && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        zIndex: "1",
                                      }}
                                      className="dropdown-content dropdownmy">
                                      <h5
                                        onClick={() => this.exportToPDF()}
                                        style={{ cursor: "pointer" }}
                                        className=" mx-1 myactive mt-1">
                                        .PDF
                                      </h5>
                                      <h5
                                        onClick={() =>
                                          this.gridApi.exportDataAsCsv()
                                        }
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
                                        {this.state.rowData?.length -
                                          this.state.currenPageSize *
                                            this.state.getPageSize >
                                        0
                                          ? this.state.currenPageSize *
                                            this.state.getPageSize
                                          : this.state.rowData?.length}{" "}
                                        of {this.state.rowData?.length}
                                        <ChevronDown
                                          className="ml-50"
                                          size={15}
                                        />
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
                                      gridOptions={this.gridOptions}
                                      rowSelection="multiple"
                                      defaultColDef={defaultColDef}
                                      columnDefs={columnDefs}
                                      rowData={rowData}
                                      onGridReady={this.onGridReady}
                                      colResizeDefault={"shift"}
                                      animateRows={true}
                                      floatingFilter={false}
                                      pagination={true}
                                      paginationPageSize={
                                        this.state.paginationPageSize
                                      }
                                      pivotPanelShow="always"
                                      enableRtl={
                                        context.state.direction === "rtl"
                                      }
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
                </>
              )}
            </>
          )}
        </Col>

        <Modal
          isOpen={this.state.modal}
          toggle={this.LookupviewStart}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.LookupviewStart}>Change Fileds</ModalHeader>
          <ModalBody className="modalbodyhead">
            <Row>
              <Col lg="4" md="4" sm="12" xl="4" xs="12">
                <h4>Available Columns</h4>
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
                                            this.state.SelectedcolumnDefs?.slice();
                                          const delindex =
                                            SelectedCols?.findIndex(
                                              (element) =>
                                                element?.headerName ==
                                                ele?.headerName
                                            );

                                          if (SelectedCols && delindex >= 0) {
                                            const splicedElement =
                                              SelectedCols?.splice(delindex, 1); // Remove the element
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
                  {/* <Button onClick={this.HandleSetVisibleField} color="primary">
                    Submit
                  </Button> */}

                  <Badge
                    style={{ cursor: "pointer" }}
                    className=""
                    color="primary"
                    onClick={this.HandleSetVisibleField}>
                    Submit
                  </Badge>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modalone}
          toggle={this.toggleModal}
          className="modal-dialog modal-xl"
          // className="modal-dialog modal-lg"
          size="lg"
          backdrop={true}
          fullscreen={true}>
          <ModalHeader toggle={this.toggleModal}>View Details</ModalHeader>
          <ModalBody className="myproducttable">
            {/* <div className="container"> */}
            {/* <TargetAssignedOne ViewData={this.state.ViewData} /> */}
            {/* </div> */}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default CreditNoteList;
