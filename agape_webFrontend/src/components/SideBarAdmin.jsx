import '../styles/AdminStyle.css';
import Logotipo from '../assets/Imagenes/Logotipo.png';
import arrow from '../assets/Imagenes/arrow.svg';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SidebarAdmin() {
  const [openMenus, setOpenMenus] = useState({});

    // Función para alternar la visibilidad de los submenús
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ // Mantiene el estado anterior de los menús y solo cambia el menú específico que se ha clickeado
      ...prev, // Mantiene el estado anterior de los menús
      [menu]: !prev[menu], 
    }));
  };

  return (
    <nav className="sidebar">
      <div className="logo">
        <img src={Logotipo} alt="Logo Ágape" />
      </div>

      <ul className="menu">

        {/* HOME */}
        <li>
          <Link to="/adminHome">Home</Link>
        </li>

        {/* GESTIÓN DE TABLAS */}
        <li className="submenu">
          <button className="submenu_a" onClick={() => toggleMenu("gestion")}>
            Gestión de Tablas
          </button>
          <img className="arrow list_arrow" src={arrow} alt="" />

          {openMenus.gestion && (
            <ul className="submenu-content">

              {/* ESPECIALIDADES */}
              <li className="submenu">
                <button onClick={() => toggleMenu("especialidades")}>
                  Especialidades
                </button>
                <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.especialidades && (
                  <ul className="submenu-content">
                    <li><Link to="/especialidades/ver">Ver especialidades</Link></li>
                    <li><Link to="/especialidades/crear">Crear especialidad</Link></li>
                    <li><Link to="/especialidades/editar">Editar especialidad</Link></li>
                  </ul>
                )}
              </li>

              {/* PROVINCIAS */}
              <li className="submenu">
                <button onClick={() => toggleMenu("provincias")}>
                  Provincias
                </button>
                              <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.provincias && (
                  <ul className="submenu-content">
                    <li><Link to="/provincias/ver">Ver provincias</Link></li>
                    <li><Link to="/provincias/crear">Crear provincia</Link></li>
                    <li><Link to="/provincias/editar">Editar provincia</Link></li>
                  </ul>
                )}
              </li>

              {/* GÉNEROS */}
              <li className="submenu">
                <button onClick={() => toggleMenu("generos")}>
                  Géneros
                </button>
                <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.generos && (
                  <ul className="submenu-content">
                    <li><Link to="/generos/ver">Ver géneros</Link></li>
                    <li><Link to="/generos/crear">Crear género</Link></li>
                    <li><Link to="/generos/editar">Editar género</Link></li>
                  </ul>
                )}
              </li>

              {/* CARACTERISTICAS */}
              <li className="submenu">
                <button onClick={() => toggleMenu("caracteristicas")}>
                  Características
                </button>
                <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.caracteristicas && (
                  <ul className="submenu-content">
                    <li><Link to="/caracteristicas/ver">Ver características</Link></li>
                    <li><Link to="/caracteristicas/crear">Crear característica</Link></li>
                    <li><Link to="/caracteristicas/editar">Editar característica</Link></li>
                  </ul>
                )}
              </li>

              {/* MÉDICOS */}
              <li className="submenu">
                <button onClick={() => toggleMenu("medicos")}>
                  Médicos
                </button>
                <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.medicos && (
                  <ul className="submenu-content">
                    <li><Link to="/medicos/ver">Lista de médicos</Link></li>
                    <li><Link to="/medicos/crear">Agregar médico</Link></li>
                    <li><Link to="/medicos/editar">Editar médico</Link></li>
                  </ul>
                )}
              </li>

              {/* ROLES */}
              <li className="submenu">
                <button onClick={() => toggleMenu("roles")}>
                  Roles
                </button>
                <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.roles && (
                  <ul className="submenu-content">
                    <li><Link to="/roles/ver">Ver roles</Link></li>
                    <li><Link to="/roles/crear">Crear rol</Link></li>
                    <li><Link to="/roles/editar">Editar rol</Link></li>
                  </ul>
                )}
              </li>

              {/* USUARIOS */}
              <li className="submenu">
                <button onClick={() => toggleMenu("usuarios")}>
                  Usuarios
                </button>
                <img className="arrow list_arrow" src={arrow} alt="" />

                {openMenus.usuarios && (
                  <ul className="submenu-content">
                    <li><Link to="/usuarios/ver">Ver usuarios</Link></li>
                  </ul>
                )}
              </li>

            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}