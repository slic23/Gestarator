
    //event.preventDefault();
function crearUsuario(){
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fecha = document.getElementById("fechaNacimiento").value;
    const pais = document.getElementById("pais").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password != password2) {
        alert("Las contraseñas no coinciden");
    } else {
        const objetoUsuario = {
            nombre,
            apellido,
            fecha,
            pais,
            email,
            password
        };

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(objetoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Usuario guardado correctamente");
        mostrarUsuarios();
        toggleUsersTable();
    }
}

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
        `;

        tbody.appendChild(row);
    });
}

function eliminarUsuario(index) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (confirm(`¿Quieres eliminar  a ${usuarios[index].nombre}?`)) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
}




window.onload = mostrarUsuarios;
