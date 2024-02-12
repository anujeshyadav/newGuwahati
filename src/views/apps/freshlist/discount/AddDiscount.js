import React, { Component } from "react";
import {
    Card,
    CardBody,
    Col,
    Form,
    Row,
    Input,
    Label,
    Button,
    FormGroup, CustomInput
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";

export class AddDiscount extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: "",
    //         selectedFile: null,
    //         selectedName: "",
    //         sortorder: "",
    //         desc: "",
    //         brand_img: "",
    //         status: "",
    //     };
    // }

    // onChangeHandler = (event) => {
    //     this.setState({ selectedFile: event.target.files[0] });
    //     this.setState({ selectedName: event.target.files[0].name });
    //     console.log(event.target.files[0]);
    // };

    // changeHandler1 = (e) => {
    //     this.setState({ status: e.target.value });
    // };
    // changeHandler = (e) => {
    //     this.setState({ [e.target.name]: e.target.value });
    // };
    // submitHandler = (e) => {
    //     e.preventDefault();
    //     const data = new FormData();
    //     data.append("name", this.state.name);
    //     data.append("sortorder", this.state.sortorder);
    //     data.append("desc", this.state.desc);
    //     data.append("status", this.state.status);
    //     if (this.state.selectedFile !== null) {
    //         data.append(
    //             "brand_img",
    //             this.state.selectedFile,
    //             this.state.selectedName
    //         );
    //     }
    //     //   for (var value of data.values()) {
    //     //     console.log(value);
    //     //  }
    //     axiosConfig
    //         .post("/addbrand", data)
    //         .then((response) => {
    //             console.log(response);
    //             this.props.history.push("/app/freshlist/discount/discountList");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    render() {
        return (
            <div>
                <Card>
                    <Row className="m-2">
                        <Col>
                            <h1 col-sm-6 className="float-left">
                                Add Discount
                            </h1>
                        </Col>
                        <Col>
                            <Route
                                render={({ history }) => (
                                    <Button
                                        className=" btn btn-danger float-right"
                                        onClick={() => history.push("/app/freshlist/discount/discountList")}
                                    >
                                        Back
                                    </Button>
                                )} />
                        </Col>
                    </Row>
                    <CardBody>
                        {/* <Form className="m-1" onSubmit={this.submitHandler}>*/}  <Form className="m-1" >
                            <Row className="mb-2">
                                <Col lg="6" md="6" className="mb-2">

                                    <Label>Auto Generate Code</Label>
                                    <Input
                                        type="text"
                                        placeholder="Auto Generate Code"
                                        name="name"

                                    />
                                </Col>
                                <Col lg="6" md="6" className="mb-2">

                                    <Label>Type</Label>
                                    <Input
                                        // required
                                        type="select"
                                    // name="pre_type"
                                    // value={this.state.pre_type}
                                    // onChange={this.changeHandler}
                                    >
                                        <option selected>---Select Type---</option>
                                        <option>Flat</option>
                                        <option>Percentage</option>
                                        {/* <option>Monthly</option> */}
                                    </Input>

                                </Col>
                                <Col lg="6" md="6" className="mb-2">

                                    <Label>Discount</Label>
                                    <Input
                                        type="number"
                                        placeholder="Discount"
                                        name="name"

                                    >
                                    </Input>
                                </Col>
                                <Col lg="6" md="6" className="mb-2">

                                    <Label>Apply On</Label>
                                    <Input
                                        type="select"
                                    // placeholder="Auto Generate Code"
                                    // name="name"

                                    >
                                        <option selected>---Select---</option><option>Category</option>
                                        <option>Subcategory</option>
                                        <option>Product</option></Input>
                                </Col>

                            </Row>
                            <Row>
                                <Button.Ripple
                                    color="danger"
                                    type="submit"
                                    className="mr-1 mb-1"
                                >
                                    Add Attribute
                                </Button.Ripple>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
export default AddDiscount;