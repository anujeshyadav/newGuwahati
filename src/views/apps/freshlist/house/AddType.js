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

export class AddType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TypeName: "",
      Brand: "",
      Brandlist: "",
      Description: "",
      Price: "",
      stock: "",
      Regularprice: "",
      formValues: [{ PName: "", price: "" }],
      DiscountPrice: "",
      Addmore: false,
      rowData: [],
      description: "",
      variety: "",
      shipmentfee: "",
      Tags: "",
      taxrate: "",
      status: "",
      selectedFile3: null,
      selectedName3: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    await axiosConfig.get("/getcategory").then((response) => {
      let rowData = response.data.data?.category;
      //   console.log(rowData);
      this.setState({ rowData });
    });
    // await axiosConfig.get("/getbrand").then((response) => {
    //   let Brandlist = response.data.data?.brands;
    //   //   console.log(Brandlist);
    //   this.setState({ Brandlist });
    // });
  }

  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState({
      formValues: [...this.state.formValues, { PName: "", price: "" }],
    });
    this.handleSubmit();
  }

  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  handleSubmit() {
    console.log(this.state.formValues);
  }

  // onChangeHandler1 = (event) => {
  //   this.setState({ selectedFile1: event.target.files[0] });
  //   this.setState({ selectedName1: event.target.files[0].name });
  //   console.log(event.target.files[0]);
  // };
  // onChangeHandler2 = (event) => {
  //   this.setState({ selectedFile2: event.target.files[0] });
  //   this.setState({ selectedName2: event.target.files[0].name });
  //   console.log(event.target.files[0]);
  // };
  onChangeHandler3 = (event) => {
    this.setState({ selectedFile3: event.target.files });
    this.setState({ selectedName3: event.target.files[0].name });
    console.log(event.target.files);
  };
  // onChangeHandler4 = (event) => {
  //   this.setState({ selectedFile4: event.target.files[0] });
  //   this.setState({ selectedName4: event.target.files[0].name });
  //   console.log(event.target.files[0]);
  // };

  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    console.log(pageparmission?.Userinfo?.id);
    const data = new FormData();

    data.append("user_id", pageparmission?.Userinfo?.id);
    // data.append("brand_id", this.state.Brand);
    data.append("product_type", this.state.TypeName);
    data.append("description", this.state.Description);
    data.append("status", "Active");

    axiosConfig
      .post(`/addproducttype`, data)
      .then((response) => {
        if (response?.data?.success) {
          this.setState({ TypeName: "" });
          this.setState({ Description: "" });
          swal("Success!", "You Data has been Submitted", "success");
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
          <h1 className="p-2 ">Add Type here</h1>
          <Row className="m-2">
            <Col>
              <h2>Enter Information</h2>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/house/Typelist")
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
                    <Label> Add Type</Label>

                    {/* <select
                      required
                      onChange={(e) =>
                        this.setState({ category_name: e.target.value })
                      }
                      className="form-control"
                      name="Select"
                      id="Select"
                    >
                      <option value="volvo">--Select Category--</option>
                      {this.state.rowData &&
                        this.state.rowData?.map((val, i) => (
                          <option key={i} value={val?.id}>
                            {val?.category_name}
                          </option>
                        ))}
                    </select> */}
                    <Input
                      type="text"
                      placeholder="Title"
                      name="TypeName"
                      bsSize="lg"
                      value={this.state.TypeName}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Choose Brand *</Label>

                    <select
                      required
                      onChange={(e) => this.setState({ Brand: e.target.value })}
                      className="form-control"
                      name="Select"
                      id="Select"
                    >
                      <option value="volvo">--Select Category--</option>
                      {this.state.Brandlist &&
                        this.state.Brandlist?.map((val, i) => (
                          <option key={i} value={val?.id}>
                            {val?.brand_name}
                          </option>
                        ))}
                    </select>
                  </FormGroup>
                </Col> */}
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      type="text"
                      placeholder="Title"
                      name="Description"
                      bsSize="lg"
                      value={this.state.Description}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                {/* <Col lg="12" md="12">
                  <FormGroup>
                    <Label>Description</Label>
                    <textarea
                      type="text"
                      rows={5}
                      className="form-control"
                      placeholder="Description ..."
                      name="description"
                      bsSize="lg"
                      value={this.state.description}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label> PRICE (₹)</Label>
                    <Input
                      required
                      type="number"
                      placeholder="Amount In Number"
                      name="Price"
                      bsSize="lg"
                      value={this.state.Price}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col> */}
              </Row>

              <Row>
                <Col>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mx-3 mb-1"
                  >
                    Add Type
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
export default AddType;
