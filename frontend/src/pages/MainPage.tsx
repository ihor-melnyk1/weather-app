import React, { useState } from 'react';


import { fetchWeatherByCoordinates } from '../services/weatherService';
import Autocomplete from '../components/Autocomplete';
import WeatherDetails from '../components/WeatherDetails';
import styles from './MainPage.module.css';
import CityInput from '../components/CityInput';

const MainPage: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);

  return (
    <div className={styles.wrapper}>
      <WeatherDetails weather={weather} />
      <CityInput setWeather={setWeather}/>
    </div>
  );
};

export default MainPage;
