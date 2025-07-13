const formTarea = document.getElementById('FormularioTarea');
const inputTarea = document.getElementById('nuevaTarea');
const inputFecha = document.getElementById('fechaTarea');

formTarea.addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevaTarea = inputTarea.value.trim();
    const fechaTarea = inputFecha.value;

    // Validación de fecha: no permitir fechas pasadas
    const fechaActual = new Date();
    const fechaIngresada = new Date(fechaTarea);
    fechaActual.setHours(0,0,0,0); // Ignorar horas para comparar solo fechas
    if (fechaIngresada < fechaActual) {
        alert('La fecha de la tarea no puede ser anterior a la fecha actual.');
        return; // No agregar la tarea
    }

    if (nuevaTarea && fechaTarea) {
        agregarTarea(nuevaTarea, fechaTarea);
        inputTarea.value = '';
        inputFecha.value = '';
        guardarTareasEnLocalStorage();
        actualizarDashboard();
    }
});

function agregarTarea(texto, fecha) {
    const li = document.createElement('li');

    // Crear un span para el texto de la tarea
    const spanTexto = document.createElement('span');
    spanTexto.textContent = `${texto} - ${fecha}`;
    li.appendChild(spanTexto);

    // Crear botón para marcar como completada
    const btnCompletar = document.createElement('button');
    btnCompletar.textContent = '✔';
    btnCompletar.title = 'Marcar como completada';
    btnCompletar.addEventListener('click', function() {
        marcarComoCompletada(li);
    });
    li.appendChild(btnCompletar);

    // Crear botón para eliminar tarea
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '✖';
    btnEliminar.title = 'Eliminar tarea';
    btnEliminar.addEventListener('click', function() {
        eliminarTarea(li);
    });
    li.appendChild(btnEliminar);

    document.getElementById('listaTareasProgramadas').appendChild(li);
}

function marcarComoCompletada(li) {
    // Mover la tarea a la lista de tareas ejecutadas
    document.getElementById('listaTareasEjecutadas').appendChild(li);
    guardarTareasEnLocalStorage();
    actualizarDashboard();
}

function eliminarTarea(li) {
    li.remove();
    guardarTareasEnLocalStorage();
    actualizarDashboard();
}

function guardarTareasEnLocalStorage() {
    const tareasProgramadas = [];
    const tareasEnCurso = [];
    const tareasEjecutadas = [];

    document.querySelectorAll('#listaTareasProgramadas li span').forEach(span => {
        tareasProgramadas.push(span.textContent);
    });
    document.querySelectorAll('#listaTareasenCurso li span').forEach(span => {
        tareasEnCurso.push(span.textContent);
    });
    document.querySelectorAll('#listaTareasEjecutadas li span').forEach(span => {
        tareasEjecutadas.push(span.textContent);
    });

    const tareas = {
        programadas: tareasProgramadas,
        enCurso: tareasEnCurso,
        ejecutadas: tareasEjecutadas
    };

    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareasDesdeLocalStorage() {
    const tareas = JSON.parse(localStorage.getItem('tareas'));
    if (!tareas) return;

    tareas.programadas.forEach(tarea => agregarTarea(tarea.split(' - ')[0], tarea.split(' - ')[1]));
    tareas.enCurso.forEach(tarea => {
        const li = document.createElement('li');

        const spanTexto = document.createElement('span');
        spanTexto.textContent = tarea;
        li.appendChild(spanTexto);

        const btnCompletar = document.createElement('button');
        btnCompletar.textContent = '✔';
        btnCompletar.title = 'Marcar como completada';
        btnCompletar.addEventListener('click', function() {
            marcarComoCompletada(li);
        });
        li.appendChild(btnCompletar);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '✖';
        btnEliminar.title = 'Eliminar tarea';
        btnEliminar.addEventListener('click', function() {
            eliminarTarea(li);
        });
        li.appendChild(btnEliminar);

        document.getElementById('listaTareasenCurso').appendChild(li);
    });
    tareas.ejecutadas.forEach(tarea => {
        const li = document.createElement('li');

        const spanTexto = document.createElement('span');
        spanTexto.textContent = tarea;
        li.appendChild(spanTexto);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '✖';
        btnEliminar.title = 'Eliminar tarea';
        btnEliminar.addEventListener('click', function() {
            eliminarTarea(li);
        });
        li.appendChild(btnEliminar);

        document.getElementById('listaTareasEjecutadas').appendChild(li);
    });
    actualizarDashboard();
}

function actualizarDashboard() {
    const contadorProgramadas = document.getElementById('contadorProgramadas');
    const contadorEnCurso = document.getElementById('contadorEnCurso');
    const contadorEjecutadas = document.getElementById('contadorEjecutadas');

    const totalProgramadas = document.querySelectorAll('#listaTareasProgramadas li').length;
    const totalEnCurso = document.querySelectorAll('#listaTareasenCurso li').length;
    const totalEjecutadas = document.querySelectorAll('#listaTareasEjecutadas li').length;

    contadorProgramadas.textContent = totalProgramadas;
    contadorEnCurso.textContent = `${totalEnCurso} (${totalProgramadas > 0 ? ((totalEnCurso / totalProgramadas) * 100).toFixed(1) : 0}%)`;
    contadorEjecutadas.textContent = `${totalEjecutadas} (${totalProgramadas > 0 ? ((totalEjecutadas / totalProgramadas) * 100).toFixed(1) : 0}%)`;
}

window.onload = function() {
    cargarTareasDesdeLocalStorage();
    actualizarDashboard();
};
