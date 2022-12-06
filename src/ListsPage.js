import React, { useEffect, useState } from "react";
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
        });
    }, [])
    
    return (
        <>
        { lists && <Lists lists={lists} />}
        </>
    );
}