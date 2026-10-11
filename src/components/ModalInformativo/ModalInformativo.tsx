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
            Nuestro gestor de tareas busca facilitar
            la organización de actividades y pendientes.
          </p>

          <p className="mb-0">
            Próximamente incorporaremos funcionalidades
            para administrar tareas mediante nuestra API REST.
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