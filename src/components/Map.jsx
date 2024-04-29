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
import useUrlPosition from "../hooks/useUrlPosition";

export default function Map() {
  const [mapPosition, setMapPosition] = useState(null);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    error: errorPosition,
    getPosition,
  } = useGeoLocation();
  //Effect to retrieve latitude and lnggitude from URL and store
  //locally to avoid errors after a refresh is made on the site which resets
  const navigate = useNavigate();

  const { lat, lng } = useUrlPosition();
  console.log(`lat and long from urlPosition: ${lat} and ${lng}`);
  const handleNavigate = () => {
    navigate("form");
  };

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([parseFloat(lat), parseFloat(lng)]);
      console.log(`lat and lng from useEffect: ${lat} and ${lng}`);
      console.log(`mapPosition: ${mapPosition}`);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition(geolocationPosition);
    }
  }, [geolocationPosition]);
  return (
    <div className={styles.mapContainer}>
      {mapPosition ? (
        <MapContainer
          className={styles.map}
          key={`${lat}-${lng}`}
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geolocationPosition && (
            <Marker position={geolocationPosition}>
              <Popup>
                <span>you are here</span>
              </Popup>
            </Marker>
          )}
          <ChangeCenter mapPosition={geolocationPosition} />

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
          <ChangeCenter mapPosition={mapPosition} />
          <DetectClicks mapPosition={mapPosition} />
        </MapContainer>
      ) : (
        <Button onClick={getPosition} type="position">
          here
        </Button>
      )}
    </div>
  );
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.flyTo(mapPosition);

  return null;
}

function DetectClicks({ mapPosition }) {
  const navigate = useNavigate();
  const map = useMapEvents({
    click(e) {
      map.flyTo(mapPosition);
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
