
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";

import {
  obtenerMensajeError,
  obtenerTareas,
} from "../../services/tareaService";

import type { Tarea } from "../../types/Tarea";

import "./ListaTareas.css";

import ModalTarea from "../ModalTarea/ModalTarea";

const formatearFecha = (fecha?: string | null): string => {
  if (!fecha) {
    return "Sin fecha límite";
  }

  const fechaConvertida = new Date(fecha);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return "Fecha no válida";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(fechaConvertida);
};

function ListaTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] =
    useState<Tarea | null>(null);

  
    const cargarTareas = useCallback(async () => {
        setCargando(true);
        setError("");

        try {
            const tareasObtenidas = await obtenerTareas();
            setTareas(tareasObtenidas);
        } catch (error: unknown) {
            setError(
            obtenerMensajeError(
                error,
                "No se pudieron cargar las tareas.",
            ),
        );
    } finally {
        setCargando(false);
    }
}, []);

    const abrirNuevaTarea = () => {
        setTareaSeleccionada(null);
        setMostrarModal(true);
    };

    const abrirEdicion = (tarea: Tarea) => {
        setTareaSeleccionada(tarea);
        setMostrarModal(true);
    };

    const cerrarModalTarea = () => {
        setMostrarModal(false);
        setTareaSeleccionada(null);
    };

    const manejarTareaGuardada = (
        tareaGuardada: Tarea,
        modo: "crear" | "editar",
    ) => {
    setTareas((actuales) =>
        modo === "crear"
        ? [tareaGuardada, ...actuales]
        : actuales.map((tarea) =>
            tarea._id === tareaGuardada._id
                ? tareaGuardada
                : tarea,
            ),
    );

    cerrarModalTarea();
};

  
useEffect(() => {
    let sigueMontado = true;

    obtenerTareas()
        .then((tareasObtenidas) => {
        if (sigueMontado) {
            setTareas(tareasObtenidas);
        }
        })
        .catch((error: unknown) => {
        if (sigueMontado) {
            setError(
            obtenerMensajeError(
                error,
                "No se pudieron cargar las tareas.",
            ),
            );
        }
        })
        .finally(() => {
        if (sigueMontado) {
            setCargando(false);
        }
        });

    return () => {
        sigueMontado = false;
    };
    }, []);


  return (
    <section className="lista-tareas">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Tus tareas</h2>
          <p className="text-secondary mb-0">
            Consultá tus actividades y su estado actual.
          </p>
        </div>

        
        <div className="d-flex gap-2 flex-wrap">
            <Button
                variant="primary"
                onClick={abrirNuevaTarea}
            >
                Nueva tarea
            </Button>

            <Button
                variant="outline-primary"
                onClick={() => void cargarTareas()}
                disabled={cargando}
            >
                {cargando ? "Cargando..." : "Actualizar listado"}
            </Button>
        </div>

      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <Alert.Heading className="h6">
            No pudimos cargar las tareas
          </Alert.Heading>

          <p className="mb-2">{error}</p>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => void cargarTareas()}
          >
            Reintentar
          </Button>
        </Alert>
      )}

      {cargando && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-secondary mt-3 mb-0">
            Cargando tus tareas...
          </p>
        </div>
      )}

      {!cargando && !error && tareas.length === 0 && (
        <Alert variant="info">
          <Alert.Heading className="h6">
            Todavía no hay tareas
          </Alert.Heading>
          Cuando creemos la primera tarea, aparecerá en esta sección.
        </Alert>
      )}

      {!cargando && tareas.length > 0 && (
        <>
          <p className="text-secondary small mb-3">
            {tareas.length}{" "}
            {tareas.length === 1
              ? "tarea encontrada"
              : "tareas encontradas"}
          </p>

          <Row className="g-4">
            {tareas.map((tarea) => (
              <Col key={tarea._id} md={6} xl={4}>
                <Card
                  className={`tarea-card h-100 shadow-sm ${
                    tarea.completada ? "tarea-card--completada" : ""
                  }`}
                >
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <Badge
                        bg={
                          tarea.prioridad === "alta"
                            ? "danger"
                            : tarea.prioridad === "media"
                              ? "warning"
                              : "success"
                        }
                        text={
                          tarea.prioridad === "media"
                            ? "dark"
                            : undefined
                        }
                      >
                        Prioridad {tarea.prioridad}
                      </Badge>

                      <Badge
                        bg={
                          tarea.completada ? "success" : "secondary"
                        }
                      >
                        {tarea.completada
                          ? "Completada"
                          : "Pendiente"}
                      </Badge>
                    </div>

                    <Card.Title
                      className={`h5 ${
                        tarea.completada
                          ? "tarea-card__titulo--completada"
                          : ""
                      }`}
                    >
                      {tarea.titulo}
                    </Card.Title>

                    <Card.Text className="text-secondary">
                      {tarea.descripcion || "Sin descripción."}
                    </Card.Text>

                    <div className="mt-auto pt-3">
                      <p className="small text-secondary mb-3">
                        <strong>Fecha límite:</strong>{" "}
                        {formatearFecha(tarea.fechaLimite)}
                      </p>

                      {tarea.etiquetas?.length > 0 && (
                        <div className="d-flex flex-wrap gap-2">
                          {tarea.etiquetas.map((etiqueta, indice) => (
                            <Badge
                              key={`${etiqueta}-${indice}`}
                              bg="light"
                              text="dark"
                              className="tarea-etiqueta"
                            >
                              {etiqueta}
                            </Badge>
                          ))}
                        </div>
                      )}
                    
                    </div>

                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-3 align-self-start"
                      onClick={() => abrirEdicion(tarea)}
                    >
                      Editar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      
      )}

      <ModalTarea
        mostrar={mostrarModal}
        tarea={tareaSeleccionada}
        onCerrar={cerrarModalTarea}
        onGuardado={manejarTareaGuardada}
      />
    </section>
  );
}


export default ListaTareas;
