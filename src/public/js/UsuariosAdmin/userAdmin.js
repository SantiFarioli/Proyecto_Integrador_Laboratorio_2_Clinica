const administradorAdminLink = document.getElementById('administradorAdmin');
const userAdmin = document.getElementById('userAdmin');
const actulizarAdmin = document.getElementById('btnEditarAdmin');
const eliminarAdmin = document.getElementById('btnEliminarAdmin');
let adminDataTable;

document.addEventListener('DOMContentLoaded', function () {
	// Agrega un evento al enlace 'Administrar Recepción'

	administradorAdminLink.addEventListener('click', async function (e) {
		e.preventDefault();
		if (userAdmin.classList.contains('d-none')) {
			userAdmin.classList.remove('d-none');
		} else {
			userAdmin.classList.add('d-none');
		}

		try {
			const response = await fetch('/alladmins');
			if (response.ok) {
				const administradores = await response.json();
				renderAdministradores(administradores);
			} else {
				console.error('Error al obtener los recepcionistas.');
			}
		} catch (error) {
			console.error('Error al obtener los recepcionistas:', error);
		}
	});
});

function renderAdministradores(admin) {
	if (adminDataTable) {
		adminDataTable.destroy();
	}

	const tableBody = document.getElementById('tableUserAdmin').querySelector('tbody');
	tableBody.innerHTML = '';

	admin.forEach((admins) => {
		const newRow = tableBody.insertRow();
		newRow.innerHTML = `
      <td>${admins.idAdmin}</td>
      <td>${admins.nombre}</td>
      <td>${admins.apellido}</td>
      <td>${admins.dni}</td>
      <td>${admins.telefono}</td>
      <td>${admins.correo}</td>
      <td>${admins.contrasenia}</td>
      <td>
      <div class="d-flex justify-content-center ">
                <div class="icon-container" id="iconoEditarContainer${admins.idAdmin}">
                    <i class="fa-solid fa-pen" id="iconoEditar${admins.idAdmin}"></i>
                    <span class="tooltip">Editar Tecnico Bioquimico</span>
                </div>
                <div class="icon-container" id="iconoEliminarContainer${admins.idAdmin}">
                    <i class="fa-solid fa-trash" id="iconoEliminar${admins.idAdmin}"></i>
                    <span class="tooltip">Eliminar Tecnico Bioquimico</span>
                </div>
            </div>
      </td>
    `;
		tableBody.appendChild(newRow);
	});

	// Inicializa DataTable
	adminDataTable = $('#myTable').DataTable({
		// Otras opciones de configuración
		editable: true, // Habilitar la edición en línea
	});

	document.querySelectorAll('.fa-pen').forEach((icono, index) => {
		icono.addEventListener('click', (e) => {

			formUserAdmin.querySelector('#idAdmin').value = admin[index].idAdmin;
			formUserAdmin.querySelector('#nombreAdmin').value = admin[index].nombre;
			formUserAdmin.querySelector('#apellidoAdmin').value = admin[index].apellido;
			formUserAdmin.querySelector('#dniAdmin').value = admin[index].dni;
			formUserAdmin.querySelector('#telefonoAdmin').value = admin[index].telefono;
			formUserAdmin.querySelector('#correoAdmin').value = admin[index].correo;
			formUserAdmin.querySelector('#contraseniaAdmin').value = admin[index].contrasenia;
			formUserAdmin.querySelector('#idUsuario2').value = admin[index].idUsuario;
	
		   
			document.getElementById('btnCrearAdmin').disabled = true;
			document.getElementById('btnEditarAdmin').disabled = false;
			document.getElementById('btnEliminarAdmin').disabled = true;
	
        
			formUserAdmin.classList.remove('d-none');
            userAdmin.classList.add('d-none');
			
		// Boton actualizar Bioquimico
			actulizarAdmin.addEventListener('click', async (e) => {
				e.preventDefault();
                
				const idAdmin = document.getElementById('idAdmin').value;
                const idUsuario = document.getElementById('idUsuario2').value;
				const administrador ={
                    idAdmin: idAdmin,
                    nombre: document.getElementById('nombreAdmin').value,
                    apellido: document.getElementById('apellidoAdmin').value,
                    dni: document.getElementById('dniAdmin').value,
                    telefono: document.getElementById('telefonoAdmin').value,
                    correo: document.getElementById('correoAdmin').value,
                    contrasenia: document.getElementById('contraseniaAdmin').value,
                    idUsuario: idUsuario

				};
				console.log(administrador);
                		
				try {				
					const response = await fetch(`/actualizarAdmin/${idAdmin}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(administrador),
					});
					if (response.ok) {
						Swal.fire({
							icon: 'success',
							title: 'Bioquimica Doña ADN',
							text: 'Admin actualizada con exito',
						}).then(() => {
							window.location.href = 'http://localhost:3000/';
							window.location.href = 'http://localhost:3000/admin';
						});
					}else {
						Swal.fire({
							icon: 'error',
							title: 'Error al actualizar la bioquimico',
							text: 'Error al actualizar la Admin',
						});
					}
				} catch (error) {
					console.error('Error al actualizar Admin:', error);
				}
			});
		});
	});

	document.querySelectorAll('.fa-trash').forEach((eliminarIcono, index) => {
		eliminarIcono.addEventListener('click', (e) => {
	
			formUserAdmin.querySelector('#idAdmin').value = admin[index].idAdmin;
			formUserAdmin.querySelector('#nombreAdmin').value = admin[index].nombre;
			formUserAdmin.querySelector('#apellidoAdmin').value = admin[index].apellido;
			formUserAdmin.querySelector('#dniAdmin').value = admin[index].dni;
			formUserAdmin.querySelector('#telefonoAdmin').value = admin[index].telefono;
			formUserAdmin.querySelector('#correoAdmin').value = admin[index].correo;
			formUserAdmin.querySelector('#contraseniaAdmin').value = admin[index].contrasenia;
			formUserAdmin.querySelector('#idUsuario2').value = admin[index].idUsuario;
	
		   
			document.getElementById('btnCrearAdmin').disabled = true;
			document.getElementById('btnEditarAdmin').disabled = true;
			document.getElementById('btnEliminarAdmin').disabled = false;
	
		
			formUserAdmin.classList.remove('d-none');
			userAdmin.classList.add('d-none');
	
		});
	});

	eliminarAdmin.addEventListener('click', async (e) => {
		e.preventDefault();

		const idAdmin = document.getElementById('idAdmin').value;

		try {
			const response = await fetch(`/borrarAdmin/${idAdmin}`, {
				method: 'DELETE',
			});

			const idUsuario = document.getElementById('idUsuario2').value;
			console.log(idUsuario);

			const responseUsuario = await fetch(`/eliminarusuario/${idUsuario}`, {
				method: 'DELETE',
			});

			if(response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Admin eliminada con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Bioquimica Doña ADN',
					text: 'Error al eliminar el Admin',
				});
			}
		} catch (error) {
			console.error('Error al eliminar Admin:', error);
		}
	});
}


const userAdminContainer = document.getElementById('userAdmin');
const formUserAdmin = document.getElementById('formUserAdmin');
const crearUsuarioAdmin= document.getElementById('btnCrearAdmin');

//const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearAdm = document.getElementById('crearAdmin');

	document.addEventListener('DOMContentLoaded', function () {
		
	crearAdm.addEventListener('click', async function () {
		console.log('hola');

		userAdminContainer.classList.add('d-none');
		formUserAdmin.classList.remove('d-none');

		document.getElementById('btnCrearAdmin').disabled = false;
		document.getElementById('btnEditarAdmin').disabled = true;
		document.getElementById('btnEliminarAdmin').disabled = true;
	});

	
	crearUsuarioAdmin.addEventListener('click', async function (e) {
		e.preventDefault(); 

		

		try {
			const administrador = {
				nombre: document.getElementById('nombreAdmin').value,
				apellido: document.getElementById('apellidoAdmin').value,
				dni: document.getElementById('dniAdmin').value,
				telefono: document.getElementById('telefonoAdmin').value,
				correo: document.getElementById('correoAdmin').value,
				contrasenia: document.getElementById('contraseniaAdmin').value,
				idUsuario: document.getElementById('idUsuario2').value,
			};

			const responseUsuario = await fetch('/usuario', {
				method: 'POST',
				body: JSON.stringify({ rol: 'admin' }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!responseUsuario.ok) {
				throw new Error('Error al crear el usuario');
			}
			// Obtener el ID del usuario creado desde la respuesta
			const { idUsuario } = await responseUsuario.json();
			administrador.idUsuario = idUsuario;

			const usuarioIdField = document.getElementById('idUsuario2');
			usuarioIdField.value = idUsuario;

			console.log(usuarioIdField.value);

			console.log(idUsuario);
			const response = await fetch('/newAdmin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(administrador),
			});

			console.log(administrador);
			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Admin creado con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Bioquimica Doña ADN',
					text: 'Error al crear el Admin',
				});
			}

		} catch (error) {
			console.error('Hubo un error al procesar la solicitud:', error);
		}
	});
})

