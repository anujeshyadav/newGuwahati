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
} from "reactstrap";
import axios from "axios";
import axiosConfig from "../../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Eye, Trash2, ChevronDown, Edit } from "react-feather";

import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { FaWallet, Facart, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";
import "moment-timezone";
import { Route } from "react-router-dom";

class AssignedList extends React.Component {
  state = {
    product: [],
    rowData: [],
    Viewpermisson: null,
    Editpermisson: null,
    Createpermisson: null,
    Deletepermisson: null,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
  };

  async componentDidMount() {
    let { id } = this.props.match.params;
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Assigned List"
    );

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
    formdata.append("client_id", id);
    formdata.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig
      .post("/product_assign_to_clientlist", formdata)
      .then((response) => {
        this.setState({ rowData: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // await axiosConfig.get("/gettermsconditions").then(response => {
    //   let rowData = response.data.data;
    //   this.setState({ rowData });
    // });
  }

  async runthisfunction(id) {
    let data = new FormData();
    data.append("id", id);
    await axiosConfig
      .post("/deleteproduct", data)
      .then((resp) => {
        console.log(resp);
      })
      .then((response) => {
        console.log(response);
      });
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
      <>
        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h5 col-sm-6 className="float-left">
                    Total Products Assigned to Client
                  </h5>
                </Col>

                {/* <Col>
                  <Route
                    render={({ history }) => (
                      <Button
                        className="float-right"
                        color="primary"
                        onClick={() =>
                          history.push(
                            "/app/freshlist/options/ProductDashboard"
                          )
                        }
                      >
                        Add Type
                      </Button>
                    )}
                  />
                </Col> */}
              </Row>
              <div className="container py-1">
                <Row>
                  <Col lg="3" md="3" sm="3">
                    <h4>Product Name</h4>
                  </Col>
                  <Col lg="3" md="3" sm="3">
                    <h5>Quantity</h5>
                  </Col>
                </Row>
              </div>
              {this.state.rowData &&
                this.state.rowData?.map((ele, index) => (
                  <>
                    <div className="container py-1">
                      <Row>
                        <Col key={index} lg="3" md="3" sm="3">
                          <h4>
                            {index + 1}- {ele?.title}
                          </h4>
                        </Col>
                        <Col key={index} lg="3" md="3" sm="3">
                          <h5>{ele?.qty}</h5>
                        </Col>
                      </Row>
                    </div>
                  </>
                ))}
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default AssignedList;
