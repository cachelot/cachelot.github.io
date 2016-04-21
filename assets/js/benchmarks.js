(function(){ // Begin js namespace

var chartData = {
    totalMemoryMegabytes: 2048,
    datasets: {
        small: {
            name: 'Dataset: 10 ~ 1024 bytes "small"',
            cachelot: [1923.97, 1867.29, 1867.49, 1879.08, 1883.44, 1886.00, 1887.29, 1888.00, 1889.20, 1890.42],
            memcached: [1628.08, 1628.11, 1628.03, 1628.06, 1628.05, 1628.13, 1628.04, 1628.04, 1628.02, 1628.04]
        },
        medium: {
            name: 'Dataset: 1024 ~ 4096 bytes "medium"',
            cachelot: [2019.40, 1975.94, 1939.00, 1929.81, 1929.53, 1930.23, 1930.93, 1931.25, 1932.64, 1932.18],
            memcached: [1775.49, 1775.34, 1775.39, 1775.30, 1775.30, 1775.40, 1775.35, 1775.34, 1775.31, 1775.27]
        },
        large: {
            name: 'Dataset: 4Kb ~ 1Mb "large"',
            cachelot: [1983.60, 1952.66, 1939.84, 1934.17, 1940.67, 1929.80, 1932.81, 1922.46, 1910.74, 1910.79],
            memcached: [1787.60, 1787.43, 1787.01, 1786.25, 1788.63, 1787.10, 1787.93, 1787.88, 1787.29, 1787.58]
        },
        all: {
            name: 'Dataset: 10b ~ 1Mb "all"',
            cachelot: [1994.30, 1959.32, 1951.07, 1940.28, 1940.74, 1934.32, 1931.39, 1926.80, 1927.34, 1912.81],
            memcached: [1779.44, 1780.61, 1779.47, 1780.30, 1780.43, 1780.06, 1779.53, 1780.85, 1779.96, 1780.31]
        }
    }
};
$(function() { // Take an series of 'Effective Memory' (volume) and convert it
               // to an array of percents; 100% value is a chartData.totalMemoryMegabytes
    function Mb2Percents (data) {
        data.forEach(function(v, i, data_) {
            data_[i] = Number((v / chartData.totalMemoryMegabytes * 100).toPrecision(4));
        });
        return data;
    };
    for (var rangeName in chartData.datasets) {
        if (! chartData.datasets.hasOwnProperty(rangeName)) continue;
        var range = chartData.datasets[rangeName];
        range.cachelot = Mb2Percents(range.cachelot);
        range.memcached = Mb2Percents(range.memcached);
    }
});

// Highcharts chart template
var chartTemplate = {
    highchart: null,
    chart: {
        zoomType: 'xy',
        backgroundColor: 'transparent',
        style: {
            fontFamily: 'Lato'
        }
    },
    title: {
        text: 'RAM UTILIZATION (' + Math.ceil(chartData.totalMemoryMegabytes/1024) + 'Gb total)'
    },
    xAxis: [{
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        crosshair: true,
        labels: {
            format: '#{value}'
        },
        title: {
            text: 'Run No.'
        }
    }],
    yAxis: [{ // Primary yAxis
        max: 100,
        min: 70,
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            },
        },
        title: {
            text: 'Effective memory',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        gridLineDashStyle: 'Dot'
    }],
    tooltip: {
        shared: true,
        shadow: false,
        borderColor: Highcharts.getOptions().colors[10],
        formatter: function() {
            data = '<b>Run #' + this.x + '</b><br/>';
            this.points.forEach(function (pt) {
                data += '<span style="color:' + pt.series.color +'">\u25CF</span>  ' + pt.series.name + ': ' + pt.y + '%<br/>'
            });
            diff = this.points[0].y - this.points[1].y
            data += 'Diff: ' + diff.toPrecision(4) + '% ( ~' + (chartData.totalMemoryMegabytes * diff / 100).toPrecision(5) + 'Mb )'
            return data
        }
    },
    legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: .5,
        borderColor: '#AfAfAf',
		padding: 10,
    },
    series: [{
        type: 'line',
        yAxis: 0,
        tooltip: {
            valueSuffix: ' %'
        },
        threshold: 50,
        name: 'Cachelot',
        color: Highcharts.getOptions().colors[0]
    },
    {
        type: 'line',
        yAxis: 0,
        tooltip: {
            valueSuffix: ' %'
        },
        threshold: 50,
        name: 'Memcached',
        color: Highcharts.getOptions().colors[4]
    }]
};


//////////////////// Actual Charts Series /////////////////////////////////////////////

var chartForSmall = {
    subtitle: {
        text: chartData.datasets.small.name
    },
    series: [{
        data: chartData.datasets.small.cachelot
    },{
        data: chartData.datasets.small.memcached
    }]
};

var chartForMedium = {
    subtitle: {
        text: chartData.datasets.medium.name
    },
    series: [{
        data: chartData.datasets.medium.cachelot
    },{
        data: chartData.datasets.medium.memcached
    }]
};

var chartForLarge = {
    subtitle: {
        text: chartData.datasets.large.name
    },
    series: [{
        data: chartData.datasets.large.cachelot
    },{
        data: chartData.datasets.large.memcached
    }]
};


var chartForAll = {
    subtitle: {
        text: chartData.datasets.all.name
    },
    series: [{
        data: chartData.datasets.all.cachelot
    },{
        data: chartData.datasets.all.memcached
    }]
};




$(document).ready(function () {
    $('#chart_small').highcharts(jQuery.extend(true, {}, chartTemplate, chartForSmall))
    $('#chart_medium').highcharts(jQuery.extend(true, {}, chartTemplate, chartForMedium))
    $('#chart_large').highcharts(jQuery.extend(true, {}, chartTemplate, chartForLarge))
    $('#chart_all').highcharts(jQuery.extend(true, {}, chartTemplate, chartForAll))
});

})(); // End js namespace

