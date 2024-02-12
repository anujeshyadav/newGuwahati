import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, CardBody, Card } from 'reactstrap';

const LeaveForm = () => {
    const [employee, setEmployee] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [remark, setRemark] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted!");
    };

    return (
        <Card style={{ width: '60%', marginLeft: '20%' }}>
            <CardBody>
                <h2>Create New Leave</h2>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>


                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="employee">Employee</Label>
                                        <Input type="select" name="employee" id="employee" value={employee} onChange={(e) => setEmployee(e.target.value)}>
                                            <option>Select Employee</option>
                                            {/* Add options for employees */}
                                        </Input>
                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="leaveType">Leave Type</Label>
                                        <Input type="select" name="leaveType" id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                            <option>Select Leave Type</option>
                                            {/* Add options for leave types */}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>

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
                                <Label for="reason">Leave Reason</Label>
                                <Input type="textarea" name="reason" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="remark">Remark</Label>
                                <Input type="text" name="remark" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default LeaveForm;










