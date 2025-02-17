import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
// import { selectFilter } from '../../redux/contacts/selectors';
// import { selectFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChange = event => {
    // dispatch(selectFilter(event.target.value));
    dispatch(setFilter(event.target.value));
  };

  return (
    <input
      className={css['search-box']}
      type="text"
      placeholder="Search contacts"
      onChange={handleChange}
    />
  );
};

export default SearchBox;
