const adminPaciente = document.getElementById('adminPaciente');
const viewsPaciente = document.getElementById('viewsPaciente');
const $tablaExamen = document.getElementById('table-examen');
const $tablaMuestra = document.getElementById('table-muestras');
const $tablaDeterminacion = document.getElementById('table-determinacion');
const $adminExamen = document.getElementById('adminExamen');
const $adminMuestra = document.getElementById('adminMuestra');
const $adminDeterminacion = document.getElementById('adminDeterminacion');
const $adminValorReferencia = document.getElementById('adminValorReferencia');
const $formularioMuestra = document.getElementById('formMuestra');
const $formExamen = document.getElementById('form');
const $formDeterminacion = document.getElementById('formDeterminacion');
const $formValorReferencia = document.getElementById('formValorReferencia');
const $guardarExamen = document.getElementById('guardarExamen');
const $guardarMuestra = document.getElementById('guardarMuestra');
const $guardarDeterminacion = document.getElementById('guardarDeterminacion');
const $guardarValorReferencia = document.getElementById('guardarValorReferencia');
const $actualizarDeterminacion = document.getElementById('actualizarDeterminacion');
const $actualizarMuestra = document.getElementById('actualizarMuestra');
const $actualizarExamene = document.getElementById('actualizarExamen');
const $borrarMuestra = document.getElementById('borrarMuestra');
const $borrarDeterminacion = document.getElementById('borrarDeterminacion');
const $borrarExamen = document.getElementById('borrarExamen');
const $agregarDeterminacion = document.getElementById('agregarDeterminacion');
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
            <a href="#" type="button" class="btn btn-light btn-md"><i class="fa-solid fa-pen" id="iconoPen${paciente.idPaciente}"></i> </a>
			<a href="#" type="button" class="btn btn-light btn-md"><i class="fa-solid fa-trash" id="borrarPaciente${paciente.idPaciente}"></i> </a>
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
				<th scope="col" class="text-center">Solicitudes</th>
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
					<td class="text-center">
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-pen" id="actualizarIcon"></i></a>
					<span class="tooltip">Actualizar Examen</span>
					</div>					
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-trash" id="borrarIcon"></i></a>
					<span class="tooltip">Borrar Examen</span>
					</div>				
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm muestraIcon" data-id-examen="${examen.idExamen}"><i class="fas fa-flask"></i></a>
					<span class="tooltip">Crear Muestra</span>
					</div>				
					</td>
				</tr>
			`).join('')}
		</tbody>
		</table>
	`;
	$tablaExamen.innerHTML = table;

	$(document).ready(function () {
		$('#myTable').DataTable( {
			"language": {
				"decimal": "",
				"emptyTable": "No hay datos disponibles",
				"info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
				"infoEmpty": "Mostrando 0 a 0 de 0 registros",
				"infoFiltered": "(filtrado de _MAX_ total de registros)",
				"infoPostFix": "",
				"thousands": ",",
				"lengthMenu": "Mostrar _MENU_ registros",
				"loadingRecords": "Cargando...",
				"processing": "Procesando...",
				"search": "Buscar:",
				"zeroRecords": "No se encontraron resultados",
				"paginate": {
					"first": "Primero",
					"last": "Ultimo",
					"next": "Siguiente",
					"previous": "Anterior",
				},
			},
		});
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

	//Muestra examen
	document.querySelectorAll('.muestraIcon').forEach((muestraIcon) => {
		muestraIcon.addEventListener('click', (e) => {
			e.preventDefault();
			const idExamen = muestraIcon.getAttribute('data-id-examen');
			$formularioMuestra.querySelector('#idExamen1').value = idExamen;
	
			$formExamen.classList.add('d-none');
			$tablaExamen.classList.add('d-none');
			$formularioMuestra.classList.remove('d-none');
			
		});
	})
}

// Obtener los examenes y Borrar
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


/*
//Borrar paciente
document.addEventListener('click', (e) => {
	const target = e.target;
	if ( target && target.id.startsWith('borrarPaciente')) {
		const idPaciente = target.id.replace('borrarPaciente', '');
		console.log(idPaciente);

		fetch(`http://localhost:3000/pacientes/${idPaciente}`, {
			method: 'DELETE',
		})
		.then((response) => {
			if (response.status === 204) {
				Swal.fire({
					icon: 'success',
					title: 'Paciente eliminado',
					text: 'Paciente eliminado',
				}).then(() => {
					refreshPacientesTable();
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error al eliminar el paciente',
					text: 'Error al eliminar el paciente',
				});
			}
		})
		.catch((error) => {
			console.error('Error al eliminar el paciente:', error);
		});
	}
});
*/

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


//Guardar Muestra de Examen

$guardarMuestra.addEventListener('click', async (e) => {
	e.preventDefault();
	const muestra = {
		tipo: document.getElementById('tipo').value,
		descripcion: document.getElementById('descripcion1').value,
		idExamen: document.getElementById('idExamen1').value		
	};

	console.log(muestra);
	try {
		const response = await fetch('/muestra', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(muestra),
		});
		if (response.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Bioquimica Doña ADN',
				text: 'Muestra guardada con exito',
			}).then(() => {
				window.location.href = 'http://localhost:3000/';
				window.location.href = 'http://localhost:3000/admin';
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Error al guardar la muestra',
				text: 'Error al espaço la muestra',
			});
		}
		
	} catch (error) {
			console.log('Error al guardar la muestra:', error);
	}
});

