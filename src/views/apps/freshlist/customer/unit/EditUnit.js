// import React, { useEffect, useState, useContext } from "react";
// import xmlJs from "xml-js";
// import {
//   Card,
//   CardBody,
//   Col,
//   Form,
//   Row,
//   Input,
//   Label,
//   Button,
//   FormGroup,
//   CustomInput,
//   Badge,
// } from "reactstrap";
// import { history } from "../../../../../history";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Country, State, City } from "country-state-city";
// import Select from "react-select";
// import moment from "moment-timezone";
// import { Route } from "react-router-dom";

// import swal from "sweetalert";
// import { BiEnvelope } from "react-icons/bi";
// import { FcPhoneAndroid } from "react-icons/fc";
// import { BsWhatsapp } from "react-icons/bs";
// // import "../../../../../src/layouts/assets/scss/pages/users.scss";
// import "../../../../../assets/scss/pages/users.scss";
// import { CloudLightning } from "react-feather";
// import { FaPlus } from "react-icons/fa";

// import {
//   CreateAccountSave,
//   CreateAccountView,
// } from "../../../../../ApiEndPoint/ApiCalling";
// import "../../../../../assets/scss/pages/users.scss";
// import UserContext from "../../../../../context/Context";

// const EditUnit = ({ ViewOneData }) => {
//   const [CreatAccountView, setCreatAccountView] = useState([]);
//   const [Countries, setCountry] = useState({});
//   const [States, setState] = useState({});
//   const [Cities, setCities] = useState({});
//   const [formData, setFormData] = useState({});
//   const [dropdownValue, setdropdownValue] = useState({});
//   const [index, setindex] = useState("");
//   const [error, setError] = useState("");
//   const [permissions, setpermissions] = useState({});

//   const Context = useContext(UserContext);

//   const handleInputChange = (e, type, i) => {
//     const { name, value, checked } = e.target;
//     setindex(i);
//     if (type == "checkbox") {
//       if (checked) {
//         setFormData({
//           ...formData,
//           [name]: checked,
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: checked,
//         });
//       }
//     } else {
//       if (type == "number") {
//         if (/^\d{0,10}$/.test(value)) {
//           setFormData({
//             ...formData,
//             [name]: value,
//           });
//           setError("");
//         } else {
//           setError(
//             "Please enter a valid number with a maximum length of 10 digits"
//           );
//         }
//       } else {
//         if (value.length <= 10) {
//           setFormData({
//             ...formData,
//             [name]: value,
//           });
//           // console.log(value);
//           setError("");
//         } else {
//           setFormData({
//             ...formData,
//             [name]: value,
//           });
//           // setError("Input length exceeds the maximum of 10 characters");
//         }
//       }
//     }
//   };
//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);
//   useEffect(() => {
//     console.log(ViewOneData);
//     setFormData(ViewOneData);
//     CreateAccountView()
//       .then((res) => {
//         const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
//         // console.log(JSON.parse(jsonData)?.CreateUser?.input);

//         setCreatAccountView(JSON.parse(jsonData)?.CreateUser?.input);

//         setdropdownValue(JSON.parse(jsonData));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     if (error) {
//       swal("Error occured while Entering Details");
//     } else {
//       CreateAccountSave(formData)
//         .then((res) => {
//           setFormData({});
//           if (res.status) {
//             window.location.reload();
//             swal("User Created Successfully");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Card>
//           <Row className="m-2">
//             <Col>
//               <h1 className="float-left">Edit User</h1>
//             </Col>
//             <Col>
//               <div className="float-right">
//                 {/* <Route
//                   render={({ history }) => (
//                     <Button
//                       style={{ cursor: "pointer" }}
//                       className="float-right mr-1"
//                       color="primary"
//                       onClick={() =>
//                         history.push("/app/SoftNumen/accounSearch")
//                       }
//                     >
//                       {" "}
//                       Back
//                     </Button>
//                   )}
//                 /> */}
//               </div>
//             </Col>
//           </Row>
//           {/* <hr /> */}

