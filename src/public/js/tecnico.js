const $formulario = document.getElementById('form');
const $muestra = document.getElementById('cargar-muestras-btn');
const $cargarOrdenes = document.getElementById('cargar-ordenes');
const $ordenesTable = document.getElementById('ordenes-table');
const $guardarMuestra = document.getElementById('guardar');
const $cargarMuestras = document.getElementById('cargar-muestras');
const $muestraTable = document.getElementById('muestra-table');
const $actualizaMuestra = document.getElementById('actualizar');
const $eliminarMuestra = document.getElementById('eliminar');





$guardarMuestra.addEventListener('click', async (e) => {
    try {
        
        const response = await fetch('/muestra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: document.getElementById('tipo').value,
                fechaRecepcion: document.getElementById('fechaRecepcion').value,
                etiqueta: document.getElementById('etiqueta').value,
                idOrdenTrabajo: document.getElementById('idOrdenTrabajo').value
            })
        }); 
        if (response.ok) {
            const muestra = await response.json();
            console.log(muestra);
        } else {
            console.error('Error al obtener las Muestras.');
        }
    } catch (error) {
        console.error('Error al obtener las Muestras:', error);
    }
})




$cargarOrdenes.addEventListener('click', async (e) => {
   const idOrdenTrabajo = document.getElementById('idOrdenTrabajo').value 
   console.log(idOrdenTrabajo);
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
        <table class="table table-bordered table-striped" id='myTable'>
            <thead>
                <tr>
                    <th scope="col">ID Orden de Trabajo</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Diagnóstico</th>
                    <th scope="col">Nombre Paciente</th>
                    <th scope="col" class"text-end">Nombre Medico</th>
                </tr>
            </thead>
            <tbody>
                ${ordenes.map((ordenTrabajo) => `
                    <tr id="${ordenTrabajo.idOrdenTrabajo}">
                        <th scope="row">${ordenTrabajo.idOrdenTrabajo}</th>
                        <td>${ordenTrabajo.fechaCreacion}</td>
                        <td>${ordenTrabajo.estado}</td>
                        <td>${ordenTrabajo.diagnostico}</td>
                        <td>${ordenTrabajo.paciente.nombre}</td>
                        <td>${ordenTrabajo.medico.nombre}</td>                       
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    $ordenesTable.innerHTML = table;

    $(document).ready(function () {
        $('#myTable').DataTable();
    })

    ordenes.forEach((ordenTrabajo) => {
        const fila = document.getElementById(`${ordenTrabajo.idOrdenTrabajo}`);
        fila.addEventListener('dblclick', () => {

            $ordenesTable.style.display = 'none';

            document.getElementById('idOrdenTrabajo').value = ordenTrabajo.idOrdenTrabajo; 
            console.log(ordenTrabajo.idOrdenTrabajo);   
        
            
            $formulario.classList.remove('d-none');
        });
    });
}

$muestra.addEventListener('click',  async (e) => {
    try {
        const response = await fetch('/muestra');
        if (response.ok) {
            const muestras = await response.json();
            renderMuestrasTable(muestras);
        } else {
            console.error('Error al obtener las Muestras.');
        }
    } catch (error) {
        console.error('Error al obtener las Muestras:', error);       
    } 
});

function renderMuestrasTable(muestras) {
    const table = `
        <table class="table table-bordered table-striped" id='myTable'>
        <thead>
            <tr>
                <th scope="col" class="text-center">ID Muestra</th>
                <th scope="col" class="text-center">Tipo</th>
                <th scope="col" class="text-center">Fecha de Recepción</th>
                <th scope="col" class="text-center">Etiqueta</th>
                <th scope="col" class="text-center">ID Orden de Trabajo</th>
                <th scope="col" class="text-center">Action</th>
            </tr>
        </thead>
        <tbody class="text-center">
            ${muestras.map((muestra) => `
                <tr>
                    <th scope="row">${muestra.idMuestra}</th>
                    <td>${muestra.tipo}</td>
                    <td>${muestra.fechaRecepcion}</td>
                    <td>${muestra.etiqueta}</td>
                    <td>${muestra.idOrdenTrabajo}</td>
                    <td class="text-center ">
                    <a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-solid fa-pen" id="actualizar"></i></a>
                    <a href="#" type="button" class="btn btn-light btn-sm"><i class="fa-regular fa-trash-can" id="eliminar"></i></a>
                    </td>
                        
                </tr> 
                `).join('')}
        </tbody>
        </table>
    `;
    $muestraTable.innerHTML = table;

    $(document).ready(function () {
        $('#myTable').DataTable();
    });
};





