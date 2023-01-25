import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Footer from "../../Footer";
import DataLoadingSpinner from "../../DataLoadingSpinner";
import Skeleton from "react-loading-skeleton";
import {useParams} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import SignatureCanva from "../../SignatureCanva";
import styles from "../../styles.module.css";
import SignaturePad from "react-signature-canvas";

window.$ = $;


const Sendboard = ( ) => {
    const params = useParams();
    const [state, setState] = useState('');
    const [title, setTitle] = useState('');
    const [ipInfo, setIpInfo] = useState('');
    const [display_detail, setDisplayDetail] = useState(false);
    const [sendingData, setSendingData] = useState([ ]);
    const [loader, setLoader] = useState(true);
    const [imglist, setImglist] = useState([]);
    const [canDisplay,setCanDisplay]=useState(false);
    const [asAnswer,setAsAnswer]=useState(false);
    const [answer,setAnswer]=useState([]);
    const [agree, setAgree] = useState(false);
    const [isValidataire, setIsValidataire] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [config, setConfig] = useState([]);
    const [widget, setWidget] = useState([]);
    const [signature_url, setSignature_url] = useState([]);
    const [signataire_answer, setSignataire_answer] = useState([]);
    const [usableAnswer, setUsableAnswer] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        var c =canAccessPage()
        if (c){
            getSendingInfo();
            getSignataireWidget();
            $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
                setIpInfo(JSON.stringify(data, null, 2));
            });
        }

    }, [])

    function canAccessPage(){
        var can =localStorage.getItem('already_signed');
        if(can !== null){
            var a = JSON.parse(can)
            if(a.sending===params.idsending && a.signataire===params.signataire){
                setCanDisplay(false)
                return false;
            }
            else{
                setCanDisplay(true)
                return true;
            }
        }
        else{
            setCanDisplay(true)
            return true;
        }
    }

    function getSendingInfo(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/public/'+params.idsending,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    if(response.data.data.is_config===1 || response.data.data.is_config){
                        if(response.data.data.statut[0].name=='EXPIRER'){
                            setCanDisplay(false)
                        }
                        else {
                            setDisplayDetail(true);
                            setSendingData(response.data.data)
                            setTitle(response.data.data["document"][0].title)
                            var f =response.data.data['document']?.[0]?.preview;
                            const myArray = f.split("/");
                            const folder =myArray[0];
                            const n =response.data.data["document"]?.[0]?.nbre_page;
                            var inter = [];
                            for (var i = 1; i <= n; i++) {
                                inter.push({page:i,src:process.env.REACT_APP_BACKEND_ASSET_BASE_URL+"previews/"+folder+'/'+i+'.jpeg'} );
                            }
                            if (response.data.data["configuration"] == null){
                                localStorage.setItem('widgets', JSON.stringify([]));
                            }
                            else{
                                localStorage.setItem('widgets', response.data.data["configuration"]);
                                setConfig(JSON.parse(response.data.data["configuration"]));
                            }

                            setAnswer(JSON.parse(response.data.data["response"]));
                            setImglist(inter);
                        }
                    }
                    else{
                        setDisplayDetail(false);
                    }
                    setLoader(false);
                }
            }).catch(function (error) {
            setDisplayDetail(false);
        });
    }

    function getSignataireWidget(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/bysignataire/public/'+params.idsending+'/'+params.signataire,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    var w = JSON.parse(response.data.data.widget)
                    setWidget(w)
                    if(response.data.data.type ==='Validataire'){
                        setIsValidataire(true)
                    }

                    if(response.data.data.signataire_answer){
                        setAsAnswer(false)
                    }
                    else{
                        setAsAnswer(true)
                    }
                }
            }).catch(function (error) {
            setDisplayDetail(false);
        });
    }

    const displayWidgetLabel =(e) =>{
        var label ='';
        switch(e) {
            case 'name':
                label = 'Prénom';
                break;
            case 'signature':
                label = 'Signature';
                break;
            case 'city':
                label = 'Ville';
                break;
            case 'activity':
                label = 'Profession';
                break;
            case 'last_name':
                label = 'Nom';
                break;
            case 'entreprise':
                label = 'Entreprise';
                break;
            case 'text_field':
                label = 'Zone texte';
                break;
            case 'image':
                label = 'Image';
                break;
            case 'certificat':
                label = 'Entrez votre certificat';
                break;
            default:
            // code block
        }
        return label ;
    }

    const displayForm = (e) =>{
        var text_field = ['name','first_name','last_name','entreprise','city','text_field'];
        var number_field = ['age','number_field'];
        var select_field = [];
        var signature_field = ['signature'];
        var image_field = ['image'];
        var certificat_field = ['certificat'];
        var form = [];
        var distinct_field_type= [];
        {widget.map((s, i) => {
            var cas = '';
            if(text_field.includes(s.type_widget)){
                cas = 'text_field';
                distinct_field_type.push('text_field')
               // distinct_field_type.indexOf('text_field') === -1 ? distinct_field_type.push('text_field') : '';
            }
            if(number_field.includes(s.type_widget)){
                cas = 'number_field';
                distinct_field_type.push('number_field');
            }
            if(select_field.includes(s.type_widget)){
                cas = 'select_field';
                 distinct_field_type.push('select_field');
            }
            if(signature_field.includes(s.type_widget)){
                cas = 'signature_field';
                 distinct_field_type.push('signature_field');
            }
            if(image_field.includes(s.type_widget)){
                cas = 'image_field';
                 distinct_field_type.push('image_field');
            }
            if(certificat_field.includes(s.type_widget)){
                cas = 'certificat_field';
                distinct_field_type.push('certificat_field') ;
            }

            if(howManyTime(distinct_field_type,cas) <= 1){
                switch (cas) {
                    case 'text_field':
                        form.push(<div key={i} className="mb-3">
                            <label htmlFor={'input_'+s.widget_id} className="form-label">{displayWidgetLabel(s.type_widget)}
                                {s.required == 'true' &&  <small className="text-danger mb-2"> *</small>}
                            </label>
                            <input type="text" className="form-control"  value={usableAnswer[s.widget_id]} id={'input_'+s.widget_id} required={s.required === true } data-widget_type={s.type_widget} placeholder="Text" />
                        </div>)
                        break;
                    case 'number_field':
                        form.push(<div  key={i} className="mb-3">
                            <label htmlFor={'input_'+s.widget_id} className="form-label">{displayWidgetLabel(s.type_widget)}
                                {s.required == 'true' &&  <small className="text-danger mb-2"> *</small>}
                            </label>
                            <input type="number" className="form-control" value={usableAnswer[s.widget_id]} id={'input_'+s.widget_id} data-widget_type={s.type_widget} required={s.required === true } placeholder="Text"/>
                        </div>)
                        break;
                    case 'select_field':
                        form.push(<div  key={i} className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Example select
                                {s.required == 'true' &&  <small className="text-danger mb-2"> *</small>}
                            </label>
                            <select className="form-select" data-widget_type={s.type_widget} id="exampleFormControlSelect1" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>)
                        break;
                    case 'signature_field':
                        form.push( <div className="mb-3" key={i}>
                            <label htmlFor={'input_'+s.widget_id} className="form-label">{displayWidgetLabel(s.type_widget)}
                                {s.required == 'true' &&  <small className="text-danger mb-2"> *</small>}
                            </label>
                            <SignatureCanva data-widget_type={s.type_widget} signatureUrl={signature_url} setSignatureUrl={setSignature_url} backgroundColor="#ffffff00" id={'input_'+s.widget_id} key={i} />
                            <span id="signature_error" className="text-danger text-center"></span>
                        </div>)
                        break;
                    case 'image_field':
                        form.push( <div key={i} className="mb-3">
                            <label htmlFor={'input_'+s.widget_id} className="form-label">{displayWidgetLabel(s.type_widget)}
                                {s.required == 'true' &&  <small className="text-danger mb-2"> *</small>}
                            </label>
                            <input className="form-control" type="file" accept="image/*" data-widget_type={s.type_widget} id={'input_'+s.widget_id} required={s.required === true }/>
                            <img id={'img_'+s.widget_id} src={usableAnswer[s.widget_id]} alt=""/>
                        </div>)
                        break;

                    case 'certificat_field':
                        form.push( <div key={i} className="mb-3">
                            <label htmlFor={'input_'+s.widget_id} className="form-label">{displayWidgetLabel(s.type_widget)}
                                {s.required == 'true' &&  <small className="text-danger mb-2"> *</small>}
                            </label>
                            <input className="form-control" type="file" accept="image/*" data-widget_type={s.type_widget} id={'input_'+s.widget_id} required={s.required === true }/>
                        </div>)
                        break;
                    default:
                        return null;
                }
            }

            })}
        return form;
    }

    const howManyTime=(arr,el)=>{
        let count = 0;
        arr.forEach(element => {
            if (element === el) {
                count += 1;
            }
        });
        return count ;
    }

    const fillForm =(e)=>{
        e.preventDefault();
        var answer =[];
        var use_ans=[];
        var ans=[];
        $("#form_answer input").each(function( index ) {
            if($(this).attr('id')!=='confirm'){
                var identifiant  =  $(this).attr('id');
                var widget_type  =  $(this).data('widget_type');
                var id = identifiant.split('input_')[1];
                var part = identifiant.split('_')[2];
                var  val='';
                var el = $( "#label_" + id);
                var drop_elem = $( "#" + id);

               if($(this).attr('type')==='file'){
                   var file = document.getElementById($(this).attr('id')).files[0];

                   var reader = new FileReader();
                   reader.onloadend = function() {
                       val =  reader.result ;
                       answer.push({
                           id: id,
                           value: reader.result,
                       })
                       ans[id] = reader.result;
                      // use_ans.push(ans);
                       //console.log(answer)
                       localStorage.setItem('answer',JSON.stringify(answer))

                       el.html('<img style="width:100% !important;" src="'+reader.result+'">')
                   }
                   reader.readAsDataURL(file);
               }
               else{
                     val = $(this).val();

                     answer.push({
                           id: id,
                           value:val,
                     })
                   ans[id] = val;
                   el.html(val)

                   {widget.map((s,i) => {
                       if(s.type_widget==widget_type){
                           answer.push({
                               id: s.widget_id,
                               value:val,
                           })
                           ans[s.widget_id] = val;
                           var el_1 = $( "#label_" + s.widget_id);
                           var drop_elem_1 = $( "#" + s.widget_id);
                           el_1.html(val)
                           drop_elem_1.css({"background-color":"rgb(245 245 249 / 0%)", "border":"0px"});

                       }
                   })}

                   localStorage.setItem('answer',JSON.stringify(answer))
               }
               drop_elem.css({"background-color":"rgb(245 245 249 / 0%)", "border":"0px"});
            }

        });
        //console.log(answer)
        if(sendingData.type_signature[0].type ==="avanced"){
            if(signature_url===''){
                $('#signature_error').html('La signature est obligatoire')
                console.log('Signature manquante')
            }
            else{
                answer.push({
                    id: 'signature',
                    value:signature_url
                })
                ans['signature'] = signature_url;
                //use_ans.push(ans);
                localStorage.setItem('answer',JSON.stringify(answer))
                $(".drop-item").each(function( index ) {
                    if($(this).data('widget-type') === 'signature'){
                        $(this).css({"background-color":"rgb(245 245 249 / 0%)", "border":"0px"});
                        $(this).html('<img style="width:120% !important;" src="'+signature_url+'">')
                    }
                });

                setSignataire_answer(JSON.stringify(answer));

            }

        }
        setUsableAnswer(ans);
        handleClose();
        changeReadAndOk();
    }

    const sendData=(e)=>{

        if(isValidataire){
            var url = process.env.REACT_APP_API_BASE_URL+'sendings/doc/validate';
        }
        else{
            var url = process.env.REACT_APP_API_BASE_URL+'sendings/doc/signed';
        }

       axios
            .put(url,{
                id_sending : params.idsending,
                id_signataire:params.signataire,
                answer:localStorage.getItem('answer'),
                mobile_info: JSON.stringify({
                    userAgent:window.navigator.userAgent,
                    ipAdress:ipInfo
                }),
            })
            .then(response => {
                if(response.data.success===true){
                    var arr = {
                        sending: params.idsending,
                        signataire: params.signataire
                    }
                    localStorage.setItem('already_signed',JSON.stringify(arr))
                    window['showSuccessToast']('Réponse envoyée avec succès')
                    // setTimeout(() => {
                    //     window.close();
                    // }, 8000)

                }
            }).catch(function (error) {
            if (error.response) {
                console.log('error');
            }
        });
    }

    const revoke=(e)=>{

       axios
            .put(process.env.REACT_APP_API_BASE_URL+'sendings/doc/revoke',{
                id_sending : params.idsending,
                id_signataire:params.signataire,
                mobile_info: JSON.stringify({
                    userAgent:window.navigator.userAgent,
                    ipAdress:ipInfo
                }),
            })
            .then(response => {
                if(response.data.success===true){
                    var arr = {
                        sending: params.idsending,
                        signataire: params.signataire
                    }
                    localStorage.setItem('already_signed',JSON.stringify(arr))
                    window['showSuccessToast']('Document rejeté')
                }
            }).catch(function (error) {
            if (error.response) {
                console.log('error');
            }
        });
    }

    const changeReadAndOk =(e)=>{
        setAgree(!agree);
    }

    const showFilledForm =(e)=>{
        if(isValidataire){
            return;
        }
        var answer = JSON.parse(localStorage.getItem('answer'));
        $.each(answer, function( index, value ) {
            var val = value.value;
            if(val.includes('data:image')){
                if(value.id=='signature'){
                    $('#img_signature').attr('src',usableAnswer[value.id]);
                }
                else{
                    $('#img_'+value.id).attr('src',usableAnswer[value.id]);
                }
            }
            else{
                //console.log('input_'+value.id);
                $('#input_'+value.id).val(usableAnswer[value.id]);
                //$('#input_name_2').val(value.value);
                console.log(usableAnswer[value.id])
            }

        });
        handleShow();
    }

    function getanswerWithId(id){
        $.each(answer, function( index, value ) {
            if(value.id==id){
                return value.value;
            }
        });
    }

    function isTextWidget(widget){
        var text_field = ['name','first_name','last_name','entreprise','city','text_field','age','number_field'];
        var image_field = ['signature','image','certificat'];
        if(text_field.includes(widget)){
            return true;
        }
        else if(image_field.includes(widget)){
           return  false
        }
        else{
            return false ;
        }

    }

    if(canDisplay){
        return (
            <div className='layout-wrapper layout-content-navbar'>
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="mx-5 mt-2" id="general_error"></div>
                        <div className="content-wrapper">
                            <DataLoadingSpinner loader={loader}/>
                            <div className="row"  id="">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8">
                                    <div id="sticky-wrapper" className={`sticky-wrapper  ${isValidataire ? "fixed-top bg-white" : ""}`} >
                                        <div  className="card-header" >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className=""><strong>Document:</strong> {title}</p>
                                                    {isValidataire &&
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox"
                                                                   id="confirm" onChange={changeReadAndOk}/>
                                                            <label className="form-check-label"
                                                                   htmlFor="confirm">J'accepte les termes et <a href=""> condition de la plateforme</a></label>
                                                        </div>
                                                    }

                                                </div>
                                                {asAnswer && !isValidataire &&
                                                <div className="">
                                                    <div className="demo-inline-spacing">
                                                        <button type="button" className="btn btn-primary" id="open_form" onClick={handleShow}>
                                                            Remplir comme un formulaire
                                                        </button>
                                                        <button type="submit" className=" btn btn-success" id="sbt_btn" onClick={sendData}>
                                                            <span className="spinner-border d-none" role="status" aria-hidden="true" id="spinner_btn" />
                                                            Envoyer
                                                        </button>
                                                    </div>
                                                </div>
                                                }
                                                {asAnswer && isValidataire &&
                                                <div className="">
                                                    <div className="demo-inline-spacing">
                                                        <button type="button" className={`btn btn-danger ${agree ? "" : "disabled"}`}  id="revoke" onClick={revoke}>
                                                            Rejeter
                                                        </button>
                                                        <button type="submit" className={`btn btn-success ${agree ? "" : "disabled"}`}  id="sbt_btn" onClick={sendData}>
                                                            <span className="spinner-border d-none" role="status" aria-hidden="true" id="spinner_btn" />
                                                            Valider
                                                        </button>
                                                    </div>
                                                </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={show} onHide={handleClose}  backdrop="static"
                                           keyboard={false}>
                                        <form id="form_answer" onSubmit={fillForm}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Renseigner le formulaire</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="d-flex flex-row-reverse">
                                                    <small className="text-danger">(*) Obligatoire</small>
                                                </div>
                                                <div>
                                                    {displayForm()}
                                                    <div className="form-check form-check-inline mt-3">
                                                        <input className="form-check-input" type="checkbox"
                                                               id="confirm" onChange={changeReadAndOk}/>
                                                            <label className="form-check-label"
                                                                   htmlFor="confirm">J'ai lu et j'approuve</label>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button type="button" className="btn btn-label-secondary"
                                                        onClick={handleClose}>Fermer
                                                </button>
                                                <button className={`btn btn-primary ${agree ? "" : "disabled"}`} type="submit" id="sbt_btn">
                                                <span className="spinner-border d-none" role="status" aria-hidden="true"
                                                      id="spinner_btn"></span>
                                                    Enregistrer
                                                </button>
                                            </Modal.Footer>
                                        </form>
                                    </Modal>

                                    <div className={`  ${isValidataire ? "mt-5" : ""}`} id="main-container" style={{height: "900px", overflowY: "auto",overflowX:"hidden"}} >
                                        <div className="">
                                            <ul className="jss228" id="parent_ul">
                                                {
                                                    imglist.map((l,k)=>  <div key={k} id={"img_page_"+l.page} className="jss255" style={{ overflow: 'auto'}}>
                                                        <div className="jss257">
                                                            <div className="jss262 ">
                                                                <div className="jss263" id={"widget_space_"+l.page} data-page={l.page}>
                                                                    {widget
                                                                        .map((s, i) => {
                                                                            if(l.page==s.page){
                                                                                return (
                                                                                    <div key ={i} onClick={()=>{showFilledForm()}}
                                                                                         className="drop-item form-group"
                                                                                         id={s?.widget_id} data-widget-type={s?.type_widget}
                                                                                         data-signataire={s?.signataire} data-page={s?.page}
                                                                                         data-isrequired={s.required}
                                                                                         style={{ top: `${s.positionY}px`, left: `${s.positionX}px`, width: `${s.width}`,height: `${s.height}`,cursor:'pointer',position:"fixed"}}
                                                                                    >
                                                                                        {
                                                                                            isValidataire && s.required && isTextWidget(s.type_widget) &&
                                                                                            <label id={'label_'+s?.widget_id}>
                                                                                                <p style={{fontSize:`${sendingData.police}px`}} className="text-black">{getanswerWithId(s.id)} </p>
                                                                                            </label>
                                                                                        }
                                                                                        {
                                                                                            isValidataire && s.required && !isTextWidget(s.type_widget) &&
                                                                                            <img style={{width:"100% !important"}} src={getanswerWithId(s.id)} />

                                                                                        }
                                                                                        <label id={'label_'+s?.widget_id}>
                                                                                            <p style={{fontSize:"10px"}} className="text-black">{s.type_widget==='certificat' ? 'Certificat' :displayWidgetLabel(s.type_widget)} </p>
                                                                                        </label>

                                                                                    </div>
                                                                                );
                                                                            }
                                                                            else{
                                                                                return null ;
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {<img className="jss256 "
                                                              src={l.src}
                                                              data-signa="document-editor-container" style={{ width: '753px'}}/> || <Skeleton />}
                                                    </div>)
                                                }
                                                <span style={{fontSize: "0px"}}></span>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-2 col-md-2 col-12">
                                </div>
                            </div>

                            <Footer/>
                            <div className="content-backdrop fade"></div>
                            <a href="#" id="scroll" style={{display: "none"}}><span></span></a>

                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"/>
                <div className="drag-target"/>
            </div>
        );
    }
    else{
        return(
        <h4 className="text-center">Action impossible</h4>
        )
    }

}

export default Sendboard;


