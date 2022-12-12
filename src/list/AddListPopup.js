import React, { useState, useEffect } from 'react'
import { Button} from 'react-bootstrap';
import { DropdownMenu } from './DropdownMenu';
import ListAddButton from './ListAddButton';
import './Popup.css'

function AddGametoListPopup(props) {
    function updateLists(list) {
        props.addList(list);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <Button onClick={() => props.popup(false)} className='close-btn'>close</Button>
                <h3>Add list</h3>   
                <ListAddButton onAddList={updateLists}/>
            </div>
        </div>
    ) : '';
}

export default AddGametoListPopup
