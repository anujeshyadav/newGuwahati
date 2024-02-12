import React, { useEffect, useState } from "react";
import xml2js from "xml2js";
import xmlJs from "xml-js";
import mycom from "./mycom";
import { CloudLightning } from "react-feather";
import XmlInputForm from "./XmlInputForm";

const XMLDisplay = () => {
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    let uri = mycom();
    // console.log(uri);
    const jsonData = xmlJs.xml2json(uri, { compact: true, spaces: 4 });
    setXmlData(JSON.parse(jsonData));
    // console.log("2nd", JSON.parse(jsonData));

    // let parser = new xml2js.Parser();
    // parser.parseString(`${uri}`, function (err, result) {
    //   console.log("1st method", result);
    // });
    // fetch(`${uri}`) // Replace with the URL or path to your XML data
    //   .then((response) => {
    //     response.text();
    //     console.log(response);
    //   })
    //   .then((xmlText) => {
    //     debugger;
    //     console.log(xmlText);
    //     const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
    //     console.log("2nd", jsonData);
    //     setXmlData(JSON.parse(jsonData));
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching XML data:", error);
    //   });
  }, []);

  return (
    <div>
      <XmlInputForm />
      {xmlData && xmlData ? (
        <>
          {xmlData?.catalog?.book?.map((ele) => {
            return (
              <>
                <div key={ele}>{ele?.title?._text}</div>
              </>
            );
          })}
          {/* <pre>{JSON.stringify(xmlData, null, 4)}</pre> */}
        </>
      ) : (
        <p>Loading XML data...</p>
      )}
    </div>
  );
};

export default XMLDisplay;
