var _table_ = document.createElement("table"),
	_tr_ = document.createElement("tr"),
	_th_ = document.createElement("th"),
	_td_ = document.createElement("td"),
	_thead_ = document.createElement("thead"),
	_tbody_ = document.createElement("tbody"),
	_canvas_ = document.createElement("canvas"),
	_div_ = document.createElement("div"),
	_label_ = document.createElement("label"),
	_input_ = document.createElement("input")

let id_session = null

async function AddToContainer(component) {
	var container = document.getElementById("container-info")
	container.appendChild(component)
	document.getElementById("print-button").hidden = false
}

async function ResetContainer() {
	var container = document.getElementById("container-info")
	container.innerHTML = ""
	document.getElementById("print-button").hidden = true
	return true
}

function addAllColumnHeaders(arr, table) {
	var columnSet = [],
		thead = _thead_.cloneNode(false),
		tr = _tr_.cloneNode(false)

	for (var i = 0, l = arr.length; i < l; i++) {
		for (var key in arr[i]) {
			if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
				columnSet.push(key)
				var th = _th_.cloneNode(false)
				th.appendChild(document.createTextNode(key))
				th.classList.add("py-0")
				tr.appendChild(th)
			}
		}
	}

	thead.appendChild(tr)
	thead.classList.add("text-primary")
	table.appendChild(thead)
	return columnSet
}

function addSessionHeaders(arr, table) {
	var columnSet = [],
		thead = _thead_.cloneNode(false),
		tr = _tr_.cloneNode(false)
	for (var key in arr) {
		columnSet.push(key)
		var th = _th_.cloneNode(false)
		th.appendChild(document.createTextNode(arr[key]))
		th.classList.add("py-0")
		tr.appendChild(th)
	}
	thead.appendChild(tr)
	thead.classList.add("text-primary")
	table.appendChild(thead)
	return columnSet
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
	} else if (card_id == 5) {
		return {
			order: [0],
		}
	} else {
		return {
			order: [1, 0],
		}
	}
}

function setClasses(table) {
	table.classList.add("table")
	table.classList.add("table-hover")
	table.classList.add("text-secondary")
	table.classList.add("text-center")
	table.classList.add("compact")
}

function SetInfo(session, parent, arr) {
	var num_session = parent.querySelector("#session-name")
	num_session.innerHTML = session[1]
	var id_name = parent.querySelector("#session-id")
	id_name.innerHTML = " Sesión " + session[0]
	var topic = parent.querySelector("#session-topic")
	topic.innerHTML = session[2]
	var hour_session = parent.querySelector("#session-hour")
	hour_session.innerHTML = session[4]
	var date_session = parent.querySelector("#session-date")
	date_session.innerHTML = session[3]
	var observacion = parent.querySelector("#observaciones")
	observacion.innerText = arr[0].Observaciones

	delete arr[0].Sesión
	delete arr[0].Observaciones

	let id_session = "session" + session[0]

	let aux_arr = ["Inicial Docente", "Inicial Estudiante", "Inicial Herramienta"]
	var table = _table_.cloneNode(false),
		tbody = _tbody_.cloneNode(false),
		tr = _tr_.cloneNode(false)
	addSessionHeaders(aux_arr, table)

	for (var j = 0, maxj = 3; j < maxj; ++j) {
		var th = _th_.cloneNode(false)
		th.appendChild(document.createTextNode(arr[0][aux_arr[j]] || ""))
		th.classList.add("py-0")
		tr.appendChild(th)
	}
	tbody.appendChild(tr)
	table.appendChild(tbody)
	table.id = "info-table-" + id_session
	setClasses(table)

	var info_child = parent.querySelector("#template-info-table-1")
	info_child.id = "container-table1-" + id_session
	info_child.appendChild(table)
	aux_arr = ["Final Docente", "Final Estudiante", "Final Herramienta"]

	var table = _table_.cloneNode(false),
		tbody = _tbody_.cloneNode(false),
		tr = _tr_.cloneNode(false)
	addSessionHeaders(aux_arr, table)

	for (var j = 0, maxj = 3; j < maxj; ++j) {
		var th = _th_.cloneNode(false)
		th.appendChild(document.createTextNode(arr[0][aux_arr[j]] || ""))
		th.classList.add("py-0")
		tr.appendChild(th)
	}
	tbody.appendChild(tr)
	table.appendChild(tbody)
	table.id = "info-table-2" + id_session
	setClasses(table)

	var info_child = parent.querySelector("#template-info-table-2")
	info_child.id = "container-table2-" + id_session
	info_child.appendChild(table)
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
	return true
}

