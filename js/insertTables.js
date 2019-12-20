var data = JSON.parse(data);
let table_keys = Object.keys(data);
var lis = []
lis.push(document.getElementById("li0"))
lis.push(document.getElementById("li1"))
for (i = 0; i < table_keys.length; i++) {
  var ul = document.getElementById("tables");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(table_keys[i]));
  li.setAttribute("id", `li${i+2}`);
  li.setAttribute("onclick", "displayTableInfo(this)")
  ul.appendChild(li);
  lis.push(li)
}
var ul = document.getElementById("tables");
var li = document.createElement("li");
li.appendChild(document.createTextNode("Summary"));
li.setAttribute("id", `li${lis.length}`);
li.setAttribute("class", "maintab")
li.setAttribute("value", "2")
li.setAttribute("onclick", "displayTableInfo(this)")
ul.appendChild(li);
lis.push(li)

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
    if (lis[i].value) {
      lis[i].style.color = 'blue';
      lis[i].style.backgroundColor = 'white';
    } else {
      lis[i].style.color = 'black';
      lis[i].style.backgroundColor = 'white';
    }
  }
  element.style.color = 'white';
  element.style.backgroundColor = 'dodgerblue';
  console.log(element.value);
  if (element.value === 1) {
    document.getElementById("small-graph").innerHTML = "";
    document.getElementById("title").innerHTML = "Welcome";
    document.getElementById("data-body").innerHTML = `
    <br>
    Welcome to our visualisation and discussion of the ways in which the Environment and energy use impacts the economy.
    <br><br><br><a class="subtitle">Contents</a><br>
    <ul>
    <li class="guide-li">Welcome page</li>
    <li class="guide-li">Introduction</li>
    <li class="guide-li">Visualised and annotated data</li>
    <li class="guide-li">Summary</li>
    </ul>
    <br><a class="subtitle">Guide</a><br>
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
    <br><a class="subtitle">Authors</a><br><br>
    Owain Williams (programmer, 16) & Rebekah Edwin (writer, 16)<br><br>
    <a class="contact">owain.williams@westminster.org.uk</a><br>
    <a class="contact">rebekah.edwin@westminster.org.uk</a>
    `;
  } else if (element.value === 2) {
    document.getElementById("small-graph").innerHTML = "";
    document.getElementById("title").innerHTML = "Summary";
    document.getElementById("data-body").innerHTML = ``;
  } else if (element.value === 3) {
    document.getElementById("small-graph").innerHTML = "";
    document.getElementById("title").innerHTML = "Introduction";
    document.getElementById("data-body").innerHTML = `
    <br>In the following graphs I have chosen to display the data with a logarithmic
    y-axis so that I could fit in all the dataset onto a rather small graph
    compared to the sheer number of datapoints. <b>When a 'general negative/positive
    time correlation is mentioned' this often means that there is a very steep gradient
    which does not show as well on a logarithmic scale.</b>
    <br><br><br><a class="subtitle">Programming</a>
    <br><br>All datasets were taken
    from the attached excel spreadsheets and (after being converted to a .db file, then to a .json file using python)
    were displayed using <a href="https://www.chartjs.org">chart.js</a>.<br> If the code is checked, there are no comments
    at the time of publishing due to a short production time and as I was working alone;
    however, I would be happy to type up my method.<br>
    The puclic github.com repo is attached <a href="https://github.com/TH3RMIT3/BofEComp">here</a>.
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
