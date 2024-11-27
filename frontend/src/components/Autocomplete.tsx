import React, { useState, useEffect } from 'react';
import { fetchAutocomplete } from '../services/weatherService';
import styles from './Autocomplete.module.css';
import classNames from 'classnames';

interface AutocompleteProps {
  onSelect: (item: any) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [blockedSuggestions, setBlockedSuggestions] = useState<boolean>(false);
  const getFullName = (item) => `${item.name}, ${item.state ? `${item.state}, ` : ''}${item.country}`;
  useEffect(() => {
    if (blockedSuggestions) {
      return
    }
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      const data = await fetchAutocomplete(query);
      setSuggestions(data);
    }, 500);

    return () => clearTimeout(handler);
  }, [query, blockedSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setBlockedSuggestions(false)
  };

  const handleSelect = (item: any) => {
    onSelect(item);
    setSuggestions([]);
    setBlockedSuggestions(true)
    setQuery(getFullName(item));
    
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Start entering the name of the city"
        value={query}
        onChange={handleInputChange}
        className={styles.input}
        id='city-input'
      />
      <ul className={classNames(styles.autocompleteList, {
          [styles.autocompleteActive]: suggestions.length > 0
        })}>
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)} className="autocomplete-item">
              {getFullName(item)}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Autocomplete;
