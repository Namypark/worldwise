import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./component/CityList";
import Product from "./pages/Product";
import City from "./component/City";
import CountryList from "./component/CountryList";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://localhost:3000/";
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}cities`);
        if (!response.ok) {
          throw new Error(response.Error);
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            path="cities"
            index
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
                setCities={setCities}
              />
            }
          />
          <Route path="cities/:id" element={<City cities={cities} />} />
          <Route path="form" element={<Form />} />
          <Route
            path="countries"
            element={<CountryList countries={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form component</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
