document.addEventListener('DOMContentLoaded', function () {
	const loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		if (username === '' || password === '') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Por favor, rellena todos los campos.',
			});
			return;
		}

		// Muestra un mensaje de carga
		Swal.fire({
			title: 'Iniciando sesión...',
			html: 'Por favor, espera un momento.',
			timerProgressBar: true,
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
				// Simula una carga/demora antes de enviar la solicitud
				setTimeout(() => {
					const loginData = {
						username: username,
						password: password,
					};

					fetch('/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(loginData),
					})
						.then((response) => response.json())
						.then((data) => {
							if (data.success) {
								// Redirige según el rol del usuario
								window.location.href = data.redirectUrl;
							} else {
								// Muestra mensaje de error
								Swal.fire({
									icon: 'error',
									title: 'Error al iniciar sesión',
									text: data.message,
								});
							}
						})
						.catch((error) => {
							console.error('Error:', error);
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Hubo un problema con la petición. Inténtalo de nuevo más tarde.',
							});
						});
				}, 1500); // Ajusta este tiempo según lo necesario
			},
		});
	});
});
