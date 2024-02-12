import React from "react";
import {
    Card, CardBody, Input, Row, Col, Button, UncontrolledDropdown,
    DropdownMenu, DropdownItem, DropdownToggle,
} from "reactstrap";
// import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import DealList from "./DealList";

class FeatureDeal extends React.Component {
    state = {
        rowData: [],
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
                headerName: "S.No",
                valueGetter: "node.rowIndex + 1",
                field: "node.rowIndex + 1",
                width: 150,
                filter: true,
            },
            {
                headerName: "Title",
                field: "customerId",
                filter: true,
                width: 200,
                cellRendererFramework: (params) => {
                    return (
                        <div>
                            <span>{params.data.customerId}</span>
                        </div>
                    );
                },
            },

            {
                headerName: "Start Date",
                field: "mobile",
                filter: true,
                width: 200,
                cellRendererFramework: (params) => {
                    return (
                        <div>
                            <span>{params.data.mobile}</span>
                        </div>
                    );
                },
            },
            {
                headerName: "End Date",
                field: "mobile",
                filter: true,
                width: 200,
                cellRendererFramework: (params) => {
                    return (
                        <div>
                            <span>{params.data.mobile}</span>
                        </div>
                    );
                },
            },
            {
                headerName: "Status",
                field: "status",
                filter: true,
                width: 150,
                cellRendererFramework: (params) => {
                    return params.value === "Block" ? (
                        <div className="badge badge-pill badge-success">
                            {params.data.status}
                        </div>
                    ) : params.value === "Unblock" ? (
                        <div className="badge badge-pill badge-warning">
                            {params.data.status}
                        </div>
                    ) : null;
                },
            },

            {
                headerName: "Actions",
                field: "sortorder",
                field: "transactions",
                width: 100,
                cellRendererFramework: (params) => {
                    return (
                        <div className="actions cursor-pointer">
                            <Edit
                                className="mr-50"
                                size="25px"
                                color="blue"
                                onClick={() => history.push("/app/freshlist/featuredeal/editFeatureDeal")}
                            />
                            <Trash2
                                className="mr-50"
                                size="25px"
                                color="red"
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
    async componentDidMount() {
        await axios.get(``)
            .then((response) => {
                let rowData = response.data.data;
                console.log(rowData);
                this.setState({ rowData });
            });
    }
    async componentDidMount() {
        await axios
            .get("http://35.154.86.59/api/user/allcustomer")
            .then((response) => {
                let rowData = response.data.data;
                console.log(rowData);
                this.setState({ rowData });
            });
    }
    async componentDidMount() {
        let { id } = this.props.match.params;
        await axios
            .get(``, {
                headers: {
                    "auth-adtoken": localStorage.getItem("auth-adtoken"),
                },
            })
    }
    async runthisfunction(id) {
        console.log(id);
        await axios.get(``).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
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
            console.log(rowData),
            (
                <Row className="app-user-list">
                    <Col sm="12">
                        <Col>
                            <h1 sm='12'>
                                <DealList />
                            </h1>
                        </Col>
                    </Col>

                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col lg="6">
                                        <h3 className="float-left">
                                            Feature Deal Table
                                        </h3>
                                    </Col>
                                    <div className=""
                                        style={{ marginLeft: "8rem" }}>
                                        <Input
                                            placeholder="search..."
                                            onChange={(e) =>
                                                this.updateSearchQuery(e.target.value)
                                            }
                                            value={this.state.value}
                                        />
                                    </div>
                                    <Col>
                                        <Button
                                            className="btn btn-danger float-right"
                                            onClick={() => history.push("/app/freshlist/featuredeal/addFeatureDeal")}
                                        >
                                            Add Feature Deal
                                        </Button>
                                    </Col>
                                </Row>
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
                </Row >
            )
        );
    }
}
export default FeatureDeal;