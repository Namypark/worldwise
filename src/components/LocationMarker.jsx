import { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
export default function LocationMarker() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setCurrentPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return currentPosition === null ? null : (
    <Marker position={currentPosition}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
