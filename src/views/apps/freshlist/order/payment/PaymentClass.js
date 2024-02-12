import React, { Component } from "react";
import { Button } from "reactstrap";

import { Razorpay } from "react-razorpay";
import image from "../../../../../assets/img/logo/logowithoutback.png";

class Payment extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }

  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  displayRazorpay = async () => {
    let totalamount = this.props.total.split(".")[0];
    const options = {
      key: "rzp_test_Vhg1kq9b86udsY",
      currency: "INR",
      amount: totalamount * 100,
      name: "SoftNumen",
      description: "Test Wallet Transaction",
      image: image,
      handler: async (response) => {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        toast.success("Order Success");
      },
      prefill: {
        name: "sadik",
        email: "sadikdevelopersevltose15@gmail.com",
        contact: "8889407856",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  render() {
    return (
      <>
        <h2>Payment</h2>
        <Button color="primary" onClick={this.displayRazorpay}>
          Payment
        </Button>
        {/* <ToastContainer autoClose={3000} />{" "} */}
        {/* Add ToastContainer to display toasts */}
      </>
    );
  }
}

export default Payment;
