import { useLocation } from "react-router-dom";

export default function useUrlPosition() {
  // const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return { lat, lng };
}
