document.addEventListener("DOMContentLoaded", () => {

  //trae y muestra los datos obtenidos del registro al formulario
  const params = new URLSearchParams(window.location.search);
  const idProvincia = params.get("id");

    if (idProvincia) {
      // Hacer fetch con ese ID
      fetch(`http://localhost:3000/estados/${idProvincia}`)
        .then(res => res.json())
        .then(data => mostrarDataForm(data))
        .catch(err => console.error("Error al traer datos:", err));
    }

  const form = document.getElementById("form-Modify-Provincia");
  const inputBusqueda = document.getElementById("inputNombreProvincia");
  const selectCoincidencias = document.getElementById("listaCoincidencias");
  const parrafoError = document.getElementById("p-error");
  const errorMsgNombre = document.getElementById("error-msg-nombre");
  const idProvinciaSpan = document.getElementById("spamId");
  const nombreProvinciaInput = document.getElementById("nombreProvincia");

  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  if (!form || !inputBusqueda || !selectCoincidencias || !parrafoError || !nombreProvinciaInput) {
    console.error("Uno o más elementos no encontrados en el DOM.");
    return;
  }

  //es para la busqueda de nombre de genero en la bbdd 
  const mostrarParrafoError = (mensaje) => {
    parrafoError.textContent = mensaje;
    setTimeout(() => (parrafoError.textContent = ""), 6000);
  };

  const mostrarErrorMsgNombre = (mensaje) => {
    errorMsgNombre.textContent = mensaje;
    setTimeout(() => (errorMsgNombre.textContent = ""), 6000);
  };

  const validarInput = (input) => {
    const valor = input.value.trim();
    if (!valor) {
      mostrarErrorMsgNombre("El nombre de la provincia es necesario");
      return false;
    }
    if (!regex.test(valor)) {
      mostrarErrorMsgNombre("No se admiten caracteres especiales ni números");
      input.value = valor.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, "");
      return false;
    }
    if (valor.length > 30) {
      mostrarErrorMsgNombre("Máximo 30 caracteres permitidos");
      input.value = valor.slice(0, 30);
      return false;
    }
    return true;
  };

  inputBusqueda.addEventListener("input", async () => {
    const valor = inputBusqueda.value.trim();

    if (!valor || !regex.test(valor)) {
      selectCoincidencias.style.display = "none";
      if (valor && !regex.test(valor)) {
        mostrarParrafoError("No se admiten números ni caracteres especiales");
      }
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/estados?nombre=${encodeURIComponent(valor)}`);
      if (!response.ok) throw new Error("Error al buscar provincias");

      const provincias = await response.json();
      mostrarCoincidencias(provincias);

    } catch (error) {
      console.error("Error en la búsqueda:", error);
      selectCoincidencias.style.display = "none";
    }
  });

  const mostrarCoincidencias = (provincias) => {
    if (!provincias.length) {
      selectCoincidencias.style.display = "none";
      return;
    }

    selectCoincidencias.innerHTML = "";
    provincias.forEach((provincia) => {
      const option = document.createElement("option");
      option.value = provincia.nombre_estado;
      option.textContent = provincia.nombre_estado;
      selectCoincidencias.appendChild(option);
    });

    selectCoincidencias.style.display = "block";
  };

  selectCoincidencias.addEventListener("change", async () => {
    const nombreSeleccionado = selectCoincidencias.value;
    selectCoincidencias.style.display = "none";

    try {
      const response = await fetch(`http://localhost:3000/estados/${encodeURIComponent(nombreSeleccionado)}`);
      if (!response.ok) {
        mostrarParrafoError("Error al obtener la provincia seleccionada");
        return;
      }

      const data = await response.json();
      mostrarDataForm(data);
    } catch (error) {
      console.error("Error al obtener la provincia:", error);
    }
  });

  const mostrarDataForm = (provincia) => {
    if (Array.isArray(provincia)) provincia = provincia[0];
    if (!provincia || !provincia.id_estado) {
      mostrarParrafoError("No se encontraron resultados del parrafo");
      return;
    }

    idProvinciaSpan.textContent = provincia.id_estado;
    nombreProvinciaInput.value = provincia.nombre_estado;
  };

  nombreProvinciaInput.addEventListener("input", () => {
    validarInput(nombreProvinciaInput);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombreEstado = nombreProvinciaInput.value.trim();
    const idEstado = idProvinciaSpan.textContent;

    if (!validarInput(nombreProvinciaInput)) return;

    try {
      const response = await fetch(`http://localhost:3000/estados/${idEstado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreEstado: nombreEstado }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      alert("provincia modificada con éxito.");
      form.reset();
      window.location.href = "http://localhost:3000/adminHome/verProvincias/";
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado. Inténtalo de nuevo.");
    }
  });
});