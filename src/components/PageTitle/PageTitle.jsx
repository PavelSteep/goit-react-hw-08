import React from 'react';
import css from './PageTitle.module.css';

const PageTitle = ({ children }) => {
  return <h1 className={css.title}>{children}</h1>;
};

export default PageTitle;
