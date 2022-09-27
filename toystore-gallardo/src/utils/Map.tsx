import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { coordinateDTO } from "./coordinates.model";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapLeaflet(props: mapLeafletProps) {
  const [coordinates, setcoordinates] = useState<coordinateDTO[]>(
    props.coordinates
  );
  return (
    <MapContainer
      center={[20.673406871094812, -103.36769374681671]}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution="Juguetes"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.onlyRead ? null : (
        <ClickMap
          setPoint={(coordinates) => {
            setcoordinates([coordinates]);
            props.manageClickMap(coordinates);
          }}
        />
      )}

      {coordinates.map((coordinate) => (
        <Mark key={coordinate.lat + coordinate.lng} {...coordinate} />
      ))}
    </MapContainer>
  );
}

interface mapLeafletProps {
  height: string;
  coordinates: coordinateDTO[];
  manageClickMap(coordinates: coordinateDTO): void;
  onlyRead: boolean;
}

MapLeaflet.defaultProps = {
  height: "500px",
  onlyRead: false,
  manageClickMap: () => {},
};

// Evento click mapa para el Marcador.
function ClickMap(props: clickMapProps) {
  useMapEvent("click", (e) => {
    props.setPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
  });
  return null;
}

interface clickMapProps {
  setPoint(coordinates: coordinateDTO): void;
}

function Mark(props: coordinateDTO) {
  return (
    <Marker position={[props.lat, props.lng]}>
      {props.name ? <Popup>{props.name}</Popup> : null}
    </Marker>
  );
}
