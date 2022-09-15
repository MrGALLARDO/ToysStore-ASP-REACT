import { useState, useEffect } from "react";
import ListToys from "./ToyStore/ListToys";
import { landingPageDTO } from "./ToyStore/toys.models";

export default function LandingPage() {
  const [toys, setToys] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setToys({
        toysRestrictionAge: [
          {
            id: 1,
            name: "Chuky",
            description: "Muñeco de Chucky.",
            agerestriction: false,
            company: "KingGallard",
            precio: 2300,
            image: "https://i.imgur.com/3PfkKB8.png",
          },
          {
            id: 2,
            name: "Chuky2",
            description: "Muñeco de Chucky.",
            agerestriction: false,
            company: "KingGallardo",
            precio: 2300,
            image: "https://i.imgur.com/3PfkKB8.png",
          },
        ],
        toysWithOutRestrictionAge: [
          {
            id: 3,
            name: "Chuky3",
            description: "Muñeco de Chucky.",
            agerestriction: false,
            company: "KingGallard",
            precio: 2300,
            image: "https://i.imgur.com/3PfkKB8.png",
          },
        ],
      });
    }, 500);

    return () => clearTimeout(timerId);
  });

  return (
    <>
      <h3>Restricción de Edad</h3>
      <ListToys toys={toys.toysRestrictionAge} />

      <h3>Sin Restricción de Edad</h3>
      <ListToys toys={toys.toysWithOutRestrictionAge} />
    </>
  );
}
