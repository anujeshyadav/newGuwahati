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
  Badge,
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
import swal from "sweetalert";

class ProductDashboard extends React.Component {
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
      // editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "UID",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        // checkboxSelection: true,
        width: 80,
        filter: true,
      },

      {
        headerName: "Image",
        field: "product_images",
        filter: "agSetColumnFilter",
        width: 140,
        cellRendererFramework: (params) => {
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
                  "No Image"
                )}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Brand",
        field: "brand_name",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.brand_name}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Type",
        field: "product_type",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.product_type}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Product",
        field: "title",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.title}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "category",
        field: "category_name",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.category_name}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Description",
        field: "description",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{ReactHtmlParser(params.data?.description)}</span>
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
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <Badge color="success">{params.data?.price}</Badge>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "DiscountPrice",
        field: "discountprice",
        filter: "agSetColumnFilter",
        width: 140,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.discountprice}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Shipping Fee",
        field: "shipping_fee",
        filter: "agSetColumnFilter",
        width: 140,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.shipping_fee}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Tax Rate",
        field: "tax_rate",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.tax_rate}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Tags",
        field: "tags",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.tags}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "STOCK",
        field: "stock",

        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>
                  {params.data?.stock ? (
                    <> {ReactHtmlParser(params.data?.stock)}</>
                  ) : (
                    <>N/A</>
                  )}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Created ",
        field: "created_date",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>
                  {ReactHtmlParser(params.data?.created_date?.split(" ")[0])}
                </span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "SALES",
      //   field: "pisces",
      //   filter: "agSetColumnFilter",
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div className="">
      //           <span>{ReactHtmlParser(params.data.pisces)}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "Actions",
        field: "transactions",
        width: 180,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              {/* {this.state.Viewpermisson && (
                <Eye
                  className="mr-50"
                  size="25px"
                  color="green"
                  onClick={() =>
                    history.push(
                      `/app/freshlist/order/viewAll/${params.data.id}`
                    )
                  }
                />
              )} */}
              {this.state.Editpermisson && (
                <Edit
                  className="mr-50"
                  size="25px"
                  color="blue"
                  onClick={() => {
                    localStorage.setItem(
                      "EditProduct",
                      JSON.stringify(params.data)
                    );
                    this.props.history.push({
                      pathname: `/app/freshlist/house/editmyproduct/${params.data?.id}`,
                      state: params.data,
                    });
                  }}
                />
              )}
              {this.state.Deletepermisson && (
                <Trash2
                  className="mr-50"
                  size="25px"
                  color="Red"
                  onClick={() => {
                    // let selectedData = this.gridApi.getSelectedRows();

                    this.runthisfunction(params.data?.id);
                    // this.gridApi.updateRowData({ remove: selectedData });
                  }}
                />
              )}
            </div>
          );
        },
      },
    ],
  };

  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Product List"
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
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);

    await axiosConfig
      .post("/productlistapi", formdata)
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

  runthisfunction(id) {
    let selectedData = this.gridApi.getSelectedRows();
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "Cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          let data = new FormData();
          let pageparmission = JSON.parse(localStorage.getItem("userData"));
          data.append("user_id", pageparmission?.Userinfo?.id);
          data.append("role", pageparmission?.Userinfo?.role);
          data.append("tablename", "trupee_product");
          data.append("delete_id", id);
          axiosConfig
            .post("/deleterecord", data)
            .then((resp) => {
              console.log(resp?.data.message);
              if (resp?.data.success) {
                swal("Success", "Product Deleted Successfully");
                this.gridApi.updateRowData({ remove: selectedData });
              }
              if (!resp?.data?.success) {
                console.log("object");
                swal("Error", `${resp?.data.message}`);
              }
            })
            .catch((err) => {
              console.log(err);
              // swal("Somethig Went Wrong");
            });
          break;
        default:
      }
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
        <Row>
          {/* <Col lg="4" md="12">
            <Card
              className="bg-secondary  py-3 "
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "16px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Products
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col>
          <Col lg="4" md="12">
            <Card
              className="bg-secondary  py-3"
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "16px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Categories
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col>
          <Col lg="4" md="12">
            <Card
              className="bg-secondary  py-3"
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "16px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Barnds
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col> */}
        </Row>
        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 col-sm-6 className="float-left">
                    Product Dashboard
                  </h1>
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
      </>
    );
  }
}
export default ProductDashboard;
