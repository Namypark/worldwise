// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import styles from "./Form.module.css";
import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { useEffect } from "react";
import useUrlPosition from "../hooks/useUrlPosition";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const { lat, lng } = useUrlPosition();
  console.log(lat, lng);
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}"`
        );
        const data = await response.json();
        console.log(data);
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(data.emoji);
        setIsLoadingGeocoding(false);
      } catch (error) {
        console.error(error.Message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
