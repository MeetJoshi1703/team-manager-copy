import React from 'react';
import { Modal, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTeam, toggleModal,removeTeamMember } from '../../store/reducer';
import axios from 'axios';

const TeamModal = () => {
  const dispatch = useDispatch();
  const { team, showModal } = useSelector((state) => state.team);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setTeam({ ...team, [name]: value }));
  };

  const handleRemoveMember = (memberId) => {
    dispatch(removeTeamMember(memberId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Make a POST request to the backend API
        const res = await axios.post('http://localhost:8000/api/teams/', {
          team_id: team.team_id,
          name: team.name,
          description: team.description,
          members: team.members,
          member_id: team.member_id
        });
        
        dispatch(toggleModal());
        // Clear the Redux state
        dispatch(setTeam({ team_id: null, name: '', description: '', members: [] }));
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    dispatch(toggleModal());
  };


  return (
    <Modal show={showModal} onHide={() => dispatch(toggleModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Team Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTeamName">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={team.name}
              onChange={handleInputChange}
              placeholder="Enter team name"
            />
          </Form.Group>
          <Form.Group controlId="formTeamDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={team.description}
              onChange={handleInputChange}
              placeholder="Enter team description"
            />
          </Form.Group>
          
          {/* Table to display team members */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Domain</th>
                <th></th> {/* Column for minus icon */}
              </tr>
            </thead>
            <tbody>
              {team.members.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.domain}</td>
                  <td>
                  <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveMember(member.member_id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TeamModal;
