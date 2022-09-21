var membersList=[];
var responsableList=[];
var tagify=[];
var tagify1=[];

var CryptoJS = require("crypto-js");
function decrypt(string) {
    return JSON.parse(CryptoJS.AES.decrypt(string, 'esign-DINE-07').toString(CryptoJS.enc.Utf8));
}
let id_user = decrypt(localStorage.getItem('userId'));
    function tagTemplate(tagData){
        return `
        <tag title="${tagData.email}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
                class="tagify__tag ${tagData.class ? tagData.class : ""}"
                ${this.getAttributes(tagData)}>
            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
            <div>
                <div class='tagify__tag__avatar-wrap'>
                    <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
                </div>
                <span class='tagify__tag-text'>${tagData.name}</span>
            </div>
        </tag>
    `
    }

    function suggestionItemTemplate(tagData){
        return `
        <div ${this.getAttributes(tagData)}
            class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
            tabindex="0"
            role="option">
            ${ tagData.avatar ? `
            <div class='tagify__dropdown__item__avatar-wrap'>
                <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
            </div>` : ''
        }
            <strong>${tagData.name}</strong>
            <span>${tagData.email}</span>
        </div>
    `
    }

    function dropdownHeaderTemplate(suggestions){
        return `
        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <strong>${this.value.length ? `Add remaning ${suggestions.length}` : 'Add All'}</strong>
            <span>${suggestions.length} members</span>
        </div>
    `
    }

    function setUpList(){
        return $.ajax({
            url: process.env.REACT_APP_API_BASE_URL+ 'members/' + id_user + '/user',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            statusCode: {
                419: function (responseObject, textStatus, jqXHR) {
                    error_419();
                },
                403: function (responseObject, textStatus, jqXHR) {
                    showErrorToast('Action non authorisée');
                },
                500: function (responseObject, textStatus, jqXHR) {
                    showErrorToast('Erreur serveur');
                },
            },
            success: function (data) {
              $.each(data.data, function (index, value) {
                    membersList.push({
                        value: value.id,
                        name: value.name,
                        avatar: "/assets/img/avatars/noavatar.png",
                        email: value.email
                    });
                });
            },
            error: function (error) {
                reject(error)

            }
        });
      }

$.when(setUpList()).done(function(ajax1Results,ajax2Results){
    var inputElm1 = document.querySelector('#members');

     tagify1 = new Tagify(inputElm1, {
        tagTextProp: 'name', // very important since a custom template is used with this property as text
        enforceWhitelist: true,
        skipInvalid: true, // do not remporarily add invalid tags
        dropdown: {
            closeOnSelect: false,
            enabled: 0,
            classname: 'users-list',
            searchKeys: ['name', 'email']  // very important to set by which keys to search for suggesttions when typing
        },
        templates: {
            tag: tagTemplate,
            dropdownItem: suggestionItemTemplate,
            dropdownHeader: dropdownHeaderTemplate
        },
        whitelist:membersList
    })

    tagify1.on('dropdown:select', onSelectSuggestion)

    function onSelectSuggestion(e){
        if( e.detail.elm.classList.contains(`${tagify1.settings.classNames.dropdownItem}__addAll`) )
            tagify1.dropdown.selectAll();
    }

    responsableList=membersList;

    var inputElm = document.querySelector('#responsables');

    // initialize Tagify on the above input node reference
    tagify = new Tagify(inputElm, {
        tagTextProp: 'name', // very important since a custom template is used with this property as text
        enforceWhitelist: true,
        skipInvalid: true, // do not remporarily add invalid tags
        dropdown: {
            closeOnSelect: false,
            enabled: 0,
            classname: 'users-list',
            searchKeys: ['name', 'email']  // very important to set by which keys to search for suggesttions when typing
        },
        templates: {
            tag: tagTemplate1,
            dropdownItem: suggestionItemTemplate1,
            dropdownHeader: dropdownHeaderTemplate1
        },
        whitelist:responsableList
    })

    tagify.DOM.input.addEventListener('add', onAddTag)

    // listen to dropdown suggestion items selection
    tagify.on('dropdown:select', onSelectSuggestion1)

    function onSelectSuggestion1(e){
        if( e.detail.elm.classList.contains(`${tagify.settings.classNames.dropdownItem}__addAll`) )
            tagify.dropdown.selectAll();
    }
});

    function onAddTag(e){
        console.log(e);
    }
function onSelectFocusBlur(e){
    console.log(e);
   // console.log(e.type)
}




(function($) {
    'use strict';

    $(function() {

        // validate signup form on keyup and submit
        $("#add_groupe_form").validate({
            rules: {
                name: {
                    required: true,
                },
            },
            errorPlacement: function(label, element) {
                label.addClass('mt-2 text-danger');
                label.insertAfter(element);
            },
            highlight: function(element, errorClass) {
                $(element).parent().addClass('has-danger')
                $(element).addClass('form-control-danger')
            },
            success: function(label, element) {
                label.parent().removeClass('error');
                label.remove();
            },
        });
    });
})(jQuery);
