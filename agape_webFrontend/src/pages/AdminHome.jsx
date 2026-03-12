import { useEffect } from "react";
import '../styles/AdminStyle.css';
import '../styles/tableStyle.css';
import { supabase } from "../supabase/client";
import bell from '../assets/Imagenes/bell.png';
import user from '../assets/Imagenes/user.svg';
import chat from '../assets/Imagenes/chat.png';

export default function AdminHome() {
    useEffect(() => {
        const rol = parseInt(localStorage.getItem('id_rol'));

        if (rol !== 3){
            window.location.href = '/login';
        }

    }, []);

    // función para cerrar sesión
    const handleLogout = async () => {
        // esepra que cierre sesion en supabase y luego limpia el localStorage
        await supabase.auth.signOut();
        localStorage.clear();
        // y redirige a la pagina del login
        window.location.href = '/login';
    }


    return (
        <div className="contenedor-padre">
            <div className="barra-horizontal-sup">
                <div className="icon-chat"><button><img src={chat} alt="" /></button></div>
                <div className="icon-notificacion"><button><img src={bell} alt="" /></button></div>
                <div className="icon-user-perfil"><button><img src={user} alt="" /></button></div>
                <div className="sub-menu hidden">
                    <ul>
                        <li><button className="a-link" onClick={handleLogout}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            </div>

            <h1>Home</h1>
            <div className="content-view" id="imgEclipse"></div>

        </div>
    );

}