import React, { useEffect, useState } from "react";
import '../styles/style.css';
import { supabase } from "../supabase/client";
import arrow from "../assets/Imagenes/arrow.png";

export default function Servicios() {

    const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null); // valor por defecto inexistente
  const [loading, setLoading] = useState(true); // valor por defecto cargando

    useEffect(() => {
        const fetchServicios = async () => {
            const { data, error } = await supabase
              .from("especialidades_medicas")
              .select("*");
            if (error) {
                console.error("Error: ", error);
                setError("Error al cargar las especialidades Medicas");
            } else {
                setServicios(data);
          }
          setLoading(false);// se ha cargado la informacion, se cambia el estado a falso
        };
        fetchServicios(); // llamamos a la funcion 
    }, []);

  return (
    <section id="servicios" className="Servicios">
      <header className="content-servicios">
        <h2>
          <span className="color1">Conoce los</span>
          <span className="color2"> servicios</span>
          <span className="color1"> que ofrecemos</span>
        </h2>

        <p className="p-buscador">
          Como centro diagnóstico, nos preocupa la salud de nuestros pacientes.
          Queremos que todos puedan acceder a servicios médicos de alta calidad
          a un costo accesible.
        </p>    
      </header>
      <a href="#servicios">
        <img
          src={arrow}
          alt="Flecha"
          className="flecha"
        />
      </a>
          
      <div id="servicios-container" className="Servicios-Container">
        {loading && <p>Cargando servicios...</p>} {/* si loading es verdadero, se muestra el texto */}
        {error && <p>{error}</p>}
        {!error && servicios.length === 0 && ( // si no hay un error y el array esta vacio
            <p>No se encontraron resultados</p> // se muestra el texto
        )}
          <div className="divHijo">
            {servicios.map((servicio) => {
            const imgURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/servicios/${servicio.imagen_especialidad_med}`;
            return (
                <div key={servicio.id_especialidad_medica} className='divNieto'>
                    <div className='preview-img'>
                        <img
                            src={imgURL}
                            alt={servicio.nombre_especialidad_med}
                            width="50"
                        />
                    </div>
                    <h4>{servicio.nombre_especialidad_med}</h4>
                    <p>{servicio.descripcion_especialidad_med}</p>
                </div>
              );
            })}  
          </div>
                    
      </div>
    </section>
  );
}