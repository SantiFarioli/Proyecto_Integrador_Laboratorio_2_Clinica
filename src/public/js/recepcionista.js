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
const sexoSelect = document.getElementById('sexo');
const embarazoSi = document.getElementById('embarazo-si');
const embarazoNo = document.getElementById('embarazo-no');

const sexoSelect2 = document.getElementById('sexo2');
const embarazoSi2 = document.getElementById('embarazo-si2');
const embarazoNo2 = document.getElementById('embarazo-no2');

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
					const sexoSelect2 = document.getElementById('sexo2');
					const embarazoSi2 = document.getElementById('embarazo-si2');
					const embarazoNo2 = document.getElementById('embarazo-no2');

					const embarazoInput = embarazoSi2.checked ? true : false;

					const actualizarPaciente = document.getElementById(
						'actualizar-paciente'
					);

					actualizarPaciente.addEventListener('click', function () {
						if (pacientes.length > 0) {
							document
								.getElementById('formulario-actualizar')
								.classList.remove('d-none');
							//mostrarFormularioUpdate.classList.remove('d-none');
							// Supongamos que seleccionas el primer paciente de la lista
							const pacienteSeleccionado = pacientes[0];
							console.log(pacienteSeleccionado.idPaciente);
							if (pacienteSeleccionado.embarazo === true) {
								embarazoSi2.checked = true;
								embarazoNo2.checked = false;
							} else {
								embarazoSi2.checked = false;
								embarazoNo2.checked = true;
							}

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
							sexoSelect2.value = pacienteSeleccionado.sexo;
							embarazoSi2.value = pacienteSeleccionado.embarazo;

							habilitarEmbarazoPorSexo(sexoSelect2, embarazoSi2, embarazoNo2);

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
										sexo: sexoInput.value,
										embarazo: embarazoInput,
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
		console.log('mensaje de despues del prevent');
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
		const sexoInput = document.getElementById('sexo'); // Obtén el valor del campo de sexo
		const embarazoSi = document.getElementById('embarazo-si');
		const embarazoNo = document.getElementById('embarazo-no');

		const embarazoInput = embarazoSi.checked ? true : false;

		habilitarEmbarazoPorSexo(sexoSelect, embarazoSi, embarazoNo);

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
			sexo: sexoInput.value,
			embarazo: embarazoInput,
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
				window.location.href = 'http://localhost:3000/recepcionista';
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

function habilitarEmbarazoPorSexo(sexoSelect, embarazoSi, embarazoNo) {
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
}

/*********************************************
 *     Generar Orden de Trabajo
 *********************************************/
const formularioOrdenTrabajo = document.getElementById(
	'formulario-orden-trabajo'
);
const generarOrdenButton = document.getElementById('navbarOrdenTrabjo');
document.addEventListener('DOMContentLoaded', function () {
	generarOrdenButton.addEventListener('click', function (e) {
		e.preventDefault();

		formularioOrdenTrabajo.classList.remove('d-none');
	});
});
document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('cargarMedico')
		.addEventListener('click', function () {
			// Mostrar un diálogo de entrada de datos del médico con SweetAlert2
			Swal.fire({
				title: 'Guardar Datos del Médico',
				html:
					'<input id="nombreMedico" class="swal2-input" placeholder="Nombre">' +
					'<input id="apellidoMedico" class="swal2-input" placeholder="Apellido">' +
					'<input id="dniMedico" class="swal2-input" placeholder="DNI">' +
					'<input id="especialidadMedico" class="swal2-input" placeholder="Especialidad">' +
					'<input id="telefonoMedico" class="swal2-input" placeholder="Teléfono">' +
					'<input id="correoMedico" class="swal2-input" placeholder="Correo">' +
					'<input id="direccionMedico" class="swal2-input" placeholder="Dirección">', // Agregado campo "Dirección"
				focusConfirm: false,
				preConfirm: () => {
					return {
						nombre: document.getElementById('nombreMedico').value,
						apellido: document.getElementById('apellidoMedico').value,
						dni: document.getElementById('dniMedico').value,
						especialidad: document.getElementById('especialidadMedico').value,
						telefono: document.getElementById('telefonoMedico').value,
						correo: document.getElementById('correoMedico').value,
						direccion: document.getElementById('direccionMedico').value, // Agregado campo "Dirección"
					};
				},
			}).then((result) => {
				if (result.isConfirmed) {
					// Aquí puedes enviar los datos del médico al servidor o hacer lo que necesites con ellos
					const medicoData = result.value;
					Swal.fire({
						icon: 'info',
						title: 'Guardando Datos...',
						showConfirmButton: false,
					});

					// Enviar los datos del médico al servidor
					fetch('/medico', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(medicoData),
					})
						.then((response) => {
							if (response.status === 201) {
								Swal.fire({
									icon: 'success',
									title: 'Médico guardado con éxito',
								});
							} else {
								Swal.fire({
									icon: 'error',
									title: 'Error al guardar el médico',
								});
							}
						})
						.catch((error) => {
							Swal.fire({
								icon: 'error',
								title: 'Error al enviar la solicitud al servidor',
								text: error,
							});
						});
				}
			});
		});
});
