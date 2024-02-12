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
import Multiselect from "multiselect-react-dropdown";
import axiosConfig from "../../../../axiosConfig";
// import Multiselect from "multiselect-react-dropdown";
import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
export class AddRefund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery_slot: "",
      quantity: "",
      phone_no: "",
      order_zone: "",
      delivery_add: "",
      attribute: "",
      email: "",
      delivery_date: "",
      time_slot: "",
      status: "",
      productName: [],
      attribuName: [],
      previous_add: "",
      new_address: "",
      notify: [],
      rowData: [],
      Replacement: "",
      Refundstatus: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeHandler1 = (e) => {
    this.setState({ Refundstatus: e.target.value });
  };
  async componentDidMount() {
    axiosConfig.get("/admin/allorder_list").then((response) => {
      console.log(response.data.data);
      this.setState({ rowData: response.data.data });
    });
  }

  //   async componentDidMount() {
  //     axiosConfig
  //       .get("/admin/product_list")
  //       .then((response) => {
  //         console.log(response.data.data);
  //         this.setState({
  //           productName: response.data.data,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     axiosConfig
  //       .get("/admin/getall_units")
  //       .then((response) => {
  //         this.setState({
  //           attribuName: response.data.data,
  //         });
  //       })
  //       .catch((err) => {
  //         swal("Oops", "Something went wrong!", "error");
  //         console.log(err);
  //       });
  //   }

  submitHandler = (e) => {
    e.preventDefault();

    axiosConfig
      .post("/admin/addorder", this.state)

      .then((response) => {
        console.log(response.data.data);
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/softNumen/order/placeorder");
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
                Add Refund
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/softNumen/order/placeorder")
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
                    <Label>Order Id</Label>
                    <Multiselect
                      selectionLimit="1"
                      name="notify"
                      // singleSelect
                      placeholder="Search order id here"
                      value={this.state.notify}
                      isObject={false}
                      onRemove={(e) => {
                        console.log(e);
                      }}
                      onSelect={(e) => {
                        this.setState({ notify: e });
                        // this.setState({ [e.target.name]: e.target.value });
                        console.log(e);
                      }}
                      onChange={this.changeHandler}
                      options={[
                        "$6465464564664",
                        "$65466464",
                        "$6546ddd4646465464",
                        "$65464dd465466",
                        "$6546ss6464",
                        "$65aa466464",
                        "$6546464vv646f5464",
                        "$654644dr65f466",
                        "$6546646rrf4",
                        "$654sff6646f4",
                        "$6546464frtt6465464",
                        "$6546446f5466",
                        "$6546646f4",
                        "$6546f46df4f6465464",
                        "$654ddfd6f4465466",
                      ]}
                      showCheckbox
                      className="mmm "
                    />

                    {/* <Label>Order Id</Label>
                    <Input
                      type="number"
                      placeholder=""
                      name="orderId"
                      value={this.state.orderId}
                      onChange={this.changeHandler.bind(this)}
                    /> */}
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Customer Name</Label>
                    <Input
                      type="text"
                      placeholder="Anujesh yadav"
                      name="customer"
                      value={this.state.customer}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Mobile Number</Label>
                    <Input
                      type="number"
                      // maxLength={10}
                      // size={10}
                      placeholder="7000420819"
                      name="phone_no"
                      value={this.state.phone_no}
                      onChange={this.changeHandler.bind(this)}
                    />
                  </FormGroup>
                </Col>

                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Delivery Address</Label>
                    <Input
                      type="text"
                      placeholder="Delivery Address"
                      name="delivery_add"
                      value={this.state.delivery_add}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col> */}
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="sanujesh@gmail.com "
                      name="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      placeholder="10"
                      name="unit"
                      value={this.state.unit}
                      onChange={this.changeHandler.bind(this)}
                    />
                  </FormGroup>
                </Col>
                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Time Slot</Label>
                    <Input
                      type="time"
                      placeholder="Time Slot"
                      name="time_slot"
                      value={this.state.time_slot}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col> */}

                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Product Name</Label>
                    <Multiselect
                      name="notify"
                      placeholder="ata tamater Aalu "
                      value={this.state.notify}
                      isObject={false}
                      onRemove={(e) => {
                        console.log(e);
                      }}
                      onSelect={(e) => {
                        this.setState({ notify: e });
                        // this.setState({ [e.target.name]: e.target.value });
                        console.log(e);
                      }}
                      onChange={this.changeHandler}
                      options={[
                        "Aalu",
                        "tamater",
                        "milk",
                        "Soya Chunks",
                        "Ata",
                        "Ice Cream",
                      ]}
                      showCheckbox
                      className="mmm "
                    />
                    {/* <Input
                      type="text"
                      placeholder="Enter Product"
                      name="product"
                      value={this.state.product}
                      onChange={this.changeHandler}
                    /> */}
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Total Quantity</Label>
                    <Input
                      type="text"
                      placeholder="5"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Total Price</Label>
                    <Input
                      type="text"
                      placeholder="50"
                      name="price"
                      value={this.state.price}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <Label>Payment Status</Label>
                  <CustomInput
                    type="select"
                    placeholder=" done"
                    name="status"
                    value={this.state.status}
                    onChange={this.changeHandler}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </CustomInput>
                </Col>
              </Row>
              <hr />
              <Row className="mt-2">
                {/* <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-1"> Refund Status </Label>
                  <div
                    className="form-label-group"
                    onChange={this.changeHandler1}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="Refundstatus"
                      value="Replacement"
                    />
                    <span style={{ marginRight: "20px" }}>Replacement</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="Refundstatus"
                      value="Refund"
                    />
                    <span style={{ marginRight: "3px" }}>Refund</span>
                  </div>
                </Col> */}
                <Col lg="6" md="6" sm="6" className="mb-2">
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
                      value="Replacement"
                    />
                    <span style={{ marginRight: "20px" }}>Replacement</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Refund"
                    />
                    <span style={{ marginRight: "3px" }}>Refund</span>
                  </div>
                </Col>

                <Col lg="6" md="6">
                  <Label>{this.state.Refundstatus} Status</Label>
                  <CustomInput
                    type="select"
                    placeholder=""
                    name="status"
                    value={this.state.status}
                    onChange={this.changeHandler}
                  >
                    <option value="pending">Pending</option>
                    {/* <option value="complete">Completed</option> */}
                    {/* <option value="delivery">Delivery</option> */}
                    <option value="canceled">Canceled</option>
                    <option value="Approved">Approved</option>
                    {/* <option value="Packaging">Packaging</option> */}
                    <option value="Rejected">Rejected</option>
                    {/* <option value="Outfordelivery">Outfordelivery</option> */}
                    {/* <option value="Delivered">Delivered</option> */}
                    {/* <option value="Failedtodeliver">Failedtodeliver</option> */}
                    {/* <option value="Returned">Returned</option> */}
                  </CustomInput>
                </Col>
                {this.state.Refundstatus == "Refund" ? (
                  <>
                    <Col lg="6" md="6">
                      <Label className="mt-2  mb-2">
                        {" "}
                        Payment Refund Method
                      </Label>

                      <CustomInput
                        type="select"
                        placeholder=""
                        name="status"
                        value={this.state.status}
                        onChange={this.changeHandler}
                      >
                        <option value="Paid">wallet</option>
                        <option value="Unpaid">bank Account</option>
                        <option value="Unpaid">UPI</option>
                        <option value="Unpaid">Other</option>
                      </CustomInput>
                    </Col>
                  </>
                ) : null}
                <Col lg="6" md="6">
                  <Label for="exampleText mx-2" className="">
                    {this.state.Refundstatus} Reason
                  </Label>
                  <Col>
                    <textarea
                      className="form-control"
                      id="exampleText"
                      name="text"
                      row="8"
                      // cols="50"
                    />
                  </Col>
                </Col>
              </Row>
              <Row>
                {/* <Col lg="6" md="6" className="mb-1">
                  <Label>Product Name</Label>
                  <Input
                    type="select"
                    placeholder="Enter Product"
                    name="product"
                    value={this.state.product}
                    onChange={this.changeHandler}
                  >
                    <option>Order ID</option>
                    {this.state.productName?.map((pnlist) => (
                      <option value={pnlist?._id} key={pnlist?._id}>
                        {pnlist?._id}
                      </option>
                    ))}
                  </Input>
                </Col> */}

                {/* <Col lg="6" md="6">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.changeHandler}
                  />
                </Col> */}
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2"
                >
                  Add Refund
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddRefund;
