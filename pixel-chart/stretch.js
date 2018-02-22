/**
 * Created by wm on 19.02.17.
 */

(function($) {

    var $dropZone = $('.drop-zone');
    var $dropMessage = $('.drop-message');
    var lines = 2;

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
                    processImage(evt.target.result);
                }
            };
            reader.readAsDataURL(droppedFiles[0]);
            $dropMessage.hide();
        }
    });

    function processImage(imageData) {
        var img = new Image();
        var displayImg = document.getElementById('input-image');

        img.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

            var newCanvas = document.createElement('canvas');
            newCanvas.width = img.width;
            newCanvas.height = img.height * (lines + 1);
            newCanvas.getContext('2d').clearRect(0,0, newCanvas.width, newCanvas.height);

            var imageData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
            var newImageData = newCanvas.getContext('2d').getImageData(0, 0, img.width, img.height * (lines + 1));
            var i;

            for (var j = 0 ; j < imageData.height ; j++) {
                for (i = 0 ; i < imageData.width ; i++) {
                    var idx = (j * 4) * imageData.width + (i * 4);
                    var newIdx = (j * (lines + 1) * 4) * imageData.width + (i * 4);
                    newImageData.data[newIdx] = imageData.data[idx];
                    newImageData.data[newIdx + 1] = imageData.data[idx + 1];
                    newImageData.data[newIdx + 2] = imageData.data[idx + 2];
                    newImageData.data[newIdx + 3] = imageData.data[idx + 3];
                }
            }

            newCanvas.getContext('2d').putImageData(newImageData, 0, 0);
            displayImg.src = newCanvas.toDataURL();
        };

        img.src = imageData;
    }

})(jQuery);