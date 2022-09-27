import { toyDTO } from "./toys.models";
import css from "./IndividualToy.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Buttons";
import Confirm from "../utils/Confirm";
import axios from "axios";
import { urlToys } from "../utils/endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";

export default function IndividualToy(props: individualToyProps) {
  // Construcción del Link.
  const buildLink = () => `/toy/${props.toy.id}`;
  const alerts = useContext(AlertContext);

  function DeleteToy(){
    axios.delete(`${urlToys}/${props.toy.id}`)
    .then(() => {
      alerts();
    })
  }

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
        <Button 
        onClick={()=>Confirm(() => DeleteToy())}
        className="btn btn-danger">
          Borrar
        </Button>
      </div>
    </div>
  );
}

interface individualToyProps {
  toy: toyDTO;
}
