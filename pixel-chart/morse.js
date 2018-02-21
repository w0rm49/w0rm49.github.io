(function($) {

    var $text = $('.text-in');
    var $showData = $('.show-data');

    $showData.on('click', function() {
        $text.hide();
        $showData.hide();
        process();
    });


    function process() {
        var result = $text.val().trim();
        result = replace(result, '   ', '000000'); // 6
        result = replace(result, ' ', '00'); // 2
        result = replace(result, "•", '10'); // 2
        result = replace(result, "−", '1110'); // 6

        var graphData = [
            {
                type: "stepLine",
                lineThickness: 1,
                dataPoints: result.split('').map(function(el) {
                    return { y: parseInt(el) };
                })
            }
        ];

        drawChart(graphData);
    }



    function replace(str, from, to) {
        return str.split(from).join(to);
    }

    function drawChart(imageData) {
        var chart = new CanvasJS.Chart("chartContainer",
            {
                zoomEnabled: true,
                title:{
                    text: $text.val()
                },
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