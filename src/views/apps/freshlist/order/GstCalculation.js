import React, { useState } from "react";

import UserContext from "../../../../context/Context";

let gstDetails = [];
export const GstCalculation = (Party, product, Context) => {
  let IgstTotal = 0;
  let CgstTotal = 0;
  let SgstTotal = 0;
  let Amount = 0;
  let GrandTotal = 0;
  let RoundOff = 0;
  let Discount = 0;
  let DiscountPercentage = 0;

  if (!!Party?.Category?.discount) {
    DiscountPercentage = (100 - Party?.Category?.discount) / 100;
  } else {
    DiscountPercentage = 1;
  }
  function customRound(num) {
    let decimalPart = num - Math.floor(num);
    if (decimalPart > 0.6) {
      return Math.ceil(num);
    } else {
      return Math.floor(num);
    }
  }
  let IgstTaxType = false;

  let SuperGst = Context?.CompanyDetails?.gstNo?.slice(0, 2);
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let findParty = userdata?.rolename?.roleName == "Customer";

  let partyGst;
  if (findParty) {
    partyGst = userdata?.Gstnumber?.slice(0, 2);
  } else {
    partyGst = Party?.Gstnumber?.slice(0, 2);
  }
  if (SuperGst == partyGst) {
    IgstTaxType = false;
    gstDetails = product?.map((ele, i) => {
      let GstRate = ele?.productData?.GSTRate / 2;
      return {
        hsn: ele?.productData?.HSN_Code,
        withoutTaxablePrice: ele?.totalprice,
        taxable: ele?.totalprice * DiscountPercentage,
        discountPercentage: Party?.Category?.discount,
        withDiscountAmount: Number(
          (
            (ele?.totalprice *
              DiscountPercentage *
              (100 + Number(ele?.productData?.GSTRate))) /
            100
          ).toFixed(2)
        ),
        withoutDiscountAmount: Number(
          (
            (ele?.totalprice * (100 + Number(ele?.productData?.GSTRate))) /
            100
          ).toFixed(2)
        ),
        centralTax: [
          {
            rate: GstRate,
            amount: Number(
              ((ele?.totalprice * DiscountPercentage * GstRate) / 100).toFixed(
                2
              )
            ),
          },
        ],
        stateTax: [
          {
            rate: GstRate,
            amount: Number(
              ((ele?.totalprice * DiscountPercentage * GstRate) / 100).toFixed(
                2
              )
            ),
          },
        ],
        igstTax: [],
      };
    });
  } else {
    gstDetails = product?.map((ele, i) => {
      IgstTaxType = true;

      let GstRate = ele?.productData?.GSTRate / 2;
      return {
        hsn: ele?.productData?.HSN_Code,
        taxable: ele?.totalprice * DiscountPercentage,
        withoutTaxablePrice: ele?.totalprice,
        discountPercentage: Party?.Category?.discount,
        withDiscountAmount: Number(
          (
            (ele?.totalprice *
              DiscountPercentage *
              (100 + Number(ele?.productData?.GSTRate))) /
            100
          ).toFixed(2)
        ),
        withoutDiscountAmount: Number(
          (
            (ele?.totalprice * (100 + Number(ele?.productData?.GSTRate))) /
            100
          ).toFixed(2)
        ),

        totalTaxAmount: Number(
          (
            (ele?.totalprice *
              DiscountPercentage *
              (100 + Number(ele?.productData?.GSTRate))) /
            100
          ).toFixed(2)
        ),
        centralTax: [],
        stateTax: [],
        igstTax: [
          {
            rate: ele?.productData?.GSTRate,
            amount: Number(
              (
                (ele?.totalprice *
                  DiscountPercentage *
                  ele?.productData?.GSTRate) /
                100
              ).toFixed(2)
            ),
          },
        ],
      };
    });
  }

  let T = gstDetails?.map((ele, i) => {
    return ele?.taxable;
  });
  Amount = T.reduce((a, b) => a + b, 0);

  if (IgstTaxType) {
    let x = gstDetails?.map((ele, i) => {
      return ele?.igstTax[0]?.amount;
    });
    IgstTotal = x.reduce((a, b) => a + b, 0);
  } else {
    let C = gstDetails?.map((ele, i) => {
      return ele?.centralTax[0]?.amount;
    });
    CgstTotal = C.reduce((a, b) => a + b, 0);
    let S = gstDetails?.map((ele, i) => {
      return ele?.stateTax[0]?.amount;
    });
    SgstTotal = S.reduce((a, b) => a + b, 0);
  }

  GrandTotal = Number((Amount + SgstTotal + CgstTotal + IgstTotal)?.toFixed(2));

  RoundOff = customRound(GrandTotal);
  let Tax = {
    IgstTaxType,
    RoundOff,
    GrandTotal,
    Amount,
    IgstTotal,
    CgstTotal,
    SgstTotal,
  };

  return { gstDetails, Tax };
};
