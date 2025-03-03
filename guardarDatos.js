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
                <button class="btn btn-danger me-2" onclick="eliminarUsuario(${index})">Borrar</button>
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

function guardarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const pais = document.getElementById('pais').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (!nombre || !apellido || !fechaNacimiento || !pais || !email || !password || !password2) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    if (password !== password2) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const nuevoUsuario = {
        nombre,
        apellido,
        fecha: fechaNacimiento,
        pais,
        email,
        password,
        bloqueado: false
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('pais').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password2').value = '';

    alert('Usuario guardado correctamente');
    toggleUsersTable();
    mostrarUsuarios();
}

window.onload = mostrarUsuarios;
