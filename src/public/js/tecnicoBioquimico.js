console.log('hola');
document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('cargar-ordenes')
		.addEventListener('click', function () {
			const ordenesTableContainer = document.getElementById('ordenes-table');
			ordenesTableContainer.classList.toggle('d-none'); // Mostrar el contenedor de la tabla

			fetch('/api/ordenTrabajo') // Asegúrate de que esta URL coincide con la base de tu API
				.then((response) => response.json())
				.then((data) => {
					const tableBody = document.querySelector('#tabla-ordenes tbody');
					tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla
					data.forEach((orden) => {
						const row = document.createElement('tr');

						row.innerHTML = `
                    <td>${orden.fechaCreacion}</td>
                    <td>${orden.estado}</td>
                    <td>${orden.diagnostico}</td>
                    <td>${orden.cancelada ? 'Sí' : 'No'}</td>
                    <td>${
											orden.paciente.nombre
										}</td> <!-- Ajusta según la estructura de tu objeto -->
                    <td>${
											orden.medico.nombre
										}</td> <!-- Ajusta según la estructura de tu objeto -->
                    <td><button>Acción</button></td>
                `;

						tableBody.appendChild(row);
					});
				})
				.catch((error) => console.error('Error:', error));
		});
});
console.log('hola');
