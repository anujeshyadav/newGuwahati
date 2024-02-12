import React from "react";
import { Card, CardBody, Media, Row, Col, Button, Label, CustomInput } from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import { history } from "../../../../history";
import "../../../../assets/css/main.css"

class ViewRejectedRequest extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: {},
        };
    }
    componentDidMount() {
        //console.log(this.props.match.params);
        let { id } = this.props.match.params;
        axiosConfig
            .get(`/viewonebanner/${id}`)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.data);
                this.setState({ data: response.data.data });
            })
            .catch((error) => {
                console.log(error);
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
                                    <h1 col-sm-6 className="float-left">
                                        Rejected Request Detail
                                    </h1>
                                </Col>
                                <Col className="float-right">
                                    <h3>Change Refund Status</h3>
                                    <CustomInput
                                        type="select"
                                        name="type"
                                        value={this.state.type}
                                        onChange={this.changeHandler}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Refunded">Refunded</option>
                                        <option value="Rejected">Rejected</option>
                                    </CustomInput>
                                </Col>
                                <Col className="m-2">
                                    <Button
                                        className=" btn btn-danger float-right"
                                        onClick={() => history.push("/app/freshlist/refundrequest/rejectedRequest")}
                                    >
                                        Back
                                    </Button>
                                </Col>

                            </Row>
                            <CardBody>
                                <Row className="mx-0" col="12">
                                    <Col className="pl-0" sm="12" lg="6">
                                        <Media className="d-sm-flex d-block">
                                            <Media className="mt-md-1 mt-0" left>

                                                {this.state.data?.banner_img?.map((i) => (
                                                    <img
                                                        className="border-black m-0"
                                                        src={i}
                                                        alt="user avatar"
                                                        height="400"
                                                    />
                                                ))}

                                            </Media>
                                            <Media body>
                                                <Row className="ml-4">
                                                    <Col sm="9" md="12" lg="12">
                                                        <div className="users-page-view-table">
                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Refund id</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.banner_title}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Item Image</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.bannertype}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Payment Method</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.bannertype}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Refund Status</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.bannertype}</span>
                                                                </div>
                                                            </div>

                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Tax</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.bannertype}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Discount</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.bannertype}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex user-info">
                                                                <div className="user-info-title font-weight-bold">
                                                                    <h3>Price:</h3>
                                                                </div>
                                                                <div className="text-truncate">
                                                                    <span>{this.state.data.bannertype}</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </Col>

                                                </Row>
                                            </Media>
                                        </Media>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment >
        );
    }
}
export default ViewRejectedRequest;