import React, {  useState } from 'react';
import { Button } from 'react-bootstrap';
import currentUser from '../current_user';

export default function ListAddButton({onAddList}) {
    const [name, setListName] = useState('');
    const userID = currentUser.id;


    const handleSubmit = (e) => {
        e.preventDefault();
        const list = { name, userID };

        fetch('http://localhost:8000/lists', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(list)
        })
        .then((response) => response.json())
        .then((data) => {
            onAddList(data);
        });
    }

    return (
        <>
        <div class='popup-container'>
            <form onSubmit={handleSubmit}>
                <div className='popup-div'>
                    <h3>List name</h3>
                </div>
                <div className='popup-div'>
                    <input
                            className='list-name-input'
                            type="text" 
                            required 
                            value={name}
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </div>                
                    <div className='popup-div'>
                        <Button type="submit" variant="outline-primary" size="sm">Add list</Button>
                </div>
            </form>
        </div>
        </>   
    )
}
