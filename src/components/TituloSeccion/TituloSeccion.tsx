interface TituloSeccionProps {
  titulo: string;
  subtitulo: string;
}

const TituloSeccion = ({
  titulo,
  subtitulo,
}: TituloSeccionProps) => {
  return (
    <div className="text-center mb-4">
      <h2 className="fw-bold">{titulo}</h2>
      <p className="text-muted mb-0">{subtitulo}</p>
    </div>
  );
};

export default TituloSeccion;