import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Sidebar from "../../Sidebar";
import NavB from "../../Nav";
import Footer from "../../Footer";
import DataLoadingSpinner from "../../DataLoadingSpinner";
import Skeleton from "react-loading-skeleton";
import {useParams} from "react-router-dom";
window.$ = $;


const Sendboard = ( ) => {
    const params = useParams();
    const [state, setState] = useState('');
    const [title, setTitle] = useState('');
    const [display_detail, setDisplayDetail] = useState(false);
    const [sendingData, setSendingData] = useState([ ]);
    const [loader, setLoader] = useState(true);
    const [imglist, setImglist] = useState([]);
    const [is_required,setIs_required]=useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [config, setConfig] = useState([]);
    const [widget, setWidget] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getSendingInfo();
        getSignataireWidget();
    } )

    function getSendingInfo(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/'+params.idsending,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    if(response.data.data.is_config===1 || response.data.data.is_config){
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
                        setImglist(inter);
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
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/bysignataire/'+params.idsending+'/'+params.signataire,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setWidget(response.data.data.widget)
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
            default:
            // code block
        }
        return label ;
    }

    return (
        <div className='layout-wrapper layout-content-navbar'>
            <div className="layout-container">
                <div className="layout-page">
                    <div className="mx-5 mt-2" id="general_error"></div>
                    <div className="content-wrapper">
                        {/* Start Content*/}
                        <DataLoadingSpinner loader={loader}/>
                        <div className="row"  id="">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-8">
                                <div id="sticky-wrapper" className="sticky-wrapper" >
                                    <div  className="card-header" >
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="card-title mb-sm-0">{title}</p>
                                            </div>

                                                <div className="">
                                                    <button type="submit" className="btn btn-primary" id="sbt_btn">
                                                        <span className="spinner-border d-none" role="status" aria-hidden="true" id="spinner_btn" />
                                                        Enregistrer
                                                    </button>
                                                </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="" id="main-container" style={{height: "900px", overflowY: "auto",overflowX:"hidden"}} >
                                    <div className="">
                                        <ul className="jss228" id="parent_ul">
                                            {
                                                imglist.map((l,k)=>  <div key={k} id={"img_page_"+l.page} className="jss255 dropzone">
                                                    <div className="jss257">
                                                        <div className="jss262 ">
                                                            <div className="jss263 widget_space" id={"widget_space_"+l.page} data-page={l.page}>
                                                                {config
                                                                    .map((s, i) => {
                                                                        if(l.page===s.page){
                                                                            return (
                                                                                <div key ={i}
                                                                                     className="drop-item form-group"
                                                                                     id={s?.widget_id} data-widget-type={s?.type_widget}
                                                                                     data-signataire={s?.signataire} data-page={s?.page}
                                                                                     data-isrequired={s.required}
                                                                                     style={{ top: `${s.positionY}px`, left: `${s.positionX}px`, width: `${s.width}`,height: `${s.height}`}}

                                                                                >
                                                                                    <label><p style={{fontSize:"10px"}}
                                                                                              className="text-white">{displayWidgetLabel(s.type_widget)}</p>
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
                                                          data-signa="document-editor-container" width="98%"/> || <Skeleton />}
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
                        {/* End Content*/}
                        <Footer/>
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"/>
            <div className="drag-target"/>
        </div>
    );
}

export default Sendboard;


