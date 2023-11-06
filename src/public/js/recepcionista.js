// Obtén los elementos del DOM que quieres manipular
const formularioBusqueda = document.getElementById('formulario-busqueda');
const formularioRegistro = document.getElementById('formulario-registro');
const mostrarFormularioBusqueda = document.getElementById(
	'mostrar-formulario-busqueda'
);
const tablaPacientes = document.getElementById('tablaDePacientes');
const mostrarFormularioUpdate = document.getElementById(
	'formulario-actualizar'
);
const formularioPaciente = document.getElementById('formulario-paciente2');
const buscarPacienteButton = document.getElementById('buscar-paciente');
const criterioBusqueda = document.getElementById('criterio-busqueda');
const valorBusqueda = document.getElementById('valor-busqueda');
const resultados = document.getElementById('resultados');
const formularioRegistroPaciente = document.getElementById(
	'formulario-actualizar'
);

const sexoSelect = document.getElementById('sexo');
const embarazoSi = document.getElementById('embarazo-si');
const embarazoNo = document.getElementById('embarazo-no');

document.addEventListener('DOMContentLoaded', function () {
	// Obtén una referencia a la tabla
	const tablaPacientes = document.getElementById('tablaDePacientes');

	// Obtén una referencia al botón
	const mostrarFormularioBusqueda = document.getElementById(
		'mostrar-formulario-busqueda'
	);

	// Define una función que se activará cuando la tabla cambie
	const habilitarBotonRegistro = () => {
		// Verifica si la tabla contiene la fila con el texto "No matching records found"
		const filaVacia = tablaPacientes.querySelector('td.dataTables_empty');
		console.log(filaVacia);
		console.log(
			'La tabla tiene filas: ',
			tablaPacientes.querySelector('tbody tr')
		);

		if (filaVacia) {
			// Ejecuta la acción del if
			console.log('La tabla contiene la fila "No matching records found"');
			mostrarFormularioBusqueda.disabled = false;
		} else {
			// No se encuentra la fila, deshabilita el botón de registro
			mostrarFormularioBusqueda.disabled = true;
		}
	};

	// Observa los cambios en la tabla
	const observer = new MutationObserver(habilitarBotonRegistro);
	observer.observe(tablaPacientes.querySelector('tbody'), { childList: true });
});

let pacientesDataTable;

document.addEventListener('DOMContentLoaded', function () {
	// Agrega un evento al enlace 'Registrar Paciente' en la barra lateral
	formularioBusqueda.addEventListener('click', function (e) {
		e.preventDefault();
		formularioRegistro.classList.remove('d-none');
		formularioPaciente.classList.add('d-none');
	});

	// Agrega un evento al botón 'Registrar Nuevo Paciente'

	mostrarFormularioBusqueda.addEventListener('click', function () {
		formularioPaciente.classList.remove('d-none');
		formularioRegistro.classList.add('d-none');
	});

	formularioBusqueda.addEventListener('click', async function (e) {
		e.preventDefault();

		try {
			const response = await fetch('/pacientes');
			if (response.ok) {
				const pacientes = await response.json();
				renderPacientesTable(pacientes);
			} else {
				console.error('Error al obtener los pacientes.');
			}
		} catch (error) {
			console.error('Error al obtener los pacientes:', error);
		}
	});
});

function renderPacientesTable(pacientes) {
	if (pacientesDataTable) {
		pacientesDataTable.destroy();
	}
	const tableBody = document
		.getElementById('tablaDePacientes')
		.querySelector('tbody');
	tableBody.innerHTML = '';

	pacientes.forEach((paciente) => {
		const newRow = tableBody.insertRow();
		newRow.innerHTML = `
			<td >${paciente.idPaciente}</td>
			<td >${paciente.nombre}</td>
			<td >${paciente.apellido}</td>
			<td >${paciente.dni}</td>
			<td >${paciente.localidad}</td>
			<td >${paciente.provincia}</td>
			<td >${paciente.sexo}</td>
			<td >${paciente.embarazo ? 'Sí' : 'No'}</td>
			<td >${paciente.fecha_nac}</td>
			<td >${paciente.correo_electronico}</td>
			<td >${paciente.telefono}</td>
			<td >${paciente.obra_social}</td>
			<td >${paciente.num_afiliado}</td>
			<td>
			<i class='fa-regular fa-file-lines'id="iconoOrden${paciente.idPaciente}"></i>
            <i class="fa-solid fa-pen" id="iconoPen${paciente.idPaciente}"></i>

			</td>
		`;
		tableBody.appendChild(newRow);
	});

	// Inicializa DataTable
	pacientesDataTable = $('#tablaDePacientes').DataTable({
		// Otras opciones de configuración
		editable: true, // Habilitar la edición en línea
	});
}

