let formulario = document.getElementById("myForm").addEventListener('submit',(event)=>{
    event.preventDefault()
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fecha = document.getElementById("fecha").value;
    const pais = document.getElementById("pais").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;


    if (password != password2) {
        alert("Las contraseñas no coinciden")
    } else  {

        const objetoUsuario = {
            nombre,
            apellido,
            fecha,
            pais,
            email,
            password,
            password2
        }

    }




})