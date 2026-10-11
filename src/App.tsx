import { Container } from "react-bootstrap";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import HeroPrincipal from "./components/HeroPrincipal/HeroPrincipal";

function App() {
  return (
    <>
      <BarraNavegacion />
      <main>
        <HeroPrincipal />

        <section id="funciones" className="py-5">
          <Container>
            <h2>Funciones</h2>
            <p>
              Próximamente conocerás nuestras funciones.
            </p>
          </Container>
        </section>
      </main>
    </>
  );
}

export default App;