document.addEventListener('click', function (event) {
	const target = event.target;
	if (target && target.id.startsWith('iconoPen')) {
		const pacienteId = target.id.replace('iconoPen', '');

		const iconoPen = target;
		const tableRow = iconoPen.closest('tr');
		if (tableRow) {
			// Obtén los datos de la fila
			const rowData = {
				nombre: tableRow.cells[1].textContent,
				apellido: tableRow.cells[2].textContent,
				dni: tableRow.cells[3].textContent,
				localidad: tableRow.cells[4].textContent,
				provincia: tableRow.cells[5].textContent,
				sexo: tableRow.cells[6].textContent,
				embarazo: tableRow.cells[7].textContent === 'Sí',
				fecha_nac: tableRow.cells[8].textContent,
				correo_electronico: tableRow.cells[9].textContent,
				telefono: tableRow.cells[10].textContent,
				obra_social: tableRow.cells[11].textContent,
				num_afiliado: tableRow.cells[12].textContent,
			};

			Swal.fire({
				title: 'Actualizar Datos del Paciente',
				html:
					`<input id="nombrePaciente" class="swal2-input" placeholder="Nombre" value="${rowData.nombre}">` +
					`<input id="apellidoPaciente" class="swal2-input" placeholder="Apellido" value="${rowData.apellido}">` +
					`<input id="dniPaciente" class="swal2-input" placeholder="DNI" value="${rowData.dni}">` +
					`<input id="localidadPaciente" class="swal2-input" placeholder="Localidad" value="${rowData.localidad}">` +
					`<input id="provinciaPaciente" class="swal2-input" placeholder="Provincia" value="${rowData.provincia}">` +
					`<div class='form-group'>
					<label for='sexo'>Sexo:</label>
					<select class='form-control' id='sexoPaciente' name='sexoPaciente' required>
					  <option value='masculino' ${
							rowData.sexo === 'masculino' ? 'selected' : ''
						}>Masculino</option>
					  <option value='femenino' ${
							rowData.sexo === 'femenino' ? 'selected' : ''
						}>Femenino</option>
					</select>
				 </div>` +
					`<div class='form-group'>
					<label for='embarazoPaciente'>Embarazo:</label>
					<div class='form-check'>
					  <input type='radio' class='form-check-input' id='embarazo-si' name='embarazoPaciente' value='Sí' required ${
							rowData.embarazo ? 'checked' : ''
						} />
					  <label class='form-check-label' for='embarazo-si'>Sí</label>
					</div>
					<div class='form-check'>
					  <input type='radio' class='form-check-input' id='embarazo-no' name='embarazoPaciente' value='No' required ${
							!rowData.embarazo ? 'checked' : ''
						} />
					  <label class='form-check-label' for='embarazo-no'>No</label>
					</div>
				 </div>` +
					`<input id="fechaNacimientoPaciente" class="swal2-input" type='date' placeholder="Fecha de Nacimiento" value="${rowData.fecha_nac}">` +
					`<input id="correoPaciente" class="swal2-input" placeholder="Correo Electrónico" value="${rowData.correo_electronico}">` +
					`<input id="telefonoPaciente" class="swal2-input" placeholder="Teléfono" value="${rowData.telefono}">` +
					`<input id="obraSocialPaciente" class="swal2-input" placeholder="Obra Social" value="${rowData.obra_social}">` +
					`<input id="numAfiliadoPaciente" class="swal2-input" placeholder="Número de Afiliado" value="${rowData.num_afiliado}">`,
				focusConfirm: false,
				preConfirm: () => {
					return {
						nombre: document.getElementById('nombrePaciente').value,
						apellido: document.getElementById('apellidoPaciente').value,
						dni: document.getElementById('dniPaciente').value,
						localidad: document.getElementById('localidadPaciente').value,
						provincia: document.getElementById('provinciaPaciente').value,
						fecha_nac: document.getElementById('fechaNacimientoPaciente').value,
						correo_electronico: document.getElementById('correoPaciente').value,
						telefono: document.getElementById('telefonoPaciente').value,
						obra_social: document.getElementById('obraSocialPaciente').value,
						num_afiliado: document.getElementById('numAfiliadoPaciente').value,
						sexo: document.getElementById('sexoPaciente').value,
						embarazo:
							document.querySelector('input[name="embarazoPaciente"]:checked')
								.value === 'Sí',
					};
				},
			}).then((result) => {
				if (result.isConfirmed) {
					// Aquí puedes enviar los datos del paciente al servidor o hacer lo que necesites con ellos
					const pacienteData = result.value;
					Swal.fire({
						icon: 'info',
						title: 'Actualizando Datos...',
						howConfirmButton: false,
					});

					// Enviar los datos del paciente al servidor para actualizar
					fetch('/pacientes/actualizar/' + pacienteId, {
						method: 'PUT', // Utiliza el método PUT para actualizar
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(pacienteData),
					})
						.then((response) => {
							if (response.status === 200) {
								Swal.fire({
									icon: 'success',
									title: 'Paciente actualizado con éxito',
									showConfirmButton: true,
								});

								refreshPacientesTable();
							} else {
								Swal.fire({
									icon: 'error',
									title: 'Error al actualizar el paciente',
								});
							}
						})
						.catch((error) => {
							Swal.fire({
								icon: 'error',
								title: 'Error al enviar la solicitud al servidor',
								text: error,
							});
						});
				}
			});
		}
	}
});

