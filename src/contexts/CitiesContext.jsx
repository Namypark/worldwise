import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useReducer,
} from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: [],
  error: "",
};

const citiesReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown action type");
  }
};

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    citiesReducer,
    initialState
  );

  const BASE_URL = "http://localhost:3000/";
  //? useEffect that fetches  cities from the local server and returns and returns an JSON response
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}cities`);

        if (!response.ok) {
          throw new Error(response.Error);
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching the citiesData",
        });
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(async (id) => {
    console.log(id, currentCity.id);
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}cities/${id}`);
      if (!response.ok) {
        throw new Error(response.Error);
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching the cityData",
      });
    }
  }, []);

  const createNewCity = async (newCity) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(response.Error);
      }
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the City",
      });
    }
  };

  const deleteCity = async (cityId) => {
    const URL = `${BASE_URL}cities/`;
    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${URL}${cityId}`, option);
      const data = await response.json();
      console.log(data);
      dispatch({ type: "city/deleted", payload: cityId });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was a problem deleting the city",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        // setCities: setCities,
        isLoading: isLoading,
        // setIsLoading: setIsLoading,
        currentCity,
        getCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CitiesProvider, CitiesContext };
