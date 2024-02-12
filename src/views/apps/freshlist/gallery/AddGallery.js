import React, { Component } from "react";
import { BsFillPersonFill } from "react-icons/bs";
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
import { Route } from "react-router-dom";

export class AddGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      selectedFile: null,
      selectedName: "",
      sortorder: "",
      desc: "",
      product_img: "",
      aadharcardimage: [],
      status: "",
    };
  }

  fileSelectedHandler = (e) => {
    this.setState({
      aadharcardimage: [...this.state.aadharcardimage, ...e.target.files],
    });
    console.log(this.state.aadharcardimage);
  };

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
        this.props.history.push("/app/freshlist/gallery/gallery");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <h1>Add Images</h1>
        <div>
          <Card>
            <Row className="m-1">
              <Col className="">
                <h2>Upload File</h2>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/freshlist/gallery/gallery")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody>
              <Form onSubmit={this.submitHandler}>
                <Row className="mb-1">
                  <Col lg="4">
                    <Label>Image</Label>
                    <CustomInput
                      required
                      accept="application/pdf,image/gif, image/jpeg,image/png"
                      multiple
                      type="file"
                      onChange={this.fileSelectedHandler}
                    />
                    {/* <CustomInput
                      required
                      multiple
                      type="file"
                      name="bannertype"
                      placeholder="Upload image"
                      // value={this.state.bannertype}
                      onChange={this.onChangeHandler}
                      // onChange={this.changeHandler}
                    ></CustomInput> */}
                  </Col>
                  <Col lg="4">
                    <Label> Folder Name</Label>
                    <Input
                      required
                      type="select"
                      name="folder"
                      placeholder="Driver Name"
                      // value={this.state.driver}
                      onChange={this.changeHandler}
                    >
                      <option>--Select--</option>
                      <option>Admin</option>
                      <option>banner</option>
                      <option>brand</option>
                      <option>Category</option>
                      <option>company</option>
                      <option>Deliveryman</option>
                      <option>Product</option>
                      <option>Shop</option>
                      <option>Deal</option>
                      {/* {this.state.drivername?.map((driname) => (
                        <option value={driname?.firstname}>
                          {driname?.firstname}
                        </option>
                      ))} */}
                    </Input>
                    {/* <CustomInput
                      required
                      multiple
                      type="file"
                      name="bannertype"
                      placeholder="Upload image"
                      // value={this.state.bannertype}
                      onChange={this.onChangeHandler}
                      // onChange={this.changeHandler}
                    ></CustomInput> */}
                  </Col>
                </Row>
                <Row style={{ float: "right" }}>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1 "
                  >
                    Upload
                  </Button.Ripple>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
export default AddGallery;
