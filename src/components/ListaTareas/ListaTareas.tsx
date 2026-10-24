
import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

import {
  completarTarea,
  eliminarTarea,
  obtenerMensajeError,
  obtenerTareas,
  obtenerTareasPorPrioridad,
  obtenerTareasProximasAVencer,
} from "../../services/tareaService";

import type { Prioridad, Tarea } from "../../types/Tarea";

import "./ListaTareas.css";

import ModalTarea from "../ModalTarea/ModalTarea";

type FiltroAplicado =
  | { tipo: "todas" }
  | { tipo: "prioridad"; prioridad: Prioridad }
  | { tipo: "proximas"; dias: number };

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
    const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
    const [tareaParaEliminar, setTareaParaEliminar] =
        useState<Tarea | null>(null);
    const [idAccionEnCurso, setIdAccionEnCurso] =   useState<string | null>(null);
    const [errorAccion, setErrorAccion] = useState(""); const [errorEliminacion, setErrorEliminacion] = useState("");
    const [prioridadSeleccionada, setPrioridadSeleccionada] = useState<Prioridad | "">("");

    const [diasSeleccionados, setDiasSeleccionados] = useState("7");

    const [filtroActivo, setFiltroActivo] = useState<FiltroAplicado>({ tipo: "todas" });


    const consultarTareas = async (filtro: FiltroAplicado) => {
        setCargando(true);
        setError("");
        setFiltroActivo(filtro);

        try {
            let tareasObtenidas: Tarea[];

            if (filtro.tipo === "prioridad") {
                tareasObtenidas = await obtenerTareasPorPrioridad(
                    filtro.prioridad,
                );
            } else if (filtro.tipo === "proximas") {
                tareasObtenidas = await obtenerTareasProximasAVencer(
                    filtro.dias,
                );
            } else {
                tareasObtenidas = await obtenerTareas();
            }

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
    };

    const cargarTareas = () => consultarTareas(filtroActivo);


    const aplicarFiltroPrioridad = () => {
        if (!prioridadSeleccionada) return;

        void consultarTareas({
            tipo: "prioridad",
            prioridad: prioridadSeleccionada,
        });
    };

    const consultarProximasAVencer = () => {
        const dias = Number(diasSeleccionados);

        if (!Number.isInteger(dias) || dias <= 0) return;

        void consultarTareas({
            tipo: "proximas",
            dias,
        });
    };

    const mostrarTodasLasTareas = () => {
        setPrioridadSeleccionada("");
        void consultarTareas({ tipo: "todas" });
    };



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

    setPrioridadSeleccionada("");
    cerrarModalTarea();
    void consultarTareas({ tipo: "todas" });

};
const solicitarEliminacion = (tarea: Tarea) => {
  setErrorEliminacion("");
  setTareaParaEliminar(tarea);
};

const cancelarEliminacion = () => {
  if (idAccionEnCurso !== null) return;

  setTareaParaEliminar(null);
  setErrorEliminacion("");
};

