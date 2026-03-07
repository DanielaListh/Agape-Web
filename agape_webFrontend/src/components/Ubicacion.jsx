import '../styles/style.css';


export default function Ubicacion() { 
    return (
        <section id="ubicacion" className="ubicacion">
            <header>
                <h2>Ubicación</h2>
                <h3>¿Dónde encontrarnos?</h3>
            </header>

            <div className="MapIframe">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2124.6772405197817!2d-70.2228524934801!3d8.625348715348336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e7b5987f867c631%3A0x7e559f4dd5729a1c!2sCardio%20Barinas!5e1!3m2!1ses-419!2sus!4v1772754223648!5m2!1ses-419!2sus"
                    loading="lazy"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
}