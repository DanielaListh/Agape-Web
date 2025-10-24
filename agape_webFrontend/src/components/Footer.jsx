import React from "react";
import '../styles/style.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="list-footer">
                <a href="/"> volver al Home</a>
                <a href="#">Sobre este proyecto</a>
            </div>
            <div className="redes">
                <a href="https://www.facebook.com/Dani.listh/" target="_blank" className="icon-redes">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://github.com/DanielaListh" target="_blank" className="icon-redes">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/daniela-berrios/" target="_blank" className="icon-redes">
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.instagram.com/liseth.dbh/" target="_blank" className="icon-redes">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </div>
            <div className="linea-divisoria" />
                <p>Desarrollado por Daniela Berrios</p>
        </footer>
    );
}