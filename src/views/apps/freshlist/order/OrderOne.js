import React, { useRef } from "react";
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
} from "reactstrap";
import ExcelReader from "../parts/ExcelReader";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import EditAccount from "../../freshlist/accounts/EditAccount";
import ViewAccount from "../../freshlist/accounts/ViewAccount";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../../../assets/img/profile/pages/logomain.png";
import Papa from "papaparse";
import { Eye, Trash2, ChevronDown, Edit, CloudLightning } from "react-feather";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import xmlJs from "xml-js";

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaFilter,
} from "react-icons/fa";
import "moment-timezone";
import swal from "sweetalert";
import {
  CreateAccountList,
  CreateAccountView,
  DeleteAccount,
} from "../../../../ApiEndPoint/ApiCalling";
import {
  BsCloudDownloadFill,
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import * as XLSX from "xlsx";

const SelectedCols = [];

class OrderOne extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.gridApi = null;
    this.state = {
      isOpen: false,
      Arrindex: "",
      rowData: [],
      setMySelectedarr: [],
      paginationPageSize: 20,
      currenPageSize: "",
      getPageSize: "",
      columnDefs: [],
      AllcolumnDefs: [],
      SelectedcolumnDefs: [],
      defaultColDef: {
        sortable: true,
        // editable: true,
        resizable: true,
        suppressMenu: true,
      },
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
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

  async componentDidMount() {
    await CreateAccountView()
      .then(res => {
        var mydropdownArray = [];
        var adddropdown = [];
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData));
        const checkboxinput = JSON.parse(
          jsonData
        ).CreateAccount?.CheckBox?.input?.map(ele => {
          return {
            headerName: ele?.label?._text,
            field: ele?.name?._text,
            filter: true,
            sortable: true,
            cellRendererFramework: params => {
              console.log(params.data);
              return params.data?.Status === "Active" ? (
                <div className="badge badge-pill badge-success">
                  {params.data.Status}
                </div>
              ) : params.data?.Status === "Deactive" ? (
                <div className="badge badge-pill badge-warning">
                  {params.data.Status}
                </div>
              ) : (
                "NA"
              );
            },
          };
        });
        const inputs = JSON.parse(jsonData).CreateAccount?.input?.map(ele => {
          return {
            headerName: ele?.label._text,
            field: ele?.name._text,
            filter: true,
            sortable: true,
          };
        });
        let Radioinput =
          JSON.parse(jsonData).CreateAccount?.Radiobutton?.input[0]?.name
            ?._text;
        const addRadio = [
          {
            headerName: Radioinput,
            field: Radioinput,
            filter: true,
            sortable: true,
            cellRendererFramework: params => {
              return params.data?.Status === "Active" ? (
                <div className="badge badge-pill badge-success">
                  {params.data.Status}
                </div>
              ) : params.data?.Status === "Deactive" ? (
                <div className="badge badge-pill badge-warning">
                  {params.data.Status}
                </div>
              ) : (
                "NA"
              );
            },
          },
        ];

        let dropdown = JSON.parse(jsonData).CreateAccount?.MyDropdown?.dropdown;
        if (dropdown.length) {
          var mydropdownArray = dropdown?.map(ele => {
            return {
              headerName: ele?.label,
              field: ele?.name,
              filter: true,
              sortable: true,
            };
          });
        } else {
          var adddropdown = [
            {
              headerName: dropdown?.label._text,
              field: dropdown?.name._text,
              filter: true,
              sortable: true,
            },
          ];
        }

        let myHeadings = [
          ...checkboxinput,
          ...inputs,
          ...adddropdown,
          ...addRadio,
          ...mydropdownArray,
        ];
        // console.log(myHeadings);
        let Product = [
          {
            headerName: "Actions",
            field: "sortorder",
            field: "transactions",
            width: 190,
            cellRendererFramework: params => {
              return (
                <div className="actions cursor-pointer">
                  <Route
                    render={({ history }) => (
                      <Eye
                        className="mr-50"
                        size="25px"
                        color="green"
                        onClick={() => {
                          this.handleChangeEdit(params.data, "readonly");
                        }}
                      />
                    )}
                  />
                  <Route
                    render={({ history }) => (
                      <Edit
                        className="mr-50"
                        size="25px"
                        color="blue"
                        onClick={() => {
                          this.handleChangeEdit(params.data, "Editable");
                        }}
                      />
                    )}
                  />

                  <Route
                    render={() => (
                      <Trash2
                        className="mr-50"
                        size="25px"
                        color="red"
                        onClick={() => {
                          this.runthisfunction(params?.data?._id);
                        }}
                      />
                    )}
                  />
                </div>
              );
            },
          },
          ...myHeadings,
        ];
        this.setState({ columnDefs: Product });
        this.setState({ AllcolumnDefs: Product });
      })
      .catch(err => {
        console.log(err);
        swal("Error", "something went wrong try again");
      });
    let userData = JSON.parse(localStorage.getItem("userData"));
    await CreateAccountList(userData?._id, userData?.database)
      .then((res) => {
        let value = res?.CreateAccount;
        this.setState({ rowData: value });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  toggleDropdown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  runthisfunction(id) {
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then(value => {
      switch (value) {
        case "delete":
          DeleteAccount(id)
            .then(res => {
              let selectedData = this.gridApi.getSelectedRows();
              this.gridApi.updateRowData({ remove: selectedData });
            })
            .catch(err => {
              console.log(err);
            });
          break;
        default:
      }
    });
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridRef.current = params.api;
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
  handleChangeHeader = (e, value, index) => {
    let check = e.target.checked;
    if (check) {
      SelectedCols.push(value);
    } else {
      const delindex = SelectedCols.findIndex(
        ele => ele?.headerName === value?.headerName
      );

      SelectedCols?.splice(delindex, 1);
    }
  };
  parseCsv(csvData) {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: result => {
          if (result.data && result.data.length > 0) {
            resolve(result.data);
          } else {
            reject(new Error("No data found in the CSV"));
          }
        },
        error: error => {
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
    const tableData = parsedData.map(row => Object.values(row));
    doc.addImage(Logo, "JPEG", 10, 10, 50, 30);
    let date = new Date();
    doc.setCreationDate(date);
    doc.text("UserAccount", 14, 51);
    doc.autoTable({
      head: [Object.keys(parsedData[0])],
      body: tableData,
      startY: 60,
    });
    // doc.setDrawColor("UserList.pdf");
    // doc.setFont("UserList.pdf");

    // doc.addImage("UserList.pdf");
    // doc.setLanguage("UserList.pdf");
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
    // debugger;
    // const doc = new jsPDF("landscape", "mm", "a4", false);
    // const contentWidth = doc.internal.pageSize.getWidth();
    // const contentHeight = doc.internal.pageSize.getHeight();
    // // const tableHeight = this.gridApi.getRowHeight();
    // // console.log(tableHeight);
    // const tableWidth = contentWidth;
    // const tableX = 10;
    // const tableY = 10;
    // const data1 = this.gridApi.getDataAsCsv({
    //   processCellCallback: this.processCell,
    // });

    // const lines = data1.split("\n");
    // const header = lines[0].split(",");
    // const data = [];

    // for (let i = 1; i < lines.length; i++) {
    //   const line = lines[i].split(",");
    //   data.push(line);
    // }

    // doc.text("User_Account  ", 10, 10);

    // const columns = header;
    // const rows = data;

    // doc.autoTable({
    //   head: [columns],
    //   body: rows,
    //   startY: 20,
    // });

    // doc.save("userlist.pdf");
  };
  processCell = params => {
    // console.log(params);
    // Customize cell content as needed
    return params.value;
  };

  convertCsvToExcel(csvData) {
    return new Promise(resolve => {
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

  exportToExcel = async e => {
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
      complete: result => {
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
      complete: result => {
        const rows = result.data;

        // Create XML
        let xmlString = "<root>\n";

        rows.forEach(row => {
          xmlString += "  <row>\n";
          row.forEach((cell, index) => {
            xmlString += `    <field${index + 1}>${cell}</field${index + 1}>\n`;
          });
          xmlString += "  </row>\n";
        });

        xmlString += "</root>";

        // setXmlData(xmlString);

        // Create a download link
        const blob = new Blob([xmlString], { type: "text/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.xml";
        link.click();
      },
    });
  };
  handleChangeView = e => {
    e.preventDefault();
    this.setState({ columnDefs: this.state.SelectedcolumnDefs });
    this.toggleModal();
  };

  render() {
    const {
      rowData,
      columnDefs,
      defaultColDef,
      SelectedcolumnDefs,
      isOpen,
      AllcolumnDefs,
    } = this.state;
    return (
      <>
        {/* <ExcelReader /> */}
        <Row className="app-user-list">
          {this.state.EditOneUserView && this.state.EditOneUserView ? (
            <Row className="card">
              <Col>
                <div className="d-flex justify-content-end p-1">
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ EditOneUserView: false });
                    }}
                    color="danger"
                  >
                    Back
                  </Button>
                </div>
              </Col>

              <EditAccount EditOneData={this.state.EditOneData} />
            </Row>
          ) : (
            <>
              {this.state.ViewOneUserView && this.state.ViewOneUserView ? (
                <>
                  <Row className="card">
                    <Col>
                      <div className="d-flex justify-content-end p-1">
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            this.setState({ ViewOneUserView: false });
                          }}
                          color="danger"
                        >
                          Back
                        </Button>
                      </div>
                    </Col>
                    <ViewAccount ViewOneData={this.state.ViewOneData} />
                  </Row>
                </>
              ) : (
                <>
                  <Col sm="12">
                    <Card>
                      <Row className="m-2">
                        <Col>
                          <h1 className="float-left">User List</h1>
                        </Col>
                        <Col>
                          <span className="mx-1">
                            <FaFilter
                              style={{ cursor: "pointer" }}
                              title="filter coloumn"
                              size="30px"
                              onClick={e => {
                                e.preventDefault();
                                this.toggleModal();
                              }}
                              color="blue"
                              className="float-right"
                            />
                          </span>
                          <span className="mx-1">
                            <div className="dropdown-container float-right">
                              <BsCloudDownloadFill
                                style={{ cursor: "pointer" }}
                                title="download file"
                                size="30px"
                                className="dropdown-button "
                                color="blue"
                                onClick={this.toggleDropdown}
                              />
                              {isOpen && (
                                <div
                                  style={{
                                    position: "absolute",
                                    zIndex: "1",
                                  }}
                                  className="dropdown-content dropdownmy"
                                >
                                  <h5
                                    onClick={() => this.exportToPDF()}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive mt-1"
                                  >
                                    .PDF
                                  </h5>
                                  <h5
                                    onClick={() =>
                                      this.gridApi.exportDataAsCsv()
                                    }
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive"
                                  >
                                    .CSV
                                  </h5>
                                  <h5
                                    onClick={this.convertCSVtoExcel}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive"
                                  >
                                    .XLS
                                  </h5>
                                  <h5
                                    onClick={this.exportToExcel}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive"
                                  >
                                    .XLSX
                                  </h5>
                                  <h5
                                    onClick={() => this.convertCsvToXml()}
                                    style={{ cursor: "pointer" }}
                                    className=" mx-1 myactive"
                                  >
                                    .XML
                                  </h5>
                                </div>
                              )}
                            </div>
                          </span>
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
                              <div className="d-flex flex-wrap justify-content-end mb-1">
                                <div className="table-input mr-1">
                                  <Input
                                    placeholder="search Item here..."
                                    onChange={e =>
                                      this.updateSearchQuery(e.target.value)
                                    }
                                    value={this.state.value}
                                  />
                                </div>
                              </div>
                            </div>
                            <ContextLayout.Consumer className="ag-theme-alpine">
                              {context => (
                                <AgGridReact
                                  id="myAgGrid"
                                  gridOptions={{
                                    domLayout: "autoHeight", // or other layout options
                                  }}
                                  // gridOptions={this.gridOptions}
                                  rowSelection="multiple"
                                  defaultColDef={defaultColDef}
                                  columnDefs={columnDefs}
                                  rowData={rowData}
                                  onGridReady={params => {
                                    this.gridApi = params.api;
                                    this.gridColumnApi = params.columnApi;
                                    this.gridRef.current = params.api;
                                  }}
                                  // onGridReady={this.onGridReady}
                                  colResizeDefault={"shift"}
                                  animateRows={true}
                                  floatingFilter={false}
                                  pagination={true}
                                  paginationPageSize={
                                    this.state.paginationPageSize
                                  }
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
                    </Card>
                  </Col>
                </>
              )}
            </>
          )}
        </Row>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}
        >
          <ModalHeader toggle={this.toggleModal}>Change Fileds</ModalHeader>
          <ModalBody className="modalbodyhead">
            <Row>
              <Col lg="4" md="4" sm="12" xl="4" xs="12">
                <h4>Columns</h4>
                <div className="mainshffling">
                  <div class="ex1">
                    {AllcolumnDefs &&
                      AllcolumnDefs?.map((ele, i) => {
                        return (
                          <>
                            <div
                              onClick={e => this.handleChangeHeader(e, ele, i)}
                              key={i}
                              className="mycustomtag mt-1"
                            >
                              <span className="mt-1">
                                <h5
                                  style={{ cursor: "pointer" }}
                                  className="allfields"
                                >
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
                      onClick={() =>
                        this.setState({
                          SelectedcolumnDefs: SelectedCols,
                        })
                      }
                      className="arrowassign"
                      size="30px"
                    />
                  </div>
                  <div style={{ cursor: "pointer" }} className="my-2">
                    <FaArrowAltCircleLeft
                      onClick={() =>
                        this.setState({
                          SelectedcolumnDefs: SelectedCols,
                        })
                      }
                      className="arrowassign"
                      size="30px"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6" md="6" sm="12" xl="6" xs="12">
                <Row>
                  <Col lg="8" md="8" sm="12" xs="12">
                    <h4>Selected Columns</h4>
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
                                      className="allfields"
                                    >
                                      <IoMdRemoveCircleOutline
                                        onClick={() => {
                                          const delindex =
                                            SelectedCols.findIndex(
                                              element =>
                                                element?.headerName ===
                                                ele?.headerName
                                            );

                                          SelectedCols?.splice(delindex, 1);
                                          this.setState({
                                            SelectedcolumnDefs: SelectedCols,
                                          });
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
                          onClick={() => this.shiftElementUp()}
                        />
                      </div>
                      <div>
                        <BsFillArrowDownSquareFill
                          onClick={() => this.shiftElementDown()}
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
                  <Button
                    onClick={e => this.handleChangeView(e)}
                    color="primary"
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default OrderOne;

// import React from "react";
// import * as Icon from "react-feather";
// import {
//   Card,
//   CardBody,
//   Input,
//   Label,
//   Row,
//   CustomInput,
//   Col,
//   Form,
//   UncontrolledButtonDropdown,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   FormGroup,
//   ButtonDropdown,
// } from "reactstrap";
// import "../../../../assets/css/main.css";
// import axiosConfig from "../../../../axiosConfig";
// import { ContextLayout } from "../../../../utility/context/Layout";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import { Eye, Trash2, ChevronDown, Edit } from "react-feather";
// import { history } from "../../../../history";
// import { ToWords } from "to-words";
// import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
// import "../../../../assets/scss/pages/users.scss";
// import swal from "sweetalert";
// import AnalyticsDashboard from "../../../dashboard/analytics/AnalyticsDashboard";
// import { Route, Link } from "react-router-dom";
// import { AiOutlineDownload } from "react-icons/ai";
// import InvoiceGenerator from "../subcategory/InvoiceGenerator1";
// import { TbPhysotherapist } from "react-icons/tb";

// const toWords = new ToWords({
//   localeCode: "en-IN",
//   converterOptions: {
//     currency: true,
//     ignoreDecimal: false,
//     ignoreZeroCurrency: false,
//     doNotAddOnly: false,
//     currencyOptions: {
//       name: "Rupee",
//       plural: "Rupees",
//       symbol: "₹",
//       fractionalUnit: {
//         name: "Paisa",
//         plural: "Paise",
//         symbol: "",
//       },
//     },
//   },
// });
// class OrderOne extends React.Component {
//   state = {
//     modal: false,
//     PrintData: {},
//   };

//   state = {
//     rowData: [],
//     Viewpermisson: null,
//     Editpermisson: null,
//     Createpermisson: null,
//     Deletepermisson: null,
//     paginationPageSize: 20,
//     currenPageSize: "",
//     getPageSize: "",
//     info: true,
//     ViewBill: true,
//     wordsNumber: "",
//     sgst: "",
//     cgst: "",
//     otherCharges: "",
//     deliveryCharges: "",
//     defaultColDef: {
//       sortable: true,
//       resizable: true,
//       suppressMenu: true,
//     },
//     columnDefs: [
//       {
//         headerName: "Order Id ",
//         field: "order_id",
//         filter: true,
//         resizable: true,
//         width: 150,
//         cellRendererFramework: params => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div>
//                 <span>{params?.data?.order_id}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Entry Type",
//         field: "Entry Type",
//         filter: true,
//         width: 160,
//         cellRendererFramework: params => {
//           return params.data?.order_status === "Completed" ? (
//             <div className="badge badge-pill badge-success">Completed</div>
//           ) : params.data?.order_status === "Pending" ? (
//             <div className="badge badge-pill badge-warning">
//               {params.data?.order_status}
//             </div>
//           ) : params.data?.order_status === "Rejected" ? (
//             <div className="badge badge-pill bg-primary">Rejected</div>
//           ) : params.data?.order_status === "Cancelled" ? (
//             <div className="badge badge-pill bg-danger">
//               {params.data.order_status}
//             </div>
//           ) : params.data?.order_status === "Approved" ? (
//             <div className="badge badge-pill bg-success">Approved</div>
//           ) : null;
//         },
//       },
//       {
//         headerName: "Entry",
//         field: "Entry",
//         filter: true,
//         resizable: true,
//         width: 150,
//         cellRendererFramework: params => {
//           return (
//             <div className="d-flex align-items-center justify-content-center cursor-pointer">
//               <div>
//                 <span>
//                   <AiOutlineDownload
//                     onClick={() => this.handleBillDownload(params?.data)}
//                     fill="green"
//                     size="30px"
//                   />
//                 </span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Status",
//         field: "Status",
//         filter: true,
//         resizable: true,
//         width: 150,
//         cellRendererFramework: params => {
//           return (
//             <div className="d-flex align-items-center justify-content-center cursor-pointer">
//               <div>
//                 <span>
//                   <AiOutlineDownload
//                     onClick={() => this.handleBillDownload(params?.data)}
//                     fill="green"
//                     size="30px"
//                   />
//                 </span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Message",
//         field: "Message",
//         filter: true,
//         resizable: true,
//         width: 150,
//         cellRendererFramework: params => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div>
//                 <span>{params.data?.supplier_name}</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Sent Date",
//         field: "SentDate",
//         filter: true,
//         resizable: true,
//         width: 150,
//         cellRendererFramework: params => {
//           return (
//             <div className="d-flex align-items-center cursor-pointer">
//               <div>
//                 <span>{params.data?.order_date}</span>
//               </div>
//             </div>
//           );
//         },
//       },

//       {
//         headerName: "Actions",
//         field: "sortorder",
//         field: "transactions",
//         width: 120,
//         cellRendererFramework: params => {
//           return (
//             <div className="actions cursor-pointer">
//               {/* {this.state.Viewpermisson && ( */}
//               <Route
//                 render={({ history }) => (
//                   <Eye
//                     className="mr-50"
//                     size="25px"
//                     color="green"
//                     onClick={() =>
//                       history.push(
//                         `/app/freshlist/order/editplaceorder/${params.data?.order_id}`
//                       )
//                     }
//                   />
//                 )}
//               />
//               {/* )} */}

//               {/* {this.state.Deletepermisson && ( */}
//               <Route
//                 render={() => (
//                   <Trash2
//                     className="mr-50"
//                     size="25px"
//                     color="red"
//                     onClick={() => {
//                       let selectedData = this.gridApi.getSelectedRows();
//                       this.runthisfunction(params.data.id);
//                       this.gridApi.updateRowData({ remove: selectedData });
//                     }}
//                   />
//                 )}
//               />
//               {/* )} */}
//             </div>
//           );
//         },
//       },
//     ],
//   };
//   handleSwitchChange = () => {
//     return swal("Success!", "Submitted SuccessFully!", "success");
//   };

//   handleBillDownload = data => {
//     console.log(data.sub_total);
//     this.setState({ PrintData: data });
//     const toWords = new ToWords();
//     let words = toWords.convert(Number(data.sub_total), { currency: true });
//     this.setState({ wordsNumber: words });
//     console.log(words);
//     this.toggleModal();
//   };
//   toggleModal = () => {
//     this.setState(prevState => ({
//       modal: !prevState.modal,
//     }));
//   };

//   async componentDidMount() {
//     let { id } = this.props.match.params;
//     // console.log(id);

//     let pageparmission = JSON.parse(localStorage.getItem("userData"));

//     const formdata = new FormData();
//     formdata.append("user_id", pageparmission?.Userinfo?.id);
//     formdata.append("role", pageparmission?.Userinfo?.role);
//     // await axiosConfig
//     //   .post(`/orderlist`, formdata)
//     //   .then(res => {
//     //     // console.log(res.data.data);
//     //     let rowData = res?.data?.data;
//     //     this.setState({ rowData });
//     //   })
//     //   .catch(err => {
//     //     console.log(err?.response);
//     //   });

//     let newparmisson = pageparmission?.role?.find(
//       value => value?.pageName === "Place Order"
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
//   }

//   async runthisfunction(id) {
//     await axiosConfig.delete(`/admin/del_order/${id}`).then(response => {
//       swal("Row Deleted!", "SuccessFull Deleted!", "error");
//       console.log(response);
//     });
//   }
//   onGridReady = params => {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;
//     this.setState({
//       currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
//       getPageSize: this.gridApi.paginationGetPageSize(),
//       totalPages: this.gridApi.paginationGetTotalPages(),
//     });
//   };
//   updateSearchQuery = val => {
//     this.gridApi.setQuickFilter(val);
//   };

//   filterSize = val => {
//     if (this.gridApi) {
//       this.gridApi.paginationSetPageSize(Number(val));
//       this.setState({
//         currenPageSize: val,
//         getPageSize: val,
//       });
//     }
//   };
//   onChangeHandler = event => {
//     this.setState({ selectedFile: event.target.files[0] });
//     this.setState({ selectedName: event.target.files[0].name });
//     console.log(event.target.files[0]);
//   };
//   onChangeHandler = event => {
//     this.setState({ selectedFile: event.target.files });
//     this.setState({ selectedName: event.target.files.name });
//     console.log(event.target.files);
//   };
//   changeHandler1 = e => {
//     this.setState({ status: e.target.value });
//   };
//   changeHandler = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   submitHandler = e => {
//     e.preventDefault();
//   };
//   handleSubmit = () => {
//     this.setState({ ViewBill: true });
//   };

//   render() {
//     const { rowData, columnDefs, defaultColDef } = this.state;
//     return (
//       <Row className="app-user-list">
//         <Col sm="12">
//           <Card>
//             <Row className="m-2">
//               <Col>
//                 <h1 col-sm-6 className="float-left">
//                   <Icon.Bell size={40} color="#055761" className="mr-1" />
//                   Alerts
//                 </h1>
//               </Col>
//               <Col>
//                 <FormGroup check inline>
//                   <Label check>
//                     <Input type="checkbox" defaultChecked /> Filter Unread
//                   </Label>
//                 </FormGroup>
//               </Col>

//               <Col lg="2" md="4">
//                 <FormGroup>
//                   <Label>More</Label>
//                   <CustomInput
//                     required
//                     type="select"
//                     // name={
//                     //   dropdownValue.CreateAccount?.MyDropdown?.dropdown?.name
//                     //     ?._text
//                     // }
//                     // value={
//                     //   formData[
//                     //     dropdownValue.CreateAccount?.MyDropdown?.dropdown?.name
//                     //       ?._text
//                     //   ]
//                     // }
//                     // onChange={handleInputChange}
//                   >
//                     <option value="">Abc </option>
//                     <option value="">abc </option>
//                     <option value="">Abc 2</option>
//                   </CustomInput>
//                 </FormGroup>
//               </Col>
//             </Row>
//             <CardBody>
//               {this.state.rowData === null ? null : (
//                 <div className="ag-theme-material w-100 my-2 ag-grid-table">
//                   <div className="d-flex flex-wrap justify-content-between align-items-center">
//                     <div className="mb-1">
//                       <UncontrolledDropdown className="p-1 ag-dropdown">
//                         <DropdownToggle tag="div">
//                           {this.gridApi
//                             ? this.state.currenPageSize
//                             : "" * this.state.getPageSize -
//                               (this.state.getPageSize - 1)}
//                           -
//                           {this.state.rowData.length -
//                             this.state.currenPageSize * this.state.getPageSize >
//                           0
//                             ? this.state.currenPageSize * this.state.getPageSize
//                             : this.state.rowData.length}
//                           of {this.state.rowData.length}
//                           <ChevronDown className="ml-50" size={15} />
//                         </DropdownToggle>
//                         <DropdownMenu right>
//                           <DropdownItem
//                             tag="div"
//                             onClick={() => this.filterSize(20)}
//                           >
//                             20
//                           </DropdownItem>
//                           <DropdownItem
//                             tag="div"
//                             onClick={() => this.filterSize(50)}
//                           >
//                             50
//                           </DropdownItem>
//                           <DropdownItem
//                             tag="div"
//                             onClick={() => this.filterSize(100)}
//                           >
//                             100
//                           </DropdownItem>
//                           <DropdownItem
//                             tag="div"
//                             onClick={() => this.filterSize(134)}
//                           >
//                             134
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </div>
//                     <div className="d-flex flex-wrap justify-content-between mb-1">
//                       <div className="table-input mr-1">
//                         <Input
//                           placeholder="Search here..."
//                           onChange={e => this.updateSearchQuery(e.target.value)}
//                           value={this.state.value}
//                         />
//                       </div>

//                       <div className="export-btn">
//                         <Button.Ripple
//                           color="primary"
//                           onClick={() => this.gridApi.exportDataAsCsv()}
//                         >
//                           Export as CSV
//                         </Button.Ripple>
//                       </div>
//                     </div>
//                   </div>
//                   <ContextLayout.Consumer>
//                     {context => (
//                       <AgGridReact
//                         gridOptions={{}}
//                         rowSelection="multiple"
//                         defaultColDef={defaultColDef}
//                         columnDefs={columnDefs}
//                         rowData={rowData}
//                         onGridReady={this.onGridReady}
//                         colResizeDefault={"shift"}
//                         animateRows={true}
//                         floatingFilter={false}
//                         pagination={true}
//                         paginationPageSize={this.state.paginationPageSize}
//                         pivotPanelShow="always"
//                         enableRtl={context.state.direction === "rtl"}
//                       />
//                     )}
//                   </ContextLayout.Consumer>
//                 </div>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//         <Modal
//           isOpen={this.state.modal}
//           toggle={this.toggleModal}
//           className={this.props.className}
//           style={{ maxWidth: "1050px" }}
//         >
//           <ModalHeader toggle={this.toggleModal}>Download Bill</ModalHeader>
//           <ModalBody>
//             {this.state.ViewBill && this.state.ViewBill ? (
//               <>
//                 <div style={{ width: "100%" }} className="">
//                   <InvoiceGenerator
//                     sgst={this.state.sgst}
//                     cgst={this.state.cgst}
//                     deliveryCharges={this.state.deliveryCharges}
//                     otherCharges={this.state.otherCharges}
//                     PrintData={this.state.PrintData}
//                     wordsNumber={this.state.wordsNumber}
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div style={{ width: "100%" }} className="">
//                   <Form onSubmit={() => this.handleSubmit()}>
//                     <Row>
//                       <Col lg="6" className="mb-2">
//                         <Label>SGST</Label>
//                         <Input
//                           required
//                           type="number"
//                           name="sgst"
//                           placeholder="Enter SGST"
//                           value={this.state.sgst}
//                           onChange={this.changeHandler}
//                         ></Input>
//                       </Col>
//                       <Col lg="6" className="mb-2">
//                         <Label>CGST</Label>
//                         <Input
//                           required
//                           type="number"
//                           name="cgst"
//                           placeholder="Enter CGST"
//                           value={this.state.cgst}
//                           onChange={this.changeHandler}
//                         ></Input>
//                       </Col>
//                       <Col lg="6">
//                         <Label>Other Charges</Label>
//                         <Input
//                           type="number"
//                           name="otherCharges"
//                           placeholder="Enter Other Charges"
//                           value={this.state.otherCharges}
//                           onChange={this.changeHandler}
//                         ></Input>
//                       </Col>
//                       <Col lg="6">
//                         <Label>Delivery Charges</Label>
//                         <Input
//                           type="number"
//                           name="deliveryCharges"
//                           placeholder="Enter Delivery Charges"
//                           value={this.state.deliveryCharges}
//                           onChange={this.changeHandler}
//                         ></Input>
//                       </Col>
//                       <Col lg="3" className="mt-2">
//                         <Button color="primary" type="submit">
//                           Submit
//                         </Button>
//                       </Col>
//                     </Row>
//                   </Form>
//                 </div>
//               </>
//             )}
//           </ModalBody>
//         </Modal>
//       </Row>
//     );
//   }
// }
// export default OrderOne;
