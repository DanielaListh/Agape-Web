import React, { useRef } from "react";
import "../styles/style.css";

export default function ModalExito() {
  const modalRef = useRef(null);

  const cerrarModal = () => {
    modalRef.current.close();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-contenido">
        <h3>¡Mensaje enviado exitosamente!</h3>
        <p>En unos minutos nuestro equipo te contactará</p>

        <button onClick={cerrarModal}>
          Cerrar
        </button>
      </div>
    </dialog>
  );
}