const confirmarEliminacion = async () => {
  if (!tareaParaEliminar) return;

  const id = tareaParaEliminar._id;

  setIdAccionEnCurso(id);
  setErrorEliminacion("");

  try {
    await eliminarTarea(id);

    setTareas((actuales) =>
      actuales.filter((tarea) => tarea._id !== id),
    );

    setTareaParaEliminar(null);
  } catch (error: unknown) {
    setErrorEliminacion(
      obtenerMensajeError(
        error,
        "No se pudo eliminar la tarea. Intentá nuevamente.",
      ),
    );
  } finally {
    setIdAccionEnCurso(null);
  }
    };

    const marcarComoCompletada = async (tarea: Tarea) => {
        setIdAccionEnCurso(tarea._id);
        setErrorAccion("");

        try {
            const respuesta = await completarTarea(tarea._id);

            setTareas((actuales) =>
                actuales.map((actual) =>
                    actual._id === respuesta.tarea._id
                        ? respuesta.tarea
                        : actual,
            ),
        );
    } catch (error: unknown) {
        setErrorAccion(
            obtenerMensajeError(
            error,
            "No se pudo completar la tarea. Intentá nuevamente.",
        ),
        );
    } finally {
        setIdAccionEnCurso(null);
    }
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

        {errorAccion && (
            <Alert
                variant="danger"
                dismissible
                onClose={() => setErrorAccion("")}
            >
                {errorAccion}
            </Alert>
        )}


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


    <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
            <Row className="g-3 align-items-end">
                <Col xs={12} md={4}>
                    <Form.Group controlId="filtro-prioridad">
                        <Form.Label>Filtrar por prioridad</Form.Label>

                        <Form.Select
                            value={prioridadSeleccionada}
                            onChange={(evento) =>
                                setPrioridadSeleccionada(
                                    evento.target.value as Prioridad | "",
                                )
                            }
                            disabled={cargando}
                        >
                            <option value="">Seleccioná una prioridad</option>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

            <Col xs={12} md={2}>
                <Button
                className="w-100"
                onClick={aplicarFiltroPrioridad}
                disabled={cargando || !prioridadSeleccionada}
            >
                Filtrar
                </Button>
            </Col>

            <Col xs={12} md={2}>
                <Form.Group controlId="dias-proximos">
                <Form.Label>Próximos días</Form.Label>

                <Form.Control
                    type="number"
                    min={1}
                    step={1}
                    value={diasSeleccionados}
                    onChange={(evento) =>
                    setDiasSeleccionados(evento.target.value)
                    }
                    disabled={cargando}
                />
                </Form.Group>
            </Col>

            <Col xs={12} md={4}>
                <div className="d-flex gap-2">
                    <Button
                        variant="outline-primary"
                        className="flex-fill"
                        onClick={consultarProximasAVencer}
                        disabled={
                            cargando ||
                            !Number.isInteger(Number(diasSeleccionados)) ||
                            Number(diasSeleccionados) <= 0
                            }
                        >
                        Próximas a vencer
                    </Button>

                    <Button
                        variant="outline-secondary"
                        onClick={mostrarTodasLasTareas}
                        disabled={cargando}
                    >
                        Ver todas
                    </Button>
                    </div>
                </Col>
            </Row>
        </Card.Body>
        </Card>


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
                    {filtroActivo.tipo === "todas"
                        ? "Todavía no hay tareas"
                        : "No encontramos tareas para este filtro"}
                </Alert.Heading>

                {filtroActivo.tipo === "todas"
                    ? "Cuando creemos la primera tarea, aparecerá en esta sección."
                    : "Probá con otra prioridad, un rango de días distinto o seleccioná Ver todas."}
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
                      )}                    </div>

                    <div className="d-flex gap-2 flex-wrap mt-3">
                        {!tarea.completada && (
                            <Button
                            variant="success"
                            size="sm"
                            onClick={() => void marcarComoCompletada(tarea)}
                            disabled={idAccionEnCurso !== null}
                            >
                            {idAccionEnCurso === tarea._id
                                ? "Procesando..."
                                : "Completar"}
                            </Button>
                        )}

                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => abrirEdicion(tarea)}
                            disabled={idAccionEnCurso !== null}
                        >
                            Editar
                        </Button>

                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => solicitarEliminacion(tarea)}
                            disabled={idAccionEnCurso !== null}
                        >
                            Eliminar
                        </Button>
                    </div>
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
      <Modal
        show={tareaParaEliminar !== null}
        onHide={cancelarEliminacion}
        centered
        backdrop={idAccionEnCurso !== null ? "static" : true}
        keyboard={idAccionEnCurso === null}
    >
        <Modal.Header closeButton={idAccionEnCurso === null}>
            <Modal.Title>Eliminar tarea</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {errorEliminacion && (
                <Alert variant="danger">
                    {errorEliminacion}
                </Alert>
            )}

            ¿Seguro que querés eliminar la tarea{" "}
            <strong>{tareaParaEliminar?.titulo}</strong>?

            <p className="text-secondary small mt-2 mb-0">
                Esta acción no se puede deshacer.
            </p>
        </Modal.Body>

        <Modal.Footer>
            <Button
                variant="secondary"
                onClick={cancelarEliminacion}
                disabled={idAccionEnCurso !== null}
            >
                Cancelar
            </Button>

            <Button
                variant="danger"
                onClick={() => void confirmarEliminacion()}
                disabled={idAccionEnCurso !== null}
            >
                {idAccionEnCurso === tareaParaEliminar?._id
                    ? "Eliminando..."
                    : "Sí, eliminar"}
            </Button>
        </Modal.Footer>
    </Modal>
    </section>
  );
}


export default ListaTareas;
