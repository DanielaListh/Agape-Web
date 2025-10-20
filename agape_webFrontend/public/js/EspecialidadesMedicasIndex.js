//este script muestra los registros existentes en la tabla especialidades_medicas de la base de datos
// en el index en tiempo real cuando se cargue el dom

//procesar la url de las img para que se puedan previsualizar
import { SUPABASE_URL, SUPABASE_KEY } from '../config.js'


const renderEspecialidadesMedicas = (data) => {
    const divPadre = document.getElementById("servicios-container");

    if(data.length === 0 ){
        divPadre.innerHTML = `<p>No se encontro resultados</p>`;
        return;
    }
    //const baseUrl="http://localhost:3000/";
    

    divPadre.innerHTML = "";//vaciar el contenedor
    //console.log("estamos en el render ahora");

    let divHijo = `
        <div class="divHijo">
        `;

        data.forEach( especialidad => {
            const imgURL = `${SUPABASE_URL}/storage/v1/object/public/EspecialidadesMedicas/${especialidad.imagen_especialidad_med}`;
            divHijo += `
            <div class="divNieto">
                <div class="preview-img"><img src="${imgURL}" alt="${especialidad.nombre_especialidad_med}"></div>
                <h3>${especialidad.nombre_especialidad_med}</h3>
                <p>${especialidad.descripcion_especialidad_med}</p>
            </div>
            `
        });

    divHijo += `</div>`;
    divPadre.innerHTML = divHijo;//insertar en el div padre el hijo 
};


document.addEventListener("DOMContentLoaded", async function (){
    const link = `${SUPABASE_URL}/rest/v1/especialidades_medicas?select=*`;

    const mostrarEspecialidadesMedicasIndex = async () => {
        try{
            const response = await fetch(link, {
                method: "GET",
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            });
            if(!response.ok){
                throw new Error('Error: ' + (response.statusText || "no se pudioeron traer las especialidades medicas"));
            }
            const data= await response.json();
            //console.log("imprimiendo la respuesta json");
            //console.log(data);
             //formar en el html de manera dinamica:
             renderEspecialidadesMedicas(data);
            }
        catch(error) {
            console.error("Error:", error || "Error: en traer datos del fetch");
        }
    };
    mostrarEspecialidadesMedicasIndex();// luego de renderizar muestra las espcialidades en el DOM
});
