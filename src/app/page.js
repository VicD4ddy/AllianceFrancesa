import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CursosHorarios from '@/components/CursosHorarios';
import CulturaEventos from '@/components/CulturaEventos';
import Pasaporte from '@/components/Pasaporte';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CursosHorarios />
        <CulturaEventos />
        <Pasaporte />
      </main>
      <Footer />
    </>
  );
}
