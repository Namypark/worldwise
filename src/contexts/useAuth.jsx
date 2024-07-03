import { useContext } from "react";
import { AuthContext } from "./fakeAuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Auth context is was used outside the AuthProvider");
  }
  return context;
}
