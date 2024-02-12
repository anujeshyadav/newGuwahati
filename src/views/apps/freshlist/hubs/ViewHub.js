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
class ViewHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewone_hub/${id}`)
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
          {/* <Row>
            <Col sm="12">
              <div>
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
                  <BreadcrumbItem active> View CustomerList</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row> */}
          <Card className="overflow-hidden app-ecommerce-details py-3">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Hub
                </h1>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/freshlist/hubs/hubList")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Row className="ml-4">
                <Col sm="9" md="12" lg="12">
                  <div className="users-page-view-table">
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        HUB Name :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data?.name}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Description :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data?.desc}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Email :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data?.email}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Mobile No. :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data?.mobile}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Address :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data?.address}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Delivery Zone :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data?.delivery_zone}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Status :
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data.status}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewHub;
