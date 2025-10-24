
//este script muestra los registros existentes en la tabla caracteristicasClinica de la base de datos
// en el index en tiempo real cuando se cargue el dom

//procesar la url de las img para que se puedan previsualizar

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client'
import '../styles/style.css'

export default function SobreNosotros() {

    const [caracteristicas, setCaracteristicas] = useState([]);
    const [error, setError] = useState(null); //comienza como inexistente

    useEffect(() => {
        const fetchCaracteristicas = async () => {
            const { data, error } = await supabase
                .from("caracteristicas_clinica").select("*");
            
            if (error) {
                console.error("Error: ", err);
                setError("Error al cargar las caracteristicas");
            } else {
                setCaracteristicas(data);
            }
        };
        fetchCaracteristicas();// llamamos a la funcion
    }, []);
    
    return (
        <section id="sobreNosotros" className="sobre-nosotros">
            <header>
                <h2>Sobre Nosotros</h2>
                <h3>¿Por qué elegirnos?</h3>
            </header>
            
            <div id="content-notes" className="content-notes">
                {error && <p>{error}</p>}
                {!error && caracteristicas.length === 0 && (
                    <p>No se encontraron resultados</p>
                )}
                {caracteristicas.map((caracteristica) => {
                    const imgURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/caracteristicasClinicasImg/${caracteristica.imgcaracterclinica}`;
                    return (
                        <div key={caracteristica.idcaracterclinica} className='notes'>
                            <div className='preview-img-caracteristica'>
                                <img
                                    src={imgURL}
                                    alt={caracteristica.nombrecaracterclinica}
                                    width="80"
                                />
                            </div>
                            <h4>{caracteristica.nombrecaracterclinica}</h4>
                            <p>{caracteristica.descripcioncaracterclinica}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}