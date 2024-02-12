import React, { Component } from "react";
import { BsFillPersonFill } from "react-icons/bs"
import {
    Card,
    CardBody,
    Col,
    Form,
    Row,
    Input,
    CustomInput,
    Label,
    Button,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";

export class FeaturedDeal extends Component {
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
                <h1>Add New Deal</h1>
                <div>
                    <Card>
                        <Row className="m-1">
                            <Col><h2>Feature Deal</h2></Col>
                        </Row>
                        <CardBody>
                            <Form onSubmit={this.submitHandler}>
                                <Row className="mb-1">
                                    <Col lg="12">

                                        <Label>Add New Deal</Label>
                                        <Input
                                            required
                                            type="select"
                                            name="bannertype"
                                            placeholder="Enter Identity Type"
                                            value={this.state.bannertype}
                                            onChange={this.changeHandler}>
                                            <option value="select">--Select--</option>
                                            <option value="1">1</option>
                                            <option value="2">2 </option>
                                            <option value="3">3</option>
                                            <option value="4">4 </option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row style={{ float: 'right' }}>
                                    <Button.Ripple
                                        color="primary"
                                        type="submit"
                                        className="mr-1 mb-1 "
                                    >
                                        Add
                                    </Button.Ripple>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </div >

            </div >
        );
    }
}
export default FeaturedDeal;