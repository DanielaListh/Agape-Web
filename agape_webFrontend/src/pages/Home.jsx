import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NuestraHistoria from '../components/NuestraHistoria';
import SobreNosotros from '../components/SobreNosotros';
import Servicios from '../components/Servicios';
import Contacto from '../components/Contacto';
import ModalExito from '../components/modalExito';
import Ubicacion from '../components/Ubicacion';



export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <SobreNosotros />
      <NuestraHistoria />
      <Servicios />
      <Contacto />
      <ModalExito />
      <Ubicacion />
      <Footer />
      
    </>
  );
}