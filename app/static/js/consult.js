var _table_ = document.createElement('table'),
      _tr_ = document.createElement('tr'),
      _th_ = document.createElement('th'),
      _td_ = document.createElement('td'),
      _thead_ = document.createElement('thead'),
      _tbody_ = document.createElement('tbody');

function CreateTableInfo(arr){
  var container = document.getElementById("container-info");
  var parent = document.getElementById("info-template").innerHTML;
  container.innerHTML = parent;

  var table = _table_.cloneNode(false);
  var tbody = _tbody_.cloneNode(false),
    columns = addAllColumnHeaders(arr, table);
  for (var i = 0, maxi = arr.length; i < maxi; ++i) {
    var tr = _tr_.cloneNode(false);
    for (var j = 0, maxj = columns.length; j < maxj; ++j){
      var th = _th_.cloneNode(false);
      cellValue = arr[i][columns[j]];
      th.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      tr.appendChild(th);
    };
    tbody.appendChild(tr);
  };
  table.appendChild(tbody);

  table.id = "info-template-inner";
  table.classList.add("table");
  table.classList.add("table-hover");
  table.classList.add("text-secondary");
  table.classList.add("h-100");
  console.log("Table")
  console.log(table)
  var container_table = document.getElementById("info-template-table");
  container_table.innerHTML = "";

  container_table.appendChild=table;


};