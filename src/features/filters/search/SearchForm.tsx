import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../../store';
import { fetchProductsBySearch } from './fetch-products-by-search';
import classes from './SearchForm.module.scss';

const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { categoryId } = params;
  const [searchQuery, setSearchQuery] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    setSearchQuery(value);
  };
  const [error, setError] = useState(true);
  useEffect(() => {
    if (searchQuery.length > 4) {
      dispatch(fetchProductsBySearch(searchQuery, categoryId));
      setError(false);
    } else {
      setError(true);
    }
  }, [searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleInputChange({ target: { value: searchQuery } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="search"
          label="Search"
          placeholder="Enter product name"
          variant="outlined"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
      {error ? <p>Enter at least 5 characters to start search...</p> : <p></p>}
    </div>
  );
};

export default SearchForm;
