import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import strings from "./Translation/Translation";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import TypeSignatureChoice from "./TypeSignatureChoice";
import {decrypt} from './Helper'
import store from "../store";
import {changeModal} from "../actions";
import $ from 'jquery';
import {Modal} from "bootstrap";
window.$ = $;


const ModalChoice = () => {
    const [is_disabled, setIsDisabled] = useState(true);
    const [file, setFile] = useState([]);
    const [choose_signature, setChooseSignature] = useState('');
    const [state, setState] = useState('');
    const [models, setModels] = useState([ ]);
    const [id, setId] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const splitloc = window.location.href.split("/");
    const lk= splitloc[splitloc.length -1];

    useEffect(() => {
        const script = document.createElement("script");
        script.src = '../assets/js/validation/modal.js';
        document.body.appendChild(script);
        getModels();
    }, [])

    let id_user=decrypt(localStorage.getItem('userId'));

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    window.store = store;
    window.changeModal = changeModal;
    const s= store.getState();

    const history = useHistory();

    const chooseSignatureSubmit = (e) => {
        e.preventDefault();

        $('#spinner_btn').removeClass('d-none');
        $('#sbt_btn').prop("disabled", true);

        const data = new FormData()

        data.append('document', file)
        data.append('id_type_signature', choose_signature)
        data.append('register_as_model', s)

        if(s===0){
            var Item_id=0;
            $( ".jss137:checked" ).each(function( index ) {
                 Item_id= $( this ).val();
            });
            data.append('model_id', Item_id)
        }

        axios
            .post( process.env.REACT_APP_API_BASE_URL +'sendings', data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    $('#chooseSignatureType').trigger("reset");
                   // $('#add_group_modal').modal('hide');
                    window['showSuccessToast']('Opération réussie !!');
                    var id=  response.data.data.id;
                    $('#modal_error_ul').html('');
                    $('#modal_error').addClass('d-none');
                    setState(s);
                    //history.push('/sending/'+id,state)
                    //setId(id)
                    var  p ='';
                    if ( s===1){
                        p = 'new_model';
                    }
                    else{
                        p = 'new_sending_request';
                    }
                     window.location.href = "/sending/"+id+"?from="+p;
                     //history.push("/sending/"+id+"?from="+p)

                }
                else{
                    console.log('error');
                }
            }).catch(function (error) {
            if (error.response) {
                if(error.response.status===400){
                    $('#modal_error_ul').html('');
                    $('#modal_error').removeClass('d-none');
                    $.each(error.response.data.data, function (key, value) {
                        $('#modal_error_ul').append('<li class="list-group-item">' + value + '</li>');
                    });
                }
                $('#spinner_btn').addClass('d-none')
                $('#sbt_btn').prop("disabled", false);
            }
        }).finally(function(){
            setTimeout(function(){

            } ,200);

        });
    };

     function getModels() {
        axios
            .get(process.env.REACT_APP_API_BASE_URL + 'models/' + id_user + '/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
            )
            .then(response => {
                if (response.data.success === true) {
                    setModels(response.data.data);
                }
            });
    }

    function truncate(input) {
        if (input.length > 5) {
            return input.substring(0, 5) + '...';
        }
        return input;
    };
    return (
        <div className="modal-onboarding modal fade animate__animated" id="onboardingSlideModal" tabIndex="-1"
             aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content text-center">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div id="modalCarouselControls" className="carousel slide pb-4 mb-2" data-bs-interval="false">
                        <div className="onboarding-content">
                            <div className="text-center mb-4">
                                <h3 className="address-title text-black">{strings.type_signature}</h3>
                                <p className="address-subtitle">{strings.do_choice} </p>
                            </div>
                            <div className="alert alert-danger d-none" role="alert" id="modal_error">
                                <ul className="list-group" id="modal_error_ul">
                                    <li className="list-group-item"></li>
                                </ul>
                            </div>
                            <form id="chooseSignatureType" onSubmit={chooseSignatureSubmit} className="row g-3"  encType="multipart/form-data">
                                <div className="nav-align-top mb-4">
                                    <TypeSignatureChoice
                                        isdisabled={is_disabled} setisdisabled={setIsDisabled}
                                        chooseSignature={choose_signature} setchoosesignature={setChooseSignature}
                                        models={models} setmodels={setModels}
                                    />
                                    {lk ==='model' || s.is_model_popup===1 ?  <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label"></label>
                                        <input className="form-control" type="file" onChange={handleChange} id="pdf_file" name="pdf_file" accept=".PDF,.pdf" />
                                    </div> : <div>
                                        <ul className="nav nav-tabs nav-fill" role="tablist">
                                            <li className="nav-item">
                                                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab"
                                                        data-bs-target="#navs-justified-home" aria-controls="navs-justified-home"
                                                        aria-selected="true"> Ordinateur <span
                                                    className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger"></span>
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab"
                                                        data-bs-target="#navs-justified-profile"
                                                        aria-controls="navs-justified-profile" aria-selected="false">
                                                    Models
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane fade active show" id="navs-justified-home" role="tabpanel">
                                                <div className="list-group text-center">
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <label htmlFor="formFile" className="form-label"></label>
                                                            <input className="form-control" type="file" onChange={handleChange} id="pdf_file" name="pdf_file" accept=".PDF,.pdf" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="navs-justified-profile" role="tabpanel">
                                                <div className="mb-3 row">
                                                    {models.length === 0 &&
                                                    <h5 className="text-center mt-2">
                                                        Vous n'avez aucun models.
                                                    </h5>
                                                    }
                                                    {models.map((l, k) =>  <div key={k} className="col-md-2 jss109">
                                                            <div className="jss121 jss132 ">
                                                        <span className="jss128">
                                                            <span  className="MuiButtonBase-root MuiIconButton-root jss134 MuiCheckbox-root jss129 MuiCheckbox-colorPrimary jss135 Mui-checked jss129 MuiIconButton-colorPrimary"
                                                                   aria-disabled="false" data-signa={"template-checkbox-#"+l.document[0].title}>
                                                                   <span className="MuiIconButton-label">
                                                                <input name="radiomodel" id={"radiomodel_"+l.id} className="jss137" type="radio" data-indeterminate="false" value={l.id}/>
                                                                </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                </span>
                                                            </span>
                                                                <div className="jss123">
                                                                    <img className="jss124" src={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+"previews/"+l.document[0].preview}/>
                                                                </div>
                                                                <div className="jss125">
                                                                    <span className="jss126" title={"#"+l.document[0].title}>{l.document[0].title}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>

                                <div className="col-12 text-center">
                                    <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="modal"
                                            aria-label="Close">Annuler
                                    </button>
                                    <button type="submit"  className={"btn btn-primary me-sm-3 me-1 " + (is_disabled ? ' disabled' : '')} id="sbt_btn">
                                        <span className="spinner-border d-none" role="status" aria-hidden="true" id="spinner_btn"/>
                                        Continuer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalChoice;


