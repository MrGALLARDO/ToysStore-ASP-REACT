import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { brandToyDTO } from "./brands.model";

export default function TypeAheadbrand(props: typeAheadbrandProps) {
  const brands: brandToyDTO[] = [
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

  const selection: brandToyDTO[] = [];

  const [elementDragged, setElementDragged] = 
  useState<brandToyDTO | undefined>(undefined)

  function manageDragStart(actor: brandToyDTO) 
  {
      setElementDragged(actor);
  }

  function manageDragOver(actor: brandToyDTO)
  {
      if (!elementDragged){
          return;
      }

      if (actor.id !== elementDragged.id){
          const elementDraggedIndex = 
              props.brands.findIndex(x => x.id === elementDragged.id);
          const brandIndex = 
              props.brands.findIndex(x => x.id === actor.id);

          const brands = [...props.brands];
          brands[brandIndex] = elementDragged;
          brands[elementDraggedIndex] = actor;
          props.onAdd(brands);

      }
  }

  return (
    <>
      <label>Personajes</label>
      <Typeahead
        id="typeahead"
        onChange={(brands) => {
          if (
            props.brands.findIndex((x) => x.id === brands[0].id) === -1
          ) {
            props.onAdd([...props.brands, brands[0]]);
          }
        }}
        options={brands}
        labelKey={(brands) => brands.name}
        filterBy={["name"]}
        placeholder={"Escriba el nombre del Personaje"}
        minLength={1}
        flip={true}
        selected={selection}
        renderMenuItemChildren={(brand) => (
          <>
            <img
              alt="imagen actor"
              src={brand.image}
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{brand.name}</span>
          </>
        )}
      />
      <ul className="list-group">
        {props.brands.map((brand) => (
          <li
          draggable = {true}
          onDragStart={() => manageDragStart(brand)}
          onDragOver={() => manageDragOver(brand)}
          className="list-group-item list-group-item-action"
            key={brand.id}
          >
            {props.listUI(brand)}
            <span
              className="badge rounded-pill text-bg-danger pointer"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(brand)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface typeAheadbrandProps {
  brands: brandToyDTO[];
  onAdd(brands: brandToyDTO[]): void;
  listUI(brand: brandToyDTO): ReactElement;
  onRemove(brand: brandToyDTO): void;
}
