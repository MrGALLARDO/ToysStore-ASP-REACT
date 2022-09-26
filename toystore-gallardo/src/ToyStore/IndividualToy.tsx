import { toyDTO } from "./toys.models";
import css from "./IndividualToy.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Buttons";

export default function IndividualToy(props: individualToyProps) {
  // Construcción del Link.
  const buildLink = () => `/toy/${props.toy.id}`;

  return (
    <div className={css.div}>
      <a href={buildLink()}>
        <img src={props.toy.image} alt="Imagen" />
      </a>
      <p>
        <a href={buildLink()}>{props.toy.name}</a>
      </p>

      <div>
        <Link 
          style={{marginRight: '1rem'}}
          className="btn btn-info"
          to={`/toy/edit/${props.toy.id}`}
        >
          Editar
        </Link>
        <Button>Borrar</Button>
      </div>
    </div>
  );
}

interface individualToyProps {
  toy: toyDTO;
}