// Tabla de Muestras de Examen
function renderMuestras(muestras) {
	const table = `
		<table class="table table-bordered table-striped tablaMuestra" id='myTable'>
		<thead>
			<tr>
				<th scope="col">ID Muestra</th>
				<th scope="col">Tipo</th>
				<th scope="col">Descripcion</th>
				<th scope="col">ID Examen</th>
				<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			${muestras.map((muestra) => `
				<tr>
					<th scope="row">${muestra.idMuestra}</th>
					<td>${muestra.tipo}</td>
					<td>${muestra.descripcion}</td>
					<td>${muestra.idExamen}</td>
					<td>
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm" id="actualizarIconMuesta"><i class="fa-solid fa-pen"></i></a>
					<span class="tooltip">Actualizar Muestra</span>
					</div>
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm" id="borrarIconMuestra"><i class="fa-solid fa-trash"></i></a>
					<span class="tooltip">Borrar Muestra</span>
					</div>					
					</td>
				</tr>
			`).join('')}
		</tbody>
		</table>
	`;

	$tablaMuestra.innerHTML = table;

	$(document).ready(function () {
		$('#myTable').DataTable({
			
		});
	});

	document.querySelectorAll('#actualizarIconMuesta').forEach((icono) => {
		icono.addEventListener('click', (e) => {
			e.preventDefault();
			const row = e.target.closest('tr');
			const idMuestra = row.querySelector('th').textContent;
			const tipo = row.querySelector('td:nth-child(2)').textContent;
			const descripcion = row.querySelector('td:nth-child(3)').textContent;
			const idExamen = row.querySelector('td:nth-child(4)').textContent;
	
			
			document.getElementById('idMuestra').value = idMuestra;
			document.getElementById('tipo').value = tipo;
			document.getElementById('descripcion1').value = descripcion;
			document.getElementById('idExamen1').value = idExamen;
	
		   
			document.getElementById('guardarMuestra').disabled = true;
			document.getElementById('actualizarMuestra').disabled = false;
			document.getElementById('borrarMuestra').disabled = true;
	
		   
			$formularioMuestra.classList.remove('d-none');
			$tablaMuestra.classList.add('d-none');

			$actualizarMuestra.addEventListener('click', async (e) => {
				e.preventDefault();
				const idMuestra = document.getElementById('idMuestra').value;
				const muestra ={
					tipo: document.getElementById('tipo').value,
					descripcion: document.getElementById('descripcion1').value,
					idExamen: document.getElementById('idExamen1').value
				};
				console.log(muestra);		
				try {
					const response = await fetch(`/muestra/${idMuestra}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(muestra),
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Muestra actualizada con exito',
						}).then(() => {
							window.location.href = 'http://localhost:3000/';
							window.location.href = 'http://localhost:3000/admin';
						});
					}else {
						Swal.fire({
							icon: 'error',
							title: 'Error al actualizar la muestra',
							text: 'Error al actualizar la muestra',
						});
					}
				} catch (error) {
					console.error('Error al actualizar la muestra:', error);
				}
			});
		});
	});
}


$adminMuestra.addEventListener('click', async (e) => {
	e.preventDefault();
	try {
		const response = await fetch('/muestra');
		if (response.ok) {
			const muestras = await response.json();
			renderMuestras(muestras);
		} else {
			console.error('Error al obtener las muestras');
		}
	} catch (error) {
		console.error('Error al obtener las muestras:', error);
	}
});


function renderDeterminacionExamenMuestra(muestras) {
	const table = `
		<table class="tablita table table-bordered table-striped mx-auto" id='myTable'>
		<thead>
			<tr>
				<th scope="col" class="text-center">ID Examen</th>
				<th scope="col" class="text-center">Codigo</th>
				<th scope="col" class="text-center">Descripcion</th>
				<th scope="col" class="text-center">Tipo de Muestra</th>	
				<th scope="col" class="text-center">Solicitudes</th>
				
			</tr>
		</thead>
		<tbody class="text-center">
			${muestras.map((muestra) => `
				<tr>
					<td>${muestra.idExamen}</td>					
					<td>${muestra.examen.codigo}</td>
					<td>${muestra.examen.descripcion}</td>
					<td>${muestra.tipo}</td>		
					<td class="text-center">
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-plus" id="crearDeterminacionIcon"></i></a>
					<span class="tooltip">Create Determinacion</span>
					</div>
					</td>
				</tr>
			`).join('')}
		</tbody>
		</table>
	`;
	$tablaExamen.innerHTML = table;

	$(document).ready(function () {
		$('#myTable').DataTable( {
			"language": {
				"decimal": "",
				"emptyTable": "No hay datos disponibles",
				"info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
				"infoEmpty": "Mostrando 0 a 0 de 0 registros",
				"infoFiltered": "(filtrado de _MAX_ total de registros)",
				"infoPostFix": "",
				"thousands": ",",
				"lengthMenu": "Mostrar _MENU_ registros",
				"loadingRecords": "Cargando...",
				"processing": "Procesando...",
				"search": "Buscar:",
				"zeroRecords": "No se encontraron resultados",
				"paginate": {
					"first": "Primero",
					"last": "Ultimo",
					"next": "Siguiente",
					"previous": "Anterior",
				},
			},
		});
	});

	document.querySelectorAll('#crearDeterminacionIcon').forEach((icono, index) => {
		icono.addEventListener('click', (e) => {
			$tablaExamen.classList.add('d-none');
			document.querySelector('#guardarDeterminacion').disabled = false;
			document.querySelector('#actualizarDeterminacion').disabled = true;
			document.querySelector('#borrarDeterminacion').disabled = true;
			$formDeterminacion.classList.remove('d-none');

			$formDeterminacion.querySelector('#idExamen2').value = muestras[index].idExamen;
			
	
			$guardarDeterminacion.addEventListener('click', async (e) => {
				e.preventDefault();
				const idExamen = document.querySelector('#idExamen2').value;
				const determinacion = {
					nombre: document.querySelector('#nombreDeterminacion').value,
					descripcion: document.querySelector('#descripcion2').value,
					unidadMedida: document.querySelector('#unidadMedida').value,
					metodoAnalisis: document.querySelector('#metodoAnalisis').value,
					idExamen,
				};
				console.log(determinacion);
				try {
					const response = await fetch('/determinacion', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(determinacion),
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Determinacion creada con exito',
						}).then(() => {
							refreshDeterminaciones();
							$formDeterminacion.classList.add('d-none');
					});
					}else{
						Swal.fire({
							icon: 'error',
							title: 'Error al crear la Determinacion',
							text: 'Error al crear la Determinacion',
						});
					}
				} catch (error) {
					console.error('Error al actualizar la muestra:', error);
				}
			});
		});
	});
}




	$adminDeterminacion.addEventListener('click',  async (e) => {	
		try {	
			const response = await fetch('/muestra');
			if (response.ok) {
				const muestras = await response.json();
				renderDeterminacionExamenMuestra(muestras);
	
			} else {
				console.error('Error al obtener los examenes');
			}
		} catch (error) {
			console.error('Error al obtener los examenes:', error);
		}
	});


function renderDeterminaciones(deteminaciones) {
	const table = `
		<table class="tablita table table-bordered table-striped mx-auto" id='tablaDeterminacion'>
		<thead>
			<tr>
				<th scope="col" class="text-center">Id Determinacion</th>
				<th scope="col" class="text-center">Nombre</th>
				<th scope="col" class="text-center">Descripcion</th>
				<th scope="col" class="text-center">Unidad Medida</th>	
				<th scope="col" class="text-center">Metodo Analisis</th>
				<th scope="col" class="text-center">Id Examen</th>
				<th scope="col" class="text-center">Acciones</th>
			</tr>
		</thead>
		<tbody class="text-center">
			${deteminaciones.map((determinacion) => `
				<tr>		
					<td>${determinacion.idDeterminacion}</td>
					<td>${determinacion.nombre}</td>
					<td>${determinacion.descripcion}</td>
					<td>${determinacion.unidadMedida}</td>
					<td>${determinacion.metodoAnalisis}</td>
					<td>${determinacion.idExamen}</td>
					<td class="text-center">
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-pen" id="actualizarDeterminacionIcon"></i></a>
					<span class="tooltip">Actualizar Determinacion</span>
					</div>
					<div class="icon-container">
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-trash" id="borrarDeterminacionIcon"></i></a>
					<span class="tooltip">Eliminar Determinacion</span>
					</div>
					</td>
				</tr>
			`).join('')}
		</tbody>
		</table>
	`;
	$tablaDeterminacion.innerHTML = table;

	$(document).ready(function () {
		$('#tablaDeterminacion').DataTable( {
			
		})
	});

	document.querySelectorAll('#actualizarDeterminacionIcon').forEach((icono, index) => {
		icono.addEventListener('click', (e) => {
			e.preventDefault();
			const fila = document.querySelectorAll('#tablaDeterminacion tbody tr')[index];
			const idDeterminacion = fila.querySelector('td:nth-child(1)').textContent;
			const nombre = fila.querySelector('td:nth-child(2)').textContent;
			const descripcion = fila.querySelector('td:nth-child(3)').textContent;
			const unidadMedida = fila.querySelector('td:nth-child(4)').textContent;
			const metodoAnalisis = fila.querySelector('td:nth-child(5)').textContent;
			const idExamen = fila.querySelector('td:nth-child(6)').textContent;

			$formDeterminacion.querySelector('#idDeterminacion').value = idDeterminacion;
			$formDeterminacion.querySelector('#nombreDeterminacion').value = nombre;
			$formDeterminacion.querySelector('#descripcion2').value = descripcion;
			$formDeterminacion.querySelector('#unidadMedida').value = unidadMedida;
			$formDeterminacion.querySelector('#metodoAnalisis').value = metodoAnalisis;
			$formDeterminacion.querySelector('#idExamen2').value = idExamen;

		
			$tablaDeterminacion.classList.add('d-none');
			$formDeterminacion.classList.remove('d-none');

			document.querySelector('#guardarDeterminacion').disabled = true;
			document.querySelector('#actualizarDeterminacion').disabled = false;
			document.querySelector('#borrarDeterminacion').disabled = false;

			$actualizarDeterminacion.addEventListener('click', async (e) => {
				e.preventDefault();
				const idDeterminacion = document.querySelector('#idDeterminacion').value;
				const determinacion = {
					idDeterminacion: idDeterminacion,
					nombre: document.querySelector('#nombreDeterminacion').value,
					descripcion: document.querySelector('#descripcion2').value,
					unidadMedida: document.querySelector('#unidadMedida').value,
					metodoAnalisis: document.querySelector('#metodoAnalisis').value,
					idExamen: document.querySelector('#idExamen2').value
				}
				try {
					const response = await fetch(`http://localhost:3000/determinacion/${idDeterminacion}`, {
						method: 'PUT',  
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(determinacion),
					});
					console.log(response);
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Determinacion Actualizado',						
					}).then(() => {
						refreshDeterminaciones();
						$formDeterminacion.classList.add('d-none');
						$tablaDeterminacion.classList.remove('d-none');				
					})					
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Error al actualizar el determinacion',
							text: 'Error al actualizar el determinacion',
						});
					}
				} catch (error) {
					console.error('Error al actualizar el determinacion:', error);
				}
			});
		})	
	});
}

	async function refreshDeterminaciones() {
		try {
			const response = await fetch('/determinacion');
			if (response.ok) {
				const determinaciones = await response.json();
				renderDeterminaciones(determinaciones);
			}else {
				console.error('Error al obtener los examenes');
			}
		} catch (error) {
			console.error('Error al obtener los examenes:', error);
		}
	}



	$adminValorReferencia.addEventListener('click',  async (e) => {	
		e.preventDefault();
		try {
			const response = await fetch('/determinacion');
			if (response.ok) {
				const determinaciones = await response.json();
				renderDeterminacionesParaValor(determinaciones);
			}
		} catch (error) {
			console.log(error);
		}				
	});

	function renderDeterminacionesParaValor(determinaciones) {
		const table = `
			<table class="tablita table table-bordered table-striped mx-auto" id='tablaDeterminacionParaValor'>
			<thead>
				<tr>
					<th scope="col" class="text-center">Id Determinacion</th>
					<th scope="col" class="text-center">Nombre</th>
					<th scope="col" class="text-center">Descripcion</th>
					<th scope="col" class="text-center">Unidad Medida</th>   
					<th scope="col" class="text-center">Metodo Analisis</th>
					<th scope="col" class="text-center">Id Examen</th>
					<th scope="col" class="text-center">Acciones</th>
				</tr>
			</thead>
			<tbody class="text-center">
				${determinaciones.map((determinacion, index) => `
					<tr>        
						<td>${determinacion.idDeterminacion}</td>
						<td>${determinacion.nombre}</td>
						<td>${determinacion.descripcion}</td>
						<td>${determinacion.unidadMedida}</td>
						<td>${determinacion.metodoAnalisis}</td>
						<td>${determinacion.idExamen}</td>
						<td class="text-center">
						<div class="icon-container">
						<a href="#" class="btn btn-light btn-sm crearValorReferenciaIcon" data-index="${index}">
						<i class="fa-regular fa-file-lines"></i></a>
						<span class="tooltip">Crear Valores Referencia</span>
						</div>
						<div class="icon-container">
						<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-pen" id="actualizarValorReferenciaIcon"> </i></a>
						<span class="tooltip">Actualizar Valores Referencia</span>
						</div>
						<div class="icon-container">
						<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-trash" id="borrarValorReferenciaIcon"> </i></a>
						<span class="tooltip">Eliminar Valores Referencia</span>
						</div>
						</td>
					</tr>
				`).join('')}
			</tbody>
			</table>
		`;
		$tablaDeterminacion.innerHTML = table;
	
		$(document).ready(function () {
			$('#tablaDeterminacionParaValor').DataTable();
		});
	
		
		document.querySelectorAll('.crearValorReferenciaIcon').forEach((icon) => {
			icon.addEventListener('click', (e) => {
				e.preventDefault();
				const index = icon.getAttribute('data-index');
				const idDeterminacion = determinaciones[index].idDeterminacion;
				// Ocultar la tabla de determinaciones y mostrar el formulario de referencia de valores
				$tablaDeterminacion.classList.add('d-none');
				$formValorReferencia.classList.remove('d-none');
				// Rellenar el campo de entrada idDeterminacion con el ID recuperado
				$formValorReferencia.querySelector('#idDeterminacion1').value = idDeterminacion;
			});
		});
	}


	$guardarValorReferencia.addEventListener('click', async (e) => {
		e.preventDefault();
		const idDeterminacion = document.getElementById('idDeterminacion1').value;
		const valorReferencia = {
			sexo: document.getElementById('sexo').value,
			edadMinima: document.getElementById('edadMinima').value,
			edadMaxima: document.getElementById('edadMaxima').value,
			valorMinimo: document.getElementById('valorMinimo').value,
			valorMaximo: document.getElementById('valorMaximo').value,
			embarazo: document.getElementById('embarazo').value,
			idDeterminacion
		}

		console.log(valorReferencia);

		try {
			const response = await fetch ('/valorReferencia', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(valorReferencia),
			});

			if(response.ok){
				Swal.fire({
					icon: 'success',
					title: 'Valores Referencia guardada con exito',
					text: 'Valores Referencia guardada con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error al guardar Valores Referencia',
					text: 'Error al guardar Valores Referencia',
				})
			}
		} catch (error) {
			console.log('Error al guardar Valores Referencia:', error);
		}
	})


