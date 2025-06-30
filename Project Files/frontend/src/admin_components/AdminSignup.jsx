import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const commonFields = [
    { controlId: "username", label: "UserName", type: "text" },
    { controlId: "email", label: "Email", type: "email" },
    { controlId: "password", label: "Password", type: "password" },
];

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5100/adminregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
console.log('Raw response:', response);

const text = await response.text();
console.log('Response text:', text);
            if (response.ok) {
                const data = JSON.parse(text) ;
                console.log('Registration successful:', data);
                alert('Registered Successfully');
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Error during registration');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '10vh' }}>
                <Card className="shadow p-4" style={{ width: '400px' }}>
                    <Card.Body>
                        <h2 className="mb-4">Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="firstName" style={{ textAlign: 'start', marginBottom: '10px' }}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="lastName" style={{ textAlign: 'start', marginBottom: '10px' }}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            {commonFields.map((field) => (
                                <Form.Group style={{ textAlign: 'start', marginBottom: '10px' }} controlId={field.controlId} key={field.controlId}>
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Control
                                        type={field.type}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        name={field.controlId}
                                        value={formData[field.controlId]}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            ))}

                            <Button type="submit" className="btn-primary w-100 mt-3">Sign Up</Button>
                        </Form>
                        <p className="mt-3">Already have an account? <Link to="/alogin">Log In</Link></p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminSignup;
