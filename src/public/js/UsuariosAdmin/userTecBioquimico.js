
const adminTecnicoBioquimicoLink = document.getElementById('adminTecnicoBioquimico');
const userTecnicoBioquimico = document.getElementById('userTecnicoBioquimico');
const actulizarTecnicoBioquimico = document.getElementById('btnEditarTecnicoBioquimico');
const eliminarTecnicoBioquimico = document.getElementById('btnEliminarTecnicoBioquimico');
let tecnicoBioquimicoDataTable;

document.addEventListener('DOMContentLoaded', function () {
	// Agrega un evento al enlace 'Administrar Recepción'

	adminTecnicoBioquimicoLink.addEventListener('click', async function (e) {
		e.preventDefault();
		if (userTecnicoBioquimico.classList.contains('d-none')) {
			userTecnicoBioquimico.classList.remove('d-none');
		} else {
			userTecnicoBioquimico.classList.add('d-none');
		}

		try {
			const response = await fetch('/tecnicosBioquimicos');
			if (response.ok) {
				const tecnicoBioquimico = await response.json();
				renderTecnicoBioquimico(tecnicoBioquimico);
			} else {
				console.error('Error al obtener los recepcionistas.');
			}
		} catch (error) {
			console.error('Error al obtener los recepcionistas:', error);
		}
	});
});

