// import React, { useEffect, useState, useContext } from "react";
// import xmlJs from "xml-js";
// import { Route } from "react-router-dom";
// import { history } from "../../../../../history";
// import {
//   Card,
//   CardBody,
//   Col,
//   Form,
//   Row,
//   Input,
//   Label,
//   Button,
// } from "reactstrap";
// import "react-phone-input-2/lib/style.css";
// import Multiselect from "multiselect-react-dropdown";
// import "../../../../../assets/scss/pages/users.scss";

// import {
//   SavePurchaseOrder,
//   CreatePartyList,
//   UnitListView,
//   ProductListView,
//   CreateCustomerList,
// } from "../../../../../ApiEndPoint/ApiCalling";
// import "../../../../../assets/scss/pages/users.scss";

// import { GstCalculation } from "../GstCalculation";
// import UserContext from "../../../../../context/Context";
// let GrandTotal = [];
// let SelectedITems = [];
// let SelectedSize = [];
// const AddPurchaseOrder = (args) => {
//   const [Index, setIndex] = useState("");
//   const [index, setindex] = useState("");
//   const [error, setError] = useState("");
//   const [ProductList, setProductList] = useState([]);
//   const [PartyList, setPartyList] = useState([]);
//   const [PartyId, setPartyId] = useState("");
//   const [Party, setParty] = useState({});
//   const [UnitList, setUnitList] = useState([]);
//   const [GSTData, setGSTData] = useState({});
//   const [priceTotal, setPriceTotal] = useState(0);
//   const [grandTotalAmt, setGrandTotalAmt] = useState(0);
//   const [UserInfo, setUserInfo] = useState({});
//   const [dateofDelivery, setDateofDelivery] = useState("");
//   const [product, setProduct] = useState([
//     {
//       productId: "",
//       availableQty: "",
//       productData: "",
//       qty: 1,
//       price: "",
//       unitType: "",
//       Size: "",
//       totalprice: "",
//       partyId: "",
//     },
//   ]);
//   const Context = useContext(UserContext);
//   const handleSelection = (selectedList, selectedItem, index) => {
//     SelectedITems.push(selectedItem);
//     console.log(selectedItem);
//     setProduct((prevProductList) => {
//       const updatedProductList = [...prevProductList];
//       const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
//       updatedProduct.price = selectedItem.Product_MRP; // Update the price of the copied product
//       updatedProduct.productData = selectedItem;
//       updatedProduct.productId = selectedItem._id;
//       updatedProduct.availableQty = selectedItem.Size;
//       updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

//       return updatedProductList; // Return the updated product list to set the state
//     });
//   };

//   const handleRequredQty = (e, index, avalaibleSize) => {
//     const { name, value } = e.target;
//     if (Number(value) <= avalaibleSize) {
//       if (Number(value != 0)) {
//         setIndex(index);
//         console.log(product);
//         const list = [...product];
//         list[index][name] = Number(value);
//         // console.log(GrandTotal);

//         let amt = 0;
//         if (list.length > 0) {
//           const x = list?.map((val) => {
//             console.log(val.qty * val.price);
//             GrandTotal[index] = val.Size * val.qty * val.price;

