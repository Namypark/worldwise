import React, { useState, useEffect } from "react";

function useGeoLocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support Geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
        console.log(position);
      },
      (err) => {
        setError(err.message || err);
        setIsLoading(false);
        console.error(error);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

export default useGeoLocation;
