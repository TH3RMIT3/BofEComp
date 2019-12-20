var data = JSON.parse(data);
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(4);
let tables = Object.keys(data);
let table = tables[queryString-1]

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
        fill: false,
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
        //
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: data[table].chart_name
        },
        legendCallback: function(chart) {
          var text = [];
          text.push('<ul>');
          for (var i=0; i<chart.data.datasets.length; i++) {
            text.push('<li>');
            text.push('<span style="color:' + chart.data.datasets[i].borderColor + '" onclick="updateDataset(event, ' + '\'' + chart.legend.legendItems[i].datasetIndex + '\'' + ')">' + chart.data.datasets[i].label + '</span>');
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

var selected = []
updateDataset = function(e, datasetIndex) {
    var index = datasetIndex;
    var ci = e.view.chart;

    var lis = document.getElementById("legend").getElementsByTagName("li");

    if (selected.includes(index.toString())) {
      selected.splice(selected.indexOf(index), 1);
      if (selected.length === 0) {
        ci.data.datasets.forEach(function(e, i) {
          ci.getDatasetMeta(i).hidden = null;
          lis[i].style["text-decoration"] = "none";
          lis[i].style["opacity"] = 1;
        });
      } else {
        ci.data.datasets.forEach(function(e, i) {
          if (selected.includes(i.toString())) {
            ci.getDatasetMeta(i).hidden = null;
            lis[i].style["text-decoration"] = "none";
            lis[i].style["opacity"] = 1;
          } else {
            ci.getDatasetMeta(i).hidden = true;
            lis[i].style["text-decoration"] = "line-through";
            lis[i].style["opacity"] = 0.4;
          }
        });
      }
    } else {
      selected.push(index);
      ci.data.datasets.forEach(function(e, i) {
        if (selected.includes(i.toString())) {
          ci.getDatasetMeta(i).hidden = null;
          lis[i].style["text-decoration"] = "none";
          lis[i].style["opacity"] = 1;
        } else {
          ci.getDatasetMeta(i).hidden = true;
          lis[i].style["text-decoration"] = "line-through";
          lis[i].style["opacity"] = 0.4;
        }
      });
    }

    ci.update();
};

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, chartData);
document.getElementById("legend").innerHTML = chart.generateLegend();
