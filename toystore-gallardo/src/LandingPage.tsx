import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { urlToys } from "./endpoints";
import ListToys from "./ToyStore/ListToys";
import { landingPageDTO } from "./ToyStore/toys.models";
import AlertContext from "./utils/AlertContext";

export default function LandingPage() {
  const [toys, setToys] = useState<landingPageDTO>({});

  useEffect(() => {
    LoadData();
  }, []);

  function LoadData() {
    axios.get(urlToys).then((respuesta: AxiosResponse<landingPageDTO>) => {
      setToys(respuesta.data);
    });
  }

  return (
    <>
      <AlertContext.Provider value={() => LoadData()}>
        <h3>En Cartelera</h3>
        <ListToys toys={toys.inStock} />

        <h3>Próximos Estrenos</h3>
        <ListToys toys={toys.nextToys} />
      </AlertContext.Provider>
    </>
  );
}
