import { useEffect } from "react";

import HeroPrincipal from "../components/HeroPrincipal/HeroPrincipal";
import SeccionFunciones from "../components/SeccionFunciones/SeccionFunciones";

function PaginaInicio() {
  useEffect(() => {
    document.title = "Gestor de Tareas | Inicio";

    if (window.location.hash === "#funciones") {
      document.getElementById("funciones")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <main>
      <HeroPrincipal />
      <SeccionFunciones />
    </main>
  );
}

export default PaginaInicio;