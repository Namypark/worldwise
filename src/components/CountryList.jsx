import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import useCities from "../contexts/useCities";

export default function CountryList() {
  const { cities: countries, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!countries.length)
    return (
      <Message message="Add your city first by clicking on a city on the map" />
    );

  const countryItem = countries.reduce((arr, country) => {
    if (!arr.map((el) => el.country).includes(country.country)) {
      return [...arr, { country: country.country, emoji: country.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countryItem.map((country) => (
        <CountryItem countryItem={country} key={country.country} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
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
};
