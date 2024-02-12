// import React, { useEffect, useState } from "react";
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   Col,
//   CustomInput,
//   Input,
//   Label,
//   Row,
//   Spinner,
//   Table,
// } from "reactstrap";
// import { Route } from "react-router-dom";
// import { _Get, _PostSave, _Put } from "../../../../ApiEndPoint/ApiCalling";
// import {
//   All_Users_List,
//   Deptartment_with_Role,
//   User_Assign_User,
//   ViewDepartmentWise_Assign_Role,
// } from "../../../../ApiEndPoint/Api";
// import swal from "sweetalert";
// let SelectedChild = [];
// let SetAllHeadOfdepartment = [];
// const EditTeamRolePosition = () => {
//   const [DepartmentWithRole, setDepartmentWithRole] = useState([]);
//   const [SelectedDepartment, setSelectedDepartment] = useState([]);
//   const [ShowParentList, setShowParentList] = useState([]);
//   const [ALLheadsofDept, setALLheadsofDept] = useState([]);
//   const [ShowChildList, setShowChildList] = useState([]);
//   const [Show, setShow] = useState(false);
//   const [Child, setChild] = useState(false);
//   const [SelectedParentForHeirarchy, setSelectedParentForHeirarchy] = useState(
//     {}
//   );
//   const [SelectedChildForHeirarchy, setSelectedChildForHeirarchy] = useState(
//     []
//   );
//   const [NoChild, setNoChild] = useState(false);
//   const [Loader, setLoader] = useState(false);
//   const [Party, setParty] = useState(false);
//   const [HeadOfDepartment, setHeadOfDepartment] = useState(false);
//   const [Parent, setParent] = useState("");
//   const [ParentName, setParentName] = useState("");
//   const [SelectedRoleId, setSelectedRoleId] = useState("");
//   const [ChildList, setChildList] = useState([]);
//   const [AllUsersList, setAllUsersList] = useState([]);

//   const UserList = () => {
//     let userData = JSON.parse(localStorage.getItem("userData"));

//     _Get(All_Users_List, userData?.database)
//       .then((res) => {
//         // console.log(res?.User);
//         let WithoutCreatedBy = res?.User?.filter((ele, i) => !ele?.created_by);
//         setAllUsersList(res?.User);
//         // if (WithoutCreatedBy?.length) {
//         //   setAllUsersList(WithoutCreatedBy);
//         // }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   useEffect(() => {
//     let userData = JSON.parse(localStorage.getItem("userData"));
//     // ViewDepartmentWise_Assign_Role
//     // _Get(ViewDepartmentWise_Assign_Role, userData?.database)
//     //   .then((res) => {
//     //     console.log(res);
//     //     setDepartmentWithRole(res?.Department);
//     //     debugger;
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//     UserList();
//     _Get(Deptartment_with_Role, userData?.database)
//       .then((res) => {
//         setDepartmentWithRole(res?.Department);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleSaveParent = (parent) => {
//     setSelectedParentForHeirarchy(parent);
//   };
//   const handleSaveChild = (child, e) => {
//     if (e.target.checked) {
//       SelectedChild.push(child);

//       setSelectedChildForHeirarchy(child);
//     } else {
//       let index = SelectedChild?.indexOf(child);
//       setSelectedChildForHeirarchy(SelectedChild.splice(index, 1));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setLoader(true);
//     let ParentID = SelectedParentForHeirarchy?._id;
//     let child = SelectedChild?.map((ele, i) => {
//       return {
//         id: ele?._id,
//       };
//     });
//     let payload = {
//       parentId: ParentID,
//       childs: child,
//     };

//     await _PostSave(User_Assign_User, payload)
//       .then((res) => {
//         setLoader(false);
//         // console.log(res);

