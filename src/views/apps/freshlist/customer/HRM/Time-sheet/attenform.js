
import React, { useState } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

const AttenForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    hours: '',
    remark: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log('Form submitted:', formData);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <h1>Attendance Form</h1>
          <FormGroup row>
            <Label for="employee" sm={2}>
              Employee
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="employee"
                id="employee"
                value={formData.employee}
                onChange={handleInputChange}
              >
                {/* Populate dropdown options with employees */}
                <option value="">Select Employee</option>
                <option value="employee1">Employee 1</option>
                <option value="employee2">Employee 2</option>
                <option value="employee3">Employee 3</option>
                <option value="employee4">Employee 4</option>
                {/* Add more options as needed */}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="date" sm={2}>
              Date
            </Label>
            <Col sm={10}>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="hours" sm={2}>
              Hours
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                placeholder='Hours'
                name="hours"
                id="hours"
                value={formData.hours}
                onChange={handleInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="remark" sm={2}>
              Remark
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="remark"
                id="remark"
                value={formData.remark}
                onChange={handleInputChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              {/* <Button type="submit">Submit</Button> */}

              <Button.Ripple
                color="primary"
                type="submit"
                className="mt-2">
                Submit
              </Button.Ripple>
            </Col>
          </FormGroup>
        </Form>

      </CardBody>
    </Card>
  );
};
export default AttenForm;












