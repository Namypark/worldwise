import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useCities from "../contexts/useCities";

export default function Map() {
  const [position, setPosition] = useState(null);
  const { cities } = useCities();
  //Effect to retrieve latitude and longitude from URL and store
  //locally to avoid errors after a refresh is made on the site which resets

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("form");
  };

  useEffect(() => {
    if (lat && lon) {
      setPosition([parseFloat(lat), parseFloat(lon)]);
    }
  }, [lat, lon]);

  return (
    <button className={styles.mapContainer}>
      {position ? (
        <MapContainer
          className={styles.map}
          key={`${lat}-${lon}`}
          center={position}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
          <ChangeCenter position={position} />
          <DetectClicks position={position} />
        </MapContainer>
      ) : (
        <p>hi</p>
      )}
    </button>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.flyTo(position);
  return null;
}

function DetectClicks({ position }) {
  const navigate = useNavigate();
  const map = useMapEvents({
    click(e) {
      map.flyTo(position);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
