import React from 'react';
import '../styles/style.css';

export default function Header() {
  return (
    <header className="menu-container">
      <div className="mini-content-portada">
        <figure className="isotipo">
          <a href="/">
            <img src="/css/Imagenes/Logotipo.png" alt="Logotipo Ágape" />
          </a>
        </figure>

        <address className="direccion-spot">
          <img src="/css/Imagenes/gps.png" alt="Icono GPS" />
          <a href="https://maps.app.goo.gl/yqhJ7Sezm5qkZNsz6" target="_blank" rel="noopener noreferrer">
            Ágape Clínica Familiar Recoleta
          </a>
        </address>

        <address className="direccion-spot-responsive">
          <a href="https://maps.app.goo.gl/yqhJ7Sezm5qkZNsz6" target="_blank" rel="noopener noreferrer">
            <img src="/css/Imagenes/gps.png" alt="Icono GPS" />
          </a>
        </address>

        <div className="contain-button-indice">
          <a href="tel:+5491153315361">
            <button className="buttonBasic" id="buttonIndiceContacto">Contáctanos</button>
          </a>
          <a href="#resultadosDeExamenes">
            <button className="buttonBasic" id="buttonIndice">Resultado de exámenes</button>
          </a>
        </div>
      </div>

      <nav className="content-navbar">
        <input className="checkbox" type="checkbox" id="menu" />
        <img src="/css/Imagenes/menu.png" id="menuBar" className="menu-icono" alt="Menú" />
        <ul id="listaNavegacion" className="navbarUl">
          <li><a href="/">Home</a></li>
          <li><a href="#sobreNosotros">Sobre Nosotros</a></li>
          <li><a href="#nuestraHistoria">Nuestra Historia</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a id="LoginAdmin" href="/pages/Login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}