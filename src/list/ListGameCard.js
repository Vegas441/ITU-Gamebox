import React, {useState} from "react";
import "./ListsPage.css"
import { Button } from "react-bootstrap";

export default function ListGameCard(props) {
    const [isHovered, setHover] = useState(false);

    function removeGame() {
        props.removeGame(props.game);
    }

    return (
        <div className="imageContainer"
            onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            { isHovered && props.isOwner && (
                <Button onClick={() => removeGame(props.game)} variant="danger" className="remove-btn" size="sm">Remove</Button>
            )}
            <a href={"/games/" + props.game.id}>
                <img alt={props.game.id} src={props.game.image} className="list-item"/>

            </a>
        </div>
)
}