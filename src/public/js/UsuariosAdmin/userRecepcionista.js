const adminRecepcionLink = document.getElementById('adminRecepcion');
const userRecepcionista = document.getElementById('userRecepcionista');
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
}
const userRecepcionistaContainer = document.getElementById('userRecepcionista');
const formUserRecepContainer = document.getElementById('formUserRecep');
const btnCrearRecep = document.getElementById('btnCrearRecep');

const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearRecepcion = document.getElementById('crearRecepcion');
document.addEventListener('DOMContentLoaded', function () {
	crearRecepcion.addEventListener('click', async function () {
		console.log('hola');

		userRecepcionistaContainer.classList.add('d-none');
		formUserRecepContainer.classList.remove('d-none');
	});
	btnCrearRecep.addEventListener('click', async function (e) {
		e.preventDefault();
		try {
			const responseUsuario = await fetch('/usuario', {
				method: 'POST',
				body: JSON.stringify({ rol: 'Recepcionista' }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (responseUsuario.status === 200) {
				const data = await responseUsuario.json();
				usuarioIdField.value = data.idUsuario; // Asignar el ID del usuario al campo oculto
				console.log(data);
			} else {
				Swal.fire('Error', 'Hubo un error al crear el usuario', 'error');
			}
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Hubo un error al crear el usuario', 'error');
		}
	});

	// Capturar el envío del formulario
	const form = document.querySelector('form');

	form.addEventListener('submit', async function (event) {
		event.preventDefault(); // Detener el envío del formulario

		const formData = new FormData(form);

		try {
			const response = await fetch('/recepcionista', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				// El usuario de recepción se guardó correctamente

				Swal.fire({
					icon: 'success',
					title: 'El usuario de recepción se guardó correctamente',
					showConfirmButton: true,
				});
			} else {
				// Hubo un error al guardar el usuario de recepción
				Swal.fire(
					'Error',
					'Hubo un error al guardar el usuario de recepción',
					'error'
				);
			}
		} catch (error) {
			console.error(error);
			Swal.fire(
				'Error',
				'Hubo un error al guardar el usuario de recepción',
				'error'
			);
		}
	});
});
