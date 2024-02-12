// import React, { useState } from 'react';
// import { Card, CardBody, Row,Col, Form, FormGroup, Label, Input, Button, CardHeader } from 'reactstrap';

// const EmployeeSalaryForm = () => {
//   const [formData, setFormData] = useState({
//     payslipType: '',
//     salary: '',
//     fromAccount: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Add logic to handle form submission (e.g., save data to backend)
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <Card>
//       <CardBody>
//         <h2>create employee Form</h2>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup row>
//             <Label for="payslipType" sm={4}>
//               Payslip Type:
//             </Label>
//             <Col sm={8}>
//               <Input
//                 type="text"
//                 name="payslipType"
//                 id="payslipType"
//                 value={formData.payslipType}
//                 onChange={handleInputChange}
//                 placeholder="Enter payslip type"
//               />
//             </Col>
//           </FormGroup>
//           <FormGroup row>
//             <Label for="salary" sm={4}>
//               Salary:
//             </Label>
//             <Col sm={8}>
//               <Input
//                 type="text"
//                 name="salary"
//                 id="salary"
//                 value={formData.salary}
//                 onChange={handleInputChange}
//                 placeholder="Enter salary"
//               />
//             </Col>
//           </FormGroup>
//           <FormGroup row>
//             <Label for="fromAccount" sm={4}>
//               From Account:
//             </Label>
//             <Col sm={8}>
//               <Input
//                 type="text"
//                 name="fromAccount"
//                 id="fromAccount"
//                 value={formData.fromAccount}
//                 onChange={handleInputChange}
//                 placeholder="Enter from account"
//               />
//             </Col>
//           </FormGroup>
//           <FormGroup row>
//             <Col sm={{ size: 8, offset: 4 }}>
//               <Button color="primary" type="submit">
//                 Save
//               </Button>{' '}
//               <Button color="secondary" type="button">
//                 Cancel
//               </Button>
//             </Col>
//           </FormGroup>
//         </Form>
//       </CardBody>
//     </Card>
//   );
// };

// const Advance = () => {
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic here
//       console.log('Title:', title);
//       console.log('Amount:', amount);
//   };

//   return (
//      <Card>
//       <CardHeader>

//               <h1>Advance form</h1>
//               <Form onSubmit={handleSubmit}>
//                   <FormGroup>
//                       <Col>
//                           <Label for="titleDropdown">Title</Label>
//                           <Input
//                               type="select"
//                               name="title"
//                               id="titleDropdown"
//                               value={title}
//                               onChange={(e) => setTitle(e.target.value)}
//                           >
//                               <option value="">Select</option>
//                               <option value="Option 1">Option 1</option>
//                               <option value="Option 2">Option 2</option>
//                               {/* Add more options as needed */}
//                           </Input>
//                       </Col>
//                   </FormGroup>

//                   <FormGroup>
//                       <Label for="amountInput" >Amount</Label>
//                       <Input
//                           type="number"
//                           name="amount"
//                           placeholder='Enter Ammount'
//                           id="amountInput"
//                           value={amount}
//                           onChange={(e) => setAmount(e.target.value)}
//                       />
//                   </FormGroup>

//                   <Button color="primary" type="submit">
//                       Submit
//                   </Button>
//               </Form>
//               </CardHeader>
//               </Card>
//   );
// };

// const Daform = () => {
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic here
//       console.log('Title:', title);
//       console.log('Amount:', amount);
//   };

//   return (
//       <Card>
//         <CardHeader>
//               <h1>DA form</h1>
//               <Form onSubmit={handleSubmit}>
//                   <FormGroup>
//                       <Label for="titleDropdown">Title</Label>
//                       <Input
//                           type="select"
//                           name="title"
//                           id="titleDropdown"
//                           value={title}
//                           onChange={(e) => setTitle(e.target.value)}
//                       >
//                           <option value="">Select</option>
//                           <option value="Option 1">Option 1</option>
//                           <option value="Option 2">Option 2</option>
//                           {/* Add more options as needed */}
//                       </Input>
//                   </FormGroup>

//                   <FormGroup>
//                       <Label for="amountInput">Amount</Label>
//                       <Input
//                           type="number"
//                           name="amount"
//                           id="amountInput"
//                           value={amount}
//                           placeholder='enter ammount'
//                           onChange={(e) => setAmount(e.target.value)}
//                       />
//                   </FormGroup>

//                   <Button color="primary" type="submit">
//                       Submit
//                   </Button>
//               </Form>
//               </CardHeader>
//         </Card>  
//   );
// };

// const Esiform = () => {
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic here
//       console.log('Title:', title);
//       console.log('Amount:', amount);
//   };

//   return (
//       <Card>
//           <CardHeader>
//               <h1>ESI form</h1>
//               <Form onSubmit={handleSubmit}>
//                   <FormGroup>
//                       <Label for="titleDropdown">Title</Label>
//                       <Input
//                           type="select"
//                           name="title"
//                           id="titleDropdown"
//                           value={title}
//                           onChange={(e) => setTitle(e.target.value)}
//                       >
//                           <option value="">Select</option>
//                           <option value="Option 1">Option 1</option>
//                           <option value="Option 2">Option 2</option>
//                           {/* Add more options as needed */}
//                       </Input>
//                   </FormGroup>

