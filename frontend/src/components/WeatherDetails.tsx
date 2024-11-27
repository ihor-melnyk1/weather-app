import React from 'react';
import sunIcon from '../assets/sun.svg';
import styles from './WeatherDetails.module.css';
import classNames from 'classnames';

interface WeatherDetailsProps {
  weather: any;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  return (
    <div className={classNames(styles.wrapper, {
      [styles.active]: weather
    })}>
      {weather &&
        <>
          <img src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@4x.png`} className={styles.weatherImage} alt="weather" />
          <div className={styles.infoBox}>
            <h2 className={styles.location}>{weather?.name}, {weather?.country}</h2>
            <h1 className={styles.temp}>{weather?.temp}°</h1>
            <p className={styles.description}>{weather?.weather?.[0].description}</p>
          </div>
        </>
      }
    </div>
  );
};

export default WeatherDetails;
