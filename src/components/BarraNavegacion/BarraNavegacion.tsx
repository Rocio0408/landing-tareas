import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarraNavegacion = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Gestor de Tareas
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-principal" />

        <Navbar.Collapse id="navbar-principal">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/#funciones">
              Funciones
            </Nav.Link>

            <Nav.Link as={Link} to="/tareas">
              Mis tareas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;