
import { useEffect } from "react";
import { Container } from "react-bootstrap";

import ListaTareas from "../components/ListaTareas/ListaTareas";

function PaginaTareas() {
  useEffect(() => {
    document.title = "Gestor de Tareas | Mis tareas";
  }, []);

  return (
    <main className="py-5">
      <Container>
        <div className="mb-4">
          <p className="text-uppercase fw-semibold text-primary mb-2">
            TaskFlow
          </p>

          <h1 className="display-5 fw-bold">
            Mis tareas
          </h1>

          <p className="lead text-secondary">
            Organizá tus actividades, prioridades y fechas de
            vencimiento desde un solo lugar.
          </p>
        </div>

        <ListaTareas />
      </Container>
    </main>
  );
}

export default PaginaTareas;
