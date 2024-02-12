import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalHeader,
  Modal,
  ModalBody,
  Button,
  Col,
  Row,
  Badge,
  Input,
} from "reactstrap";
import SubscribersGained from "../../ui-elements/cards/statistics/SubscriberGained";
import RevenueGenerated from "../../ui-elements/cards/statistics/RevenueGenerated";
import QuaterlySales from "../../ui-elements/cards/statistics/QuaterlySales";
import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived";
import RevenueChart from "../../ui-elements/cards/analytics/Revenue";
import GoalOverview from "../../ui-elements/cards/analytics/GoalOverview";
import BrowserStats from "../../ui-elements/cards/analytics/BrowserStatistics";
import ClientRetention from "../../ui-elements/cards/analytics/ClientRetention";
import SessionByDevice from "../../ui-elements/cards/analytics/SessionByDevice";
import CustomersChart from "../../ui-elements/cards/analytics/Customers";
import ChatWidget from "../../../components/@vuexy/chatWidget/ChatWidget";
import { ChevronDown, ChevronRight, Edit, Trash2 } from "react-feather";
import "../../../assets/scss/plugins/charts/apex-charts.scss";
import { _Get, _PostSave } from "../../../../ApiEndPoint/ApiCalling";
import {
  Save_dashboard_Tabs,
  View_dashboard_Tabs,
} from "../../../../ApiEndPoint/Api";
import swal from "sweetalert";

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7";
const cardList = ["a", "b", "c", "d"];
class EcommerceDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      List: [],
      basicList: [
        {
          key: 1,
          NavLink: "/app/SoftNumen/ticket/Partywiseledger",
          value: <SubscribersGained />,
          Name: "Ledger",
          Show: true,
        },
        {
          key: 2,
          NavLink: "/app/SoftNumen/ticket/Partywiseledger",
          value: <RevenueGenerated />,
          Name: "Sales",
          Show: true,
        },
        {
          key: 3,
          NavLink: "/app/SoftNumen/ticket/Partywiseledger",
          value: <QuaterlySales />,
          Name: "Purchase",
          Show: true,
        },
        {
          key: 4,
          NavLink: "/app/SoftNumen/ticket/Partywiseledger",
          value: <OrdersReceived />,
          Name: "Transaction ",
          Show: true,
        },
      ],
    };
  }
  async componentDidMount() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    await _Get(View_dashboard_Tabs, userData?._id)
      .then((res) => {
        let AllTab = [];
        let SelectedTab = res?.Tab?.tab;
        let mytab = this.state.basicList?.map((ele, index) => {
          SelectedTab?.map((val, i) => {
            if (ele?.Name == val?.Name) {
              ele["Show"] = val?.show;
              AllTab.push(ele);
            }
          });
        });

        this.setState({ List: AllTab });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  LookupviewStart = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  hanldeSetBox = (e, ele, i) => {
    let allList = this.state.basicList;
    if (e.target.checked) {
      allList[i]["Show"] = e.target.checked;
    } else {
      allList[i]["Show"] = e.target.checked;
    }
    this.setState({ List: allList });
  };

  handleTogglemodal = () => {
    this.LookupviewStart();
  };

  handleSubmitBottomData = async (e) => {
    e.preventDefault();

    let userData = JSON.parse(localStorage.getItem("userData"));
    let tabs = this.state.List?.map((ele) => {
      return {
        key: ele?.key,
        Name: ele?.Name,
        show: ele?.Show,
      };
    });
    let payload = {
      userId: userData?._id,
      tab: tabs,
    };

    await _PostSave(Save_dashboard_Tabs, payload)
      .then((res) => {
        console.log(res);
        this.LookupviewStart();
      })
      .catch((err) => {
        console.log(err);
        swal("Somthing Went Wrong");
      });
  };

  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          {this.state.basicList &&
            this.state.basicList?.map((ele) => (
              <>
                {ele?.Show && ele?.Show && (
                  <Col
                    onClick={() => this.props.history.push(ele?.NavLink)}
                    lg="3"
                    md="6"
                    sm="6">
                    {ele.value}
                  </Col>
                )}
              </>
            ))}
          {/* <Col lg="3" md="6" sm="6">
            <SubscribersGained />
          </Col>
          <Col lg="3" md="6" sm="6">
            <RevenueGenerated />
          </Col>
          <Col lg="3" md="6" sm="6">
            <QuaterlySales />
          </Col>
          <Col lg="3" md="6" sm="6">
            <OrdersReceived />
          </Col> */}
          <span className="editbtn">
            <Edit
              onClick={this.handleTogglemodal}
              color="red"
              style={{ cursor: "pointer" }}
              size={18}
              className=""
            />
          </span>
          {/* <Col lg="3" md="6" sm="6">
            <SubscribersGained />
          </Col>
          <Col lg="3" md="6" sm="6">
            <RevenueGenerated />
          </Col>
          <Col lg="3" md="6" sm="6">
            <QuaterlySales />
          </Col>
          <Col lg="3" md="6" sm="6">
            <OrdersReceived />
          </Col> */}
        </Row>

        {/* <Row className="match-height">
          <Col lg="8" md="6" sm="12">
            <RevenueChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
          <Col lg="4" md="6" sm="12">
            <GoalOverview strokeColor={$stroke_color} success={$success} />
          </Col>
        </Row> */}
        {/* <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            <BrowserStats />
          </Col>
          <Col lg="8" md="6" sm="12">
            <ClientRetention
              strokeColor={$stroke_color}
              primary={$primary}
              danger={$danger}
              labelColor={$label_color}
            />
          </Col>
        </Row> */}
        <Row>
          {/* <Col lg="4" md="12">
            <SessionByDevice
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col> */}
          {/* <Col lg="4" md="12">
            <SessionByDevice
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col> */}

          {/* <Col lg="4" md="12" className="text-center align-middle">
            <CustomersChart
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col> */}
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.LookupviewStart}
          className={this.props.className}
          style={{ maxWidth: "1050px" }}>
          <ModalHeader toggle={this.LookupviewStart}>
            Dahboard Card Fileds
          </ModalHeader>
          <ModalBody className="modalbodyhead">
            <div className="d-flex justify-content-center mb-1">
              <h4>Edit Dashboard Data</h4>
            </div>

            <Row>
              <Col>
                {this.state.basicList &&
                  this.state.basicList?.map((ele, i) => (
                    <div key={i}>
                      <div>
                        <Input
                          checked={ele?.Show}
                          type="checkbox"
                          className="mx-1 p-2"
                          onChange={(e) => this.hanldeSetBox(e, ele, i)}
                        />
                      </div>
                      <div>
                        <h4 className="item mx-3">{ele?.Name}</h4>
                      </div>
                    </div>
                  ))}

                <div className="d-flex justify-content-center">
                  <Button color="primary" onClick={this.handleSubmitBottomData}>
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EcommerceDashboard;
