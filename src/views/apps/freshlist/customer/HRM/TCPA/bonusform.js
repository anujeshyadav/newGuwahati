// import React, { useState } from 'react';
// import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

// const BonusForm = () => {
//     const [formData, setFormData] = useState({
//         department: '',
//         designation: '',
//         employeeName: '',
//         appraisalMonth: '',
//         targetRating: '',
//         overallRating: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission here
//         console.log(formData);
//     };

//     return (
//         <Card>
//             <CardBody>

//                 <h1>Bonus Form</h1>
//                 <Row>
//                     <Col md={6}>
//                         <Form onSubmit={handleSubmit}>
//                             <FormGroup>
//                                 <Label for="department">Department</Label>
//                                 <Input type="text" placeholder='Enter your Department Name' name="department" id="department" value={formData.department} onChange={handleChange} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="designation">Designation</Label>
//                                 <Input type="text" placeholder='Enter Designation' name="designation" id="designation" value={formData.designation} onChange={handleChange} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="employeeName">Employee Name</Label>
//                                 <Input type="text" placeholder='Employe Name' name="employeeName" id="employeeName" value={formData.employeeName} onChange={handleChange} />
//                             </FormGroup>
//                         </Form>
//                     </Col>
//                     <Col md={6}>
//                         <Form onSubmit={handleSubmit}>
//                             <FormGroup>
//                                 <Label for="appraisalMonth">Appraisal Month</Label>
//                                 <Input type="text" name="appraisalMonth" id="appraisalMonth" value={formData.appraisalMonth} onChange={handleChange} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="targetRating">Target Rating</Label>
//                                 <Input type="text" placeholder='Enter Rate' name="targetRating" id="targetRating" value={formData.targetRating} onChange={handleChange} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="overallRating">Overall Rating</Label>
//                                 <Input type="text" placeholder='Overall Rating' name="overallRating" id="overallRating" value={formData.overallRating} onChange={handleChange} />
//                             </FormGroup>
//                             <Button type="submit" color="primary">Submit</Button>
//                         </Form>
//                     </Col>
//                 </Row>

//             </CardBody>
//         </Card>
//     );
// };
// export default BonusForm;










import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, Table } from 'reactstrap';

const BonusForm = () => {
    const [formData, setFormData] = useState({
        department: '',
        designation: '',
        employeeName: '',
        appraisalMonth: '',
        targetRating: '',
        overallRating: ''
    });

    const [submittedData, setSubmittedData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        setSubmittedData([...submittedData, formData]); // Add form data to submittedData array
        setFormData({
            department: '',
            designation: '',
            employeeName: '',
            appraisalMonth: '',
            targetRating: '',
            overallRating: ''
        }); // Reset form data
    };

    return (
        <Card>
            <CardBody>
                <h1>Bonus Form</h1>
                <Row>
                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="department">Department</Label>
                                <Input type="text" placeholder='Enter your Department Name' name="department" id="department" value={formData.department} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="designation">Designation</Label>
                                <Input type="text" placeholder='Enter Designation' name="designation" id="designation" value={formData.designation} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="employeeName">Employee Name</Label>
                                <Input type="text" placeholder='Employe Name' name="employeeName" id="employeeName" value={formData.employeeName} onChange={handleChange} />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="appraisalMonth">Appraisal Month</Label>
                                <Input type="text" name="appraisalMonth" id="appraisalMonth" value={formData.appraisalMonth} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="targetRating">Target Rating</Label>
                                <Input type="text" placeholder='Enter Rate' name="targetRating" id="targetRating" value={formData.targetRating} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="overallRating">Overall Rating</Label>
                                <Input type="text" placeholder='Overall Rating' name="overallRating" id="overallRating" value={formData.overallRating} onChange={handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Employee Name</th>
                                    <th>Appraisal Month</th>
                                    <th>Target Rating</th>
                                    <th>Overall Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submittedData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.department}</td>
                                        <td>{data.designation}</td>
                                        <td>{data.employeeName}</td>
                                        <td>{data.appraisalMonth}</td>
                                        <td>{data.targetRating}</td>
                                        <td>{data.overallRating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </CardBody>
        </Card>
    );
};
export default BonusForm;



