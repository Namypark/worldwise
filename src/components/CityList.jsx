import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
import useCities from "../contexts/useCities";

export default function CityList() {
  const { cities, isLoading, setCities } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your city first by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
      position: PropTypes.object,
      id: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  setCities: PropTypes.func,
};