//         UserList();
//         setSelectedDepartment([]);
//         setShowParentList([]);
//         setParent("");
//         setShowChildList([]);
//         setChild(false);
//         setChildList([]);
//         SelectedChild = [];
//         swal("Assigned Successfully");
//       })
//       .catch((err) => {
//         setLoader(false);
//         swal("Something Went Wrong");
//         console.log(err);
//       });
//   };
//   console.log(ShowChildList);
//   return (
//     <div>
//       <Card>
//         <CardBody>
//           <div className=" m-2">
//             <Row className="">
//               <Col>
//                 <h1>Edit Team Members of Parents</h1>
//               </Col>
//               <Col lg="2" md="2">
//                 <div className="float-right">
//                   <Route
//                     render={({ history }) => (
//                       <Button
//                         style={{ cursor: "pointer" }}
//                         className="float-right mr-1"
//                         color="primary"
//                         onClick={() => history.goBack()}>
//                         {" "}
//                         Back
//                       </Button>
//                     )}
//                   />
//                 </div>
//               </Col>
//             </Row>
//           </div>
//           <div className=" m-2">
//             <Row className="">
//               <Col lg="3" md="3">
//                 <Label>Select Department</Label>
//                 <CustomInput
//                   value={SelectedDepartment}
//                   onChange={(e) => {
//                     e.target.value ? setShow(true) : setShow(false);
//                     if (e.target.value == "All_Dept_Heads") {
//                       SetAllHeadOfdepartment = [];
//                       setShow(false);
//                       DepartmentWithRole?.map((ele, i) => {
//                         ele?.roles?.forEach((val, index) => {
//                           if (val?.rolePosition == 1) {
//                             SetAllHeadOfdepartment?.push(val);
//                           }
//                         });
//                       });
//                       setALLheadsofDept(SetAllHeadOfdepartment);
//                       let allHeadUsers = [];
//                       SetAllHeadOfdepartment?.map((ele, i) => {
//                         AllUsersList?.forEach((val, i) => {
//                           if (val?.rolename?._id == ele?.roleId?._id) {
//                             allHeadUsers.push(val);
//                           }
//                         });
//                       });
//                       setSelectedDepartment(e.target.value);
//                       setShowChildList(allHeadUsers);
//                       if (allHeadUsers?.length) {
//                         setChild(true);
//                       }
//                       let userData = JSON.parse(
//                         localStorage.getItem("userData")
//                       );

//                       let arr = [userData];
//                       setShowParentList(arr);
//                       // setChildList(SelectedChild);
//                     } else {
//                       let selectedDepartment = DepartmentWithRole?.filter(
//                         (ele, i) => ele?._id == e.target.value
//                       );
//                       setSelectedDepartment(selectedDepartment[0]?.roles);
//                     }
//                   }}
//                   type="select">
//                   <option value="">--Select Department--</option>
//                   <option value="All_Dept_Heads">All Department Head</option>
//                   {DepartmentWithRole &&
//                     DepartmentWithRole?.map((ele, i) => (
//                       <option
//                         data-name={`${ele?._id} ${ele?.database}`}
//                         value={ele?._id}>
//                         {ele?.departmentName?.departmentName}
//                       </option>
//                     ))}
//                 </CustomInput>
//               </Col>
//               {Show && Show && (
//                 <Col lg="3" md="3">
//                   <Label>Select Parent Role</Label>
//                   <CustomInput
//                     value={Parent}
//                     onChange={(e) => {
//                       const selected = e.target.options[e.target.selectedIndex]
//                         .getAttribute("data-name")
//                         ?.split(" ");
//                       if (selected[0] === 1) {
//                         // pass created by
//                         setHeadOfDepartment(true);
//                       }
//                       const name = selected.slice(2).join(" ");
//                       let child = [];
//                       if (name == "Sales Person") {
//                         child = AllUsersList?.filter(
//                           (ele) => ele?.rolename?.roleName == "Customer"
//                         );
//                       } else {
//                         child = SelectedDepartment?.filter(
//                           (ele) => ele?.rolePosition == Number(selected[0]) + 1
//                         );
//                       }

//                       let ParentList = AllUsersList?.filter(
//                         (ele) => ele?.rolename?._id == selected[1]
//                       );

//                       setShowParentList(ParentList);
//                       setParent(e.target.value);
//                       setParentName(name);
//                       setSelectedRoleId(selected[1]);

//                       if (child?.length) {
//                         let ChildList = [];
//                         if (name == "Sales Person") {
//                           setShowChildList(child);
//                           setParty(true);
//                           // setShowChildList(ChildList);
//                           setChild(true);
//                           setChildList(child);
//                         } else {
//                           ChildList = AllUsersList?.filter(
//                             (ele) => ele?.rolename?._id == child[0]?.roleId?._id
//                           );
//                           setShowChildList(ChildList);
//                           setChild(true);
//                           setParty(false);

