import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import { BsPlus } from 'react-icons/bs'; // Import the plus icon
import "./homeScreen.css"
import { Form, FormControl, Button, } from 'react-bootstrap';
import {useSelector } from 'react-redux';


const HomeScreen = () => {

  const { showModal } = useSelector((state) => state.team);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [searchText, setSearchText] = useState('');
  // const [filters, setFilters] = useState({
  //   domain: "",
  //   gender: "",
  //   availability: null
  // });
  const [searchContent, setSearchContent] = useState({
  searchText: '',
  domain: [],
  gender: '',
  available: null
});
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/?page=${currentPage}`); // Include page parameter
        const { users, totalPages: totalPagesCount } = response.data;
        console.log(response.data);
        setUsers(users);
        setTotalPages(totalPagesCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage,showModal]); // Fetch users when currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    scrollToTop();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    scrollToTop();
  };


  const handleFormValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(searchContent);
    // If it's a checkbox, handle it separately
    if (type === 'checkbox') {
      if (name === 'domain') {
        const updatedDomain = checked
          ? [...searchContent.domain, value]
          : searchContent.domain.filter(domain => domain !== value);
  
        setSearchContent({ ...searchContent, domain: updatedDomain });
      } else {
        setSearchContent({ ...searchContent, [name]: checked });
      }
    } else {
      setSearchContent({ ...searchContent, [name]: value });
    }
  };
  

  // const handleAvailabilityChange = (event) => {
  //   setSearchContent({ ...searchContent, availability: event.target.checked });
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      let queryParams = `?page=${currentPage}`; // Start with page parameter
  
      // Add search text parameter
      if (searchContent.searchText.trim()) {
        queryParams += `&searchText=${searchContent.searchText.trim()}`;
      }
  
      // Add gender parameter
      if (searchContent.gender) {
        queryParams += `&gender=${searchContent.gender}`;
      }
  
      // Add domain parameter
      if (searchContent.domain.length > 0) {
        queryParams += `&domain=${searchContent.domain.join(',')}`;
      }
  
      // Add availability parameter
      if (searchContent.availability !== null) {
        queryParams += `&available=${searchContent.available}`;
      }
  
      const response = await axios.get(`http://localhost:8000/api/users/${queryParams}`);
      const { users, totalPages: totalPagesCount } = response.data;
      console.log(response.data);
      setUsers(users);
      setTotalPages(totalPagesCount);
      setLoading(false);
  
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };


  return (
    <>
    <div>
      <div className='searchbox'>
        <Form className="d-flex homescreen-form" onSubmit={handleFormSubmit}>
        <h2>Search users: </h2>
    <FormControl
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      name="searchText"
      value={searchContent.searchText}
      onChange={handleFormValueChange}
    />
    <Form.Group controlId="formGender" className="me-2 gender">
    <Form.Label>Gender</Form.Label>
    <Form.Control
      as="select"
      name="gender"
      
      value={searchContent.gender}
      onChange={handleFormValueChange}
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Agender">Agender</option>
      <option value="Bigender">Bigender</option>
      <option value="Polygender">Polygender</option>
      {/* Add more gender options as needed */}
    </Form.Control>
  </Form.Group>

    <Form.Group controlId="formDomain" className="me-2 domain">
  <Form.Label>Domain</Form.Label>
  <div className='domain-fields'>
    <Form.Check
      inline
      label="Sales"
      type="checkbox"
      name="domain"
      value="Sales"
      checked={searchContent.domain.includes("Sales")}
      onChange={handleFormValueChange}
    />
    <Form.Check
      inline
      label="Finance"
      type="checkbox"
      name="domain"
      value="Finance"
      checked={searchContent.domain.includes("Finance")}
      onChange={handleFormValueChange}
    />
    <Form.Check
      inline
      label="Marketing"
      type="checkbox"
      name="domain"
      value="Marketing"
      checked={searchContent.domain.includes("Marketing")}
      onChange={handleFormValueChange}
    />
    <Form.Check
      inline
      label="Business Development"
      type="checkbox"
      name="domain"
      value="Business Development"
      checked={searchContent.domain.includes("Business Development")}
      onChange={handleFormValueChange}
    />
    <Form.Check
      inline
      label="UI"
      type="checkbox"
      name="domain"
      value="UI"
      checked={searchContent.domain.includes("UI")}
      onChange={handleFormValueChange}
    />
    <Form.Check
      inline
      label="IT"
      type="checkbox"
      name="domain"
      value="IT"
      checked={searchContent.domain.includes("IT")}
      onChange={handleFormValueChange}
    />
    {/* Add more domain options as needed */}
  </div>
    </Form.Group>
    <Form.Group controlId="formAvailability" className="me-2">
    <Form.Label>User Availability</Form.Label>
      <Form.Check
        inline
        label="Available"
        type="checkbox"
        name="available"
        checked={searchContent.available}
        onChange={handleFormValueChange}
      />
    </Form.Group>
    <Button type="submit">Search</Button> 
  </Form>
      </div>

      
      <div className="create-user-button">
        <Button variant="primary">
          <BsPlus /> Create User
        </Button>
      </div>
    </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {users.map(user => (
            <Card
              className="card"
              key={user._id} // Assuming the user object has a unique identifier
              name={`${user.first_name} ${user.last_name}`}
              email={user.email}
              id={user.id}
              domain={user.domain}
              description={user.description}
              avatar={user.avatar}
              gender={user.gender}
              available={user.available}
              _id = {user._id}
            />
          ))};

          <div className='pagination-btns'>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
          </div>


          
        </div>
      )}
    </>
  );
};

export default HomeScreen;
