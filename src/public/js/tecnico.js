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
        const response = await fetch('/ordenTrabajo'); 
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
        <table class="table table-bordered" id='select-fila'>
            <thead>
                <tr>
                    <th scope="col">ID Orden de Trabajo</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Diagnóstico</th>
                    <th scope="col">ID Paciente</th>
                    <th scope="col" class"text-end">ID Médico</th>
                </tr>
            </thead>
            <tbody class ="table-group-divider">
                ${ordenes.map((ordenTrabajo) => `
                    <tr id="${ordenTrabajo.idOrdenTrabajo}">
                        <th scope="row">${ordenTrabajo.idOrdenTrabajo}</th>
                        <td>${ordenTrabajo.fechaCreacion}</td>
                        <td>${ordenTrabajo.estado}</td>
                        <td>${ordenTrabajo.diagnostico}</td>
                        <td>${ordenTrabajo.idPaciente}</td>
                        <td>${ordenTrabajo.idMedico}</td>                       
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    $ordenesTable.innerHTML = table;

    ordenes.forEach((ordenTrabajo) => {
        const fila = document.getElementById(`${ordenTrabajo.idOrdenTrabajo}`);
        fila.addEventListener('dblclick', () => {

            $ordenesTable.style.display = 'none';

            document.getElementById('idOrdenTrabajo').value = ordenTrabajo.idOrdenTrabajo;    
            document.getElementById('idOrdenTrabajo').disabled = true; 
            
            $formulario.classList.remove('d-none');
        });
    });
}