async function refreshPacientesTable() {
	try {
		const response = await fetch('/pacientes');
		if (response.ok) {
			const pacientes = await response.json();

			renderPacientesTable(pacientes);
		} else {
			console.error('Error al obtener los pacientes.');
		}
	} catch (error) {
		console.error('Error al obtener los pacientes:', error);
	}
}

/*document.addEventListener('DOMContentLoaded', function () {
	formularioRegistroPaciente2.addEventListener('submit', async function (e) {
		e.preventDefault();

		const nombreInput = document.getElementById('nombre');
		const apellidoInput = document.getElementById('apellido');
		const dniInput = document.getElementById('dni');
		const localidadInput = document.getElementById('localidad');
		const provinciaInput = document.getElementById('provincia');
		const fechaNacimientoInput = document.getElementById('fecha_nac');
		const correoElectronicoInput =
			document.getElementById('correo_electronico');
		const telefonoInput = document.getElementById('telefono');
		const obraSocialInput = document.getElementById('obra_social');
		const numAfiliadoInput = document.getElementById('num_afiliado');

		const embarazoInput = embarazoSi.checked ? true : false;

		// Realiza el registro del paciente y obtén la respuesta del servidor
		const datosPaciente = {
			nombre: nombreInput.value,
			apellido: apellidoInput.value,
			dni: dniInput.value,
			localidad: localidadInput.value,
			provincia: provinciaInput.value,
			fecha_nac: fechaNacimientoInput.value,
			correo_electronico: correoElectronicoInput.value,
			telefono: telefonoInput.value,
			obra_social: obraSocialInput.value,
			num_afiliado: numAfiliadoInput.value,
			sexo: sexoSelect.value,
			embarazo: embarazoInput,
		};

		const response = await fetch('/pacientes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datosPaciente),
		});
		if (response.ok) {
			// Mostrar un mensaje de éxito con Swal.fire
			Swal.fire({
				icon: 'success',
				title: 'Bioquimica Doña ADN',
				text: 'Paciente Registrado!',
			}).then(() => {
				// Redirigir al usuario a la pantalla principal
				window.location.href = 'http://localhost:3000/';
				window.location.href = 'http://localhost:3000/recepcionista';
			});
		} else {
			// Manejar errores (por ejemplo, mostrar un mensaje de error)
			Swal.fire({
				icon: 'error',
				title: 'Bioquimica Doña ADN',
				text: 'Error al registrar el paciente!',
			});
		}
	});
});*/

// Agrega un evento 'change' al elemento de selección de sexo
sexoSelect.addEventListener('change', function () {
	if (sexoSelect.value === 'masculino') {
		// Si se selecciona 'Masculino', deshabilita y desmarca las opciones de embarazo
		embarazoSi.disabled = true;
		embarazoNo.disabled = true;
		embarazoSi.checked = false;
		embarazoNo.checked = true;
	} else if (sexoSelect.value === 'femenino') {
		// Si se selecciona 'Femenino', habilita las opciones de embarazo
		embarazoSi.disabled = false;
		embarazoNo.disabled = false;
	}
});

// Por si el valor inicial del select es 'Masculino' o 'Femenino'
if (sexoSelect.value === 'masculino') {
	embarazoSi.disabled = true;
	embarazoNo.disabled = true;
	embarazoSi.checked = false;
	embarazoNo.checked = false;
} else if (sexoSelect.value === 'femenino') {
	embarazoSi.disabled = false;
	embarazoNo.disabled = false;
}

