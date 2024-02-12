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
} from "reactstrap";
import UserContext from "../../../../context/Context";
import xmlJs from "xml-js";
import axiosConfig from "../../../../axiosConfig";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Eye, Trash2, ChevronDown, Edit, Trash, Edit2 } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import swal from "sweetalert";
import { Route } from "react-router-dom";
import { BsEye, BsTrash } from "react-icons/bs";
import {
  DeletePolicy,
  PolicyGet,
  PolicySearchData,
  PolicyViewData,
} from "../../../../ApiEndPoint/ApiCalling";

class SearchPolicy extends React.Component {
  static contextType = UserContext;

  state = {
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
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [],
  };
  async componentDidMount() {
    PolicyViewData()
      .then((res) => {
        var mydropdownArray = [];
        var adddropdown = [];
        var inputs = [];
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData).Policy);
        // console.log(jsonData);

        let myinputs = JSON.parse(jsonData).Policy?.input;
        var inputs = myinputs?.map((ele) => {
          return {
            headerName: ele?.label?._text,
            field: ele?.name?._text,
            filter: true,
            sortable: true,
          };
        });
        let dropdown = JSON.parse(jsonData).Policy?.MyDropDown;
        if (dropdown?.length) {
          var mydropdownArray = dropdown?.map((ele) => {
            return {
              headerName: ele?.dropdown?.label?._text,
              field: ele?.dropdown?.name?._text,
              filter: true,
              sortable: true,
            };
          });
        } else {
          var adddropdown = [
            {
              headerName: ele?.dropdown?.label?._text,
              field: ele?.dropdown?.name?._text,
              filter: true,
              sortable: true,
            },
          ];
        }

        let myHeadings = [
          // ...checkboxinput,
          ...inputs,
          ...adddropdown,
          // ...addRadio,
          ...mydropdownArray,
        ];
        console.log(myHeadings);
        let Product = [
          {
            headerName: "Actions",
            field: "sortorder",
            field: "transactions",
            width: 190,
            cellRendererFramework: (params) => {
              return (
                <div className="actions cursor-pointer">
                  <Route
                    render={({ history }) => (
                      <Eye
                        className="mr-50"
                        size="25px"
                        color="green"
                        // onClick={() => {
                        //   this.handleChangeEdit(params.data, "readonly");
                        // }}
                      />
                    )}
                  />
                  <Route
                    render={({ history }) => (
                      <Edit
                        className="mr-50"
                        size="25px"
                        color="blue"
                        // onClick={() => {
                        //   this.handleChangeEdit(params.data, "Editable");
                        // }}
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
        PolicyGet()
          .then((response) => {
            console.log(response?.Policy);
            this.setState({ rowData: response?.Policy });
          })
          .catch((err) => {
            console.log(err);
          });

        // this.setState({ AllcolumnDefs: Product });
      })
      .catch((err) => {
        console.log(err);
        // swal("Error", "something went wrong try again");
      });
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Role List"
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
  }

  runthisfunction(id) {
    // console.log(id);
    let selectedData = this.gridApi.getSelectedRows();
    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          DeletePolicy(id)
            .then((res) => {
              this.gridApi.updateRowData({ remove: selectedData });
              console.log(res);
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
  //   onChangeHandler = (event) => {
  //     this.setState({ selectedFile: event.target.files[0] });
  //     this.setState({ selectedName: event.target.files[0].name });
  //     console.log(event.target.files[0]);
  //   };
  //   onChangeHandler = (event) => {
  //     this.setState({ selectedFile: event.target.files });
  //     this.setState({ selectedName: event.target.files.name });
  //     console.log(event.target.files);
  //   };
  //   changeHandler1 = (e) => {
  //     this.setState({ status: e.target.value });
  //   };
  //   changeHandler = (e) => {
  //     this.setState({ [e.target.name]: e.target.value });
  //   };
  //   submitHandler = (e) => {
  //     e.preventDefault();
  //     const data = new FormData();
  //     data.append("banner_title", this.state.banner_title);
  //     data.append("bannertype", this.state.bannertype);
  //     data.append("status", this.state.status);
  //     for (const file of this.state.selectedFile) {
  //       if (this.state.selectedFile !== null) {
  //         data.append("banner_img", file, file.name);
  //       }
  //     }

  //     axiosConfig
  //       .post("/addbanner", data)
  //       .then((response) => {
  //         console.log(response);
  //         swal("Successful!", "You clicked the button!", "success");
  //         this.props.history.push("/app/freshlist/banner/bannerList");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col>
                <h1 className="float-left">Search Policy</h1>
              </Col>
              {/* <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" float-right"
                      color="primary"
                      onClick={() =>
                        history.push("/app/freshlist/refundrequest/addRefund")
                      }
                    >
                      Add Refund
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
                        <DropdownToggle>
                          {this.gridApi
                            ? this.state.currenPageSize
                            : "" * this.state.getPageSize -
                              (this.state.getPageSize - 1)}{" "}
                          -{" "}
                          {this.state.rowData?.length -
                            this.state.currenPageSize * this.state.getPageSize >
                          0
                            ? this.state.currenPageSize * this.state.getPageSize
                            : this.state.rowData?.length}{" "}
                          of {this.state.rowData?.length}
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
    );
  }
}
export default SearchPolicy;
