import React, { useState } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Hrm_InterviewGroup } from '../../../../../../ApiEndPoint/Api';
import { _PostSave } from '../../../../../../ApiEndPoint/ApiCalling';
import { useHistory } from 'react-router-dom';
const InterviewForm = () => {
  const [data, setData] = useState({
    candidateName: '',
    dateOfInterview: '',
    interviewTime: '',
    // position: '',
    location: '',
    status: '',
  });
  // parameter's : candidateName,dateOfInterview,
  // interviewTime,location,status
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const positions = ['Supervisior', 'Product Manager', 'Field Manager'];
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await _PostSave(Hrm_InterviewGroup, data);
        setSuccessAlert(true);
        resetForm();
        history.push('/app/ajgroup/HRM/interviewList');
      } catch (error) {
        console.log(error);
        setErrorAlert(true);
      }
    } else {
      setErrorAlert(true);
    }
  };

  const validateForm = () => {
    return Object.values(data).every((value) => value.trim() !== '');
  };

  const resetForm = () => {
    setData({
      candidateName: '',
      dateOfInterview: '',
      interviewTime: '',
      // position: '',
      location: '',
      status: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Card>
      <CardBody>
        <h2>Interview Form</h2>
        {successAlert && <Alert color="success">Form submitted successfully!</Alert>}
        {errorAlert && <Alert color="danger">Please fill all fields before submitting the form.</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="candidateName" sm={4}>
              Candidate Name:
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="candidateName"
                id="candidateName"
                value={data.candidateName}
                onChange={handleInputChange}
                placeholder="Enter Candidate Name"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="dateOfInterview" sm={4}>
              Date of Interview:
            </Label>
            <Col sm={8}>
              <Input
                type="date"
                name="dateOfInterview"
                id="dateOfInterview"
                value={data.dateOfInterview}
                onChange={handleInputChange}
                placeholder="Date of Interview"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="interviewTime" sm={4}>
              Interview Time:
            </Label>
            <Col sm={6}>
              <Input
                type="time"
                name="interviewTime"
                id="interviewTime"
                value={data.interviewTime}
                onChange={handleInputChange}
                placeholder="Interview Time"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Location" sm={4}>
              Location :
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="location"
                id="location"
                value={data.location}
                onChange={handleInputChange}
                placeholder="Enter location"
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
                <option value="Deative">Deactive</option>
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

export default InterviewForm;