//           <CardBody>
//             <Form className="m-1" onSubmit={submitHandler}>
//               <Row className="mb-2">
//                 {/* <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>
//                       {
//                         dropdownValue.CreateAccount?.MyDropdown?.dropdown?.label
//                           ?._text
//                       }
//                     </Label>
//                     <CustomInput
//                       required
//                       type="select"
//                       name={
//                         dropdownValue.CreateAccount?.MyDropdown?.dropdown?.name
//                           ?._text
//                       }
//                       value={
//                         formData[
//                           dropdownValue.CreateAccount?.MyDropdown?.dropdown
//                             ?.name?._text
//                         ]
//                       }
//                       onChange={handleInputChange}
//                     >
//                       <option value="">--Select Role--</option>
//                       {dropdownValue?.CreateAccount?.MyDropdown?.dropdown?.option.map(
//                         (option, index) => (
//                           <option
//                             key={index}
//                             value={option?._attributes?.value}
//                           >
//                             {option?._attributes?.value}
//                           </option>
//                         )
//                       )}
//                     </CustomInput>
//                   </FormGroup>
//                 </Col> */}

//                 {CreatAccountView &&
//                   CreatAccountView?.map((ele, i) => {
//                     {
//                       /* console.log(Context?.UserInformatio?.dateFormat); */
//                     }
//                     // console.log(Countries);
//                     // console.log(States);
//                     const convertedTime = moment("2022-08-05T12:00:00")
//                       .tz("America/New_York")
//                       .format("D MMM, YYYY HH:mm");

//                     if (!!ele?.phoneinput) {
//                       return (
//                         <>
//                           <Col key={i} lg="4" md="4" sm="12">
//                             <FormGroup>
//                               <Label>{ele?.label?._text}</Label>
//                               <PhoneInput
//                                 disabled
//                                 inputClass="myphoneinput"
//                                 country={"us"}
//                                 onKeyDown={(e) => {
//                                   if (
//                                     ele?.type?._attributes?.type == "number"
//                                   ) {
//                                     ["e", "E", "+", "-"].includes(e.key) &&
//                                       e.preventDefault();
//                                   }
//                                 }}
//                                 countryCodeEditable={false}
//                                 name={ele?.name?._text}
//                                 value={formData[ele?.name?._text]}
//                                 onChange={(phone) => {
//                                   setFormData({
//                                     ...formData,
//                                     [ele?.name?._text]: phone,
//                                   });
//                                 }}
//                               />
//                               {index === i ? (
//                                 <>
//                                   {error && (
//                                     <span style={{ color: "red" }}>
//                                       {error}
//                                     </span>
//                                   )}
//                                 </>
//                               ) : (
//                                 <></>
//                               )}
//                             </FormGroup>
//                           </Col>
//                         </>
//                       );
//                     } else if (!!ele?.library) {
//                       if (ele?.label._text?.includes("ountry")) {
//                         console.log(ele);
//                         return (
//                           <Col key={i} lg="4" md="4" sm="12">
//                             <FormGroup>
//                               <Label>{ele?.label?._text}</Label>
//                               <Select
//                                 disabled
//                                 inputClass="countryclass"
//                                 className="countryclassnw"
//                                 options={Country.getAllCountries()}
//                                 getOptionLabel={(options) => {
//                                   return options["name"];
//                                 }}
//                                 getOptionValue={(options) => {
//                                   return options["name"];
//                                 }}
//                                 value={Countries}
//                                 onChange={(country) => {
//                                   setCountry(country);
//                                   setFormData({
//                                     ...formData,
//                                     ["Country"]: country?.name,
//                                   });
//                                 }}
//                               />
//                               {index === i ? (
//                                 <>
//                                   {error && (
//                                     <span style={{ color: "red" }}>
//                                       {error}
//                                     </span>
//                                   )}
//                                 </>
//                               ) : (
//                                 <></>
//                               )}
//                             </FormGroup>
//                           </Col>
//                         );
//                       } else if (ele?.label._text?.includes("tate")) {
//                         return (
//                           <Col key={i} lg="4" md="4" sm="12">
//                             <FormGroup>
//                               <Label>{ele?.label?._text}</Label>
//                               <Select
//                                 disabled
//                                 options={State?.getStatesOfCountry(
//                                   Countries?.isoCode
//                                 )}
//                                 getOptionLabel={(options) => {
//                                   return options["name"];
//                                 }}
//                                 getOptionValue={(options) => {
//                                   return options["name"];
//                                 }}
//                                 value={States}
//                                 onChange={(State) => {
//                                   setState(State);
//                                   setFormData({
//                                     ...formData,
//                                     ["State"]: State?.name,
//                                   });
//                                 }}
//                               />
//                               {index === i ? (
//                                 <>
//                                   {error && (
//                                     <span style={{ color: "red" }}>
//                                       {error}
//                                     </span>
//                                   )}
//                                 </>
//                               ) : (
//                                 <></>
//                               )}
//                             </FormGroup>
//                           </Col>
//                         );
//                       } else if (ele?.label._text?.includes("ity")) {
//                         return (
//                           <Col key={i} lg="4" md="4" sm="12">
//                             <FormGroup>
//                               <Label>{ele?.label?._text}</Label>
//                               <Select
//                                 disabled
//                                 options={City?.getCitiesOfState(
//                                   States?.countryCode,
//                                   States?.isoCode
//                                 )}
//                                 getOptionLabel={(options) => {
//                                   return options["name"];
//                                 }}
//                                 getOptionValue={(options) => {
//                                   return options["name"];
//                                 }}
//                                 value={Cities}
//                                 onChange={(City) => {
//                                   setCities(City);
//                                   setFormData({
//                                     ...formData,
//                                     ["City"]: City?.name,
//                                   });
//                                 }}
//                               />
//                               {index === i ? (
//                                 <>
//                                   {error && (
//                                     <span style={{ color: "red" }}>
//                                       {error}
//                                     </span>
//                                   )}
//                                 </>
//                               ) : (
//                                 <></>
//                               )}
//                             </FormGroup>
//                           </Col>
//                         );
//                       } else {
//                         return (
//                           <>
//                             {ele?.type?._attributes?.type == "date" ? (
//                               <>
//                                 <Col key={i} lg="4" md="4" sm="12">
//                                   <FormGroup key={i}>
//                                     <Label>{ele?.label?._text}</Label>

