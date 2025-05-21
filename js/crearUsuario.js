//script para validar el usuario al registrarse

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form-registro');

    if (!form) {
        console.error("form no encontrado en el DOM");
        return;
    }

    const nombreUsuario = document.getElementById('nombreUsuario');
    const correoElectronico = document.getElementById('correoElectronico');
    const password = document.getElementById('password');
    const inputFechaNacimiento = document.getElementById('fechaNacimiento');
    const imagenUrl = document.getElementById('imagenPerfil');
    const alertaError = document.getElementById('error-msg');

    function mostrarError(mensaje){
        alertaError.textContent = mensaje;
        setTimeout(() => (alertaError.textContent=""), 6000);
    }

    function validarNombre(input){
        const regex = /^[,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!input.value.trim()) {
            mostrarError("El nombre de usuario es necesario");
            return false;
        }
        if (!regex.test(input.value)) {
            mostrarError("No se admiten caracteres especiales en el nombre");
            input.value = input.value.replace(/[^,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
            return false;
        }
        if (input.value.length < 6) {
            mostrarError("El nombre debe tener al menos 6 caracteres");
            input.value = input.value.replace(/[^,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
            return false;
        }
        if (input.value.length > 30) {
            mostrarError("El nombre no debe ser mayor a 30 caracteres");
            return false;
        }
        return true;
    }

    function validarEmail(input){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!input.value.trim()) {
            mostrarError("El email es necesario");
            return false;
        }
        if (!emailRegex.test(input.value)) {
            mostrarError("El email debe ser válido");
            return false;
        }
        return true;
    }

    function validarPassword(input){
        if (!input.value.trim()) {
            mostrarError("La contraseña es necesaria");
            return false;
        }
        if (input.value.length < 6) {
            mostrarError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        if (input.value.length > 20) {
            mostrarError("La contraseña no debe ser mayor a 20 caracteres");
            return false;
        }
        return true;
    }

    let fechaNacimiento = null;
    const hoy = new Date();

    function validarFechaNacimiento(fechaNacimiento){
        if(fechaNacimiento > hoy){
            mostrarError("La fecha de nacimiento debe ser valida");
            return false;
         }
        //calcular edad
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();// obtiene la edad
        const mesDeDiferencia = hoy.getMonth() - fechaNacimiento.getMonth();// obtiene el mes de diferencia
        if(mesDeDiferencia < 0 || (mesDeDiferencia === 0 && hoy.getDate() < fechaNacimiento.getDate())){
              edad--; // Ajustar edad si el mes/día actual está antes del cumpleaños
         }
        if(edad < 18){
            mostrarError("Debes ser mayor de edad para el registro");
            return false;
        }
        if(edad > 110){
            mostrarError("¿Estás vivo aún? ¡Debe ser un error!");
            return false;
        }
        return true
    }

    nombreUsuario.addEventListener("input", () => validarNombre(nombreUsuario));
    correoElectronico.addEventListener("input", () => validarEmail(correoElectronico));
    password.addEventListener("input", () => validarPassword(password));

    inputFechaNacimiento.addEventListener("input", () => {
        fechaNacimiento = new Date (inputFechaNacimiento.value);
        validarFechaNacimiento(fechaNacimiento);
    }); 
        

    


    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // cuando utilizamos en el html select debemos inicializar las constantes o variables dentro del evento listener con accion submit
        // ya que al cargar la pagina se toma como valor el predeterminado valor 1 y no se llega a tomar el valor que el usuario elije

        fechaNacimiento = new Date (inputFechaNacimiento.value);
        const fechaNacimientoISO = fechaNacimiento.toISOString().split("T")[0];
        
        const idRol = parseInt(document.getElementById('idRol').value);
        const idGenero = parseInt(document.getElementById('idGenero').value);

        const isNombreValido = validarNombre(nombreUsuario);
        const isEmailValido = validarEmail(correoElectronico);
        const isPasswordValido = validarPassword(password);
        const isFechaValida = validarFechaNacimiento(fechaNacimiento);
        const file = imagenUrl.files[0];

        if (!isNombreValido || !isEmailValido || !isPasswordValido || !isFechaValida) {
            mostrarError("todos los campos son obligatorios");
            return;
        }

        if (!file) {
            mostrarError("No se pudo encontrar la imagen");
            return;
        }

        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            mostrarError("La imagen debe ser un archivo tipo png, jpg o jpeg");
            return;
        }

        const reader = new FileReader();// fileReader permite leer el contenido de archivos locales
        reader.onload = (event) => {
            const image = new Image();
            image.src = event.target.result;

            image.onload = async () => {
                if (image.width !== 150 || image.height !== 150) {
                    mostrarError("La imagen debe ser de 150x150 px.");
                    return;
                }


                const formData = new FormData();
                formData.append("nombreUsuario", nombreUsuario.value.trim());
                formData.append("correoElectronico", correoElectronico.value.trim());
                formData.append("password", password.value.trim());
                formData.append("fechaNacimiento", fechaNacimientoISO);
                formData.append("idRol", idRol);
                formData.append("imagenUrl", file);
                formData.append("idGenero", idGenero);

                try {
                    const link = "http://localhost:3000/usuarios/register";
                    const response = await fetch(link, {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Error en la solicitud");
                    }
                    const data = await response.json();// leer el json antes de redireccionar
                    console.log("respuesta del backend: ", data);

                    alert("Usuario creado con éxito.");
                    form.reset();
                    //redireccion de pagina
                    window.location.href = "http://localhost:3000/Agape/loginAdmin/";
                    
                } catch (error) {
                    console.error("Error:", error);
                    alert("Hubo un error inesperado al crear el usuario. Inténtalo de nuevo.");
                }
            };

            image.onerror = () => {
                alert("No se pudo cargar la imagen.");
            };
        };

        reader.readAsDataURL(file);
    });
});