//                   <FormGroup>
//                       <Label for="amountInput">Amount</Label>
//                       <Input
//                           type="number"
//                           name="amount"
//                           id="amountInput"
//                           value={amount}
//                           placeholder='enter ammount'
//                           onChange={(e) => setAmount(e.target.value)}
//                       />
//                   </FormGroup>

//                   <Button color="primary" type="submit">
//                       Submit
//                   </Button>
//               </Form>
//           </CardHeader>
//       </Card>
//   );
// };


// const PayslipForm = () =>{
//  return(
// <div>
//   <Row>
//     <Col>
//   <EmployeeSalaryForm/>
//   </Col>
//   <Col>
//   <Advance/>
//   </Col>
//   </Row>
//   <Row>
//     <Col>
//   <Daform/>
//   </Col>
//   <Col>
//   <Esiform/>
//   </Col>
//   </Row>
//   <Row>
//         <Col sm="12" md="6">
//           <Payslip />
//         </Col>
//         <Col sm="12" md="6">
//           <Over />
//         </Col>
//       </Row>
// </div>
//  );
// };
// export default PayslipForm;




























import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from 'reactstrap';
import { FaPlus, FaMinus, FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeSalaryForm = () => {
  const [formData, setFormData] = useState({
    payslipType: '',
    salary: '',
    fromAccount: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleAccountDropdown = () => setAccountDropdownOpen(!accountDropdownOpen);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleEmployeeSalarySubmit = (e) => {
    e.preventDefault();


    if (!formData.payslipType || !formData.salary || !formData.fromAccount) {
      alert('Please fill in all fields before saving.');
      return;
    }

    console.log('Employee Salary Form submitted:', formData);
    toggleModal();

  };

  const handleDropdownSelect = (selectedOption) => {
    setFormData({ ...formData, payslipType: selectedOption });
    toggleDropdown();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountDropdownSelect = (selectedOption) => {
    setFormData({ ...formData, fromAccount: selectedOption });
    toggleAccountDropdown();
  };
  const handleRemoveAllFields = () => {
    setFormData({
      payslipType: '',
      salary: '',
      fromAccount: '',
    });
    // toggleModal();
  };

  return (
    <Card>
      <CardHeader>
        <h2>Employee Salary Form</h2>
        <FaPlus
          style={{
            marginLeft: '45%',
            cursor: 'pointer',
            color: 'white',
            fontSize: '29px',
            border: '1px solid green',
            borderRadius: '15px',
            padding: '5px',
            backgroundColor: 'green',
          }}
          onClick={toggleModal}
        />
        <FaMinus
          style={{
            marginLeft: '25px', // Adjusted marginLeft for closer positioning
            cursor: 'pointer',
            color: 'red',
            fontSize: '29px',
            border: '1px solid red',
            borderRadius: '15px',
            padding: '5px',
            backgroundColor: 'white',
          }}
          onClick={handleRemoveAllFields}
        />

      </CardHeader>
      <CardBody>
        <Form onSubmit={handleEmployeeSalarySubmit}>
          <FormGroup row>
            <Label for="payslipType" sm={4}>
              Payslip Type:
            </Label>
            <div>{formData.payslipType}</div>
          </FormGroup>
          <FormGroup row>
            <Label for="salary" sm={4}>
              Salary:
            </Label>
            <div>{formData.salary}</div>
          </FormGroup>
          <FormGroup row>
            <Label for="fromAccount" sm={4}>
              From Account:
            </Label>
            <div>{formData.fromAccount}</div>
          </FormGroup>

        </Form>


        <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
          <ModalHeader toggle={toggleModal}>Add Employee Salary</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleEmployeeSalarySubmit}>
              <FormGroup>
                <Label for="payslipType">Payslip Type:</Label>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    {formData.payslipType ? formData.payslipType : 'Select Payslip Type'}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleDropdownSelect('Monthly Payslip')}>Monthly Payslip</DropdownItem>
                    <DropdownItem onClick={() => handleDropdownSelect('Hourly Payslip')}>Hourly Payslip</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Label for="salary">Salary:</Label>
                <Input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  style={{ width: '80%' }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="fromAccount">From Account:</Label>
                <Dropdown isOpen={accountDropdownOpen} toggle={toggleAccountDropdown}>
                  <DropdownToggle caret>
                    {formData.fromAccount ? formData.fromAccount : 'Select From Account'}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => handleAccountDropdownSelect('Account 1')}>Account 1</DropdownItem>
                    <DropdownItem onClick={() => handleAccountDropdownSelect('Account 2')}>Account 2</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{' '}
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
};

const TaForm = () => {
  const [taFormData, setTaFormData] = useState({
    title: '',
    amount: '',
  });

  const handleTaFormSubmit = (e) => {
    e.preventDefault();
    console.log('TA Form submitted:', taFormData);
    // Additional logic for TA form submission
  };

  const handleTaInputChange = (e) => {
    const { name, value } = e.target;
    setTaFormData({ ...taFormData, [name]: value });
  };

  return (
    <Card >
      <CardBody>

        <Form onSubmit={handleTaFormSubmit}>
          <h1>TA Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={taFormData.title}
              onChange={handleTaInputChange}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={taFormData.amount}
              placeholder='Enter Amount'
              onChange={handleTaInputChange}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

      </CardBody>
    </Card>
  );
};

const TravellingForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card >
      <CardBody>

        <Form onSubmit={handleSubmit}>
          <h1>Travelling Form</h1>

          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='Enter amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

      </CardBody>
    </Card>
  );
};
const Daform = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card >
      <CardBody>

        <Form onSubmit={handleSubmit}>
          <h1>DA Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='enter ammount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

      </CardBody>
    </Card>
  );
};
const Pfform = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card >
      <CardBody>

        <Form onSubmit={handleSubmit}>
          <h1>Pf Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='Enter Amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
