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
const formularioRegistroPaciente2 = document.getElementById(
	'formulario-paciente2'
);
const sexoSelect = document.getElementById('sexo');
const embarazoSi = document.getElementById('embarazo-si');
const embarazoNo = document.getElementById('embarazo-no');

const sexoSelect2 = document.getElementById('sexo2');
const embarazoSi2 = document.getElementById('embarazo-si2');
const embarazoNo2 = document.getElementById('embarazo-no2');

function habilitarBotonSegunTabla() {
	const filas = tablaPacientes.querySelectorAll('tbody tr');
	mostrarFormularioBusqueda.disabled = filas.length > 0;
}

// Observador para detectar cambios en la tabla
const observer = new MutationObserver(habilitarBotonSegunTabla);

// Configura el observador para observar cambios en el contenido de la tabla
const config = { childList: true, subtree: true };

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

				// Obtener las filas después de renderizar la tabla
			} else {
				console.error('Error al obtener los pacientes.');
			}
		} catch (error) {
			console.error('Error al obtener los pacientes:', error);
		}
	});
});

function renderPacientesTable(pacientes) {
	const tableBody = document
		.getElementById('tablaDePacientes')
		.querySelector('tbody');

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
	$(document).ready(function () {
		$('#tablaDePacientes').DataTable({
			// Otras opciones de configuración
			editable: true, // Habilitar la edición en línea
		});
	});
}

document.addEventListener('click', function (event) {
	const target = event.target;
	if (target && target.id.startsWith('iconoPen')) {
		const pacienteId = target.id.replace('iconoPen', '');
		console.log(pacienteId);

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
					`<input id="sexoPaciente" class="swal2-input" placeholder="Sexo" value="${rowData.sexo}">` +
					`<input id="embarazoPaciente" class="swal2-input" placeholder="Embarazo" value="${rowData.embarazo}">` +
					`<input id="fechaNacimientoPaciente" class="swal2-input" placeholder="Fecha de Nacimiento" value="${rowData.fecha_nac}">` +
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
						embarazo: document.getElementById('embarazoPaciente').value,
					};
				},
			}).then((result) => {
				if (result.isConfirmed) {
					// Aquí puedes enviar los datos del paciente al servidor o hacer lo que necesites con ellos
					const pacienteData = result.value;
					Swal.fire({
						icon: 'info',
						title: 'Actualizando Datos...',
						showConfirmButton: false,
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
								});
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

function habilitarEmbarazoPorSexo(sexoSelect, embarazoSi, embarazoNo) {
	if (sexoSelect) {
		sexoSelect.addEventListener('change', function () {
			if (sexoSelect.value === 'Masculino') {
				embarazoSi.disabled = true;
				embarazoNo.disabled = true;
				embarazoNo.checked = true; // Establecer en "No"
			} else {
				embarazoSi.disabled = false;
				embarazoNo.disabled = false;
			}
		});
	}
}
/*const nombreInput = document.getElementById('nombre');
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
			const sexoInput = document.getElementById('sexo'); // Obtén el valor del campo de sexo
			const embarazoSi = document.getElementById('embarazo-si');
			const embarazoNo = document.getElementById('embarazo-no');

			const embarazoInput = embarazoSi.checked ? true : false;

			habilitarEmbarazoPorSexo(sexoInput, embarazoSi, embarazoNo);

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
				sexo: sexoInput.value,
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
				console.log('mensaje de despues del if');
				// Mostrar un mensaje de éxito con Swal.fire
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Paciente Registrado!',
				}).then(() => {
					// Redirigir al usuario a la pantalla principal
					window.location.href = 'http://localhost:3000/recepcionista';
				});
			} else {
				console.log('mensaje de despues del else');
				// Manejar errores (por ejemplo, mostrar un mensaje de error)
				Swal.fire({
					icon: 'error',
					title: 'Bioquimica Doña ADN',
					text: 'Error al registrar el paciente!',
				});
			}*/
/*********************************************
 *     Generar Orden de Trabajo
 *********************************************/
const formularioOrdenTrabajo = document.getElementById(
	'formulario-orden-trabajo'
);
const generarOrdenButton = document.getElementById('navbarOrdenTrabjo');
document.addEventListener('DOMContentLoaded', function () {
	generarOrdenButton.addEventListener('click', function (e) {
		e.preventDefault();

		formularioOrdenTrabajo.classList.remove('d-none');
	});
});
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
					Swal.fire({
						icon: 'info',
						title: 'Guardando Datos...',
						showConfirmButton: false,
					});

					// Enviar los datos del médico al servidor
					fetch('/medico', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(medicoData),
					})
						.then((response) => {
							if (response.status === 201) {
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
