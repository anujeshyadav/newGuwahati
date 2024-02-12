import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import { history } from "../../../../history";
import { Route } from "react-router-dom";
import swal from "sweetalert";

export default class EditHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      delivery_zone: "",
      status: "",
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/user/getviewone/${id}`)
      .then((response) => {
        console.log("getviewone", response.data.data);
        this.setState({
          name: response.data.data.name,
          email: response.data.data.email,
          mobile: response.data.data.mobile,
          delivery_zone: response.data.data.delivery_zone,
          status: response.data.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    console.log(id);
    axiosConfig
      .post(`/admin/edit_order/${id}`, this.state)
      .then((response) => {
        console.log(response);
        this.props.history.push("/app/softNumen/order/placeorder");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div>
              <Breadcrumb listTag="div">
                <BreadcrumbItem href="/analyticsDashboard" tag="a">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem href="/app/freshlist/hubs/hubList" tag="a">
                  Customer List
                </BreadcrumbItem>
                <BreadcrumbItem active>Edit Customer List</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Edit Resource List</h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/freshlist/hubs/hubList")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="5" md="5" className="ml-2">
                  <FormGroup>
                    <Label>Hub Name</Label>
                    <Input
                      type="text"
                      placeholder="Hub Name"
                      name="username"
                      value={this.state.username}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="5" md="5" className="ml-2">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>

                <Col lg="5" md="5" className="ml-2">
                  <FormGroup>
                    <Label>Mobile</Label>
                    <Input
                      type="number"
                      placeholder="Enter Mobile"
                      name="mobile"
                      value={this.state.mobile}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="5" md="5" className="ml-2">
                  <FormGroup>
                    <Label>Delivery Zone</Label>
                    <Input
                      type="text"
                      placeholder="Delivery Zone"
                      name="delivery_zone"
                      value={this.state.delivery_zone}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-1">
                    <h4>Status</h4>
                  </Label>
                  <div
                    className="form-label-group"
                    onChange={this.changeHandler1}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="true"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="false"
                    />
                    <span style={{ marginRight: "3px" }}>Deactive</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-2 mb-1"
                  >
                    Update
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
