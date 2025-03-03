function mostrarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let tbody = document.querySelector("#usersTable tbody");

    tbody.innerHTML = ""; 

    usuarios.forEach((usuario, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${usuario.nombre} ${usuario.apellido}</td>
            <td>${usuario.fecha}</td>
            <td>${usuario.pais}</td>
            <td>${usuario.email}</td>
            <td>
                <button class="btn btn-danger" onclick="eliminarUsuario(${index})">Borrar</button>
            </td>
            <td>
                <button class="btn ${usuario.bloqueado ? 'btn-secondary' : 'btn-warning'}" 
                        onclick="bloquearUsuario(this, ${index})">
                    ${usuario.bloqueado ? 'Bloqueado' : 'Bloquear'}
                </button>
            </td>
        `;
        if (usuario.bloqueado) {
            row.style.opacity = '0.5';
            row.classList.add('bloqueado');
        } else {
            row.style.opacity = '1';
        }

        tbody.appendChild(row);
    });
}

function bloquearUsuario(button, index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let row = button.closest("tr");

    usuarios[index].bloqueado = !usuarios[index].bloqueado; 

    if (usuarios[index].bloqueado) {
        row.style.opacity = '0.5';
        button.textContent = 'Bloqueado';
        button.classList.remove('btn-warning');
        button.classList.add('btn-secondary');
    } else {
        row.style.opacity = '1';
        button.textContent = 'Bloquear';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-warning');
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (confirm(`¿Quieres eliminar a ${usuarios[index].nombre}?`)) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
}

window.onload = mostrarUsuarios;
