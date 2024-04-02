import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateUserScreen = () => {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    domain: '',
    gender: '',
    avatar:'https://robohash.org/sintessequaerat.png?size=200x200&set=set1',
    available: false // Assuming available is a boolean
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/users/', userData);
      console.log('User created successfully:', response.data);
      // Reset form fields
      setUserData({
        first_name: '',
        last_name: '',
        email: '',
        domain: '',
        gender: '',
        avatar:'',
        available: false
      });
      navigate('/')
      // Display success message or redirect
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.'); // Update error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" value={userData.first_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" value={userData.last_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formDomain">
          <Form.Label>Domain</Form.Label>
          <Form.Control type="text" name="domain" value={userData.domain} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="Avatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="text" name="avatar" value={userData.avatar} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender" value={userData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAvailable">
          <Form.Check type="checkbox" label="Available" name="available" checked={userData.available} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateUserScreen;
