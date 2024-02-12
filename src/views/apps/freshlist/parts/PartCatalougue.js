import React, { useState, useEffect, useContext } from "react";
import Imagemagnify from "./Imagemagnify";
import {
  Collapse,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Media,
} from "reactstrap";
import "./Magnify.css";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import {
  AddCartsPartsCatalgue,
  AddToCartGet,
  PartCatalogueView,
} from "../../../../ApiEndPoint/ApiCalling";
import { BsCartCheckFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import * as Icon from "react-feather";
import ZoomimageTest from "./ZoomimageTest";
// import { ReactPanZoom } from "./Ra";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../../../context/Context";
import { Link, useLocation, matchPath } from "react-router-dom";
import { MdOutlineDownloadDone } from "react-icons/md";
import swal from "sweetalert";
import Exchange from "./Exchange";
import TimeZoneConverter from "./Timezone";

function PartCatalougue() {
  const [CollapseIndex, setCollapseIndex] = useState("");
  const [frontSide, setfrontSide] = useState([]);
  const [AllData, setAllData] = useState({});
  const [ListData, setListData] = useState([]);
  const [Breadcums, setBreadcums] = useState([]);
  const [Fullimage, setFullimage] = useState(false);
  const [SelectedCart, setSelectedCart] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [Loader, setLoader] = useState(false);

  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState(
    ListData?.map((product) => ({
      quantity: 0,
      elementData: product, // You can set this to the product data
    }))
  );
  const context = useContext(UserContext);

  useEffect(() => {
    PartCatalogueView()
      .then((res) => {
        console.log(res?.Parts_Catalogue);
        setAllData(res?.Parts_Catalogue);
        let keys = Object.keys(res?.Parts_Catalogue);
        setCollapseIndex(0);
        setListData(res?.Parts_Catalogue[keys[0]]);
        setBreadcums(res?.Parts_Catalogue[keys[0]]);
        setfrontSide(keys);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    // AddToCartGet(userData?._id)
    //   .then((res) => {
    //     console.log(res?.cart);
    //     setSelectedCart(res?.cart);
    //     const initialQuantities = ListData?.map((product) => {
    //       const cartItem = res?.cart?.find(
    //         (item) => item?.product?._id === product._id
    //       );
    //       return cartItem ? cartItem?.quantity : 0;
    //     });
    //     console.log(initialQuantities);

    //     setQuantities(initialQuantities);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     if (err?.response.data?.message) {
    //       const initialQuantities = new Array(ListData?.length).fill(0);
    //       setQuantities(initialQuantities);
    //     }
    //   });
  }, []);

  const handleIncreaseCount = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  // handle decrease count
  const handleDecreaseCount = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 0) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  // add to cart
  const addToCart = (index, ele) => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    setLoader(true);
    if (quantities[index] > 0) {
      setCart((prevCart) => {
        const newCart = [...prevCart];

        setTotalItemCount((count) => count + quantities[index]);
        const existingIndex = newCart.findIndex(
          (item) => item?.product?._id === ListData[index]._id
        );

        let value = {
          userId: userData?.accountId,
          productId: ele?._id,
          quantity: quantities[index],
        };
        console.log(value);
        AddCartsPartsCatalgue(value)
          .then((res) => {
            console.log(res.data);
            setLoader(false);
            // toast.success("Added To Cart");
            let userData = JSON.parse(localStorage.getItem("userData")); //forgot to close
            // AddToCartGet(userData?._id)
            //   .then((res) => {
            //     context?.setPartsCatalougueCart(res?.cart);
            //   })
            //   .catch((err) => {
            //     console.log(err.response);
            //   });
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response?.data?.message) {
              swal("Warning", `${err.response?.data?.message}`);
            }
          });

        if (existingIndex !== -1) {
          // If the product already exists in the cart, update its quantity
          newCart[existingIndex].quantity += quantities[index];
        } else {
          // If it doesn't exist, add it to the cart
          newCart.push({
            product: ListData[index],
            quantity: quantities[index],
          });
        }
        return newCart;
      });
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        // newQuantities[index] = 0;
        return newQuantities;
      });
    }
  };

  const toggleCollapse = (ele, i) => {
    if (ele) {
      setFullimage(true);
    }
    setListData(AllData[ele]);
    setBreadcums(AllData[ele]);
    setCollapseIndex(i);
  };

  return (
    <>
      <Row>{/* <TimeZoneConverter /> */}</Row>
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem>
              <a>Home</a>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <a>{frontSide[CollapseIndex]}</a>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        {/* <ToastContainer /> */}
        {!Fullimage && (
          <>
            <Col className="mb-2" lg="3" md="3" sm="3" xs="12">
              <div className="collapse-bordered collapse-border mb-3">
                {frontSide?.map((ele, i) => {
                  return (
                    <>
                      <Card
                        style={{
                          backgroundColor: `${
                            CollapseIndex === i ? "#055761" : ""
                          }`,
                          color: `${CollapseIndex === i ? "white" : ""}`,
                        }}
                        className="collapse-border-item"
                        key={i}
                        onClick={() => toggleCollapse(ele, i)}
                      >
                        <CardHeader className="cardheadercustme">
                          <CardTitle className={`lead collapse-title `}>
                            <div className="">
                              <Row>
                                <Col>
                                  <div className="arrowdowandup">
                                    <div className="d-flex">
                                      <span
                                        style={{
                                          backgroundColor: `${
                                            CollapseIndex === i ? "#055761" : ""
                                          }`,
                                          color: `${
                                            CollapseIndex === i ? "white" : ""
                                          }`,
                                        }}
                                      >
                                        {ele.substring(0, 15)}
                                      </span>
                                      {CollapseIndex === i ? (
                                        <>
                                          <span className="ml-2">
                                            <AiFillDownCircle className="aiarrow " />
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="ml-2">
                                            <AiFillUpCircle className="aiarrow" />
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </>
                  );
                })}
              </div>
            </Col>
          </>
        )}
        <Col
          lg={Fullimage ? "8" : "5"}
          md={Fullimage ? "8" : "5"}
          sm={Fullimage ? "8" : "5"}
          xs="12"
        >
          <div className="d-flex justify-content-start">
            {Fullimage ? (
              <BsFillArrowRightSquareFill
                style={{ cursor: "pointer" }}
                onClick={() => setFullimage(false)}
                size="25px"
                fill="#055761"
                className=""
              />
            ) : (
              ""
            )}
          </div>
          {ListData && ListData ? (
            <>
              <Imagemagnify imageSrc={ListData[0]?.Part_Image} />
            </>
          ) : (
            <>
              <Imagemagnify imageSrc="https://res.cloudinary.com/dc7hzwpbm/image/upload/v1683461876/software_development.jpg" />
            </>
          )}
        </Col>
        <Col lg="4" md="4" sm="4" xs="12">
          <div
            style={{ height: window.innerHeight - 150 }}
            className="tableheadingmy"
          >
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Part Name</th>
                  <th>
                    Part Price(
                    {context?.UserInformatio?.currency !== undefined ? (
                      <>{context?.UserInformatio?.currency.split("_")[1]}</>
                    ) : (
                      <>$</>
                    )}
                    )
                  </th>
                  <th>Part Number</th>
                  <th>Qty</th>
                  <th>Add to Cart </th>
                  <th>Part Quantity</th>
                </tr>
              </thead>
              <tbody>
                {ListData &&
                  ListData?.map((val, i) => {
                    return (
                      <tr key={val._id}>
                        <th scope="row">{i + 1}</th>

                        {/* <td>
                              <img src={val.Part_Image?.text} alt="img" />
                            </td> */}
                        <td>{val.Part_Name}</td>
                        <td>
                          {(context?.Currencyconvert * val.Part_Price).toFixed(
                            2
                          )}
                        </td>
                        <td>{val.Part_Number}</td>
                        <td>
                          <span className="d-flex">
                            <Button
                              style={{ padding: "7px 8px" }}
                              className="minusbutton"
                              color="primary"
                              size="sm"
                              onClick={() => handleDecreaseCount(i)}
                            >
                              -
                            </Button>
                            <div className="inputheading">
                              <input
                                style={{ width: "40px" }}
                                type="number"
                                name="cart"
                                min="0"
                                value={quantities[i]}
                                onChange={(e) => {
                                  handleQuantityChange(i, e.target.value);
                                }}
                                onKeyDown={(e) => {
                                  ["e", "E", "+", "-"].includes(e.key) &&
                                    e.preventDefault();
                                }}
                                maxlength="4"
                                size="2"
                              />
                            </div>{" "}
                            <Button
                              onClick={() => handleIncreaseCount(i)}
                              style={{ padding: "7px 8px" }}
                              color="primary"
                              size="sm"
                            >
                              <strong>+</strong>
                            </Button>
                          </span>
                        </td>
                        <td>
                          <>
                            <div
                              style={{ width: "71px" }}
                              className="addtocart d-flex"
                            >
                              {quantities[i] > 0 ? (
                                <>
                                  <MdOutlineDownloadDone
                                    title=" click here to add Cart"
                                    onClick={() => addToCart(i, val)}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    color="green"
                                    size={40}
                                  />
                                </>
                              ) : null}
                              <UncontrolledDropdown
                                // tag="li"
                                className="dropdown-notification nav-item"
                              >
                                <DropdownToggle
                                  tag="a"
                                  className="nav-link nav-link-label"
                                >
                                  <BsCartCheckFill color="#055761" size={25} />
                                  <Badge
                                    style={{
                                      position: "absolute",
                                      top: "-1px",
                                      right: "-2px",
                                    }}
                                    pill
                                    color="primary"
                                    className="badge-up cartbadgecatalougue"
                                  >
                                    {quantities[i]}
                                  </Badge>
                                </DropdownToggle>
                              </UncontrolledDropdown>
                            </div>
                          </>
                        </td>
                        <td>{val.Part_Qty}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row>
        {/* <ZoomimageTest /> */}
        {/* <ReactPanZoom
            alt="cool image"
            image="https://drscdn.500px.org/photo/105738331/q%3D80_m%3D2000/v2?webp=true&sig=538a4f76f4966c84acb01426bb4a4a5e4a85b72a2c3bd64973d3a369f9653007"
          /> */}
      </Row>
    </>
  );
}

export default PartCatalougue;
