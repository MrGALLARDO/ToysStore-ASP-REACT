import { toy } from "./toys.models";
import IndividualToy from "./IndividualToy";
import css from './ListToys.module.css'
import GenericList from "../utils/GenericList";

export default function ListToys(props: listToysProps) {
  return (
    <GenericList list={props.toys}>
      <div className={css.div}>
        {props.toys?.map((toy) => (
          <IndividualToy  key={toy.id} toy={toy} />
        ))}
      </div>
    </GenericList>
  );
}

interface listToysProps {
  toys?: toy[];
}
