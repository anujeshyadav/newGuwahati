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
} from "reactstrap";
import "react-phone-input-2/lib/style.css";
import "../../../../../src/layouts/assets/scss/pages/users.scss";
import {
  GoodDispatchxmlView,
  EditGoodDispatch,
} from "../../../../ApiEndPoint/ApiCalling";
import "../../../../assets/scss/pages/users.scss";
import UserContext from "../../../../context/Context";

const GoodDispatchEdit = ({ EditOneData }) => {
  const [CreatAccountView, setCreatAccountView] = useState([]);
  const [formData, setFormData] = useState({});
  const [dropdownValue, setdropdownValue] = useState({});
  const [index, setindex] = useState("");
  const [error, setError] = useState("");
  const [permissions, setpermissions] = useState({});

  const Context = useContext(UserContext);

  const handleInputChange = (e, type, i) => {
    const { name, value, files } = e.target;

    if (type == "text") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (type == "file") {
      console.log(e.target.name);
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    // console.log(formData);
  }, [formData]);
  useEffect(() => {
    console.log(EditOneData?._id);
    setFormData(EditOneData);
  }, []);
  useEffect(() => {
    GoodDispatchxmlView()
      .then(res => {
        const jsonData = xmlJs.xml2json(res.data, { compact: true, spaces: 2 });
        console.log(JSON.parse(jsonData)?.GoodDispatch?.input);
        setCreatAccountView(JSON.parse(jsonData)?.GoodDispatch?.input);
        setdropdownValue(JSON.parse(jsonData)?.GoodDispatch);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const submitHandler = e => {
    e.preventDefault();
    console.log(formData);
    console.log(EditOneData?._id);
    const formdata = new FormData();
    CreatAccountView.map(el => {
      if (el?.name?._text == "CNUpload") {
        formdata.append(`${el?.name?._text}`, formData[el?.name?._text]);
      }
      if (el?.name?._text == "FetchSalesInvoice") {
        formdata.append(`${el?.name?._text}`, formData[el?.name?._text]);
      }
    });
    EditGoodDispatch(formdata, EditOneData?._id)
      .then(res => {
        // setFormData({});
        console.log(res);
        //   if (res.status) {
        // window.location.reload();
        swal("Good Dispatch Updated Successfully");
        //   }
      })
      .catch(err => {
        console.log(err);
      });
    // }
  };

  return (
    <div>
      <div>
        <Card>
          <Form className="mr-1 ml-1" onSubmit={submitHandler}>
            <Row>
              <Col lg="6" md="6" sm="12">
                <h2> Edit Dispatch</h2>
              </Col>
              <Col lg="6" md="6" sm="12">
                {" "}
              </Col>
            </Row>
            <Row className="mb-2">
              {CreatAccountView &&
                CreatAccountView?.map((ele, i) => {
                  if (ele?.type?._attributes?.type == "text") {
                    return (
                      <Col key={i} lg="3" md="3" sm="12">
                        <FormGroup key={i}>
                          <Label>{ele?.label?._text}</Label>
                          <Input
                            type={ele?.type?._attributes?.type}
                            placeholder={ele?.placeholder?._text}
                            name={ele?.name?._text}
                            value={formData[ele?.name?._text]}
                            onChange={e => {
                              handleInputChange(
                                e,
                                ele?.type?._attributes?.type,
                                i
                              );
                            }}
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
                  } else if (ele?.type?._attributes?.type == "file") {
                    console.log("file", ele?.name?._text);
                    return (
                      <Col key={i} lg="3" md="3" sm="12">
                        <FormGroup key={i}>
                          <Label className="">{ele?.label?._text}</Label>
                          <Input
                            type={ele?.type?._attributes?.type}
                            name={ele?.name?._text}
                            // value={formData[ele?.name?._text]}
                            onChange={e => {
                              handleInputChange(
                                e,
                                ele?.type?._attributes?.type,
                                i
                              );
                            }}
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
                  } else {
                    return (
                      <Col key={i} lg="3" md="3" sm="12">
                        <FormGroup key={i}>
                          <Label>{ele?.label?._text}</Label>
                          <Input
                            type={ele?.type?._attributes?.type}
                            placeholder={ele?.placeholder?._text}
                            name={ele?.name?._text}
                            value={formData[ele?.name?._text]}
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
                  }
                })}
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>
                    {dropdownValue?.MyDropdown?.dropdown?.label?._text}
                  </Label>
                  <CustomInput
                    required
                    type="select"
                    name={dropdownValue?.MyDropdown?.dropdown?.name?._text}
                    value={
                      formData[dropdownValue?.MyDropdown?.dropdown?.name?._text]
                    }
                    onChange={handleInputChange}
                  >
                    <option value="">--Assign Delivery Boy--</option>
                    {dropdownValue?.MyDropdown?.dropdown?.option.map(
                      (option, index) => (
                        <option key={index} value={option?._attributes?.value}>
                          {option?._attributes?.value}
                        </option>
                      )
                    )}
                  </CustomInput>
                </FormGroup>
              </Col>
            </Row>
            <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
              <Label className="mb-0">Status</Label>
              <div
                className="form-label-group"
                onChange={e => {
                  setFormData({
                    ...formData,
                    ["status"]: e.target.value,
                  });
                }}
              >
                <input
                  checked={formData["status"] == "Active"}
                  style={{ marginRight: "3px" }}
                  type="radio"
                  name="status"
                  value="Active"
                />
                <span style={{ marginRight: "20px" }}>Active</span>

                <input
                  // checked={status == "Inactive"}
                  checked={formData["status"] == "Deactive"}
                  style={{ marginRight: "3px" }}
                  type="radio"
                  name="status"
                  value="Deactive"
                />
                <span style={{ marginRight: "3px" }}>Deactive</span>
              </div>
            </Col>
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
        </Card>
      </div>
    </div>
  );
};
export default GoodDispatchEdit;
