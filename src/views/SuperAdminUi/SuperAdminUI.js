import React, { useEffect, useState } from "react";
import { Button, Col, CustomInput, Row } from "reactstrap";
import { Super_Admin_List } from "../../ApiEndPoint/Api";
import { _Get, _GetList } from "../../ApiEndPoint/ApiCalling";

const SuperAdminUI = ({ onDropdownChange, onSubmit }) => {
  const [SuperAdminList, setSuperAdminList] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [selectedSuperAdmin, setSelectedSuperAdmin] = useState("");
  const [selectedSuperAdminName, setSelectedSuperAdminName] = useState("");
    let List = localStorage.getItem("AllSuper");

    useEffect(() => {
      let Userinfo = JSON.parse(localStorage.getItem("userData"));
      setUserInfo(Userinfo);
      let List = JSON.parse(localStorage.getItem("AllSuper"));
      if (List?.length) {
        setSuperAdminList(List);
      } else {
        _GetList(Super_Admin_List)
          .then((res) => {
            // console.log(res?.SuperAdmin);
            localStorage.setItem("AllSuper", JSON.stringify(res?.SuperAdmin));
            setSuperAdminList(res?.SuperAdmin);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [List]);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Call the onSubmit function passed from the parent component
      onSubmit(e);
    };
    const handleDropdownChange = (e) => {
      const selectedName = e.target.options[e.target.selectedIndex]
        .getAttribute("data-name")
        ?.split(" ")[0];
      const selectedValue =
        e.target.options[e.target.selectedIndex].getAttribute("data-name");
      setSelectedSuperAdmin(e.target.value);
      setSelectedSuperAdminName(selectedName);
      onDropdownChange(selectedValue);
    };
    
    return (
      <div>
        <Row>
          {UserInfo?.rolename?.roleName === "MASTER" &&
            UserInfo?.rolename?.roleName === "MASTER" && (
              <>
                <Col>
                  <CustomInput
                    className="mb-1"
                    value={selectedSuperAdmin}
                    onChange={handleDropdownChange}
                    type="select">
                    <option>--select SuperAdmin--</option>
                    {SuperAdminList &&
                      SuperAdminList?.map((ele, i) => (
                        <option
                          data-name={`${ele?._id} ${ele?.database}`}
                          value={ele?._id}>
                          {ele?.firstName} {ele?.lastName}
                        </option>
                      ))}
                  </CustomInput>
                </Col>
                <Col lg="2" sm="2" md="2">
                  <Button
                    className="mb-1"
                    onClick={handleSubmit}
                    color="primary">
                    Submit
                  </Button>
                </Col>
              </>
            )}
        </Row>
      </div>
    );
};

export default SuperAdminUI;
