document.addEventListener('DOMContentLoaded', function () {
	const toggler = document.querySelector('.btn');
	const sidebar = document.querySelector('#sidebar');

	toggler.addEventListener('click', function () {
		sidebar.classList.toggle('collapsed');
	});

	console.log('Hola desde el JavaScript');
});

document.addEventListener('DOMContentLoaded', function () {
	// Obtén los elementos del DOM que quieres manipular
	const formularioBusqueda = document.getElementById('formulario-busqueda');
	const formularioRegistro = document.getElementById('formulario-registro');
	const mostrarFormularioBusqueda = document.getElementById(
		'mostrar-formulario-busqueda'
	);
	const formularioPaciente = document.getElementById('formulario-paciente');

	// Agrega un evento al enlace 'Registrar Paciente' en la barra lateral
	formularioBusqueda.addEventListener('click', function (e) {
		e.preventDefault();
		formularioRegistro.classList.remove('d-none');
		formularioPaciente.classList.add('d-none');
	});

	// Agrega un evento al botón 'Registrar Nuevo Paciente'
	mostrarFormularioBusqueda.addEventListener('click', function () {
		formularioPaciente.classList.remove('d-none');
		formularioRegistro.classList.add('d-none');
	});

	buscarPacienteButton.addEventListener('click', function () {
		// Realiza la búsqueda y muestra los resultados en la tabla
		const criterio = criterioBusqueda.value;
		const valor = valorBusqueda.value;

		// Aquí debes implementar la lógica de búsqueda (por ejemplo, una solicitud al servidor)
		// Luego, muestra los resultados en la tabla
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
                    <!-- Aquí puedes agregar las filas de resultados -->
                    <!-- Ejemplo de fila de resultado: -->
                    <tr>
                        <td>Nombre del Paciente</td>
                        <td>Apellido del Paciente</td>
                        <td>DNI del Paciente</td>
                        <td>Correo del Paciente</td>
                        <td>Teléfono del Paciente</td>
                    </tr>
                </tbody>
            </table>
        `;

		resultados.innerHTML = tablaResultados;
	});
});
