import { Card } from "react-bootstrap";
import "./FuncionCard.css";

interface FuncionCardProps {
  titulo: string;
  descripcion: string;
  categoria: string;
}

const FuncionCard = ({
  titulo,
  descripcion,
  categoria,
}: FuncionCardProps) => {
  return (
    <Card className="funcion-card h-100">
      <Card.Body>
        <Card.Subtitle className="funcion-card__categoria">
          {categoria}
        </Card.Subtitle>

        <Card.Title className="funcion-card__titulo">
          {titulo}
        </Card.Title>

        <Card.Text className="funcion-card__descripcion">
          {descripcion}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FuncionCard;