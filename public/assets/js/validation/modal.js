
(function($) {
    'use strict';
    $(function() {

        $.validator.addMethod('filesize', function(value, element, param) {
            return this.optional(element) || (element.files[0].size <= param)
        });

        // validate signup form on keyup and submit
        $("#chooseSignatureType").validate({
            rules: {
                pdf_file: {
                    required: true,
                    // extension: "pdf|PDF",
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

