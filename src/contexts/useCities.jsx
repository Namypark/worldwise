import { CitiesContext } from "./CitiesContext";
import { useContext } from "react";

export default function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("Post context was used outside CitiesProvider Scope");
  }
  return context;
}
