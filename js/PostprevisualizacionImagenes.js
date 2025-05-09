//script de visualizacion de imagenes en el form Post Especialidades medicas
// en crear especialidad medica

document.getElementById('imagenUrl').addEventListener('change', function(event){ 
    //el evento change se activa cuando el usuario selecciona un archivo desde el input
    //change procesa los archivos seleccionados
    const preview = document.getElementById('preview');
    preview.innerHTML = '';//limpiamos cualquier img previa
    const file = event.target.files;// la const files trae los archivos

//este escrip es para cargar dinamicamente la imagen al ser seleccionada desde el front, sirve para Post no para Put
    Array.from(file).forEach(file =>{//el array traido de files le hacemos un bucle 
        if(file.type.startsWith('image/')){ 
         //startWhit es un método en JavaScript que se utiliza para comprobar si una cadena de texto (string) comienza con un conjunto específico de caracteres.
            const reader = new FileReader();//lee el archivo como una URL en base64 y mostrarlo como una imagen en el contenedor #preview
            reader.onload = function(event){
                const div = document.createElement('div');
                div.className = 'imgUpLoad';// clase de esa etiqueta
                const img = document.createElement('img');// de la img creada se guarda en const img
                img.className = 'imgSubida';//clase de esa etiqueta
                img.src = event.target.result;// el recurso de la imagen es traido por el resutado del evento
                div.appendChild(img);
                preview.appendChild(div);// la imgane se guarda en el preview
            };
            reader.readAsDataURL(file);// lee el archivo file como un dato de url
        }   
    });
});