import React from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import axiosConfig from "../../../../axiosConfig";
import { history } from "../../../../history";
import { Route } from "react-router-dom";
import Axios from "axios";

class ViewVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    console.log("vendor id ", id);
    Axios.get(`http://3.6.37.16:8000/app/vender_getviewone/${id}`)
      .then(response => {
        console.log(response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h3 col-sm-6 className="float-left">
                    View
                  </h3>
                </Col>
                <Col>
                  <Route
                    render={({ history }) => (
                      <Button
                        className=" btn btn-danger float-right"
                        onClick={() =>
                          history.push("/app/freshlist/vendor/vendorList")
                        }
                      >
                        Back
                      </Button>
                    )}
                  />
                </Col>
              </Row>
              <CardBody>
                <MDBContainer className="py-0 h-100">
                  <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="12" xl="12">
                      <MDBCard>
                        <div
                          className="rounded-top text-white d-flex flex-row"
                          style={{ backgroundColor: "#000", height: "200px" }}
                        >
                          <div
                            className="ms-4 mt-5 d-flex flex-column"
                            style={{ width: "150px" }}
                          >
                            <MDBCardImage
                              src={this.state.data?.vendoor_img}
                              alt="Generic placeholder image"
                              className="mt-4 mb-2 img-thumbnail"
                              style={{
                                width: "200px",
                                zIndex: "1",
                              }}
                            />
                          </div>
                          <div
                            className="ml-2 ms-3"
                            style={{ marginTop: "130px" }}
                          >
                            <MDBTypography tag="h5" style={{ color: "#FFF" }}>
                              {this.state.data?.name}
                            </MDBTypography>
                            <MDBCardText>{this.state.data?.city}</MDBCardText>
                          </div>
                        </div>
                        {/* <div
                          className="p-4 text-black"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <div className="d-flex justify-content-end text-center py-1">
                            <div>
                              <MDBCardText className="mb-1 h5">253</MDBCardText>
                              <MDBCardText className="small text-muted mb-0">
                                Photos
                              </MDBCardText>
                            </div>
                            <div className="px-3">
                              <MDBCardText className="mb-1 h5">
                                1026
                              </MDBCardText>
                              <MDBCardText className="small text-muted mb-0">
                                Followers
                              </MDBCardText>
                            </div>
                            <div>
                              <MDBCardText className="mb-1 h5">478</MDBCardText>
                              <MDBCardText className="small text-muted mb-0">
                                Following
                              </MDBCardText>
                            </div>
                          </div>
                        </div> */}
                        <MDBCardBody className="text-black p-4">
                          <div className="mb-5 mt-2">
                            <div
                              className="p-4"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                                <MDBCardText className="lead fw-normal mb-0">
                                  Personal Information
                                </MDBCardText>
                              </div>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Email : {this.state.data?.email}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Mobile No. : {this.state.data?.mobile}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Door No. : {this.state.data?.door_number}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Street : {this.state.data?.street}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Location : {this.state.data?.location}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Pin Code : {this.state.data?.pincode}
                              </MDBCardText>
                              <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                                <MDBCardText className="lead fw-normal mb-0">
                                  Service Information
                                </MDBCardText>
                              </div>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Service Location :{" "}
                                {this.state.data?.service_location}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Service City : {this.state.data?.service_city}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Service PinCode :{" "}
                                {this.state.data?.service_pincode}
                              </MDBCardText>
                              <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                                <MDBCardText className="lead fw-normal mb-0">
                                  Account Information
                                </MDBCardText>
                              </div>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Aadhar Number : {this.state.data?.adhar_no}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                PanCard Number : {this.state.data?.pancard_no}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Account Name : {this.state.data?.cus_name}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Account Number : {this.state.data?.account_no}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Branch Name : {this.state.data?.branch}
                              </MDBCardText>
                              <MDBCardText
                                className="text-black mb-1"
                                style={{ fontWeight: "bold" }}
                              >
                                IFSC Number : {this.state.data?.ifsc_code}
                              </MDBCardText>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBCardText className="lead fw-normal mb-0">
                              Document Photos
                            </MDBCardText>
                          </div>
                          <MDBRow>
                            <MDBCol className="mb-2">
                              <MDBCardImage
                                src={this.state.data?.adhar_img_front}
                                alt="No Image"
                                className="w-100 h-80 rounded-3"
                                style={{ height: "50vh" }}
                              />
                            </MDBCol>
                            <MDBCol className="mb-2">
                              <MDBCardImage
                                src={this.state.data?.adhar_img_back}
                                alt="image 1"
                                className="w-100 h-80 rounded-3"
                                style={{ height: "50vh" }}
                              />
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="g-2">
                            <MDBCol className="mb-2">
                              <MDBCardImage
                                src={this.state.data?.pancard_img_front}
                                alt="image 1"
                                className="w-100 rounded-3"
                                style={{ height: "50vh" }}
                              />
                            </MDBCol>
                            <MDBCol className="mb-2">
                              <MDBCardImage
                                src={this.state.data?.pancard_img_back}
                                alt="image 1"
                                className="w-100 rounded-3"
                                style={{ height: "50vh" }}
                              />
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="g-2">
                            <MDBCol className="mb-2">
                              <MDBCardImage
                                src={this.state.data?.passbook_img}
                                alt="image 1"
                                className="w-100 rounded-3"
                                style={{ height: "50vh" }}
                              />
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default ViewVendor;
