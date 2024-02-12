import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Alert, CardHeader } from 'reactstrap';
import { Hrm_AppUpdate, Hrm_AppviewOne } from '../../../../../../ApiEndPoint/Api';
import { _Get, _Put } from '../../../../../../ApiEndPoint/ApiCalling';

const JobApView = () => {
    const [data, setData] = useState({
        job: '',
        name: '',
        email: '',
        mobileNo: '',
        status: '',
    });

    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await _Get(Hrm_AppviewOne, id);

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
            await _Put(Hrm_AppUpdate, id, data);

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
    }


    return (
        <Card>
            <CardHeader>
                <h2>Applied/Result Form</h2>

                <Button color="danger" type="button" onClick={handleBack}>
                    Back
                </Button>

            </CardHeader>
            <CardBody>


                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label for="job" sm={4}>
                            Job
                        </Label>
                        <Col sm={8}>
                            <Input
                                name="job"
                                id="job"
                                value={data?.job}
                                onChange={handleInputChange}
                                readOnly
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

                                name="name"
                                id="name"
                                value={data?.name}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={4}>
                            Email
                        </Label>
                        <Col sm={8}>
                            <Input

                                name="email"
                                id="email"
                                value={data?.email}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phoneNumber" sm={4}>
                            Phone Number
                        </Label>
                        <Col sm={8}>
                            <Input

                                name="mobileNo"
                                id="mobileNo"
                                value={data?.mobileNo}
                                onChange={handleInputChange}
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

                                name="status"
                                id="status"
                                value={data?.status}
                                onChange={handleInputChange}
                                readOnly
                            >
                                <option value="">Select </option>
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                            </Input>
                        </Col>
                    </FormGroup>

                </Form>
            </CardBody>
        </Card>
    );
};

export default JobApView;