function SetGraph(id_session, parent, props) {
	var canvas = _canvas_.cloneNode(false)
	let width = "100%",
		height = "155"

	canvas.id = id_session + "-chart-1"
	canvas.width = width
	canvas.height = height

	var conteo_inicial = props["conteo_inicial"]
	var el = parent.querySelector("#template-chart-1")
	el.innerHTML = ""
	el.appendChild(canvas)

	var ctx = parent.querySelector("#" + id_session + "-chart-1")
	var myPieChart = new Chart(ctx, {
		type: "pie",
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Reconocimiento Evaluación Inicial",
			},
			legend: {
				labels: {
					boxWidth: 15,
				},
				position: "left",
				align: "middle",
			},
			animations: {
				radius: {
					duration: 400,
					easing: "linear",
					loop: (context) => context.active,
				},
			},
		},
		data: {
			labels: ["Feliz", "Triste", "Enojado", "Sorprendido", "Neutro"],
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

	var canvas = _canvas_.cloneNode(false)
	canvas.id = id_session + "-chart-2"
	canvas.width = width
	canvas.height = height
	var conteo_final = props["conteo_final"]
	var al = parent.querySelector("#template-chart-2")
	al.innerHTML = ""
	al.appendChild(canvas)

	var ctx = parent.querySelector("#" + id_session + "-chart-2")
	var myPieChart = new Chart(ctx, {
		type: "pie",
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Reconocimiento Evaluación Final",
			},
			legend: {
				labels: {
					boxWidth: 15,
				},
				position: "left",
				align: "middle",
			},
			animations: {
				radius: {
					duration: 400,
					easing: "linear",
					loop: (context) => context.active,
				},
			},
		},
		data: {
			labels: ["Feliz", "Triste", "Enojado", "Sorprendido", "Neutro"],
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
	return true
}

function CreateInfoBlock(session, arr, props) {
	var parent = document.getElementById("info-template").cloneNode(true)
	let id_session = "session_" + session[0]
	parent.id = id_session
	SetInfo(session, parent, arr)
	SetGraph(id_session, parent, props)
	AddToContainer(parent)
}

function createCargoSelect() {
	let select = document.createElement("select").cloneNode(false)
	let option_0 = document.createElement("option").cloneNode(false)
	option_0.innerHTML = "Docente"
	option_0.value = "docente"
	let option_1 = document.createElement("option").cloneNode(false)
	option_1.innerHTML = "Investigador"
	option_1.value = "investigador"

	select.appendChild(option_0)
	select.appendChild(option_1)
	return select
}

function createFieldset(name, value, type = false) {
	let input
	let input_class = "single-input"
	if (type == "select") {
		input = createCargoSelect()
		input_class = "select-input"
	} else if (type == "date") {
		input = _input_.cloneNode(false)
		input.type = "date"
	} else {
		input = _input_.cloneNode(false)
	}
	let label = _label_.cloneNode(false),
		div = _div_.cloneNode(false)
	label.innerHTML = name
	label.classList.add("h6")
	input.value = value
	input.id = name
	input.name = value
	div.classList.add(input_class)
	div.classList.add("col-3")
	div.appendChild(label)
	div.appendChild(input)
	return div
}

function loadDocenteBlock(data) {
	var container = document.getElementById("main-form")
	container.innerHTML = ""
	container.appendChild(createFieldset("Docente", data[1]))
	container.appendChild(createFieldset("Cargo", data[0], "select"))
	const select = document.getElementById("Cargo")
	select.value = data[0].toLowerCase()
}

function loadEstudianteBlock(data) {
	var container = document.getElementById("main-form")
	container.innerHTML = ""
	container.appendChild(createFieldset("Estudiante", data[0]))
	container.appendChild(createFieldset("Fecha_nacimiento", data[1], "date"))
	container.appendChild(createFieldset("Grado", data[2]))
	container.appendChild(createFieldset("Identificacion", data[3]))
	container.appendChild(createFieldset("Institucion", data[4]))
}

function hideFormButtons(value) {
	document.getElementById("main-form-buttons").hidden = value
}
