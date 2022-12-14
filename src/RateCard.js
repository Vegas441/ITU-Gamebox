import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ReactStars from 'react-stars';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GrGamepad } from 'react-icons/gr';
import GameCard from './GameCard';
import axios from "axios";
import currentUser from './current_user';
import Rating from 'react-rating';

export default function RateCard({ game }) {

  // Modal controls 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0.0);

  function changeRating(value) {
    console.log('new rating: ' + value);
    setUserRating(value);
  }



  /**
   * Gets the next id for new review from database
   * @param {*} obj Database url
   * @returns 
   */ 
  const [highestIndex, setIndex] = useState(null);  // Object hook for finding next index
    useEffect(() => {
      fetch(`http://localhost:8000/reviews`).then(
      res => res.json()).then(
      data => {
        var lastRew = data[data.length - 1];
        //console.log(lastRew.id);
        setIndex(lastRew.id);
        
        let sum = 0;
        let length = 0;
        for(let i = 0; i < data.length; i++){
          
          if(game.id === data[i].gameID){
            sum += data[i].rating;
            length++;
          }
        }
        setAvgRating(sum/length);
        console.log(avgRating);
        
      })
    
    return 
  }, []);
  

  const postReview = reviewBody => {
    try{
      // Form an object
      reviewBody.preventDefault()
      const formData = new FormData(reviewBody.target),
            formDataObj = Object.fromEntries(formData.entries())
      const reviewBodyString = Object.values(formDataObj)[0]
      if(reviewBodyString.length === 0) {
        alert("Plese fill the contents of the review")
        return
      }
      setShow(false);
      const _today = new Date();
      //console.log(userRating);

      axios.post('http://localhost:8000/reviews', {
        id: highestIndex + 1,
        name: `review_${highestIndex + 1}`,
        userID: currentUser.id,
        gameID: game.id,
        rating: userRating,
        content: reviewBodyString,
        date: _today.toLocaleDateString()
      })
      alert('Review posted !');
    } catch(error) {
      alert(error)
    }
  }

  return (
    <>
      <Card
        className="mb-2"
        style={{width: '16rem', height: '20rem', backgroundColor: '#445566'}}
      >
        <Card.Text>
          <Button variant='text' onClick={handleShow} style={{marginTop: '5%', marginLeft: '30%', marginBottom: '-8%'}}>
          <p style={{color: 'white', fontSize: '20px'}}>Review</p>
          </Button>
          <hr/>
          <p style={{color: 'white', fontSize: '20px', marginLeft: '30%'}}><a href="/listspage" style={{textDecoration: 'none'}}>Add to list</a></p>
          <hr/>
          <p style={{color: 'white', fontSize: '20px', marginLeft: '37%'}}>Share</p>
          <hr/>
        </Card.Text>
      </Card>

      {/* Review modal */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          {game && <Modal.Title>Write a review for <b>{game.name}</b></Modal.Title>}
        </Modal.Header>
        <Modal.Body>
        <Rating
          name='game-rating'
          emptySymbol={<span style={{fontSize: '40px'}}>☆</span>}
          fullSymbol={<span style={{fontSize: '40px'}}>★</span>}
          onClick={changeRating}
          />
          <Form onSubmit={postReview}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              >
              {/*game && <GameCard game={game} style={{display: 'inline'}}/>*/}
              <Form.Label>Review body</Form.Label>
              <Form.Control as="textarea" rows={6} name="myInput"/>
            </Form.Group> 
            
            <Button variant="secondary" onClick={handleClose} style={{margin: '10px'}}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Post review
            </Button>
        
          </Form>
        </Modal.Body>
        </Modal>
    </>
  )
}