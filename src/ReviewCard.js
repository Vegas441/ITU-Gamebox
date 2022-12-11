import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function ReviewCard({ review }) {

  const [game, setGame] = useState(null); 

  const [user, setUser] = useState(null);
  
  // Fetch data by id
  useEffect(() => {
    fetch(`http://localhost:8000/games/${review.gameID}`).then(res => {
    return res.json();
  }).then(data => {setGame(data)});
    fetch(`http://localhost:8000/userProfiles/${review.userID}`).then(res => {
    return res.json();
   }).then(data => {setUser(data)});
  }, []);

  return (
    <>
      <Link to={`/reviewpage/${review.id}`} state={{ gameID: review.gameID, userID: review.userID }} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '10rem', margin: '15px', backgroundColor: "#445566" }}>
        { game && <Card.Img variant="top" src={game.image} style={{height: '225px'}} />}        
        <Card.Body style={{padding: '8px'}}>
          <Card.Text style={{color: '#bbccdd', fontSize: '12px'}}>
            { user && <img
              src= {user.image}
              alt=''
              width="25"
              height="25" 
              style={{borderRadius: '50%', marginRight: '2.1px'}}
            />}
             
            {user && <b>{user.name}</b>}
          </Card.Text>
        </Card.Body>
        <ReactStars count={review.rating} size={12} color1={'#bbccdd'} edit={ false }/>
      </Card>
      </Link> 
    </>
  )
}
