import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { supabase } from '../supabase/client'

import chat from '../assets/Imagenes/chat.png'
import bell from  '../assets/Imagenes/bell.png'
import user from '../assets/Imagenes/user.svg'

export default function HorizontalNavBarAdmin() { 

    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); // Hook para navegación

    const toggleMenu = () => {
        setOpen(!open); // abre el menu si no esta abierto, cierralo si esta abierto
    };

    const handleLogout = async () => {
        await supabase.auth.signOut(); // Cierra sesión en Supabase
        navigate('/login'); // Redirige a la página de login
    }

    return (
        <div className="barra-horizontal-sup">

            <div className="icon-chat">
                <button>
                    <img src={chat} alt="chat" />
                </button>
            </div>
            <div className="icon-notificacion">
                <button>
                    <img src={bell} alt="notification" />
                </button>
            </div>
            <div className="icon-user-perfil">
                <button>
                    <img src={user} alt="my profile"  onClick={toggleMenu}/>
                </button>
            </div>

            <div className={`sub-menu ${open ? "" : "hidden"}`}>
                <ul>
                    <li>
                        <Link className="a-link" onClick={handleLogout}>Cerrar Sesión</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}
