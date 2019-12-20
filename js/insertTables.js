var data = JSON.parse(data);
let tables = Object.keys(data);
var lis = []
lis.push(document.getElementById("li0"))
for (i = 0; i < tables.length; i++) {
  var ul = document.getElementById("tables");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(tables[i]));
  li.setAttribute("id", `li${i+1}`);
  li.setAttribute("onclick", "displayTableInfo(this)")
  ul.appendChild(li);
  lis.push(li)
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
    document.getElementById("title").innerHTML = "Welcome"
    document.getElementById("data-body").innerHTML = "Click an item on the left to begin"
  } else {
    let tbn = tables[index-1]
    document.getElementById("title").innerHTML = tbn
    let button_to_graph = `<a href="directories/view_chart_data.html?id=${index}">To Graph</a>`
    document.getElementById("data-body").innerHTML = button_to_graph
  }
}

displayTableInfo(document.getElementById("li0"))
