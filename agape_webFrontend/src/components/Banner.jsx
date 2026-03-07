import React, { useEffect, useRef, useState } from "react";
import '../styles/style.css';
import Img1 from '../assets/Imagenes/Img1.png';
import Img2 from '../assets/Imagenes/Img2.png';
import Img3 from '../assets/Imagenes/Img3.png';

//este es el carrusel que figura en el index.htm, con las imagenes pasando

export default function Banner() {

    const images = [Img1, Img2, Img3];

    //para saber cual img mostrar
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000);
        
        //clean up a; desmontar
        return () => clearInterval(interval);

    }, []);



    return (
        <section className="Content-Carousel">
                <div className="transparency">
                    <div className="carousel">
                    <div className="carousel-images">
                            {images.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`banner-${index}`}
                                    className={index === currentIndex ? "active" : ""}
                                />

                            ))}
                        
                            <article className="portada-info">
                                <header className="tittle">
                                    <h4>Clínica Familiar</h4>
                                    <h1>Ágape</h1>
                                </header>
                                <div className="btn-info">
                                    <h2 className="infoAlcance">Tu salud al alcance de</h2>
                                    <h2 className="unclick">un click</h2>
                                    <a href="https://wa.me/5491153315361"><button className="buttonBasic">Consulta por WhatsApp</button></a>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
        </section>
    );
}