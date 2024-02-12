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
  FormGroup,
  CustomInput,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";

export class EditBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      brand_img: "",
      status: "",
      selectedFile: null,
      selectedName: "",
    };
  }

  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
    console.log(event.target.files[0]);
  };

  handleChange = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    console.log(window);
    let { id } = this.props.match.params;
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", pageparmission?.Userinfo?.role);
    data.append("brand_id", id);
    axiosConfig
      .post(`/getviewbrand`, data)
      .then((response) => {
        console.log(response.data?.data?.brands[0]);
        let value = response.data?.data?.brands[0];
        this.setState({
          // data: response.data.data,
          name: value?.brand_name,
          desc: value.description,
          status: value.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", pageparmission?.Userinfo?.role);
    data.append("brand_name", this.state.name);
    data.append("description", this.state.desc);
    data.append("status", this.state.status);
    data.append("brand_id", id);
    // if (this.state.selectedFile !== null) {
    //   data.append("image", this.state.selectedFile, this.state.selectedName);
    // }
    // for (var value of data.values()) {
    //   console.log(value);
    // }
    axiosConfig
      .post(`/editbrandsubmit`, data)
      .then((response) => {
        // console.log(response?.data.success);
        if (response?.data.success) {
          this.props.history.push("/app/freshlist/brand/brandList");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit Brand
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/brand/brandList")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row className="mb-2">
                <Col lg="6" md="6" className="mb-1">
                  <Label>Brand Name</Label>
                  <Input
                    type="text"
                    placeholder="Branch Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Description</Label>
                  <Input
                    type="text"
                    placeholder="Description"
                    name="desc"
                    value={this.state.desc}
                    onChange={this.changeHandler}
                  />
                </Col>

                {/* <Col lg="6" md="6" className="mb-1">
                  <Label>Brand Image</Label>
                  <CustomInput
                    type="file"
                    onChange={this.onChangeHandler}
                  ></CustomInput>
                </Col> */}
                <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={this.handleChange}
                  >
                    <input
                      checked={this.state.status === "Active" ? true : false}
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      checked={this.state.status === "Deactive" ? true : false}
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Deactive"
                    />
                    <span style={{ marginRight: "3px" }}>Deactive</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Update Brand
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default EditBrand;