function renderTecnicoBioquimico(tecnicoBioquimico) {
	if (tecnicoBioquimicoDataTable) {
		tecnicoBioquimicoDataTable.destroy();
	}

	const tableBody = document.getElementById('tableUserTecnicoBioquimico').querySelector('tbody');
	tableBody.innerHTML = '';

	tecnicoBioquimico.forEach((tecnicoBioquimicos) => {
		const newRow = tableBody.insertRow();
		newRow.innerHTML = `
      <td>${tecnicoBioquimicos.idTecnicoBioquimico}</td>
      <td>${tecnicoBioquimicos.nombre}</td>
      <td>${tecnicoBioquimicos.apellido}</td>
      <td>${tecnicoBioquimicos.dni}</td>
      <td>${tecnicoBioquimicos.telefono}</td>
      <td>${tecnicoBioquimicos.correo}</td>
      <td>${tecnicoBioquimicos.contrasenia}</td>
      <td>
      <div class="d-flex justify-content-center ">
                <div class="icon-container" id="iconoEditarContainer${tecnicoBioquimicos.idTecnicoBioquimico}">
                    <i class="fa-solid fa-pen" id="iconoEditar${tecnicoBioquimicos.idTecnicoBioquimico}"></i>
                    <span class="tooltip">Editar Tecnico Bioquimico</span>
                </div>
                <div class="icon-container" id="iconoEliminarContainer${tecnicoBioquimicos.idTecnicoBioquimico}">
                    <i class="fa-solid fa-trash" id="iconoEliminar${tecnicoBioquimicos.idTecnicoBioquimico}"></i>
                    <span class="tooltip">Eliminar Tecnico Bioquimico</span>
                </div>
            </div>
      </td>
    `;
		tableBody.appendChild(newRow);
	});

	// Inicializa DataTable
	tecnicoBioquimicoDataTable = $('#myTable').DataTable({
		// Otras opciones de configuración
		editable: true, // Habilitar la edición en línea
	});

	// Evento de click al icono de la tabla para capturar los datos de la tabla y cargarlos en el formulario
    document.querySelectorAll('.fa-pen').forEach((icono, index) => {
		icono.addEventListener('click', (e) => {

			formUserTecnicoBioquimico.querySelector('#idTecnicoBioquimico').value = tecnicoBioquimico[index].idTecnicoBioquimico;
			formUserTecnicoBioquimico.querySelector('#nombreTecnicoBioquimico').value = tecnicoBioquimico[index].nombre;
			formUserTecnicoBioquimico.querySelector('#apellidoTecnicoBioquimico').value = tecnicoBioquimico[index].apellido;
			formUserTecnicoBioquimico.querySelector('#dniTecnicoBioquimico').value = tecnicoBioquimico[index].dni;
			formUserTecnicoBioquimico.querySelector('#telefonoTecnicoBioquimico').value = tecnicoBioquimico[index].telefono;
			formUserTecnicoBioquimico.querySelector('#correoTecnicoBioquimico').value = tecnicoBioquimico[index].correo;
			formUserTecnicoBioquimico.querySelector('#contraseniaTecnicoBioquimico').value = tecnicoBioquimico[index].contrasenia;
			formUserTecnicoBioquimico.querySelector('#idUsuario1').value = tecnicoBioquimico[index].idUsuario;
	
		   
			document.getElementById('btnCrearTecnicoBioquimico').disabled = true;
			document.getElementById('btnEditarTecnicoBioquimico').disabled = false;
			document.getElementById('btnEliminarTecnicoBioquimico').disabled = true;
	
        
			formUserTecnicoBioquimico.classList.remove('d-none');
            userTecnicoBioquimico.classList.add('d-none');
			
		// Boton actualizar Bioquimico
			actulizarTecnicoBioquimico.addEventListener('click', async (e) => {
				e.preventDefault();
                
				const idTecnicoBioquimico = document.getElementById('idTecnicoBioquimico').value;
                const idUsuario = document.getElementById('idUsuario1').value;
				const tecnicoBioquimico ={
                    idTecnicoBioquimico: idTecnicoBioquimico,
                    nombre: document.getElementById('nombreTecnicoBioquimico').value,
                    apellido: document.getElementById('apellidoTecnicoBioquimico').value,
                    dni: document.getElementById('dniTecnicoBioquimico').value,
                    telefono: document.getElementById('telefonoTecnicoBioquimico').value,
                    correo: document.getElementById('correoTecnicoBioquimico').value,
                    contrasenia: document.getElementById('contraseniaTecnicoBioquimico').value,
                    idUsuario: idUsuario

				};
				console.log(tecnicoBioquimico);
                		
				try {				
					const response = await fetch(`/actualizarTecnicoBioquimico/${idTecnicoBioquimico}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(tecnicoBioquimico),
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Bioquimico actualizada con exito',
						}).then(() => {
							window.location.href = 'http://localhost:3000/';
							window.location.href = 'http://localhost:3000/admin';
						});
					}else {
						Swal.fire({
							icon: 'error',
							title: 'Error al actualizar la bioquimico',
							text: 'Error al actualizar la bioquimico',
						});
					}
				} catch (error) {
					console.error('Error al actualizar la muestra:', error);
				}
			});
		});
	});

	document.querySelectorAll('.fa-trash').forEach((eliminarIcono, index) => {
		eliminarIcono.addEventListener('click', (e) => {
	
			formUserTecnicoBioquimico.querySelector('#idTecnicoBioquimico').value = tecnicoBioquimico[index].idTecnicoBioquimico;
			formUserTecnicoBioquimico.querySelector('#nombreTecnicoBioquimico').value = tecnicoBioquimico[index].nombre;
			formUserTecnicoBioquimico.querySelector('#apellidoTecnicoBioquimico').value = tecnicoBioquimico[index].apellido;
			formUserTecnicoBioquimico.querySelector('#dniTecnicoBioquimico').value = tecnicoBioquimico[index].dni;
			formUserTecnicoBioquimico.querySelector('#telefonoTecnicoBioquimico').value = tecnicoBioquimico[index].telefono;
			formUserTecnicoBioquimico.querySelector('#correoTecnicoBioquimico').value = tecnicoBioquimico[index].correo;
			formUserTecnicoBioquimico.querySelector('#contraseniaTecnicoBioquimico').value = tecnicoBioquimico[index].contrasenia;
			formUserTecnicoBioquimico.querySelector('#idUsuario1').value = tecnicoBioquimico[index].idUsuario;
	
		   
			document.getElementById('btnCrearTecnicoBioquimico').disabled = true;
			document.getElementById('btnEditarTecnicoBioquimico').disabled = true;
			document.getElementById('btnEliminarTecnicoBioquimico').disabled = false;
	
		
			formUserTecnicoBioquimico.classList.remove('d-none');
			userTecnicoBioquimico.classList.add('d-none');
	
		});
	});

	eliminarTecnicoBioquimico.addEventListener('click', async (e) => {
		e.preventDefault();

		const idTecnicoBioquimico = document.getElementById('idTecnicoBioquimico').value;

		try {
			const response = await fetch(`/borrarTecnicoBioquimico/${idTecnicoBioquimico}`, {
				method: 'DELETE',
			});

			const idUsuario = document.getElementById('idUsuario1').value;
			console.log(idUsuario);

			const responseUsuario = await fetch(`/eliminarusuario/${idUsuario}`, {
				method: 'DELETE',
			});

			if(response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Bioquimico eliminada con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Bioquimica Doña ADN',
					text: 'Error al eliminar la bioquimico',
				});
			}
		} catch (error) {
			console.error('Error al eliminar la bioquimico:', error);
		}
	});
}



const formUserTecnicoBioquimico = document.getElementById('formUserTecnicoBioquimico');
const crearTecnicoBioquimico = document.getElementById('btnCrearTecnicoBioquimico');

//const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearTecBio = document.getElementById('crearTecBio');

	document.addEventListener('DOMContentLoaded', function () {
		
	crearTecBio.addEventListener('click', async function () {
		console.log('hola');

		userTecnicoBioquimico.classList.add('d-none');
		formUserTecnicoBioquimico.classList.remove('d-none');

		document.getElementById('btnCrearTecnicoBioquimico').disabled = false;
		document.getElementById('btnEditarTecnicoBioquimico').disabled = true;
		document.getElementById('btnEliminarTecnicoBioquimico').disabled = true;
	});

	
	crearTecnicoBioquimico.addEventListener('click', async function (e) {
		e.preventDefault(); 

		

		try {
			const TecnicoBioquimico = {
				nombre: document.getElementById('nombreTecnicoBioquimico').value,
				apellido: document.getElementById('apellidoTecnicoBioquimico').value,
				dni: document.getElementById('dniTecnicoBioquimico').value,
				telefono: document.getElementById('telefonoTecnicoBioquimico').value,
				correo: document.getElementById('correoTecnicoBioquimico').value,
				contrasenia: document.getElementById('contraseniaTecnicoBioquimico').value,
				idUsuario: document.getElementById('idUsuario1').value,
			};

			const responseUsuario = await fetch('/usuario', {
				method: 'POST',
				body: JSON.stringify({ rol: 'tecnicoBioquimico' }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!responseUsuario.ok) {
				throw new Error('Error al crear el usuario');
			}
			// Obtener el ID del usuario creado desde la respuesta
			const { idUsuario } = await responseUsuario.json();
			TecnicoBioquimico.idUsuario = idUsuario;

			const usuarioIdField = document.getElementById('idUsuario1');
			usuarioIdField.value = idUsuario;

			console.log(usuarioIdField.value);

			console.log(idUsuario);
			const response = await fetch('/newtecnicoBioquimico', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(TecnicoBioquimico),
			});

			console.log(TecnicoBioquimico);
			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Tecnico Bioquimico creado con exito',
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
})