//                           setChildList(child);
//                         }
//                       } else {
//                         setChildList([]);
//                         setShowChildList([]);
//                         setNoChild(true);
//                         setChild(false);
//                       }
//                     }}
//                     type="select">
//                     <option value="">--Select Role--</option>
//                     {SelectedDepartment &&
//                       SelectedDepartment?.map((ele, i) => (
//                         <option
//                           data-name={`${ele?.rolePosition} ${ele?.roleId?._id} ${ele?.roleName}`}
//                           value={ele?._id}>
//                           {ele?.roleName} (Position-
//                           {ele?.rolePosition})
//                         </option>
//                       ))}
//                   </CustomInput>
//                 </Col>
//               )}
//               {Child && Child ? (
//                 <>
//                   <Col lg="3" md="3">
//                     <Label>Next Child</Label>
//                     <Input
//                       readOnly
//                       type="text"
//                       value={ChildList[0]?.roleName && ChildList[0]?.roleName}
//                     />
//                   </Col>
//                   {SelectedChild && SelectedChild?.length > 0 && (
//                     <Col lg="3" md="3">
//                       <Button
//                         color="primary"
//                         onClick={(e) => handleSubmit(e)}
//                         className="mt-2">
//                         Submit
//                       </Button>
//                     </Col>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {NoChild && NoChild && (
//                     <Col lg="3" md="3">
//                       <Label style={{ color: "red" }}>
//                         No Next Child Found
//                       </Label>
//                       <Input readOnly type="text" value="No Child Found" />
//                     </Col>
//                   )}
//                 </>
//               )}
//             </Row>
//           </div>
//           <hr />
//           <div className="p-2">
//             <Row>
//               {ShowParentList && ShowParentList?.length > 0 && (
//                 <Col lg="6" md="6" sm="6">
//                   <div className="d-flex justify-content-center">
//                     <h2>
//                       <strong>
//                         {ParentName && ParentName ? (
//                           <> {ParentName} (Parent)</>
//                         ) : (
//                           "Head"
//                         )}{" "}
//                         Users List
//                       </strong>
//                     </h2>
//                   </div>
//                   <div
//                     className="p-1"
//                     style={{
//                       borderRight: "1px solid black",
//                     }}>
//                     <Table
//                       className="table_heading"
//                       style={{ cursor: "pointer" }}
//                       responsive>
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Assigned To</th>
//                           <th>First Name</th>
//                           <th>Last Name</th>
//                           <th>Mobile Number</th>
//                           <th>email</th>
//                           <th>State</th>
//                           <th>City</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ShowParentList && ShowParentList?.length ? (
//                           <>
//                             {ShowParentList &&
//                               ShowParentList?.map((ele, i) => {
//                                 return (
//                                   <tr key={ele?._id}>
//                                     <th scope="row">
//                                       {/* {i + 1}{" "} */}
//                                       <Input
//                                         name="Parent"
//                                         value="checkbox1"
//                                         type="radio"
//                                         onClick={(e) => handleSaveParent(ele)}
//                                       />
//                                     </th>
//                                     <td>
//                                       {ele?.created_by?.firstName &&
//                                         ele?.created_by?.firstName && (
//                                           <Badge color="primary">
//                                             <strong>
//                                               {ele?.created_by?.firstName &&
//                                                 ele?.created_by?.firstName}
//                                             </strong>
//                                           </Badge>
//                                         )}
//                                     </td>
//                                     <td>{ele?.firstName}</td>
//                                     <td>{ele?.lastName}</td>
//                                     <td>{ele?.mobileNumber}</td>
//                                     <td>{ele?.email}</td>
//                                     <td>{ele?.State}</td>
//                                     <td>{ele?.City}</td>
//                                   </tr>
//                                 );
//                               })}
//                           </>
//                         ) : null}
//                       </tbody>
//                     </Table>
//                   </div>
//                 </Col>
//               )}

//               {ShowChildList && ShowChildList?.length > 0 && (
//                 <Col lg="6" md="6" sm="6">
//                   <div className="d-flex justify-content-center">
//                     <h2>
//                       <strong>
//                         {ChildList[0]?.roleName && ChildList[0]?.roleName ? (
//                           <>
//                             {" "}
//                             {ChildList[0]?.roleName && ChildList[0]?.roleName}
//                             (child)
//                           </>
//                         ) : (
//                           <>{Party && Party ? "Party" : "All Dept Head"}</>
//                         )}{" "}
//                         Users List
//                       </strong>
//                     </h2>
//                   </div>
//                   <div className="p-1">
//                     <Table
//                       className="table_heading"
//                       style={{
//                         cursor: "pointer",
//                       }}
//                       responsive>
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Assigned To</th>
//                           <th>First Name</th>