//                                     <Input
//                                       disabled
//                                       onKeyDown={(e) => {
//                                         if (
//                                           ele?.type?._attributes?.type ==
//                                           "number"
//                                         ) {
//                                           ["e", "E", "+", "-"].includes(
//                                             e.key
//                                           ) && e.preventDefault();
//                                         }
//                                       }}
//                                       type={ele?.type?._attributes?.type}
//                                       placeholder={ele?.placeholder?._text}
//                                       name={ele?.name?._text}
//                                       dateFormat={
//                                         Context?.UserInformatio?.dateFormat
//                                       }
//                                       value={
//                                         moment(formData[ele?.name?._text])
//                                           .tz(Context?.UserInformatio?.timeZone)
//                                           .format(
//                                             Context?.UserInformatio?.dateFormat
//                                           )
//                                         // formData[ele?.name?._text]
//                                       }
//                                       // value={formData[ele?.name?._text]}
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           e,
//                                           ele?.type?._attributes?.type,
//                                           i
//                                         )
//                                       }
//                                     />
//                                     {index === i ? (
//                                       <>
//                                         {error && (
//                                           <span style={{ color: "red" }}>
//                                             {error}
//                                           </span>
//                                         )}
//                                       </>
//                                     ) : (
//                                       <></>
//                                     )}
//                                   </FormGroup>
//                                 </Col>
//                               </>
//                             ) : (
//                               <>
//                                 <Col key={i} lg="4" md="4" sm="12">
//                                   <FormGroup key={i}>
//                                     <Label>{ele?.label?._text}</Label>

//                                     <Input
//                                       disabled
//                                       onKeyDown={(e) => {
//                                         if (
//                                           ele?.type?._attributes?.type ==
//                                           "number"
//                                         ) {
//                                           ["e", "E", "+", "-"].includes(
//                                             e.key
//                                           ) && e.preventDefault();
//                                         }
//                                       }}
//                                       type={ele?.type?._attributes?.type}
//                                       placeholder={ele?.placeholder?._text}
//                                       name={ele?.name?._text}
//                                       value={formData[ele?.name?._text]}
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           e,
//                                           ele?.type?._attributes?.type,
//                                           i
//                                         )
//                                       }
//                                     />
//                                     {index === i ? (
//                                       <>
//                                         {error && (
//                                           <span style={{ color: "red" }}>
//                                             {error}
//                                           </span>
//                                         )}
//                                       </>
//                                     ) : (
//                                       <></>
//                                     )}
//                                   </FormGroup>
//                                 </Col>
//                               </>
//                             )}
//                           </>
//                         );
//                       }
//                     } else {
//                       return (
//                         <>
//                           {!!ele?.number ? (
//                             <>
//                               <Col key={i} lg="4" md="4" sm="12">
//                                 <FormGroup key={i}>
//                                   <Label>{ele?.label?._text}</Label>

