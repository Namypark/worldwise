import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown action");
  }
};
const FAKE_USER = {
  name: "Nnamdi",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