//             list[index]["totalprice"] = val.Size * val.qty * val.price;
//             return val.Size * val.qty * val.price;
//           });
//           amt = x.reduce((a, b) => a + b);
//         }
//         console.log(list);
//         const gstdetails = GstCalculation(Party, list, Context);
//         setGSTData(gstdetails);
//         setProduct(list);
//         setGrandTotalAmt(amt);
//       }
//     }
//   };
//   const handleSelectionUnit = (selectedList, selectedItem, index) => {
//     SelectedSize.push(selectedItem);
//     setProduct((prevProductList) => {
//       // debugger;
//       const updatedUnitList = [...prevProductList];
//       const updatedProduct = { ...updatedUnitList[index] }; // Create a copy of the product at the specified index
//       updatedProduct.Size = selectedItem.unitQty;
//       updatedProduct.unitType = selectedItem.primaryUnit;
//       updatedUnitList[index] = updatedProduct;
//       let myarr = prevProductList?.map((ele, i) => {
//         updatedUnitList[index]["totalprice"] =
//           ele?.qty * ele.price * SelectedSize[i]?.unitQty;
//         let indextotal = ele?.price * ele.qty * SelectedSize[i]?.unitQty;
//         GrandTotal[index] = indextotal;
//         return indextotal;
//       });
//       let amt = myarr.reduce((a, b) => a + b);
//       console.log(amt);
//       setGrandTotalAmt(amt);
//       return updatedUnitList; // Return the updated product list to set the state
//     });
//   };
//   const handleSelectionParty = (selectedList, selectedItem, index) => {
//     setPartyId(selectedItem?._id);
//     setParty(selectedItem);
//     setProduct((prevProductList) => {
//       const updatedProductList = [...prevProductList];
//       const updatedProduct = { ...updatedProductList[index] };
//       updatedProduct.partyId = selectedItem?._id;
//       updatedProductList[index] = updatedProduct;
//       return updatedProductList;
//     });
//   };

//   useEffect(() => {
//     const userId = JSON.parse(localStorage.getItem("userData"))._id;

//     let userdata = JSON.parse(localStorage.getItem("userData"));

//     ProductListView(userdata?._id, userdata?.database)
//       .then((res) => {
//         let Items = res?.Product?.filter(
//           (ele) => ele?.addProductType == "Item"
//         );
//         setProductList(Items);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     CreateCustomerList(userdata?._id, userdata?.database)
//       .then((res) => {
//         let value = res?.Customer;
//         if (value?.length) {
//           setPartyList(value);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     UnitListView(userdata?._id, userdata?.database)
//       .then((res) => {
//         console.log(res.Unit);
//         setUnitList(res.Unit);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userData"));
//     setUserInfo(userInfo);
//   }, []);

//   let addMoreProduct = () => {
//     setProduct([
//       ...product,
//       {
//         // product: "",
//         productId: "",
//         availableQty: "",
//         productData: "",
//         qty: 1,
//         price: "",
//         totalprice: "",
//         // DateofDelivery: "",
//         partyId: "",
//         unitQty: "",
//         unitType: "",
//       },
//     ]);
//   };
//   let removeMoreProduct = (i) => {
//     let newFormValues = [...product];
//     newFormValues.splice(i, 1);
//     GrandTotal.splice(i, 1);
//     let amt = GrandTotal.reduce((a, b) => a + b, 0);
//     setGrandTotalAmt(amt);
//     setProduct(newFormValues);
//   };
//   const submitHandler = (e) => {
//     let SelectedPoduct = product?.map((ele, i) => {
//       return {
//         productId: ele?.productId,
//         Size: ele?.Size,
//         qty: ele?.qty,
//         price: ele?.price,
//         unitType: ele?.unitType,
//         // status: "ordered",
//       };
//     });

//     e.preventDefault();
//     let fullname = UserInfo.firstName + " " + UserInfo?.lastName;
//     console.log(UserInfo?.UserName);
//     const ObjOrder = {
//       userId: UserInfo?._id,
//       fullName: fullname,
//       address: UserInfo?.Address,
//       grandTotal: grandTotalAmt,
//       MobileNo: UserInfo?.mobileNumber,
//       country: UserInfo?.Country,
//       state: UserInfo?.State,
//       city: UserInfo?.City,
//       orderItems: SelectedPoduct,
//       DateofDelivery: dateofDelivery,
//       partyId: PartyId,
//       created_by: UserInfo?._id,
//     };
//     debugger;
//     if (error) {
//       swal("Error occured while Entering Details");
//     } else {
//       SavePurchaseOrder(ObjOrder)
//         .then((res) => {
//           console.log(res);
//           swal(" Add Purchase Order  Successfully");
//           history.push("/app/AJgroup/order/purchaseOrderList");

