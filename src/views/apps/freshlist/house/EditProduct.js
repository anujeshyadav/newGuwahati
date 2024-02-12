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

export class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      ViewoneProduct: {},
      Product: {},
      P_Title: "",
      Price: "",
      stock: "",
      Regularprice: "",
      formValues: [{ PName: "", price: "" }],
      DiscountPrice: "",
      Addmore: false,
      rowData: [],
      TypeList: [],
      images: [],
      description: "",
      variety: "",
      Brand: "",
      Type: "",
      shipmentfee: "",
      Tags: "",
      taxrate: "",
      status: "",
      selectedFile3: [],
      selectedName3: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    let { id } = this.props?.match.params;
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("product_id", id);

    await axiosConfig
      .post("/editproductview", formdata)
      .then((response) => {
        console.log(response.data.data[0]);
        let getProduct = response.data.data[0];
        this.setState({ Product: response.data.data });
        // this.setState({ category_name: response.data.data?.category_name });
        this.setState({ category_name: getProduct?.category_id });
        this.setState({ P_Title: getProduct?.title });
        this.setState({ Price: getProduct?.price });
        this.setState({ stock: getProduct?.stock });
        this.setState({ DiscountPrice: getProduct?.discountprice });
        this.setState({ description: getProduct?.description });

        // this.setState({ Type: getProduct?.product_type });
        this.setState({ Type: getProduct?.product_type_id });
        this.setState({ Brand: getProduct?.brand_id });
        // this.setState({ Brand: getProduct?.brand_name });
        this.setState({
          formValues: JSON.parse(getProduct?.veriety),
        });
        this.setState({ shipmentfee: getProduct?.shipping_fee });
        this.setState({ Tags: getProduct?.tags });
        this.setState({ taxrate: getProduct?.tax_rate });
        this.setState({ status: getProduct?.status });
        this.setState({
          images: getProduct?.product_images,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    let Product = JSON.parse(localStorage.getItem("EditProduct"));
    // console.log(Product);
    // this.setState({ Product: Product });
    let variety = Product.veriety;
    if (variety.length > 0) {
      this.setState({ Addmore: true });
    }

    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", pageparmission?.Userinfo?.role);

    await axiosConfig.post("/getcategory", data).then((response) => {
      let rowData = response.data.data?.category;
      console.log(rowData);
      if (rowData) {
        this.setState({ rowData });
      }
    });
    const type = new FormData();
    // let pageparmission = JSON.parse(localStorage.getItem("userData"));
    type.append("user_id", pageparmission?.Userinfo?.id);
    type.append("role", pageparmission?.Userinfo?.role);
    const brand = new FormData();
    // let pageparmission = JSON.parse(localStorage.getItem("userData"));
    brand.append("user_id", pageparmission?.Userinfo?.id);
    brand.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig.post("/getbrand", brand).then((response) => {
      let Brandlist = response.data.data?.brands;
      console.log(response);
      if (Brandlist) {
        this.setState({ Brandlist });
      }
    });
    await axiosConfig.post("/producttypelistview", type).then((response) => {
      let TypeList = response.data.data;
      console.log(TypeList);
      if (TypeList) {
        this.setState({ TypeList });
      }
    });
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
    const data = new FormData();
    let Product = JSON.parse(localStorage.getItem("EditProduct"));
    data.append("id", Product?.id);
    data.append("title", this.state.P_Title);
    data.append("veriety", JSON.stringify(this.state.formValues));
    data.append("category_id", this.state.category_name);
    data.append("brand_id", this.state.Brand);
    data.append("product_type_id", this.state.Type);
    // data.append("stock", this.state.stock);
    data.append("price", this.state.Price);
    data.append("discountprice", this.state.DiscountPrice);
    data.append("description", this.state.description);
    data.append("shipping_fee", this.state.shipmentfee);
    data.append("tax_rate", this.state.taxrate);
    data.append("tags", this.state.Tags);
    data.append("status", "Active");

    for (let i = 0; i < this.state.selectedFile3?.length; i++) {
      data.append("images[]", this.state.selectedFile3[i]);
    }
    // for (const file of this.state.selectedFile3) {
    //   if (this.state.selectedFile3 !== null) {
    //     data.append("image_name", file);
    //   }
    // }
    axiosConfig
      .post(`/editproduct`, data, {
        //   .post(`/addproduct`, data, {
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          swal("Success!", "You Data iS been Submitted", "success");
          // this.props.history.push("/app/freshlist/category/categoryList");
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
          <h1 className="p-2 ">Product Update</h1>
          <Row className="m-2">
            <Col>
              <h2>Existing Information</h2>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/house/ProductDashboard")
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
                    <Label> Choose Category *</Label>

                    <select
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
                          <option
                            selected={this.state.category_name}
                            key={i}
                            value={val?.id}
                          >
                            {val?.category_name}
                          </option>
                        ))}
                    </select>
                    {/* <Input
                      type="text"
                      placeholder="Title"
                      name="category_name"
                      bsSize="lg"
                      value={this.state.category_name}
                      onChange={this.changeHandler}
                    /> */}
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Choose Type *</Label>

                    <select
                      onChange={(e) => this.setState({ Type: e.target.value })}
                      className="form-control"
                      name="Select"
                      id="Select"
                    >
                      <option value="volvo">--Select Type--</option>
                      {this.state.TypeList &&
                        this.state.TypeList?.map((val, i) => (
                          <option
                            selected={this.state.Type}
                            key={i}
                            value={val?.id}
                          >
                            {val?.product_type}
                          </option>
                        ))}
                    </select>
                    {/* <Input
                      type="text"
                      placeholder="Title"
                      name="category_name"
                      bsSize="lg"
                      value={this.state.category_name}
                      onChange={this.changeHandler}
                    /> */}
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Choose Brand *</Label>

                    <select
                      required
                      onChange={(e) => this.setState({ Brand: e.target.value })}
                      className="form-control"
                      name="Select"
                      id="Select"
                    >
                      <option value="volvo">--Select Brand--</option>
                      {this.state.Brandlist &&
                        this.state.Brandlist?.map((val, i) => (
                          <option
                            selected={this.state.Brand}
                            key={i}
                            value={val?.id}
                          >
                            {val?.brand_name}
                          </option>
                        ))}
                    </select>
                  </FormGroup>
                </Col>
                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Choose Category</Label>

                    <select
                      onChange={(e) =>
                        this.setState({ category_name: e.target.value })
                      }
                      className="form-control"
                      name="Select"
                      id="Select"
                    >
                      {" "}
                      <option value={this.props?.location?.state?.id}>
                        {this.props?.location?.state?.category_name}
                      </option>
                      <option value="volvo">--Select Category--</option>
                      {this.state.rowData &&
                        this.state.rowData?.map((val, i) => (
                          <option key={i} value={val?.id}>
                            {val?.category_name}
                          </option>
                        ))}
                    </select>
              
                  </FormGroup>
                </Col> */}
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      placeholder="Title"
                      name="P_Title"
                      bsSize="lg"
                      value={this.state.P_Title}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
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
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> PRICE (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Amount In Number"
                      name="Price"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      bsSize="lg"
                      min={0}
                      value={this.state.Price}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <Row>
                    <Col lg="2" sm="2" md="2">
                      <div>
                        <h5 className="mt-2"> OR</h5>
                      </div>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Button
                          style={{ width: "100%" }}
                          color="primary"
                          className="button add mt-2"
                          type="button"
                          // onClick={() => this.addFormFields()}
                          onClick={() => this.setState({ Addmore: true })}
                        >
                          Add
                        </Button>

                        {/* <Label>Variety</Label>
                        <Input
                          type="text"
                          placeholder="Variety..."
                          name="variety"
                          bsSize="lg"
                          value={this.state.variety}
                          onChange={this.changeHandler}
                        /> */}
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>{" "}
              </Row>
              {this.state.Addmore ? (
                <>
                  <Row>
                    <Col lg="12">
                      {this.state.formValues.map((element, index) => (
                        <div className="" key={index}>
                          <Row className="py-1">
                            <Col lg="4" sm="4">
                              <label>Product Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="PName"
                                value={element.PName || ""}
                                onChange={(e) => this.handleChange(index, e)}
                              />
                            </Col>
                            <Col lg="4" sm="4">
                              <label>Price</label>
                              <input
                                className="form-control"
                                type="number"
                                min={0}
                                onKeyDown={(e) =>
                                  ["e", "E", "+", "-"].includes(e.key) &&
                                  e.preventDefault()
                                }
                                name="price"
                                value={element.price || ""}
                                onChange={(e) => this.handleChange(index, e)}
                              />
                            </Col>
                            <Col>
                              {index ? (
                                <Button
                                  color="primary"
                                  type="button"
                                  className="button remove mt-2"
                                  onClick={() => this.removeFormFields(index)}
                                >
                                  Remove
                                </Button>
                              ) : null}
                              <Button
                                color="primary"
                                className="button add mt-2  mx-3"
                                type="button"
                                onClick={() => this.addFormFields()}
                              >
                                Add
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </>
              ) : null}

              <Row>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Stock </Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Amount In Number"
                      name="stock"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      bsSize="lg"
                      value={this.state.stock}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Discount Price</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Discount Price"
                      name="DiscountPrice"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      bsSize="lg"
                      value={this.state.DiscountPrice}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>SHIPPING FEE(₹)</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Number..."
                      name="shipmentfee"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      bsSize="lg"
                      value={this.state.shipmentfee}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>TAX RATE (%)</Label>
                    <Input
                      type="number"
                      placeholder="Tax in Percentage"
                      name="taxrate"
                      min={0}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      bsSize="lg"
                      value={this.state.taxrate}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>TAGS</Label>
                    <Input
                      type="text"
                      placeholder="Type here..."
                      name="Tags"
                      bsSize="lg"
                      value={this.state.Tags}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="4" sm="4">
                  <FormGroup>
                    <Label>Media & Published (Select multiple files)</Label>
                    <CustomInput
                      multiple
                      style={{ cursor: "pointer" }}
                      accept="image/png,image/jpeg,image/jpg"
                      name="image[]"
                      type="file"
                      onChange={this.onChangeHandler3}
                    />
                  </FormGroup>
                </Col>

                {this.state.images && (
                  <Col lg="8" sm="8">
                    <Label>Existing Images</Label>
                    <FormGroup>
                      {this.state.images?.map((value) => {
                        console.log(value);
                        return (
                          <span className="mx-1">
                            <img
                              style={{ borderRadius: "12px" }}
                              src={value}
                              width="150px"
                              height="150px"
                              alt="images"
                            />
                          </span>
                        );
                      })}
                    </FormGroup>
                  </Col>
                )}
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Update Product
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default EditProduct;
