import { Navigate, Route, Routes } from "react-router-dom";

import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import PaginaInicio from "./pages/PaginaInicio";
import PaginaTareas from "./pages/PaginaTareas";

function App() {
  return (
    <>
      <BarraNavegacion />

      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/tareas" element={<PaginaTareas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;