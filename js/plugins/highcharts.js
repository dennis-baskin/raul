import 'highcharts/highcharts'
import 'highcharts/highcharts-more'
import 'highcharts/modules/exporting'

const RAUL = window.RAUL || {}

window.Highcharts.SVGRenderer.prototype.symbols.ellipsis = function(x, y, w, h) {
  const path = [
    // First Point
    'M', x + w * 0.5, y + h * 0.1,
    'L', x + w * 0.5, y + h * 0.1,
    // Second Point
    'M', x + w * 0.5, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.5,
    // Last Point
    'M', x + w * 0.5, y + h * 0.9,
    'L', x + w * 0.5, y + h * 0.9,
  ]
  return path
}

// Define default, color themes and types options
RAUL.highcharts = {
  general: {
    chart: {
      spacingLeft: 0,
      spacingRight: 0,
      spacingTop: 0,
      style: {
        fontFamily: '\'Roboto\', sans-serif',
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          symbol: 'ellipsis',
          symbolSize: 16,
        },
      },
    },
    legend: {
      itemMarginBottom: 5,
      itemStyle: {
        fontSize: '14px',
      },
      padding: 0,
      squareSymbol: true,
      symbolRadius: 0,
    },
    plotOptions: {
      bar: {
        borderColor: null,
      },
      column: {
        borderColor: null,
      },
    },
    title: {
      align: 'left',
      margin: 30,
      style: {
        color: '#303436',
        fontSize: '16px',
        fontWeight: '500',
      },
    },
    subtitle: {
      align: 'left',
      style: {
        color: '#7a8085',
        fontSize: '14px',
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e4e6e7',
      headerFormat: '<span style="font-size: 14px; font-weight: 500;">{point.key}</span><br/>',
      pointFormat: '<span style="color:{point.color}">\u25A0</span> {series.name}: <span>{point.y}</span><br/>',
      style: {
        fontSize: '14px',
      },
    },
    xAxis: {
      gridLineWidth: 0,
      labels: {
        style: {
          color: '#303436',
          fontSize: '14px',
        },
      },
      lineWidth: 0,
      tickLength: 0,
    },
    yAxis: {
      gridLineWidth: 0,
      labels: {
        style: {
          color: '#303436',
          fontSize: '14px',
        },
      },
      title: {
        text: null,
      },
    },
  },
  themes: {
    blue: {
      colors: [
        '#b9e6ec',
        '#8fd0d9',
        '#6dc2cd',
        '#3fabcb',
        '#3d94c0',
        '#3474ac',
        '#2a5599',
        '#1f3686',
        '#131c57',
        '#0c1138',
      ],
    },
    orange: {
      colors: [
        '#fdd0a2',
        '#fcae6b',
        '#fd8d3c',
        '#f06913',
        '#d94901',
        '#a63602',
        '#7f2704',
        '#6c2103',
        '#673223',
        '#361309',
      ],
    },
    green: {
      colors: [
        '#cdff9f',
        '#aee77a',
        '#76cb7e',
        '#47b083',
        '#319a89',
        '#287f81',
        '#2d6371',
        '#31495b',
        '#2e3041',
        '#231a27',
      ],
    },
    pink: {
      colors: [
        '#ebdefc',
        '#e8cbed',
        '#dea7db',
        '#df65b0',
        '#e7298a',
        '#d9145b',
        '#a80f52',
        '#7b0d3d',
        '#5c0620',
        '#2d010e',
      ],
    },
    red: {
      colors: [
        '#fee0d2',
        '#ffc5aa',
        '#ff9b7a',
        '#fb6a4a',
        '#ef3a2d',
        '#cb181d',
        '#a50f15',
        '#67000c',
        '#500009',
        '#390007',
      ],
    },
    yellow: {
      colors: [
        '#f5ef8f',
        '#f2e320',
        '#fece22',
        '#efb90f',
        '#e29d00',
        '#ab7302',
        '#80581a',
        '#5e4010',
        '#422908',
        '#341c06',
      ],
    },
  },
  types: {
    donut: {
      chart: {
        type: 'pie',
      },
      plotOptions: {
        pie: {
          borderWidth: 0.5,
          dataLabels: {
            enabled: false,
          },
          innerSize: '70%',
          showInLegend: true,
          states: {
            hover: false,
          },
        },
      },
      legend: {
        layout: 'vertical',
        enabled: true,
        align: 'right',
        verticalAlign: 'middle',
        itemMarginBottom: 5,
      },
    },
    pie: {
      chart: {
        type: 'pie',
      },
      plotOptions: {
        pie: {
          borderWidth: 0.5,
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          states: {
            hover: false,
          },
        },
      },
      legend: {
        layout: 'vertical',
        enabled: true,
        align: 'right',
        verticalAlign: 'middle',
        itemMarginBottom: 5,
      },
    },
    column: {
      chart: {
        type: 'column',
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          groupPadding: 0,
        },
      },
    },
    stackedColumn: {
      chart: {
        type: 'column',
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      plotOptions: {
        column: {
          groupPadding: 0,
          stacking: 'normal',
        },
      },
    },
    stackedColumnGrouped: {
      chart: {
        type: 'column',
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      plotOptions: {
        column: {
          groupPadding: 0.1,
          stacking: 'normal',
        },
      },
    },
    bar: {
      chart: {
        type: 'bar',
      },
      xAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        tickLength: 0,
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: '',
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
      },
    },
    negativeStackedBar: {
      chart: {
        type: 'bar',
      },
      xAxis: [{
        reversed: false,
      },
      {
        opposite: true,
        reversed: false,
        linkedTo: 0,
      }],
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
        series: {
          stacking: 'normal',
        },
      },
    },
    stackedBar: {
      chart: {
        type: 'bar',
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
        series: {
          stacking: 'normal',
        },
      },
    },
    spline: {
      chart: {
        type: 'spline',
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
        series: {
          stacking: 'normal',
        },
      },
    },
    splineArea: {
      chart: {
        type: 'areaspline',
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
        areaspline: {
          fillOpacity: 0.2,
        },
      },
    },
    basicLine: {
      chart: {
        type: 'line',
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.1,
        },
      },
    },
    stackedArea: {
      chart: {
        type: 'area',
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          marker: {
            enabled: false,
          },
        },
      },
    },
    bubble: {
      chart: {
        type: 'bubble',
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        bubble: {
          marker: {
            fillOpacity: 0.75,
            lineWidth: 0,
          },
        },
      },
    },
  },
}
