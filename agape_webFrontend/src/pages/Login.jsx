import { useState } from 'react';
import { supabase } from "../supabase/client";
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para redirigir después del login
import '../styles/style.css';
import picClinic from '../assets/Imagenes/picClinic.jpg';
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Login(){
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            //validaciones
            const {data, error} = await supabase.auth.signInWithPassword({
                email: correoElectronico,
                password: password
            });

            if (error || !data.user) {
                setErrorMessage("Correo o contraseña incorrectos");
                return;
            }

            // userId tendra el id del usuario que se  ha logueado exitosamente
            const userId = data.user.id;

            // obtenemos el rol del usuario
            const { data: usuario, error: rolError } = await supabase
                .from('usuarios').select('id_rol').eq('id_usuario', userId).single();
            
            if (rolError || !usuario) {
                setErrorMessage("No se pudo obtener el rol del usuario");
                return;
            }

            const rol = usuario.id_rol;

            // guardamos en el local storage
            localStorage.setItem('id_usuario', userId);
            localStorage.setItem('token', data.session.access_token);
            localStorage.setItem('id_rol', rol);

            // validar el acceso a los administradores
            if (rol !== 3) {
                setErrorMessage("Acceso denegado. Solo los administradores pueden acceder.");
                return;
            }

            //redirige a la pagina adminHome
            navigate('/adminHome');

        } catch (error) {
            setErrorMessage("Error al iniciar sesión");
        }
    };

    return (
        <div className='container-login'>
            <div className='form-container'>
                <form className="form-login" onSubmit={handleLogin}>

                    <h2>Log In</h2>
                    <div className='separador'>
                        <div>
                            <input
                                type="text"
                                className="email-input"
                                placeholder="pedro@hotmail.com"
                                value={correoElectronico}
                                onChange={(event) => setCorreoElectronico(event.target.value)}
                                required
                            />

                            <input
                                type={mostrarPassword ? "text" : "password"}
                                className="password-input"
                                placeholder="1234*Lpfg"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button
                            type="button"
                            className="toggle-btn"
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                        >
                            {mostrarPassword ? <FaEyeSlash/> : <FaEye/>}{/* Cambia el texto del botón según el estado de mostrarPassword */}
                        </button>
                        </div>
                    </div>
                    

                    

                    <div className="div-texto-validacion">
                        <p className="texto-validacion-login">{errorMessage}</p>
                    </div>

                    <button className="btn-submit-login" type="submit">Login</button>

                    <div className="or-login">
                        <div className="linea-div"></div>
                        <div className="o">O</div>
                        <div className="linea-div"></div>
                    </div>

                    <a href="/registro" className="login-link">
                        <span className="color3">si no tienes cuenta, </span>
                        <span className="color4">Regístrate</span>
                    </a>

                </form>
                <div className="imageSingup">
                    <img src={picClinic} alt="personal médico atendiendo a paciente" />
                </div>
            </div>
        </div>
    );
}