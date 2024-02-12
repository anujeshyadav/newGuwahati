import React, { useState } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const MockTestForm = () => {
  const [formData, setFormData] = useState({
    questions: [
      {
        id: 'question1',
        text: '  What is the capital of France?',
        options: [
          { id: 'option1_1', text: 'Berlin' },
          { id: 'option1_2', text: 'Paris' },
          { id: 'option1_3', text: 'London' },
          { id: 'option1_4', text: 'Rome' },
        ],
        selectedOption: null,
      },
      {
        id: 'question2',
        text: '  Which planet is known as the Red Planet?',
        options: [
          { id: 'option2_1', text: 'Mars' },
          { id: 'option2_2', text: 'Venus' },
          { id: 'option2_3', text: 'Jupiter' },
          { id: 'option2_4', text: 'Saturn' },
        ],
        selectedOption: null,
      },
      {
        id: 'question3',
        text: '  The national animal of India is?',
        options: [
          { id: 'option2_1', text: 'Tiger' },
          { id: 'option2_2', text: 'Lion' },
          { id: 'option2_3', text: 'Deer' },
          { id: 'option2_4', text: 'Beer' },
        ],
        selectedOption: null,
      },
      {
        id: 'question4',
        text: '  National Currency of India is?',
        options: [
          { id: 'option2_1', text: 'Dollar' },
          { id: 'option2_2', text: 'Indian Rupee' },
          { id: 'option2_3', text: 'Yen' },
          { id: 'option2_4', text: 'Euro' },
        ],
        selectedOption: null,
      },
      {
        id: 'question5',
        text: '  What is the national flower of India?',
        options: [
          { id: 'option2_1', text: 'Rose' },
          { id: 'option2_2', text: 'Lotus' },
          { id: 'option2_3', text: 'Sunflower' },
          { id: 'option2_4', text: 'Lily' },
        ],
        selectedOption: null,
      },
    ],
  });

  const handleOptionChange = (questionId, selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) =>
        question.id === questionId ? { ...question, selectedOption } : question
      ),
    }));
  };

  const handleClearResponse = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) => ({
        ...question,
        selectedOption: null,
      })),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Options:', formData.questions.map((q) => q.selectedOption));

    handleClearResponse();
  };

  return (
    <Card>
      <CardBody>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#007BFF' }}>
          Mock Test Form
        </h2>
        <Form onSubmit={handleSubmit}>
          {formData.questions.map((question, index) => (
            <div key={question.id} style={{ marginBottom: '15px' }}>
              <FormGroup row>
                <Col sm={12} className="font-weight-bold">
                  Q{index + 1}: {question.text}
                </Col>
              </FormGroup>
              {question.options.map((option) => (
                <FormGroup key={option.id} row>
                  <Col sm={10}>
                    <Label check>
                      <Input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={question.selectedOption === option.id}
                        onChange={() => handleOptionChange(question.id, option.id)}
                      />
                      {' '}
                      {option.text}
                    </Label>
                  </Col>
                </FormGroup>
              ))}
            </div>
          ))}
          <FormGroup row>
            <Col sm={{ size: 6, offset: 4 }} className="text-center">
              <Button color="primary" type="submit" style={{ marginRight: '10px' }}>
                Submit
              </Button>
              <Button color="danger" type="button" onClick={handleClearResponse}>
                Clear Response
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default MockTestForm;