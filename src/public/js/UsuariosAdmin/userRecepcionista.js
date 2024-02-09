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

//const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearRecepcion = document.getElementById('crearRecepcion');
document.addEventListener('DOMContentLoaded', function () {
	crearRecepcion.addEventListener('click', async function () {
		console.log('hola');

		userRecepcionistaContainer.classList.add('d-none');
		formUserRecepContainer.classList.remove('d-none');
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
							
		       console.log(idUsuario)
			const response = await fetch('/recepcionista', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(recepcionista),
			});
		
		console.log(recepcionista)
			if (!response.ok) {
				throw new Error('Error al crear el recepcionista');
			}
		
			console.log('Recepcionista creado exitosamente');
			console.log(recepcionista);
		} catch (error) {
			console.error('Hubo un error al procesar la solicitud:', error);
		}
		
	});
	

});
