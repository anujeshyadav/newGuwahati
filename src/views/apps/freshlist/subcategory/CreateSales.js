// import createSalesManager from "../../../../xmlfiles/CreateSalesMana";
import React, { useEffect, useState, useRef ,useContext } from "react";
import createSales from "./SalesReturn";
import xmlJs from "xml-js";
import {Label, Col,Input,FormGroup, Row } from "reactstrap";

 const mySale = ()=>{
    const [CreatUnitView, setCreatAccountView] = useState([]);


   useEffect(()=>{
    let response = createSales();
    const jsonData = xmlJs.xml2json(response, { compact: true, spaces: 2 });
  console.log(JSON.parse(jsonData).Createsalesmanager.input);
    setCreatAccountView(JSON.parse(jsonData)?.Createsalesmanager?.input);
   },[])
 return(
            <div>
               
<Row>
{CreatUnitView && CreatUnitView?.map((ele)=>{
    return(
        <Col  lg="6" md="6" sm="12">
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
            // }-
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
})}
</Row>
            </div>
        )
}
export default mySale
