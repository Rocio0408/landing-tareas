import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalInformativo = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => setMostrarModal(true)}
      >
        Conocer más
      </Button>

      <Modal show={mostrarModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sobre nuestra aplicación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            TaskFlow te permite crear, consultar, editar y eliminar
            tareas desde una misma interfaz.
          </p>

          <p className="mb-0">
            También podés asignar prioridades, definir fechas límite,
            marcar tareas como completadas y filtrar tus pendientes.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInformativo;