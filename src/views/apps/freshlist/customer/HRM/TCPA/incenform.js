import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

const IncenForm = () => {
    const [ruleTitle, setRuleTitle] = useState('');
    const [amountValue, setAmountValue] = useState('');
    const [targetAchievement, setTargetAchievement] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Rule Title:", ruleTitle);
        console.log("Amount Value:", amountValue);
        // Reset form fields
        setRuleTitle('');
        setAmountValue('');
    };
    return (
        <Card>
            <CardBody>
                <h1>Incentive Form</h1>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="ruleTitle">Rule Title</Label>
                                <Input
                                    type="select"
                                    name="ruleTitle"
                                    id="ruleTitle"
                                    value={ruleTitle}
                                    onChange={(e) => setRuleTitle(e.target.value)}
                                >
                                    <option value="">Select Rule Title</option>
                                    <option value="Rule 1">Rule 1</option>
                                    <option value="Rule 2">Rule 2</option>
                                    {/* Add more options as needed */}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="targetAchievement">Target Achievement</Label>
                                <Input
                                    type="text"
                                    placeholder=' Enter Target'
                                    name="targetAchievement"
                                    id="targetAchievement"
                                    value={targetAchievement} onChange={e => setTargetAchievement(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="amountValue">Amount Value</Label>
                                <Input
                                    type="number"
                                    placeholder='amount value'
                                    name="amountValue"
                                    id="amountValue"
                                    value={amountValue}
                                    onChange={(e) => setAmountValue(e.target.value)}
                                />
                            </FormGroup>
                            <Button color="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default IncenForm;




