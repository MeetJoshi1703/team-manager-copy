import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const UserScreen = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { id } = useParams(); // Get the user ID from URL params

  useEffect(() => {
    fetchUserData();
  }, [id,editing]); // Trigger fetchUserData when id changes

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${id}`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the user
      const res = await axios.delete(`http://localhost:8000/api/users/${id}`);
      if(res){
        alert("user deleted succesfully")
          ('/');
      }
      // Redirect to home page after deletion
      
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      // Make a PUT request to update user data
      const res = await axios.put(`http://localhost:8000/api/users/${id}`, userData);
      setUserData(res);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <Container>
      <h1>User Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Row>
            <Col>
              {editing ? (
                <Form onSubmit={handleUpdate}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
                  </Form.Group>
                  
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formDomain">
                    <Form.Label>Domain</Form.Label>
                    <Form.Control type="text" name="domain" value={userData.domain} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name="gender" value={userData.gender} onChange={handleChange}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formAvailability">
                    <Form.Check type="checkbox" label="Available" name="available" checked={userData.available} onChange={handleChange} />
                  </Form.Group>

                  <Button variant="primary" type="submit">Save</Button>
                </Form>
              ) : (
                <div>
                  <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Domain:</strong> {userData.domain}</p>
                  <p><strong>Gender:</strong> {userData.gender}</p>
                  <p><strong>Available:</strong> {userData.available ? 'Yes' : 'No'}</p>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Buttons for editing and deleting user data */}
              {!editing && (
                <>
                  <Button variant="primary" onClick={handleEdit} className="me-2">
                    <BsPencilSquare /> Edit
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    <BsTrash /> Delete
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default UserScreen;
