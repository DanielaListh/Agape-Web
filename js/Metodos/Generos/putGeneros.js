document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-Modify-Genero");
  const inputBusqueda = document.getElementById("inputNombreGenero");
  const selectCoincidencias = document.getElementById("listaCoincidencias");
  const parrafoError = document.getElementById("p-error");
  const errorMsgNombre = document.getElementById("error-msg-nombre");
  const idGeneroSpan = document.getElementById("spamId");
  const nombreGeneroInput = document.getElementById("nombreGenero");

  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  if (!form || !inputBusqueda || !selectCoincidencias || !parrafoError || !nombreGeneroInput) {
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
      mostrarErrorMsgNombre("El nombre del género es necesario");
      return false;
    }
    if (!regex.test(valor)) {
      mostrarErrorMsgNombre("No se admiten caracteres especiales ni números");
      input.value = valor.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, "");
      return false;
    }
    if (valor.length > 15) {
      mostrarErrorMsgNombre("Máximo 15 caracteres permitidos");
      input.value = valor.slice(0, 15);
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
      const response = await fetch(`http://localhost:3000/generos?nombre=${encodeURIComponent(valor)}`);
      if (!response.ok) throw new Error("Error al buscar géneros");

      const generos = await response.json();
      mostrarCoincidencias(generos);

    } catch (error) {
      console.error("Error en la búsqueda:", error);
      selectCoincidencias.style.display = "none";
    }
  });

  const mostrarCoincidencias = (generos) => {
    if (!generos.length) {
      selectCoincidencias.style.display = "none";
      return;
    }

    selectCoincidencias.innerHTML = "";
    generos.forEach((genero) => {
      const option = document.createElement("option");
      option.value = genero.nombre_genero;
      option.textContent = genero.nombre_genero;
      selectCoincidencias.appendChild(option);
    });

    selectCoincidencias.style.display = "block";
  };

  selectCoincidencias.addEventListener("change", async () => {
    const nombreSeleccionado = selectCoincidencias.value;
    selectCoincidencias.style.display = "none";

    try {
      const response = await fetch(`http://localhost:3000/generos/${encodeURIComponent(nombreSeleccionado)}`);
      if (!response.ok) {
        mostrarParrafoError("Error al obtener el género seleccionado");
        return;
      }

      const data = await response.json();
      mostrarDataForm(data);
    } catch (error) {
      console.error("Error al obtener el género:", error);
    }
  });

  const mostrarDataForm = (genero) => {
    if (Array.isArray(genero)) genero = genero[0];
    if (!genero || !genero.id_genero) {
      mostrarParrafoError("No se encontraron resultados del género");
      return;
    }

    idGeneroSpan.textContent = genero.id_genero;
    nombreGeneroInput.value = genero.nombre_genero;
  };

  nombreGeneroInput.addEventListener("input", () => {
    validarInput(nombreGeneroInput);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombreGenero = nombreGeneroInput.value.trim();
    const idGenero = idGeneroSpan.textContent;

    if (!validarInput(nombreGeneroInput)) return;

    try {
      const response = await fetch(`http://localhost:3000/generos/${idGenero}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreGenero: nombreGenero }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      alert("Género modificado con éxito.");
      form.reset();
      window.location.href = "http://localhost:3000/adminHome/verGeneros/";
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado. Inténtalo de nuevo.");
    }
  });
});
