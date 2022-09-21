import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { Confirm } from 'semantic-ui-react'

const UserLeaveConfirmation=(message, callback, confirmOpen, setConfirmOpen)=> {
    const container = document.createElement('div');
    container.setAttribute('custom-confirm-view','')

    const handleConfirm=(callbackState)=>{
        ReactDOM.unmountComponentAtNode(container);
        callback(callbackState);
        setConfirmOpen(true);
    }

    const handleCancel=(callbackState)=>{
        ReactDOM.unmountComponentAtNode(container);
        callback();
        setConfirmOpen(false);
    }

    document.body.appendChild(container)
    ReactDOM.render( <Confirm
        open={confirmOpen}
        header='Quitter cette page'
        content={message}
        centered={false}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
    />,container)
}

export  default  UserLeaveConfirmation ;
