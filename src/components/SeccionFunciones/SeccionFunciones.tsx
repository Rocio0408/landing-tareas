import { Col, Container, Row } from "react-bootstrap";
import FuncionCard from "../FuncionCard/FuncionCard";
import TituloSeccion from "../TituloSeccion/TituloSeccion";

const funciones = [
  {
    id: 1,
    categoria: "Tareas",
    titulo: "Gestión de tareas",
    descripcion:
      "Creá, consultá y organizá tus tareas de forma sencilla.",
  },
  {
    id: 2,
    categoria: "Organización",
    titulo: "Prioridades",
    descripcion:
      "Clasificá tus tareas según su nivel de prioridad: alta, media o baja.",
  },
  {
    id: 3,
    categoria: "Planificación",
    titulo: "Fechas de vencimiento",
    descripcion:
      "Organizá tus actividades estableciendo fechas límite para cada tarea.",
  },
];

const SeccionFunciones = () => {
  return (
    <section id="funciones" className="py-5 bg-light">
      <Container>
        <TituloSeccion
          titulo="Organizá tus tareas de manera sencilla"
          subtitulo="Conocé algunas de las funcionalidades que ofrecerá nuestra aplicación."
        />

        <Row className="g-4">
          {funciones.map((funcion) => (
            <Col md={4} key={funcion.id}>
              <FuncionCard
                categoria={funcion.categoria}
                titulo={funcion.titulo}
                descripcion={funcion.descripcion}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SeccionFunciones;