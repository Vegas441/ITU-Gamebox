/**
 * @author David Svaty (xsvaty01)
 */
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'
import Search from './Search.js'
import currentUser from './current_user';
import './NavBar.css';

export default function GameboxNavbar() {
    const [games, setGames] = useState(null);
    const [searchButton, setSearchButton] = useState(false);
    const setSearchBtn = () => {
      setSearchButton(true);
    };

    useEffect(() => {
      fetch('http://localhost:8000/games')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setGames(data);
      })
    }, []);
  return (
    <>
      <Navbar style={{backgroundColor: "#14181c", variant: "light"}}>
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
              src={currentUser.image}
              width="40"
              height="40"
              style={{borderRadius: '50%'}}
            />
            <a><Nav.Link href={"/profile/" + currentUser.id} style={{color: '#99aabb', size: '24px', fontWeight: 'bold'}}>{currentUser.name}</Nav.Link></a>
          
            <Link to="/gamespage" className='nav-link' style={{color: '#99aabb'}}> Games </Link>
            <a><Nav.Link href="/listspage" style={{color: '#99aabb'}}> Lists </Nav.Link></a>
            <Link to="/myreviews" className='nav-link' style={{color: '#99aabb'}}> My reviews </Link>
            <button className="searchbutton" onClick={setSearchBtn}><FaSearch style={{width: 30, color: '#99aabb'}}/></button>
            <Link to="/register"> <Button className='nav-btn'> <b>Register</b>  </Button></Link>
            <Link to="/login"> <Button className='nav-btn'> <b>Login</b>  </Button></Link>
          </Nav>
        </Container>
      </Navbar>
        <SearchBar trigger={searchButton} setTrigger={setSearchButton}> 
            <Search placeholder="Enter a Game Name" games={games} />
        </SearchBar>
    </>
  )
}
