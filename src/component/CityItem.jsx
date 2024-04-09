import PropTypes from "prop-types";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));

export default function CityItem({ city, cities, setCities }) {
  const handleDelete = (cityId) => {
    const updatedCities = cities.filter((city) => city.id !== cityId);
    setCities(updatedCities);
  };
  const { emoji, cityName, date, id } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button onClick={() => handleDelete(id)} className={styles.deleteBtn}>
        &times;
      </button>
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
      id: PropTypes.string.isRequired,
    })
  ),
  setCities: PropTypes.func,
};
