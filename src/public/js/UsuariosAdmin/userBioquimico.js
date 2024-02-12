const adminBioquimicoLink = document.getElementById('adminBioquimico');
const userBioquimico = document.getElementById('userBioquimico');
let bioquimicoDataTable;

document.addEventListener('DOMContentLoaded', function () {
	// Agrega un evento al enlace 'Administrar Recepción'

	adminBioquimicoLink.addEventListener('click', async function (e) {
		e.preventDefault();
		if (userBioquimico.classList.contains('d-none')) {
			userBioquimico.classList.remove('d-none');
		} else {
			userBioquimico.classList.add('d-none');
		}

		try {
			const response = await fetch('/bioquimicos');
			if (response.ok) {
				const bioquimico = await response.json();
				renderBioquimico(bioquimico);
			} else {
				console.error('Error al obtener los recepcionistas.');
			}
		} catch (error) {
			console.error('Error al obtener los recepcionistas:', error);
		}
	});
});

function renderBioquimico(bioquimico) {
	if (bioquimicoDataTable) {
		bioquimicoDataTable.destroy();
	}

	const tableBody = document.getElementById('tableUserBioquimico').querySelector('tbody');
	tableBody.innerHTML = '';

	bioquimico.forEach((bioquimicos) => {
		const newRow = tableBody.insertRow();
		newRow.innerHTML = `
      <td>${bioquimicos.idBioquimico}</td>
      <td>${bioquimicos.nombre}</td>
      <td>${bioquimicos.apellido}</td>
      <td>${bioquimicos.dni}</td>
      <td>${bioquimicos.telefono}</td>
      <td>${bioquimicos.correo}</td>
      <td>${bioquimicos.especialidad}</td>
      <td>${bioquimicos.contrasenia}</td>
      <td>
      <div class="d-flex justify-content-center ">
                <div class="icon-container" id="iconoEditarContainer${bioquimicos.idBioquimico}">
                    <i class="fa-solid fa-pen" id="iconoEditar${bioquimicos.idBioquimico}"></i>
                    <span class="tooltip">Editar Bioquimico</span>
                </div>
                <div class="icon-container" id="iconoEliminarContainer${bioquimicos.idBioquimico}">
                    <i class="fa-solid fa-trash" id="iconoEliminar${bioquimicos.idBioquimico}"></i>
                    <span class="tooltip">Eliminar Bioquimico</span>
                </div>
            </div>
      </td>
    `;
		tableBody.appendChild(newRow);
	});

	// Inicializa DataTable
	bioquimicoDataTable = $('#myTable').DataTable({
		// Otras opciones de configuración
		editable: true, // Habilitar la edición en línea
	});
}
const userBioquimicoContainer = document.getElementById('userBioquimico');
const formUserBioquimico = document.getElementById('formUserBioquimico');
const crearBioquimico = document.getElementById('btnCrearBioquimico');

//const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearBio = document.getElementById('crearBio');

	document.addEventListener('DOMContentLoaded', function () {
		
	crearBio.addEventListener('click', async function () {
		console.log('hola');

		userBioquimicoContainer.classList.add('d-none');
		formUserBioquimico.classList.remove('d-none');
	});

	
	crearBioquimico.addEventListener('click', async function (e) {
		e.preventDefault();

		try {
			const bioquimico = {
				nombre: document.getElementById('nombreBioquimico').value,
				apellido: document.getElementById('apellidoBioquimico').value,
				dni: document.getElementById('dniBioquimico').value,
				telefono: document.getElementById('telefonoBioquimico').value,
				correo: document.getElementById('correoBioquimico').value,
                especialidad: document.getElementById('especialidadBioquimico').value,
				contrasenia: document.getElementById('contraseniaBioquimico').value,
				idUsuario: document.getElementById('idUsuario3').value,
			};

			const responseUsuario = await fetch('/usuario', {
				method: 'POST',
				body: JSON.stringify({ rol: 'bioquimico' }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!responseUsuario.ok) {
				throw new Error('Error al crear el usuario');
			}
			// Obtener el ID del usuario creado desde la respuesta
			const { idUsuario } = await responseUsuario.json();
			bioquimico.idUsuario = idUsuario;

			const usuarioIdField = document.getElementById('idUsuario3');
			usuarioIdField.value = idUsuario;

			console.log(usuarioIdField.value);

			console.log(idUsuario);
			const response = await fetch('/newbioquimico', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bioquimico),
			});

			console.log(bioquimico);
			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Bioquimica Doña ADN',
					text: 'Bioquimico creado con exito',
				}).then(() => {
					window.location.href = 'http://localhost:3000/';
					window.location.href = 'http://localhost:3000/admin';
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Bioquimica Doña ADN',
					text: 'Error al crear el Bioquimico',
				});
			}

		} catch (error) {
			console.error('Hubo un error al procesar la solicitud:', error);
		}
	});
})