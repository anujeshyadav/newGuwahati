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

export class AddTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile_no: "",
      remarks: "",
      wallet_type: "",
      amount: "",
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
    // const data = new FormData();
    // data.append("category_name", this.state.category_name);
    // data.append("desc", this.state.desc);
    // data.append("status", this.state.status);
    // if (this.state.selectedFile !== null) {
    //   data.append("image", this.state.selectedFile, this.state.selectedName);
    // }
    // for (var value of data.values()) {
    //   console.log(value);
    // }
    axiosConfig
      .post("/admin/addwallet", this.state)
      .then((response) => {
        console.log(response.data.data);
        // this.props.history.push("/app/freshlist/category/categoryList");
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
                Add Transactions
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/wallet/walletType")
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
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      placeholder=" Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Mobile No. </Label>
                    <Input
                      type="number"
                      placeholder="Mobile No."
                      name="mobile_no"
                      value={this.state.mobile_no}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Remarks</Label>
                    <Input
                      type="number"
                      placeholder="Order Id"
                      name="order_id"
                      value={this.state.order_id}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col> */}
                <Col lg="6" md="6" className="mb-1">
                  <Label>Wallet Type</Label>
                  <Input
                    required
                    type="select"
                    name="wallet_type"
                    placeholder="Enter Iden Type"
                    value={this.state.wallet_type}
                    onChange={this.changeHandler}
                  >
                    <option value="select">--Select--</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </Input>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter Here"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
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
export default AddTransactions;
