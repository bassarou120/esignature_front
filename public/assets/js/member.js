

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
