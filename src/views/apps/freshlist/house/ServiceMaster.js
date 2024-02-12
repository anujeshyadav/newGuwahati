import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardTitle,
  CardText,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Trash2, ChevronDown } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import Moment from "react-moment";
import { FaWallet, Facart, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";
import "moment-timezone";
import { Route } from "react-router-dom";

class ServiceMaster extends React.Component {
  state = {
    rowData: [],
    modal: false,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "UID",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        checkboxSelection: true,
        width: 150,
        filter: true,
      },

      {
        headerName: "ITEM NAME",
        field: "itemname",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>vcvvv</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "ITEM CATEGORY",
        field: "category",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                {/* <span>{ReactHtmlParser(params.data.volume)}</span> */}
                <span>vdfgvdfv</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "CURRENT STOCK",
        field: "currentstock",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "UNIT",
        field: "UNIT",

        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "PRICE",
        field: "price",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },

      {
        headerName: "TYPE",
        field: "pisces",

        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "TAX",
        field: "tax",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },

      {
        headerName: "MIN STOCK LEVEL",
        field: "minstocklevel",

        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "STOCK STATUS",
        field: "stockstatus",

        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "MAX STOCK LEVEL",
        field: "maxstocklevel",

        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: params => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data.pisces)}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Actions",
        field: "transactions",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="actions cursor-pointer">
              <Trash2
                className="mr-50"
                size="25px"
                color="Red"
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.runthisfunction(params.data._id);
                  this.gridApi.updateRowData({ remove: selectedData });
                }}
              />
            </div>
          );
        },
      },
    ],
  };
  toggle = () => {
    // this.setState({ modal: !modal });
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };
  async componentDidMount() {
    await axiosConfig.get("/gettermsconditions").then(response => {
      let rowData = response.data.data;
      this.setState({ rowData });
    });
  }

  async runthisfunction(id) {
    console.log(id);
    await axiosConfig.get(`/deltermcondition/${id}`).then(response => {
      console.log(response);
    });
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
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <>
        <Row className="m-2">
          <Col>
            <h1 col-sm-6 className="float-left">
              Service Master
            </h1>
          </Col>
          <Col>
            <Route
              render={({ history }) => (
                <Button
                  className="float-right"
                  color="primary"
                  onClick={this.toggle}
                >
                  Add Single Item
                </Button>
              )}
            />
          </Col>
        </Row>
        <Row className="app-user-list pt-1">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="pt-1 mx-1">
                <Col lg="3" md="3" className="mb-1 ">
                  <Label>SHOW BY</Label>
                  <Input
                    required
                    type="select"
                    name="weight"
                    placeholder="Enter Iden Type"
                    // value={this.state.weight}
                    // onChange={this.changeHandler}
                  >
                    <option value="12ROW">12 ROW</option>
                    <option value="24ROW">24 ROW</option>
                    <option value="36ROW">36 ROW</option>
                  </Input>
                </Col>
                <Col lg="3" md="3" className="mb-1">
                  <Label>STATUS BY</Label>
                  <Input
                    required
                    type="select"
                    name="weight"
                    placeholder="Enter Iden Type"
                    // value={this.state.weight}
                    // onChange={this.changeHandler}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Dispatch">Dispatch</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Refuse">Refuse</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="NotPaid">NotPaid</option>
                    <option value="Other">Other</option>
                  </Input>
                </Col>
                <Col lg="3" md="3" className="mb-1">
                  <Label>ISSUED BY</Label>
                  <Input
                    required
                    type="date"
                    name="issues"
                    // value={this.state.weight}
                    // onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="3" md="3" className="mb-1">
                  <Label>SEARCH BY</Label>
                  <Input
                    required
                    type="text"
                    name="search"
                    placeholder="Enter id/nama.email"
                    // value={this.state.weight}
                    // onChange={this.changeHandler}
                  ></Input>
                </Col>
              </Row>
              <Row className="m-2">
                <Col>
                  <h1>ServiceMater List</h1>
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
                      <div className="d-flex flex-wrap justify-content-between mb-1">
                        <div className="table-input mr-1">
                          <Input
                            placeholder="search..."
                            onChange={e =>
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
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Item Id</Label>
                  <Input
                    type="text"
                    placeholder="Item Id"
                    name="title"
                    // bsSize="lg"
                    //   value={this.state.category_name}
                    //   onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Item Number</Label>
                  <Input
                    type="number"
                    placeholder="Item Number"
                    name="title"
                    // bsSize="lg"
                    //   value={this.state.category_name}
                    //   onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6" className="mb-1 ">
                <Label>Product Service</Label>
                <Input
                  required
                  type="select"
                  name="weight"
                  placeholder="Enter Iden Type"
                  // value={this.state.weight}
                  // onChange={this.changeHandler}
                >
                  <option value="12ROW">Select Option</option>
                  <option value="12ROW">Product</option>
                  <option value="24ROW">Services</option>
                </Input>
              </Col>
              <Col lg="6" md="6" className="mb-1 ">
                <Label>Buy/Sell/Both</Label>
                <Input
                  required
                  type="select"
                  name="weight"
                  placeholder="Enter Iden Type"
                  // value={this.state.weight}
                  // onChange={this.changeHandler}
                >
                  <option value="">Select Option</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                  <option value="Both">Both</option>
                </Input>
              </Col>
              <Col lg="6" md="6" className="mb-1 ">
                <Label>Unit Of Measurement</Label>
                <Input
                  required
                  type="select"
                  name="weight"
                  placeholder="Enter Iden Type"
                  // value={this.state.weight}
                  // onChange={this.changeHandler}
                >
                  <option value="">Select Option</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Pieces</option>
                  <option value="Both">Box</option>
                  <option value="Sell">Reams</option>
                  <option value="Both">Packs</option>
                  <option value="Both">Kgs</option>
                  <option value="Both">Size</option>
                  <option value="Both">Mtr</option>
                </Input>
              </Col>
              <Col lg="6" md="6" className="mb-1 ">
                <Label>Item Category</Label>
                <Input
                  required
                  type="select"
                  name="weight"
                  placeholder="Enter Iden Type"
                  // value={this.state.weight}
                  // onChange={this.changeHandler}
                >
                  <option value="">Select Option</option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                </Input>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Current Stock</Label>
                  <Input
                    type="number"
                    placeholder="Current Stock"
                    name="title"
                    // bsSize="lg"
                    //   value={this.state.category_name}
                    //   onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    name="title"
                    // bsSize="lg"
                    //   value={this.state.category_name}
                    //   onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Item Id</Label>
                  <Input
                    type="text"
                    placeholder="Item Id"
                    name="title"
                    // bsSize="lg"
                    //   value={this.state.category_name}
                    //   onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>HSN Code</Label>
                  <Input
                    type="text"
                    placeholder="HSN Code"
                    name="title"
                    // bsSize="lg"
                    //   value={this.state.category_name}
                    //   onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="6" className="mb-1 ">
                <Label>Tax</Label>
                <Input
                  required
                  type="select"
                  name="weight"
                  placeholder="Enter Iden Type"
                  // value={this.state.weight}
                  // onChange={this.changeHandler}
                >
                  <option value="">Select Option</option>
                  <option value="0.25%">0.25%</option>
                  <option value="0.5%">0.5%</option>
                  <option value="1%">1%</option>
                  <option value="3%">3%</option>
                  <option value="5%">5%</option>
                  <option value="12%">12%</option>
                  <option value="15%">15%</option>
                  <option value="18%">18%</option>
                  <option value="28%">28%</option>
                </Input>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default ServiceMaster;
