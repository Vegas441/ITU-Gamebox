import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ReactStars from 'react-stars';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GrGamepad } from 'react-icons/gr';
import GameCard from './GameCard';
import axios from "axios";


export default function RateCard({ game }) {

  // Modal controls 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Gets the next id for new review from database
   * @param {*} obj Database url
   * @returns 
   
  const [obj, setObj] = useState({})  // Object hook for finding next index
  async function getNextId() {
    let i = 0
    do {
      i++;
      await fetch(`http://localhost:8000/reviews/${i}`).then(res => res.json()).then(data => {setObj(data); console.log(data);})
      console.log(obj)
    } while(Object.keys(obj).length !== 0)
    return i + 1
  }
  */

  const postReview = reviewBody => {
    try{
      // Form an object
      reviewBody.preventDefault()
      const formData = new FormData(reviewBody.target),
            formDataObj = Object.fromEntries(formData.entries())
      const reviewBodyString = Object.values(formDataObj)[0]
      //console.log(reviewBodyString)

      setShow(false);
      // Post data to database
      /**
       * TODO:
       * rating system 
       * user authentification
       * new id 
       */
      const _id = 7
      const _today = new Date();
      axios.post('http://localhost:8000/reviews', {
        id: _id, //getNextId(),
        name: `review_${_id}`,
        userID: 1,
        gameID: game.id,
        rating: 5,
        content: reviewBodyString,
        date: _today.toLocaleDateString()
      })
    } catch(error) {
      alert(error)
    }
  }

  return (
    <>
      <Card
        className="mb-2"
        style={{width: '16rem', height: '24rem', backgroundColor: '#445566'}}
      >
        <CardHeader>
          <GrGamepad style={{width: 80}}/>
        </CardHeader>

        <div style={{marginLeft: '2.3rem', marginBottom: '-10px'}}>
        <ReactStars size={40} count={5} color1={'#334455'} color2={'#40bcf4'} edit={ true } style={{}}/>
        </div>
        <hr/>
        <Card.Text>
          <Button variant='text' onClick={handleShow} style={{marginLeft: '30%'}}>
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
          <Modal.Title>Write a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {game && <GameCard game={game}/>}
          <Form onSubmit={postReview}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              >
              <Form.Label>Review body</Form.Label>
              <Form.Control as="textarea" rows={6} name="myInput"/>
            </Form.Group> 
            
            <Button variant="secondary" onClick={handleClose}>
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
