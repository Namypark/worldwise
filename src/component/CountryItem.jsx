import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";
export default function CountryItem({ countryItem }) {
  const { country, emoji } = countryItem;
  // create a set to store the unique country names

  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

CountryItem.protoTypes = {
  countryItem: PropTypes.object,
  country: PropTypes.object,
};
