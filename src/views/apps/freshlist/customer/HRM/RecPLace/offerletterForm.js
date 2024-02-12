import React, { useState } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const OfferLetterForm = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidateNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Offer Letter Form submitted:', formData);
   
  };

  return (
    <Card>
      <CardBody>
        <h2>Offer Letter Form</h2>
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
                value={formData.candidateName}
                onChange={handleInputChange}
                placeholder="Enter Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="candidateEmail" sm={4}>
              Candidate Email:
            </Label>
            <Col sm={8}>
              <Input
                type="email"
                name="candidateEmail"
                id="candidateEmail"
                value={formData.candidateEmail}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="candidateNumber" sm={4}>
              Candidate Phone Number:
            </Label>
            <Col sm={8}>
              <Input
                type="tel"
                name="candidateNumber"
                id="candidateNumber"
                value={formData.candidateNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 8, offset: 4 }}>
              <Button color="primary" type="submit">
                Create Offer Letter
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default OfferLetterForm;
