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
import { CloudLightning } from "react-feather";

export class EditInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      ViewoneProduct: {},
      P_Title: "",
      Price: "",
      Inventory: "",
      stock: "",
      // Regularprice: "",
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
      // selectedFile1: null,
      // selectedName1: "",
      // selectedFile2: null,
      // selectedName2: "",
      selectedFile3: [],
      selectedName3: "",
      // selectedFile4: null,
      // selectedName4: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    let { id } = this.props?.match.params;
    console.log(id);

    console.log(this.props?.location?.state);
    // console.log(JSON.parse(this.props?.location?.state?.veriety));
    // let variety = JSON.parse(this.props?.location?.state?.veriety);
    // if (variety.length > 0) {
    //   this.setState({ Addmore: true });
    // }
    // const formdata = new FormData();
    // formdata.append("")
    // axiosConfig
    //   .post(``)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // this.setState({
    //   category_name: this.props?.location?.state?.category_name,
    // });
    // this.setState({ P_Title: this.props?.location?.state?.title });
    this.setState({ Inventory: this.props?.location?.state?.HSN_SAC });
    this.setState({ stock: this.props?.location?.state?.quantity });

    // this.setState({ Price: this.props?.location?.state?.price });
    // this.setState({ stock: this.props?.location?.state?.stock });

    // this.setState({
    //   DiscountPrice: this.props?.location?.state?.discountprice,
    // });
    // this.setState({ description: this.props?.location?.state?.description });
    // this.setState({
    //   formValues: JSON.parse(this.props?.location?.state?.veriety),
    // });
    // this.setState({ shipmentfee: this.props?.location?.state?.shipping_fee });
    // this.setState({ Tags: this.props?.location?.state?.tags });
    // this.setState({ taxrate: this.props?.location?.state?.tax_rate });
    // this.setState({ status: this.props?.location?.state?.status });
    // await axiosConfig.get("/getcategory").then((response) => {
    //   let rowData = response.data.data?.category;
    //   console.log(rowData);
    //   this.setState({ rowData });
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

  onChangeHandler3 = (event) => {
    let selectedName = Array.from(event.target.files);
    console.log(selectedName);
    this.setState({ selectedFile3: selectedName });
  };

  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props?.match.params;
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    console.log(id);
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("quantity", this.state.stock);
    data.append("HSN_SAC", this.state.Inventory);
    data.append("product_id", id);

    // data.append("id", id);

    // data.append("id", this.props?.location?.state?.id);
    // data.append("title", this.state.P_Title);
    // data.append("veriety", JSON.stringify(this.state.formValues));
    // data.append("category_id", this.state.category_name);
    // data.append("stock", this.state.stock);
    // data.append("price", this.state.Price);
    // data.append("discountprice", this.state.DiscountPrice);
    // data.append("description", this.state.description);
    // data.append("shipping_fee", this.state.shipmentfee);
    // data.append("tax_rate", this.state.taxrate);
    // data.append("tags", this.state.Tags);
    // data.append("status", "Active");
    // this.state.selectedFile3.forEach((image, index) => {
    //   data.append(`image`, image);
    // });
    // if (this.state.stock) {
    axiosConfig
      .post(`/updateinventory`, data)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          swal("Success!", "You Data iS been Submitted", "success");
          this.props.history.push("/app/freshlist/house/inventory");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // } else {
    //   swal("Enter Value in field");
    // }
  };
  render() {
    return (
      <div>
        <Card>
          <h1 className="p-2 "> Update Inventory</h1>
          <Row className="m-2">
            <Col>
              <h2>Existing Information</h2>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" float-right"
                    color="danger"
                    onClick={
                      () => history.goBack()
                      // () => history.push("/app/softNumen/order/completed")
                      // history.push("/app/freshlist/order/addOrder")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
            {/* <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/category/categoryList")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col> */}
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Quantity </Label>
                    <Input
                      type="number"
                      placeholder="Quantity In Number"
                      name="stock"
                      bsSize="lg"
                      value={this.state.stock}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> HSN / SAC </Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      name="Inventory"
                      value={this.state.Inventory}
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
                  Update Inventory
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default EditInventory;
