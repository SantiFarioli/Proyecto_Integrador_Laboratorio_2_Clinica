document.addEventListener('DOMContentLoaded', function () {
	const loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		// Realiza la autenticación aquí, por ejemplo, comparando los valores ingresados con los valores válidos.
		if (username === 'fermin2049' && password === '123456') {
			// Autenticación exitosa, redirige a la página de inicio.
			window.location.href = 'http://localhost:3000/';
		} else {
			alert('Credenciales incorrectas. Intentalo de nuevo.');
		}
	});
});
