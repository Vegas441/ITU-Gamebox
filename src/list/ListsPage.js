import React, { useEffect, useState } from "react";
import ListAddButton from "./ListAddButton";
import Lists from "./Lists";


export default function ListsPage() {

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
        <ListAddButton onAddList={updateLists}/>
        <h1 style={{color: 'white', fontSize: '36px', textAlign: 'center', marginTop: '10%', fontWeight: 'normal'}}>My Lists</h1>
        { lists && <Lists lists={lists} />}
        </>
    );
}