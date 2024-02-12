import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  Form,
  CustomInput,
  Label,
  Input,
  Button,
  Container,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import axios from "axios";
import "../../../../assets/css/main.css";
import { history } from "../../../../history";
import { Route, Link } from "react-router-dom";
import { FcFolder } from "react-icons/fc";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      mobile: "",
      phoneno: "",
      country: "",
      state: "",
      city: "",
      image: "",
      password: "",
      cnfmPassword: "",
      status: "",
      selectedName: "",
      selectedFile: null,
    };
  }

  //Image Submit Handler
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
    console.log(this.state);

    const data = new FormData();

    data.append("name", this.state.name);
    data.append("password", this.state.password);
    data.append("pincode", this.state.pincode);
    data.append("phone_no", this.state.phone_no);
    data.append("mobile_no", this.state.mobile_no);
    data.append("email", this.state.email);
    data.append("website", this.state.website);
    data.append("country", this.state.country);
    data.append("state", this.state.state);
    data.append("city", this.state.city);
    data.append("status", this.state.status);
    data.append("userImage", this.state.selectedFile, this.state.selectedName);

    for (var value of data.values()) {
      console.log(value);
    }

    for (var key of data.keys()) {
      console.log(key);
    }
    axios
      .post(
        "http://35.154.86.59/api/admin/editadmin/61efdb313c8b8db3a3488d25",
        data
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Row>
          <Col lg="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 col-sm-6 className="float-left">
                    File Managner
                  </h1>
                </Col>
                <Col>
                  <Route
                    render={({ history }) => (
                      <Button
                        className="btn float-right"
                        color="primary"
                        onClick={() =>
                          history.push("/app/freshlist/gallery/addGallery")
                        }
                      >
                        Add New
                      </Button>
                    )}
                  />
                </Col>
              </Row>
              <CardBody>
                <Form className="m-1" onSubmit={this.submitHandler}>
                  <Row>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Admin</h3>
                    </Col>

                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Banner</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Brand</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Category</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Company</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Deal</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Delivery Man</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Notification</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Product</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Profile</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          {" "}
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Refund</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          {" "}
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Review</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          {" "}
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Seller</h3>
                    </Col>
                    <Col md={2}>
                      <Card className="filefolder">
                        <Link>
                          {" "}
                          <FcFolder size={100} />
                        </Link>
                      </Card>
                      <h3 style={{ textAlign: "center" }}>Shop</h3>
                    </Col>
                  </Row>
                  {/* <Row>
                                        <Col lg="6" md="6" sm="6" className="mb-2">
                                            <Button.Ripple
                                                color="danger"
                                                className="mr-1 mb-1 btn-danger-rgba"
                                                type="reset"
                                                value="Reset">
                                                Reset
                                            </Button.Ripple>
                                            <Button.Ripple
                                                color="primary"
                                                type="submit"
                                                className="mr-1 mb-1"
                                            >
                                                Update
                                            </Button.Ripple>
                                        </Col>
                                    </Row> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Gallery;
