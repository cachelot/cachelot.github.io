$(function () {
    $('#read_benchmark').highcharts({
        chart: {
            backgroundColor: '#f5f5f5'
        },
        title: {
            text: 'get performance',
            x: -20 //center
        },
        subtitle: {
            text: 'memslap load generator',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Number of connections'
            },
            categories: [2, 4, 6, 8, 10, 12, 14, 16]
        },
        yAxis: {
            title: {
                text: 'Requests per second'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#e0e0e0'
            }]
        },
        tooltip: {
            valueSuffix: 'RPS'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'cachelot',
            data: [ 233559, 363595, 439500, 518092, 523851, 536597, 557394, 561440]

        }, {
            name: 'memcached',
            data: [194127, 289815, 369103, 431078, 488698, 531723, 570758, 609901]
        }]
    });
});

$(function () {
    $('#write_benchmark').highcharts({
        chart: {
            backgroundColor: '#f5f5f5'
        },
        title: {
            text: 'set performance',
            x: -20 //center
        },
        subtitle: {
            text: 'memslap load generator',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Number of connections'
            },
            categories: [2, 4, 6, 8, 10, 12, 14, 16]
        },
        yAxis: {
            title: {
                text: 'Requests per second'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#e0e0e0'
            }]
        },
        tooltip: {
            valueSuffix: 'RPS'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'cachelot',
            data: [24536, 34996, 44827, 48714, 51866, 53601, 54702, 55766]
        }, {
            name: 'memcached',
            data: [19336, 28502, 35706, 41979, 47289, 51847, 55700, 58444]
        }]
    });
});