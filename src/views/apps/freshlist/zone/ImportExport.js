import React from "react";
import { Row, Col, Card, CardTitle, CardText } from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
import "../../../../assets/scss/pages/dashboard-analytics.scss";
import { FcNews, FcRules, FcCancel, FcOk, FcShipped, } from "react-icons/fc"
import { BsBoxSeam } from "react-icons/bs"
import { TbTruckDelivery } from "react-icons/tb"
import { AiOutlineCloseCircle } from "react-icons/ai"

class ImportExport extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            product: {},
            customer: {},
            store: {},
            seller: {},
            order: {},
            banner: {},
            brand: {},
            total_sub: {},
            Coupon: {},
        };
    }

    componentDidMount() {
        axiosConfig
            .get("/totalproduct")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ product: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("http://35.154.86.59/api/user/totalcustomer")
            .then((response) => {
                console.log(response.data);

                this.setState({ customer: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axiosConfig
            .get("/totalstore")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ store: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axiosConfig
            .get("/totalsale")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ sale: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axiosConfig
            .get("/totalorder")
            .then((response) => {
                console.log(response.data);
                console.log(response.data.data);
                this.setState({ order: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axiosConfig
            .get("/totalbrand")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ brand: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axiosConfig
            .get("/totalbanner")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ banner: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        axiosConfig
            .get("/gettotalcoupon")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ Coupon: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axiosConfig
            .get("/total_sub")
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.data);
                this.setState({ total_sub: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <React.Fragment>
                <Row className="match-height">
                    <Col lg="3" md="12">
                        <Card className="" body inverse>
                            <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                                <FcNews />&nbsp;&nbsp;
                                Categories
                            </CardTitle>

                            {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.brand.data}
              </CardText> */}
                        </Card>
                    </Col>
                    <Col lg="3" md="12">
                        <Card className="" body inverse>
                            <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                                <FcOk />&nbsp;&nbsp;
                                Subcategories
                            </CardTitle>
                            {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.banner.data}
              </CardText> */}
                        </Card>
                    </Col>
                    <Col lg="3" md="12">
                        <Card className="" body inverse>
                            <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                                <BsBoxSeam style={{ color: 'cornflowerblue' }} />&nbsp;&nbsp;
                                vendors
                            </CardTitle>
                            {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.total_sub.data}
              </CardText> */}
                        </Card>
                    </Col>
                    <Col lg="3" md="12">
                        <Card className="" body inverse>
                            <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                                <FcShipped />&nbsp;&nbsp;
                                Products
                            </CardTitle>
                            {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                        </Card>
                    </Col>
                    <Col lg="3" md="12">
                        <Card className="" body inverse>
                            <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>

                                <TbTruckDelivery />&nbsp;&nbsp;
                                Earning
                            </CardTitle>
                            {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                        </Card>
                    </Col>
                    <Col lg="3" md="12">
                        <Card className="" body inverse>
                            <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                                <FcCancel />&nbsp;&nbsp;
                                Payout
                            </CardTitle>
                            {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                        </Card>
                    </Col>

                </Row>
                {/* <div style={{ backgroundColor: 'white' }}>
          <h4 className="mb-1"> <FaWallet
            style={{ color: 'brown' }} />&nbsp;&nbsp;Admin Wallet</h4>
          <Row> */}
                {/* <Col lg="3" md="12">
              <Card className="bg-secondary" body inverse>
                <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                  In-House Earning
                </CardTitle>
                {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                {/* </Card> */}
                {/* </Col>  */}
                {/* <Col lg="3" md="12">
              <Card className="bg-secondary" body inverse>
                <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                  Commission Earned
                </CardTitle>
                {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                {/* </Card>
            </Col> */}
                {/* <Col lg="3" md="12">
              <Card className="bg-secondary" body inverse>
                <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                  Delivery Charge Earned
                </CardTitle>
                {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                {/* </Card>
            </Col> */}
                {/* <Col lg="3" md="12">
              <Card className="bg-secondary" body inverse>
                <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                  Pending Amount
                </CardTitle>
                {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                {/* </Card>
            </Col> */}
                {/* <Col lg="3" md="12">
              <Card className="bg-secondary" body inverse>
                <CardTitle className="mb-1" tag="h4" style={{ color: "black" }}>
                  Total Tax Collected
                </CardTitle>
                {/* <CardText tag="h3" style={{ color: "white" }}>
                {this.state.Coupon.data}
              </CardText> */}
                {/* </Card>
            </Col> */}
                {/* </Row>
        </div> */}
                {/* <div style={{ backgroundColor: "white" }}> */}
                {/* <Row>
          <Col lg="6" md="12">
            <Row><h3 className="mb-2"><b>Top Selling Category</b></h3></Row>
          </Col>

          <Col lg="6" md="12">
            <Row><h3><b>Top Popular Zone</b></h3></Row>
          </Col>
          <Col lg="6" md="12"><h4>Mart &nbsp;&nbsp;&nbsp;</h4>
            <h4>Digital Seller&nbsp;&nbsp;&nbsp;</h4>
            <h4>Deluxe Online&nbsp;&nbsp;&nbsp;</h4>
            <h4>Wellness Fair&nbsp;&nbsp;&nbsp;</h4>

          </Col>
          <Col lg="6" md="12">
            <h4>Wellness Fair &nbsp;&nbsp;&nbsp;<FaCartArrowDown /></h4>
            <h4>Mart Morning &nbsp;&nbsp;&nbsp;<FaCartArrowDown /></h4>
            <h4>Digital Seller &nbsp;&nbsp;&nbsp;<FaCartArrowDown /></h4>
            <h4>Deluxe Online &nbsp;&nbsp;&nbsp;<FaCartArrowDown /></h4>
          </Col>

        </Row> */}
                {/* </div> */}




            </React.Fragment>
        );
    }
}
export default ImportExport;