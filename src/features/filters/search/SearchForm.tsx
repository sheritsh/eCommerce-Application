import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchForm: React.FC<{ onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch({ target: { value: searchQuery } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
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
  );
};

export default SearchForm;
