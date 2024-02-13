document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('cargar-ordenes')
		.addEventListener('click', function () {
			let ordenesTableContainer = document.getElementById('ordenes-table');
			ordenesTableContainer.classList.remove('d-none'); // Mostrar el contenedor de la tabla

			fetch('/ordenTrabajo')
				.then((response) => response.json())
				.then((data) => {
					// Inicializar o actualizar la instancia de DataTables
					$(document).ready(function () {
						// Si ya existe, destruir la instancia anterior de DataTables
						if ($.fn.dataTable.isDataTable('#tabla-ordenes')) {
							$('#tabla-ordenes').DataTable().clear().destroy();
						}

						// Inicializar una nueva instancia de DataTables
						$('#tabla-ordenes').DataTable({
							data: data,
							columns: [
								// Define las columnas, asegúrate de que los nombres de las propiedades coincidan con los de tu API
								{ title: 'Fecha Creación', data: 'fechaCreacion' },
								{ title: 'Estado', data: 'estado' },
								{ title: 'Diagnóstico', data: 'diagnostico' },
								{ title: 'Cancelada', data: 'cancelada' },
								{ title: 'Paciente', data: 'paciente.nombre' }, // Ajustar según la estructura de tu objeto
								{ title: 'Médico', data: 'medico.nombre' }, // Ajustar según la estructura de tu objeto
								// Columna de acciones, se puede personalizar según tus necesidades
								{
									title: 'Acciones',
									data: null,
									defaultContent: '<button>Acción</button>',
								},
							],
							destroy: true, // Esta opción es importante para poder reinicializar la tabla
						});
					});
				})
				.catch((error) => console.error('Error:', error));
		});
});
