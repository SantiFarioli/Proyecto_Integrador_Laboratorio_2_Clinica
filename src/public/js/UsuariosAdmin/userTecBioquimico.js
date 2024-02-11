
const adminTecnicoBioquimicoLink = document.getElementById('adminTecnicoBioquimico');
const userTecnicoBioquimico = document.getElementById('userTecnicoBioquimico');
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
}
const userTecnicoBioquimicoContainer = document.getElementById('userTecnicoBioquimico');
const formUserTecnicoBioquimico = document.getElementById('formUserTecnicoBioquimico');
const crearTecnicoBioquimico = document.getElementById('btnCreartecnicoBioquimico');

//const usuarioIdField = document.getElementById('usuarioIdUsuario'); // Campo oculto para el ID de usuario
const crearTecBio = document.getElementById('crearTecBio');

	document.addEventListener('DOMContentLoaded', function () {
		
	crearTecBio.addEventListener('click', async function () {
		console.log('hola');

		userTecnicoBioquimicoContainer.classList.add('d-none');
		formUserTecnicoBioquimico.classList.remove('d-none');
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
			const response = await fetch('/tecnicoBioquimico', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(TecnicoBioquimico),
			});

			console.log(TecnicoBioquimico);
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
})

