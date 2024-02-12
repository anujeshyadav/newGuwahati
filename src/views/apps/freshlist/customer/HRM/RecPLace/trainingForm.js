import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const TrainingForm = () => {
    const [branch, setBranch] = useState('');
    const [trainer, setTrainer] = useState('');
    const [trainingType, setTrainingType] = useState('');
    const [trainingCost, setTrainingCost] = useState('');
    const [employee, setEmployee] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted!");
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Create Training</h2>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="branch">Branch</Label>
                            <Input type="select" name="branch" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                                <option>Select Branch</option>
                                <option>Branch 1</option>
                                <option>Branch 2</option>
                                <option>Branch 3</option>
                                {/* Add more branches */}
                            </Input>
                        </FormGroup>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="trainer">Trainer</Label>
                                    <Input type="select" name="trainer" id="trainer" value={trainer} onChange={(e) => setTrainer(e.target.value)}>
                                        <option>Select Trainer</option>
                                        <option>Internal</option>
                                        <option>Teresa</option>
                                        {/* Add more trainers */}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="trainingType">Training Type</Label>
                                    <Input type="text" name="trainingType" id="trainingType" value={trainingType} onChange={(e) => setTrainingType(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="trainingCost">Training Cost</Label>
                            <Input type="text" name="trainingCost" id="trainingCost" value={trainingCost} onChange={(e) => setTrainingCost(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="employee">Employee</Label>
                            <Input type="select" name="employee" id="employee" value={employee} onChange={(e) => setEmployee(e.target.value)}>
                                <option>Select Employee</option>
                                <option>Employee 1</option>
                                <option>Employee 2</option>
                                <option>Employee 3</option>
                                {/* Add more employees */}
                            </Input>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="startDate">Start Date</Label>
                                    <Input type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="endDate">End Date</Label>
                                    <Input type="date" name="endDate" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default TrainingForm;



