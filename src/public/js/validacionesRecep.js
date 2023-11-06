const formularioRegistroPaciente2 = document.getElementById(
	'formulario-paciente2'
);
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
		const sexoSelect = document.getElementById('sexo');
		const embarazoSi = document.getElementById('embarazo-si');
		const embarazoNo = document.getElementById('embarazo-no');

		const embarazoInput = embarazoSi.checked ? true : false;

		if (
			!nombreInput ||
			!apellidoInput ||
			!dniInput ||
			!localidadInput ||
			!sexoSelect ||
			(!embarazoSi && !embarazoNo) ||
			!correoElectronicoInput
		) {
			Swal.fire(
				'Error',
				'Por favor, completa todos los campos obligatorios.',
				'error'
			);
			return;
		}

		// Validar que en el campo "nombre" y "apellido" no se admitan números
		const namePattern = /^[A-Za-z]+$/;
		if (!namePattern.test(nombreInput) || !namePattern.test(apellidoInput)) {
			Swal.fire(
				'Error',
				'Los campos "Nombre" y "Apellido" no deben contener números.',
				'error'
			);
			return;
		}

		// Validar que en el campo "dni" no se admitan letras
		const dniPattern = /^[0-9]+$/;
		if (!dniPattern.test(dniInput)) {
			Swal.fire(
				'Error',
				'El campo "DNI" no debe contener letras ni caracteres especiales.',
				'error'
			);
			return;
		}

		// Validar el formato del correo electrónico
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailPattern.test(correoElectronicoInput)) {
			Swal.fire(
				'Error',
				'El formato del correo electrónico no es válido.',
				'error'
			);
			return;
		}

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
			sexo: sexoSelect.value,
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
			// Mostrar un mensaje de éxito con Swal.fire
			Swal.fire({
				icon: 'success',
				title: 'Bioquimica Doña ADN',
				text: 'Paciente Registrado!',
			}).then(() => {
				// Redirigir al usuario a la pantalla principal
				window.location.href = 'http://localhost:3000/';
				window.location.href = 'http://localhost:3000/recepcionista';
			});
		} else {
			// Manejar errores (por ejemplo, mostrar un mensaje de error)
			Swal.fire({
				icon: 'error',
				title: 'Bioquimica Doña ADN',
				text: 'Error al registrar el paciente!',
			});
		}
	});
});
