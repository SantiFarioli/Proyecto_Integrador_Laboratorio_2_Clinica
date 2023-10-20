const $formulario = document.getElementById('form');
const $muestra = document.getElementById('cargar-muestras-btn');
const $cargarOrdenes = document.getElementById('cargar-ordenes');
const $ordenesTable = document.getElementById('ordenes-table');



$muestra.addEventListener('click',  (e) => {
    e.preventDefault();
    $formulario.classList.remove('d-none');
});




$cargarOrdenes.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/ordenTrabajo'); // Ruta para obtener órdenes desde el servidor
        if (response.ok) {
            const ordenes = await response.json();
            renderOrdenesTable(ordenes);
        } else {
            console.error('Error al obtener las órdenes.');
        }
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
    }
});

function renderOrdenesTable(ordenes) {
    const table = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID Orden de Trabajo</th>
                    <th>Fecha de Creación</th>
                    <th>Estado</th>
                    <th>Diagnóstico</th>
                    <th>ID Paciente</th>
                    <th>ID Médico</th>
                    <!-- Agrega más encabezados según tu modelo de datos -->
                </tr>
            </thead>
            <tbody>
                ${ordenes.map((ordenTrabajo) => `
                    <tr>
                        <td>${ordenTrabajo.idOrdenTrabajo}</td>
                        <td>${ordenTrabajo.fechaCreacion}</td>
                        <td>${ordenTrabajo.estado}</td>
                        <td>${ordenTrabajo.diagnostico}</td>
                        <td>${ordenTrabajo.idPaciente}</td>
                        <td>${ordenTrabajo.idMedico}</td>
                        <!-- Agrega más celdas según tu modelo de datos -->
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    $ordenesTable.innerHTML = table;
}

