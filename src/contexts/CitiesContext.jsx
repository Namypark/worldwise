import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:3000/";
  //? useEffect that fetches  cities from the local server and returns and returns an JSON response
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}cities`);
        console.log(BASE_URL);
        if (!response.ok) {
          throw new Error(response.Error);
        }
        const data = await response.json();
        console.log(data);
        setCities(data);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities/${id}`);
      if (!response.ok) {
        throw new Error(response.Error);
      }
      const data = await response.json();
      console.log(data);
      setCurrentCity(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createNewCity = async (newCity) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(response.Error);
      }
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (cityId) => {
    const URL = `${BASE_URL}cities`;
    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      setIsLoading(true);
      const response = await fetch(`${URL}/${cityId}`, option);
      const data = await response.json();
      console.log(data);
      setCities((cities) => cities.filter((c) => c.id !== cityId));
    } catch (error) {
      alert("There was no city deleted");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        setCities: setCities,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
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
