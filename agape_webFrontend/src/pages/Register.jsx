import { useState } from "react";
import { supabase } from "../supabase/client";
import abrazoImg from "../assets/Imagenes/abrazo.jpg"; // ajustá la ruta si hace falta
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Registro() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("1");
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMensajeOk("");

    if (!correoElectronico || !password) {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6 || password.length > 20) {
      setErrorMsg("La contraseña debe tener entre 6 y 20 caracteres");
      return;
    }

    if (!correoElectronico.includes('.com') || correoElectronico.length < 4) {
          setErrorMsg("Correo inválido");
          return;
    }

    // 1) Crear usuario en Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: correoElectronico,
      password,
    });

    if (authError || !data.user) {
      setErrorMsg("No se pudo crear el usuario");
      return;
    }

    const userId = data.user.id;

    // 2) Guardar datos extra en tu tabla usuarios
    const { error: dbError } = await supabase.from("usuarios").insert({
      id_usuario: userId,
      correo_electronico: correoElectronico,
      id_rol: parseInt(rol),
    });

    if (dbError) {
      setErrorMsg("Usuario creado en Auth, pero falló al guardar en la tabla usuarios");
      return;
    }

    setMensajeOk("Usuario creado con éxito. Revisa tu correo para confirmar la cuenta.");
    setCorreoElectronico("");
    setPassword("");
    setRol("1");
  };

  return (
    <div className="container-registro">
      <div className="form-container">
        <div className="imageSingup">
          <img src={abrazoImg} alt="Persona en silla de ruedas" />
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <h2>Regístrate</h2>

          <input
            type="email"
            className="email-input"
            name="correoElectronico"
            placeholder="pedrito@gmail.com"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />

          <input
            type={mostrarPassword ? "text" : "password"}
            className="password-input"
            name="password"
            placeholder="a1B2c3&"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            id="toggle-password"
            className="toggle-btn"
            onClick={() => setMostrarPassword(!mostrarPassword)}
          >
            {mostrarPassword ? <FaEyeSlash/> : <FaEye/>}
          </button>

          <label htmlFor="idRol"></label>
          <div className="select-option">
            <label htmlFor="idRol">Perfil</label>
            <select
              className="campoRol"
              id="idRol"
              name="idRol"
              required
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="1">Paciente</option>
              <option value="2">Médico</option>
              <option value="3">Administrador</option>
            </select>
          </div>

          <div className="error-msg-registro">
            <p id="error-msg">{errorMsg || mensajeOk}</p>
          </div>

          <div>
            <button className="btn-submit-login" type="submit">
              Regístrate
            </button>
          </div>

          <div className="or">
            <div className="linea-div"></div>
            <div className="O"> O </div>
            <div className="linea-div"></div>
          </div>

          <a href="/login" className="login-link">
            <span className="color3">si ya tienes cuenta, </span>
            <span className="color4">Inicia Sesión</span>
          </a>
        </form>
      </div>
    </div>
  );
}