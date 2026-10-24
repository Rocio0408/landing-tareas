import { useEffect } from "react";
import { Alert, Container } from "react-bootstrap";

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
            Organizá tus actividades, prioridades y fechas de vencimiento
            desde un solo lugar.
          </p>
        </div>

        <Alert variant="info">
          Estamos preparando el gestor de tareas.
          Próximamente vas a poder consultar y administrar tus tareas
          desde esta página.
        </Alert>
      </Container>
    </main>
  );
}

export default PaginaTareas;