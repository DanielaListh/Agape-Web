import { useState } from 'react';
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import picClinic from "../assets/picClinic.jpg";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !data.session) {
            setErrorMsg('Credenciales invalidas');
            return;
        }

        //si no hay un error
        localStorage.setItem('token', data.session.access_token);
        navigate('/adminHome');
    };

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleLogin} className="form-login">
                    <h2>Log In</h2>
                    <input
                        type="email"
                        placeholder="pedrito@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="a1B2c3&"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="div-texto-validacion">
                        {errorMsg && <p className="texto-validacion-login">{errorMsg}</p>}
                    </div>
                    <div>
                        <button type="submit" className="btn-submit-login">Login</button>
                    </div>
                    <div className="or-login">
                        <div className="linea-div"></div>
                        <div className="O"> O </div>
                        <div className="linea-div"></div>
                    </div>
                    <a href="/registroUsuarios.html" className="login-link"><span className="color3">si no tienes cuenta, </span><span className="color4">Regístrate</span></a>
                </form>
                <div className="imageSingup">
                    <img src={picClinic} alt="personal medico atendiendo a paciente" />
                </div>
            </div>
        </div>
    ); 
}