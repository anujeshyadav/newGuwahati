import React, { useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import { Razorpay } from "react-razorpay"; // Import Razorpay correctly
import image from "../../../../../assets/img/logo/logowithoutback.png";

export default function Payment({ amount, img, total }) {
  const loadScript = (src) => {
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
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  const displayRazorpay = async () => {
    // let response = await axios.post("http://localhost:3000/api/razorpay", {
    //   totalBill,
    // });

    // let data = response.data;
    let totalamount = total.split(".")[0];
    const options = {
      key: "rzp_test_Vhg1kq9b86udsY",
      currency: "INR",
      amount: totalamount * 100,
      name: "SoftNumen",
      description: "Test Wallet Transaction",
      image: image,
      // image:
      //   "https://tse2.mm.bing.net/th?id=OIP.4p7ztcUW4gAM6_1VGZ1EVwHaIj&pid=Api&P=0",
      // order_id: 12,
      handler: async (response) => {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        toast.success("Order Success");

        // dispatch(setDeliveryDetail(checkout));
        // const res = await axios.post("http://localhost:3000/order/buynow", {
        //   customerid: currentCustomer._id,
        //   deliveryAddress: checkout.deliveryAddress,
        //   contactNumber: checkout.contactNumber,
        //   contactPerson: checkout.contactPerson,
        //   orderItems: products,
        // });
        // console.log(res);
        // toast.success("Order Placed Successfully");
        // navigate("/ordersuccess");
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
  return (
    <>
      <h2>Payment</h2>
      <Button color="primary" onClick={displayRazorpay}>
        Payment
      </Button>
    </>
  );
}
