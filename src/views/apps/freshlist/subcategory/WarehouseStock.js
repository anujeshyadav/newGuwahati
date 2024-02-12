import React, { useEffect, useState, useRef ,useContext } from "react";
import WarehouseStockFile from "./WarehouseStockXml";
import xmlJs from "xml-js";
import {Label, Col,Input,FormGroup, Row, Card,CardBody,Form ,Button  } from "reactstrap";
import { Route } from "react-router-dom";
 const WareHouseStock = ()=>{
    const [CreatGoDownView, setCreteGoDownView] = useState([]);


   useEffect(()=>{
    let response = WarehouseStockFile();
    const jsonData = xmlJs.xml2json(response, { compact: true, spaces: 2 });
  console.log(JSON.parse(jsonData).WhStockXml.input);
  setCreteGoDownView(JSON.parse(jsonData)?.WhStockXml?.input);
   },[])
 return(<div>
     <Card>
     <Row className="m-2">
            <Col>
              <h1 className="float-left">WarehouseStock</h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/softNumen/Unit/UnitList")
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
            //  onSubmit={submitHandler}
             >
              <Row className="mb-2">
        
                {CreatGoDownView &&
                  CreatGoDownView?.map((ele, i) => {
                   return (
                    <Col  lg="4" md="4" sm="12">
                    <FormGroup >
                      <Label>{ele?.label?._text}</Label>

                      <Input
                     type={ele?.type?._attributes?.type}
                        placeholder={ele?.placeholder?._text}
                        name={ele?.name?._text}
                        // value={formData[ele?.name?._text]}
                        // onChange={(e) =>
                        //   handleInputChange(
                        //     e,
                        //     ele?.type?._attributes?.type,
                        //     i
                        //   )
                        // }
                      />
                      {/* {index === i ? (
                        <>
                          {error && (
                            <span style={{ color: "red" }}>
                              {error}
                            </span>
                          )}
                        </>
                      ) : (
                        <></>
                      )} */}
                    </FormGroup>
                  </Col>
                   )
   }
                )}
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
        )
}
export default WareHouseStock
