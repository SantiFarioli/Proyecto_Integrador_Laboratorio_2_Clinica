document.addEventListener('DOMContentLoaded', function () {
	const toggler = document.querySelector('.btn');
	const sidebar = document.querySelector('#sidebar');

	toggler.addEventListener('click', function () {
		sidebar.classList.toggle('collapsed');
	});

	console.log('Hola desde el JavaScript');
});
