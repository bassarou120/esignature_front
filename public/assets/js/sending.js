const TagifyEmailListEl = document.querySelector("#TagifyEmailList");

const TagifyEmailList = new Tagify(TagifyEmailListEl, {
        callbacks: {
            invalid: onInvalidTag,
            "change": changeTag,
            "remove": removeTag
        },
        dropdown: {
            position: "text",
            enabled: 1 // show suggestions dropdown after 1 typed character
        }
});


// if(JSON.parse(localStorage.getItem('signataires')) !== null ){
//     TagifyEmailList.addTags(JSON.parse(localStorage.getItem('signataires')))
// }

const button = TagifyEmailListEl.nextElementSibling; // "add new tag" action-button

button.addEventListener("click", onAddButtonClick);

function onAddButtonClick() {
    TagifyEmailList.addEmptyTag();
}

function onInvalidTag(e) {

}

function changeTag(e) {
console.log($('body .drag-item'))
}

function removeTag(e) {

}

function clickTag(e){
    e.stopPropagation();
    $( "tag" ).each(function( index ) {
        $(this).removeClass('the_selected_tag');
        $(this).find('.tagify__tag-text').css('color','')
    });
    $(this).addClass('the_selected_tag');
    $(this).find('.tagify__tag-text').first().css('color','#1621ab')
    var title = $(this).attr('title');

    // var c = $('.drop-item[data-signataire!="'+title+'"]');
    var c = $('.drop-item');

    c.each(function( index ) {
        var  id = $( this ).attr('id');
        makeItemDraggableAnd('#'+id);
        if($(this).attr('data-signataire')===title){
            $(this).removeClass('disabled_widget');
            $( '#'+id  ).draggable( "option", "disabled", false );
        }
        else{
            $(this).addClass('disabled_widget');
            $( '#'+id  ).draggable( "option", "disabled", true );

        }
    });

    disabled_submit_btn();
}


$('body tag').first().addClass('the_selected_tag');
