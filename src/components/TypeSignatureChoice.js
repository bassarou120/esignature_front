import axios from "axios";
import React, { useState} from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {decrypt} from "./Helper";
window.$ = $;


const TypeSignatureChoice = ( props) => {
    let id_user = decrypt(localStorage.getItem('userId'));

    const handleChange =  (e) => {
        props.setisdisabled(false);
        props.setchoosesignature(e);



        var type_signature =e

         axios
             .get(process.env.REACT_APP_API_BASE_URL+'models/bysignaturetype/'+id_user+'/'+type_signature+'/user',{
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem('token')
                 }
             })
             .then(response => {
                    if(response.data.success === true){
                        props.setmodels(response.data.data);
                    }
             });

    }
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-md mb-md-0 mb-3">
                    <div className="form-check custom-option custom-option-icon">
                        <label className="form-check-label custom-option-content"
                               htmlFor="customRadioHome">
                                                        <span className="custom-option-body">
                                                            <i className='bx bx-certification'/>
                                                          <span className="custom-option-title">Certifiée</span>
                                                          <small> Signature certifiée </small>
                                                        </span>
                            <input name="customRadioIcon" className="form-check-input"
                                   type="radio" value="1" id="customRadioHome" onChange={e=>handleChange(e.target.value)} />
                        </label>
                    </div>
                </div>
                <div className="col-md mb-md-0 mb-3">
                    <div className="form-check custom-option custom-option-icon">
                        <label className="form-check-label custom-option-content"
                               htmlFor="customRadioOffice">
                                                        <span className="custom-option-body">
                                                            <i className="fa fa-mouse-pointer" aria-hidden="true"/>
                                                          <span className="custom-option-title"> Qualifiée </span>
                                                          <small> Signature qualifiée </small>
                                                        </span>
                            <input name="customRadioIcon" className="form-check-input"
                                   type="radio" value="2" id="customRadioOffice" onChange={e =>handleChange(e.target.value)} />
                        </label>
                    </div>
                </div>
                <div className="col-md mb-md-0 mb-3">
                    <div className="form-check custom-option custom-option-icon">
                        <label className="form-check-label custom-option-content"
                               htmlFor="customRadioSend">
                                                        <span className="custom-option-body">
                                                            <i className='bx bxs-envelope'/>
                                                          <span className="custom-option-title"> Recommander </span>
                                                          <small> Envois recommander </small>
                                                        </span>
                            <input name="customRadioIcon" className="form-check-input"
                                   type="radio" value="3" id="customRadioSend" onChange={e=>handleChange(e.target.value)}/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeSignatureChoice;


