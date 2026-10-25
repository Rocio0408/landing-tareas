import { Button, Col, Container, Row } from "react-bootstrap";
import ModalInformativo from "../ModalInformativo/ModalInformativo";
import { Link } from "react-router-dom";
import "./HeroPrincipal.css";

const HeroPrincipal = () => {
  return (
    <section id="inicio" className="hero-principal">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={7}>
            <h1 className="display-4 fw-bold hero-principal__titulo">
              Organizá tus tareas en un solo lugar.
            </h1>

            <h1 className="display-4 fw-bold">
              Organizá tus tareas en un solo lugar.
            </h1>

            <p className="lead hero-principal__descripcion">
              Una forma simple de organizar tus actividades,
              establecer prioridades y mantener tus tareas
              bajo control.
            </p>
              <div className="d-flex gap-2 flex-wrap">
                <Link
                  to="/tareas"
                  className="btn btn-primary btn-lg"
                >
                  Administrar tareas
                </Link>

                <Button
                  variant="outline-primary"
                  href="#funciones"
                  size="lg"
                >
                  Explorar funciones
                </Button>
                <ModalInformativo />
              </div>
          </Col>

          <Col md={5}>
            <div className="hero-principal__panel">
              <h2 className="h4 hero-principal__panel-titulo">
                Organización simple y eficiente
              </h2>

              <p className="hero-principal__panel-texto mb-0">
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