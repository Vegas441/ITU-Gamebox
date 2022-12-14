/**
 * @author Jakub Křivánek (xkriva30)
 */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function ListCard({ list }) {

  const [user, setUser] = useState(null);

  // Fetch data by id
  useEffect(() => {
    fetch(`http://localhost:8000/userProfiles/${list.userID}`).then(res => {
        return res.json();
    })
    .then(data => {
        setUser(data)
    });
  }, []);

  return (
    <>
    <Link to={`/listpage/${list.id}`} state={{ userID: list.userID}} style={{ textDecoration: 'none' }}>
        <Card style={{ width: '10rem', margin: '15px', backgroundColor: "#445566" }}>
            {/* { game && <Card.Img variant="top" src={game.image} style={{height: '225px'}} />}         */}
        <Card.Body style={{padding: '8px'}}>
            <Card.Text style={{color: '#bbccdd', fontSize: '12px'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    { list.name && <b>{list.name}</b> }
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
                    { user && <img
                    src= {user.image}
                    alt=''
                    width="25"
                    height="25" 
                    style={{borderRadius: '50%', marginRight: '5px'}}
                />}
                {user && <b>{user.name}</b>}
                </div>
                
            </Card.Text>
        </Card.Body>
        </Card>
    </Link> 
    </>
  )
}
