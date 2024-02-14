const adminRecepcionLink = document.getElementById('adminRecepcion');
const userRecepcionista = document.getElementById('userRecepcionista');
const actualizarRecepcionista = document.getElementById('btnEditarRecep');
const eliminarRecepcionista = document.getElementById('btnEliminarRecep');
let recepcionistasDataTable;

document.addEventListener('DOMContentLoaded', function () {
	// Agrega un evento al enlace 'Administrar Recepción'

	adminRecepcionLink.addEventListener('click', async function (e) {
		e.preventDefault();
		if (userRecepcionista.classList.contains('d-none')) {
			userRecepcionista.classList.remove('d-none');
		} else {
			userRecepcionista.classList.add('d-none');
		}

		try {
			const response = await fetch('/recepcionistas');
			if (response.ok) {
				const recepcionistas = await response.json();
				renderRecepcionistasTable(recepcionistas);
			} else {
				console.error('Error al obtener los recepcionistas.');
			}
		} catch (error) {
			console.error('Error al obtener los recepcionistas:', error);
		}
	});
});

function renderRecepcionistasTable(recepcionistas) {
	if (recepcionistasDataTable) {
		recepcionistasDataTable.destroy();
	}

	const tableBody = document
		.getElementById('tableUserRecepion')
		.querySelector('tbody');
	tableBody.innerHTML = '';

	recepcionistas.forEach((recepcionista) => {
		const newRow = tableBody.insertRow();
		newRow.innerHTML = `
      <td>${recepcionista.idRecepcionista}</td>
      <td>${recepcionista.nombre}</td>
      <td>${recepcionista.apellido}</td>
      <td>${recepcionista.dni}</td>
      <td>${recepcionista.telefono}</td>
      <td>${recepcionista.correo}</td>
      <td>${recepcionista.contrasenia}</td>
      <td>
      <div class="d-flex justify-content-center ">
                <div class="icon-container" id="iconoEditarContainer${recepcionista.idRecepcionista}">
                    <i class="fa-solid fa-pen" id="iconoEditar${recepcionista.idRecepcionista}"></i>
                    <span class="tooltip">Editar recepcionista</span>
                </div>
                <div class="icon-container" id="iconoEliminarContainer${recepcionista.idRecepcionista}">
                    <i class="fa-solid fa-trash" id="iconoEliminar${recepcionista.idRecepcionista}"></i>
                    <span class="tooltip">Eliminar recepcionista</span>
                </div>
            </div>
      </td>
    `;
		tableBody.appendChild(newRow);
	});

	// Inicializa DataTable
	recepcionistasDataTable = $('#tableUserRecepion').DataTable({
		// Otras opciones de configuración
		editable: true, // Habilitar la edición en línea
	});
	
	
	document.querySelectorAll('.fa-pen').forEach((icono, index) => {
		icono.addEventListener('click', (e) => {

			formUserRecepContainer.querySelector('#idRecepcionista').value = recepcionistas[index].idRecepcionista;
			formUserRecepContainer.querySelector('#nombre').value = recepcionistas[index].nombre;
			formUserRecepContainer.querySelector('#apellido').value = recepcionistas[index].apellido;
			formUserRecepContainer.querySelector('#dni').value = recepcionistas[index].dni;
			formUserRecepContainer.querySelector('#telefono').value = recepcionistas[index].telefono;
			formUserRecepContainer.querySelector('#correo').value = recepcionistas[index].correo;
			formUserRecepContainer.querySelector('#contrasenia').value = recepcionistas[index].contrasenia;
			formUserRecepContainer.querySelector('#idUsuario').value = recepcionistas[index].idUsuario;
	
		   
			document.getElementById('btnCrearRecep').disabled = true;
			document.getElementById('btnEditarRecep').disabled = false;
			document.getElementById('btnEliminarRecep').disabled = true;
	
        
			formUserRecepContainer.classList.remove('d-none');
            userRecepcionista.classList.add('d-none');
			
		// Boton actualizar Bioquimico
			actualizarRecepcionista.addEventListener('click', async (e) => {
				e.preventDefault();
                
				const idRecepcionista = document.getElementById('idRecepcionista').value;
                const idUsuario = document.getElementById('idUsuario').value;
				const recep ={
                    idRecepcionista: idRecepcionista,
                    nombre: document.getElementById('nombre').value,
                    apellido: document.getElementById('apellido').value,
                    dni: document.getElementById('dni').value,
                    telefono: document.getElementById('telefono').value,
                    correo: document.getElementById('correo').value,
                    contrasenia: document.getElementById('contrasenia').value,
                    idUsuario: idUsuario

				};
				console.log(recep);
                		
				try {				
					const response = await fetch(`/actualizarRecepcionista/${idRecepcionista}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(recep),
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Recepcionista actualizada con exito',
						}).then(() => {
							window.location.href = 'http://localhost:3000/';
							window.location.href = 'http://localhost:3000/admin';
						});
					}else {
						Swal.fire({
							icon: 'error',
							title: 'Bioquimica Doña ADN',
							text: 'Error al actualizar la Recepcionista',
						});
					}
				} catch (error) {
					console.error('Error al actualizar Recepcionista:', error);
				}
			});
		});
	});

	document.querySelectorAll('.fa-trash').forEach((eliminarIcono, index) => {
		eliminarIcono.addEventListener('click', (e) => {
	
			formUserRecepContainer.querySelector('#idRecepcionista').value = recepcionistas[index].idRecepcionista;
			formUserRecepContainer.querySelector('#nombre').value = recepcionistas[index].nombre;
			formUserRecepContainer.querySelector('#apellido').value = recepcionistas[index].apellido;
			formUserRecepContainer.querySelector('#dni').value = recepcionistas[index].dni;
			formUserRecepContainer.querySelector('#telefono').value = recepcionistas[index].telefono;
			formUserRecepContainer.querySelector('#correo').value = recepcionistas[index].correo;
			formUserRecepContainer.querySelector('#contrasenia').value = recepcionistas[index].contrasenia;
			formUserRecepContainer.querySelector('#idUsuario').value = recepcionistas[index].idUsuario;
	
		   
			document.getElementById('btnCrearRecep').disabled = true;
			document.getElementById('btnEditarRecep').disabled = true;
			document.getElementById('btnEliminarRecep').disabled = false;
	
		
			formUserRecepContainer.classList.remove('d-none');
			userRecepcionista.classList.add('d-none');
	
		});
	});

	eliminarRecepcionista.addEventListener('click', async (e) => {
		e.preventDefault();

		const idRecepcionista = document.getElementById('idRecepcionista').value;

		try {
			const response = await fetch(`/borrarRecepcionista/${idRecepcionista}`, {
				method: 'DELETE',
			});

			const idUsuario = document.getElementById('idUsuario').value;
			console.log(idUsuario);

			const responseUsuario = await fetch(`/eliminarusuario/${idUsuario}`, {
				method: 'DELETE',
			});

			if(response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Recepcionista eliminada con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Bioquimica Doña ADN',
					text: 'Error al eliminar el Recepcionista',
				});
			}
		} catch (error) {
			console.error('Error al eliminar Recepcionista:', error);
		}
	});
}


const userRecepcionistaContainer = document.getElementById('userRecepcionista');
const formUserRecepContainer = document.getElementById('formUserRecep');
const btnCrearRecep = document.getElementById('btnCrearRecep');

//const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearRecepcion = document.getElementById('crearRecepcion');
document.addEventListener('DOMContentLoaded', function () {
	crearRecepcion.addEventListener('click', async function () {
		console.log('hola');

		userRecepcionistaContainer.classList.add('d-none');
		formUserRecepContainer.classList.remove('d-none');


		document.getElementById('btnCrearRecep').disabled = false;
		document.getElementById('btnEditarRecep').disabled = true;
		document.getElementById('btnEliminarRecep').disabled = true;
	});

	// En el evento click del botón btnCrearRecep
	btnCrearRecep.addEventListener('click', async function (e) {
		e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

		// Recolectar los valores del formulario

		try {
			const recepcionista = {
				nombre: document.getElementById('nombre').value,
				apellido: document.getElementById('apellido').value,
				dni: document.getElementById('dni').value,
				telefono: document.getElementById('telefono').value,
				correo: document.getElementById('correo').value,
				contrasenia: document.getElementById('contrasenia').value,
				idUsuario: document.getElementById('idUsuario').value,
			};

			const responseUsuario = await fetch('/usuario', {
				method: 'POST',
				body: JSON.stringify({ rol: 'Recepcionista' }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!responseUsuario.ok) {
				throw new Error('Error al crear el usuario');
			}
			// Obtener el ID del usuario creado desde la respuesta
			const { idUsuario } = await responseUsuario.json();
			recepcionista.idUsuario = idUsuario;

			const usuarioIdField = document.getElementById('idUsuario');
			usuarioIdField.value = idUsuario;

			console.log(usuarioIdField.value);

			console.log(idUsuario);
			const response = await fetch('/newRecepcionista', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(recepcionista),
			});

			console.log(recepcionista);
			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Recepcionista creado con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error al crear el recepcionista',
					text: 'Error al crear el recepcionista',
				});
			}

		} catch (error) {
			console.error('Hubo un error al procesar la solicitud:', error);
		}
	});
});
