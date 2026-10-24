
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";

import {
  actualizarTarea,
  crearTarea,
  obtenerMensajeError,
} from "../../services/tareaService";

import type {
  Prioridad,
  Tarea,
  TareaFormulario,
} from "../../types/Tarea";

type ValoresFormulario = {
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  prioridad: Prioridad;
  etiquetas: string;
};

interface ModalTareaProps {
  mostrar: boolean;
  tarea: Tarea | null;
  onCerrar: () => void;
  onGuardado: (
    tarea: Tarea,
    modo: "crear" | "editar",
  ) => void;
}

const esquemaValidacion = Yup.object({
  titulo: Yup.string()
    .trim()
    .required("El título es obligatorio.")
    .max(120, "El título no puede superar los 120 caracteres."),
  descripcion: Yup.string().max(
    500,
    "La descripción no puede superar los 500 caracteres.",
  ),
  fechaLimite: Yup.string().test(
    "fecha-valida",
    "La fecha ingresada no es válida.",
    (valor) =>
      !valor ||
      (!Number.isNaN(Date.parse(valor)) &&
        /^\d{4}-\d{2}-\d{2}$/.test(valor)),
  ),
  prioridad: Yup.mixed<Prioridad>()
    .oneOf(["alta", "media", "baja"])
    .required("Seleccioná una prioridad."),
  etiquetas: Yup.string().max(
    200,
    "Las etiquetas no pueden superar los 200 caracteres.",
  ),
});

function ModalTarea({
  mostrar,
  tarea,
  onCerrar,
  onGuardado,
}: ModalTareaProps) {
  const formik = useFormik<ValoresFormulario>({
    initialValues: {
      titulo: tarea?.titulo ?? "",
      descripcion: tarea?.descripcion ?? "",
      fechaLimite: tarea?.fechaLimite?.slice(0, 10) ?? "",
      prioridad: tarea?.prioridad ?? "media",
      etiquetas: tarea?.etiquetas?.join(", ") ?? "",
    },
    enableReinitialize: true,
    validationSchema: esquemaValidacion,

    onSubmit: async (valores, helpers) => {
      helpers.setStatus(undefined);

      const datos: TareaFormulario = {
        titulo: valores.titulo.trim(),
        descripcion: valores.descripcion.trim() || undefined,
        fechaLimite: valores.fechaLimite || null,
        prioridad: valores.prioridad,
        etiquetas: valores.etiquetas
          .split(",")
          .map((etiqueta) => etiqueta.trim())
          .filter(Boolean),
      };

      try {
        if (tarea) {
          const tareaActualizada = await actualizarTarea(
            tarea._id,
            datos,
          );

          onGuardado(tareaActualizada, "editar");
        } else {
          const tareaCreada = await crearTarea(datos);

          onGuardado(tareaCreada, "crear");
        }

        helpers.resetForm();
      } catch (error: unknown) {
        helpers.setStatus(
          obtenerMensajeError(
            error,
            "No se pudo guardar la tarea. Intentá nuevamente.",
          ),
        );
      }
    },
  });

  const cerrarModal = () => {
    if (formik.isSubmitting) return;

    formik.resetForm();
    formik.setStatus(undefined);
    onCerrar();
  };

  return (
    <Modal
      show={mostrar}
      onHide={cerrarModal}
      centered
      backdrop={formik.isSubmitting ? "static" : true}
      keyboard={!formik.isSubmitting}
    >
      <Modal.Header closeButton={!formik.isSubmitting}>
        <Modal.Title>
          {tarea ? "Editar tarea" : "Nueva tarea"}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {formik.status && (
            <Alert variant="danger">
              {formik.status}
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Título *</Form.Label>
            <Form.Control
              name="titulo"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(
                formik.touched.titulo && formik.errors.titulo,
              )}
              placeholder="Ej.: Preparar entrega del proyecto"
              maxLength={120}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.titulo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(
                formik.touched.descripcion &&
                  formik.errors.descripcion,
              )}
              placeholder="Agregá detalles de la tarea..."
              maxLength={500}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fechaLimite">
            <Form.Label>Fecha límite</Form.Label>
            <Form.Control
              type="date"
              name="fechaLimite"
              value={formik.values.fechaLimite}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(
                formik.touched.fechaLimite &&
                  formik.errors.fechaLimite,
              )}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.fechaLimite}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="prioridad">
            <Form.Label>Prioridad *</Form.Label>
            <Form.Select
              name="prioridad"
              value={formik.values.prioridad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="etiquetas">
            <Form.Label>Etiquetas</Form.Label>
            <Form.Control
              name="etiquetas"
              value={formik.values.etiquetas}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(
                formik.touched.etiquetas &&
                  formik.errors.etiquetas,
              )}
              placeholder="Ej.: estudio, universidad, urgente"
              maxLength={200}
            />
            <Form.Text muted>
              Separá las etiquetas con comas.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.etiquetas}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cerrarModal}
            disabled={formik.isSubmitting}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Spinner
                  size="sm"
                  animation="border"
                  className="me-2"
                />
                Guardando...
              </>
            ) : tarea ? (
              "Guardar cambios"
            ) : (
              "Crear tarea"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalTarea;
