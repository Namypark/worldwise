import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    //Effect to retrieve latitude and longitude from URL and store
    //locally to avoid errors after a refresh is made on the site which resets

    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    if (latParam && lngParam) {
      setLat(latParam);
      setLng(lngParam);
      localStorage.setItem("lat", latParam);
      localStorage.setItem("lng", lngParam);
    }
  }, [searchParams]);
  //Effect to retrieve latitude and longitude from local storage

  useEffect(() => {
    const storedLat = localStorage.getItem("lat");
    const storedLng = localStorage.getItem("lng");

    if (storedLat && storedLng) {
      setLat(storedLat);
      setLng(storedLng);
    }
  }, []);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("form");
  };
  return (
    <button onClick={handleNavigate} className={styles.mapContainer}>
      <div>
        {lat && lng ? (
          <div>
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
          </div>
        ) : (
          <p>No location</p>
        )}
      </div>
    </button>
  );
}
