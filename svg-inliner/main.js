/**
 * Created by wm on 19.02.17.
 */

(function($) {

    //drop area

    var $dropZone = $('.drop-zone');

    $dropZone.on({
        'drag dragstart dragend dragover dragenter dragleave drop': function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        'dragover dragenter': function() {
            $dropZone.addClass('is-drag-over');
        },
        'dragleave dragend drop': function() {
            $dropZone.removeClass('is-drag-over');
        },
        'drop': function(e) {
            var droppedFiles = e.originalEvent.dataTransfer.files;
            console.log(droppedFiles);
        }
    });

    //process:
    //  replace " with '
    //  remove unnecessary attributes on svg tag
    //  replace <, >, # with %3с, %3e, %23
    // test result

})(jQuery);