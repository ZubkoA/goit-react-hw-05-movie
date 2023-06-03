import { NavLink, Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div className={css.container}>
      <header>
        <ul className={css.wrap}>
          <li className={css.list}>
            <NavLink
              to="/"
              className={css.nav}
              style={({ isActive }) => ({
                color: isActive ? '#cf711f' : '#000',
              })}
            >
              Home
            </NavLink>
          </li>
          <li className={css.list}>
            <NavLink
              to="/movies"
              className={css.nav}
              style={({ isActive }) => ({
                color: isActive ? '#cf711f' : '#000',
              })}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer></footer>
    </div>
  );
};
export default Layout;