/*********************************************
 *     Generar Orden de Trabajo
 *********************************************/
const formularioOrdenTrabajo = document.getElementById(
	'formulario-orden-trabajo'
);
const generarOrdenButton = document.getElementById('navbarOrdenTrabjo');
const btnAgergarExamen = document.getElementById('agregarExamenes');
let medicoId;
let pacienteId2;

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('cargarMedico')
		.addEventListener('click', function () {
			// Mostrar un diálogo de entrada de datos del médico con SweetAlert2
			Swal.fire({
				title: 'Guardar Datos del Médico',
				html:
					'<input id="nombreMedico" class="swal2-input" placeholder="Nombre">' +
					'<input id="apellidoMedico" class="swal2-input" placeholder="Apellido">' +
					'<input id="dniMedico" class="swal2-input" placeholder="DNI">' +
					'<input id="especialidadMedico" class="swal2-input" placeholder="Especialidad">' +
					'<input id="telefonoMedico" class="swal2-input" placeholder="Teléfono">' +
					'<input id="correoMedico" class="swal2-input" placeholder="Correo">' +
					'<input id="direccionMedico" class="swal2-input" placeholder="Dirección">', // Agregado campo "Dirección"
				focusConfirm: false,
				preConfirm: () => {
					return {
						nombre: document.getElementById('nombreMedico').value,
						apellido: document.getElementById('apellidoMedico').value,
						dni: document.getElementById('dniMedico').value,
						especialidad: document.getElementById('especialidadMedico').value,
						telefono: document.getElementById('telefonoMedico').value,
						correo: document.getElementById('correoMedico').value,
						direccion: document.getElementById('direccionMedico').value, // Agregado campo "Dirección"
					};
				},
			}).then((result) => {
				if (result.isConfirmed) {
					// Aquí puedes enviar los datos del médico al servidor o hacer lo que necesites con ellos
					const medicoData = result.value;

					// Enviar los datos del médico al servidor
					fetch('/medico', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(medicoData),
					})
						.then((response) => response.json())
						.then((data) => {
							if (data.idMedico) {
								medicoId = data.idMedico;
								Swal.fire({
									icon: 'success',
									title: 'Médico guardado con éxito',
								});
							} else {
								Swal.fire({
									icon: 'error',
									title: 'Error al guardar el médico',
								});
							}
						})
						.catch((error) => {
							Swal.fire({
								icon: 'error',
								title: 'Error al enviar la solicitud al servidor',
								text: error,
							});
						});
				}
			});
		});
});

function renderexamenTable(examen) {
	const tableBody2 = document
		.getElementById('tablaExamenes')
		.querySelector('tbody');

	examen.forEach((examenes) => {
		const newRow = tableBody2.insertRow();
		newRow.innerHTML = `
			<td>${examenes.idExamen}</td>
			<td>${examenes.codigo}</td>
			<td>${examenes.descripcion}</td>
			<td>${examenes.requisitosExamen}</td>
			<td>${examenes.tiempoDeExamen}</td>
			<td>
				<i class="fa-solid fa-plus" id='checkboxExam${examenes.idExamen}'></i>								
			</td>
		`;
		tableBody2.appendChild(newRow);
	});

	// Inicializa DataTable
	$(document).ready(function () {
		$('#tablaExamenes').DataTable({
			paging: false,
			scrollCollapse: true,
			scrollY: '300px',
		});
	});
}

