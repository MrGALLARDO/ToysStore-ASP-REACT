import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { characterToyDTO } from "./characters.model";

export default function TypeAheadCharacter(props: typeAheadCharacterProps) {
  const characters: characterToyDTO[] = [
    {
      id: 1,
      name: "Felipe",
      details: "",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_UX214_CR0,0,214,317_AL_.jpg",
    },
    {
      id: 2,
      name: "Fernando",
      details: "",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg",
    },
    {
      id: 3,
      name: "Roberto",
      details: "",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg",
    },
  ];

  const selection: characterToyDTO[] = [];

  const [elementDragged, setElementDragged] = 
  useState<characterToyDTO | undefined>(undefined)

  function manageDragStart(actor: characterToyDTO) 
  {
      setElementDragged(actor);
  }

  function manageDragOver(actor: characterToyDTO)
  {
      if (!elementDragged){
          return;
      }

      if (actor.id !== elementDragged.id){
          const elementDraggedIndex = 
              props.characters.findIndex(x => x.id === elementDragged.id);
          const characterIndex = 
              props.characters.findIndex(x => x.id === actor.id);

          const characters = [...props.characters];
          characters[characterIndex] = elementDragged;
          characters[elementDraggedIndex] = actor;
          props.onAdd(characters);

      }
  }

  return (
    <>
      <label>Personajes</label>
      <Typeahead
        id="typeahead"
        onChange={(characters) => {
          if (
            props.characters.findIndex((x) => x.id === characters[0].id) === -1
          ) {
            props.onAdd([...props.characters, characters[0]]);
          }
        }}
        options={characters}
        labelKey={(characters) => characters.name}
        filterBy={["name"]}
        placeholder={"Escriba el nombre del Personaje"}
        minLength={1}
        flip={true}
        selected={selection}
        renderMenuItemChildren={(character) => (
          <>
            <img
              alt="imagen actor"
              src={character.image}
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{character.name}</span>
          </>
        )}
      />
      <ul className="list-group">
        {props.characters.map((character) => (
          <li
          draggable = {true}
          onDragStart={() => manageDragStart(character)}
          onDragOver={() => manageDragOver(character)}
          className="list-group-item list-group-item-action"
            key={character.id}
          >
            {props.listUI(character)}
            <span
              className="badge rounded-pill text-bg-danger pointer"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(character)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface typeAheadCharacterProps {
  characters: characterToyDTO[];
  onAdd(characters: characterToyDTO[]): void;
  listUI(character: characterToyDTO): ReactElement;
  onRemove(character: characterToyDTO): void;
}
