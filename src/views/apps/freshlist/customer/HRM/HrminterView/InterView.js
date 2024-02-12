import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Alert, CardHeader } from 'reactstrap';
import { Hrm_Interviewone, Hrm_InterviewUpdate } from '../../../../../../ApiEndPoint/Api';
import { _Get, _Put } from '../../../../../../ApiEndPoint/ApiCalling';
import { useParams, useHistory } from "react-router-dom"
const InterView_viewList = () => {
    const [data, setData] = useState({
        candidateName: '',
        dateOfInterview: '',
        interviewTime: '',
        location: '',
        status: '',
    });
    // parameter's : candidateName,dateOfInterview,
    // interviewTime,location,status



    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await _Get(Hrm_Interviewone, id);
                setData(response.Interview);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await _Put(Hrm_InterviewUpdate, id, data);

        } catch (error) {
            console.log(error);

        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleBack = () => {
        history.goBack();
    };

    return (
        <Card>
            <CardHeader>
                <h2>Interview Form</h2>

                <Button color=" btn btn-danger" type="button" onClick={handleBack}>
                    Back
                </Button>

            </CardHeader>
            <CardBody>

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
                                readOnly
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
                                readOnly
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
                                readOnly
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
                                readOnly
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
                                readOnly
                            >
                                <option value="">Select </option>
                                <option value="Active">Active</option>
                                <option value="Deative">Deactive</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    
                </Form>
            </CardBody>
        </Card>
    );
};

export default InterView_viewList;

