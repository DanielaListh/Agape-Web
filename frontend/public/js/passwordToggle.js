// este escript tiene la finalidad de mostrar u ocultar el contenido de la contraseña de Resgistro y Login

const togglePassword = document.getElementById("toggle-password");// es un button
const passwordInput = document.getElementById("password");// es el input

togglePassword.addEventListener("click", () =>{ 
    //getAtribute obtiene el atributo type del campo passwordInput, si el valor de type es "password" sabemos que la contrase;a esta oculta 
    const mostarPassword = passwordInput.getAttribute("type") === "password"; // si esto es true significa que la contrase;a esta oculta
    passwordInput.setAttribute("type", mostarPassword ? "text": "password");
    togglePassword.textContent = mostarPassword ? "Ocultar" : "Mostrar";
});