import { Container } from "react-bootstrap";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";

function App() {
  return (
    <>
      <BarraNavegacion />

      <main id="inicio">
        <Container className="py-5">
          <h1>Gestor de Tareas</h1>
          <p>
            Organizá tus actividades y mantené tus tareas
            bajo control.
          </p>

          <section id="funciones" className="mt-5">
            <h2>Funciones</h2>
            <p>Próximamente conocerás nuestras funciones.</p>
          </section>
        </Container>
      </main>
    </>
  );
}

export default App;