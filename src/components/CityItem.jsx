import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import useCities from "../contexts/useCities";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cities, setCities, currentCity } = useCities();

  const handleDelete = (cityId) => {
    const updatedCities = cities.filter((city) => city.id !== cityId);
    setCities(updatedCities);
  };
  const { emoji, cityName, date, id, position } = city;

  const activeCity = currentCity.id === id;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          activeCity ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lon=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={() => handleDelete(id)} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
      position: PropTypes.object,
      id: PropTypes.string,
    })
  ),
  setCities: PropTypes.func,
};
