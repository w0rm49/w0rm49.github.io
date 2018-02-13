/**
 * Created by wm on 19.02.17.
 */

(function($) {

    var $dropZone = $('.drop-zone');
    var $showData = $('.show-data');
    var $pixelData = $('.pixel-data');
    var $dropMessage = $('.drop-message');

    var delimiter = -50;

    $showData.on('click', function() {
        $pixelData.toggle();
    });

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

            var imageData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
            var gsData = [];

            //for (var j = 0 ; j < imageData.height ; j++) {
            for (var j = 0 ; j < 3 ; j++) {
                for (var i = 0 ; i < imageData.width ; i++) {
                    var idx = (j * 4) * imageData.width + (i * 4);
                    var shade = Math.round((imageData.data[idx] + imageData.data[idx + 1] + imageData.data[idx + 2]) / 3);
                    var alpha = imageData.data[idx + 3];
                    imageData.data[idx] = shade;
                    imageData.data[idx + 1] = shade;
                    imageData.data[idx + 2] = shade;
                    imageData.data[idx + 3] = alpha;
                    gsData.push(shade);
                }
                //gsData.push(delimiter);
                //gsData.push(delimiter);
                //gsData.push(delimiter);
                //gsData.push(delimiter);
                //gsData.push(delimiter);
            }

            canvas.getContext('2d').putImageData(imageData, 0, 0);
            displayImg.src = canvas.toDataURL();
            $pixelData.val(gsData.join(','));

            var graphData = [
                {
                    //type: "line",
                    type: "spline",
                    lineThickness: 1,
                    dataPoints: gsData.map(function(el) {
                        return { y: el };
                    })
                }
            ];

            drawChart(graphData);
        };

        img.src = imageData;
    }

    function drawChart(imageData) {
        var chart = new CanvasJS.Chart("chartContainer",
            {
                zoomEnabled: true,
                //title:{
                //    text: ""
                //},
                axisX :{
                    labelAngle: -30
                },
                axisY :{
                    includeZero: false
                },
                data: imageData

            });

        chart.render();
    }
})(jQuery);