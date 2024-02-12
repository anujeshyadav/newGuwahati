import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Card,
  CardTitle,
  CustomInput,
  FormGroup,
  Badge,
} from "reactstrap";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import CheckBoxesVuexy from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check, CloudLightning } from "react-feather";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import swal from "sweetalert";
import {
  Create_CompanyDetails,
  EditUserProfile,
  ViewCompanyDetails,
} from "../../../ApiEndPoint/ApiCalling";
import "../../../assets/scss/pages/users-profile.scss";
import UserContext from "../../../context/Context";
import moment from "moment-timezone";
import { Image_URL } from "../../../ApiEndPoint/Api";

class UserProfile extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      modal: false,
      Prefix: "",
      Suffix: "",
      Createmode: false,
      // formData: {
      //   Country: '',
      //   State: '',
      //   City: '',
      // },
      Loading: "Submit",
      selectedCountry: null,
      selectedState: null,
      selectedCity: null,
      name: "",
      LoginData: {},
      Companylogo: {},
      CompanyDetails: {},
      CompanyAddress: "",
      Signature: {},
      formData: "",
      CompanyNumber: "",
      gstNumber: "",
      companyName: "",
      email: "",
      cnfmPassword: "",
      password: "",
    };
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  //Image Submit Handler
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
    // console.log(event.target.files[0]);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCountry !== prevState.selectedCountry) {
      console.log(this.state.selectedCountry);
      console.log(this.state.selectedCountry?.isoCode);
      console.log(
        State?.getStatesOfCountry(this.state.selectedCountry?.isoCode)
      );
    }
  }
  async componentDidMount() {
    let pageparmission = await JSON.parse(localStorage.getItem("userData"));
    this.setState({ LoginData: pageparmission });
    this.setState({
      // data: response.data.data,
      name: pageparmission?.name,
      email: pageparmission?.email,
      cnfmPassword: pageparmission?.Userinfo?.password,
    });
    await ViewCompanyDetails(pageparmission?._id, pageparmission?.database)
      .then((res) => {
        this.setState({ CompanyDetails: res?.CompanyDetail });
      })
      .catch((err) => {
        console.log(err);
      });
    // const countries = Country.getAllCountries();
    // this.setState({ countries });
    // const UserInformation = this.context;
    // console.log(UserInformation?.CompanyDetails);

    // console.log(pageparmission);

    // console.log(this.context);
  }

  // handleCountryChange = (selectedOption) => {
  //   this.setState({
  //     selectedCountry: selectedOption,
  //     formData: {
  //       ...this.state.formData,
  //       Country: selectedOption ? selectedOption.name : '',
  //     },
  //     selectedState: null,
  //     selectedCity: null,
  //   });
  // };

  // handleStateChange = (selectedOption) => {
  //   this.setState({
  //     selectedState: selectedOption,
  //     formData: {
  //       ...this.state.formData,
  //       State: selectedOption ? selectedOption.name : '',
  //     },
  //     selectedCity: null,
  //   });
  // };

  // handleCityChange = (selectedOption) => {
  //   this.setState({
  //     selectedCity: selectedOption,
  //     formData: {
  //       ...this.state.formData,
  //       City: selectedOption ? selectedOption.name : '',
  //     },
  //   });
  // };
  handleCountryChange = (selectedOption) => {
    this.setState({ selectedCountry: selectedOption });
  };

  handleStateChange = (selectedOption) => {
    this.setState({ selectedState: selectedOption });
  };

  handleCityChange = (selectedOption) => {
    this.setState({ selectedCity: selectedOption });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ Loading: "Loading..." });
    let userData = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("email", this.state.email);
    if (this.state.password) {
      data.append("Password", this.state.password);
    }
    data.append("cnfmPassword", this.state.cnfmPassword);
    // data.append("dateFormat", this.state.Date_format);
    // data.append("dateTimeFormat", this.state.Date_Time_format);
    // data.append("locale", this.state.Locale);
    // data.append("timeZone", this.state.T_Zone);
    // data.append("currency", this.state.Currency);
    // if (this.state.selectedFile !== null) {
    //   data.append("file", this.state.selectedFile);
    // }
    if (this.state.password) {
      if (this.state.password == this.state.cnfmPassword) {
        EditUserProfile(userData?.accountId, data)
          .then((response) => {
            console.log(response);
            let userData = { ...response?.updateUser[0], ...response?.user };
            this.context?.setUserInformatio(userData);
            localStorage.setItem("userData", JSON.stringify(userData));

            if (response?.status) {
              swal("Success!", "Updated Successfully", "success");
              this.setState({ Loading: "Submit" });
            }
          })
          .catch((error) => {
            swal("Error!", "Something went Wrong", "error");
            this.setState({ Loading: "Submit" });
            console.log(error.response);
          });
      } else {
        swal("Password Does Not Match");
        this.setState({ Loading: "Submit" });
      }
    } else {
      EditUserProfile(userData?.accountId, data)
        .then((response) => {
          console.log(response);
          let userData = { ...response?.updateUser[0], ...response?.user };
          this.context?.setUserInformatio(userData);
          localStorage.setItem("userData", JSON.stringify(userData));

          if (response?.status) {
            swal("Success!", "Updated Successfully", "success");
            this.setState({ Loading: "Submit" });
          }
        })
        .catch((error) => {
          console.log("object");
          swal("Error!", "Something went Wrong", "error");
          console.log(error.response);
          this.setState({ Loading: "Submit" });
        });
    }
  };
  HandleUploadLogo = async (e) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let formData = new FormData();
    formData.append("created_by", pageparmission?._id);
    formData.append("email", this.state.email);
    formData.append("name", this.state.companyName);
    formData.append("mobileNo", this.state.CompanyNumber);
    formData.append("file", this.state.Companylogo);
    formData.append("gstNo", this.state.gstNumber);
    formData.append("Prefix", this.state.Prefix);
    formData.append("Suffix", this.state.Suffix);
    formData.append("address", this.state.CompanyAddress);
    formData.append("signature", this.state.Signature);

    await Create_CompanyDetails(formData)
      .then((res) => {
        console.log(res);
        swal("Company Details are Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.state.Loading);
    this.toggleModal();
  };
  render() {
    console.log(this.context);
    const { selectedCountry, selectedState, selectedCity } = this.state;
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Profile"
          breadCrumbParent="Pages"
          breadCrumbActive="Profile"
        />
        <div id="user-profile">
          <Row className="m-0 justify-content-center">
            <Col lg="4" md="4" xl="4" sm="12">
              <Card className="bg-authentication rounded-0 mb-0 w-100">
                <div className="profile-img text-center st-1">
                  <ul
                    style={{ listStyleType: "none" }}
                    className="lst-1 usrdatlist">
                    <li className="lst-2 p-1">
                      FirstName:
                      <span className="lst-3">
                        <strong>
                          {this.context?.UserInformatio.firstName}
                        </strong>
                      </span>
                    </li>
                    <li className="lst-2 p-1">
                      LastName:
                      <span className="lst-3">
                        <strong>{this.context?.UserInformatio.lastName}</strong>
                      </span>
                    </li>
                    <li className="lst-2 p-1">
                      Email:
                      <span className="lst-3">
                        <strong>{this.context?.UserInformatio?.email}</strong>
                      </span>
                    </li>
                    <li className="lst-2 p-1">
                      Country:
                      <span className="lst-3">
                        <strong>{this.context?.UserInformatio?.Country}</strong>
                      </span>
                    </li>
                    <li className="lst-2 p-1">
                      State:
                      <span className="lst-3">
                        <strong>{this.context?.UserInformatio?.State}</strong>
                      </span>
                    </li>
                    <li className="lst-2 p-1">
                      City:
                      <span className="lst-3">
                        <strong>{this.context?.UserInformatio?.City}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>
            <Col
              sm="12"
              xl="8"
              lg="8"
              md="8"
              className="d-flex justify-content-center">
              <Card className="bg-authentication rounded-0 mb-0 w-100">
                <Row className="container p-2">
                  <Col>
                    <span className="mb-2 mt-2">Edit Profile</span>
                  </Col>
                  <Col>
                    <Badge
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ Addcolor: true });
                      }}
                      style={{ cursor: "pointer" }}
                      className="mb-1">
                      Choose Background color
                    </Badge>
                    {this.state.Addcolor && this.state.Addcolor && (
                      <>
                        <div className="mt-1">
                          <input
                            onChange={(e) => {
                              localStorage.setItem(
                                "UserDefinedcoler",
                                e.target.value
                              );
                              this.context?.SetmyCustomColor(e.target.value);
                            }}
                            type="color"
                            className=""
                          />
                          <Badge
                            className="mx-3"
                            color="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({ Addcolor: false });
                            }}>
                            Submit
                          </Badge>
                        </div>
                      </>
                    )}
                  </Col>
                  {this.state.LoginData?.rolename?.position == 1 ? (
                    <>
                      <Col>
                        <div className="d-flex justify-content-end">
                          <Badge
                            style={{ cursor: "pointer" }}
                            className=""
                            onClick={(e) => {
                              e.preventDefault();
                              this.toggleModal();
                              this.setState({ Createmode: false });
                            }}
                            color="primary">
                            Add Company Details
                          </Badge>
                          <Badge
                            onClick={async (e) => {
                              e.preventDefault();
                              this.toggleModal();
                              this.setState({ Createmode: true });
                            }}
                            color="primary"
                            className=" ml-3">
                            View
                          </Badge>
                        </div>
                      </Col>
                    </>
                  ) : null}
                </Row>
                <Form className="m-1" onSubmit={this.submitHandler}>
                  <div className="st-2">
                    <CardTitle></CardTitle>

                    <Row className="m-0">
                      <Col sm="12" lg="6" md="6" className="p-1">
                        <Label>FirstName</Label>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="FirstName"
                          value={this.state.firstName}
                          onChange={this.changeHandler}
                        />
                      </Col>

                      <Col sm="12" lg="6" md="6" className="p-1">
                        <Label>LastName</Label>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="LastName"
                          value={this.state.name}
                          onChange={this.changeHandler}
                        />
                      </Col>
                      <Col sm="12" lg="6" md="6" className="p-1">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="email"
                          value={this.state.email}
                          onChange={this.changeHandler}
                        />
                      </Col>

                      <Col lg="6" md="6" sm="12">
                        <FormGroup>
                          <Label>Select Country</Label>
                          <Select
                            options={Country.getAllCountries()}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.name}
                            value={selectedCountry}
                            onChange={this.handleCountryChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6" md="6" sm="12">
                        <FormGroup>
                          <Label>Select State</Label>
                          <Select
                            options={State?.getStatesOfCountry(
                              selectedCountry?.isoCode
                            )}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.name}
                            value={selectedState}
                            onChange={this.handleStateChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="6" sm="12">
                        <FormGroup>
                          <Label>Select City</Label>
                          <Select
                            options={City.getCitiesOfState(
                              selectedState?.countryCode,
                              selectedState?.isoCode
                            )}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.name}
                            value={selectedCity}
                            onChange={this.handleCityChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="12" lg="6" md="6" className="p-1">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.changeHandler}
                        />
                      </Col>

                      <Col sm="12" lg="6" md="6" className="p-1">
                        <Label>Confirm Password</Label>
                        <Input
                          type="password"
                          name="cnfmPassword"
                          placeholder="Reset password"
                          value={this.state.cnfmPassword}
                          onChange={this.changeHandler}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <CheckBoxesVuexy
                          color="primary"
                          className="mb-1 mx-1"
                          icon={<Check className="vx-icon" size={16} />}
                          label=" I accept the terms & conditions."
                          defaultChecked={true}
                        />
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple color="primary" type="submit">
                        {this.state.Loading}
                      </Button.Ripple>
                    </div>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.toggleModal}>
            Add Company Details
          </ModalHeader>
          <ModalBody>
            {this.state.Createmode && this.state.Createmode ? (
              <>
                <h2>Existing Details</h2>
                <div className="p-1">
                  Name: {this.state.CompanyDetails?.name}
                </div>
                <div className="p-1">
                  GST Number: {this.state.CompanyDetails?.gstNo}
                </div>
                <div className="p-1">
                  Address: {this.state.CompanyDetails?.address}
                </div>
                <div className="p-1">
                  mobileNo: {this.state.CompanyDetails?.mobileNo}
                </div>
                <div className="p-1">
                  Email: {this.state.CompanyDetails?.email}
                </div>
                <div className="p-1">
                  Logo:{" "}
                  {this.state.CompanyDetails?.logo && (
                    <img
                      width={100}
                      className="mx-1"
                      height={80}
                      src={`${Image_URL}/Images/${this.state.CompanyDetails?.logo}`}
                      alt="NA"
                    />
                  )}
                </div>
                <div className="p-1">
                  signature:{" "}
                  {this.state.CompanyDetails?.signature &&
                    this.state.CompanyDetails?.signature && (
                      <img
                        className="mx-1"
                        width={60}
                        height={60}
                        src={`${Image_URL}/Images/${this.state.CompanyDetails?.signature}`}
                        alt="NA"
                      />
                    )}
                </div>
              </>
            ) : (
              <>
                {this.state.LoginData?.rolename?.position == 1 ? (
                  <>
                    <Card className="bg-authentication rounded-0 mb-0 w-100">
                      <Form className="p-1" onSubmit={this.HandleUploadLogo}>
                        <div className="st-2">
                          <CardTitle>
                            <h4 className="mb-3">Add Company Details</h4>
                          </CardTitle>

                          <Row className="m-0">
                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>signature</Label>
                              <CustomInput
                                required
                                type="file"
                                placeholder="Signature"
                                onChange={(e) =>
                                  this.setState({
                                    Signature: e.target.files[0],
                                  })
                                }
                              />
                            </Col>
                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>Company Logo</Label>
                              <CustomInput
                                required
                                type="file"
                                placeholder="Companylogo"
                                onChange={(e) =>
                                  this.setState({
                                    Companylogo: e.target.files[0],
                                  })
                                }
                              />
                            </Col>
                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>Company Address</Label>
                              <textarea
                                required
                                type="textarea"
                                className="form-control"
                                name="CompanyAddress"
                                placeholder="Company Address"
                                value={this.state.CompanyAddress}
                                onChange={this.changeHandler}
                              />
                            </Col>
                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>Company Name</Label>
                              <input
                                required
                                type="text"
                                className="form-control"
                                name="companyName"
                                placeholder="Company Address"
                                value={this.state.companyName}
                                onChange={this.changeHandler}
                              />
                            </Col>
                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>Company Number</Label>
                              <Input
                                required
                                type="text"
                                className="formControl"
                                name="CompanyNumber"
                                placeholder="Company Number"
                                value={this.state.CompanyNumber}
                                onChange={this.changeHandler}
                              />
                            </Col>

                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>Company Email</Label>
                              <Input
                                required
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.changeHandler}
                              />
                            </Col>
                            <Col sm="12" lg="6" md="6" className="p-1">
                              <Label>GST Number</Label>
                              <Input
                                type="text"
                                required
                                name="gstNumber"
                                className="from-control"
                                placeholder="gstNumber"
                                value={this.state.gstNumber}
                                onChange={this.changeHandler}
                              />
                            </Col>
                          </Row>
                          <div className="container">
                            {/* <div className="d-flex justify-content-center">
                              <h3>Add Bills Prefix and Suffix</h3>
                            </div> */}
                            <Row>
                              <Col sm="12" lg="6" md="6" className="p-1">
                                <Label>Bill Prefix</Label>
                                <Input
                                  required
                                  type="text"
                                  name="Prefix"
                                  className="from-control"
                                  placeholder="Prefix Enter here"
                                  value={this.state.Prefix}
                                  onChange={this.changeHandler}
                                />
                              </Col>
                              <Col sm="12" lg="6" md="6" className="p-1">
                                <Label>Bill Postfix</Label>
                                <Input
                                  required
                                  type="text"
                                  name="Suffix"
                                  className="from-control"
                                  placeholder="suffix Enter here"
                                  value={this.state.Suffix}
                                  onChange={(e) => {
                                    const newValue = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    this.setState({ Suffix: newValue });
                                  }}
                                  // onChange={this.changeHandler}
                                />
                              </Col>
                            </Row>
                          </div>
                          <Row>
                            <Col>
                              <CheckBoxesVuexy
                                color="primary"
                                className="mb-1 mx-1"
                                icon={<Check className="vx-icon" size={16} />}
                                label=" I accept the terms & conditions."
                                defaultChecked={true}
                              />
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-center">
                            <Button.Ripple color="primary" type="submit">
                              {this.state.Loading}
                            </Button.Ripple>
                          </div>
                        </div>
                      </Form>
                    </Card>
                  </>
                ) : null}
              </>
            )}
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default UserProfile;