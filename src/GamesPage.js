/* author: Vitezslav Cupl (xcuplv00) */

import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './GamesPage.css';
import Dropdown from 'react-bootstrap/Dropdown';

function GamesPage() {
    const [games, setGames] = useState(null);
    
    const [order, setOrder] = useState("asc");

    useEffect(() => {
      fetch('http://localhost:8000/games')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setGames(data);
      })
    }, []);

    const sorted = games && games.sort( (a, b) => {
      if (order === 'asc') return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      /*if (order === 'desc')*/return a.name.toLowerCase() < b.name.toLowerCase() ? 1: -1;
    })

  return (
    <div>
      <div className="sortBtn">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button" variant="secondary">
            Sort In
          </Dropdown.Toggle>

          <Dropdown.Menu className="sortList" variant="dark">
            <Dropdown.Item onClick={()=>setOrder('asc')}>Ascending Order</Dropdown.Item>
            <Dropdown.Item onClick={()=>setOrder('desc')}>Descending Order</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='gamecards'>
        {
          games && sorted.map(game => {
              return (
                  <Link to={`/gamespage/${game.id}`} style={{ textDecoration: 'none' }}>
                  <div className='gamecard'>
                  <Card style={{ width: '10rem', margin: '15px', backgroundColor: "#445566" }}>
                      { games && <Card.Img variant="top" src={game.image} style={{height: '220px'}} />}
                      <div className='cardBody'>
                      <Card.Body style={{padding: '8px'}}>
                      <Card.Text style={{color: '#bbccdd', fontSize: '12px'}}>
                          {games && <b>{game.name}</b>}
                      </Card.Text>
                      </Card.Body>
                      </div>
                  </Card>
                  </div>
                  </Link>
              )     
          })}
      </div>
    </div>
  )
}

export default GamesPage