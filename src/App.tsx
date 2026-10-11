import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import HeroPrincipal from "./components/HeroPrincipal/HeroPrincipal";
import SeccionFunciones from "./components/SeccionFunciones/SeccionFunciones";

function App() {
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