import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Alert, CardHeader } from 'reactstrap';
import { Hrm_AppUpdate, Hrm_AppviewOne } from '../../../../../../ApiEndPoint/Api';
import { _Get, _Put } from '../../../../../../ApiEndPoint/ApiCalling';

const JobapEdList = () => {
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {

            email: data?.email,
            job: data?.job,
            mobileNo: data?.mobileNo,
            name: data?.name,
            status: data?.status,

        }
        try {
            await _Put(Hrm_AppUpdate, id, payload);
            history.push('/app/ajgroup/HRM/JobappList');
        }
        catch (error) {
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
                                type="select"
                                name="job"
                                id="job"
                                value={data?.job}
                                onChange={handleInputChange}
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
                                type="text"
                                name="name"
                                id="name"
                                value={data?.name}
                                onChange={handleInputChange}
                                placeholder="Enter your Name"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={4}>
                            Email
                        </Label>
                        <Col sm={8}>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={data?.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phoneNumber" sm={4}>
                            Phone Number
                        </Label>
                        <Col sm={8}>
                            <Input
                                type="number"
                                name="mobileNo"
                                id="mobileNo"
                                value={data?.mobileNo}
                                onChange={handleInputChange}
                                placeholder="Enter Phone Number"
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
                                value={data?.status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select </option>
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                            </Input>
                        </Col>
                    </FormGroup>
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

export default JobapEdList;
