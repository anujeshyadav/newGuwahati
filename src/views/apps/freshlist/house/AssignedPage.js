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
import swal from "sweetalert";

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productid: "",
      userid: "",
      User: "",
      quantity: "",
      productName: [],
      AssignRole: "",
      rowData: [],
      category_name: "",
      type: "",
      feature: "",
      status: "",
      selectedFile1: null,
      selectedName1: "",
      selectedFile2: null,
      selectedName2: "",
      selectedFile3: null,
      selectedName3: "",
      selectedFile4: null,
      selectedName4: "",
    };
  }

  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();

    data.append("user_id", userData?.Userinfo.id);
    data.append("product_id", this.state.productid);
    data.append("qty", this.state.quantity);
    data.append("category_id", this.props.location.state?.category_id);
    data.append("client_id", this.state.User);

    axiosConfig
      .post(`/assign_to_client`, data)
      .then((response) => {
        swal("Success", "Sucessfully Assigned to client");
        console.log(response);
        this.setState({ User: "" });
        this.setState({ productid: "" });
        this.setState({ quantity: "" });
        // if (response.data.msg === "success") {
        //   swal("Success!", "You Data IS been Submitted", "success");
        //   this.props.history.push("/app/freshlist/category/categoryList");
        // }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.setState({ productid: id });
    axiosConfig.get("/getuserlist").then((response) => {
      console.log(response?.data?.data?.users);
      let rowData = response?.data?.data?.users;
      this.setState({ rowData });
    });
  }
  render() {
    return (
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h2>Assign To Client</h2>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/house/assigntoclient")
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
                <Col lg="6" md="6" className="mb-1 ">
                  <Label>Client List</Label>
                  <Input
                    required
                    type="select"
                    name="User"
                    placeholder="Enter Iden Type"
                    value={this.state.User}
                    onChange={this.changeHandler}
                  >
                    <option value="12ROW">--Selecte--</option>
                    {this.state.rowData &&
                      this.state.rowData?.map((value, i) => (
                        <option key={i} value={value?.id}>
                          {value?.full_name}
                        </option>
                      ))}
                  </Input>
                </Col>
                <Col lg="6" md="6" className="mb-1 ">
                  <Label>Quantity</Label>
                  <Input
                    required
                    type="number"
                    name="quantity"
                    placeholder="Enter Quantity..."
                    value={this.state.quantity}
                    onChange={this.changeHandler}
                  />
                </Col>
              </Row>

              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mx-1 mb-1"
                >
                  Assign To Client
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddProduct;
