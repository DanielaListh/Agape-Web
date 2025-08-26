//script para previsualizar las imagenes que se desean subir a traves de los formularios del crud, put especialidad medica

document.getElementById('imagenUrl').addEventListener('change', function(event){ 
    const file = event.target.files[0];// la const files trae los archivos
    const img = document.getElementById('imagenActual');
    const errorMsgImg = document.getElementById('error-msg-imagen');

    img.src = '';
    errorMsgImg.textContent = '';

    if(!file) return;
    if(!file.type.startsWith('image/')){
        errorMsgImg.textContent = "solo se admiten archivos de imagenes";
        setTimeout(()=>(errorMsgImg.textContent = ""), 5000);
        return;
    }

    const reader = new FileReader();
    reader.onload = event => {
        img.src = event.target.result;
    };
     reader.readAsDataURL(file);
});