document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('cargar-ordenes')
		.addEventListener('click', function () {
			let ordenesTableContainer = document.getElementById('ordenes-table');
			ordenesTableContainer.classList.remove('d-none'); // Mostrar el contenedor de la tabla

			fetch('/ordenTrabajo')
				.then((response) => response.json())
				.then((data) => {
					// Asegúrate de que tu data incluya el ID del paciente en cada objeto de orden de trabajo
					let modifiedData = data.map((item) => {
						// Suponiendo que 'pacienteId' es la propiedad que contiene el ID del paciente
						return { ...item, pacienteId: item.paciente.id };
					});

					// Inicializar DataTables
					let table = new DataTable('#tabla-ordenes', {
						data: modifiedData,
						columns: [
							{ title: 'Fecha Creación', data: 'fechaCreacion' },
							{ title: 'Estado', data: 'estado' },
							{ title: 'Diagnóstico', data: 'diagnostico' },
							{ title: 'Cancelada', data: 'cancelada' },
							{
								title: 'Paciente',
								data: 'paciente.nombre',
								className: 'nombre-paciente', // Agrega esta línea para asignar una clase a las celdas de esta columna
							},
							{ title: 'Médico', data: 'medico.nombre' },
							{
								title: 'Acciones',
								data: 'idOrdenTrabajo',
								render: function (data, type, row) {
									return `<div class="icon-container" id="iconoOrdenContainer${data}">
											<i class='fa-regular fa-file-lines' id="iconoOrden${data}" onclick="cargarResultados(${data})"></i>
											<span class="tooltip">Cargar Resultados</span>
										  </div>`;
								},
								visible: true,
							},
							{ title: 'Paciente ID', data: 'idPaciente', visible: false }, // Columna oculta para ID del paciente
						],
						destroy: true,
					});

					// Evento de clic para mostrar detalles del paciente
					document
						.querySelector('#tabla-ordenes tbody')
						.addEventListener('click', function (e) {
							let clickedRow = e.target.closest('tr');
							let data = table.row(clickedRow).data();
							if (!data) return;

							let pacienteId = data.idPaciente; // Usar el ID del paciente directamente desde los datos de la fila
							console.log(pacienteId);
							fetch(`/pacienteid/${pacienteId}`)
								.then((response) => response.json())
								.then((paciente) => {
									let message = `
							Nombre: ${paciente.nombre}<br>
							Apellido: ${paciente.apellido}<br>
							Localidad: ${paciente.localidad}<br>
							Provincia: ${paciente.provincia}<br>
							Sexo: ${paciente.sexo}<br>
							Embarazo: ${paciente.embarazo}<br>
							Fecha Naciemiento: ${paciente.fecha_nac}<br>
							Email: ${paciente.correo_electronico}<br>
							Telefono: ${paciente.telefono}<br>
							Obra Social: ${paciente.obra_social}<br>
							Afiliado: ${paciente.num_afiliado}<br>
							
							`; // Agrega aquí más campos según necesites
									// Muestra la ventana emergente de SweetAlert2
									Swal.fire({
										title: 'Detalles del Paciente',
										html: message,
										icon: 'info',
									});
								})
								.catch((error) => console.error('Error:', error));
						});
				})
				.catch((error) => console.error('Error:', error));
		});
});
