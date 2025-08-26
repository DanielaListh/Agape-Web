// en este script se usa para interceptar el submit y mostrar el modal de exito

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const modal = document.getElementById("modal-exito");
  const btnCerrar = document.getElementById("cerrar-modal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que recargue la página

    const formData = {
      nombre: form.nombre.value,
      email: form.email.value,
      telefono: form.telefono.value,
      mensaje: form.mensaje.value
    };

    try {
      const res = await fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        modal.style.display = "flex"; // Mostrar modal
        form.reset(); // Limpiar formulario
      } else {
        alert("Ocurrió un error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error al conectar con el servidor.");
    }
  });

  btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

