const administradorAdminLink = document.getElementById('administradorAdmin');
const userAdmin = document.getElementById('userAdmin');
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

