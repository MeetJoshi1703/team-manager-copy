// Header.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { RiTeamLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../store/reducer';

function Header() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(toggleModal());
  };

  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="/">Team Manager</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Users</Nav.Link>
            <Nav.Link href="/team">Teams</Nav.Link>
          </Nav>
          <RiTeamLine onClick={handleOpenModal} style={{ cursor: 'pointer' }} size={30} />
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
