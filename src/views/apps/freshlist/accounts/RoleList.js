import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import {
  Card,
  CardBody,
  Input,
  Label,
  Row,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Form,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Badge,
  Spinner,
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
  CreateAccountView,
  Get_RoleList,
  _Delete,
  _Get,
  _GetList,
  _PostSave,
} from "../../../../ApiEndPoint/ApiCalling";
import { FaPlus } from "react-icons/fa";
import { CheckPermission } from "../house/CheckPermission";
import SuperAdminUI from "../../../SuperAdminUi/SuperAdminUI";
import {
  Create_Department,
  Delete_Department,
  List_Department,
  Role_list_by_Master,
} from "../../../../ApiEndPoint/Api";
import DepartmentRoleAssign from "./DepartmentRoleAssign";

class RoleList extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      isOpen: false,
      formValues: [{ DepartmentName: "", Description: "" }],
      modal: false,
      DepartmentName: "",
      InsiderPermissions: {},
      userData: {},
      paginationPageSize: 20,
      Position: 0,
      MasterShow: false,
      DepartmentPresent: false,
      MasterRoleList: false,
      currenPageSize: "",
      getPageSize: "",
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true,
      },
      columnDefs: [
        {
          headerName: "S.No",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          width: 150,
          filter: true,
        },
        {
          headerName: "Role Name",
          field: "roleName",
          filter: true,
          resizable: true,
          width: 160,
          cellRendererFramework: (params) => {
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params?.data?.roleName}</span>
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Role desc",
          field: "desc",
          filter: true,
          resizable: true,
          width: 230,
          cellRendererFramework: (params) => {
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params?.data?.desc}</span>
                </div>
              </div>
            );
          },
        },
        // {
        //   headerName: "Under Department",
        //   field: "desc",
        //   filter: true,
        //   resizable: true,
        //   width: 230,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params?.data?.desc}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },

        {
          headerName: "Actions",
          field: "sortorder",
          field: "transactions",
          width: 200,
          cellRendererFramework: (params) => {
            return (
              <div className="actions cursor-pointer">
                {/* {this.state.InsiderPermissions &&
                this.state.InsiderPermissions.View && (
                  <BsEye
                    className="mr-50"
                    size="25px"
                    color="green"
                    onClick={() =>
                      history.push(
                        `/app/freshlist/account/updateexistingrole/${params.data._id}`
                      )
                    }
                  />
                )} */}

                {this.state.userData &&
                this.state.userData?._id == params?.data?.createdBy?._id ? (
                  <>
                    {this.state.userData?._id ==
                      params?.data?.createdBy?._id && (
                      <>
                        {this.state.InsiderPermissions &&
                          this.state.InsiderPermissions.Edit && (
                            <Route
                              render={({ history }) => (
                                <span
                                  style={{
                                    border: "1px solid white",
                                    padding: "10px",
                                    borderRadius: "30px",
                                    backgroundColor: "rgb(212, 111, 16)",
                                    marginLeft: "3px",
                                  }}>
                                  <FaPencilAlt
                                    className=""
                                    size="20px"
                                    color="white"
                                    onClick={() =>
                                      history.push({
                                        pathname: `/app/freshlist/account/editRole/${params?.data?._id}`,
                                        data: params,
                                      })
                                    }
                                  />
                                </span>
                              )}
                            />
                          )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {this.state.MasterShow && this.state.MasterShow && (
                      <Route
                        render={({ history }) => (
                          <span
                            style={{
                              border: "1px solid white",
                              padding: "10px",
                              borderRadius: "30px",
                              backgroundColor: "rgb(212, 111, 16)",
                              marginLeft: "3px",
                            }}>
                            <FaPencilAlt
                              className=""
                              size="20px"
                              color="white"
                              onClick={() =>
                                history.push({
                                  pathname: `/app/freshlist/account/editRole/${params?.data?._id}`,
                                  data: params,
                                })
                              }
                            />
                          </span>
                        )}
                      />
                    )}
                  </>
                )}

                {/* )} */}
                {/* {this.state.Deletepermisson && (
                <BsTrash
                  className="mr-50"
                  size="25px"
                  color="red"
                  onClick={() => {
                    this.runthisfunction(params.data.id);
                  }}
                />
              )} */}
              </div>
            );
          },
        },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState({
      formValues: [
        ...this.state.formValues,
        { DepartmentName: "", Description: "" },
      ],
    });
  }

  removeFormFields = (data, i) => {
    console.log(data, i);

    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          _Delete(Delete_Department, data?.Id)
            .then((res) => {
              console.log(res);
              let formValues = this.state.formValues;
              formValues.splice(i, 1);
              this.setState({ formValues });
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        default:
      }
    });
  };

  handleSubmit = async (e) => {
    this.setState({ Loading: true });
    e.preventDefault();
    let userinfo = JSON.parse(localStorage.getItem("userData"));
    let alldata = [];
    if (this.state.DepartmentPresent) {
      alldata = this.state.formValues?.map((ele, i) => {
        return {
          departmentName: ele?.DepartmentName,
          departmentDesc: ele?.Description,
          database: userinfo?.database,
          departmentId: ele?.Id ? ele?.Id : null,
          created_by: userinfo?._id,
        };
      });
    } else {
      alldata = this.state.formValues?.map((ele, i) => {
        return {
          departmentName: ele?.DepartmentName,
          departmentDesc: ele?.Description,
          database: userinfo?.database,
          departmentId: ele?.Id ? ele?.Id : null,
          created_by: userinfo?._id,
        };
      });
    }

    let payload = {
      Departments: alldata,
    };

    let URL = Create_Department;
    await _PostSave(URL, payload)
      .then((res) => {
        this.setState({ Loading: false });

        swal("Departments Created");
        localStorage.setItem("CompanyDepartments", JSON.stringify(payload));
      })
      .catch((err) => {
        this.setState({ Loading: false });

        console.log(err);
      });
  };
  handleShowDepartment = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let URL = `${List_Department}/${userData?.database}`;
    _GetList(URL)
      .then((res) => {
        let AllDeparts = res?.Department?.filter(
          (ele) => ele?.status == "Active"
        );
        if (AllDeparts) {
          let values = AllDeparts?.map((ele, i) => {
            return {
              DepartmentName: ele?.departmentName,
              Description: ele?.departmentDesc,
              Id: ele?._id,
            };
          });
          if (values?.length) {
            this.setState({ DepartmentPresent: true });
          }
          this.setState({
            formValues: values,
          });
        }

        //  setDepartMentList(res?.Department[0]?.department);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  async Apicalling(id, db, value) {
    this.setState({ Loading: true });
    if (value) {
      await _Get(Role_list_by_Master, id)
        .then((res) => {
          console.log(res?.Role);
          this.setState({ Loading: false });
          this.setState({ rowData: res?.Role });
        })
        .catch((err) => {
          this.setState({ Loading: false });
          this.setState({ rowData: [] });

          console.log(err);
        });
    } else {
      await Get_RoleList(id, db)
        .then((res) => {
          this.setState({ Loading: false });

          this.setState({ rowData: res?.Role });
        })
        .catch((err) => {
          this.setState({ Loading: false });
          this.setState({ rowData: [] });

          console.log(err);
        });
    }
  }
  async componentDidMount() {
    this.handleShowDepartment();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    this.setState({ Position: pageparmission?.rolename.rank });
    this.setState({ userData: pageparmission });

    if (pageparmission?.rolename?.roleName === "MASTER") {
      this.setState({ MasterShow: true });
      this.setState({ MasterRoleList: true });
    }

    let value = pageparmission?.rolename?.roleName == "MASTER";
    const InsidePermissions = CheckPermission("Create User");

    this.setState({ InsiderPermissions: InsidePermissions });
    await this.Apicalling(pageparmission?._id, pageparmission?.database, value);
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
          const formData = new FormData();
          formData.append("user_id", id);
          this.gridApi.updateRowData({ remove: selectedData });
          axiosConfig.post(`/userdelete`, formData).then((response) => {});
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
  handleParentSubmit = (e) => {
    e.preventDefault();
    this.setState({ MasterRoleList: false });
    let SuperAdmin = JSON.parse(localStorage.getItem("SuperadminIdByMaster"));
    let id = SuperAdmin.split(" ")[0];
    let db = SuperAdmin.split(" ")[1];
    this.Apicalling(id, db, false);
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
    // console.log(this.state.InsiderPermissions);
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <Row className="mt-2 mx-2 mr-2">
              <Col lg="1" md="1" sm="6" xs="12">
                <h3 className="float-left" style={{ fontWeight: "600" }}>
                  Role List
                </h3>
              </Col>
              {this.state.MasterShow ? (
                <Col>
                  <SuperAdminUI
                    onDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleParentSubmit}
                  />
                </Col>
              ) : (
                <>
                  <Col></Col>
                </>
              )}
              {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.Create && (
                  <Col lg="2" md="2" sm="2">
                    <div className="d-flex justify-content-end">
                      <Route
                        render={({ history }) => (
                          <Button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#39cccc",
                              color: "white",
                              fontWeight: "600",
                            }}
                            className=" float-right mb-1"
                            color="#39cccc"
                            onClick={() =>
                              history.push("/app/freshlist/account/addRoleNew")
                            }>
                            <FaPlus size={15} /> Role
                          </Button>
                        )}
                      />
                    </div>
                  </Col>
                )}
              {/* {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.Create && (
                  <Col>
                    <div className="d-flex justify-content-end">
                      <Route
                        render={({ history }) => (
                          <Button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#39cccc",
                              color: "white",
                              fontWeight: "600",
                            }}
                            className=" float-right mb-1"
                            color="#39cccc"
                            onClick={() =>
                              history.push(
                                "/app/Ajgroup/account/AssignToSuperAdmin"
                              )
                            }>
                            Assign To SuperAdmin
                          </Button>
                        )}
                      />
                    </div>
                  </Col>
                )} */}
              {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.Create && (
                  <Col lg="2" sm="2">
                    <div className="d-flex justify-content-end">
                      <Route
                        render={({ history }) => (
                          <Button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#39cccc",
                              color: "white",
                              fontWeight: "600",
                            }}
                            className=" float-right mb-1"
                            color="#39cccc"
                            onClick={() => {
                              history.push(
                                "/app/Ajgroup/account/DepartmentRoleAssign"
                              );
                            }}>
                            Role Assignment
                          </Button>
                        )}
                      />
                    </div>
                  </Col>
                )}
              {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.Create && (
                  <Col lg="2" sm="2">
                    <div className="d-flex justify-content-end">
                      <Route
                        render={({ history }) => (
                          <Button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#39cccc",
                              color: "white",
                              fontWeight: "600",
                            }}
                            className=" float-right mb-1"
                            color="#39cccc"
                            onClick={() => {
                              // history.push("/app/freshlist/account/addRoleNew")
                              this.toggleModal();
                            }}>
                            Department
                          </Button>
                        )}
                      />
                    </div>
                  </Col>
                )}

              {this.state.InsiderPermissions &&
                this.state.InsiderPermissions?.View && (
                  <>
                    {/* {this.state.Position == 1 && ( */}
                    <Col lg="2" sm="2" md="2" ms="12">
                      <Route
                        render={({ history }) => (
                          <Button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#39cccc",
                              color: "white",
                              fontWeight: "600",
                            }}
                            className=" float-right"
                            color="#39cccc"
                            onClick={() =>
                              history.push(
                                "/app/freshlist/account/CreateHeirarchy"
                              )
                            }>
                            View Hierarchy
                          </Button>
                        )}
                      />
                    </Col>
                    {/* )} */}
                  </>
                )}
            </Row>
            {this.state.InsiderPermissions &&
              this.state.InsiderPermissions?.View && (
                <CardBody style={{ marginTop: "-1.5rem" }}>
                  {this.state.rowData === null ? null : (
                    <div className="ag-theme-material w-100 my-1 ag-grid-table">
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
                        <div className="d-flex flex-wrap justify-content-between mb-1">
                          <div className="table-input mr-1">
                            <Input
                              placeholder="Search here..."
                              onChange={(e) =>
                                this.updateSearchQuery(e.target.value)
                              }
                              value={this.state.value}
                            />
                          </div>
                          {this.state.InsiderPermissions &&
                            this.state.InsiderPermissions?.Download && (
                              <div className="export-btn">
                                <Button.Ripple
                                  color="primary"
                                  onClick={() =>
                                    this.gridApi.exportDataAsCsv()
                                  }>
                                  Export as CSV
                                </Button.Ripple>
                              </div>
                            )}
                        </div>
                      </div>
                      {/* <ContextLayout.Consumer className="ag-theme-alpine">
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
                      </ContextLayout.Consumer> */}
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.toggleModal}>Add Department</ModalHeader>
          <ModalBody className="modalbodyhead">
            <div className="d-flex justify-content-center mb-2">
              <b>
                <h3>Create Your Departments</h3>
              </b>
            </div>
            <Form onSubmit={this.handleSubmit}>
              {this.state.formValues?.map((element, index) => (
                <Row key={index}>
                  <Col lg="4" sm="6" md="4" className="mb-2">
                    <Label className="mb-1">Create Department</Label>
                    <Input
                      required
                      placeholder="Department Name"
                      name="DepartmentName"
                      value={element.DepartmentName || ""}
                      onChange={(e) => this.handleChange(index, e)}
                      type="text"
                    />
                  </Col>
                  <Col lg="4" sm="6" md="4" className="mb-2">
                    <Label className="mb-1"> Description</Label>
                    <textarea
                      className="form-control"
                      rows={2}
                      required
                      placeholder="Department Description"
                      name="Description"
                      value={element.Description || ""}
                      onChange={(e) => this.handleChange(index, e)}
                      type="text"
                    />
                  </Col>
                  <Col lg="4" sm="6" md="4" className="">
                    <div className="mt-4">
                      {index ? (
                        <Button
                          color="danger"
                          type="button"
                          className="button remove"
                          onClick={() => this.removeFormFields(element, index)}>
                          Remove
                        </Button>
                      ) : null}

                      <Button
                        color="primary"
                        className="button add ml-1"
                        type="button"
                        onClick={() => this.addFormFields()}>
                        Add
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}

              <div className="d-flex justify-content-center mt-1">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Row>
    );
  }
}
export default RoleList;
