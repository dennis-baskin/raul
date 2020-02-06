window.Highcharts.chart(
  {
    chart: {
      renderTo: 'chart-pie-default',
      type: 'pie',
    },
    series: [{
      name: 'Example',
      colorByPoint: true,
      data: [{
        y: 1,
        name: 'Chart Legend 1',
      },
      {
        y: 2,
        name: 'Chart Legend 2',
      },
      {
        y: 3,
        name: 'Chart Legend 3',
      },
      {
        y: 4,
        name: 'Chart Legend 4',
      },
      {
        y: 5,
        name: 'Chart Legend 5',
      }],
    }],
  }
)

// Set default options for highcharts
window.Highcharts.setOptions(RAUL.highcharts.general)

// Initialize highcharts examples
window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.pie,
  RAUL.highcharts.themes.green,
  {
    chart: {
      renderTo: 'chart-pie-raul',
    },
    series: [{
      name: 'Example',
      colorByPoint: true,
      data: [{
        y: 1,
        name: 'Chart Legend 1',
      },
      {
        y: 2,
        name: 'Chart Legend 2',
      },
      {
        y: 3,
        name: 'Chart Legend 3',
      },
      {
        y: 4,
        name: 'Chart Legend 4',
      },
      {
        y: 5,
        name: 'Chart Legend 5',
      }],
    }],
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.donut,
  RAUL.highcharts.themes.yellow,
  {
    chart: {
      renderTo: 'chart-1',
    },
    title: {
      text: 'Donut Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example',
      colorByPoint: true,
      data: [{
        y: 1,
        name: 'Chart Legend 1',
      },
      {
        y: 2,
        name: 'Chart Legend 2',
      },
      {
        y: 3,
        name: 'Chart Legend 3',
      },
      {
        y: 4,
        name: 'Chart Legend 4',
      },
      {
        y: 5,
        name: 'Chart Legend 5',
      }],
    }],
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.pie,
  RAUL.highcharts.themes.red,
  {
    chart: {
      renderTo: 'chart-2',
    },
    title: {
      text: 'Pie Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example',
      colorByPoint: true,
      data: [{
        y: 5,
        name: 'Chart Legend 1',
      },
      {
        y: 4,
        name: 'Chart Legend 2',
      },
      {
        y: 3,
        name: 'Chart Legend 3',
      },
      {
        y: 2,
        name: 'Chart Legend 4',
      },
      {
        y: 1,
        name: 'Chart Legend 4',
      }],
    }],
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.column,
  RAUL.highcharts.themes.pink,
  {
    chart: {
      renderTo: 'chart-3',
    },
    title: {
      text: 'Column Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example',
      colorByPoint: true,
      data: [{
        y: 5,
        name: 'Chart Legend 1',
      },
      {
        y: 4,
        name: 'Chart Legend 2',
      },
      {
        y: 3,
        name: 'Chart Legend 3',
      },
      {
        y: 2,
        name: 'Chart Legend 4',
      },
      {
        y: 1,
        name: 'Chart Legend 4',
      }],
    }],
    xAxis: {
      categories: ['X0', 'X1', 'X2', 'X3', 'X4'],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.stackedColumn,
  RAUL.highcharts.themes.red,
  {
    chart: {
      renderTo: 'chart-4',
    },
    title: {
      text: 'Stacked Column Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [10, 8, 7, 5, 5],
    },
    {
      name: 'Example 2',
      data: [3, 3, 2, 2, 2],
    },
    {
      name: 'Example 3',
      data: [10, 6, 4, 3, 2],
    }],
    xAxis: {
      categories: ['X0', 'X1', 'X2', 'X3', 'X4'],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.stackedColumnGrouped,
  RAUL.highcharts.themes.orange,
  {
    chart: {
      renderTo: 'chart-5',
    },
    title: {
      text: 'Stacked Column Grouped Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [10, 8, 7, 5, 5],
      stack: 'stack 1',
    },
    {
      name: 'Example 2',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 1',
    },
    {
      name: 'Example 3',
      data: [4, 6, 4, 3, 2],
      stack: 'stack 1',
    },
    {
      name: 'Example 4',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 2',
    },
    {
      name: 'Example 5',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 2',
    },
    {
      name: 'Example 6',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 2',
    },
    {
      name: 'Example 7',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 3',
    },
    {
      name: 'Example 8',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 3',
    },
    {
      name: 'Example 9',
      data: [3, 3, 2, 2, 2],
      stack: 'stack 3',
    }],
    xAxis: {
      categories: ['X0', 'X1', 'X2', 'X3', 'X4'],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.bar,
  RAUL.highcharts.themes.red,
  {
    chart: {
      renderTo: 'chart-6',
    },
    title: {
      text: 'Bar Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      colorByPoint: true,
      data: [5, 4, 3, 2, 1],
    }],
    xAxis: {
      categories: [
        'Chart Legend Data Label 0',
        'Chart Legend Data Label 1',
        'Chart Legend Data Label 2',
        'Chart Legend Data Label 3',
        'Chart Legend Data Label 4',
      ],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.negativeStackedBar,
  RAUL.highcharts.themes.yellow,
  {
    chart: {
      renderTo: 'chart-7',
    },
    title: {
      text: 'Negative Stacked Bar Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [-5, -4, -3, -2, -1],
    },
    {
      name: 'Example 2',
      data: [5, 4, 3, 2, 1],
    }],
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.stackedBar,
  RAUL.highcharts.themes.orange,
  {
    chart: {
      renderTo: 'chart-8',
    },
    title: {
      text: 'Stacked Bar Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [10, 8, 7, 5, 5],
    },
    {
      name: 'Example 2',
      data: [3, 3, 2, 2, 2],
    },
    {
      name: 'Example 3',
      data: [10, 6, 4, 3, 2],
    }],
    xAxis: {
      categories: [
        'Chart Legend 1',
        'Chart Legend 2',
        'Chart Legend 3',
        'Chart Legend 4',
        'Chart Legend 5',
      ],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.spline,
  RAUL.highcharts.themes.green,
  {
    chart: {
      renderTo: 'chart-9',
    },
    title: {
      text: 'Spline Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [0, 8, 7, 5, 5],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 2',
      data: [0, 3, 2, 2, 2],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 3',
      data: [0, 6, 4, 3, 2],
      marker: {
        symbol: 'square',
      },
    }],
    xAxis: {
      categories: ['0', '1', '2', '3', '4'],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.splineArea,
  RAUL.highcharts.themes.blue,
  {
    chart: {
      renderTo: 'chart-10',
    },
    title: {
      text: 'Spline Area Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [0, 8, 7, 5, 5],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 2',
      data: [0, 3, 2, 2, 2],
      marker: {
        symbol: 'square',
      },
    }],
    xAxis: {
      categories: ['0', '1', '2', '3', '4'],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.basicLine,
  RAUL.highcharts.themes.green,
  {
    chart: {
      renderTo: 'chart-11',
    },
    title: {
      text: 'Basic Line Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [1, 8, 7, 5, 5],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 2',
      data: [3, 1, 4, 2, 7],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 3',
      data: [5, 3, 2, 2, 2],
      marker: {
        symbol: 'square',
      },
    }],
    xAxis: {
      categories: ['0', '1', '2', '3', '4'],
    },
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.stackedArea,
  RAUL.highcharts.themes.pink,
  {
    chart: {
      renderTo: 'chart-12',
    },
    title: {
      text: 'Stacked Area Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    xAxis: {
      categories: ['0', '1', '2', '3', '4'],
    },
    series: [{
      name: 'Example 1',
      data: [1, 8, 7, 5, 5],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 2',
      data: [3, 1, 4, 2, 7],
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Example 3',
      data: [5, 3, 2, 2, 2],
      marker: {
        symbol: 'square',
      },
    }],
  }
))

window.Highcharts.chart(window.Highcharts.merge(
  RAUL.highcharts.types.bubble,
  RAUL.highcharts.themes.blue,
  {
    chart: {
      renderTo: 'chart-13',
    },
    title: {
      text: 'Bubble Chart',
    },
    subtitle: {
      text: 'Optional Subtitle',
    },
    series: [{
      name: 'Example 1',
      data: [{
        x: 1,
        y: 2,
        z: 3,
      }],
    },
    {
      name: 'Example 2',
      data: [{
        x: 2,
        y: 3,
        z: 4,
      }],
    },
    {
      name: 'Example 3',
      data: [{
        x: 15,
        y: 2,
        z: 7,
      }],
    },
    {
      name: 'Example 4',
      data: [{
        x: 5,
        y: 27,
        z: 13,
      }],
    },
    {
      name: 'Example 5',
      data: [{
        x: 3,
        y: 4,
        z: 5,
      }],
    },
    {
      name: 'Example 6',
      data: [{
        x: 43,
        y: 24,
        z: 6,
      }],
    },
    {
      name: 'Example 7',
      data: [{
        x: 23,
        y: 54,
        z: 16,
      }],
    },
    {
      name: 'Example 8',
      data: [{
        x: 54,
        y: 21,
        z: 43,
      }],
    },
    {
      name: 'Example 9',
      data: [{
        x: 65,
        y: 16,
        z: 7,
      }],
    }],
  }
))