//           // }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   const onRemove1 = (selectedList, removedItem, index) => {
//     console.log(selectedList);
//     console.log(index);
//   };
//   return (
//     <div>
//       <div>
//         <Card>
//           <Row className="m-2">
//             <Col className="">
//               <div>
//                 <h1 className="">Add PurchaseOrder</h1>
//               </div>
//             </Col>
//             <Col>
//               <Route
//                 render={({ history }) => (
//                   <Button
//                     className="btn float-right"
//                     color="danger"
//                     size="sm"
//                     onClick={() =>
//                       history.push("/app/AJgroup/order/purchaseOrderList")
//                     }>
//                     Back
//                   </Button>
//                 )}
//               />
//             </Col>
//           </Row>

//           <CardBody>
//             <Form className="m-1" onSubmit={submitHandler}>
//               <Row>
//                 <Col className="mb-1" lg="4" md="4" sm="12">
//                   <div className="">
//                     <Label>Choose Party</Label>

//                     <Multiselect
//                       required
//                       selectionLimit={1}
//                       isObject="false"
//                       options={PartyList}
//                       onSelect={(selectedList, selectedItem) =>
//                         handleSelectionParty(selectedList, selectedItem, index)
//                       }
//                       onRemove={onRemove1} // Function will trigger on remove event
//                       displayValue="firstName" // Property name to display in the dropdown options
//                     />
//                   </div>
//                 </Col>
//                 <Col className="mb-1" lg="4" md="4" sm="12">
//                   <div className="">
//                     <Label>Expected Delivery Date</Label>
//                     <Input
//                       required
//                       type="date"
//                       name="DateofDelivery"
//                       value={dateofDelivery}
//                       onChange={(e) => setDateofDelivery(e.target.value)}
//                     />
//                   </div>
//                 </Col>
//                 <Col className="mb-1" lg="4" md="4" sm="12"></Col>
//               </Row>
//               {product &&
//                 product?.map((product, index) => (
//                   <Row className="" key={index}>
//                     <Col className="mb-1">
//                       <div className="">
//                         <Label>ProductName</Label>
//                         <Multiselect
//                           required
//                           selectionLimit={1}
//                           isObject="false"
//                           options={ProductList}
//                           onSelect={(selectedList, selectedItem) =>
//                             handleSelection(selectedList, selectedItem, index)
//                           }
//                           onRemove={(selectedList, selectedItem) => {
//                             onRemove1(selectedList, selectedItem, index);
//                           }}
//                           displayValue="Product_Title" // Property name to display in the dropdown options
//                         />
//                       </div>
//                     </Col>
//                     <Col className="mb-1">
//                       <div className="">
//                         <Label>Available Size</Label>
//                         <Input
//                           type="number"
//                           name="availableQty"
//                           placeholder="AvailableSize"
//                           value={product?.availableQty}
//                         />
//                       </div>
//                     </Col>
//                     <Col className="mb-1">
//                       <div className="">
//                         <Label>Required Size</Label>
//                         <Input
//                           type="number"
//                           name="qty"
//                           placeholder="Req_Qty"
//                           autocomplete="off"
//                           value={product?.qty}
//                           onChange={(e) =>
//                             handleRequredQty(e, index, product?.availableQty)
//                           }
//                         />
//                       </div>
//                     </Col>
//                     <Col className="mb-1">
//                       <div className="">
//                         <Label>Choose Unit</Label>
//                         <Multiselect
//                           required
//                           selectionLimit={1}
//                           isObject="false"
//                           options={UnitList}
//                           onSelect={(selectedList, selectedItem) =>
//                             handleSelectionUnit(
//                               selectedList,
//                               selectedItem,
//                               index
//                             )
//                           }
//                           onRemove={(selectedList, selectedItem) => {
//                             onRemove1(selectedList, selectedItem, index);
//                           }}
//                           displayValue="primaryUnit"
//                         />
//                       </div>
//                     </Col>
//                     <Col className="mb-1">
//                       <div className="">
//                         <Label>Price</Label>
//                         <Input
//                           type="number"
//                           name="price"
//                           readOnly
//                           placeholder="Price"
//                           value={product.price}
//                         />
//                       </div>
//                     </Col>
//                     <Col className="mb-1">
//                       <div className="">
//                         <Label>Total Price</Label>
//                         <Input
//                           type="number"
//                           name="totalprice"
//                           readOnly
//                           placeholder="TtlPrice"
//                           value={product.Size * product.price * product.qty}
//                         />
//                       </div>
//                     </Col>
//                     <Col className="d-flex mt-1 abb">
//                       <div className="btnStyle">
//                         {index ? (
//                           <Button
//                             type="button"
//                             color="danger"
//                             className="button remove "
//                             size="sm"
//                             onClick={() => removeMoreProduct(index)}>
//                             -
//                           </Button>
//                         ) : null}
//                       </div>

