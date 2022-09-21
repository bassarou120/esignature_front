import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
window.$ = $;


const TableList = ( ) => {
    const [type_signature, setTypeSignature] = useState(1);

    useEffect(() => {

        // const script = document.createElement("script");
        // script.src = '../assets/js/listingtablesending.js';
        // document.body.appendChild(script);

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
                    id_user: $('#root').data('usr').id,
                    type_signature: type_signature
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

            var data = new FormData(this);
            data.append('_token','');

            $.ajax({
                url: '/esignature/members',
                method: 'POST',
                data: data,
                statusCode: {
                    419: function(responseObject, textStatus, jqXHR) {
                        window['error_419']();
                    },
                    403: function(responseObject, textStatus, jqXHR) {
                        window['showErrorToast']('Action non authorisée');
                    },
                    500:function(responseObject, textStatus, jqXHR){
                        window['showErrorToast']('Erreur serveur');
                    }
                },
                contentType: false,
                processData: false,
                dataType: "json",
                beforeSend: function() {
                    window['startspinner']();
                },
                complete: function() {
                    window['endspinner']();
                },
                success: function(data) {
                    if (data.success === true) {
                        $('#add_member_form').trigger("reset");
                        window['showSuccessToast']('Enregistrement réussi !!')
                        $('#add_member_modal').modal('hide');
                        table.draw();

                    } else if (data.success === false && data.code === 400) {
                        console.log('here');
                        window['server_side_alert_error'](data.data)
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
            window.Swal.fire({
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
                            "_token": '',
                            "_method": "DELETE"
                        },
                        statusCode: {
                            419: function(responseObject, textStatus, jqXHR) {
                                window['error_419']();
                            },
                            403: function(responseObject, textStatus, jqXHR) {
                                window['showErrorToast']('Action non authorisée');
                            },
                            500:function(responseObject, textStatus, jqXHR){
                                window['showErrorToast']('Erreur serveur');
                            }
                        },
                        url: "/esignature/members/" +Item_id,
                        success: function(data) {
                            if (data.success === true) {
                                table.draw();
                                window['showSuccessToast']('Suppression réussie')
                            } else {
                                window['showErrorToast']('Erreur de la suppression');
                            }
                        },
                        error: function(data, xhr, textStatus) {
                            console.log('Error:', data);
                        }
                    });
                }
            });

        });

    }, [])
    return (
        <div className="card">
            <h5 className="card-header">Listings de vos envois</h5>
            <div className="table-responsive text-nowrap">
                <table className="table table-borderless" id="sending_table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Document</th>
                        <th>Date</th>
                        <th>Nombre de signataire</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>

    );

}

export default TableList;


