document.addEventListener('DOMContentLoaded', function () {
	const loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		// Realiza la autenticación aquí, por ejemplo, comparando los valores ingresados con los valores válidos.
		if (username === 'usuario' && password === 'contrasena') {
			// Autenticación exitosa, redirige a la página de inicio.
			window.location.href = 'inicio.html';
		} else {
			alert('Credenciales incorrectas. Inténtalo de nuevo.');
		}
	});
});
