

import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, Dropdown } from 'reactstrap';

const Indicatform = () => {
    const [employee, setEmployee] = useState({
        name: '',
        designation: '',
        department: '',
        attendance: '',
        target: '',
        collection: '',
    });

    const handleSubmit = e => {
        e.preventDefault();
        // Handle form submission here
        console.log(employee);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <Card>
            <CardBody>
                <h1>Indicator Form</h1>
                <Form onSubmit={handleSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" placeholder='Enter Name' name="name" onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="designation">Designation</Label>
                                <Input type="select" name="designation" onChange={handleChange}>
                                    <option value="">Select Designation</option>
                                    <option>Manager</option>
                                    <option>Developer</option>
                                    <option>Designer</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Dropdown
                              for="department">Department
                                </Dropdown>
                                <Input type="select" name="department" onChange={handleChange}>
                                    <option value="">Select Department</option>
                                    <option>HR</option>
                                    <option>IT</option>
                                    <option>Sales</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="attendance">Attendance</Label>
                                <Input type="select" name="attendance" onChange={handleChange}>
                                    <option value="">Select Attendance</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                    
                                <Label for="target">Target</Label>
                          
                                <Input type="select" name="target" onChange={handleChange}>
                                    <option value="">Select Target</option>
                                    {/* Add rating options */}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="collection">Collection</Label>
                                <Input type="select" name="collection" onChange={handleChange}>
                                    <option value="">Select Collection</option>
                                    {/* Add rating options */}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit" color="primary">Submit</Button>
                </Form>

            </CardBody>
        </Card>
    );
};

export default Indicatform;




