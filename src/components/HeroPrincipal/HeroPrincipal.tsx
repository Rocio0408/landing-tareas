import { Button, Col, Container, Row } from "react-bootstrap";

const HeroPrincipal = () => {
  return (
    <section id="inicio" className="py-5">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={7}>
            <p className="text-uppercase fw-semibold mb-2">
              Gestor de Tareas
            </p>

            <h1 className="display-4 fw-bold">
              Organizá tus tareas en un solo lugar.
            </h1>

            <p className="lead">
              Una forma simple de organizar tus actividades,
              establecer prioridades y mantener tus tareas
              bajo control.
            </p>

            <Button href="#funciones">
              Explorar funciones
            </Button>
          </Col>

          <Col md={5}>
            <div className="border rounded-4 p-4 shadow-sm">
              <h2 className="h4">
                Organización simple y eficiente
              </h2>

              <p className="mb-0">
                Administrá tus tareas, organizá tus pendientes
                y mantené una visión clara de tus actividades
                diarias.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroPrincipal;