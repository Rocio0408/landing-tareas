export type Prioridad = "alta" | "media" | "baja";

export type Tarea = {
  _id: string;
  titulo: string;
  descripcion?: string;
  fechaLimite?: string | null;
  completada: boolean;
  prioridad: Prioridad;
  etiquetas: string[];
  __v?: number;
};

export type TareaFormulario = {
  titulo: string;
  descripcion?: string;
  fechaLimite?: string;
  prioridad: Prioridad;
  etiquetas: string[];
};

export type RespuestaAccionTarea = {
  mensaje: string;
  tarea: Tarea;
};

export type ErrorApi = {
  mensaje?: string;
  error?: string;
};