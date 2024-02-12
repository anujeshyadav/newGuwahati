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

export class CreateAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      selectedFile: null,
      selectedName: "",
      desc: "",
      image: "",
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
    data.append("category_name", this.state.category_name);
    data.append("desc", this.state.desc);
    data.append("status", this.state.status);
    if (this.state.selectedFile !== null) {
      data.append("image", this.state.selectedFile, this.state.selectedName);
    }
    for (var value of data.values()) {
      console.log(value);
    }
    axiosConfig
      .post("/admin/addcategory", data)
      .then((response) => {
        console.log(response);
        this.props.history.push("/app/freshlist/category/categoryList");
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
                CreateAttribute
              </h1>
            </Col>
            <Col>
              <Button
                className=" btn btn-danger float-right"
                onClick={() =>
                  history.push("/app/freshlist/options/AttributeList")
                }
              >
                Back
              </Button>
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row className="mb-2">
                <Col lg="6" md="6" className="mb-1">
                  <Label>Weight</Label>
                  <Input
                    required
                    type="select"
                    name="weight"
                    placeholder="Enter Iden Type"
                    value={this.state.weight}
                    onChange={this.changeHandler}
                  >
                    <option value="select">--Select--</option>
                    <option value="1KG">1KG</option>
                    <option value="2KG">2KG</option>
                    <option value="3KG">3KG</option>
                    <option value="5KG">5KG</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Volume</Label>
                  <Input
                    required
                    type="select"
                    name="volume"
                    placeholder="Enter Iden Type"
                    value={this.state.volume}
                    onChange={this.changeHandler}
                  >
                    <option value="select">--Select--</option>
                    <option value="1L">1L</option>
                    <option value="2L">2L</option>
                    <option value="3L">3L</option>
                    <option value="5L">5L</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Pisces</Label>
                  <Input
                    required
                    type="select"
                    name="pisces"
                    placeholder="Enter Iden Type"
                    value={this.state.pisces}
                    onChange={this.changeHandler}
                  >
                    <option value="select">--Select--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Submit
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default CreateAttribute;
