import { Header } from './components/Header';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Path } from './sections/Path';
import { Research } from './sections/Research';
import { Work } from './sections/work/Work';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Path />
        <Work />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
