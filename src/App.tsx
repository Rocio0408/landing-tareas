import { useEffect } from "react";

import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import HeroPrincipal from "./components/HeroPrincipal/HeroPrincipal";
import SeccionFunciones from "./components/SeccionFunciones/SeccionFunciones";

function App() {
  useEffect(() => {
    document.title = "Gestor de Tareas | Inicio";
  }, []);

  return (
    <>
      <BarraNavegacion />
      <main>
        <HeroPrincipal />
        <SeccionFunciones />
      </main>
    </>
  );
}

export default App;