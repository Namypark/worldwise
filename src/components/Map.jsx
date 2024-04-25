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
import useGeoLocation from "../hooks/useGeolocation";
import Button from "./Button";

export default function Map() {
  const [position, setPosition] = useState(null);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    error: errorPosition,
    getPosition: getPosition,
  } = useGeoLocation();
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

  useEffect(() => {
    if (geolocationPosition) {
      setPosition(geolocationPosition);
    }
  }, [geolocationPosition]);
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
          <ChangeCenter position={position} />
          <Marker position={position}>
            <Popup>
              <span>you are here</span>
            </Popup>
          </Marker>
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
        <Button onClick={getPosition} type="position">
          here
        </Button>
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

{
  /* <button onClick={getPosition} className={styles.map}>
          {isLoadingPosition ? (
            "Loading"
          ) : geolocationPosition ? (
            <MapContainer
              className={styles.map}
              center={[geolocationPosition.lat, geolocationPosition.lng]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[geolocationPosition.lat, geolocationPosition.lng]}
              >
                <Popup>
                  <span>here</span>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            "here"
          )}
        </button> */
}
