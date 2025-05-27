document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-Provincia");

  if (!form) {
    console.error("form no encontrado en el DOM");
    return;
  }

  const inputNombreProvincia = document.getElementById("nombreProvincia");
  const errorMsgInput = document.getElementById("error-msg-input-post");

  function mostrarErrorMsgNombre(mensaje) {
    errorMsgInput.textContent = mensaje;
    setTimeout(() => (errorMsgInput.textContent = ""), 6000);
  }

  const regexInput = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  function validarInput(input) {
    if (!input.value.trim()) {
      mostrarErrorMsgNombre("El nombre de la provincia es obligatorio.");
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

  inputNombreProvincia.addEventListener("input", function () {
    validarInput(inputNombreProvincia);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("Formulario encontrado, ejecutando fetch...");

    const nombreEstado = inputNombreProvincia.value.trim();

    if (!validarInput(inputNombreProvincia)) {
      return;
    }

    const formData = new FormData();
    formData.append("nombreEstado", nombreEstado);//////////////

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:3000/estados/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nombreEstado}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      alert("Provincia creada con éxito.");
      form.reset();
      window.location.href = "http://localhost:3000/adminHome/verProvincias/";
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado. Inténtalo de nuevo.");
    }
  });
});