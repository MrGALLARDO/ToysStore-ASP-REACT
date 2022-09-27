import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlToys } from "../utils/endpoints";
import { coordinateDTO } from "../utils/coordinates.model";
import Loading from "../utils/Loading";
import MapLeaflet from "../utils/Map";
import { toyDTO } from "./toys.models";

export default function DetallePelicula() {
  const { id }: any = useParams();
  const [toy, setPelicula] = useState<toyDTO>();

  useEffect(() => {
    axios.get(`${urlToys}/${id}`)
    .then((answer: AxiosResponse<toyDTO>) => {
      answer.data.comingSoonDate = new Date(answer.data.comingSoonDate);
      setPelicula(answer.data);
    });
  }, [id]);

  function transformCoordinates(): coordinateDTO[] {
    if (toy?.branches) {
      const coordinates = toy.branches.map((branch) => {
        return {
          lat: branch.latitude,
          lng: branch.longitude,
          name: branch.name,
        } as coordinateDTO;
      });
      return coordinates;
    }

    return [];
  }

  function generateURLYoutubeEmbed(url: any): string {
    if (!url) {
      return "";
    }

    var videoId = url.split("v=")[1];
    var positionAmpersand = videoId.indexOf("&");
    if (positionAmpersand !== -1) {
      videoId = videoId.substring(0, positionAmpersand);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  return toy ? (
    <div style={{ display: "flex" }}>
      <div>
        <h2>
          {toy.name} ({toy.comingSoonDate.getFullYear()})
        </h2>
        {toy.categories?.map((category) => (
          <Link
            key={category.id}
            style={{ marginRight: "5px" }}
            className="btn btn-primary btn-sm rounded-pill"
            to={`/toy/filter?categoryId=${category.id}`}
          >
            {category.name}
          </Link>
        ))}
        | {toy.comingSoonDate.toDateString()}
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <span style={{ display: "inline-block", marginRight: "1rem" }}>
            <img
              src={toy.image}
              style={{ width: "225px", height: "315px" }}
              alt="Imagen Juguete"
            />
          </span>
          {toy.review ? (
            <div>
              <iframe
                title="review"
                width="560"
                height="315"
                src={generateURLYoutubeEmbed(toy.review)}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
        </div>
        {toy.description ? (
          <div style={{ marginTop: "1rem" }}>
            <h3>Descripción</h3>
            <div>
              <ReactMarkdown>{toy.description}</ReactMarkdown>
            </div>
          </div>
        ) : null}
        {toy.brands && toy.brands.length > 0 ? (
          <div style={{ marginTop: "1rem" }}>
            <h3>Marcas</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {toy.brands?.map((brand) => (
                <div key={brand.id} style={{ marginBottom: "2px" }}>
                  <img
                    alt="Imagen Marca"
                    src={brand.image}
                    style={{ width: "50px", verticalAlign: "middle" }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      width: "200px",
                      marginLeft: "1rem",
                    }}
                  >
                    {brand.name}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "45px",
                    }}
                  >
                    ...
                  </span>
                  {/* <span>{brand.personaje}</span> */}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {toy.branches && toy.branches.length > 0 ? (
          <div>
            <h2>Mostrándose en los siguiente branches</h2>
            <MapLeaflet onlyRead={true} coordinates={transformCoordinates()} />
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
