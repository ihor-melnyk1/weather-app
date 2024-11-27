import React, { useState } from 'react';
import styles from './CityInput.module.css';
import Autocomplete from './Autocomplete';
import { Link } from 'react-router-dom';
import { fetchWeatherByCoordinates } from '../services/weatherService';

interface CityInputProps {
  setWeather: React.Dispatch<any>
}

const CityInput: React.FC<CityInputProps> = ({ setWeather }) => {
  const [selectedName, setSelectedName] = useState(null);
  return (
    <div className={styles.wrapper}>
      <label htmlFor='city-input' className={styles.label}>Enter the city</label>
      <Autocomplete onSelect={(item) => setSelectedName(item)} />
      <button disabled={!selectedName} className={styles.button} onClick={async () => {
        const data = await fetchWeatherByCoordinates(selectedName.lat, selectedName.lon, selectedName.name, selectedName.country, selectedName.state);
        setWeather(data);
      }}>Submit</button>
      <Link to='/history' className={styles.link}>Show history</Link>
    </div>
  );
};

export default CityInput;
