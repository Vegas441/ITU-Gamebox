import React from "react";
import { useParams } from "react-router-dom";

// TODO: fetch review object from data 
export default function ReviewPage() {
    let { id } = useParams()
    return (
        <>
            <h1 style={{color: 'white'}}> {id} </h1>
        </>
    )
}