import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'

export default function GameboxNavbar() {
  const [userProfile, setUserProfile] = useState({name: 'User1234', avatar: '/profile_pics/person_0.jpg'}) // example profile
  return (
    <>
      <Navbar fixedTop style={{backgroundColor: "#14181c", variant: "light"}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <b style={{color: 'white'}}>Gamebox</b>
          </Navbar.Brand>
          
          <Nav> 
            <img
              alt=""
              src={userProfile.avatar}
              width="30"
              height="30"
              //border-radius= "50%"
            />
          
            <Nav.Link style={{color: '#99aabb'}}> Games </Nav.Link>
            <Nav.Link style={{color: '#99aabb'}}> Lists </Nav.Link>
            <Nav.Link><FaSearch style={{width: 30, color: '#99aabb'}}/></Nav.Link>
            <Button size='sm'> <b>+ LOG</b>  </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
