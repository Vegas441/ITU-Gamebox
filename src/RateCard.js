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
  //async function getNextId() {
    useEffect(() => {
     fetch(`http://localhost:8000/reviews`).then(
      res => res.json()).then(
      data => {
        setIndex(data);
        var lastRew = data[data.length - 1];
        //console.log(lastRew.id);
        setIndex(lastRew.id);
      })
    
    console.log(highestIndex)
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
        {/*
        <CardHeader>
          <GrGamepad style={{width: 80}}/>
        </CardHeader>
        */}

        {/*<div style={{marginLeft: '2.3rem', marginBottom: '-10px'}}>
          <ReactStars size={40} count={5} color1={'#334455'} color2={'#40bcf4'} edit={ true } style={{}}/>
        </div>
        <hr/>*/}
        <Card.Text>
          <Button variant='text' onClick={handleShow} style={{marginTop: '5%', marginLeft: '30%', marginBottom: '-8%'}}>
          <p style={{color: 'white', fontSize: '20px'}}>Review</p>
          </Button>
          <hr/>
          <p style={{color: 'white', fontSize: '20px', marginLeft: '30%'}}>Add to list</p>
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
