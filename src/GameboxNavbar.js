import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function GameboxNavbar({ userProfile }) {
  return (
    <>
      <Navbar fixedTop style={{backgroundColor: "#14181c", variant: "light"}}>
        <Container>
          <Link to="/" style={{ textDecoration: 'none' }}>
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
          </Link>
          
          <Nav> 
            <img
              alt=""
              src={userProfile.image}
              width="40"
              height="40"
              style={{borderRadius: '50%'}}
            />
            <a><Nav.Link style={{color: '#99aabb', size: '24px', fontWeight: 'bold'}}>{userProfile.name}</Nav.Link></a>
          
            <a><Nav.Link style={{color: '#99aabb'}}> Games </Nav.Link></a>
            <a><Nav.Link href="/listspage" style={{color: '#99aabb'}}> Lists </Nav.Link></a>
            <a><Nav.Link><FaSearch style={{width: 30, color: '#99aabb'}}/></Nav.Link></a>
            <Button size='sm'> <b>+ LOG</b>  </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
