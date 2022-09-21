// var url_datatable ='/esignature/contacts/'+$('#root').data('usr').id+'/user'
//
// function getColor(){
//     var color = ['bg-label-success','bg-label-danger','bg-label-warning','bg-label-primary','bg-label-second'];
//     var i =Math.floor(Math.random() * 5);
//     return color[i];
// }
// var table = $('#contact_table').DataTable({
//     language: {
//         url: "/french.json"
//     },
//     processing: true,
//     serverSide: true,
//     ajax: {
//         url: url_datatable,
//         data: {
//             id_user: $('#root').data('usr').id
//         },
//         type: 'GET'
//     },
//     columns: [
//         {
//         data: 'DT_RowIndex',
//         name: 'DT_RowIndex'
//         },
//         {
//             data: 'name',
//             name: 'name',
//             render: function(data, type, full, meta) {
//
//                 return '<input type="checkbox" class="form-check-input"/>' ;
//
//             }
//
//         },
//         {
//             data: 'name',
//             name: 'name',
//             render: function(data, type, full, meta) {
//                 return '<div class="d-flex justify-content-start align-items-center"> <div class="avatar-wrapper"><div class="avatar me-2">' +
//                     '<span class="avatar-initial rounded-circle '+getColor()+'">'+data.charAt(0).toUpperCase()+'</span> ' +
//                     '</div></div>' +
//                     '<div class="d-flex flex-column">' +
//                     '<span class="emp_name text-truncate">'+data+'</span>' +
//                     '<small class="emp_post text-truncate text-muted">'+full.activity+'</small> </div> </div>';
//
//             }
//
//         },
//         {
//             data: 'email',
//             name: 'email'
//
//         },
//         {
//             data: 'created_at',
//             name: 'created_at'
//         },
//         {
//             data: 'action',
//             name: 'action',
//             orderable: false,
//             searchable: false
//         },
//     ],
// });
//
//

(function($) {
    'use strict';

    $(function() {
        // validate signup form on keyup and submit
        $("#add_contact_form").validate({
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
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
