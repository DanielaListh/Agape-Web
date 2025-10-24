import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NuestraHistoria from '../components/NuestraHistoria';
import SobreNosotros from '../components/SobreNosotros';


export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <SobreNosotros />
      <NuestraHistoria />
      <Footer />
      
    </>
  );
}