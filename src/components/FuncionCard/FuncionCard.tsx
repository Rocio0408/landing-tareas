import { Card } from "react-bootstrap";

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
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {categoria}
        </Card.Subtitle>

        <Card.Title>{titulo}</Card.Title>

        <Card.Text>{descripcion}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FuncionCard;