//                       <div className="btnStyle">
//                         <Button
//                           className="ml-1 mb-1"
//                           color="primary"
//                           type="button"
//                           size="sm"
//                           onClick={() => addMoreProduct()}>
//                           +
//                         </Button>
//                       </div>
//                     </Col>
//                   </Row>
//                 ))}
//               <Row>
//                 <Col className="mb-1" lg="12" md="12" sm="12">
//                   <div className=" d-flex justify-content-end">
//                     <ul className="subtotal">
//                       <li>
//                         <Label className="">
//                           SubTotal : <strong>{grandTotalAmt}</strong>
//                         </Label>
//                       </li>
//                       <li>
//                         <Label className="">
//                           Shipping Cost : <strong>RS 50</strong>
//                         </Label>
//                       </li>
//                       <li>
//                         <Label className="">
//                           Tax: <strong>RS 25</strong>
//                         </Label>
//                       </li>
//                       <li>
//                         <Label className="">
//                           Discount : <strong>RS 5</strong>
//                         </Label>
//                       </li>
//                       <li>
//                         {" "}
//                         <Label className="pr-5">
//                           Grand Total :{" "}
//                           <strong>{grandTotalAmt + 50 + 25 + 5}</strong>
//                         </Label>
//                       </li>
//                     </ul>
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <div className="d-flex justify-content-center">
//                     <Button.Ripple
//                       color="primary"
//                       type="submit"
//                       className="mt-2">
//                       Submit
//                     </Button.Ripple>
//                   </div>
//                 </Col>
//               </Row>
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// };
// export default AddPurchaseOrder;
import React, { useEffect, useState, useContext } from "react";
import xmlJs from "xml-js";
import { Route } from "react-router-dom";
import { history } from "../../../../../history";

import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  CustomInput,
} from "reactstrap";
import "react-phone-input-2/lib/style.css";
import Multiselect from "multiselect-react-dropdown";
import "../../../../../assets/scss/pages/users.scss";

