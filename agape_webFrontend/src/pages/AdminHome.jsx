import React, { useEffect } from "react";
import '../styles/AdminStyle.css';
import '../styles/tableStyles.css';
//import { cerrarSession } from '../../public/js/usuarios/cerrarSesion.js';

export default function AdminHome() {
    useEffect(() => {
        // colocar la logica de los scripts antiguos
        // ejmplo: seguridadHomeAdmn()
        //cargar scripts externos amnualmente
        const cerrarSesion = document.createElement('script');
        cerrarSesion.src = '../../public/js/usuarios/cerrarSesion.js';
        cerrarSesion.async = true;
        document.body.appendChild(cerrarSesion);

        //limpieza al desmontar
        return () => {
            document.body.removeChild(cerrarSesion);
        };

    }, []);

    return (
        <div className="contenedor-padre">
            <nav className="sidebar">
                <div className="logo">
                    <img src="/css/Imagenes/LogoAgape.png" alt="logo agape" />
                </div>
                <ul className="menu">
                    <li><button onClick={() => console.log('ir al Home')}>Home</button></li>
                    <li className="submenu">
                        <span className="submenu_a">Gestion de Tablas</span>
                        <img className="arrow list_arrow" src="/css/Imagenes/arrow.svg" alt="flecha" />
                        <ul className="submenu-content">
                            <li><button onClick={() => console.log('crear especialidad')}>Crear Especialidad</button></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <div className="barra-horizontal-sup">
                <div className="icon-chat"><button><img src="/css/Imagenes/chat.png" alt="" /></button></div>
                <div className="icon-notificacion"><button><img src="/css/Imagenes/bell.png" alt="" /></button></div>
                <div className="icon-user-perfil"><button><img src="/css/Imagenes/user.svg" alt="" /></button></div>
                <div className="sub-menu hidden">
                    <ul>
                        <li><button className="a-link" onClick={cerrarSesion}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            </div>

            <h1>Home</h1>
            <div className="content-view" id="imgEclipse"></div>

        </div>
    );

}