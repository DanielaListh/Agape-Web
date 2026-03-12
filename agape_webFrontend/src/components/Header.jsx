import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación interna
import '../styles/style.css';
import Logotipo from "../assets/Imagenes/Logotipo.png";
import gps from "../assets/Imagenes/gps.png";
import menu from "../assets/Imagenes/menu.png";

export default function Header() {
  return (
    <header className="menu-container">
      <div className="mini-content-portada">
        <figure className="isotipo">
          <a href="/">
            <img src={Logotipo} alt="Logotipo Ágape" />
          </a>
        </figure>

        <address className="direccion-spot">
          <img src={gps} alt="Icono GPS" />
          <a href="https://maps.app.goo.gl/PQNdAbRmXzZugeku7" target="_blank" rel="noopener noreferrer">
            Ágape Clínica Familiar Barinas
          </a>
        </address>

        <address className="direccion-spot-responsive">
          <a href="https://maps.app.goo.gl/PQNdAbRmXzZugeku7" target="_blank" rel="noopener noreferrer">
            <img src={gps} alt="Icono GPS" />
          </a>
        </address>

        <div className="contain-button-indice">
          <a href="tel:+5491153315361">
            <button className="buttonBasic" id="buttonIndiceContacto">Contáctanos</button>
          </a>
          <a href="#resultadosDeExamenes">
            <button className="buttonBasic" id="buttonIndice">Resultado de exámenes (version 2.0)</button>
          </a>
        </div>
      </div>

      <nav className="content-navbar">
        <input className="checkbox" type="checkbox" id="menu" />
        <img src={menu} id="menuBar" className="menu-icono" alt="Menú" />
        <ul id="listaNavegacion" className="navbarUl">
          <li><a href="/">Home</a></li>
          <li><a href="#sobreNosotros">Sobre Nosotros</a></li>
          <li><a href="#nuestraHistoria">Nuestra Historia</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="#ubicacion">Ubicación</a></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}