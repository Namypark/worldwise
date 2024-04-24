import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map() {
  const [position, setPosition] = useState([4.0, 2.3]);

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
    if ((lat, lon)) setPosition([parseFloat(lat), lon]);
  }, [lat, lon]);
  useEffect(() => {
    if (position) {
    }
  }, [position]);

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
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>No location</p>
      )}
    </button>
  );
}
