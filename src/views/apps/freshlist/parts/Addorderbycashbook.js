import React, { useEffect, useState, useContext } from "react";
import xmlJs from "xml-js";
import { Route } from "react-router-dom";
import { history } from "../../../../history";
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
import "../../../../assets/scss/pages/users.scss";
import {
  SaveOrder,
  ProductListView,
  CreatePartyList,
  UnitListView,
  BaseUnitListView,
  Ordercashbook,
  CreateCustomerList,
} from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
const Addorderbycashbook = args => {
  const [Index, setIndex] = useState("");
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [PartyList, setPartyList] = useState([]);
  const [PartyId, setPartyId] = useState("");
  const [UnitList, setUnitList] = useState([]);
  const [grandTotalAmt, setGrandTotalAmt] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [UserInfo, setUserInfo] = useState({});
  const [dateofDelivery, setDateofDelivery] = useState("");
  const [product, setProduct] = useState([
    {
      productId: "",
      availableQty: "",
      qty: 1,
      price: "",
      totalprice: "", //no
      Size: "",
      unitQty: "",
      unitType: "",
      partyId: "",
      // DateofDelivery: "", //no
    },
  ]);

  const handleRequredQty = (e, index, avalaibleSize) => {
    setIndex(index);
    console.log(product);
    const { name, value } = e.target;
    const list = [...product];
    list[index][name] = Number(value);
    // console.log(GrandTotal);

    let amt = 0;
    if (list.length > 0) {
      const x = list?.map(val => {
        console.log(val.qty * val.price);
        GrandTotal[index] = val.Size * val.qty * val.price;

        list[index]["totalprice"] = val.Size * val.qty * val.price;
        return val.Size * val.qty * val.price;
      });
      amt = x.reduce((a, b) => a + b);
    }
    console.log(list);
    setProduct(list);
    setGrandTotalAmt(amt);
  };

  const handleSelectionParty = (selectedList, selectedItem, index) => {
    setPartyId(selectedItem?._id);
  };

  const handleSelection = (selectedList, selectedItem, index) => {
    SelectedITems.push(selectedItem);
    setProduct(prevProductList => {
      debugger;
      const updatedProductList = [...prevProductList];
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?._id;
      updatedProduct.unitType = selectedItem?.unitType;
      updatedProduct.availableQty = selectedItem?.Size;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one
      return updatedProductList; // Return the updated product list to set the state
    });
  };

  const handleSelectionUnit = (selectedList, selectedItem, index) => {
    SelectedSize.push(selectedItem);
    setProduct((prevProductList) => {
      debugger;
      const updatedUnitList = [...prevProductList];
      const updatedProduct = { ...updatedUnitList[index] }; // Create a copy of the product at the specified index
      updatedProduct.Size = selectedItem?.unitQty;
      // updatedProduct.unitQty = selectedItem.primaryUnit;
      updatedProduct.unitType = selectedItem.primaryUnit;
      updatedUnitList[index] = updatedProduct;
      let myarr = prevProductList?.map((ele, i) => {
        // console.log(ele?.qty * ele.price * SelectedSize[i]?.unitQty);
        updatedUnitList[index]["totalprice"] =
          ele?.qty * ele.price * SelectedSize[i]?.unitQty;
        let indextotal = ele?.price * ele.qty * SelectedSize[i]?.unitQty;
        GrandTotal[index] = indextotal;
        return indextotal;
      });
      let amt = myarr.reduce((a, b) => a + b);
      console.log(amt);
      // setPriceTotal(amt);
      setGrandTotalAmt(amt);
      return updatedUnitList; // Return the updated product list to set the state
    });
  };
  let subtotal = product?.reduce((acc, product) => acc + product.totalprice, 0);
  console.log(subtotal);
  // let UnitPrice = product?.reduce((acc, product) => acc + product.unitQty, 0);
  // let totalPrice = UnitPrice * subtotal;
  let taxRate = 0.1; // 10%
  let tax = subtotal * taxRate;
  let discountRate = 0.2;
  let discountAmount = subtotal * discountRate;
  let Grandtotals = subtotal + tax;

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData"))._id;
    let userdata = JSON.parse(localStorage.getItem("userData"));

    ProductListView(userdata?._id, userdata?.database)
      .then((res) => {
        console.log(res?.Product);
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
        console.log(res.Unit);
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
    setGrandTotalAmt(amt);
    setProduct(newFormValues);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const fullname = UserInfo?.firstName + " " + UserInfo?.lastName;
    let SelectedPoduct = product?.map((ele, i) => {
      return {
        productId: ele?.productId,
        Size: ele?.Size,
        qty: ele?.qty,
        price: ele?.price,
        unitType: ele?.unitType,
        status: "ordered",
      };
    });

    debugger;
    const payload = {
      userId: UserInfo?._id,
      fullName: fullname,
      address: UserInfo?.currentAddress,
      status: "Completed",
      grandTotal: grandTotalAmt,
      MobileNo: UserInfo?.mobileNumber,
      country: UserInfo?.Country,
      state: UserInfo?.State,
      city: UserInfo?.City,
      orderItems: SelectedPoduct,
      DateofDelivery: dateofDelivery,
      partyId: PartyId,
    };
    console.log(payload);

    if (error) {
      swal("Error occured while Entering Details");
    } else {
      Ordercashbook(payload)
        .then((res) => {
          swal("Order Created Successfully");
          //  history.push("/app/softnumen/order/orderList")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col className="">
              <div>
                <h1 className="">Add Order By Cashbook</h1>
              </div>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className="btn float-right"
                    color="danger"
                    size="sm"
                    onClick={() =>
                      history.push("/app/SoftNumen/parts/Cashbook")
                    }>
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row>
                <Col className="mb-1" lg="4" md="4" sm="12">
                  <div className="">
                    <Label>Choose Party</Label>

                    <Multiselect
                      required
                      selectionLimit={1}
                      isObject="false"
                      options={PartyList}
                      onSelect={(selectedList, selectedItem) =>
                        handleSelectionParty(selectedList, selectedItem, index)
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
                <Col className="mb-1" lg="4" md="4" sm="12"></Col>
              </Row>
              {product &&
                product?.map((product, index) => (
                  <Row className="" key={index}>
                    {console.log(product)}
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
                    <Col className="mb-1">
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
                    </Col>
                    <Col className="mb-1">
                      <div className="">
                        <Label>Required Size</Label>
                        <Input
                          type="number"
                          name="qty"
                          min={0}
                          // max={product?.availableQty}
                          placeholder="Req_Qty"
                          required
                          autocomplete="off"
                          value={product?.qty}
                          onChange={(e) =>
                            handleRequredQty(e, index, product?.availableQty)
                          }
                        />
                      </div>
                    </Col>

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
                      {/* <li>
                        <Label className="">
                          SubTotal:
                          <strong>{priceTotal}</strong>
                        </Label>
                      </li> */}
                      {/* <li>
                        <Label className="">
                          Shipping Cost : <strong>RS {subtotal}</strong>
                        </Label>
                      </li> */}
                      {/* <li>
                        <Label className="">
                          Tax: <strong>RS {tax}</strong>
                        </Label>
                      </li>
                      <li>
                        <Label className="">
                          Discount : <strong>RS {discountAmount}</strong>
                        </Label>
                      </li> */}
                      <li>
                        <Label className="pr-5">
                          Grand Total:
                          <span className="p-2">
                            {grandTotalAmt && grandTotalAmt == "NaN"
                              ? 0
                              : grandTotalAmt}
                          </span>
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
export default Addorderbycashbook;
