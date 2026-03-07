import { useState } from 'react';
import { supabase } from "../supabase/client";
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para redirigir después del login
import '../styles/style.css';

export default function Login(){
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');


        //validaciones
        if (!correoElectronico || !password) {
            setErrorMessage("Correo electrónico y contraseña son requeridos");
            return;
        }

        if (password.length < 6 || password.length > 20) {
            setCorreoElectronico("La contraseña debe tener entre 6 y 20 caracteres");
            return;
        }
        if (!correoElectronico.includes('.com') || correoElectronico.length < 4) {
            setCorreoElectronico("Correo inválido");
            return;
        }


        try {
            // la constante data y error esperan la respuesta de la base de datos
            const { data, error } = await supabase.auth.signInWithPassword({
                email: correoElectronico,
                password: password
            });

            // si hay un error en la respuesra, muestra el mensaje de error
            if (error) {
                setErrorMessage("Credenciales inválidas");
                return;
            }

            // si no hay un error, guarda la secion en el localStorage
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('token', data.session.access_token);

            //redirige a la pagina adminHome
            navigate('/adminHome');

        } catch (error) {
            setErrorMessage("Error al iniciar sesión");
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <form className="form-login" onSubmit={handleSubmit}>

                    <h2>Log In</h2>

                    <input
                        type="text"
                        className="email-input-login"
                        placeholder="pedro@hotmail.com"
                        value={correoElectronico}
                        onChange={(event) => setCorreoElectronico(event.target.value)}
                        required
                    />

                    <input
                        type={mostrarPassword ? "text" : "password"}
                        className="password-input-login"
                        placeholder="1234*Lpfg"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                        {mostrarPassword ? "Ocultar" : "Mostrar"}{/* Cambia el texto del botón según el estado de mostrarPassword */}
                    </button>

                    <div className="div-texto-validacion">
                        <p className="texto-validacion-login">{error}</p>
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
                    <img src="../assets/Imagenes/picClinic.jpg" alt="personal médico atendiendo a paciente" />
                </div>
            </div>
        </div>
    );
}