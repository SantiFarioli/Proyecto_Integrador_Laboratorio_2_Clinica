const adminPaciente = document.getElementById('adminPaciente');
const viewsPaciente = document.getElementById('viewsPaciente');
const $tablaExamen = document.getElementById('table-examen');
const $adminExamen = document.getElementById('adminExamen');
const $formExamen = document.getElementById('form');
const $guardarExamen = document.getElementById('guardarExamen');
const $actualizarExamene = document.getElementById('actualizarExamen');
const $borrarExamen = document.getElementById('borrarExamen');
let pacientesDataTable;

document.addEventListener('DOMContentLoaded', function () {
	adminPaciente.addEventListener('click', async function (e) {
		e.preventDefault();
		viewsPaciente.classList.remove('d-none');

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

						timer: 1500,
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
									showConfirmButton: true,
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

			// Obtener las filas después de renderizar la tabla
		} else {
			console.error('Error al obtener los pacientes.');
		}
	} catch (error) {
		console.error('Error al obtener los pacientes:', error);
	}
}

function renderExamenesTable(examenes) {
	const table = `
		<table class="tablita table table-bordered table-striped mx-auto" id='myTable'>
		<thead>
			<tr>
				<th scope="col" class="text-center">idExamen</th>
				<th scope="col" class="text-center">Codigo</th>
				<th scope="col" class="text-center">Descripcion</th>
				<th scope="col" class="text-center">requisitosExamen</th>
				<th scope="col" class="text-center">tiempoDeExamen</th>
				<th scope="col" class="text-center">Action</th>
			</tr>
		</thead>
		<tbody class="text-center">
			${examenes.map((examen) => `
				<tr>
					<td>${examen.idExamen}</td>
					<td>${examen.codigo}</td>
					<td>${examen.descripcion}</td>
					<td>${examen.requisitosExamen}</td>
					<td>${examen.tiempoDeExamen}</td>				
					<td class="text-center ">
					<a href="#" type="button" class="btn btn-light btn-md"><i class="fa-solid fa-pen" id="actualizarIcon"></i></a>
					<a href="#" type="button" class="btn btn-light btn-md"><i class="fa-solid fa-trash" id="borrarIcon"></i></a>
					</td>
				</tr>
			`).join('')}
		</tbody>
		</table>
	`;
	$tablaExamen.innerHTML = table;

	$(document).ready(function () {
		$('#myTable').DataTable();
	});

	document.querySelectorAll('#actualizarIcon').forEach((actualizarBtn, index) => {
		actualizarBtn.addEventListener('click', () => {
			$actualizarExamene.disabled = false;
			$borrarExamen.disabled = true;
			$guardarExamen.disabled = true;
			$formExamen.querySelector('#idExamen').value = examenes[index].idExamen;
			$formExamen.querySelector('#codigo').value = examenes[index].codigo;
			$formExamen.querySelector('#descripcion').value = examenes[index].descripcion;
			$formExamen.querySelector('#requisitosExamen').value = examenes[index].requisitosExamen;
			$formExamen.querySelector('#tiempoDeExamen').value = examenes[index].tiempoDeExamen;

			// Obtener los datos del examen seleccionado
			$actualizarExamene.addEventListener('click', async (e) => {
				e.preventDefault();
				const idExamen = document.getElementById('idExamen').value;
				const examen = {
					
					codigo: document.getElementById('codigo').value,
					descripcion: document.getElementById('descripcion').value,
					requisitosExamen: document.getElementById('requisitosExamen').value,
					tiempoDeExamen: document.getElementById('tiempoDeExamen').value,
				};
				try {
					const response = await fetch(`http://localhost:3000/examen/${idExamen}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(examen),
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Examen Actualizado',
					}).then(() => {
						window.location.href = 'http://localhost:3000/';
						window.location.href = 'http://localhost:3000/admin';
					});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Error al actualizar el examen',
							text: 'Error al actualizar el examen',
						});
					}
				} catch (error) {
					console.error('Error al actualizar el examen:', error);
				}
			});
		})	
	});
}

// Obtener los examenes
document.addEventListener('DOMContentLoaded', function () {
$adminExamen.addEventListener('click',  async (e) => {	
	try {	
		const response = await fetch('/examen');
		if (response.ok) {
			const examenes = await response.json();
			renderExamenesTable(examenes);		
			$formExamen.classList.remove('d-none');
			$actualizarExamene.disabled = true;
			$borrarExamen.disabled = true;

			document.querySelectorAll('#borrarIcon').forEach((borrarIcon, index) => {
				borrarIcon.addEventListener('click', () => {
					const examen = examenes[index];
			
					$formExamen.querySelector('#idExamen').value = examen.idExamen;
					$formExamen.querySelector('#codigo').value = examen.codigo;
					$formExamen.querySelector('#descripcion').value = examen.descripcion;
					$formExamen.querySelector('#requisitosExamen').value = examen.requisitosExamen;
					$formExamen.querySelector('#tiempoDeExamen').value = examen.tiempoDeExamen;
					
					$actualizarExamene.disabled = true;
					$borrarExamen.disabled = false;
					$guardarExamen.disabled = true;
			
			
			// Eliminar examen
			$borrarExamen.addEventListener('click', async (e) => {
				e.preventDefault();
				const idExamen = document.getElementById('idExamen').value;
			
				try {
					const response = await fetch(`http://localhost:3000/examen/${idExamen}`, {
						method: 'DELETE',
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Examen eliminado',
						}).then(() => {
							window.location.href = 'http://localhost:3000/';
							window.location.href = 'http://localhost:3000/admin';
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Error al eliminar el examen',
							text: 'Error al eliminar el examen',
						});
					}
				} catch (error) {
					console.error('Error al eliminar el examen:', error);
				}
			});
		});
	});

		} else {
			console.error('Error al obtener los examenes.');
		}
	} catch (error) {
		console.log('Error al obtener los examenes:', error);
	}
  });
});





// Guardar examen
$guardarExamen.addEventListener('click', async (e) => {
	e.preventDefault();
	const examen = {
		codigo: document.getElementById('codigo').value,
		descripcion: document.getElementById('descripcion').value,
		requisitosExamen: document.getElementById('requisitosExamen').value,
		tiempoDeExamen: document.getElementById('tiempoDeExamen').value,
	};
	try {
		const response = await fetch('/examen', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(examen),
		});
		if (response.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Bioquimica Doña ADN',
				text: 'Examen guardado con exito',
			}).then(() => {
				window.location.href = 'http://localhost:3000/';
				window.location.href = 'http://localhost:3000/admin';
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Error al guardar el examen',
				text: 'Error al guardar el examen',
			});
		}
	} catch (error) {
		console.log('Error al guardar el examen:', error);
	}
});



