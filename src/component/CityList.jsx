import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
export default function CityList({ cities, isLoading, setCities }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your city first by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={city.id}
          cities={cities}
          setCities={setCities}
        />
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
  isLoading: PropTypes.bool.isRequired,
  setCities: PropTypes.func,
};