import {
  SaveOrder,
  ProductListView,
  CreatePartyList,
  UnitListView,
  BaseUnitListView,
  CreateCustomerList,
  _Get,
  SavePurchaseOrder,
} from "../../../../../ApiEndPoint/ApiCalling";
import "../../../../../assets/scss/pages/users.scss";
import {
  View_Wareahouse_Byid,
  WareHouse_Current_Stock,
} from "../../../../../ApiEndPoint/Api";
import UserContext from "../../../../../context/Context";
import { GstCalculation } from "./../GstCalculation";
let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
const AddPurchaseOrder = (args) => {
  const [Index, setIndex] = useState("");
  const [PartyLogin, setPartyLogin] = useState(false);

  const [ProductList, setProductList] = useState([]);
  const [GSTData, setGSTData] = useState({});
  const [PartyList, setPartyList] = useState([]);
  const [PartyId, setPartyId] = useState("");
  const [Party, setParty] = useState({});
  const [UnitList, setUnitList] = useState([]);

  const [UserInfo, setUserInfo] = useState({});

  const [dateofDelivery, setDateofDelivery] = useState("");
  const [product, setProduct] = useState([
    {
      productId: "",
      productData: "",
      disCountPercentage: "",
      availableQty: "",
      qty: 1,
      price: "",
      Size: "",
      unitType: "",
      totalprice: "",
    },
  ]);
  const Context = useContext(UserContext);

  const handleRequredQty = (e, index) => {
    const { name, value } = e.target;
    // if (Number(value) <= avalaibleSize) {
    if (Number(value != 0)) {
      setIndex(index);
      const list = [...product];
      list[index][name] = Number(value);
      let amt = 0;
      if (list?.length > 0) {
        const x = list?.map((val) => {
          GrandTotal[index] = val.Size * val.qty * val.price;
          list[index]["totalprice"] = val.Size * val.qty * val.price;
          return val.Size * val.qty * val.price;
        });
        amt = x.reduce((a, b) => a + b);
      }

      const gstdetails = GstCalculation(Party, list, Context);
      setGSTData(gstdetails);
      setProduct(list);
    }
    // }
  };

  const handleSelectionParty = (selectedList, selectedItem) => {
    setPartyId(selectedItem._id);
    setParty(selectedItem);
  };

  const handleSelection = async (selectedList, selectedItem, index) => {
    const userdata = JSON.parse(localStorage.getItem("userData"));

    SelectedITems.push(selectedItem);

    // let URl = `${WareHouse_Current_Stock}${selectedItem?.warehouse?._id}/`;
    // var Stock;
    // await _Get(URl, selectedItem?._id)
    //   .then((res) => {
    //     console.log(res?.currentStock);
    //     Stock = res?.currentStock;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     swal("something went Wrong");
    //   });

    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList];
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem._id;
      updatedProduct.productData = selectedItem;
      updatedProduct.disCountPercentage =
        Party?.Category?.discount && Party?.Category?.discount
          ? Party?.Category?.discount
          : 0;
      // updatedProduct.availableQty = Stock?.currentStock;
      updatedProductList[index] = updatedProduct;
      const gstdetails = GstCalculation(Party, updatedProductList, Context);
      setGSTData(gstdetails);
      // Replace the product at the specified index with the updated one
      return updatedProductList; // Return the updated product list to set the state
    });
  };

  const handleSelectionUnit = (selectedList, selectedItem, index) => {
    SelectedSize.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedUnitList = [...prevProductList];
      const updatedProduct = { ...updatedUnitList[index] }; // Create a copy of the product at the specified index
      updatedProduct.Size = selectedItem.unitQty;
      updatedProduct.unitType = selectedItem.primaryUnit;
      updatedUnitList[index] = updatedProduct;
      let myarr = prevProductList?.map((ele, i) => {
        updatedUnitList[index]["totalprice"] =
          ele?.qty * ele.price * SelectedSize[i]?.unitQty;
        let indextotal = ele?.price * ele.qty * SelectedSize[i]?.unitQty;
        GrandTotal[index] = indextotal;
        return indextotal;
      });
      let amt = myarr.reduce((a, b) => a + b);

      const gstdetails = GstCalculation(Party, updatedUnitList, Context);

      setGSTData(gstdetails);
      return updatedUnitList; // Return the updated product list
    });
  };

  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userData"));

    let findParty = userdata?.rolename?.roleName == "Customer";
    if (findParty) {
      setPartyLogin(true);
      setPartyId(userdata?._id);
    }
    ProductListView(userdata?._id, userdata?.database)
      .then((res) => {
        // let product = res?.Product?.filter(
        //   (ele) => ele?.addProductType == "Product"
        // );
        setProductList(res?.Product);
      })
      .catch((err) => {
        console.log(err);
      });
    CreateCustomerList(userdata?._id, userdata?.database)
      .then((res) => {
        let value = res?.Customer;
        if (value?.length) {
          setPartyList(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    UnitListView(userdata?._id, userdata?.database)
      .then((res) => {
        setUnitList(res.Unit);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    setUserInfo(userInfo);
  }, []);

  let addMoreProduct = () => {
    setProduct([
      ...product,
      {
        productId: "",
        productData: "",
        disCountPercentage: "",
        availableQty: "",
        qty: 1,
        price: "",
        totalprice: "",
        unitQty: "",
        unitType: "",
      },
    ]);
  };
  let removeMoreProduct = (i) => {
    let newFormValues = [...product];
    newFormValues.splice(i, 1);
    GrandTotal.splice(i, 1);
    let amt = GrandTotal.reduce((a, b) => a + b, 0);
    setProduct(newFormValues);
    const gstdetails = GstCalculation(Party, newFormValues, Context);
    setGSTData(gstdetails);
  };

  const submitHandler = (e) => {
    const gstdetails = GstCalculation(Party, product, Context);
    debugger;
    e.preventDefault();
    const fullname = UserInfo?.firstName + " " + UserInfo?.lastName;
    const payload = {
      userId: UserInfo?._id,
      database: UserInfo?.database,
      partyId: PartyId,
      SuperAdmin: Context?.CompanyDetails?.created_by,
      fullName: fullname,
      address: UserInfo?.address,
      grandTotal: gstdetails?.Tax?.GrandTotal,
      roundOff: Number(
        (gstdetails?.Tax?.GrandTotal - gstdetails?.Tax?.RoundOff).toFixed(2)
      ),
      amount: gstdetails?.Tax?.Amount,
      sgstTotal: gstdetails?.Tax?.CgstTotal,
      igstTaxType: gstdetails?.Tax?.IgstTaxType,
      cgstTotal: gstdetails?.Tax?.CgstTotal,
      igstTotal: gstdetails?.Tax?.IgstTotal,
      gstDetails: gstdetails?.gstDetails,
      MobileNo: UserInfo?.mobileNumber,
      country: UserInfo?.Country,
      state: UserInfo?.State,
      city: UserInfo?.City,
      orderItems: product,
      DateofDelivery: dateofDelivery,
    };
    SavePurchaseOrder(payload)
      .then((res) => {
        console.log(res);
        swal(" Purchase Order Added Successfully");
        history.goBack();

        // }
      })
      .catch((err) => {
        console.log(err);
      });

    // SaveOrder(payload)
    //   .then((res) => {
    //     console.log(res);
    //     swal("Order Created Successfully");
    //     //  history.push("/app/softnumen/order/orderList")
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
  };
  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col className="">
              <div>
                <h1 className="">Create Purchase Order</h1>
              </div>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className="btn float-right"
                    color="danger"
                    size="sm"
                    onClick={() => history.goBack()}>
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row>
                {PartyLogin && PartyLogin ? null : (
                  <>
                    <Col className="mb-1" lg="4" md="4" sm="12">
                      <div className="">
                        <Label>Choose Party</Label>

                        <Multiselect
                          required
                          selectionLimit={1}
                          isObject="false"
                          options={PartyList}
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionParty(selectedList, selectedItem)
                          }
                          onRemove={onRemove1}
                          displayValue="firstName"
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="4" md="4" sm="12">
                      <div className="">
                        <Label>Expected Delivery Date</Label>
                        <Input
                          required
                          type="date"
                          name="DateofDelivery"
                          value={dateofDelivery}
                          onChange={(e) => setDateofDelivery(e.target.value)}
                        />
                      </div>
                    </Col>
                  </>
                )}
                <Col className="mb-1" lg="4" md="4" sm="12"></Col>
              </Row>
              {product &&
                product?.map((product, index) => (
                  <Row className="" key={index}>
                    <Col className="mb-1">
                      <div className="">
                        <Label>ProductName</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          isObject="false"
                          options={ProductList}
                          onSelect={(selectedList, selectedItem) =>
                            handleSelection(selectedList, selectedItem, index)
                          }
                          onRemove={(selectedList, selectedItem) => {
                            onRemove1(selectedList, selectedItem, index);
                          }}
                          displayValue="Product_Title" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>
                    {/* <Col className="mb-1">
                      <div className="">
                        <Label>Available Size</Label>
                        <Input
                          type="number"
                          disabled
                          name="availableQty"
                          placeholder="AvailableSize"
                          value={product?.availableQty}
                        />
                      </div>
                    </Col> */}
                    <Col className="mb-1">
                      <div className="">
                        <Label>Choose Unit</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          isObject="false"
                          options={UnitList}
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionUnit(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            onRemove1(selectedList, selectedItem, index);
                          }}
                          displayValue="primaryUnit"
                        />
                      </div>
                    </Col>
                    <Col className="mb-1">
                      <div className="">
                        <Label>Required Size</Label>
                        <Input
                          type="number"
                          name="qty"
                          min={0}
                          placeholder="Req_Qty"
                          required
                          autocomplete="off"
                          value={product?.qty}
                          onChange={(e) => handleRequredQty(e, index)}
                        />
                      </div>
                    </Col>

                    <Col className="mb-1">
                      <div className="">
                        <Label>Dis(%)</Label>
                        <Input
                          type="text"
                          name="disCountPercentage"
                          disabled
                          placeholder="Discount Percentage"
                          value={product?.disCountPercentage}
                        />
                      </div>
                    </Col>
                    <Col className="mb-1">
                      <div className="">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="price"
                          disabled
                          placeholder="Price"
                          value={product.price}
                        />
                      </div>
                    </Col>
                    <Col className="mb-1">
                      <div className="">
                        <Label>Total Price</Label>
                        <Input
                          type="number"
                          name="totalprice"
                          disabled
                          placeholder="TtlPrice"
                          value={product.Size * product.price * product.qty}
                        />
                      </div>
                    </Col>
                    <Col className="d-flex mt-1 abb">
                      <div className="btnStyle">
                        {index ? (
                          <Button
                            type="button"
                            color="danger"
                            className="button remove "
                            size="sm"
                            onClick={() => removeMoreProduct(index)}>
                            -
                          </Button>
                        ) : null}
                      </div>

                      <div className="btnStyle">
                        <Button
                          className="ml-1 mb-1"
                          color="primary"
                          type="button"
                          size="sm"
                          onClick={() => addMoreProduct()}>
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ))}
              <Row>
                <Col className="mb-1" lg="12" md="12" sm="12">
                  <div className=" d-flex justify-content-end">
                    <ul className="subtotal">
                      <li>
                        <Label className="pr-5">
                          Total:
                          <span className="p-2">
                            {!!GSTData?.Tax?.Amount && GSTData?.Tax?.Amount
                              ? (GSTData?.Tax?.Amount).toFixed(2)
                              : 0}
                          </span>
                        </Label>
                      </li>
                      {GSTData?.Tax?.IgstTaxType &&
                      GSTData?.Tax?.IgstTaxType ? (
                        <li>
                          <Label className="">
                            IGST Tax:{" "}
                            <strong>
                              RS{" "}
                              {!!GSTData?.Tax?.IgstTotal &&
                              GSTData?.Tax?.IgstTotal
                                ? (GSTData?.Tax?.IgstTotal).toFixed(2)
                                : 0}
                            </strong>
                          </Label>
                        </li>
                      ) : (
                        <>
                          <li>
                            <Label className="">
                              SGST Tax:{" "}
                              <strong>
                                RS{" "}
                                {!!GSTData?.Tax?.SgstTotal &&
                                GSTData?.Tax?.SgstTotal
                                  ? (GSTData?.Tax?.SgstTotal).toFixed(2)
                                  : 0}
                              </strong>
                            </Label>
                          </li>
                          <li>
                            <Label className="">
                              CGST Tax:{" "}
                              <strong>
                                RS{" "}
                                {!!GSTData?.Tax?.CgstTotal &&
                                GSTData?.Tax?.CgstTotal
                                  ? (GSTData?.Tax?.CgstTotal).toFixed(2)
                                  : 0}
                              </strong>
                            </Label>
                          </li>
                        </>
                      )}

                      <li>
                        {" "}
                        <Label className="pr-5">
                          Grand Total :{" "}
                          <strong>
                            RS{" "}
                            {!!GSTData?.Tax?.GrandTotal
                              ? (GSTData?.Tax?.GrandTotal).toFixed(2)
                              : 0}
                          </strong>
                        </Label>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="d-flex justify-content-center">
                    <Button.Ripple
                      color="primary"
                      type="submit"
                      className="mt-2">
                      Submit
                    </Button.Ripple>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default AddPurchaseOrder;
