export const lineChart: Highcharts.Options = {
    chart: {
        height: 140
    },
    credits: {
        enabled: false
    },
    series: [{
        marker: {
            fillColor: '#FFFFFF',
            lineWidth: 2,
            lineColor: '#7CB5EC'
        },
        showInLegend: false,
        data: [1, 2, 3],
        type: 'line'
    }],
    title: {
        text: ''
    },
    yAxis: [{
        visible: false
    }]
};

export const bellChart: Highcharts.Options = {
    chart: {
        height: 100
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    xAxis: [{
        title: {
            text: ''
        },
        alignTicks: false
    }, {
        title: {
            text: ''
        },
        alignTicks: false,
        opposite: true,
        visible: false
    }],

    yAxis: [{
        title: { text: '' },
        visible: false
    }, {
        title: { text: '' },
        opposite: true,
        visible: false
    }],

    series: [{
        name: 'Bell curve',
        type: 'bellcurve',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 1,
        zIndex: -1,
        showInLegend: false,
        color: '#F9AE00'
    },
    {
        showInLegend: false,
        name: 'Data',
        type: 'scatter',
        data: [3.5, 4],
        accessibility: {
            exposeAsGroupOnly: true
        },
        marker: {
            radius: 1.5
        }
    }]
};