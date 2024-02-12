import React, { useEffect, useState, useContext } from "react";
import xmlJs from "xml-js";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  FormGroup,
  CustomInput,
  ModalBody,
  ModalHeader,
  Modal,
  InputGroup,
  Badge,
} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BiEnvelope } from "react-icons/bi";
import { BsFillChatDotsFill, BsWhatsapp } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FcPhoneAndroid } from "react-icons/fc";
import { AiOutlineSearch } from "react-icons/ai";
import Flatpickr from "react-flatpickr";

import Multiselect from "multiselect-react-dropdown";

import { FiSend } from "react-icons/fi";

import "../../../../assets/scss/pages/users.scss";
import {
  ProductListView,
  CreatePartyList,
  Create_Sales_personList,
  Create_Targetsave,
  CreateWarehouseList,
  UnitListView,
  StocktrxFtoW,
  WarehousetoWareHouseTrx,
  Warehouse_Temporarlylist,
  CreateAccountList,
  _Get,
} from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
import Timepickers from "../../../forms/form-elements/datepicker/Timepicker";
import Pickers from "../../../forms/form-elements/datepicker/Pickers";
import { Route } from "react-router-dom";
import { WareahouseList_For_addProduct } from "../../../../ApiEndPoint/Api";

let GrandTotal = [];
let SelectedITems = [];
let SelectedSize = [];
const CreateTarget = (args) => {
  const [formData, setFormData] = useState({});
  const [Index, setIndex] = useState("");
  const [StockTrxdate, setStockTrxDate] = useState("");
  const [targetEndDate, settargetEndDate] = useState("");
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [ProductWTWList, setProductWTWList] = useState([]);
  const [PartyList, setPartyList] = useState([]);
  const [Salesperson, setSalesperson] = useState("");
  const [WareHouseone, setWareHouseone] = useState([]);
  const [WareHousetwo, setWareHousetwo] = useState([]);
  const [TypeOfTrx, setTypeOfTrx] = useState("");
  const [grandTotalAmt, setGrandTotalAmt] = useState(0);
  const [UnitList, setUnitList] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState("");
  const [audit, setAudit] = useState(false);
  const [WareHouselist, setWarehouseList] = useState([]);
  const toggle = (item) => {
    setItems(item);
    setModal(!modal);
  };
  const audittoggle = () => {
    setAudit(!audit);
    // setModal(!modal);
  };
  const handleopentoggle = (iteam) => {
    toggle(iteam);
  };
  const handleHistory = () => {
    audittoggle();
  };
  const [product, setProduct] = useState([
    {
      product: "",
      productId: "",
      AvailaleQty: null,
      availableQty: "",
      transferQty: 1,
      price: "",
      totalprice: "",
      Size: "",
      unitType: "",
      stockTrxDate: "",
      targetEndDate: "",
      discount: "",
      Shipping: "",
      tax: "",
      grandTotal: "",
    },
  ]);

  const handleProductChangeProduct = (e, index, avalaibleSize) => {
    if (avalaibleSize >= Number(e.target.value)) {
      setIndex(index);
      console.log(product);

      const { name, value } = e.target;
      const list = [...product];
      if (name.includes("transferQty")) {
        // list[index]["Size"] = Number(value);
        let available = Number(list[index]["AvailaleQty"]);
        let Askingfor = Number(value);
        if (available >= Askingfor) {
          list[index][name] = Askingfor;
        } else {
          swal("Can not Transfer More then Stock");
          list[index][name] = available - 1;
        }
      } else {
        list[index][name] = value;
      }

      let amt = 0;
      if (list.length > 0) {
        const x = list?.map((val) => {
          GrandTotal[index] = val.Size * val.price * val.transferQty;
          list[index]["totalprice"] = val.Size * val.price * val.transferQty;
          return val.Size * val.price * val.transferQty;
        });
        amt = x.reduce((a, b) => a + b);
        console.log("GrandTotal", amt);
      }
      // console.log(list)
      setProduct(list);
      setGrandTotalAmt(amt);
    } else {
      return null;
    }
  };
  const handleProductChangeProductone = (e, index) => {
    setIndex(index);
    console.log(product);
    debugger;
    const { name, value } = e.target;
    const list = [...product];
    if (name.includes("transferQty")) {
      list[index][name] = Number(value);
    } else {
      list[index][name] = value;
    }
    console.log(GrandTotal);

    let amt = 0;
    if (list.length > 0) {
      const x = list?.map((val) => {
        GrandTotal[index] = val.Size * val.price * val.transferQty;
        list[index]["totalprice"] = val.Size * val.price * val.transferQty;
        return val.Size * val.price * val.transferQty;
      });
      amt = x.reduce((a, b) => a + b);
      console.log("GrandTotal", amt);
    }
    // console.log(list)
    setProduct(list);
    setGrandTotalAmt(amt);
  };

  const handleRemoveSelected = (selectedList, selectedItem, index) => {
    // console.log(selectedList);
    // console.log(selectedItem); // removed item
    // console.log(product);
    // console.log(index);
    // console.log(SelectedITems);
    SelectedITems.splice(index, 1);
    let myarr = product?.map((ele, i) => {
      console.log(ele?.qty * selectedItem[i]?.Product_MRP);
      let indextotal = ele?.qty * SelectedITems[i]?.Product_MRP;
      GrandTotal[index] = indextotal;
      return indextotal;
    });

    let amt = myarr.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);
  };
  const handleRemoveSelectedone = (selectedList, selectedItem, index) => {
    SelectedSize.splice(index, 1);
    let myarr = product?.map((ele, i) => {
      console.log(ele?.Size * ele?.price * SelectedSize[i]?.unitQty);
      let indextotal = ele?.Size * SelectedSize[i]?.unitQty;
      GrandTotal[index] = indextotal;
      return indextotal;
    });

    let amt = myarr.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);
  };
  const handleSelection = (selectedList, selectedItem, index) => {
    // product[index]["AvailaleQty"] = myproduct?.Size;
    SelectedITems.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?.productId?._id;
      updatedProduct.AvailaleQty = selectedItem?.Size;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleSelectionProduct = (selectedList, selectedItem, index) => {
    SelectedITems.push(selectedItem);
    setProduct((prevProductList) => {
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.price = selectedItem?.Product_MRP; // Update the price of the copied product
      updatedProduct.productId = selectedItem?._id;
      updatedProduct.AvailaleQty = selectedItem?.Size;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one

      return updatedProductList; // Return the updated product list to set the state
    });
  };
  const handleSelectionone = (selectedList, selectedItem, index) => {
    SelectedSize.push(selectedItem);
    setProduct((prevProductList) => {
      debugger;
      const updatedProductList = [...prevProductList]; // Create a copy of the productList array
      const updatedProduct = { ...updatedProductList[index] }; // Create a copy of the product at the specified index
      updatedProduct.Size = selectedItem?.unitQty; // Update the price of the copied product
      updatedProduct.unitType = selectedItem?.primaryUnit;
      updatedProductList[index] = updatedProduct; // Replace the product at the specified index with the updated one
      let myarr = prevProductList?.map((ele, i) => {
        console.log(ele?.transferQty * ele?.price * SelectedSize[i]?.unitQty);
        let indextotal =
          ele?.transferQty * ele?.price * SelectedSize[i]?.unitQty;
        GrandTotal[index] = indextotal;
        return indextotal;
      });
      let amt = myarr.reduce((a, b) => a + b);
      setGrandTotalAmt(amt);
      return updatedProductList; // Return the updated product list to set the state
    });
    // onSelect1(selectedList, selectedItem, index);
  };
  const handleInputChange = (e, type, i) => {
    const { name, value, checked } = e.target;
    setindex(i);
    if (type == "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          [name]: checked,
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      if (type == "number") {
        if (/^\d{0,10}$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setError("");
        } else {
          setError(
            "Please enter a valid number with a maximum length of 10 digits"
          );
        }
      } else {
        if (value.length <= 10) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setError("");
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      }
    }
  };
  // handleInputChange;
  // useEffect(() => {
  //   console.log(window);
  //   console.log(product);
  //   console.log(GrandTotal);
  //   console.log(Salesperson);
  //   console.log(StockTrxdate);
  //   console.log(targetEndDate);
  // }, [product, targetEndDate]);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    _Get(WareahouseList_For_addProduct, userData?.database)
      .then((values) => {
        // console.log(res?.Product);
        // warehouse;
        let value = values?.Warehouse;
        if (value) {
          setWarehouseList(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // CreateWarehouseList(userData._id)
    //   .then((res) => {
    //     console.log(res?.Warehouse);
    //     setWarehouseList(res?.Warehouse);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    UnitListView(userData?._id, userData?.database)
      .then((res) => {
        console.log(res?.Unit);
        setUnitList(res?.Unit);
      })
      .catch((err) => {
        console.log(err);
      });

    ProductListView(userData?._id, userData?.database)
      .then((res) => {
        console.log(res.Product);
        let AllProduct = res?.Product?.filter(
          (ele) => ele?.addProductType == "Product"
        );
        // debugger;
        setProductList(res.Product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    console.log(userInfo);
    setUserInfo(userInfo);
    // CreateOrder_ID()
    //   .then((res) => {
    //     const lastElement = res?.Order[res?.Order?.length - 1].id;
    //     const prefix = lastElement?.substring(0, 5);
    //     const number = parseInt(lastElement?.match(/\d+$/)[0], 10) + 1;
    //     const concatenatedString = prefix + number;
    //     setOrderID(concatenatedString);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // CreateOrder_ViewData()
    //   .then((res) => {
    //     const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
    //     setCreatAccountView(JSON.parse(jsonData));
    //     setStatusDropDown(
    //       JSON.parse(jsonData)?.createOrder.CurrentStatus?.MyDropDown?.dropdown
    //     );
    //     setdropdownValue(JSON.parse(jsonData));
    //     setPartDetails(JSON.parse(jsonData)?.createOrder.PartDetails);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  let addMoreProduct = () => {
    setProduct([
      ...product,
      {
        product: "", //
        productId: "",
        AvailaleQty: null,
        availableQty: "",
        transferQty: 1, //
        price: "", //
        totalprice: "", //
        Size: "",
        unitType: "",
        stockTrxDate: "",
        targetEndDate: "",
        discount: "",
        Shipping: "",
        tax: "",
        grandTotal: "",
      },
    ]);
  };
  let removeMoreProduct = (i) => {
    let newFormValues = [...product];
    newFormValues.splice(i, 1);
    GrandTotal.splice(i, 1);
    let amt = GrandTotal.reduce((a, b) => a + b);
    setGrandTotalAmt(amt);

    setProduct(newFormValues);
  };
  // let handlePartChange = (i, e) => {
  //   let newFormValues = [...part];
  //   newFormValues[i][e.target.name] = e.target.value;
  //   setPart(newFormValues);
  // };

  const WareHousetoWareHouse = (e) => {
    e.preventDefault();
    // body: warehouse, productId, Size, unitType, transferQty, price, totalPrice;
    let userdata = JSON.parse(localStorage.getItem("userData"));
    let Allproduct = product?.map((ele, i) => {
      console.log(ele);
      return {
        productId: ele?.productId,
        unitType: ele?.unitType,
        price: ele?.price,
        Size: ele?.Size,
        transferQty: ele?.transferQty,
        totalPrice: ele?.totalprice,
        currentStock: ele?.transferQty * ele?.Size,
      };
    });
    let payload = {
      productItems: Allproduct,
      warehouseToId: WareHousetwo[0]?._id,
      warehouseFromId: WareHouseone[0]?._id,
      stockTransferDate: StockTrxdate,
      grandTotal: grandTotalAmt,
      transferStatus: "InProcess",
      created_by: userdata?._id,
    };
    console.log(payload);
    WarehousetoWareHouseTrx(payload)
      .then((res) => {
        //   window.location.reload();
        // history.goBack();
        swal("Stock transerffered is Initiated");

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        swal("Something Went Wrong");
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let userdata = JSON.parse(localStorage.getItem("userData"));

    let Allproduct = product?.map((ele, i) => {
      console.log(ele);
      return {
        productId: ele?.productId,
        unitType: ele?.unitType,
        price: ele?.price,
        Size: ele?.Size,
        transferQty: ele?.transferQty,
        totalPrice: ele?.totalprice,
        currentStock: ele?.transferQty * ele?.Size,
      };
    });
    let payload = {
      productItems: Allproduct,
      warehouseToId: WareHouseone[0]?._id,
      stockTransferDate: StockTrxdate,
      grandTotal: grandTotalAmt,
      transferStatus: "InProcess",
      created_by: userdata?._id,
    };

    if (error) {
      swal("Error occured while Entering Details");
    } else {
      StocktrxFtoW(payload)
        .then((res) => {
          // if (res.status) {
          //   setFormData({});
          //   window.location.reload();
          swal("Stock Assigned to WareHouse");
          // }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onSelect1 = (selectedList, selectedItem, index) => {
    console.log(selectedList);
    setWareHouseone(selectedList);
    // setProductList(selectedList[0].productItems);
  };
  const onSelectone = (selectedList, selectedItem, index) => {
    console.log(selectedList);

    setWareHouseone(selectedList);
    debugger;
    // const list = [...product];
    let MySelectedwarehouseProduct = selectedList[0].productItems?.map(
      (ele, i) => {
        let myproduct = ele?.productId;
        ele["Product_Title"] = myproduct?.Product_Title;
        ele["Product_id"] = myproduct?._id;
        ele["Product_MRP"] = myproduct?.Product_MRP;
        ele["discount"] = myproduct?.discount;
        ele["transferQty"] = myproduct?.transferQty;
        ele["MIN_stockalert"] = myproduct?.MIN_stockalert;
      }
    );

    console.log(selectedList[0]?.productItems);

    setProductWTWList(selectedList[0]?.productItems);
  };
  const onRemove1 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  const onRemoveone = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  const onSelect2 = (selectedList, selectedItem, index) => {
    console.log(selectedList);
    setWareHousetwo(selectedList);
  };
  const onRemove2 = (selectedList, removedItem, index) => {
    console.log(selectedList);
    console.log(index);
  };
  return (
    <div>
      <Card>
        <Row className="m-2">
          <Col lg="8" md="8" sm="8" className="mb-2 mt-1">
            <div>
              <h1 className="">Create Stock Transfer</h1>
              <div className="choose">
                <h4 className="mb-1">Choose Type of Stock trx</h4>
                <div
                  className="form-label-group"
                  onChange={(e) => setTypeOfTrx(e.target.value)}
                  // onChange={(e) => {
                  //   setFormData({
                  //     ...formData,
                  //     ["status"]: e.target.value,
                  //   });
                  // }}
                >
                  <input
                    required
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Warehousetowarehouse"
                  />
                  <span style={{ marginRight: "20px" }}>
                    Warehouse to Warehouse
                  </span>

                  <input
                    required
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Factorytowarehourse"
                  />
                  <span style={{ marginRight: "3px" }}>
                    Factory to Warehourse
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="float-right">
              <Route
                render={({ history }) => (
                  <Button
                    style={{ cursor: "pointer" }}
                    className="float-right mr-1"
                    color="primary"
                    onClick={() => history.goBack()}>
                    {" "}
                    Back
                    {/* <FaPlus size={15} /> Create User */}
                  </Button>
                )}
              />
            </div>
          </Col>
        </Row>
        <CardBody>
          {TypeOfTrx && TypeOfTrx == "Warehousetowarehouse" && (
            <Form className="mx-1" onSubmit={WareHousetoWareHouse}>
              <Row>
                <Col className="mb-1" lg="3" md="3" sm="12">
                  <div className="">
                    <Label>Choose Warehouse(from where) *</Label>
                    <Multiselect
                      required
                      selectionLimit={1}
                      // showCheckbox="true"
                      isObject="false"
                      options={WareHouselist} // Options to display in the dropdown
                      // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                      onSelect={onSelectone} // Function will trigger on select event
                      onRemove={onRemoveone} // Function will trigger on remove event
                      displayValue="warehouseName" // Property name to display in the dropdown options
                    />
                  </div>
                </Col>
                <Col className="mb-1" lg="3" md="3" sm="12">
                  <div className="">
                    <Label>Choose Warehouse (to be Transfer) * </Label>

                    <Multiselect
                      required
                      selectionLimit={1}
                      // showCheckbox="true"
                      isObject="false"
                      options={WareHouselist} // Options to display in the dropdown
                      // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                      onSelect={onSelect2} // Function will trigger on select event
                      onRemove={onRemove2} // Function will trigger on remove event
                      displayValue="warehouseName" // Property name to display in the dropdown options
                    />
                  </div>
                </Col>
                <Col className="mb-1" lg="2" md="2" sm="12">
                  <div className="">
                    <Label>Stock Transfer date</Label>
                    <Input
                      required
                      type="date"
                      name="targetEndDate"
                      placeholder="Date of Delivery"
                      value={StockTrxdate}
                      onChange={(e) => setStockTrxDate(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              {product &&
                product?.map((product, index) => (
                  <Row className="" key={index}>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Product Name</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          // showCheckbox="true"
                          isObject="true"
                          options={ProductWTWList}
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={(selectedList, selectedItem) =>
                            handleSelection(selectedList, selectedItem, index)
                          }
                          onRemove={(selectedList, selectedItem) => {
                            handleRemoveSelected(
                              selectedList,
                              selectedItem,
                              index
                            );
                          }}
                          displayValue="Product_Title" // Property name to display in the dropdown options
                        />
                        {/* <CustomInput
                          name="productId"
                          onChange={(e) => handleProductChangeProduct(e, index)}
                          type="select">
                          <option>--Select--</option>
                          {ProductWTWList &&
                            ProductWTWList?.map((ele, i) => {
                              return (
                                <option value={ele?.productId?._id}>
                                  {ele?.productId.Product_Title}
                                </option>
                              );
                            })}
                        </CustomInput> */}
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Size</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          // showCheckbox="true"
                          isObject="false"
                          options={UnitList}
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionone(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            handleRemoveSelectedone(
                              selectedList,
                              selectedItem,
                              index
                            );
                          }}
                          displayValue="primaryUnit" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Quantity To be Transfer</Label>
                        <Input
                          type="number"
                          min={0}
                          name="transferQty"
                          placeholder="Req_Qty"
                          value={product?.transferQty}
                          onChange={(e) =>
                            handleProductChangeProduct(
                              e,
                              index,
                              product?.AvailaleQty
                            )
                          }
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Available Qty</Label>
                        <Input
                          disabled
                          type="number"
                          min={0}
                          name="AvailaleQty"
                          placeholder="Available Qty"
                          value={product?.AvailaleQty}
                          // onChange={(e) => handleProductChangeProduct(e, index)}
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="price"
                          readOnly
                          placeholder="Price"
                          value={product.price}
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Total Price</Label>
                        <Input
                          type="number"
                          name="totalprice"
                          readOnly
                          placeholder="TtlPrice"
                          value={
                            product.Size * product.price * product.transferQty
                          }
                        />
                      </div>
                    </Col>

                    <Col className="d-flex mt-1 abb" lg="3" md="3" sm="12">
                      <div className="btnStyle">
                        {index ? (
                          <Badge
                            type="button"
                            color="danger"
                            className="button remove "
                            onClick={() => removeMoreProduct(index)}>
                            - Remove
                          </Badge>
                        ) : null}
                      </div>

                      <div className="btnStyle">
                        <Badge
                          className="ml-1 mb-1"
                          color="primary"
                          type="button"
                          onClick={() => addMoreProduct()}>
                          + Add
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                ))}

              <Row>
                <Col className="mb-1" lg="12" md="12" sm="12">
                  <div className=" d-flex justify-content-end">
                    <Label className="pr-5">
                      Grand Total :{" "}
                      <strong>
                        {grandTotalAmt && grandTotalAmt == "NaN"
                          ? 0
                          : grandTotalAmt}{" "}
                      </strong>
                    </Label>
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
          )}
          {TypeOfTrx && TypeOfTrx == "Factorytowarehourse" && (
            <Form className="m-1" onSubmit={submitHandler}>
              <Row>
                <Col className="mb-1" lg="3" md="3" sm="12">
                  <div className="">
                    <Label>Choose Warehouse </Label>

                    <Multiselect
                      required
                      selectionLimit={1}
                      // showCheckbox="true"
                      isObject="false"
                      options={WareHouselist} // Options to display in the dropdown
                      // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                      onSelect={onSelect1} // Function will trigger on select event
                      onRemove={onRemove1} // Function will trigger on remove event
                      displayValue="warehouseName" // Property name to display in the dropdown options
                    />
                  </div>
                </Col>

                <Col className="mb-1" lg="2" md="2" sm="12">
                  <div className="">
                    <Label>Stock Transfer date</Label>
                    <Input
                      required
                      type="date"
                      name="targetEndDate"
                      placeholder="Date of Delivery"
                      value={StockTrxdate}
                      onChange={(e) => setStockTrxDate(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              {product &&
                product?.map((product, index) => (
                  <Row className="" key={index}>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Product Name</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          // showCheckbox="true"
                          isObject="false"
                          options={ProductList}
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionProduct(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            handleRemoveSelected(
                              selectedList,
                              selectedItem,
                              index
                            );
                          }}
                          displayValue="Product_Title" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Size</Label>
                        <Multiselect
                          required
                          selectionLimit={1}
                          // showCheckbox="true"
                          isObject="false"
                          options={UnitList}
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={(selectedList, selectedItem) =>
                            handleSelectionone(
                              selectedList,
                              selectedItem,
                              index
                            )
                          }
                          onRemove={(selectedList, selectedItem) => {
                            handleRemoveSelectedone(
                              selectedList,
                              selectedItem,
                              index
                            );
                          }}
                          displayValue="primaryUnit" // Property name to display in the dropdown options
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Quantity To be Transfer</Label>
                        <Input
                          type="number"
                          min={0}
                          name="transferQty"
                          placeholder="Req_Qty"
                          value={product?.transferQty}
                          onChange={(e) =>
                            handleProductChangeProductone(e, index)
                          }
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="price"
                          readOnly
                          placeholder="Price"
                          value={product.price}
                        />
                      </div>
                    </Col>
                    <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Total Price</Label>
                        <Input
                          type="number"
                          name="totalprice"
                          readOnly
                          placeholder="TtlPrice"
                          value={
                            product.Size * product.price * product.transferQty
                          }
                        />
                      </div>
                    </Col>

                    <Col className="d-flex mt-1 abb" lg="3" md="3" sm="12">
                      <div className="btnStyle">
                        {index ? (
                          <Button
                            type="button"
                            color="danger"
                            className="button remove "
                            onClick={() => removeMoreProduct(index)}>
                            - Remove
                          </Button>
                        ) : null}
                      </div>

                      <div className="btnStyle">
                        <Button
                          className="ml-1 mb-1"
                          color="primary"
                          type="button"
                          onClick={() => addMoreProduct()}>
                          + Add
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ))}
              <Row>
                {/* <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Discount</Label>
                        <Input
                          type="number"
                          name="discount"
                          readOnly
                          placeholder="Dissct"
                          value={product.discount}
                        />
                      </div>
                    </Col> */}
                {/* <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Shipping Cost</Label>
                        <Input
                          type="number"
                          name="Shipcst"
                          readOnly
                          placeholder="Shipcst"
                          value={product.Shipping}
                        />
                      </div>
                    </Col> */}
                {/* <Col className="mb-1" lg="2" md="2" sm="12">
                      <div className="">
                        <Label>Tax</Label>
                        <Input
                          type="number"
                          name="tax"
                          readOnly
                          placeholder="Tax"
                          value={product.tax}
                        />
                      </div>
                    </Col> */}
              </Row>
              <Row>
                <Col className="mb-1" lg="12" md="12" sm="12">
                  <div className=" d-flex justify-content-end">
                    <Label className="pr-5">
                      Grand Total :{" "}
                      <stron>
                        {grandTotalAmt && grandTotalAmt == "NaN"
                          ? 0
                          : grandTotalAmt}{" "}
                      </stron>
                    </Label>
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
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default CreateTarget;
