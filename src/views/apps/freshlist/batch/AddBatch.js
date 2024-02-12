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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";

export class AddBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: "",
      rack_no: "",
      shelf_life: "",
      expiry_date: "",
      stock: "",
      notify: "",
    };
  }

  // handleChange = e => {
  //   this.setState({ status: e.target.value });
  // };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axiosConfig
      .post(`/admin/addbatch`, this.state)
      .then(response => {
        console.log(response);
        this.props.history.push("/app/freshlist/batch/batchList");
      })
      .catch(error => {
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
                Add Batch
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/batch/batchList")
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
                  <Label>Batch</Label>
                  <Input
                    type="number"
                    placeholder="Batch"
                    name="batch"
                    value={this.state.batch}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Rack Number</Label>
                  <Input
                    type="number"
                    placeholder="Rack Number"
                    name="rack_no"
                    value={this.state.rack_no}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Shelf Life</Label>
                  <InputGroup>
                    <InputGroupText>Days</InputGroupText>
                    <Input
                      type="number"
                      placeholder="Shelf Life"
                      name="shelf_life"
                      value={this.state.shelf_life}
                      onChange={this.changeHandler}
                    />
                  </InputGroup>
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    placeholder="Expiry Date"
                    name="expiry_date"
                    value={this.state.expiry_date}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    placeholder="stock"
                    name="stock"
                    value={this.state.stock}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-1">
                  <Label>Notify</Label>
                  <Input
                    type="number"
                    placeholder="Notify"
                    name="notify"
                    value={this.state.notify}
                    onChange={this.changeHandler}
                  />
                </Col>

                {/* <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={this.handleChange}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Deactive"
                    />
                    <span style={{ marginRight: "3px" }}>Deactive</span>
                  </div>
                </Col> */}
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Add
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddBatch;

// {
//         batch: this.state.batch,
//         rack_no: this.state.rack_no,
//         shelf_life: this.state.shelf_life,
//         expiry_date: this.state.expiry_date,
//         stock: this.state.stock,
//         notify: this.state.notify,
//       }
