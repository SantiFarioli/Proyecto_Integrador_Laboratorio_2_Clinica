const $formulario = document.getElementById('form');
const $muestra = document.getElementById('cargar-muestras-btn');


$muestra.addEventListener('click',  (e) => {
    e.preventDefault();
    $formulario.classList.remove('d-none');
});