document.addEventListener('click', async function (event) {
	const target2 = event.target;
	if (target2 && target2.id.startsWith('iconoOrden')) {
		// Obtener el ID del paciente desde el icono
		const pacienteId = target2.id.replace('iconoOrden', '');

		// Mostrar el formulario de registro
		document.getElementById('formulario-registro').classList.add('d-none');

		// Ocultar el formulario de orden de trabajo
		document
			.getElementById('formulario-orden-trabajo')
			.classList.remove('d-none');
		const fechaOrdInput = document.getElementById('fecha_ord');
		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() - offset);
		const formattedDate = now.toISOString().slice(0, 16);
		fechaOrdInput.value = formattedDate;

		try {
			const response = await fetch('/examen');
			if (response.ok) {
				const examen = await response.json();
				renderexamenTable(examen);

				// Obtener las filas después de renderizar la tabla
			} else {
				console.error('Error al obtener los examen.');
			}
		} catch (error) {
			console.error('Error al obtener los examen:', error);
		}

		// Recopilar los datos de la fila de la tabla
		const pacienteData = [];
		const tableRow = target2.closest('tr');
		tableRow.querySelectorAll('td').forEach((cell) => {
			pacienteData.push(cell.textContent);
		});

		// Rellenar el campo pacienteId en el formulario de registro con nombre y apellido
		// Los datos en el array
		const idPaciente = pacienteData[0];
		const nombre = pacienteData[1];
		const apellido = pacienteData[2];
		const dni = pacienteData[3];
		const localidad = pacienteData[4];
		const provincia = pacienteData[5];
		const sexo = pacienteData[6];
		const embarazo = pacienteData[7];
		const fechaNacimiento = pacienteData[8];
		const correoElectronico = pacienteData[9];
		const telefono = pacienteData[10];
		const obraSocial = pacienteData[11];
		const numAfiliado = pacienteData[12];
		pacienteId2 = parseInt(pacienteData[0], 10);

		// Calcular la edad a partir de la fecha de nacimiento
		const fechaNacimientoDate = new Date(fechaNacimiento);
		const fechaActual = new Date();
		const edadEnMilisegundos = fechaActual - fechaNacimientoDate;
		const edadEnAnios = Math.floor(
			edadEnMilisegundos / (365 * 24 * 60 * 60 * 1000)
		);

		// Llenar la tabla con los datos, incluyendo la edad
		document.getElementById('nombreOrden').textContent = nombre;
		document.getElementById('apellidoOrden').textContent = apellido;
		document.getElementById('dniOrden').textContent = dni;
		document.getElementById('edadOrden').textContent = edadEnAnios; // Mostrar la edad calculada
		document.getElementById('sexoOrden').textContent = sexo;
		document.getElementById('embarazoOrden').textContent = embarazo;
		document.getElementById('obra_socialOrden').textContent = obraSocial;
		document
			.getElementById('crearOrdenTrabajo')
			.addEventListener('click', guardarOrdenTrabajo);
	}
});

document.addEventListener('click', function (event) {
	const target = event.target;
	if (target && target.classList.contains('fa-plus')) {
		// Obtener el ID del examen desde el icono
		const examenId = target.id.replace('checkboxExam', '');
		// Obtener la fila del examen
		const examenRow = target.closest('tr');
		// Clonar la fila del examen para agregarla a la primera tabla
		const clonedRow = examenRow.cloneNode(true);

		// Cambiar el icono de "Agregar" por el icono de "Quitar"
		const plusIcon = clonedRow.querySelector('.fa-plus');
		plusIcon.classList.remove('fa-plus');
		plusIcon.classList.add('fa-xmark');
		plusIcon.addEventListener('click', function () {
			// Paso 3: Agregar manejador de eventos a los iconos de "Quitar" en la primera tabla
			// Eliminar la fila de la primera tabla al hacer clic en el icono "Quitar"
			clonedRow.remove();
		});

		// Agregar la fila clonada a la primera tabla
		const primeraTabla = document
			.getElementById('tablaExamenesAgregados')
			.getElementsByTagName('tbody')[0];
		primeraTabla.appendChild(clonedRow);
	}
});
let OrdenTrabajoId;
// Definir una función para enviar la orden de trabajo al servidor
async function guardarOrdenTrabajo() {
	// Obtener los datos del formulario de orden de trabajo
	const fechaCreacion = document.getElementById('fecha_ord').value;
	const diagnostico = document.getElementById('diagnostico').value;

	// Verificar que se haya seleccionado al menos un examen
	const examenesAgregados = document.querySelectorAll(
		'#tablaExamenesAgregados tbody tr'
	);
	if (examenesAgregados.length === 0) {
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'Debes agregar al menos un examen a la orden de trabajo',
		});
		return;
	}

	const idPaciente = pacienteId2;
	const idMedico = medicoId;
	// Crear un objeto con los datos de la orden de trabajo
	const ordenTrabajoData = {
		fechaCreacion,
		estado: 'iniciada', // Estado por defecto
		diagnostico,
		cancelada: false, // Valor por defecto
		idPaciente, // Obtener el ID del paciente desde donde lo tengas almacenado
		idMedico, // Obtener el ID del médico seleccionado
	};
	console.log(ordenTrabajoData);
	// Enviar los datos de la orden de trabajo al servidor y obtener el ID generado

	fetch('/orden-trabajo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(ordenTrabajoData),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.idOrdenTrabajo) {
				OrdenTrabajoId = data.idOrdenTrabajo;

				Swal.fire({
					icon: 'success',
					title: 'Orden guardado con éxito',
				});
				const examenesAgregadosTable = document.getElementById(
					'tablaExamenesAgregados'
				);
				const examenesAgregadosRows =
					examenesAgregadosTable.querySelectorAll('tbody tr');
				const idsDeExamenes = [];

				examenesAgregadosRows.forEach((row) => {
					const idExamenCell = row.querySelector('td:first-child');
					const idExamen = idExamenCell.textContent;
					idsDeExamenes.push(idExamen);
				});

				asociarExamenesAOrden(OrdenTrabajoId, idsDeExamenes);
				guardarFormularios();
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error al guardar la Orden',
				});
			}
		});
}

