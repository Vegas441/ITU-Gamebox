import React, { useState, useEffect } from 'react';
import currentUser from './current_user'
import GameCard from './GameCard';
import reactStars from 'react-stars';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function MyReviews() {

    const [reviews, setReviews] = useState(null);

    // Fetch my reviews
    useEffect(() => {
        fetch(`http://localhost:8000/reviews?userID=${currentUser.id}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setReviews(data);
        });
      }, []);

    const deleteReview = (review) => {
        fetch(`http://localhost:8000/reviews/${review.id}`,{
            method: 'DELETE'
        }).then(alert('Review deleted'));
    }

    return (
        <>
            {reviews && reviews.length == 0 && <h1 style={{color: 'white', textAlign: 'center', marginTop: '10%'}}>No reviews yet :(<br/> How about writing some ? :)</h1>}

            {reviews && reviews.length > 0 && 
                reviews.map(review => {
                    return (
                    <>
                        <div style={{marginLeft: '50px', display: 'flex', marginTop: '-50px', marginBottom: '100px'}}>  
                            <Link to={`/reviewpage/${review.id}`} state={{ gameID: review.gameID, userID: review.userID }}>
                                <GameCard gameId={review.gameID}/>
                            </Link>
                            
                            <div style={{marginLeft: '25px', marginTop: '125px'}}>
                                <p style={{color: 'white', fontSize: '22px'}}>
                                    <ReactStars size={16} count={review.rating} color1={'yellow'} edit={ false }/> 
                                    <p style={{fontSize: '16px', color: '#99aabb'}}>{review.date}</p> <br/>
                                    <p style={{maxWidth: '1200px'}}>{review.content}</p>
                                </p>
                                
                            </div>
                        </div>
                        <Button href="/myreviews" variant="danger" style={{marginLeft: '1650px', marginTop: '-150px'}} onClick={() => deleteReview(review)}>Delete review</Button>
                        <hr style={{color: '#14181c'}}/>
                        <br/>
                      
                    </>
                    )
                  })
            
            }
        </>
    )
}