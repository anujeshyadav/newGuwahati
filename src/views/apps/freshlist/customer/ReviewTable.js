import React, { Component } from "react";
import { Card, CardBody, Col, Form, Row, Input, CustomInput, Label, Button, } from "reactstrap";
import axiosConfig from "../../../../axiosConfig";

export class ReviewTable extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: "",
            selectedFile: null,
            selectedName: "",
            sortorder: "",
            desc: "",
            product_img: "",
            status: "",
        };
    }

    onChangeHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ selectedName: event.target.files[0].name });
        console.log(event.target.files[0]);
    };

    changeHandler1 = (e) => {
        this.setState({ status: e.target.value });
    };
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("sortorder", this.state.sortorder);
        data.append("desc", this.state.desc);
        data.append("status", this.state.status);
        data.append(
            "product_img",
            this.state.selectedFile,
            this.state.selectedName
        );
        //   for (var value of data.values()) {
        //     console.log(value);
        //  }
        axiosConfig
            .post(" /addproductcategory", data)
            .then((response) => {
                console.log(response);
                this.props.history.push("/app/category/category");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        return (
            <div>
                <Row>
                    <h1 className="float-left">
                        Customer Review List
                    </h1>
                </Row>
                <div>
                    <Card>
                        <Row className="m-1">
                            <Col >
                                <h3 col-sm-6 className="float-left">
                                    Review Table
                                </h3>
                            </Col>

                            <div className="table-input mr-1">
                                <Input
                                    placeholder="search by Product..."
                                    onChange={(e) =>
                                        this.updateSearchQuery(e.target.value)
                                    }
                                    value={this.state.value}
                                />
                            </div>

                        </Row>
                        <CardBody>
                            <Form className="m-1" onSubmit={this.submitHandler}>
                                <Row className="mb-2">
                                    <Col lg="6" md="6" className="mb-2">

                                        <Label>Choose Product</Label>
                                        <CustomInput
                                            type="select"
                                            name="type"
                                            value={this.state.type}
                                            onChange={this.changeHandler}
                                        >
                                            <option>---Select Product---</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </CustomInput>
                                    </Col>
                                    <Col lg="6" md="6" className="mb-1">
                                        <Label>Choose Customer</Label>
                                        <CustomInput
                                            type="select"
                                            name="desc"
                                            value={this.state.desc}
                                            onChange={this.changeHandler}
                                        >
                                            <option>---Select Product---</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </CustomInput>
                                    </Col>

                                    <Col lg="6" md="6" className="mb-1">
                                        <Label>From</Label>
                                        <Input
                                            required
                                            type="date"
                                            name="date"
                                            placeholder="Enter Date"
                                            value={this.state.date}
                                            onChange={this.changeHandler}
                                        ></Input>
                                    </Col>
                                    <Col lg="6" md="6" className="mb-1">
                                        <Label>To</Label>
                                        <Input
                                            required
                                            type="date"
                                            name="date"
                                            placeholder="Enter Date"
                                            value={this.state.date}
                                            onChange={this.changeHandler}
                                        ></Input>
                                    </Col>
                                </Row>
                                <div style={{ float: "right" }} className="table-input mr-1">
                                    <Button.Ripple
                                        color="primary"
                                        onClick={() => this.gridApi.exportDataAsCsv()}>
                                        Export as CSV
                                    </Button.Ripple>
                                </div>

                            </Form>
                        </CardBody>
                    </Card>
                </div >

            </div >
        );
    }
}
export default ReviewTable;