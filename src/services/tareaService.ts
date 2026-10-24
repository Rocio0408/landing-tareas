import axios from "axios";

import type {
  ErrorApi,
  Prioridad,
  RespuestaAccionTarea,
  Tarea,
  TareaFormulario,
} from "../types/Tarea";

const API_URL = "http://localhost:3000/tareas";

// Obtener todas las tareas.
export const obtenerTareas = async (): Promise<Tarea[]> => {
  const respuesta = await axios.get<Tarea[]>(API_URL);

  return respuesta.data;
};

// Obtener una tarea por su ID.
export const obtenerTareaPorId = async (
  id: string,
): Promise<Tarea> => {
  const respuesta = await axios.get<Tarea>(`${API_URL}/${id}`);

  return respuesta.data;
};

// Crear una tarea.
export const crearTarea = async (
  datos: TareaFormulario,
): Promise<Tarea> => {
  const respuesta = await axios.post<Tarea>(API_URL, datos);

  return respuesta.data;
};

// Actualizar una tarea.
export const actualizarTarea = async (
  id: string,
  datos: TareaFormulario,
): Promise<Tarea> => {
  const respuesta = await axios.put<Tarea>(
    `${API_URL}/${id}`,
    datos,
  );

  return respuesta.data;
};

// Eliminar una tarea.
export const eliminarTarea = async (
  id: string,
): Promise<RespuestaAccionTarea> => {
  const respuesta = await axios.delete<RespuestaAccionTarea>(
    `${API_URL}/${id}`,
  );

  return respuesta.data;
};

// Marcar una tarea como completada.
export const completarTarea = async (
  id: string,
): Promise<RespuestaAccionTarea> => {
  const respuesta = await axios.put<RespuestaAccionTarea>(
    `${API_URL}/${id}/completar`,
  );

  return respuesta.data;
};

// Filtrar tareas por prioridad.
export const obtenerTareasPorPrioridad = async (
  prioridad: Prioridad,
): Promise<Tarea[]> => {
  const respuesta = await axios.get<Tarea[]>(
    `${API_URL}/prioridad/${prioridad}`,
  );

  return respuesta.data;
};

// Consultar tareas próximas a vencer.
export const obtenerTareasProximasAVencer = async (
  dias: number,
): Promise<Tarea[]> => {
  const respuesta = await axios.get<Tarea[]>(
    `${API_URL}/proximas-vencer/${dias}`,
  );

  return respuesta.data;
};

// Obtener un mensaje útil cuando una petición falla.
export const obtenerMensajeError = (
  error: unknown,
  mensajePredeterminado: string,
): string => {
  if (axios.isAxiosError<ErrorApi>(error)) {
    const mensajeApi =
      error.response?.data?.mensaje ??
      error.response?.data?.error;

    if (mensajeApi) {
      return mensajeApi;
    }

    if (error.request) {
      return "No se pudo conectar con la API. Verificá que el servidor esté funcionando.";
    }

    return error.message || mensajePredeterminado;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return mensajePredeterminado;
};