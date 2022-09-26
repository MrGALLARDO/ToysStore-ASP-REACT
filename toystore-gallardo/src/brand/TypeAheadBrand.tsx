import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { urlBrands } from "../endpoints";
import { brandToyDTO } from "./brands.model";

export default function TypeAheadbrand(props: typeAheadbrandProps) {
  const [options, setOptions] = useState<brandToyDTO[]>([]);

  const selection: brandToyDTO[] = [];

  const [elementDragged, setElementDragged] = useState<brandToyDTO | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  function manageFind(query: string) {
    setIsLoading(true);
    axios
      .get(`${urlBrands}/findByName/${query}`)
      .then((answer: AxiosResponse<brandToyDTO[]>) => {
        setOptions(answer.data);
        setIsLoading(false);
      });
  }

  function manageDragStart(brand: brandToyDTO) {
    setElementDragged(brand);
  }

  function manageDragOver(brand: brandToyDTO) {
    if (!elementDragged) {
      return;
    }

    if (brand.id !== elementDragged.id) {
      const elementDraggedIndex = props.brands.findIndex(
        (x) => x.id === elementDragged.id
      );
      const brandIndex = props.brands.findIndex((x) => x.id === brand.id);

      const brands = [...props.brands];
      brands[brandIndex] = elementDragged;
      brands[elementDraggedIndex] = brand;
      props.onAdd(brands);
    }
  }

  return (
    <>
      <label>Marcas</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={brands => {
          if (props.brands.findIndex((x) => x.id === brands[0].id) === -1) {
            props.onAdd([...props.brands, brands[0]]);
          }
        }}
        options={options}
        labelKey={(brands) => brands.name}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={manageFind}
        placeholder={"Escriba el nombre de la Marca"}
        minLength={1}
        flip={true}
        selected={selection}
        renderMenuItemChildren={brand => (
          <>
            <img
              alt="imagen brand"
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
        {props.brands.map(brand => (
          <li
            draggable={true}
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