//                           <th>Last Name</th>
//                           <th>Mobile Number</th>
//                           <th>email</th>
//                           <th>State</th>
//                           <th>City</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {ShowChildList &&
//                           ShowChildList?.map((ele, i) => {
//                             {
//                               /* console.log(ele); */
//                             }
//                             return (
//                               <tr key={ele?._id}>
//                                 <th scope="row">
//                                   {" "}
//                                   {ele?.created_by?.firstName &&
//                                   ele?.created_by?.firstName ? null : (
//                                     <>
//                                       <Input
//                                         value="checkbox1"
//                                         type="checkbox"
//                                         onClick={(e) => handleSaveChild(ele, e)}
//                                       />
//                                     </>
//                                   )}
//                                 </th>
//                                 <td>
//                                   <Badge color="primary">
//                                     <strong>
//                                       {ele?.created_by?.firstName &&
//                                         ele?.created_by?.firstName}
//                                     </strong>
//                                   </Badge>
//                                 </td>
//                                 <td>{ele?.firstName}</td>
//                                 <td>{ele?.lastName}</td>
//                                 <td>{ele?.mobileNumber}</td>
//                                 <td>{ele?.email}</td>
//                                 <td>{ele?.State}</td>
//                                 <td>{ele?.City}</td>
//                               </tr>
//                             );
//                           })}
//                       </tbody>
//                     </Table>
//                   </div>
//                 </Col>
//               )}
//             </Row>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default EditTeamRolePosition;
import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row, Spinner } from "reactstrap";
import {
  Get_RoleList,
  _Get,
  _GetList,
  _PostSave,
  _Put,
} from "../../../../ApiEndPoint/ApiCalling";
import { Route } from "react-router-dom";

import {
  List_Department,
  Save_Assigned_Role,
  Update_AssignRole_InDepartment,
  ViewDepartmentWise_Assign_Role,
} from "../../../../ApiEndPoint/Api";
import swal from "sweetalert";

