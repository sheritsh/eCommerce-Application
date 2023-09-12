import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { useAppDispatch, IRootState } from '../../../store';
import { setSearchQuery } from './products-by-search-slice';
import classes from './SearchForm.module.scss';

const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useSelector((state: IRootState) => state.search.searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    dispatch(setSearchQuery(value));
  };
  const error = useSelector((state: IRootState) => state.search.error);

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
      {error ? <p>Enter at least 4 characters to start search...</p> : <p></p>}
    </div>
  );
};

export default SearchForm;
