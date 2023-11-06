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
      <td>
        <div class="icon-container" id="iconoEditarContainer${recepcionista.idRecepcionista}">
          <i class="fa-solid fa-pen" id="iconoEditar${recepcionista.idRecepcionista}"></i>
          <span class="tooltip">Editar recepcionista</span>
        </div>
        <div class="icon-container" id="iconoEliminarContainer${recepcionista.idRecepcionista}">
          <i class="fa-solid fa-trash" id="iconoEliminar${recepcionista.idRecepcionista}"></i>
          <span class="tooltip">Eliminar recepcionista</span>
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
console.log('hola desde el jsrecepcion');
