var data = JSON.parse(data);

let tables = Object.keys(data);
let table = tables[10]

let large_datasets = data[table].datasets
var datasets = []

for (i = 0; i < large_datasets.length; i++) {
    let set = large_datasets[i]
    let dataset = {
        label: set[0],
        data: set[1],
        backgroundColor: set[2],
        borderColor: set[3],
        borderWidth: 1,
        fill: false
    }
    datasets.push(dataset)
}

var chartData = {
    type: 'line',
    data: {
        labels: data[table].labels,
        datasets: datasets
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 0,
            bottom: 0,
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: data[table].chart_name
        },
        legendCallback: function(chart) {
          var text = [];
          text.push('<ul>');
          for (var i=0; i<chart.data.datasets.length; i++) {
            console.log(chart.data.datasets[i]);
            text.push('<li>');
            text.push('<span style="color:' + chart.data.datasets[i].borderColor + '">' + chart.data.datasets[i].label + '</span>');
            text.push('</li>');
          }
          text.push('</ul>');
          return text.join("");
        },
        scales: {
            yAxes: [{
              scaleLabel: {
                  display: true,
                  fontSize: 18,
                  labelString: data[table].chart_y_unit
              },
              ticks: {
                  beginAtZero: true
              },
              id: 'y-axis',
              type: 'logarithmic',
            }],
        }
    }
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, chartData);
document.getElementById("legend").innerHTML = chart.generateLegend();
