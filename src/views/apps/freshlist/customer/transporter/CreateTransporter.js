import React, { useEffect, useState, useRef ,useContext } from "react";
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
  Createtransporterxml,
  Createtransportersave,
} from "../../../../../ApiEndPoint/ApiCalling";
import "../../../../../assets/scss/pages/users.scss";
// import UserContext from "../../../../../context/Context";
const StateList = [
    { id: 1, state_title: 'Clothing & Apparel.' },
    { id: 2, state_title: 'Footwear & Shoes.' },
    { id: 3, state_title: 'Electronics & Gadgets.' },
    // Add more states as needed
  ];
const CreateTransporter = () => {
  const [CreatTransporterView, setCreatTransporterView] = useState({});
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
    console.log(value)
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
  Createtransporterxml()
      .then(res => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
       setCreatTransporterView(JSON.parse(jsonData))
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onSelect1 = (selectedList, selectedItem) => {
    setSelectedValue(selectedList)
    console.log('Selected:', selectedList);
 };
  const onRemove1 = (selectedList, removedItem) => {
    setSelectedValue(selectedList); 
    console.log('Removed:', selectedList);
  };

  const submitHandler = e => {
    // if (formRef.current) {
    //     formRef.current.reset();
    //   }
    e.preventDefault();
    console.log(formData)
    if (error) {
      swal("Error occured while Entering Details");
    } else {
      Createtransportersave(formData)
        .then(res => {
            console.log(res)
          if (res.status) {
            // setFormData({WarehouseName:"",mobileno:"",email:""});
            // setFormData({
            //     ...formData,
            //     [name]: value,
            //   });
            swal(`${res.message}`)
            // swal(`${res.message.substring(0,1).toUpperCase()} "+" ${res.message.substring(1,25)}`);
            // text.substring(0,1).toUpperCase()
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
              <h1 className="float-left">Create Transporter</h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/softNumen/transporter/TransporterList")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>

          <CardBody>
            <Form className="m-1"
            //   ref={formRef}
             onSubmit={submitHandler}>
              <Row className="mb-2">
            <Col lg="6" md="6" sm="12">
                <Label>Select Product</Label>
            <Multiselect
                          required
                          showCheckbox="true"
                          isObject="false"
                          options={StateList} // Options to display in the dropdown
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={onSelect1} // Function will trigger on select event
                          onRemove={onRemove1} // Function will trigger on remove event
                          displayValue="state_title" // Property name to display in the dropdown options
                        />
            </Col>
                {CreatTransporterView &&
                  CreatTransporterView?.CreateTransporter?.input?.map((ele, i) => {
                  if (!!ele?.phoneinput) {
                        return (
                          <>
                            <Col key={i} lg="6" md="6" sm="12">
                              <FormGroup>
                                <Label>{ele?.label?._text}</Label>
                                <PhoneInput
                                  inputClass="myphoneinput"
                                  country={"in"}
                                  onKeyDown={(e) => {
                                    if (
                                      ele?.type?._attributes?.type == "number"
                                    ) {
                                      ["e", "E", "+", "-"].includes(e.key) &&
                                        e.preventDefault();
                                    }
                                  }}
                                  countryCodeEditable={false}
                                  name={ele?.name?._text}
                                  value={formData[ele?.name?._text]}
                                  onChange={(phone) => {
                                    setFormData({
                                      ...formData,
                                      [ele?.name?._text]: phone,
                                    });
                                  }}
                                />
                                {index === i ? (
                                  <>
                                    {error && (
                                      <span style={{ color: "red" }}>
                                        {error}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </FormGroup>
                            </Col>
                          </>
                        );
                      } else if (!!ele?.library) {
                        if (ele?.label._text?.includes("ountry")) {
                          return (
                            <Col key={i} lg="6" md="6" sm="12">
                              <FormGroup>
                                <Label>{ele?.label?._text}</Label>
                                <Select
                                  inputClass="countryclass"
                                  className="countryclassnw"
                                  options={Country.getAllCountries()}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  value={Countries}
                                  onChange={(country) => {
                                    setCountry(country);
                                    setFormData({
                                      ...formData,
                                      ["Country"]: country?.name,
                                    });
                                  }}
                                />
                                {index === i ? (
                                  <>
                                    {error && (
                                      <span style={{ color: "red" }}>
                                        {error}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </FormGroup>
                            </Col>
                          );
                        } else if (ele?.label._text?.includes("tate")) {
                          return (
                            <Col key={i} lg="6" md="6" sm="12">
                              <FormGroup>
                                <Label>{ele?.label?._text}</Label>
                                <Select
                                  options={State?.getStatesOfCountry(
                                    Countries?.isoCode
                                  )}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  value={States}
                                  onChange={(State) => {
                                    setState(State);
                                    setFormData({
                                      ...formData,
                                      ["State"]: State?.name,
                                    });
                                  }}
                                />
                                {index === i ? (
                                  <>
                                    {error && (
                                      <span style={{ color: "red" }}>
                                        {error}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </FormGroup>
                            </Col>
                          );
                        } else if (ele?.label._text?.includes("ity")) {
                          return (
                            <Col key={i} lg="6" md="6" sm="12">
                              <FormGroup>
                                <Label>{ele?.label?._text}</Label>
                                <Select
                                  options={City?.getCitiesOfState(
                                    States?.countryCode,
                                    States?.isoCode
                                  )}
                                  getOptionLabel={(options) => {
                                    return options["name"];
                                  }}
                                  getOptionValue={(options) => {
                                    return options["name"];
                                  }}
                                  value={Cities}
                                  onChange={(City) => {
                                    setCities(City);
                                    setFormData({
                                      ...formData,
                                      ["City"]: City?.name,
                                    });
                                  }}
                                />
                                {index === i ? (
                                  <>
                                    {error && (
                                      <span style={{ color: "red" }}>
                                        {error}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </FormGroup>
                            </Col>
                          );
                        } else {
                          return (
                            <Col key={i} lg="6" md="6" sm="12">
                              <FormGroup key={i}>
                                <Label>{ele?.label?._text}</Label>
  
                                <Input
                                  onKeyDown={(e) => {
                                    if (
                                      ele?.type?._attributes?.type == "number"
                                    ) {
                                      ["e", "E", "+", "-"].includes(e.key) &&
                                        e.preventDefault();
                                    }
                                  }}
                                  type={ele?.type?._attributes?.type}
                                  placeholder={ele?.placeholder?._text}
                                  name={ele?.name?._text}
                                  value={formData[ele?.name?._text]}
                                  onChange={(e) =>
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
                                      <span style={{ color: "red" }}>
                                        {error}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </FormGroup>
                            </Col>
                          );
                        }
                      } else {
                        return (
                          <>
                            <Col key={i} lg="6" md="6" sm="12">
                              <FormGroup key={i}>
                                <Label>{ele?.label?._text}</Label>
  
                                <Input
                                  onKeyDown={(e) => {
                                    if (
                                      ele?.type?._attributes?.type == "number"
                                    ) {
                                      ["e", "E", "+", "-"].includes(e.key) &&
                                        e.preventDefault();
                                    }
                                  }}
                                  type={ele?.type?._attributes?.type}
                                  placeholder={ele?.placeholder?._text}
                                  name={ele?.name?._text}
                                  value={formData[ele?.name?._text]}
                                  onChange={(e) =>
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
                                      <span style={{ color: "red" }}>
                                        {error}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </FormGroup>
                            </Col>
                          </>
                        );
                      }
                    // else {
                    //   return (
                    //     <>
                    //       <Col key={i} lg="4" md="4" sm="12">
                    //         <FormGroup>
                    //           <Label>{ele?.label?._text}</Label>

                    //           <Input
                    //             onKeyDown={e => {
                    //               if (
                    //                 ele?.type?._attributes?.type == "number"
                    //               ) {
                    //                 ["e", "E", "+", "-"].includes(e.key) &&
                    //                   e.preventDefault();
                    //               }
                    //             }}
                    //             type={ele?.type?._attributes?.type}
                    //             placeholder={ele?.placeholder?._text}
                    //             name={ele?.name?._text}
                    //             value={formData[ele?.name?._text]}
                    //             onChange={e =>
                    //               handleInputChange(
                    //                 e,
                    //                 ele?.type?._attributes?.type,
                    //                 i
                    //               )
                    //             }
                    //           />
                    //           {index === i ? (
                    //             <>
                    //               {error && (
                    //                 <span style={{ color: "red" }}>
                    //                   {error}
                    //                 </span>
                    //               )}
                    //             </>
                    //           ) : (
                    //             <></>
                    //           )}
                    //         </FormGroup>
                    //       </Col>

                    //     </>
                    //   );
                    // }
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
export default CreateTransporter;
