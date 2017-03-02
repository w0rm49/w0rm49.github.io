/**
 * Created by wm on 19.02.17.
 */

(function($) {

    //drop area

    var $dropZone = $('.drop-zone');
    var $source = $('.source-svg');
    var $target = $('.target-svg');

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

            if (droppedFiles.length !== 1) {
                return;
            }

            var reader = new FileReader();

            reader.onloadend = function(evt) {
                if (evt.target.readyState == FileReader.DONE) {
                    $source.val(evt.target.result);
                    process();
                    // test result
                }
            };
            reader.readAsText(droppedFiles[0]);

        }
    });

    function process() {
        var src = $source.val();
        var result = src;

        //  remove unnecessary attributes on svg tag

        result = replace(result, "\n", '');
        result = replace(result, "\r", '');
        result = replace(result, "\t", ' ');

        result = replace(result, '"', "'");
        result = replace(result, '<', '%3c');
        result = replace(result, '<', '%3C');
        result = replace(result, '>', '%3e');
        result = replace(result, '>', '%3E');
        result = replace(result, '#', '%23');

        $target.html(result);
    }

    function replace(text, search, replace) {
        return text.split(search).join(replace);
    }
})(jQuery);