const Advance = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card >
      <CardBody>

        <Form onSubmit={handleSubmit}>
          <h1>Advance Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='enter amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

      </CardBody>
    </Card>
  );
};
const Esiform = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card >
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <h1>ESI Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='enter ammount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
const Insurance = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <h1>Insurance Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='enter ammount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

      </CardBody>
    </Card>
  );
};


const Payslip = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Title:', title);
    console.log('Amount:', amount);
  };

  return (
    <Card >
      <CardBody>

        <Form onSubmit={handleSubmit}>
          <h1>Pay Slip Form</h1>
          <FormGroup>
            <Label for="titleDropdown">Title</Label>
            <Input
              type="select"
              name="title"
              id="titleDropdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>

            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="amountInput">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amountInput"
              value={amount}
              placeholder='Enter Amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

      </CardBody>
    </Card>
  );
};


const Over = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    overtime: '',
    title: '',
    numberOfDays: '',
    hours: '',
    rate: '',
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setSelectedItem(null);
    setFormData({
      employeeName: '',
      overtime: '',
      title: '',
      numberOfDays: '',
      hours: '',
      rate: '',
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedItem !== null) {

      const updatedTableData = [...tableData];
      updatedTableData[selectedItem] = formData;
      setTableData(updatedTableData);
      setSelectedItem(null);
    } else {

      setTableData([...tableData, formData]);
    }

    toggleModal();
  };

  const handleEdit = (index) => {

    setSelectedItem(index);
    setFormData(tableData[index]);
    toggleModal();
  };

  const handleDelete = (index) => {

    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  return (
    <Card>
      <CardHeader>
        <h1>OverTime Form</h1>
        <FaPlus
          style={{
            // marginRight: '35px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '29px',
            border: '1px solid green',
            borderRadius: '15px',
            padding: '5px',
            backgroundColor: 'green',
          }}
          onClick={toggleModal}
        />

      </CardHeader>
      <CardBody>

        <Form>
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover>

              <thead>
                <tr>
                  <th>EMPLOYEE NAME</th>
                  <th>OVERTIME</th>

                  <th>NUMBER OF DAYS</th>
                  <th>HOURS</th>
                  <th>RATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.employeeName}</td>
                    <td>{data.overtime}</td>

                    <td>{data.numberOfDays}</td>
                    <td>{data.hours}</td>
                    <td>{data.rate}</td>
                    <td>
                      <Button color="link" style={{ fontSize: '20px' }} onClick={() => handleEdit(index)}>
                        <FaEdit />
                      </Button>
                      <Button color="link" style={{ fontSize: '20px' }} onClick={() => handleDelete(index)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Form>

        <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
          <ModalHeader toggle={toggleModal}>Add Overtime</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="employeeNameInput">Employee Name:</Label>
                <Input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label for="overtimeInput">Overtime:</Label>
                <Input
                  type="text"
                  name="overtime"
                  value={formData.overtime}
                  onChange={(e) => setFormData({ ...formData, overtime: e.target.value })}
                />
              </FormGroup>



              <FormGroup>
                <Label for="numberOfDaysInput">Number of Days:</Label>
                <Input
                  type="number"
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={(e) => setFormData({ ...formData, numberOfDays: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label for="hoursInput">Hours:</Label>
                <Input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label for="rateInput">Rate:</Label>
                <Input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
};



const PayslipForm = () => {
  return (
    <div>
      <Row >
        <Col sm="12" md="6">
          <EmployeeSalaryForm />
        </Col>
        <Col sm="12" md="6">
          <TaForm />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <TravellingForm />
        </Col>
        <Col sm="12" md="6">
          <Daform />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <Advance />
        </Col>
        <Col sm="12" md="6">
          <Pfform />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <Insurance />
        </Col>
        <Col sm="12" md="6">
          <Esiform />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <Payslip />
        </Col>
        <Col sm="12" md="6">
          <Over />
        </Col>
      </Row>
    </div>
  );
};

export default PayslipForm;