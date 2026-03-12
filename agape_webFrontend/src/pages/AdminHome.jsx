import { useEffect } from "react";
import '../styles/AdminStyle.css';
import '../styles/tableStyle.css';
import { supabase } from "../supabase/client";

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
        <div></div>
    );

}