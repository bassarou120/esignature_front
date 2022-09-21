var url_datatable ='/esignature/sendings/'+$('#root').data('usr').id+'/user'

var table = $('#sending_table').DataTable({
    language: {
        url: "/french.json"
    },
    processing: true,
    serverSide: true,
    ajax: {
        url: url_datatable,
        data: {
            id_user: $('#root').data('usr').id
        },
        type: 'GET'
    },
    columns: [
        {
            data: 'DT_RowIndex',
            name: 'DT_RowIndex'
        },
        {
            data: 'document',
            name: 'document',
            render: function(data, type, full, meta) {
                return full.document[0].title ;
            }

        },
        {
            data: 'created_at',
            name: 'created_at',
        },
        {
            data: 'nbre_signataire',
            name: 'nbre_signataire',
            render: function(data, type, full, meta) {
                return 0
            }
        },
        {
            data: 'statut',
            name: 'statut',
            render: function(data, type, full, meta) {
                  return ' <span class="badge bg-label-warning me-1">En attente</span>'
            }
        },
        {
            data: 'action',
            name: 'action',
            orderable: false,
            searchable: false
        },
    ],
});

$('#add_member_button').click(function() {
    $('#id').val('');
    $('#action').val('add');
    $('#add_member_form').trigger("reset");
    $('#exampleModalLabel1').html("Nouveau membre");
    $('#add_member_modal').modal('show');
});

$('#add_member_form').submit(function(e) {
    e.preventDefault();
    if (!$("#add_member_form").valid()) return false

    data = new FormData(this);
    data.append('_token',csrf_token);

    $.ajax({
        url: '/esignature/members',
        method: 'POST',
        data: data,
        statusCode: {
            419: function(responseObject, textStatus, jqXHR) {
                error_419();
            },
            403: function(responseObject, textStatus, jqXHR) {
                showErrorToast('Action non authorisée');
            },
            500:function(responseObject, textStatus, jqXHR){
                showErrorToast('Erreur serveur');
            }
        },
        contentType: false,
        processData: false,
        dataType: "json",
        beforeSend: function() {
            startspinner();
        },
        complete: function() {
            endspinner();
        },
        success: function(data) {
            if (data.success === true) {
                $('#add_member_form').trigger("reset");
                showSuccessToast('Enregistrement réussi !!')
                $('#add_member_modal').modal('hide');
                table.draw();

            } else if (data.success === false && data.code === 400) {
                console.log('here');
                server_side_alert_error(data.data)
                $('#add_member_modal').animate({ scrollTop: 0 }, 'slow');

            }

        },
        error: function(data) {
            $.each(data.responseJSON.errors, function(key, value) {

                $('#serveur_side_error').append('<li>' + value + '</li>');

            });

        },
    });
});

$('body').on('click', '.delete', function() {

    var Item_id = $(this).data("id");
    Swal.fire({
        title: 'Are you sure?',
        text: "Voulez vous vraiment supprimer ce membre ?!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler',
        customClass: {
            confirmButton: 'btn btn-primary me-1',
            cancelButton: 'btn btn-label-secondary'
        },
        buttonsStyling: false
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                data: {
                    "_token": csrf_token,
                    "_method": "DELETE"
                },
                statusCode: {
                    419: function(responseObject, textStatus, jqXHR) {
                        error_419();
                    },
                    403: function(responseObject, textStatus, jqXHR) {
                        showErrorToast('Action non authorisée');
                    },
                    500:function(responseObject, textStatus, jqXHR){
                        showErrorToast('Erreur serveur');
                    }
                },
                url: "/esignature/members/" +Item_id,
                success: function(data) {
                    if (data.success === true) {
                        table.draw();
                        showSuccessToast('Suppression réussie')
                    } else {
                        showErrorToast('Erreur de la suppression');
                    }
                },
                error: function(data, xhr, textStatus) {
                    console.log('Error:', data);
                }
            });
        }
    });

});

$('body').on('click', '.edit', function() {
    var Item_id = $(this).data('id');
    $('#exampleModalLabel1').html("Editer un membre");
    $.ajax({
        url: "/esignature/members/" + Item_id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        statusCode: {
            419: function(responseObject, textStatus, jqXHR) {
                error_419();
            },
            403: function(responseObject, textStatus, jqXHR) {
                showErrorToast('Action non authorisée');
            },
            500:function(responseObject, textStatus, jqXHR) {
                showErrorToast('Erreur serveur');
            },
        },
        success: function(data) {
            if (data.success === true) {
                $('#name').val(data.data.name);
                $('#email').val(data.data.email);
                $('#role').val(data.data.role);
                $('#action').val("edit");
                $('#id').val(Item_id);
                $('#add_member_modal').modal('show');
            } else {
                showErrorToast('Cet element n\'existe pas');
            }
        },
        error: function(error) {
            console.log(result)
            $('#display_error').text('Error de récupération des données')
            $('#display_error').removeClass('d-none');

        }
    });
});

(function($) {
    'use strict';

    $(function() {

        // validate signup form on keyup and submit
        $("#add_member_form").validate({
            rules: {
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