//                                   <Input
//                                     disabled
//                                     onWheel={(e) => {
//                                       e.preventDefault(); // Prevent the mouse wheel scroll event
//                                     }}
//                                     onKeyDown={(e) => {
//                                       if (
//                                         ele?.type?._attributes?.type == "number"
//                                       ) {
//                                         ["e", "E", "+", "-"].includes(e.key) &&
//                                           e.preventDefault();
//                                       }
//                                     }}
//                                     type={ele?.type?._attributes?.type}
//                                     placeholder={ele?.placeholder?._text}
//                                     name={ele?.name?._text}
//                                     value={formData[ele?.name?._text]}
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         e,
//                                         ele?.type?._attributes?.type,
//                                         i
//                                       )
//                                     }
//                                   />
//                                   {index === i ? (
//                                     <>
//                                       {error && (
//                                         <span style={{ color: "red" }}>
//                                           {error}
//                                         </span>
//                                       )}
//                                     </>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </FormGroup>
//                               </Col>
//                             </>
//                           ) : (
//                             <Col key={i} lg="4" md="4" sm="12">
//                               <FormGroup key={i}>
//                                 <Label>{ele?.label?._text}</Label>

//                                 <Input
//                                   disabled
//                                   onKeyDown={(e) => {
//                                     if (
//                                       ele?.type?._attributes?.type == "number"
//                                     ) {
//                                       ["e", "E", "+", "-"].includes(e.key) &&
//                                         e.preventDefault();
//                                     }
//                                   }}
//                                   type={ele?.type?._attributes?.type}
//                                   placeholder={ele?.placeholder?._text}
//                                   name={ele?.name?._text}
//                                   value={formData[ele?.name?._text]}
//                                   onChange={(e) => {
//                                     // const value = e.target.value;
//                                     // // Use regular expression to allow only numbers
//                                     // const numericValue = value.replace(
//                                     //   /\D/g,
//                                     //   ""
//                                     // );
//                                     handleInputChange(
//                                       e,
//                                       ele?.type?._attributes?.type,
//                                       i
//                                     );
//                                   }}
//                                 />
//                                 {index === i ? (
//                                   <>
//                                     {error && (
//                                       <span style={{ color: "red" }}>
//                                         {error}
//                                       </span>
//                                     )}
//                                   </>
//                                 ) : (
//                                   <></>
//                                 )}
//                               </FormGroup>
//                             </Col>
//                           )}
//                         </>
//                       );
//                     }
//                   })}
//               </Row>

//               <hr />
//               {/* <Row className="mt-2 ">
//                 <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label className="">
//                     <h4>Status</h4>
//                   </Label>
//                   <div className="form-label-group mx-1">
//                     {CreatAccountView &&
//                       CreatAccountView?.CreateAccount?.Radiobutton?.input?.map(
//                         (ele, i) => {
//                           return (
//                             <FormGroup key={i}>
//                               <Input
//                                 key={i}
//                                 style={{ marginRight: "3px" }}
//                                 required
//                                 type={ele?.type?._attributes?.type}
//                                 name={ele?.name?._text}
//                                 value={`${
//                                   ele?.label?._text == "Active"
//                                     ? "Active"
//                                     : "Deactive"
//                                 }`}
//                                 onChange={handleInputChange}
//                               />{" "}
//                               <span
//                                 className="mx-1 mt-1"
//                                 style={{ marginRight: "20px" }}
//                               >
//                                 {ele?.label?._text}
//                               </span>
//                             </FormGroup>
//                           );
//                         }
//                       )}
//                   </div>
//                 </Col>
//               </Row> */}

//               {/* <Row>
//                 <Button.Ripple
//                   color="primary"
//                   type="submit"
//                   className="mr-1 mt-2 mx-2"
//                 >
//                   Submit
//                 </Button.Ripple>
//               </Row> */}
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// };
// export default EditUnit;

