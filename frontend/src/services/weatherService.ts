import axios from 'axios';
import Cache from './cache';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const CACHE_TTL = 3600000;

export const fetchAutocomplete = async (query: string) => {
  const response = await axios.get(`${API_URL}/weather/autocomplete`, {
    params: { query },
  });
  return response.data;
};

export const fetchWeatherByCoordinates = async (
  lat: number,
  lon: number,
  name: string,
  country: string,
  state?: string,
) => {
    const cacheKey = `weather_${lat}_${lon}`;

  const cachedData = Cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  const response = await axios.get(`${API_URL}/weather`, {
    params: { lat, lon, name, country, state },
  });
    const data = response.data;
    Cache.set(cacheKey, data, CACHE_TTL);
    return data;
};

export const fetchHistory = async () => {
  const response = await axios.get(`${API_URL}/weather/history`);
  return response.data;
};
