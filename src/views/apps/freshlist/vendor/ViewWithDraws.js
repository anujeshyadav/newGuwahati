import React, { Component } from "react";
import VendorWithDraws from "./VendorWithDraws";

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
    CardHeader,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";

export class AddVendor extends Component {
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
    //     data.append(
    //         "product_img",
    //         this.state.selectedFile,
    //         this.state.selectedName
    //     );
    //   for (var value of data.values()) {
    //     console.log(value);
    //  }
    // axiosConfig
    //     .post(" /addproductcategory", data)
    //     .then((response) => {
    //         console.log(response);
    //         this.props.history.push("/app/category/category");
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };
    render() {
        return (

            <Row>
                <Col md="12">
                    <h1 sm="12">
                        <VendorWithDraws />
                    </h1>
                </Col>
                <Col md="4">
                    <Card>
                        <h3 className="m-2">My Bank Info</h3>
                        <ul>
                            <li>Bank name :City Bank</li>
                            <li>Branch : Mirpur- 12</li>
                            <li>Holder name : Fatema</li>
                            <li>Account no : 12345678</li>
                        </ul>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <h3 className="m-2">Shop Info</h3>
                        <ul>
                            <li>Seller b : Mart Morning
                            </li>
                            <li>Phone :01632381820</li>
                            <li>Address :House-09, Road-02, Section-15, Block-D, Mirpur-13</li>
                        </ul>

                    </Card>
                </Col>
                <Col md="4">
                    <Card >
                        <h3 className="m-2">Seller Info</h3>
                        <ul>
                            <li>Name :kamrujjaman joy</li>
                            <li>Email :test.seller@gmail.com</li>
                            <li>Phone :01632381820</li>
                        </ul>
                    </Card>
                </Col>
            </Row >


        );
    }
}
export default AddVendor;