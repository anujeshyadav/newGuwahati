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
import Multiselect from "multiselect-react-dropdown";

import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";
import swal from "sweetalert";

const selectItem1 = [];

const Selectedarray = [];
export class EditProductType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Address: "",
      fullname: "",
      GSTIN: "",
      B_City: "",
      checkbox: "",
      SelectedState: "",
      StateList: [],
      SelectedSupplierCity: [],
      SelectedSCity: [],

      CityList: [],

      S_City: "",
      Mobile_no: "",
      B_Country: "",
      S_Country: "",
      Phone_no: "",
      Place_of_Supply: "",
      B_State: "",
      S_State: "",
      B_Street: "",
      S_Street: "",
      B_PinCode: "",
      S_PinCode: "",
      setuserList: false,
      password: "",
      email: "",
      status: "",
      AssignRole: "",
      CompanyName: "",
      Companytype: "",
      Selectuser: "",
      UserName: "",
      UserId: "",
      City: "",
      Role: "",
      viewData: [],
      rolesList: [],
    };
  }
  async componentDidMount() {
    let { id } = this.props.match.params;
    const data = new FormData();
    data.append("user_id", id);
    await axiosConfig
      .post("/usereditview", data)
      .then((response) => {
        console.log(response.data.data);
        // console.log(response.data.data?.city_id);
        let myArray;
        let newdata;
        if (response.data.data?.city_id) {
          myArray = response.data.data?.city_id.split(",");
        }
        console.log(myArray);
        if (this.state.B_Street === this.state.S_Street) {
          this.setState({ checkbox: true });
        }
        const formdata = new FormData();
        formdata.append("state_id", response.data.data.state_id);
        axiosConfig
          .post(`/getcity`, formdata)
          .then((res) => {
            console.log(res?.data?.cities);
            newdata = res?.data?.cities?.filter((ele) => {
              if (myArray.includes(ele?.id)) {
                return ele;
              }
            });
            console.log(newdata);
            this.setState({ SelectedSupplierCity: newdata });
            this.setState({ selectedValue: newdata });
            this.setState({ CityList: res?.data?.cities });
          })
          .catch((err) => {
            console.log(err);
          });
        formdata.append("state_id", response.data.data.billing_state);
        axiosConfig
          .post(`/getcity`, formdata)
          .then((res) => {
            // console.log(res?.data?.cities);
            this.setState({ CityList: res?.data?.cities });
          })
          .catch((err) => {
            console.log(err);
          });
        formdata.append("state_id", response.data.data.shipping_state);
        axiosConfig
          .post(`/getcity`, formdata)
          .then((res) => {
            // console.log(res?.data?.cities);
            this.setState({ CityList: res?.data?.cities });
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({
          SelectedState: response.data.data.state_id,
          selectedValue: newdata,
          B_City: response.data.data.billing_city,
          GSTIN: response.data.data.gstin_no,
          B_Country: response.data.data.billing_country,
          B_PinCode: response.data.data.billing_pincode,
          B_State: response.data.data.billing_state,
          B_Street: response.data.data.billing_street,
          CompanyName: response.data.data.company_name,
          Companytype: response.data.data.company_type,
          Role: response.data.data.role,
          AssignRole: response.data.data.role,
          email: response.data.data.email,
          fullname: response.data.data.full_name,
          Mobile_no: response.data.data.mobile,
          Phone_no: response.data.data.phone_no,
          Place_of_Supply: response.data.data.place_supply,
          S_City: response.data.data.shipping_city,
          S_Country: response.data.data.shipping_country,
          S_PinCode: response.data.data.shipping_pincode,
          S_State: response.data.data.shipping_state,
          S_Street: response.data.data.shipping_street,
          UserName: response.data.data.username,
          password: response.data.data.password,
          status: response.data.data.status,
          UserId: response.data.data.id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    await axiosConfig
      .get("/getallstates")
      .then((response) => {
        this.setState({
          StateList: response.data?.states,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig
      .post("/getrolelistdropdown", formdata)
      .then((response) => {
        const propertyNames = Object.values(response.data?.data?.roles);
        this.setState({
          productName: propertyNames,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlerStatus = (e) => {
    console.log(e.target.value);
    this.setState({ Status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeHandlerRole = (e) => {
    console.log(e.target.value);
    this.setState({ Role: e.target.value });
  };
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  submitHandler = (e) => {
    let { id } = this.props.match.params;
    e.preventDefault();
    const formdata = new FormData();
    let uniqueChars = [...new Set(selectItem1)];
    formdata.append("id", id);
    formdata.append("password", this.state.password);
    formdata.append("full_name", this.state.fullname);
    formdata.append("username", this.state.UserName);
    formdata.append("gstin_no", this.state.GSTIN);
    formdata.append("city", this.state.B_City);
    formdata.append("mobile", this.state.Mobile_no);
    formdata.append("email", this.state.email);
    formdata.append("status", this.state.status);
    formdata.append("role", this.state.AssignRole);
    formdata.append("company_name", this.state.CompanyName);
    formdata.append("company_type", this.state.Companytype);
    formdata.append("place_supply", this.state.Place_of_Supply);
    formdata.append("billing_street", this.state.B_Street);
    formdata.append("billing_city", this.state.B_City);
    formdata.append("billing_state", this.state.B_State);
    formdata.append("billing_country", this.state.B_Country);
    formdata.append("billing_pincode", this.state.B_PinCode);
    formdata.append("shipping_street", this.state.S_Street);
    formdata.append("shipping_city", this.state.S_City);
    formdata.append("shipping_state", this.state.S_State);
    formdata.append("shipping_country", this.state.S_Country);
    formdata.append("shipping_pincode", this.state.S_PinCode);
    formdata.append("phone_no", this.state.Phone_no);
    formdata.append("state_id", this.state.SelectedState);
    formdata.append("city_id", uniqueChars);

    axiosConfig
      .post("/usereditsubmit", formdata)
      .then((response) => {
        console.log(response.data);
        // this.setState({EditData:response.data.data})
        swal("Success!", "Submitted SuccessFull!", "success");
        // this.props.history.push(
        //   "/app/freshlist/attribute/productAttributeList"
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleMatchaddress = (value) => {
    this.setState({ checkbox: value });
    if (value) {
      this.setState({ S_Country: this.state.B_Country });
      this.setState({ S_State: this.state.B_State });
      this.setState({ S_City: this.state.B_City });
      this.setState({ S_Street: this.state.B_Street });
      this.setState({ S_PinCode: this.state.B_PinCode });
    } else {
      this.setState({ S_Country: "" });
      this.setState({ S_State: "" });
      this.setState({ S_City: "" });
      this.setState({ S_Street: "" });
      this.setState({ S_PinCode: "" });
    }
  };
  onSelect(selectedList, selectedItem) {
    console.log(selectedList);

    console.log(selectedList.length);

    if (selectedList.length) {
      for (var i = 0; i < selectedList.length; i++) {
        selectItem1.push(selectedList[i].id);
      }
    }
  }
  onRemove(selectedList, removedItem) {
    console.log(selectedList);
    console.log(selectItem1);
  }

  render() {
    return (
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit User
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/SoftNumen/userlist")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <Card>
            <div className="container ">
              <h4 className="py-2">
                Selected User Type :-{" "}
                {this.state.AssignRole === "Client" ? "Client" : "User"}
              </h4>
              <Row></Row>
            </div>

            <CardBody>
              <Form className="m-1" onSubmit={this.submitHandler}>
                <Row className="mb-2">
                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Name *</Label>
                      <Input
                        required
                        // disabled
                        type="text"
                        placeholder="Enter Your Name"
                        name="fullname"
                        value={this.state.fullname}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Display Name *</Label>
                      <Input
                        required
                        // disabled
                        type="text"
                        placeholder="Enter Your Name"
                        name="UserName"
                        value={this.state.UserName}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Mobile Number *</Label>
                      <Input
                        required
                        type="number"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        min={0}
                        maxLength={10}
                        size={10}
                        placeholder="0123456789"
                        name="Mobile_no"
                        value={this.state.Mobile_no}
                        onChange={this.changeHandler.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Phone Number </Label>
                      <Input
                        required
                        type="number"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        min={0}
                        maxLength={10}
                        size={10}
                        placeholder="0123456789"
                        name="Phone_no"
                        value={this.state.Phone_no}
                        onChange={this.changeHandler.bind(this)}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        required
                        disabled
                        type="email"
                        placeholder="abcd@gmail.com..."
                        name="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Company Name</Label>
                      <Input
                        required
                        type="text"
                        placeholder="Enter CompanyName"
                        name="CompanyName"
                        value={this.state.CompanyName}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Company Type</Label>
                      <Input
                        required
                        type="text"
                        placeholder="Enter Companytype"
                        name="Companytype"
                        value={this.state.Companytype}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>GSTIN</Label>
                      <Input
                        required
                        type="text"
                        placeholder="Enter GSTIN No."
                        name="GSTIN"
                        value={this.state.GSTIN}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <FormGroup>
                      <Label>Place of Supply</Label>
                      <Input
                        required
                        type="text"
                        placeholder="Enter Place_of_Supply"
                        name="Place_of_Supply"
                        value={this.state.Place_of_Supply}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <FormGroup>
                      <label for="cars">Choose State</label>
                      <select
                        name="SelectedState"
                        value={this.state.SelectedState}
                        onChange={(e) => {
                          console.log(e.target.value);
                          const formdata = new FormData();
                          this.setState({ SelectedState: e.target.value });
                          formdata.append("state_id", e.target.value);
                          axiosConfig
                            .post(`/getcity`, formdata)
                            .then((res) => {
                              console.log(res?.data?.cities);
                              this.setState({ CityList: res?.data?.cities });
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        // onChange={this.changeHandler}
                        className="form-control"
                      >
                        <option value="volvo">--Select State--</option>
                        {this.state.StateList &&
                          this.state.StateList?.map((ele, i) => (
                            <option key={i} value={ele?.id}>
                              {ele?.state_title}
                            </option>
                          ))}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="6">
                    <label for="cars">Choose City</label>
                    <Multiselect
                      options={this.state.CityList} // Options to display in the dropdown
                      selectedValues={
                        this.state.selectedValue ||
                        this.state.SelectedSupplierCity
                      } // Preselected value to persist in dropdown
                      onSelect={this.onSelect} // Function will trigger on select event
                      onRemove={this.onRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <h4 className="mt-4">Billing Address :</h4>

                    <Col className="py-2" lg="12" md="12" sm="12">
                      <FormGroup>
                        <label for="cars">Choose Country</label>
                        <select
                          placeholder="Enter City"
                          name="B_Country"
                          value={this.state.B_Country}
                          onChange={this.changeHandler}
                          className="form-control"
                        >
                          <option value="volvo">--Select Country--</option>
                          <option value="India">India</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <label for="cars">Choose State</label>
                        <select
                          name="B_State"
                          value={this.state.B_State}
                          onChange={(e) => {
                            console.log(e.target.value);
                            this.setState({ B_State: e.target.value });
                            const formdata = new FormData();
                            formdata.append("state_id", e.target.value);
                            axiosConfig
                              .post(`/getcity`, formdata)
                              .then((res) => {
                                this.setState({ CityList: res?.data?.cities });
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          // onChange={this.changeHandler}
                          className="form-control"
                        >
                          <option value="volvo">--Select State--</option>
                          {this.state.StateList &&
                            this.state.StateList?.map((ele, i) => (
                              <option key={i} value={ele?.id}>
                                {ele?.state_title}
                              </option>
                            ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <FormGroup>
                          <label for="cars">Choose City</label>
                          <select
                            placeholder="Enter City"
                            name="B_City"
                            value={this.state.B_City}
                            onChange={this.changeHandler}
                            className="form-control"
                          >
                            <option value="volvo">--Select City--</option>
                            {this.state.CityList &&
                              this.state.CityList?.map((value, index) => (
                                <option key={index} value={value?.id}>
                                  {value?.name}
                                </option>
                              ))}
                          </select>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <Label>Street</Label>
                        <Input
                          required
                          type="text"
                          placeholder="Enter Street"
                          name="B_Street"
                          value={this.state.B_Street}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <Label>PinCode</Label>
                        <Input
                          required
                          type="number"
                          onKeyDown={(e) =>
                            ["e", "E", "+", "-"].includes(e.key) &&
                            e.preventDefault()
                          }
                          min={0}
                          placeholder="Enter PinCode"
                          name="B_PinCode"
                          value={this.state.B_PinCode}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Col>
                  <Col>
                    <Row>
                      <Col lg="1" md="1">
                        <input
                          name="check"
                          checked={
                            this.state.B_Street === this.state.S_Street
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            this.handleMatchaddress(e.target.checked);
                          }}
                          style={{
                            height: "15px",
                            width: "20px",
                          }}
                          type="checkbox"
                        />
                      </Col>
                      <Col>
                        <h5> Same as Billing Address </h5>
                      </Col>
                    </Row>
                    <h4 className="py-2">Shipping Address :</h4>

                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <label for="cars">Choose Country</label>
                        <select
                          placeholder="Enter City"
                          name="S_Country"
                          disabled={this.state.checkbox ? true : false}
                          value={this.state.S_Country}
                          onChange={this.changeHandler}
                          className="form-control"
                        >
                          <option value="volvo">--Select Country--</option>
                          <option value="India">India</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <label for="cars">Choose State</label>
                        <select
                          name="S_State"
                          value={this.state.S_State}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            this.setState({ S_State: e.target.value });
                            const formdata = new FormData();
                            formdata.append("state_id", e.target.value);
                            axiosConfig
                              .post(`/getcity`, formdata)
                              .then((res) => {
                                console.log(res?.data?.cities);
                                this.setState({ CityList: res?.data?.cities });
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          // onChange={this.changeHandler}
                          className="form-control"
                        >
                          <option value="volvo">--Select State--</option>
                          {this.state.StateList &&
                            this.state.StateList?.map((ele, i) => (
                              <option key={i} value={ele?.id}>
                                {ele?.state_title}
                              </option>
                            ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <FormGroup>
                          <label for="cars">Choose City</label>
                          <select
                            placeholder="Enter City"
                            name="S_City"
                            value={this.state.S_City}
                            onChange={this.changeHandler}
                            className="form-control"
                          >
                            <option value="volvo">--Select City--</option>
                            {this.state.CityList &&
                              this.state.CityList?.map((value, index) => (
                                <option key={index} value={value?.id}>
                                  {value?.name}
                                </option>
                              ))}
                          </select>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <Label>Street</Label>
                        <Input
                          required
                          disabled={this.state.checkbox ? true : false}
                          type="text"
                          placeholder="Enter Street"
                          name="S_Street"
                          value={this.state.S_Street}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                      <FormGroup>
                        <Label>PinCode</Label>
                        <Input
                          required
                          disabled={this.state.checkbox ? true : false}
                          type="number"
                          onKeyDown={(e) =>
                            ["e", "E", "+", "-"].includes(e.key) &&
                            e.preventDefault()
                          }
                          min={0}
                          placeholder="Enter PinCode"
                          name="S_PinCode"
                          value={this.state.S_PinCode}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Col>
                </Row>

                {this.state.setuserList && (
                  <Row className="mt-2">
                    <Col lg="6" md="6">
                      <Label className="mt-2  mb-2"> Select Role</Label>

                      <CustomInput
                        type="select"
                        placeholder=""
                        name="AssignRole"
                        value={this.state.AssignRole}
                        onChange={this.changeHandler}
                      >
                        <option value="Admin">--Select Role--</option>

                        {this.state.productName &&
                          this.state.productName?.map((value, index) => (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          ))}
                      </CustomInput>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col lg="6" md="6" sm="6" className="mb-2">
                    <Label className="mb-1 py-2">
                      <h4>Status</h4>
                    </Label>
                    <div
                      className="form-label-group"
                      onChange={this.changeHandler1}
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
                        style={{ marginRight: "3px" }}
                        type="radio"
                        checked={
                          this.state.status === "Deactive" ? true : false
                        }
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
                    className="mr-1 mt-2 mx-2"
                  >
                    Submit
                  </Button.Ripple>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Card>
      </div>
    );
  }
}
export default EditProductType;