import React, { useEffect, useState, useRef, useContext } from "react";
import xmlJs from "xml-js";
import PhoneInput from "react-phone-input-2";
import Multiselect from "multiselect-react-dropdown";
import { Country, State, City } from "country-state-city";
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
} from "reactstrap";
import Select from "react-select";
import swal from "sweetalert";
import { Route } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

import { history } from "../../../../../history";
import "../../../../../../src/layouts/assets/scss/pages/users.scss";
import {
  CreateunitxmlView,
  SaveUnit,
} from "../../../../../ApiEndPoint/ApiCalling";
import "../../../../../assets/scss/pages/users.scss";
// import UserContext from "../../../../../context/Context";
const StateList = [
  { id: 1, state_title: "Clothing & Apparel." },
  { id: 2, state_title: "Footwear & Shoes." },
  { id: 3, state_title: "Electronics & Gadgets." },
  // Add more states as needed
];
const EditUnit = ({ ViewOneData }) => {
  const [CreatUnitView, setCreatUnitView] = useState({});
  const [Countries, setCountry] = useState({});
  const [States, setState] = useState({});
  const [Cities, setCities] = useState({});
  //   const [StateList, setCityList] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [formData, setFormData] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});
  //   const formRef = useRef(null);
  // const createUserXmlView = useContext(UserContext);

  const handleInputChange = (e, type, i) => {
    const { name, value } = e.target;
    console.log(value);
    setindex(i);
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
        // console.log(value);
        setError("");
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
        // setError("Input length exceeds the maximum of 10 characters");
      }
    }
  };

  useEffect(() => {
    console.log(ViewOneData);
    CreateunitxmlView()
      .then(res => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData).CreateUnit);
        setCreatUnitView(JSON.parse(jsonData));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onSelect1 = selectedList => {
    setSelectedValue(selectedList);
    console.log("Selected:", selectedList);
  };
  const onRemove1 = selectedList => {
    setSelectedValue(selectedList);
    console.log("Removed:", selectedList);
  };

  const submitHandler = e => {
    // if (formRef.current) {
    //     formRef.current.reset();
    //   }
    e.preventDefault();
    console.log(formData);
    if (error) {
      swal("Error occured while Entering Details");
    } else {
      let userData = JSON.parse(localStorage.getItem("userData"));
      formData["created_by"] = userData?._id;
      SaveUnit(formData)
        .then(res => {
          console.log(res);
          if (res.status) {
            swal(`${res.message}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Edit Unit</h1>
            </Col>
            <Col>
              <div className="float-right">
                {/* <Route
                  render={({ history }) => (
                    <Button
                      style={{ cursor: "pointer" }}
                      className="float-right mr-1"
                      color="primary"
                      onClick={() =>
                        history.push("/app/SoftNumen/accounSearch")
                      }
                    >
                      Back
                    </Button>
                  )}
                /> */}
              </div>
            </Col>
          </Row>

          <CardBody>
            <Form
              className="m-1"
              //   ref={formRef}
              onSubmit={submitHandler}
            >
              <Row className="mb-2">
                <Col lg="6" md="6" sm="12">
                  <Label>Select Product</Label>
                  <Multiselect
                    required
                    showCheckbox="true"
                    isObject="false"
                    options={StateList}
                    onSelect={onSelect1}
                    onRemove={onRemove1}
                    displayValue="state_title"
                  />
                </Col>
                {CreatUnitView &&
                  CreatUnitView?.CreateUnit?.input?.map((ele, i) => {
                    return (
                      <Col key={i} lg="6" md="6" sm="12">
                        <FormGroup key={i}>
                          <Label>{ele?.label?._text}</Label>

                          <Input
                            type={ele?.type?._attributes?.type}
                            placeholder={ele?.placeholder?._text}
                            name={ele?.name?._text}
                            value={formData[ele?.name?._text]}
                            onChange={e =>
                              handleInputChange(
                                e,
                                ele?.type?._attributes?.type,
                                i
                              )
                            }
                          />
                          {index === i ? (
                            <>
                              {error && (
                                <span style={{ color: "red" }}>{error}</span>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </FormGroup>
                      </Col>
                    );
                  })}
              </Row>
              <hr />
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2"
                >
                  Submit
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default EditUnit;
