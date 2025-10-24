import React from "react";
import '../styles/style.css';
import { FunctionRegion } from "@supabase/supabase-js";

export default function NuestraHistoria() {
    return (
        <section id="nuestraHistoria" className="historia">
            <div className="historia-transparency">
                <figure className="historia-content">
                    <img src="/css/Imagenes/recepcion.jpeg" alt="Recepción clínica" />
                </figure>
                <article className="historia-content-text">
                    <h2 id="h2-tittle">Nuestra Historia</h2>
                    <p id="p1">
                        Ágape Web es el sitio oficial de nuestra clínica familiar, donde
                        brindamos atención médica integral con un enfoque humano y profesional.
                        Contamos con diversas especialidades medicas adaptándonos a las necesidades de cada paciente.
                    </p>
                    <p id="p2">
                        Si querés conocer más sobre nuestros servicios, horarios o formas de contacto,
                        te invitamos a explorar nuestra web o seguirnos en redes sociales. Estamos para
                        acompañarte en cada etapa de tu salud.
                    </p>
                    <div className="historia-content-content">
                        <div><h3>23</h3><p>Áreas Médicas</p></div>
                        <div><h3>40</h3><p>Personal Médico</p></div>
                        <div><h3>235</h3><p>Pacientes atendidos</p></div>
                    </div>
                </article>
            </div>
        </section>
    );
}