// Función para asociar múltiples exámenes a una orden de trabajo en la tabla examenes_y_ordenes
async function asociarExamenesAOrden(ordenTrabajoId, examenesIds) {
	try {
		const examenesIdsInt = examenesIds.map((id) => parseInt(id, 10));

		for (const examenId of examenesIdsInt) {
			const ordenTrabajoExamen = {
				idOrdenTrabajo: ordenTrabajoId, // Usar la variable ordenTrabajoId
				idExamen: examenId, // Usar la variable examenId
			};
			console.log(ordenTrabajoExamen);
			const response = await fetch('/examenes-y-ordenes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(ordenTrabajoExamen),
			});

			if (!response.ok) {
				console.error(
					`Error al asociar examen ${examenId} a la orden de trabajo ${ordenTrabajoId}`
				);
			}
		}
	} catch (error) {
		console.error('Error al asociar exámenes a la orden de trabajo:', error);
	}
}

// Variable para llevar un contador de formularios
// Definir un conjunto para realizar un seguimiento de los tipos de muestra agregados
const tiposDeMuestraAgregados = new Set();

document.addEventListener('click', async function (event) {
	const target = event.target;
	if (target && target.classList.contains('fa-plus')) {
		// Obtener el ID del examen desde el icono
		const examenId = target.id.replace('checkboxExam', '');
		// Verificar si ya existe un formulario con el mismo ID del examen
		const formularioExistente = document.getElementById(
			`muestraRequeridaForm${examenId}`
		);

		if (!formularioExistente) {
			// Realizar una solicitud para obtener el tipo de muestra desde la base de datos
			try {
				const response = await fetch(`/muestra/tipo?idExamen=${examenId}`);
				if (response.ok) {
					const muestraData = await response.json();
					console.log(muestraData);
					// Obtener el tipo de muestra de la respuesta
					const tipoMuestra = muestraData.tipo;
					const idMuestra = muestraData.idMuestra;

					// Verificar si el tipo de muestra ya ha sido agregado
					if (!tiposDeMuestraAgregados.has(tipoMuestra)) {
						tiposDeMuestraAgregados.add(tipoMuestra);

						// Crear un nuevo formulario solo si el tipo de muestra no ha sido agregado
						const nuevoFormulario = document.createElement('form');
						nuevoFormulario.classList.add('muestraRequeridaForm');

						// Asignar el ID del examen al formulario
						nuevoFormulario.id = `muestraRequeridaForm${examenId}`;

						// Acceder a los datos del paciente
						const nombre = document.getElementById('nombreOrden').textContent;
						const apellido =
							document.getElementById('apellidoOrden').textContent;
						const dni = document.getElementById('dniOrden').textContent;

						nuevoFormulario.innerHTML = `
                            <div class='form-row d-flex justify-content-center'>
                                <div class='col-md-3'>
                                    <label for='fechaRecepcion${examenId}'>Fecha de Recepción:</label>
                                    <input type='datetime-local' class='form-control' id='fechaRecepcion${examenId}' />
                                </div>
                                <div class='col-md-3'>
                                    <label for='entregada${examenId}'>Entregada:</label>
                                    <select class='form-control' id='entregada${examenId}' name='entregada${examenId}' required>
                                        <option value='no'>No</option>
                                        <option value='si'>Si</option>
                                    </select>
                                </div>
                                <div class='col-md-3'>
                                    <label for='etiqueta${examenId}'>Etiqueta:</label>
                                    <input type='text' class='form-control' id='etiqueta${examenId}' value='${nombre} ${apellido} (DNI: ${dni})' readonly />
                                </div>
                                <div class='col-md-3'>
                                    <label for='tipoMuestra${examenId}'>Tipo Muestra:</label>
                                    <input type='text' class='form-control' id='tipoMuestra${examenId}' value='${tipoMuestra}' readonly />
                                </div>
								<input type='hidden' id='idMuestra${examenId}' name='idMuestra${examenId}' value='${idMuestra}' />
                            </div>
                        `;

						// Agregar el nuevo formulario al contenedor
						const formulariosContainer = document.getElementById(
							'formulariosContainer'
						);
						formulariosContainer.appendChild(nuevoFormulario);
					}
				} else {
					console.error('Error al obtener el tipo de muestra.');
				}
			} catch (error) {
				console.error('Error al obtener el tipo de muestra:', error);
			}
		}
	}
});

