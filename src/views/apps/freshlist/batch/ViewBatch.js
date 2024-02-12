import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { history } from "../../../../history";
import "../../../../assets/scss/pages/app-ecommerce-shop.scss";
import "../../../../assets/scss/pages/users.scss";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";

class ViewBatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewone_addbatch/${id}`)
      .then(response => {
        console.log(response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Row>
            <Col sm="12">
              {/* <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    href="/app/freshlist/customer/customerList"
                    tag="a"
                  >
                    Customer List
                  </BreadcrumbItem>
                  <BreadcrumbItem active> View Customer</BreadcrumbItem>
                </Breadcrumb>
              </div> */}
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View
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
            <CardBody className="pb-0">
              <Row className="m-2">
                <Col sm="12" className="my-1">
                  <Row className="m-3">
                    {/* <Col sm="4">
                      <img
                        src={this.state.data?.image}
                        alt="aaa"
                        width="200"
                        height="200"
                      />
                    </Col> */}
                    <Col sm="8">
                      <Row className="m-2">
                        <Col>
                          <h6>Batch Number</h6>
                        </Col>
                        <Col>
                          <h6>
                            <b>{this.state.data?.batch}</b>
                          </h6>
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col>
                          <h6>Rack Number</h6>
                        </Col>
                        <Col>
                          <h6>
                            <b>{this.state.data?.rack_no}</b>
                          </h6>
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col>
                          <h6>Shelf Life</h6>
                        </Col>
                        <Col>
                          <h6>
                            <b>{this.state.data?.shelf_life}</b>
                          </h6>
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col>
                          <h6>Expiry Date</h6>
                        </Col>
                        <Col>
                          <h6>
                            <b>{this.state.data?.expiry_date}</b>
                          </h6>
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col>
                          <h6>Stock</h6>
                        </Col>
                        <Col>
                          <h6>
                            <b>{this.state.data?.stock}</b>
                          </h6>
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col>
                          <h6>Notify</h6>
                        </Col>
                        <Col>
                          <h6>
                            <b>{this.state.data?.notify}</b>
                          </h6>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewBatch;
