document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('cargar-ordenes')
		.addEventListener('click', function () {
			let ordenesTableContainer = document.getElementById('ordenes-table');
			ordenesTableContainer.classList.remove('d-none'); // Mostrar el contenedor de la tabla

			fetch('/ordenTrabajo')
				.then((response) => response.json())
				.then((data) => {
					// Filtrar solo órdenes con estado "Iniciada" (considerando posibles diferencias en mayúsculas)
					let ordenesIniciadas = data.filter(
						(orden) => orden.estado.toLowerCase() === 'iniciada'
					);

					// Modificar datos para incluir idPaciente y manejar médicos null
					let modifiedData = ordenesIniciadas.map((item) => {
						return {
							...item,
							pacienteId: item.paciente.id,
							medicoNombre: item.medico
								? `${item.medico.nombre} ${item.medico.apellido}`
								: 'No asignado', // Manejar médicos null
						};
					});

					// Inicializar DataTables con datos modificados
					let table = new DataTable('#tabla-ordenes', {
						data: modifiedData,
						columns: [
							{ title: 'Fecha Creación', data: 'fechaCreacion' },
							{ title: 'Estado', data: 'estado' },
							{ title: 'Diagnóstico', data: 'diagnostico' },
							{
								title: 'Cancelada',
								data: 'cancelada',
								render: (data) => (data ? 'Sí' : 'No'),
							},
							{ title: 'Paciente', data: 'paciente.nombre' },
							{ title: 'Médico', data: 'medicoNombre' }, // Usar el campo modificado para médico
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
							{ title: 'Paciente ID', data: 'idPaciente', visible: false },
						],
						destroy: true, // Asegurarse de destruir y recrear la tabla cada vez
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
	// Delegación de eventos para manejar clics en íconos de "Cargar Resultados"
	document.querySelector('body').addEventListener('click', function (e) {
		if (e.target && e.target.id.startsWith('iconoOrden')) {
			const idOrdenTrabajo = e.target.id.replace('iconoOrden', '');
			console.log(idOrdenTrabajo);
			cargarResultados(idOrdenTrabajo);
		}
	});
});
async function cargarResultados(idOrdenTrabajo) {
	document.getElementById('ordenes-table').classList.add('d-none');
	const resultadosContainer = document.getElementById('resultados-container');
	resultadosContainer.classList.remove('d-none');

	try {
		const responseOrdenTrabajo = await fetch(`/ordenTrabajo`);
		const dataOrden = await responseOrdenTrabajo.json();
		const idPaciente = dataOrden[1].idPaciente; // Asegúrate de que esta línea coincida con la estructura de tu respuesta
		console.log(idPaciente);

		const responseExamen = await fetch(
			`/examenes-y-ordenes/paciente/${idPaciente}`
		);
		const dataExamen = await responseExamen.json();

		const responseValoresRef = await fetch(`/pacienteVslorRef/${idPaciente}`);
		const dataPaciente = await responseValoresRef.json();
		const { paciente, valoresReferencia } = dataPaciente;

		resultadosContainer.innerHTML =
			'<h2>Resultados de los Exámenes</h2><div class="examenes-resultados"></div>';
		const examenesResultadosDiv = resultadosContainer.querySelector(
			'.examenes-resultados'
		);

		for (const examen of dataExamen) {
			// Obtiene los detalles del examen, incluido su idDeterminacion
			const responseDetalleExamen = await fetch(
				`/determinacion/examen/${examen.idExamen}`
			);
			const detalleExamen = await responseDetalleExamen.json();
			const idDeterminacion = detalleExamen[0].idDeterminacion; // Asume que la primera entrada es la correcta

			// Encuentra el valor de referencia correcto utilizando idDeterminacion
			const valorRef = valoresReferencia.find(
				(vr) => vr.idDeterminacion === idDeterminacion
			);

			const examenDiv = document.createElement('div');
			examenDiv.className = 'examen-resultado';
			examenDiv.innerHTML = `
                <h3>${examen.descripcion}</h3>
                <p><strong>Código:</strong> ${examen.codigo}</p>
                <p><strong>Requisitos Examen:</strong> ${
									examen.requisitosExamen
								}</p>
                <p><strong>Tiempo de Examen:</strong> ${
									examen.tiempoDeExamen
								} horas</p>
                <p><strong>Resultado:</strong> <input type="text" id="resultadoExamen${
									examen.idExamen
								}" placeholder="Ingresar resultado"></p>
                <p><strong>Valor de referencia:</strong> ${
									valorRef
										? `${valorRef.valorMinimo} - ${valorRef.valorMaximo}`
										: 'No disponible'
								}</p>
                <p><strong>Método de análisis:</strong> ${
									detalleExamen[0].metodoAnalisis
								}</p>
                <p><strong>Unidad de medida:</strong> ${
									detalleExamen[0].unidadMedida
								}</p>
            `;
			examenesResultadosDiv.appendChild(examenDiv);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

function calcularEdad(fechaNacimiento) {
	const hoy = new Date();
	const nacimiento = new Date(fechaNacimiento);
	let edad = hoy.getFullYear() - nacimiento.getFullYear();
	const m = hoy.getMonth() - nacimiento.getMonth();
	if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
		edad--;
	}
	return edad;
}
