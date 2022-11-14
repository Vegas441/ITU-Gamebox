import React from 'react';
import ReactStars from 'react-stars';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function ReviewCard({ review }) {
  return (
    <>
      <Link to={`/reviewpage/${review.id}`} state={{ review }}>
      <Card style={{ width: '10rem', margin: '15px', backgroundColor: "#445566" }}>
        <Card.Img variant="top" src={review.game.image} style={{height: '225px'}} />
        <Card.Body style={{padding: '8px'}}>
          <Card.Text style={{color: '#bbccdd', fontSize: '12px'}}>
            <img
              src={review.user.image}
              width="25"
              height="25" 
              style={{borderRadius: '50%', marginRight: '5px'}}
            />
             
            <b>{review.user.name}</b>
          </Card.Text>
        </Card.Body>
        <ReactStars count={review.rating} size={12} color1={'#bbccdd'} edit={ false }/>
      </Card>
      </Link>
    </>
  )
}
