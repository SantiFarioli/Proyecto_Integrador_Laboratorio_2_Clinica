// Obtén los elementos del DOM que quieres manipular
const formularioBusqueda = document.getElementById('formulario-busqueda');
const formularioRegistro = document.getElementById('formulario-registro');
let mostrarFormularioBusqueda = document.getElementById(
	'mostrar-formulario-busqueda'
);
const mostrarFormularioUpdate = document.getElementById(
	'formulario-actualizar'
);
const formularioPaciente = document.getElementById('formulario-paciente2');
const buscarPacienteButton = document.getElementById('buscar-paciente');
const criterioBusqueda = document.getElementById('criterio-busqueda');
const valorBusqueda = document.getElementById('valor-busqueda');
const resultados = document.getElementById('resultados');
const formularioRegistroPaciente = document.getElementById(
	'formulario-actualizar'
);
const formularioRegistroPaciente2 = document.getElementById(
	'formulario-paciente2'
);
const sexoSelect = document.getElementById('sexo2');
const embarazoField = document.getElementById('embarazo-field');
const embarazoSiRadio = document.getElementById('embarazo-si2');
const embarazoNoRadio = document.getElementById('embarazo-no');

document.addEventListener('DOMContentLoaded', function () {
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
		const criterio = criterioBusqueda.value;
		const valor = valorBusqueda.value;

		try {
			// Realiza una solicitud al servidor para buscar pacientes
			const response = await fetch(
				`/paciente?criterio=${criterio}&valor=${valor}`
			);
			if (response.ok) {
				const pacientes = await response.json();
				console.log(pacientes);
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
            <button id='actualizar-paciente' class='btn btn-primary mt-3'>Actualizar Paciente</button>
          `;
					resultados.innerHTML = tablaResultados;

					// Almacenar los campos del formulario
					const nombreInput = document.getElementById('nombre2');
					const apellidoInput = document.getElementById('apellido2');
					const dniInput = document.getElementById('dni2');
					const localidadInput = document.getElementById('localidad2');
					const provinciaInput = document.getElementById('provincia2');
					const fechaNacimientoInput = document.getElementById('fecha_nac2');
					const correoElectronicoInput = document.getElementById(
						'correo_electronico2'
					);
					const telefonoInput = document.getElementById('telefono2');
					const obraSocialInput = document.getElementById('obra_social2');
					const numAfiliadoInput = document.getElementById('num_afiliado2');

					const actualizarPaciente = document.getElementById(
						'actualizar-paciente'
					);
					const sexoSelect = document.getElementById('sexo2');
					const embarazoSiRadio = document.getElementById('embarazo-si2');
					const embarazoNoRadio = document.getElementById('embarazo-no2');
					actualizarPaciente.addEventListener('click', function () {
						if (pacientes.length > 0) {
							document
								.getElementById('formulario-actualizar')
								.classList.remove('d-none');
							//mostrarFormularioUpdate.classList.remove('d-none');
							// Supongamos que seleccionas el primer paciente de la lista
							const pacienteSeleccionado = pacientes[0];
							console.log(pacienteSeleccionado.idPaciente);

							// Llenar el formulario con los datos del paciente seleccionado
							nombreInput.value = pacienteSeleccionado.nombre;
							apellidoInput.value = pacienteSeleccionado.apellido;
							dniInput.value = pacienteSeleccionado.dni;
							localidadInput.value = pacienteSeleccionado.localidad;
							provinciaInput.value = pacienteSeleccionado.provincia;
							fechaNacimientoInput.value = pacienteSeleccionado.fecha_nac;
							correoElectronicoInput.value =
								pacienteSeleccionado.correo_electronico;
							telefonoInput.value = pacienteSeleccionado.telefono;
							obraSocialInput.value = pacienteSeleccionado.obra_social;
							numAfiliadoInput.value = pacienteSeleccionado.num_afiliado;
							sexoSelect.value = pacienteSeleccionado.sexo;
							embarazoSiRadio.checked = pacienteSeleccionado.embarazo === true;
							embarazoNoRadio.checked = pacienteSeleccionado.embarazo === false;

							// Mostrar el formulario

							// Manejar la actualización del paciente al hacer clic en "Enviar"
							mostrarFormularioUpdate.addEventListener(
								'submit',
								async function (e) {
									e.preventDefault();
									const pacienteId = pacienteSeleccionado.idPaciente;

									// Recopilar datos del formulario y enviarlos al servidor como una solicitud PUT
									const datosPaciente = {
										nombre: nombreInput.value,
										apellido: apellidoInput.value,
										dni: dniInput.value,
										localidad: localidadInput.value,
										provincia: provinciaInput.value,
										fecha_nac: fechaNacimientoInput.value,
										correo_electronico: correoElectronicoInput.value,
										telefono: telefonoInput.value,
										obra_social: obraSocialInput.value,
										num_afiliado: numAfiliadoInput.value,
										sexo: selectedSexo,
										embarazo: embarazoSiRadio.checked,
									};

									const response = await fetch(
										`/pacientes/actualizar/${pacienteId}`,
										{
											method: 'PUT',
											headers: {
												'Content-Type': 'application/json',
											},
											body: JSON.stringify(datosPaciente),
										}
									);

									if (response.ok) {
										// Manejar la respuesta del servidor (por ejemplo, mostrar un mensaje de éxito)
										Swal.fire({
											icon: 'success',
											title: 'Bioquimica Doña ADN',
											text: 'Paciente Actualizado!',
										}).then(() => {
											// Redirigir al usuario a la pantalla principal
											window.location.href = 'http://localhost:3000/';
										});
									} else {
										// Manejar errores (por ejemplo, mostrar un mensaje de error)
										Swal.fire({
											icon: 'error',
											title: 'Bioquimica Doña ADN',
											text: 'Error al actualizar el paciente!',
										});
									}
								}
							);
						}
					});
				} else {
					// Si no se encuentran pacientes, muestra un mensaje
					mostrarFormularioBusqueda.disabled = false;
					Swal.fire({
						icon: 'error',
						title: 'Bioquimica Doña ADN',
						text: 'Paciente No Encontrado!',
					});
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
	formularioRegistroPaciente2.addEventListener('submit', async function (e) {
		e.preventDefault();

		const nombreInput = document.getElementById('nombre');
		const apellidoInput = document.getElementById('apellido');
		const dniInput = document.getElementById('dni');
		const localidadInput = document.getElementById('localidad');
		const provinciaInput = document.getElementById('provincia');
		const fechaNacimientoInput = document.getElementById('fecha_nac');
		const correoElectronicoInput =
			document.getElementById('correo_electronico');
		const telefonoInput = document.getElementById('telefono');
		const obraSocialInput = document.getElementById('obra_social');
		const numAfiliadoInput = document.getElementById('num_afiliado');

		// Realiza el registro del paciente y obtén la respuesta del servidor
		const datosPaciente = {
			nombre: nombreInput.value,
			apellido: apellidoInput.value,
			dni: dniInput.value,
			localidad: localidadInput.value,
			provincia: provinciaInput.value,
			fecha_nac: fechaNacimientoInput.value,
			correo_electronico: correoElectronicoInput.value,
			telefono: telefonoInput.value,
			obra_social: obraSocialInput.value,
			num_afiliado: numAfiliadoInput.value,
			sexo: selectedSexo,
			embarazo: isEmbarazoSi ? 'si' : 'no',
		};

		const response = await fetch('/pacientes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datosPaciente),
		});

		if (response.ok) {
			console.log('mensaje de despues del if');
			// Mostrar un mensaje de éxito con Swal.fire
			Swal.fire({
				icon: 'success',
				title: 'Bioquimica Doña ADN',
				text: 'Paciente Registrado!',
			}).then(() => {
				// Redirigir al usuario a la pantalla principal
				window.location.href = 'http://localhost:3000/';
			});
		} else {
			console.log('mensaje de despues del else');
			// Manejar errores (por ejemplo, mostrar un mensaje de error)
			Swal.fire({
				icon: 'error',
				title: 'Bioquimica Doña ADN',
				text: 'Error al registrar el paciente!',
			});
		}
	});
});

// Agrega un evento al campo de selección "Sexo"
/*sexoSelect.addEventListener('change', function () {
	const selectedSexo = sexoSelect.value;

	if (selectedSexo === 'masculino') {
		// Si se selecciona "Masculino," establece "No" en el campo "Embarazo" y deshabilítalo
		embarazoNoRadio.checked = true;
		embarazoSiRadio.checked = false;
		embarazoSiRadio.disabled = true;
	} else {
		// Si se selecciona "Femenino," habilita el campo "Embarazo"
		embarazoSiRadio.disabled = false;
	}
});*/
