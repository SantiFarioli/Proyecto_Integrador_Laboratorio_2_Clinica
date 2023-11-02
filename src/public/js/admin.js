const adminPaciente = document.getElementById('adminPaciente');
const viewsPaciente = document.getElementById('viewsPaciente');
const $tablaExamen = document.getElementById('table-examen');
const $tablaMuestra = document.getElementById('table-muestras');
const $adminExamen = document.getElementById('adminExamen');
const $adminMuestra = document.getElementById('adminMuestra');
const $formularioMuestra = document.getElementById('formMuestra');
const $formExamen = document.getElementById('form');
const $guardarExamen = document.getElementById('guardarExamen');
const $guardarMuestra = document.getElementById('guardarMuestra');
const $actualizarMuestra = document.getElementById('actualizarMuestra');
const $actualizarExamene = document.getElementById('actualizarExamen');
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
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-pen" id="actualizarIcon"></i></a>
					<a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-trash" id="borrarIcon"></i></a>
					<a href="#" type="button" class="btn btn-light btn-sm muestraIcon" data-id-examen="${examen.idExamen}"><i class="fas fa-flask"></i></a>
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
				$agregarDeterminacion.classList.remove('d-none');
				

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
    					<a href="#" type="button" class="btn btn-light btn-sm" id="actualizarIconMuesta"><i class="fa-solid fa-pen"></i></a>
    					<a href="#" type="button" class="btn btn-light btn-sm" id="borrarIconMuestra"><i class="fa-solid fa-trash"></i></a>
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







