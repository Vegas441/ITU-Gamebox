/**
 * @author Jakub Křivánek (xkriva30)
 */
import React, { useEffect, useState } from "react";
import Lists from "./Lists";
import { Button } from 'react-bootstrap';
import AddListPopup from "./AddListPopup";
import './ListsPage.css';

export default function ListsPage() {
    const [popup, setPopup] = useState(false);
    const [lists, setLists] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/lists')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setLists(data);
        })
    }, [])

    const updateLists = (list) => {
        setLists([...lists, list])
    }

    return (
        <>
        <Button className="add-btn" onClick={() => setPopup(true)} type="submit" variant="outline-primary" size="lg">Add list</Button>
        
        <div class="list-container">
            <h1>Lists</h1>
            { lists && <Lists lists={lists} />}
        </div>        
        <AddListPopup trigger={popup} popup={setPopup} addList={updateLists}></AddListPopup>
        </>
    );
}