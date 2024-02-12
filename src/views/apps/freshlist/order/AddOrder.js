import React from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Container } from "reactstrap";
import CustomerDetails from "./EditOrder/CustomerDetails";
import Products from "./EditOrder/Products";
import PaymentDetails from "./EditOrder/PaymentDetails";
import ShippingDetails from "./EditOrder/ShippingDetails";
import Totals from "./EditOrder/Totals";
function AddOrder() {
  return (
    <div>
      <Container>
        <Tabs onSelect={(index, label) => console.log(label + " selected")}>
          <Tab label="Customer Details">
            <CustomerDetails />
          </Tab>
          <Tab label="Products">
            <Products />
          </Tab>
          <Tab label="Payment Details">
            <PaymentDetails />
          </Tab>
          <Tab label="Shipping Details">
            <ShippingDetails />
          </Tab>
          <Tab label="Totals">
            <Totals />
          </Tab>
        </Tabs>
        <hr />
      </Container>
    </div>
  );
}

export default AddOrder;