import React, { Component } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Form,
    Label,
    Input,
    CustomInput,
    Button,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import swal from 'sweetalert';
export default class EditBanner extends Component {
    constructor (props) {
        super(props);
        this.state = {
            url: "",
            banner_title: "",
            banner_img: "",
            bannertype: "",
            resourcetype: "",
            selectedFile: undefined,
            selectedName: "",
            status: ""
        };
    }
    onChangeHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ selectedName: event.target.files[0].name });
        console.log(event.target.files[0]);
    };
    onChangeHandler = (event) => {
        this.setState({ selectedFile: event.target.files });
        this.setState({ selectedName: event.target.files.name });
        console.log(event.target.files);
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
        data.append("banner_title", this.state.banner_title);
        data.append("bannertype", this.state.bannertype);
        data.append("status", this.state.status);
        for (const file of this.state.selectedFile) {
            if (this.state.selectedFile !== null) {
                data.append("banner_img", file, file.name);
            }
        }
        for (var value of data.values()) {
            console.log(value);
        }
        for (var key of data.keys()) {
            console.log(key);
        }
        axiosConfig.post("/addbanner", data)
            .then((response) => {
                console.log(response);
                swal("Successful!", "You clicked the button!", "success");
                this.props.history.push("/app/freshlist/banner/bannerList");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Flash Deal Update</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form className="m-1" onSubmit={this.submitHandler}>
                            <Row>
                                <Col lg="6" md="6" sm="6" className="mb-2">
                                    <Label>Title</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="banner_title"
                                        placeholder="Enter Title"
                                        value={this.state.banner_title}
                                        onChange={this.changeHandler} />
                                </Col>
                                <Col lg="6" md="6" sm="6" className="mb-2">
                                    <Label>Image</Label>
                                    <CustomInput
                                        required
                                        type="file"
                                        name="banner_title"

                                        value={this.state.banner_title}
                                        onChange={this.changeHandler} />
                                </Col>
                                <Col lg="6" md="6" sm="6" className="mb-2">
                                    <Label>Start Date</Label>
                                    <Input
                                        required
                                        type="date"
                                        name="bannertype"
                                        placeholder=""
                                        value={this.state.bannertype}
                                        onChange={this.changeHandler}>
                                    </Input>
                                </Col>
                                <Col lg="6" md="6" sm="6" className="mb-2">
                                    <Label>End Date</Label>
                                    <Input
                                        required
                                        type="date"
                                        name="bannertype"
                                        placeholder=""
                                        value={this.state.bannertype}
                                        onChange={this.changeHandler}>
                                    </Input>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="6" md="6" sm="6" className="mb-2">
                                    <Button.Ripple
                                        color="primary"
                                        type="submit"
                                        className="mr-1 mb-1">
                                        Submit
                                    </Button.Ripple>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}