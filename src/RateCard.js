import React from 'react';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ReactStars from 'react-stars';
import { GrGamepad } from 'react-icons/gr';


export default function RateCard({ game }) {
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
          <p style={{color: 'white', fontSize: '20px', marginLeft: '35%'}}>Review</p>
          <hr/>
          <p style={{color: 'white', fontSize: '20px', marginLeft: '30%'}}>Add to list</p>
          <hr/>
          <p style={{color: 'white', fontSize: '20px', marginLeft: '37%'}}>Share</p>
          <hr/>
        </Card.Text>
      </Card>
    </>
  )
}
