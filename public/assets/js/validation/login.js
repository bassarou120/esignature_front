
(function($) {
    'use strict';
    $(function() {

        $.validator.addMethod('filesize', function(value, element, param) {
            return this.optional(element) || (element.files[0].size <= param)
        });
        // validate signup form on keyup and submit
        $("#formAuthentication").validate({
            rules: {
                email: {
                    required: true,
                    email:true,
                },
                password: {
                    required: true,
                    minlength:8,
                },
            },
            errorPlacement: function(label, element) {
                label.addClass('mt-2 text-danger');
                $(element).addClass('is_invalid')
                if($(element).attr('id')==='password'){
                   // label.insertAfter( $('#eye'));
                    label.appendTo("#password_error")
                }
                else{
                    label.insertAfter(element);
                }
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

        $("#formAuthenticationRegister").validate({
            rules: {
                email: {
                    required: true,
                    email:true,
                },
                name: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength:8,
                },
                password_confirmation: {
                    required: true,
                    equalTo : "#password"
                },
            },
            errorPlacement: function(label, element) {
                label.addClass('mt-2 text-danger');
                $(element).addClass('is_invalid')
                if($(element).attr('id')==='password' ){
                    label.appendTo("#password_error")
                }
                else if($(element).attr('id')==='password_confirmation'){
                    label.appendTo("#error_password_confirmation")
                }
                else{
                    label.insertAfter(element);
                }
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

        $("#formAuthenticationResetPass").validate({
            rules: {
                email: {
                    required: true,
                    email:true,
                },
                password: {
                    required: true,
                    minlength:8,
                },
                confirm_password: {
                    required: true,
                    equalTo : "#password"
                },
            },
            errorPlacement: function(label, element) {
                label.addClass('mt-2 text-danger');
                $(element).addClass('is_invalid')
                if($(element).attr('id')==='password' ){
                    label.appendTo("#password_error")
                }
                else if($(element).attr('id')==='confirm_password'){
                    label.appendTo("#error_confirm_password")
                }
                else{
                    label.insertAfter(element);
                }
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

        $("#formAuthenticationForgetPassword").validate({
            rules: {
                email: {
                    required: true,
                    email:true,
                },
            },
            errorPlacement: function(label, element) {
                label.addClass('mt-2 text-danger');
                $(element).addClass('is_invalid')
                if($(element).attr('id')==='password' ){
                    label.appendTo("#password_error")
                }
                else if($(element).attr('id')==='confirm_password'){
                    label.appendTo("#error_confirm_password")
                }
                else{
                    label.insertAfter(element);
                }
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

