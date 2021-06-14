import React, { useState,useEffect, useContext } from 'react';
import './Header.css';
import { Context } from '../../Context/AuthContext';

const Header = ({data}) => {

  const { handleLogout } = useContext(Context);

  const converCash = (value) => {
    return parseInt(
      value,
    ).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  return (

    <>

      <header className="home-header">
        <a href="/home">Logo</a>
        <nav>
          <ul className="home-main">
            <li>
              <a href="" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="header-query-blocks">
      <div className="header-item">
        <div className="header-child">
          <span>Receitas</span>
          <h6>{converCash(data?.account_balance)}</h6>
        </div>
      </div>

      <div className="header-item">
        <div className="header-child">
          <span>Despesas</span>
          <h6>{converCash(data?.expense)}</h6>
        </div>
      </div>
    </section>

  </>
  );

}
export default Header;
