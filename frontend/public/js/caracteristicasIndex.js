
//este script muestra los registros existentes en la tabla caracteristicasClinica de la base de datos
// en el index en tiempo real cuando se cargue el dom

//procesar la url de las img para que se puedan previsualizar

import { SUPABASE_URL, SUPABASE_KEY } from '../config.js'

const renderCaracteristicas = (data) => {
    const contentNotes = document.getElementById("content-notes");//div donde dentro estan los div de notas

    if(data.length === 0 ){
        contentNotes.innerHTML = `<p>No se encontro resultados</p>`;
        return;
    }
    //const baseUrl="http://localhost:3000/";
    
    contentNotes.innerHTML = "";//vaciar el contenedor
    console.log("estamos en el render ahora");

    let notes = "";

    data.forEach( caracteristica => {
        //const imgURL = baseUrl + caracteristica.imgcaracterClinica;
        //const imgURL = new URL(caracteristica.imgcaracterClinica, baseUrl).href;
        //const imgURL = `https://fjubnouprencwnazwfcm.supabase.co/storage/v1/object/public/caracteristicas_clinica/${caracteristica.imgcaracterclinica}`;
        const imgURL = `${SUPABASE_URL}/storage/v1/object/public/caracteristicasClinicasImg/${caracteristica.imgcaracterclinica}`;
        notes += `
        <div class="notes">
            <div class="preview-img-caracteristica">
                <img src="${imgURL}" alt="${caracteristica.nombrecaracterclinica}" width="80">
            </div>
                <h4>${caracteristica.nombrecaracterclinica}</h4>
                <p>${caracteristica.descripcioncaracterclinica}</p>
        </div>
        `;
    });

    contentNotes.innerHTML = notes;//insertar en el div padre el hijo 
};


document.addEventListener("DOMContentLoaded", async function () {
    const contentNotes = document.getElementById("content-notes");
    //const link = "http://localhost:3000/caracteristicasClinicas/"; //para el get (antiguo link)
    const link = `${SUPABASE_URL}/rest/v1/caracteristicas_clinica?select=*`;

    const mostrarCaracteristicasIndex = async () => {
        try{
            const response = await fetch(link, {
                method: "GET",
                headers: {
                    apikey:SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            });

            if(!response.ok){
                throw new Error('Error: ' + (response.statusText || "no se pudieron traer las caracteristicas"));
            }

            const data = await response.json();
            console.log("imprimiendo la respuesta json: ", data);

             //formar en el html de manera dinamica:
             renderCaracteristicas(data);
            }
        catch(error) {
            console.error("Error:", error || "Error: en traer datos del fetch");
            contentNotes.innerHTML = `<p>Error al cargar las características</p>`;
        }
    };
    mostrarCaracteristicasIndex();// luego de renderizar muestra las espcialidades en el DOM
});