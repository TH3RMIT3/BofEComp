var data = JSON.parse(data);
let table_keys = Object.keys(data);
var lis = []
lis.push(document.getElementById("li0"))
for (i = 0; i < table_keys.length; i++) {
  var ul = document.getElementById("tables");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(table_keys[i]));
  li.setAttribute("id", `li${i+1}`);
  li.setAttribute("onclick", "displayTableInfo(this)")
  ul.appendChild(li);
  lis.push(li)
}

function simple_chart_data(index) {
  let tables = Object.keys(data);
  let table = tables[index];

  let large_datasets = data[table].datasets;
  var datasets = [];

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
      datasets.push(dataset);
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
          animation: false,
          legend: {
            display: false
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
}

function displayTableInfo(element) {
  let index = element.id.substring(2)
  for (i = 0; i < lis.length; i++) {
    if (lis[i].id === "li0") {
      lis[i].style.color = 'blue';
      lis[i].style.backgroundColor = 'white';
    } else {
      lis[i].style.color = 'black';
      lis[i].style.backgroundColor = 'white';
    }
  }
  element.style.color = 'white';
  element.style.backgroundColor = 'dodgerblue';
  if (element.id === "li0") {
    document.getElementById("small-graph").innerHTML = ""
    document.getElementById("title").innerHTML = "Welcome"
    document.getElementById("data-body").innerHTML = `
    <ul>
    <li class="guide-li">Click an item on the left to begin.</li>
    <li class="guide-li">In each section, there are bullet-points discussing
    features of each graph concerning the economy.</li>
    <li class="guide-li">To see the graph in full with a Legend, click <i>'full graph'</i> below the title.</li>
    <li class="guide-li"><b>When in <i>'full graph'</i> mode you can isolate certain series by clicking on its legend.</b>
    This would be useful to visualise the points relating to the graphs as some graphs can be visually cluttered.</li>
    <li class="guide-li">Units:</li>
    <ul>
    <li class="guide-li"><b>Mt</b> - Million Tonnes</li>
    <li class="guide-li"><b>mt</b> - Thousand Tonnes</li>
    <li class="guide-li"><b>CO2e</b> - Carbon Dioxide Equivalent</li>
    <li class="guide-li"><b>oe</b> - Carbon Dioxide Equivalent</li>
    <li class="guide-li"><b>/a</b> - Per Year</li>
    <li class="guide-li"><b>PJ</b> - Petajoule (10^15)</li>
    <li class="guide-li"><b>FTE</b> - Full Time Equivalent</li>
    </ul>
    </ul>
    <a id="authors">Authors</a><br><br>
    Owain Williams (programmer) & Rebekah Edwin (writer)<br><br>
    <a class="contact">owain.williams@westminster.org.uk</a><br>
    <a class="contact">rebekah.edwin@westminster.org.uk</a>
    `;
  } else {
    let tinx = index-1;
    let notes = graph_notes[tinx];
    var note_contents;
    if (notes === undefined) {
      note_contents = "No Notes"
    } else {
      note_contents = notes.join('</li><li class="guide-li">');
    }
    let tbn = table_keys[tinx];
    document.getElementById("title").innerHTML = tbn;
    document.getElementById("data-body").innerHTML = `
    <br><a id="full-graph" href="directories/view_chart_data.html?id=${index}">FULL GRAPH</a><br>
    <ul>
    <li class="guide-li">
    ${note_contents}
    </li>
    </ul>
    `;
    document.getElementById("small-graph").innerHTML = `<canvas id="myChart"></canvas>`
    simple_chart_data(tinx);
  }
}

displayTableInfo(document.getElementById("li0"))
