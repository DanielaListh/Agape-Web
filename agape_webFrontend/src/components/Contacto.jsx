import { useState } from "react";
import chicaContacto from "../assets/Imagenes/chicaContacto.png";

export default function Contacto() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // previene recarga de la página

    //coloco en una constante los datos obtenidos del formulario
    const formData = {
      nombre: e.target.nombre.value,// accedo a el valor del nombre objetivo del evento, que es el formulario
      email: e.target.email.value,
      telefono: e.target.telefono.value,
      mensaje: e.target.mensaje.value,
    };


    // luego hago un intento de obtener una respuesta del servidor, enviando los datos del formulario

    try {
      const res = await fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //si la respuesta es ok el modal se abre 
      if (res.ok) {
        setModalAbierto(true); // abrir modal
        e.target.reset(); // limpiar formulario
      } else {
        alert("Ocurrió un error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <section className="container-contacto" id="contacto">
      <figure className="img-contact">
        <img src={chicaContacto} alt="Imagen contacto" />
      </figure>

      <article className="contact">
        <p>¿Tienes alguna pregunta o comentario?</p>
        <h2>Realiza tu Consulta</h2>

        <form className="contact-form" onSubmit={handleSubmit} autoComplete="on">
          <input type="text" name="nombre" placeholder="Pedro Pascal" required />
          <input type="email" name="email" placeholder="Pedrito@gmail.com" required />
          <input type="tel" name="telefono" placeholder="11 1234 5678" required />
          <textarea name="mensaje" placeholder="Hola! tengo una duda ..." rows="2" required></textarea>

          <button className="buttonBasic" type="submit" style={{ marginTop: "10px" }}>
            Quiero consultar
          </button>
        </form>

        <p>Los datos enviados no serán utilizados</p>
      </article>

      {/* MODAL */}
      {modalAbierto && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>¡Mensaje enviado exitosamente!</h3>
            <p>En breve nuestro equipo te contactará</p>
            <button onClick={() => setModalAbierto(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
}