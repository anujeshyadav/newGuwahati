import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Hrm_AppyGroup } from '../../../../../../ApiEndPoint/Api';
import { _PostSave } from '../../../../../../ApiEndPoint/ApiCalling';

const AppResultForm = () => {
  const [data, setData] = useState({
    job: '',
    name: '',
    email: '',
    mobileNo: '',
    status: '',
  });

  const history = useHistory();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await _PostSave(Hrm_AppyGroup, data);
        setSuccessAlert(true);
        setData({
          job: '',
          name: '',
          email: '',
          mobileNo: '',
          status: '',
        });
        history.push('/app/ajgroup/HRM/JobappList');
      } catch (error) {
        console.log(error);
        setErrorAlert(true);
      }
    } else {
      setErrorAlert(true);
    }
  };

  const validateForm = () => {
    return Object.values(data).every((value) => value !== '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Card>
      <CardBody>
        <h2>Applied/Result Form</h2>
        {successAlert && <Alert color="success">Form submitted successfully!</Alert>}
        {errorAlert && <Alert color="danger">Please fill all fields before submitting the form.</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="job" sm={4}>
              Job
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                name="job"
                id="job"
                value={data.job}
                onChange={handleInputChange}
              >
                <option value="">Select Job</option>
                <option value="job1">Job 1</option>
                <option value="job2">Job 2</option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="name" sm={4}>
              Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Enter your Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={4}>
              Email
            </Label>
            <Col sm={8}>
              <Input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="phoneNumber" sm={4}>
              Phone Number
            </Label>
            <Col sm={8}>
              <Input
                type="number"
                name="mobileNo"
                id="mobileNo"
                value={data.mobileNo}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="status" sm={4}>
              Status
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                name="status"
                id="status"
                value={data.status}
                onChange={handleInputChange}
              >
                <option value="">Select </option>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 8, offset: 4 }}>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AppResultForm;
