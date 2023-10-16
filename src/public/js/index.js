document.addEventListener('DOMContentLoaded', function () {
	// Obtén los elementos del DOM que quieres manipular
	const formularioBusqueda = document.getElementById('formulario-busqueda');
	const formularioRegistro = document.getElementById('formulario-registro');
	let mostrarFormularioBusqueda = document.getElementById(
		'mostrar-formulario-busqueda'
	);
	const formularioPaciente = document.getElementById('formulario-paciente');
	const buscarPacienteButton = document.getElementById('buscar-paciente'); // Agrega esta línea
	const criterioBusqueda = document.getElementById('criterio-busqueda');
	const valorBusqueda = document.getElementById('valor-busqueda');
	const resultados = document.getElementById('resultados');

	// Agrega un evento al enlace 'Registrar Paciente' en la barra lateral
	formularioBusqueda.addEventListener('click', function (e) {
		e.preventDefault();
		formularioRegistro.classList.remove('d-none');
		formularioPaciente.classList.add('d-none');
	});

	// Agrega un evento al botón 'Registrar Nuevo Paciente'
	mostrarFormularioBusqueda.disabled = true;
	mostrarFormularioBusqueda.addEventListener('click', function () {
		formularioPaciente.classList.remove('d-none');
		formularioRegistro.classList.add('d-none');
	});

	buscarPacienteButton.addEventListener('click', async function () {
		// Realiza la búsqueda y muestra los resultados en la tabla
		const criterio = document.getElementById('criterio-busqueda').value;

		const valor = valorBusqueda.value;

		try {
			// Realiza una solicitud al servidor para buscar pacientes
			const response = await fetch(
				`/paciente?criterio=${criterio}&valor=${valor}`
			);
			if (response.ok) {
				const pacientes = await response.json();
				if (pacientes.length > 0) {
					// Si se encuentran pacientes, muestra los resultados en una tabla
					const tablaResultados = `
			  <table class="table table-striped">
				  <thead>
					  <tr>
						  <th>Nombre</th>
						  <th>Apellido</th>
						  <th>DNI</th>
						  <th>Correo Electrónico</th>
						  <th>Teléfono</th>
					  </tr>
				  </thead>
				  <tbody>
					  ${pacientes
							.map(
								(paciente) => `
						  <tr>
							  <td>${paciente.nombre}</td>
							  <td>${paciente.apellido}</td>
							  <td>${paciente.dni}</td>
							  <td>${paciente.correo_electronico}</td>
							  <td>${paciente.telefono}</td>
						  </tr>
					  `
							)
							.join('')}
				  </tbody>
			  </table>
			`;
					resultados.innerHTML = tablaResultados;
				} else {
					// Si no se encuentran pacientes, muestra un mensaje
					mostrarFormularioBusqueda.disabled = false;
					resultados.innerHTML = '<p>Paciente no encontrado</p>';
				}
			} else {
				console.error('Error en la solicitud');
			}
		} catch (error) {
			console.error(error);
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const sexoSelect = document.getElementById('sexo');
	const embarazoSi = document.getElementById('embarazo-si');
	const embarazoNo = document.getElementById('embarazo-no');

	if (sexoSelect) {
		sexoSelect.addEventListener('change', function () {
			if (sexoSelect.value === 'masculino') {
				embarazoSi.disabled = true;
				embarazoNo.disabled = true;
				embarazoNo.checked = true; // Establecer en "No"
			} else {
				embarazoSi.disabled = false;
				embarazoNo.disabled = false;
			}
		});
	}
});