const DepartmentRoleAssign = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [SelectedRolesList, setSelectedRolesList] = useState([]);
  const [DepartMentList, setDepartMentList] = useState([]);
  const [RoleList, setRoleList] = useState([]);
  const [ChangedDepartment, setChangedDepartment] = useState({});
  const [Loader, setLoader] = useState(false);
  const [Index, setIndex] = useState(null);

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    let selectedDepartment = DepartMentList?.filter(
      (ele) => ele?._id == department
    );
    // debugger;
    setSelectedRolesList(selectedDepartment[0]);
    setSelectedDepartment(department);
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    _Get(ViewDepartmentWise_Assign_Role, userData?.database)
      .then((res) => {
        // debugger;
        if (res?.Department?.length) {
          setDepartMentList(res?.Department);
        }

        // setDepartmentWithRole(res?.Department);
      })
      .catch((err) => {
        console.log(err);
      });
    // let URL = `${List_Department}/${userData?.database}`;
    // _GetList(URL)
    //   .then((res) => {
    //     let Departments = res?.Department?.filter(
    //       (ele) => ele?.status == "Active"
    //     );

    //     // setDepartMentList(Departments);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    RoleLists();
  }, []);

  const RoleLists = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    Get_RoleList(userData?._id, userData?.database)
      .then((res) => {
        let WithoutAssign = res?.Role?.filter(
          (ele) =>
            ele?.assign == 0 &&
            ele?.roleName != "SuperAdmin" &&
            ele?.roleName != "Admin"
        );
        let Position = userData?.rolename?.position;
        let ShowList = res?.Role?.filter((ele, i) => ele?.position > Position);

        setRoleList(WithoutAssign);
        // setRoleList(res?.Role);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRoleChange = (role, i) => {
    setIndex(i);
    const roles = [...selectedRoles];

    if (roles?.includes(role)) {
      // Remove role if it's already selected
      roles?.splice(roles.indexOf(role), 1);
    } else {
      // Add role if it's not selected
      roles.push(role);
    }

    setSelectedRoles(roles);
  };

  const handleAssignRoles = async () => {
    // Implement your logic to assign roles to the selected department
    let userinfo = JSON.parse(localStorage.getItem("userData"));
    setLoader(true);
    let currentDepartmentWithRole = ChangedDepartment?.roles?.map((val) => {
      return {
        database: val?.database,
        roleName: val?.roleName,
        roleId: val?.roleId?._id,
        rolePosition: val?.rolePosition,
      };
    });
    // let allRoles = [];
    // DepartMentList?.forEach((ele, i) => {
    //   let a = ele?.roles?.map((val) => {
    //     return {
    //       database: val?.database,
    //       roleName: val?.roleName,
    //       roleId: val?.roleId?._id,
    //       rolePosition: val?.rolePosition,
    //     };
    //   });
    //   allRoles.push(a);
    // });
    // let allroleswithPosition = allRoles?.flat();
    // console.log(allroleswithPosition);
    let payload = {
      roles: currentDepartmentWithRole,
    };

    await _Put(Update_AssignRole_InDepartment, ChangedDepartment?._id, payload)
      .then((res) => {
        console.log(res);
        setSelectedRoles([]);
        setLoader(false);

        swal("Roles Changed Successfully");
        RoleLists();
      })
      .catch((err) => {
        setLoader(false);

        console.log(err);
        swal("Something went wrong");
      });
    // You can send this data to your server or manage it in your state
  };
  if (Loader) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20rem",
        }}>
        <Spinner
          style={{
            height: "4rem",
            width: "4rem",
          }}
          color="primary">
          Loading...
        </Spinner>
      </div>
    );
  }
  const handleAddRanking = (e, data, i, id) => {
    let AllSelected = [...SelectedRolesList?.roles];
    let AllDeptList = [...DepartMentList];
    // let selectedrole = AllSelected?.filter((ele) => ele?._id == id);
    let index = DepartMentList?.indexOf(SelectedRolesList);
    AllSelected[i]["rolePosition"] = Number(e.target.value);
    AllDeptList[index]["roles"] = AllSelected;
    setDepartMentList(AllDeptList);
    setChangedDepartment(AllDeptList[index]);
    // debugger;
  };
  return (
    <>
      <div className="card p-3">
        <Row>
          <Col></Col>

          {/* )} */}

          <Col lg="2">
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
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <h3 className="mb-3 mt-2">
            <strong>Assigned Department and Roles</strong>
          </h3>
        </div>
        <Row>
          <Col lg="4" sm="6" md="4">
            <Label>Select Department:</Label>
            <select
              id="departments"
              className="form-control"
              onChange={(e) => handleDepartmentChange(e)}
              value={selectedDepartment}>
              <option value="">--Select Department--</option>
              {DepartMentList &&
                DepartMentList?.map((department, i) => (
                  <option key={department?._id} value={department?._id}>
                    {department?.departmentName?.departmentName}
                  </option>
                ))}
            </select>
          </Col>
        </Row>
        <br />

        <div className="d-flex justify-content-center">
          <h3 className="mb-3">
            {SelectedRolesList && SelectedRolesList?.roles ? (
              <>
                <strong>
                  Selected Roles and Position(Position should no be the Same)
                </strong>
              </>
            ) : (
              <>
                <strong>No Roles Assigned</strong>
              </>
            )}
          </h3>
        </div>
        <Row>
          {SelectedRolesList &&
            SelectedRolesList?.roles?.map((role, i) => (
              <Col lg="6" sm="12" md="6">
                <div
                  key={role?._id}
                  className="form-label-group d-flex justify-content-space-between">
                  {/* <input
                    className="mt-1"
                    required
                    type="checkbox"
                    style={{
                      marginRight: "3px",
                      height: "22px",
                      width: "22px",
                    }}
                    id={role}
                    value={role}
                    //   checked={selectedRoles?.includes(role?._id)}
                    onChange={() => handleRoleChange(role, i)}
                  /> */}
                  <span
                    className="mb-1 ml-1"
                    style={{ marginRight: "20px", fontSize: "25px" }}>
                    {role?.roleName?.length > 12 ? (
                      <>{role?.roleName}</>
                    ) : (
                      <>{role?.roleName}</>
                    )}
                  </span>
                  {role?.rolePosition == "1" ? (
                    <>
                      <span
                        className="input"
                        style={{
                          position: "absolute",
                          right: 20,
                          width: "100px",
                        }}>
                        <Input
                          value={role?.rolePosition}
                          readOnly
                          onChange={(e) =>
                            handleAddRanking(e, role, i, role?._id)
                          }
                          placeholder="Ex. 1 or 2 or 3"
                          type="number"
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="input"
                        style={{
                          position: "absolute",
                          right: 20,
                          width: "100px",
                        }}>
                        <Input
                          value={role?.rolePosition}
                          onChange={(e) =>
                            handleAddRanking(e, role, i, role?._id)
                          }
                          placeholder="Ex. 1 or 2 or 3"
                          type="number"
                        />
                      </span>
                    </>
                  )}
                </div>
              </Col>
            ))}
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <Button
            color="primary"
            onClick={handleAssignRoles}
            // disabled={!selectedDepartment || selectedRoles.length === 0}
          >
            Change Roles
          </Button>
        </div>
      </div>
    </>
  );
};

export default DepartmentRoleAssign;
