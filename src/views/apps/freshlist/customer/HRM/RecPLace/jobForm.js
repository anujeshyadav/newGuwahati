import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Row, Col, Button, Alert } from 'reactstrap';
import { HRM_RECPLACE } from '../../../../../../ApiEndPoint/Api';
import { _PostSave } from '../../../../../../ApiEndPoint/ApiCalling';
import { useHistory } from 'react-router-dom';
const JobbForm = () => {
  const [data, setData] = useState({
    jobTitle: '',
    branch: '',
    jobCategory: '',
    numberOfPositions: '',
    status: '',
    startDate: '',
    endDate: '',
    skills: '',
    jobDescription: '',
    jobRequirements: '',
  });
 const history = useHistory();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await _PostSave(HRM_RECPLACE, data);
        setSuccessAlert(true);
        resetForm();
        history.push('/app/ajgroup/HRM/JobList');
      } 
      catch (error) {
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
      jobTitle: '',
      branch: '',
      jobCategory: '',
      numberOfPositions: '',
      status: '',
      startDate: '',
      endDate: '',
      skills: '',
      jobDescription: '',
      jobRequirements: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const jobCategories = ['Marketing', 'Sales', 'Human Resources', 'Finance'];

  return (
    <Card>
      <CardBody>
        <h2>Job Form</h2>
        {successAlert && <Alert color="success">Form submitted successfully!</Alert>}
        {errorAlert && <Alert color="danger">Please fill all fields before submitting the form.</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="jobTitle">Job Title</Label>
                <Input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={data.jobTitle}
                  onChange={handleInputChange}
                  placeholder='Enter job Title'
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="branch">Branch</Label>
                <Input
                  type="select"
                  name="branch"
                  id="branch"
                  value={data.branch}
                  onChange={handleInputChange}
                >
                  <option value="">Select Branch</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  Add your branch options here
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="jobCategory">Job Category</Label>
                <Input
                  type="select"
                  name="jobCategory"
                  id="jobCategory"
                  value={data.jobCategory}
                  onChange={handleInputChange}
                  placeholder="Select job category"
                >
                  <option value="">Select Job Category</option>
                  <option value="A">A </option>
                  <option value="B">B</option>
                  {jobCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="numberOfPositions">Number of Positions</Label>
                <Input
                  type="number"
                  name="numberOfPositions"
                  id="numberOfPositions"
                  value={data.numberOfPositions}
                  onChange={handleInputChange}
                  placeholder="Enter number of positions"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={data.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={data.startDate}
                  onChange={handleInputChange}
                  placeholder="Select start date"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={data.endDate}
                  onChange={handleInputChange}
                  placeholder="Select end date"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="skills">Skill</Label>
                <Input
                  type="text"
                  name="skills"
                  id="skills"
                  value={data.skills}
                  onChange={handleInputChange}
                  placeholder="Enter required skills"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="jobDescription">Job Description</Label>
                <Input
                  type="text"
                  name="jobDescription"
                  id="jobDescription"
                  value={data.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Enter job requirements"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="jobRequirements">Job Requirement</Label>
                <Input
                  type="text"
                  name="jobRequirements"
                  id="jobRequirements"
                  value={data.jobRequirements}
                  onChange={handleInputChange}
                  placeholder="Enter job requirements"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup row>
            <Col sm={{ size: 8, offset: 4 }}>
              <Button color="primary" type="submit">
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default JobbForm;
