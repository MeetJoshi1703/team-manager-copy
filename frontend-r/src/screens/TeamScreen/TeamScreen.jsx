import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const TeamScreen = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/teams/');
      setTeamData(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };

  return (
    <Container>
      <h1>Team Screen</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        teamData.map((team, index) => (
          <Row key={index} className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{team.name}</Card.Title>
                  <Card.Text>Description: {team.description}</Card.Text>
                  <Card.Text>Team Members:</Card.Text>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.members.map((member, idx) => (
                        
                        <tr key={idx}>

                          <td>{member.name}</td>
                          <td>{member.domain}</td>
                          <td>
                            {/* Use Link component to route to UserScreen with member_id */}
                            <Link to={`/user/${team.member_id[idx]}`}>View detail</Link>
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default TeamScreen;