// Ejemplo de cómo eliminar un formulario cuando se quita un examen de la tabla
document.addEventListener('click', async function (event) {
	const target = event.target;
	if (target && target.classList.contains('fa-xmark')) {
		// Obtener el ID del examen desde el icono
		const examenId = target.id.replace('checkboxExam', '');

		// Eliminar el formulario correspondiente al examen
		const formularioAEliminar = document.getElementById(
			`muestraRequeridaForm${examenId}`
		);
		if (formularioAEliminar) {
			formularioAEliminar.remove();
		}

		// También elimina el tipo de muestra asociado de la variable tiposDeMuestraAgregados
		try {
			const response = await fetch(`/muestra/tipo?idExamen=${examenId}`);
			if (response.ok) {
				const muestraData = await response.json();
				const tipoMuestra = muestraData.tipo;
				tiposDeMuestraAgregados.delete(tipoMuestra);
			}
		} catch (error) {
			console.error('Error al eliminar el tipo de muestra:', error);
		}
	}
});

async function guardarFormularios() {
	try {
		const formularios = document.querySelectorAll('.muestraRequeridaForm');
		const dataToSave = [];

		formularios.forEach((formulario) => {
			const examenId = parseInt(
				formulario.id.replace('muestraRequeridaForm', ''),
				10
			);
			const fechaRecepcion = formulario.querySelector(
				`#fechaRecepcion${examenId}`
			).value;

			// Validar la fecha antes de guardarla

			const entregada =
				formulario.querySelector(`#entregada${examenId}`).value === 'si'; // Convertir 'si' a true, 'no' a false
			const etiqueta = formulario.querySelector(`#etiqueta${examenId}`).value;
			const muestraId = parseInt(
				formulario.querySelector(`#idMuestra${examenId}`).value,
				10
			);

			// Agregar los datos a un objeto o array para enviarlos al servidor
			dataToSave.push({
				fechaRecepcion,
				entregada,
				etiqueta,
				idOrdenTrabajo: OrdenTrabajoId,
				idMuestra: muestraId,
			});
		});
		console.log(dataToSave);

		const response = await fetch('/muestraRequerida', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataToSave),
		});
		console.log(response);
		if (response.ok) {
			console.log('Datos guardados exitosamente');
		} else {
			console.error('Error al guardar los datos en el servidor');
		}
	} catch (error) {
		console.error('Error inesperado:', error);
	}
}

/*********************************************
 *     Cancelacion y consulta de Ordenes de trabajo
 *********************************************/
const consultaOrdeDeTrabajo = document.getElementById('consultaOrdeDeTrabajo');
const tablaAdministrarOrdenes = document.getElementById(
	'tablaAdministrarOrdenes'
);
document.addEventListener('DOMContentLoaded', function () {
	consultaOrdeDeTrabajo.addEventListener('click', function (e) {
		e.preventDefault();
		if (tablaConsultaOrdenes.classList.contains('d-none')) {
			tablaConsultaOrdenes.classList.remove('d-none');
		} else {
			tablaConsultaOrdenes.classList.add('d-none');
		}

		renderexamenTableOrdenTrabajo();
		renderexamenTableOrdenTrabajo2();
	});
});

async function renderexamenTableOrdenTrabajo() {
	const tablaOrden = document
		.getElementById('tablaAdministrarOrdenes')
		.querySelector('tbody');

	try {
		const response = await fetch('/ordenTrabajoFalse');
		if (response.ok) {
			// Destruye la DataTable existente
			if ($.fn.DataTable.isDataTable('#tablaAdministrarOrdenes')) {
				$('#tablaAdministrarOrdenes').DataTable().destroy();
			}

			const ordenFalse = await response.json();
			tablaOrden.innerHTML = ''; // Limpia el contenido anterior

			ordenFalse.forEach((orden) => {
				const newRow = tablaOrden.insertRow();
				newRow.innerHTML = `
                        <td>${orden.idOrdenTrabajo}</td>
                        <td>${orden.fechaCreacion}</td>
                        <td>${orden.estado}</td>
                        <td>${orden.diagnostico}</td>
                        <td>${orden.paciente.apellido}</td>
                        <td>${orden.paciente.dni}</td>
                        <td>
                            <i class="fa-solid fa-plus" id='checkboxOrden${orden.idOrdenTrabajo}'></i>								
                        </td>
                    `;
				tablaOrden.appendChild(newRow);
			});

			// Inicializa DataTable nuevamente
			$(document).ready(function () {
				$('#tablaAdministrarOrdenes').DataTable({
					paging: false,
					scrollCollapse: true,
				});
			});
		} else {
			console.error('Error al obtener las Órdenes de trabajo.');
		}
	} catch (error) {
		console.error('Error al obtener las Órdenes de trabajo:', error);
	}
}

