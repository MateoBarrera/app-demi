var _table_ = document.createElement('table'),
      _tr_ = document.createElement('tr'),
      _th_ = document.createElement('th'),
      _td_ = document.createElement('td'),
      _thead_ = document.createElement('thead'),
      _tbody_ = document.createElement('tbody'),
      _canvas_ = document.createElement("canvas");;

let id_session = null;

async function AddToContainer(component){
  var container = document.getElementById("container-info");
  container.appendChild(component);
}

async function ResetContainer(){
  var container = document.getElementById("container-info")
  container.innerHTML = "";
  return true;
}

function addAllColumnHeaders(arr, table) {
	var columnSet = [],
		thead = _thead_.cloneNode(false),
    tr = _tr_.cloneNode(false);

	for (var i = 0, l = arr.length; i < l; i++) {
		for (var key in arr[i]) {
			if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
				columnSet.push(key);
				var th = _th_.cloneNode(false);
				th.appendChild(document.createTextNode(key));
				tr.appendChild(th);
			}
		}
	}

	thead.appendChild(tr);
	thead.classList.add("text-primary");
	table.appendChild(thead);
	return columnSet;
}

function addSessionHeaders(arr, table) {
	var columnSet = [],
		thead = _thead_.cloneNode(false),
		tr = _tr_.cloneNode(false);
  for (var key in arr) {
    columnSet.push(key);
    var th = _th_.cloneNode(false);
    th.appendChild(document.createTextNode(arr[key]));
    tr.appendChild(th);
	}
	thead.appendChild(tr);
	thead.classList.add("text-primary");
	table.appendChild(thead);
	return columnSet;
}

function orderTable(card_id) {
  let reorder
  if (card_id == 2) {
    return {
      order: [0, 2, 1, 3, 4],
    }
  } else if (card_id == 3 || card_id == 4) {
    return {
      order: [4, 1, 5, 2, 3, 0],
    }
  } else {
    return {
      order: [1, 0],
    }
  }
}

function setClasses(table){
  table.classList.add("table");
	table.classList.add("table-hover");
	table.classList.add("text-secondary");  
  table.classList.add("text-center");
  table.classList.add("compact");
}

function SetInfo(session, parent, arr){
  var num_session = parent.querySelector("#session-name");
  num_session.innerHTML = session[1]+" | Sesión "+session[0];
  var hour_session = parent.querySelector("#session-hour");
	hour_session.innerHTML = session[4];
  var date_session = parent.querySelector("#session-date");
	date_session.innerHTML = session[3];
  var observacion = parent.querySelector("#observaciones");
  observacion.innerText = arr[0].Observaciones;

  delete arr[0].Sesión;
  delete arr[0].Observaciones

  let id_session = "session" + session[0];
  var info_child = parent.querySelector("#info-template-table");
	info_child.id = "info-" + id_session;

  let aux_arr = ["Inicial Docente", "Inicial Estudiante", "Inicial Herramienta"];
  var table = _table_.cloneNode(false),
		tbody = _tbody_.cloneNode(false),
		tr = _tr_.cloneNode(false);
	addSessionHeaders(aux_arr, table);

  for (var j = 0, maxj = 3; j < maxj; ++j) {
    var th = _th_.cloneNode(false);
    th.appendChild(document.createTextNode(arr[0][aux_arr[j]] || ""));
    tr.appendChild(th);
  }
  tbody.appendChild(tr);  
  table.appendChild(tbody);
  table.id = "info-table-"+id_session;
  setClasses(table);

  info_child.appendChild(table);
  aux_arr = ["Final Docente", "Final Estudiante", "Final Herramienta"];

  var table = _table_.cloneNode(false),
		tbody = _tbody_.cloneNode(false),
		tr = _tr_.cloneNode(false);
  addSessionHeaders(aux_arr, table);

  for (var j = 0, maxj = 3; j < maxj; ++j) {
		var th = _th_.cloneNode(false)
		th.appendChild(document.createTextNode(arr[0][aux_arr[j]] || ""))
		tr.appendChild(th)
	}
  tbody.appendChild(tr);
  table.appendChild(tbody);
  table.id = "info-table-2" + id_session;
  setClasses(table);
  info_child.appendChild(table);
  /* const datatablesSimple = document.getElementById("info-table-"+id_session);
	if (datatablesSimple) {
		let tables = new DataTable(datatablesSimple, {
			language: {
				url: "//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
			},
			responsive: true,
			dom: "Bfrtip",
			aaSorting: [],
			bPaginate: false,
			bFilter: false,
			bInfo: false,
			colReorder: { order: [3, 4, 5, 0, 1, 2] },
		})
	} */
  return true;
}

function SetGraph(id_session, parent, props) {
	var canvas = _canvas_.cloneNode(false);

	canvas.id = id_session+"-chart-1";
	canvas.width = "100%";
	canvas.height = "220";

	var conteo_inicial = props["conteo_inicial"];
	var el = parent.querySelector("#template-chart-1")
	el.innerHTML = "";
	el.appendChild(canvas)

	var ctx = parent.querySelector("#"+id_session+"-chart-1");
	var myPieChart = new Chart(ctx, {
		type: "pie",
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Reconocimiento Evaluación Inicial",
			},
			legend: {
				position: "right",
				align: "middle",
			},
		},
		data: {
			labels: ["Feliz", "Triste", "Enojado", "Sorprendido", "Neutro", "No se reconoce"],
			datasets: [
				{
					label: "Reconocimiento",
					data: [
						conteo_inicial.Felicidad,
						conteo_inicial.Tristeza,
						conteo_inicial.Enojo,
						conteo_inicial.Sorpresa,
						conteo_inicial.Neutral,
					],
					backgroundColor: ["#28a745", "#007bff", "#dc3545", "#ffc107", "#767676"],
				},
			],
		},
	})

	var canvas = _canvas_.cloneNode(false);
	canvas.id = id_session+"-chart-2";
	canvas.width = "100%";
	canvas.height = "250";
	var conteo_final = props["conteo_final"];
	var al = parent.querySelector("#template-chart-2");
	al.innerHTML = "";
	al.appendChild(canvas);

	var ctx = parent.querySelector("#"+id_session+"-chart-2");
	var myPieChart = new Chart(ctx, {
		type: "pie",
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Reconocimiento Evaluación Final",
			},
			legend: {
				position: "right",
				align: "middle",
			},
		},
		data: {
			labels: ["Feliz", "Triste", "Enojado", "Sorprendido", "Neutro", "No se reconoce"],
			datasets: [
				{
					label: "Reconocimiento",
					data: [
						conteo_final.Felicidad,
						conteo_final.Tristeza,
						conteo_final.Enojo,
						conteo_final.Sorpresa,
						conteo_final.Neutral,
					],
					backgroundColor: ["#28a745", "#007bff", "#dc3545", "#ffc107", "#767676"],
				},
			],
		},
	})
  return true;
}

let last_student_selected = " ";
function CreateInfoBlock(session, arr, props){
  
  if(session[1]!=last_student_selected){
      ResetContainer();
  }
  var parent = document.getElementById("info-template").cloneNode(true);
  let id_session = "session_" + session[0];
  parent.id = id_session;
  SetInfo(session, parent, arr);
  SetGraph(id_session, parent, props);
  AddToContainer(parent);
  last_student_selected = session[1];

}
