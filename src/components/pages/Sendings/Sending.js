import axios from "axios";
import Tagify from '@yaireo/tagify'
import React, {useEffect, useState, useCallback, useRef, useId} from "react";
import {Link, Prompt, useHistory, useParams} from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import {Button} from "bootstrap";
import DataLoadingSpinner from "../../DataLoadingSpinner";

window.$ = $;

const Sending = (props) => {
    const [sendingParameter, setSendingParameter] = useState([]);
    const [sendingData, setSendingData] = useState([ ]);
    const [widgetBySignataire, setwidgetBySignataire] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [state, setState] = useState('');
    const [title, setTitle] = useState('');
    const [display_detail, setDisplayDetail] = useState(false);
    const [imglist, setImglist] = useState([]);
    const [promptThing, setPromptThing] = useState(false);
    const [newwidget, setNewwidget] = useState(0);
    // const [widget, setWidget] = useState([]);
    const [widget_id,setWidget_id]=useState('');
    const [is_required,setIs_required]=useState(false);
    const [police,setPolice]=useState(12);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const from = urlParams.get('from')
    const [config, setConfig] = useState([]);
    const [signataireList, setSignataireList] = useState('Signataire1');
    const [jvexec, setJvexec] = useState(0);
    const [loader, setLoader] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showOption, setShowOption] = useState(false);
    const handleCloseOption = () => setShowOption(false);
    const handleShowOption = () => setShowOption(true);

    const TagifyEmailListEl = document.querySelector("#TagifyEmailList");
    const TagifyEmailList = new Tagify(TagifyEmailListEl, {
        callbacks: {
            invalid: (e) => {},
            "change": (e) => {
               // console.log('change',e)
                if(e.type !=='add' || e.type !=='remove'){
                    var listOfSignataire = JSON.parse(localStorage.getItem('signataires')),newTagValue = JSON.parse(e.detail.value),oldvalAndNew ={
                        oldval:'',
                        newval:''
                    } ;
                    if( listOfSignataire!== null  && listOfSignataire.length !==0){
                        var is_found = 0
                        $.each(listOfSignataire, function( index, value ) {
                            if(value !== newTagValue[index].value){
                                listOfSignataire[index]= newTagValue[index].value;
                                oldvalAndNew.newval= newTagValue[index].value;
                                oldvalAndNew.oldval=value;
                                is_found =1;
                            }
                        });
                        if(is_found===0){
                            listOfSignataire.push(newTagValue[newTagValue.length-1].value)
                        }
                        $( ".drop-item" ).each(function( index ) {
                            if($(this).attr('data-signataire')===oldvalAndNew.oldval){
                                $(this).attr('data-signataire',oldvalAndNew.newval);
                            }
                        });
                        updateNewVersion()
                        setSignataireList(listOfSignataire);
                        localStorage.setItem('signataires',JSON.stringify(listOfSignataire));
                    }
                }
            },
            "remove": (e) => {

                $( ".drop-item" ).each(function( index ) {
                    if($(this).attr('data-signataire')===e.detail.data.value){
                        removeWidget($(this).attr('id'));
                    }
                });

                var s =JSON.parse(localStorage.getItem('signataires')) ;
                if(s !== null && s.length !== 0 ){
                    $.each(s, function( index, value ) {
                        if(value === e.detail.data.value){
                           // console.log('here')
                            s = s.slice(0, index)
                        }
                    });
                }
                setSignataireList(s);
                localStorage.setItem('signataires',JSON.stringify(s));
                updateNewVersion();
            },
            "add":(e)=>{
                //console.log('add',e)
            }

        },
        hooks: {
            beforeRemoveTag : function( tags ){
                return new Promise((resolve, reject) => {
                    window.Swal.fire({
                        title: 'Etes vous sûr ?',
                        text: "Supprimer ce signataire, supprimera également tous les widgets de celui-ci!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Continuer!',
                        customClass: {
                            confirmButton: 'btn btn-primary me-1',
                            cancelButton: 'btn btn-label-secondary'
                        },
                        buttonsStyling: false
                    }).then(function(result) {
                        if (result.value) {
                            resolve()
                        }
                        else{
                            reject()
                        }
                    });

                })
            }
        },
        dropdown: {
            position: "text",
            enabled: 1
        }
    });

    var implement_widget_count=0;

    useEffect(() => {

        if(jvexec===1){
            var array_of_signataire = JSON.parse(localStorage.getItem('signataires'));
            if(array_of_signataire.length !== 0 ){
                TagifyEmailList.addTags(JSON.parse(localStorage.getItem('signataires')))
            }
            $('body tag').first().addClass('the_selected_tag');

            $('body .drag').draggable({
                appendTo: 'body',
                helper: 'clone',
                containment: "#dragArea",
            });

            localStorage.removeItem('widgets');
        }

        $('#addNewTag').click(function(){
            onAddButtonClick();
        })

        $('.dropzone').droppable({
            activeClass: 'active',
            hoverClass: 'hover',
            accept: ":not(.ui-sortable-helper),.drop-item", // Reject clones generated by sortable
            drop: function (e, ui) {
                var $this = $(this);
                var page = $(this).find( ".widget_space" ).data('page');
                var parentPos = $this.parent().position(), x = ui.position.left - parentPos.left;
                var  y = $this.position().top / 2

                //console.log(ui.position.top);
                y= Math.abs(y)
               // var this_number = newwidget + 1;
                var this_number = implement_widget_count + 1;
               // console.log(implement_widget_count)
                var drop_item_id= ui.draggable.attr('data-name')+'_'+this_number;

                if(ui.draggable.hasClass('draggable_field')){
                    if (sendingData["type_signature"]?.[0]?.type==='avanced'){
                        if (ui.draggable.attr('data-name')==='signature'){
                            var  required=true
                        }
                        else{
                            var required =false
                        }
                    }else{
                        var required =false
                    }
                    if (sendingData["type_signature"]?.[0]?.type==='simple'){
                        if (ui.draggable.attr('data-name')==='certificat'){
                            var  required=true
                        }
                        else{
                            var required =false
                        }
                    }else{
                        var required =false
                    }
                    var $el = $('<div class="drop-item form-group" id="'+drop_item_id+'" data-widget-type="'+ui.draggable.attr('data-name')+'" data-signataire="'+$('.the_selected_tag').first().attr('title')+'" data-page="'+page+'" data-isrequired="'+required+'" style="top:'+y+'px;left: '+x+'px " ><label><p  style="font-size: 12px" class="text-white" ><b> ' + ui.draggable.text() + '</b></p></label></div>');
                    $el.append($('<button type="button" class="remove"><span class="fa fa-close"></span></button>').click(function () { $(this).parent().detach();updateNewVersion(); disabled_submit_btn(); this_number--; }));
                    $(this).find( ".widget_space" ).append($el);
                    makeItemDraggableAnd('#'+drop_item_id);
                    $( '#'+drop_item_id ).draggable( "option", "containment", $this );
                    setNewwidget(newwidget + 1)
                    implement_widget_count++;
                }

                updateNewVersion()
                disabled_submit_btn();
            }
        })

        makeItemDraggableAnd();

        disabled_submit_btn();

            getSendingInfo();
            getSendingParameter();
            getSignataire();

            if(JSON.parse(localStorage.getItem('widgets')) !== null){
                if(JSON.parse(localStorage.getItem('widgets')).length !== 0){
                    setConfig(JSON.parse(localStorage.getItem('widgets')));
                    makeItemDraggableAnd();
                }
            }

            $('body').on('click', 'tag', function(e) {
                e.stopPropagation();
                $( "tag" ).each(function( index ) {
                    $(this).removeClass('the_selected_tag');
                    $(this).find('.tagify__tag-text').css('color','')
                });
                $(this).addClass('the_selected_tag');
                $(this).find('.tagify__tag-text').first().css('color','#1621ab')
                var title = $(this).attr('title');

                // var c = $('.drop-item[data-signataire!="'+title+'"]');
                activateDraggableItem(title);
                disabled_submit_btn();
            })

            $('body tag').first().addClass('the_selected_tag');

            if($('body tag').length===1){
                $('body tag').first().addClass('the_selected_tag');
            }

            window.addEventListener("unload", (event) => {
                localStorage.removeItem('widgets');
            });

    }, [jvexec])

    const activateDraggableItem=(ttle)=>{
        var c = $('body .drop-item');

        c.each(function( index ) {
            var  id = $( this ).attr('id');
          //  makeItemDraggableAnd('#'+id);
          //   $('#'+id).draggable({
          //       addClasses: false,
          //       scroll: true,
          //       scrollSensitivity: 50,
          //       scrollSpeed: 50
          //   })
            if($(this).attr('data-signataire')==ttle){

                if($(this).hasClass('disabled_widget')){
                    $(this).removeClass('disabled_widget');
                }
                $( '#'+id  ).draggable( "option", "disabled", false );
            }
            else{
                if(!$(this).hasClass('disabled_widget')){
                    $(this).addClass('disabled_widget');
                }
                $( '#'+id  ).draggable( "option", "disabled", true );
            }
        });
    }

    const makeItemDraggableAnd = (el) =>{
        $( "body .drop-item" ).resizable({
            containment: ".dropzone",
            maxHeight: 250,
            maxWidth: 350,
            stop: function( event, ui ) {
                updateNewVersion();
            }
        })
         .draggable({
            addClasses: false,
            scroll: true,
            scrollSensitivity: 100,
            scrollSpeed: 100,
            containment: ".dropzone"
        })
        .dblclick(function(e){
            setWidget_id($(this).attr('id'));
           // var r= widget.find(x => x.widget_id === $(this).attr('id')).required
            if(typeof($(this).attr('data-isrequired'))==='string' && $(this).attr('data-isrequired')==='true' ){
                var r = true;
            }
            else{
                var r = false;
            }
            setIs_required(r);
            handleShowOption()
        });
        $(el).draggable({
            addClasses: false,
            scroll: true,
            scrollSensitivity: 50,
            scrollSpeed: 50
        })
    }

    const alertUser = e => {
         e.preventDefault();
        handleShow();
    }

    const userLeavingPage = e => {
        e.preventDefault();
        if((sendingData.register_as_model===0 || sendingData.register_as_model===false) && (sendingData.is_registed===0 || sendingData.is_registed===false)){
            axios
                .delete(process.env.REACT_APP_API_BASE_URL+'sendings/'+id,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    handleClose();
                    localStorage.removeItem('widgets');
                    localStorage.removeItem('signataires');
                    window.history.back()
                }).catch(function (error) {
                if (error.response) {
                    console.log('error');
                }
            });
        }
    }

    const handleEndConcert = async () => {
      if(sendingData["is_registed"]===0){
                axios
                    .delete(process.env.REACT_APP_API_BASE_URL+'sendings/'+id,{
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        if(response.data.success === true){
                            if(from){
                                if(from==='new_model'){
                                    window.location.href='/model'
                                }
                                else{
                                    window.location.href='/listingsending/pending'
                                }
                            }
                            else{
                                window.location.href='/home'
                            }
                        }
                        else{
                            console.log('error')
                        }
                    }).catch(function (error) {
                });
            }
    }

    const history = useHistory();

    const  { id } = useParams();

    function getSendingParameter(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'activatedsendparameters',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    setSendingParameter(response.data.data)
                }
            });
    }

    function getSendingInfo(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    if(response.data.data.is_config===1 || response.data.data.is_config){
                        setDisplayDetail(false);
                    }
                    else{
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
                        localStorage.removeItem('widgets');
                        if (response.data.data["configuration"] == null){
                            localStorage.setItem('widgets', JSON.stringify([]));
                        }
                        else{
                            localStorage.setItem('widgets', response.data.data["configuration"]);
                            setConfig(JSON.parse(response.data.data["configuration"]));
                            var arr = [];
                            if(JSON.parse(response.data.data["configuration"]).length !== 0){
                                $.each(JSON.parse(response.data.data["configuration"]), function( index, value ) {
                                    const words = value.widget_id.split('_');
                                    arr.push(parseInt(words[1]));
                                });
                                implement_widget_count = Math.max.apply(Math, arr) ? Math.max.apply(Math, arr) : 0 ;
                            }
                        }
                        setImglist(inter);
                    }
                    setLoader(false);
                }
            }).catch(function (error) {
            setDisplayDetail(false);
        });
    }

    function getSignataire(){
        axios
            .get(process.env.REACT_APP_API_BASE_URL+'sendings/get/all/signataire/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success === true){
                    if(response.data.data.length !==0){
                        var arr = [],a = response.data.data,s='' ;
                        $.each(a, function( index, value ) {
                           arr.push(value.name);
                           if(index === 0){
                               s = value.name ;
                           }
                           else{
                               s = s+','+value.name;
                           }
                        });
                        setSignataireList(s);
                        localStorage.setItem('signataires', JSON.stringify(arr));
                    }
                    else{
                        localStorage.setItem('signataires', JSON.stringify(['Signataire1']));
                    }
                }
            }).catch(function (error) {
            setDisplayDetail(false);
        });
    }

    const handleInputChange = (event) => {};

    const btn_text = () =>{
        if(sendingData.register_as_model===1 || sendingData.register_as_model){
            return 'Enregistrer le model';
        }
        else{
            return 'Configurer l\'envoi';
        }
    }

    const model_name_field = () =>{
        if(sendingData.register_as_model){
            return (<div className="row mt-1">
                <div className="col-md-4 mb-3">
                    <label htmlFor="name" className="form-label">Nom du model </label>
                    <input type="text" id="title" name="title" className="form-control" value={title}  onChange ={e => setTitle(e.target.value)} />
                </div>
            </div>);
        }
    }

    const addSignataireForm = () =>
    {
        updateNewVersion();
       // updateWidgetRequest(id,localStorage.getItem('widgets'));
        updateSignataireRequest(id);
        setState($('#TagifyEmailList').val())
        if(sendingData.register_as_model===1 || sendingData.register_as_model===true ){
            window['startspinner']();
            axios
                .post(process.env.REACT_APP_API_BASE_URL+'sendings/confirm/model/registration/'+id,{
                    title:title
                },{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if(response.data.success === true){
                        window['endspinner']();
                        window['showSuccessToast']('Opération réussie !!')
                        localStorage.removeItem('signataires');
                        localStorage.removeItem('widgets');
                        window.location.href = "/model";
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
                    }else{
                        window['showErrorToast']('Erreur')
                    }
                    window['endspinner']();
                }
            });
        }
        else{
            localStorage.setItem('signataires',$('#TagifyEmailList').val())
            localStorage.setItem('signature_type',sendingData.type_signature[0].type)
            history.push('/more/configuration/'+id,state);
        }

    }

    function removeWidget(e){
        $('#'+e).remove();
        disabled_submit_btn();
        setNewwidget(newwidget-1)
        implement_widget_count--;
        updateNewVersion();
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

    function disabled_submit_btn(){

        if(sendingData["type_signature"]?.[0]?.type==='avanced'){
            var signataires = [] ;

            if(typeof($('#TagifyEmailList').val()) !== 'undefined'){
                try {
                    signataires=  JSON.parse($('#TagifyEmailList').val());
                } catch (e) {
                    var json = '[{"value":"'+$('#TagifyEmailList').val()+'"}]';
                    signataires= JSON.parse(json);
                }
            }
            else{
                signataires= [];
            }
            var count_signature_widget =[];
            $( ".widget_space" ).each(function( index ) {
                //  var w = $(this).find(".drop-item [data-widget-type='signature']");

                var w = $(this).find(".drop-item").filter(function( index ) {
                    return $(this).attr('data-widget-type') === 'signature';
                })
                    .each(function( index ) {
                        var s = $(this).attr('data-signataire')
                        $.each( signataires, function( key, value ) {
                            if(s===value.value){
                                if (!count_signature_widget.includes(value.value)) {
                                    count_signature_widget.push(value.value);
                                }
                            }
                        });
                    });
            });

            if(count_signature_widget.length !== signataires.length){
                $('#error').removeClass('d-none')
                $('#more_config_btn').attr('disabled',true)
            }
            else{
                $('#error').addClass('d-none')
                $('#more_config_btn').attr('disabled',false)
            }

        }

        if(sendingData["type_signature"]?.[0]?.type==='simple'){
            var signataires = [] ;

            if(typeof($('#TagifyEmailList').val()) !== 'undefined'){
                try {
                    signataires=  JSON.parse($('#TagifyEmailList').val());
                } catch (e) {
                    var json = '[{"value":"'+$('#TagifyEmailList').val()+'"}]';
                    signataires= JSON.parse(json);
                }
            }
            else{
                signataires= [];
            }
            var count_signature_widget =[];
            $( ".widget_space" ).each(function( index ) {
                //  var w = $(this).find(".drop-item [data-widget-type='signature']");

                var w = $(this).find(".drop-item").filter(function( index ) {
                    return $(this).attr('data-widget-type') === 'certificat';
                })
                    .each(function( index ) {
                        var s = $(this).attr('data-signataire')
                        $.each( signataires, function( key, value ) {
                            if(s===value.value){
                                if (!count_signature_widget.includes(value.value)) {
                                    count_signature_widget.push(value.value);
                                }
                            }
                        });
                    });
            });

            if(count_signature_widget.length !== signataires.length){
                $('#error').removeClass('d-none')
                $('#more_config_btn').attr('disabled',true)
            }
            else{
                $('#error').addClass('d-none')
                $('#more_config_btn').attr('disabled',false)
            }

        }
    }

    function getStateVal(ele){
        if(typeof(ele) !== 'undefined'){
            try {
                return  JSON.parse(ele);
            } catch (e) {
                var json = '[{"value":"'+ele+'"}]';
                return JSON.parse(json);
            }
        }
        else{
            return [];
        }
    }

    const submitOptionForm = (e)=>{
        e.preventDefault();
        $('#'+widget_id).attr('data-isrequired');
        updateNewVersion();
        handleCloseOption()
    }

    const updateState = (id_w,data) => {
        var in_array = 1;
        var widget = JSON.parse(localStorage.getItem('widgets'))
        var theNewWidget = '';
        if(!Array.isArray(widget)){
            return;
        }
        if(widget.length > 0){
            const newState = widget.map(obj => {
                if (obj.widget_id === id_w) {

                        obj['widget_id']= id_w;

                    if(data.page !== undefined && data.page !== null){
                        obj['page']= data.page;
                    }

                    if(data.positionX !== undefined && data.positionX !== null){
                        obj['positionX']= data.positionX;
                    }

                    if(data.positionY !== undefined && data.positionY !== null){
                        obj['positionY']= data.positionY;
                    }

                    if(data.type_widget !== undefined && data.type_widget !== null){
                        obj['type_widget']= data.type_widget;
                    }

                    if(data.height !== undefined && data.height !== null){
                        obj['height']= data.height;
                    }

                    if(data.width !== undefined && data.width !== null){
                        obj['width']= data.width;
                    }

                    if(data.signataire !== undefined && data.signataire !== null){
                        obj['signataire']= data.signataire;
                    }

                    if(data.required !== undefined && data.required !== null){
                        obj['required']= data.required;
                    }
                    return obj ;
                   // return {...obj,data};
                }
                else{
                    in_array = 0;
                }
                return obj;
            });

            if(in_array===0){
                var  new_array = widget.push(data);
               // setWidget(new_array);
                localStorage.setItem('widgets',JSON.stringify(new_array))
                theNewWidget =  JSON.stringify(new_array);
            }else{
               // setWidget(newState);
                localStorage.setItem('widgets',JSON.stringify(newState))
                theNewWidget =  JSON.stringify(newState);

            }
        }
        else{
            var  i = widget;
            i.push(data);
            //setWidget(i)
            localStorage.setItem('widgets',JSON.stringify(i))
            theNewWidget =  JSON.stringify(i);

        }
       // console.log('update',localStorage.getItem('widgets'))
        updateWidgetRequest(id,theNewWidget);
    };

    function updateWidgetRequest(id,data){
        axios
            .put(process.env.REACT_APP_API_BASE_URL+'sendings/add/widget/'+id,{
                widget : data,
                id:id
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success===true){
                   // console.log('Enregistrement réussi')
                }
                else{
                    console.log('Error de l\'enregistrement')
                }
            }).catch(function (error) {
            if (error.response) {
                console.log('error');
            }
        });
    }

    const updateSignataireRequest=(id)=>{
        var ar = JSON.parse(localStorage.getItem('widgets'));
        var  result = ar.reduce(function (r, a) {
            r[a.signataire] = r[a.signataire] || [];
            r[a.signataire].push(a);
            return r;
        }, Object.create(null));

        axios
            .put(process.env.REACT_APP_API_BASE_URL+'sendings/add/signataires/'+id,{
                signataires : $('#TagifyEmailList').val(),
                sign_widget:JSON.stringify(result),
                police:police,
                id:id
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if(response.data.success===true){
                   // console.log('Enregistrement réussi')
                }
            }).catch(function (error) {
            if (error.response) {
                console.log('error');
            }
        });
    }

    const updateNewVersion=()=>{
        var allWidget = [];
        $( ".drop-item" ).each(function( index ) {
            allWidget.push({
                widget_id: $(this).attr('id') ,
                page: $(this).attr('data-page')  ,
                positionX: $(this).position().left ,
                positionY: $(this).position().top ,
                type_widget: $(this).attr('data-widget-type') ,
                height:$(this).css("height") ,
                width: $(this).css("width"),
                signataire : $(this).attr('data-signataire'),
                required: $(this).attr('data-isrequired')
            })
        });
        var str_conf = JSON.stringify(allWidget);
        localStorage.setItem('widgets',str_conf)
        updateWidgetRequest(id,str_conf);
    }

    function onAddButtonClick() {
        TagifyEmailList.addEmptyTag();
    }

    useEffect(() => {
       // $( function(e) {
        setTimeout(() => {
            const TagifyEmailListEl1 = document.querySelector("#TagifyEmailList");
            const button = TagifyEmailListEl1.nextElementSibling; // "add new tag" action-button
            setJvexec(1)
        }, 500);
       // } );
    });


    if(loader===true){
        return (<div className="d-flex justify-content-center">
            <div className={`spinner-grow text-primary text-center ${loader ? "" : "d-none"}`}  role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
    }
    else{
        if(display_detail){
            return (
                <div className="m-4">
                    <a href="#" className="btn btn-default" id="back" onClick={alertUser}>
                        <span className="fa fa-arrow-left mr-1"></span>
                        Retour
                    </a>

                    <Modal
                        show={show} onHide={handleClose} animation={false}
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Confirmation
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center">Voulez-vous vraiment quitter cette page ?
                                <small>Vous perdrez vos configuration</small>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-label-secondary btn-sm"
                                    onClick={handleClose}>Fermer
                            </button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={userLeavingPage}>Ok</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={showOption} onHide={handleCloseOption} animation={true}
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Option du widget
                            </Modal.Title>
                        </Modal.Header>
                        <form id="optionForm" onSubmit={submitOptionForm}>
                        <Modal.Body>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="nameSmall" className="form-label">ID Widget</label>
                                    <input type="text" id="widgetId" className="form-control" readOnly value={widget_id} onChange ={e => setWidget_id(e.target.value)} />
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="form-check mt-3">
                                    <input className="form-check-input" type="checkbox" onChange ={e => setIs_required(!is_required)} id="field_is_required" checked={is_required} />
                                    <label className="form-check-label" htmlFor="field_is_required">
                                        Obligatoire ?
                                    </label>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-sm btn-label-secondary"
                                    onClick={handleCloseOption}>Fermer
                            </button>
                            <button type="submit" className="btn btn-primary btn-sm">Enregistrer</button>
                        </Modal.Footer>
                        </form>
                    </Modal>

                    <div id="error" className='d-none'>
                        <div className="alert alert-info" role="alert">
                            Pour chaque signataire, au moins un widget de signature est require
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <h4 className="fw-bold py-1 ">
                            <span className="text-muted fw-light">Configuration des emplacements de signature</span>
                        </h4>

                        <div className="">
                            <div className="demo-inline-spacing">
                                <button id="more_config_btn" type="button" className="btn btn-primary" onClick={addSignataireForm}>
                                    {btn_text()}
                                </button>
                            </div>
                        </div>
                    </div>
                    <DataLoadingSpinner loader={loader}/>
                    <div className="destinataire card">
                        <div className="card-body">
                            <h5>Signataires</h5>
                            <div className="row">
                                <div className="col-md-8">
                                    <label htmlFor="TagifyEmailList" className="form-label">Ajouter les signataire</label><br/>
                                    <input id="TagifyEmailList" className="tagify-email-list"  onChange ={handleInputChange}  />
                                    <button type="button" id="addNewTag" className="btn btn-outline-primary btn-icon rounded-pill" >
                                        <span className="tf-icons bx bx-plus"/></button>
                                    {model_name_field()}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="police" className="form-label">Définissez une police</label>
                                    <input type="number" className="form-control" id="police" required value={police} onChange={e=>{setPolice(e.target.value)}} max="30" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row"  id="dragArea">
                        <div className="col-md-2 d-none d-lg-block">
                            <div className="text-center" >
                                { <img  src={process.env.REACT_APP_BACKEND_ASSET_BASE_URL+"previews/"+sendingData["document"]?.[0]?.preview}  alt="Avatar" className="dragable_element_label" width="175" unselectable="on" /> || <Skeleton />
                                }
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div id="sticky-wrapper" className="sticky-wrapper" >
                                <div  className="card-header" >
                                    <p className="card-title mb-sm-0 me-2">{title}</p>
                                </div>
                            </div>
                            <div className="" id="main-container" style={{height:'550px',overflowY: "auto",overflowX:"hidden"}} >
                                <div className="">
                                    <ul className="jss228" id="parent_ul">
                                        {
                                            imglist.map((l,k)=>  <div key={k} id={"img_page_"+l.page} className="jss255 dropzone">
                                                {/*<div className="jss257">*/}
                                                {/*    <div className="jss262 ">*/}
                                                        <div className="jss263 widget_space" id={"widget_space_"+l.page} data-page={l.page}>
                                                            {config
                                                                .map((s, i) => {
                                                                    if(l.page==s.page){
                                                                        return (
                                                                            <div key ={i}
                                                                                 className="drop-item form-group"
                                                                                 id={s?.widget_id} data-widget-type={s?.type_widget}
                                                                                 data-signataire={s?.signataire} data-page={s?.page}
                                                                                 data-isrequired={s.required}
                                                                                 style={{ top: `${s.positionY}px`, left: `${s.positionX}px`, width: `${s.width}`,height: `${s.height}`}}

                                                                            >
                                                                                <label><p style={{fontSize:"12px"}}
                                                                                          className="text-white dragable_element_label">
                                                                                    <b>{displayWidgetLabel(s.type_widget)}</b>
                                                                                </p>
                                                                                </label>
                                                                                <button type="button" className="remove" onClick={()=>removeWidget(s.widget_id)}>
                                                                                    <span className="fa fa-close"></span>
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    else{
                                                                        return null ;
                                                                    }
                                                                })}
                                                        </div>
                                                    {/*</div>*/}
                                                {/*</div>*/}
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
                        <div className="col-xl-2 col-md-2 col-12 invoice-actions">
                            <div className="card" id="field_card">
                                <div className="card-body ">
                                    <h5 className="card-title">Actions</h5>
                                    <div className=" nopadd drag-field " id="modules">
                                        {sendingParameter
                                            .filter(l => {
                                                if(sendingData["type_signature"]?.[0]?.type!=='avanced' && l.name==='signature'){
                                                    return false;
                                                }
                                                if(sendingData["tpe_signature"]?.[0]?.type!=='simple' && l.name==='certificat'){
                                                    return false;
                                                }
                                                return true;
                                                // return (
                                                //     sendingData["type_signature"]?.[0]?.type!=='avanced' && l.name==='signature'
                                                // );
                                            })
                                            .map((l, k) => {
                                                return (
                                                    <div className="report-list-item border border-secondary p-1 rounded-2 mb-2 drag cursor-move draggable_field"  data-name={l.name} key={k} >
                                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                            <div className="report-list-icon shadow-sm me-2">
                                                                <span className={l.icon}/>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-end w-100 flex-wrap gap-2">
                                                                <div className="d-flex flex-column">
                                                                    <span>{l.label}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
        else{
            return (
                <div className="center-screen" style={{display:'block'}}>
                    <h4 className="">Impossible d'afficher cet element </h4>
                    <div className="">
                        <Link to="/home" className="btn btn-primary btn-sm">
                            <span className="fa fa-home"></span> Accueil
                        </Link>
                    </div>

                </div>

            )
        }
    }
}

export default Sending;


