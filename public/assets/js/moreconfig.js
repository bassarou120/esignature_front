var formRepeater = $(".form-repeater");

var row = 2;
var col = 1;

formRepeater.repeater({
    show: function() {
        var fromControl = $(this).find('.form-control, .form-select');
        var formLabel = $(this).find('.form-label');

        fromControl.each(function(i) {
            var id = 'form-repeater-' + row + '-' + col;
            $(fromControl[i]).attr('id', id);
            $(formLabel[i]).attr('for', id);
            col++;
        });

        row++;

        $(this).slideDown();
    },
    hide: function(e) {
        confirm('Are you sure you want to delete this element?') && $(this).slideUp(e);
    }
});
