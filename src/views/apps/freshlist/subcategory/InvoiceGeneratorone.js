import React, { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ToWords } from "to-words";
import InvoiceTemplate from "./InvoiceTemplate";
import ReactPDF from "@react-pdf/renderer";
import POInVoice from "./POInVoice";
import axiosConfig from "../../../../axiosConfig";
import POInvoiceone from "./POInvoiceone";
import POInvoiceTwo from "./POInvoiceTwo";
import PoinvoiceThree from "./PoinvoiceThree";

const InvoiceGenerator = props => {
  console.log(props);
  const [Printview, setPrintview] = useState({});
  const [AllCharges, setAllCharges] = useState({});
  const [UserChoice, setUserChoice] = useState({});
  const [details, setDetails] = useState([]);
  const [subTotal, setSubTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [convertGrandTotal, setConvertGrandTotal] = useState("");

  useEffect(() => {
    // debugger;
    let userchoice = JSON.parse(localStorage.getItem("billUI"));
    setUserChoice(userchoice);
    if (props?.AddedBill?.length > 0) {
      setDetails(props?.AllbillMerged);
      setAllCharges(props?.Applied_Charges);
    } else {
      const formdata = new FormData();
      formdata.append("order_id", props.PrintData?.order_id);
      axiosConfig
        .post(`/order_detail`, formdata)
        .then((response) => {
          console.log(response.data.data);
          setDetails(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (props?.PrintData) {
      // console.log(props?.PrintData);
      // console.log(props?.PrintData.orderItems);
      setPrintview(props?.PrintData);
      const subTotalAmt = props.PrintData?.orderItems.reduce(
        (accumulator, currentValue) => {
          const { qty, Size, productId } = currentValue;
          const itemTotal = qty * productId?.Product_MRP * Size;
          return accumulator + itemTotal;
        },
        0
      );
      const gst = (subTotalAmt * 18) / 100;
      const GrandTotal = gst + subTotalAmt;

      setGrandTotal(GrandTotal);
      setSubTotal(subTotalAmt);
      console.log("subTotal", subTotalAmt);
      console.log("gst", gst);

      const toWords = new ToWords();
      let words = toWords.convert(Number(GrandTotal), { currency: true });
      setConvertGrandTotal(words);
    }
  }, []);

  return (
    <div>
      {/* <PDFDownloadLink
        document={
          props?.BillNumber == 1 && (
            <POInvoiceTwo
              UserChoice={UserChoice}
              invoiceData={Printview}
              CurrentWords={props.wordsNumber}
              BilData={props}
              tableList={details}
              AllCharges={AllCharges}
              fileName="invoice.pdf"
            />
          )
        }
        fileName="document.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink> */}
      {/* {/ Use PDFViewer to preview the generated PDF /} */}
      <PDFViewer width="1000" height="800">
        {props?.BillNumber == undefined && (
          <POInVoice
            UserChoice={UserChoice}
            invoiceData={Printview}
            subTotal={subTotal}
            grandTotal={grandTotal}
            CurrentWords={convertGrandTotal}
            BilData={props}
            tableList={details}
            AllCharges={AllCharges}
            fileName="invoice.pdf"
          />
        )}

        {props?.BillNumber == 1 && (
          <POInvoiceTwo
            UserChoice={UserChoice}
            invoiceData={Printview}
            subTotal={subTotal}
            grandTotal={grandTotal}
            CurrentWords={convertGrandTotal}
            BilData={props}
            tableList={details}
            AllCharges={AllCharges}
            fileName="invoice.pdf"
          />
        )}
        {props?.BillNumber == 2 && (
          <PoinvoiceThree
            UserChoice={UserChoice}
            invoiceData={Printview}
            subTotal={subTotal}
            grandTotal={grandTotal}
            // CurrentWords={props.wordsNumber}
            CurrentWords={convertGrandTotal}
            BilData={props}
            tableList={details}
            AllCharges={AllCharges}
            fileName="invoice.pdf"
          />
        )}
        {props?.BillNumber == 3 && (
          <POInvoiceone
            UserChoice={UserChoice}
            invoiceData={Printview}
            subTotal={subTotal}
            grandTotal={grandTotal}
            CurrentWords={convertGrandTotal}
            BilData={props}
            tableList={details}
            AllCharges={AllCharges}
            fileName="invoice.pdf"
          />
        )}
        {props?.BillNumber == 4 && (
          <POInVoice
            UserChoice={UserChoice}
            invoiceData={Printview}
            subTotal={subTotal}
            grandTotal={grandTotal}
            CurrentWords={convertGrandTotal}
            BilData={props}
            tableList={details}
            AllCharges={AllCharges}
            fileName="invoice.pdf"
          />
        )}
      </PDFViewer>
    </div>
  );
};

export default InvoiceGenerator;
