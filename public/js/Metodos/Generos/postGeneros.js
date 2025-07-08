document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-Generos");

  if (!form) {
    console.error("form no encontrado en el DOM");
    return;
  }

  const inputNombreGenero = document.getElementById("nombreGenero");
  const errorMsgInput = document.getElementById("error-msg-input-post");

  function mostrarErrorMsgNombre(mensaje) {
    errorMsgInput.textContent = mensaje;
    setTimeout(() => (errorMsgInput.textContent = ""), 6000);
  }

  const regexInput = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  function validarInput(input) {
    if (!input.value.trim()) {
      mostrarErrorMsgNombre("El nombre del género es obligatorio.");
      return false;
    }
    if (!regexInput.test(input.value)) {
      mostrarErrorMsgNombre("No se admiten caracteres especiales ni números.");
      input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      return false;
    }
    if (input.value.length > 30) {
      mostrarErrorMsgNombre("Como máximo se admiten 30 caracteres.");
      input.value = input.value.slice(0, 30);
      return false;
    }
    return true;
  }

  inputNombreGenero.addEventListener("input", function () {
    validarInput(inputNombreGenero);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("Formulario encontrado, ejecutando fetch...");

    const nombreGenero = inputNombreGenero.value.trim();

    if (!validarInput(inputNombreGenero)) {
      return;
    }

    const formData = new FormData();
    formData.append("nombreGenero", nombreGenero);//////////////

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:3000/generos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nombreGenero}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      alert("Género creado con éxito.");
      form.reset();
      window.location.href = "http://localhost:3000/adminHome/verGeneros/";
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado. Inténtalo de nuevo.");
    }
  });
});
