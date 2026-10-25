# TaskFlow — Gestor de tareas

Aplicación web desarrollada con React y TypeScript para organizar y administrar tareas de manera sencilla. El proyecto incluye una landing page informativa y una interfaz de gestión conectada a una API REST propia.

## Características principales

- **Landing page:** presentación de la aplicación y sus funcionalidades.
- **Gestión de tareas (CRUD):** creación, consulta, edición y eliminación de tareas.
- **Estado de las tareas:** posibilidad de marcar las tareas como completadas.
- **Prioridades:** clasificación y filtrado por prioridad alta, media o baja.
- **Fechas límite:** registro de fechas de vencimiento y consulta de tareas próximas a vencer según un período de días.
- **Etiquetas:** organización de las tareas mediante etiquetas.
- **Validación de formularios:** validaciones de campos y mensajes de error.
- **Estados de la interfaz:** indicadores de carga y mensajes ante errores de comunicación con la API.
- **Navegación:** separación entre la página de inicio y la página de gestión de tareas.

## Tecnologías utilizadas

- **React:** construcción de la interfaz mediante componentes.
- **TypeScript:** tipado estático y definición de los tipos de datos.
- **Vite:** servidor de desarrollo y herramienta de construcción.
- **React Router DOM:** navegación entre páginas.
- **Axios:** comunicación HTTP con la API REST.
- **React Bootstrap y Bootstrap:** componentes y estilos de la interfaz.
- **Formik:** gestión de formularios.
- **Yup:** validación de los datos ingresados.
- **ESLint:** análisis estático del código.

## Requisitos previos

Para ejecutar la aplicación localmente necesitás:

- Node.js y npm.
- Git.
- MongoDB en funcionamiento.
- La API REST del proyecto TaskFlow.

Repositorio del backend: [api-rest-tareas](https://github.com/Rocio0408/api-rest-tareas).

## Instalación y ejecución

### 1. Clonar el frontend

```bash
git clone https://github.com/Rocio0408/landing-tareas.git
cd landing-tareas
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el backend

La aplicación necesita que la API REST esté funcionando para consultar y administrar las tareas.

En otra terminal, desde la carpeta donde quieras guardar el backend, ejecutá:

```bash
git clone https://github.com/Rocio0408/api-rest-tareas.git
cd api-rest-tareas
npm install
npm run dev
```

Asegurate de que MongoDB esté iniciado. La API utiliza la base de datos local `dbTareas` y escucha en `http://localhost:3000`.

Podés comprobar su funcionamiento abriendo `http://localhost:3000/` en el navegador. La API debe devolver un mensaje que confirme que está funcionando.

### 4. Iniciar el frontend

Desde la carpeta `landing-tareas`, ejecutá:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente:

`http://localhost:5173`

Abrí esa dirección en el navegador.

**Importante:** el frontend y el backend deben permanecer en ejecución en sus respectivas terminales mientras utilizás la aplicación.

## Configuración de la API

La URL base de la API está definida en `src/services/tareaService.ts`:

```typescript
const API_URL = "http://localhost:3000/tareas";
```

El servicio utiliza Axios para realizar las peticiones HTTP correspondientes a las operaciones de tareas.

Para ejecutar el proyecto en otro entorno, será necesario configurar la URL de la API según la dirección donde esté alojado el backend. La API también debe permitir el origen desde el cual se ejecuta el frontend mediante su configuración de CORS.

## Estructura del proyecto

```text
landing-tareas/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BarraNavegacion/
│   │   ├── FuncionCard/
│   │   ├── HeroPrincipal/
│   │   ├── ListaTareas/
│   │   ├── ModalInformativo/
│   │   ├── ModalTarea/
│   │   ├── SeccionFunciones/
│   │   └── TituloSeccion/
│   ├── pages/
│   │   ├── PaginaInicio.tsx
│   │   └── PaginaTareas.tsx
│   ├── services/
│   │   └── tareaService.ts
│   ├── types/
│   │   └── Tarea.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

### Organización del código

- **`components/`:** componentes reutilizables de la interfaz, formularios, listado y elementos visuales.
- **`pages/`:** páginas principales de la aplicación.
- **`services/`:** funciones responsables de las peticiones HTTP a la API.
- **`types/`:** definición de los tipos de datos utilizados en TypeScript.
- **`App.tsx`:** configuración de las rutas de navegación.
- **`main.tsx`:** punto de entrada de React y configuración inicial de la aplicación.

## Rutas de navegación

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio y presentación de las funcionalidades. |
| `/tareas` | Página para consultar y administrar las tareas. |

## Comandos disponibles

Desde la carpeta del frontend:

| Comando | Función |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Comprueba los tipos de TypeScript y genera la versión de producción. |
| `npm run lint` | Ejecuta ESLint para analizar el código. |
| `npm run preview` | Permite previsualizar localmente la versión generada para producción. |

Para verificar el proyecto antes de publicarlo, ejecutá:

```bash
npm run lint
npm run build
```

## Proyecto relacionado

**Backend:** [Rocio0408/api-rest-tareas](https://github.com/Rocio0408/api-rest-tareas).

TaskFlow está organizado en dos repositorios independientes: el frontend, encargado de la interfaz y la interacción con el usuario, y el backend, responsable de la API REST y la persistencia de los datos en MongoDB.