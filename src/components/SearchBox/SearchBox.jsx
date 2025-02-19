import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Добавил useSelector
import { setFilter } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter) || ""; // Получаем текущее значение фильтра

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <input
      className={css['search-box']}
      type="text"
      placeholder="Search contacts"
      value={filter} // Добавляем значение из `store`
      onChange={handleChange}
    />
  );
};

export default SearchBox;