async function renderexamenTableOrdenTrabajo2() {
	const tablaOrden = document
		.getElementById('tablaAdministrarOrdenes2')
		.querySelector('tbody');

	try {
		const response = await fetch('/ordenTrabajoTrue');
		if (response.ok) {
			// Destruye la DataTable existente
			if ($.fn.DataTable.isDataTable('#tablaAdministrarOrdenes2')) {
				$('#tablaAdministrarOrdenes2').DataTable().destroy();
			}

			const ordenTrue = await response.json();
			tablaOrden.innerHTML = ''; // Limpia el contenido anterior

			ordenTrue.forEach((orden) => {
				const newRow = tablaOrden.insertRow();
				newRow.innerHTML = `
                        <td>${orden.idOrdenTrabajo}</td>
                        <td>${orden.fechaCreacion}</td>
                        <td>${orden.estado}</td>
                        <td>${orden.diagnostico}</td>
                        <td>${orden.paciente.apellido}</td>
                        <td>${orden.paciente.dni}</td>
                        <td>
                            <i class="fa-solid fa-plus" id='checkboxOrdenCan${orden.idOrdenTrabajo}'></i>								
                        </td>
                    `;
				tablaOrden.appendChild(newRow);
			});

			// Inicializa DataTable nuevamente
			$(document).ready(function () {
				$('#tablaAdministrarOrdenes2').DataTable({
					paging: false,
					scrollCollapse: true,
				});
			});
		} else {
			console.error('Error al obtener los exámenes.');
		}
	} catch (error) {
		console.error('Error al obtener los exámenes:', error);
	}
}

// Agrega un manejador de eventos a los íconos de "Agregar" en la tablaAdministrarOrdenes
tablaAdministrarOrdenes.addEventListener('click', function (event) {
	const target = event.target;
	if (target && target.classList.contains('fa-plus')) {
		// Obtener el ID de la fila desde el icono
		const ordenId = target.id.replace('checkboxOrden', '');

		// Mostrar un cuadro de diálogo Swal para confirmar la acción
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¿Quieres cancelar esta Orden de Trabajo?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, cancelar',
			cancelButtonText: 'No, mantener',
		}).then(async (result) => {
			if (result.isConfirmed) {
				// Si el usuario confirma la acción, actualiza la columna cancelada en la base de datos
				const response = await fetch(`/orden-trabajo-cacelar/${ordenId}`, {
					method: 'PUT',
					body: JSON.stringify({ cancelada: true }), // Puedes ajustar según tu API
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					// Actualización exitosa
					Swal.fire('Orden de Trabajo cancelada con éxito', '', 'success');
					renderexamenTableOrdenTrabajo();
					renderexamenTableOrdenTrabajo2();
				} else {
					// Error en la actualización
					Swal.fire('Error al cancelar la Orden de Trabajo', '', 'error');
				}
			}
		});
	}
});

tablaAdministrarOrdenes2.addEventListener('click', function (event) {
	const target = event.target;
	if (target && target.classList.contains('fa-plus')) {
		// Obtener el ID de la fila desde el icono
		const ordenId = target.id.replace('checkboxOrdenCan', '');

		// Mostrar un cuadro de diálogo Swal para confirmar la acción
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¿Quieres restaurar esta Orden de Trabajo?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, restaurar',
			cancelButtonText: 'No, cancelar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				// Si el usuario confirma la acción, actualiza la columna cancelada en la base de datos
				const response = await fetch(`/orden-trabajo-cacelar/${ordenId}`, {
					method: 'PUT',
					body: JSON.stringify({ cancelada: false }), // Puedes ajustar según tu API
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					// Actualización exitosa
					Swal.fire('Orden de Trabajo restaurada con éxito', '', 'success');
					renderexamenTableOrdenTrabajo();
					renderexamenTableOrdenTrabajo2();
				} else {
					// Error en la actualización
					Swal.fire('Error al restaurar la Orden de Trabajo', '', 'error');
				}
			}
		});
	}
});
