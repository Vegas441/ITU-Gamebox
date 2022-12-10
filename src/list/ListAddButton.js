import React, {  useState } from 'react';
import { Button } from 'react-bootstrap';

export default function ListAddButton({onAddList}) {
    const [name, setListName] = useState('');
    const [userID, setUserID] = useState('1');


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
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setListName(e.target.value)}
            />
            <Button type="submit" variant="outline-primary" size="sm">Add list</Button>
        </form>
    )
}
