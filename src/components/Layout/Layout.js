import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div className={css.container}>
      <header>
        <ul className={css.wrap}>
          <li className={css.list}>
            <NavLink to="/" className={css.nav}>
              Home
            </NavLink>
          </li>
          <li className={css.list}>
            <NavLink to="/movies" className={css.nav}>
              Movies
            </NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
export default Layout;
