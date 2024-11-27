import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/weatherService';
import styles from './HistoryPage.module.css';
import { Link } from 'react-router-dom';
import arrowIcon from '../assets/arrow.svg';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };

    loadHistory();
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link className={styles.link} to='/'>
          <img src={arrowIcon} className={styles.arrow} />
        </Link>
        <h3 className={styles.heading}>Weather history</h3>
      </header>
        <ul className={styles.list}>
          {history.map((item, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.textContainer}>
                <p>
                  <strong>{item.name}, {item.state && `${item.state}, `} {item.country}</strong>
                </p>
                <p>{item.weather[0].description}</p>
              </div>
              <div className={styles.tempContainer}>
                <p className={styles.temp}>{item.temp}°C</p>
                <img src={`http://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}@4x.png`} className={styles.weatherImage} alt="weather" />
              </div>
              

            </li>
          ))}
        </ul>
    </div>
  );
};

export default HistoryPage;
