import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import { Card, CardBody, Form, FormGroup, Label, Input, Row, Col, Button, CardHeader } from 'reactstrap';
import { Hrm_Update, Hrm_ViewOne } from '../../../../../../ApiEndPoint/Api';
import { _Get, _Put } from '../../../../../../ApiEndPoint/ApiCalling';

const JobeditList = () => {
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

    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await _Get(Hrm_ViewOne, id);
                setData(response.Job);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await _Put(Hrm_Update, id, data);
            history.push('/app/ajgroup/HRM/JobList')
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
                <h2>Job Form</h2>

                <Button color=" btn btn-danger" type="button" onClick={handleBack}>
                    Back
                </Button>

            </CardHeader>
            <CardBody>


                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="jobTitle">Job Title</Label>
                                <Input
                                    type="text"
                                    name="jobTitle"
                                    id="jobTitle"
                                    value={data?.jobTitle}
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
                                    value={data?.branch}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Branch</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>

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
                                    value={data?.jobCategory}
                                    onChange={handleInputChange}
                                    placeholder="Select job category"
                                >
                                    <option value="">Select Job Category</option>
                                    <option value="A">A </option>
                                    <option value="B">B</option>

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
                                    value={data?.numberOfPositions}
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
                                    value={data?.status}
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
                                    value={data?.startDate}
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
                                    value={data?.endDate}
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
                                    value={data?.skills}
                                    onChange={handleInputChange}
                                    placeholder="Enter required skills"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="jobDescription">Job Discraption</Label>
                                <Input
                                    type="text"
                                    name="jobDescription"
                                    id="jobDescription"
                                    value={data?.jobDescription}
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
                                    value={data?.jobRequirements}
                                    onChange={handleInputChange}
                                    placeholder="Enter job requirements"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup row>
                        <Col sm={{ size: 8, offset: 4 }}>
                            <Button color="primary" type="submit">
                                Update
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
};

export default JobeditList;
