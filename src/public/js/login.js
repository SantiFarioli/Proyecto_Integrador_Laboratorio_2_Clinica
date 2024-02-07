document.addEventListener('DOMContentLoaded', function () {
	const loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const email = document.getElementById('email').value; // Asegúrate de que el ID sea correcto
		const password = document.getElementById('password').value;

		// Objeto de datos para enviar al servidor
		const loginData = {
			email: email,
			password: password,
		};

		// Enviar solicitud AJAX al servidor
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
					alert(data.message);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	});
});
