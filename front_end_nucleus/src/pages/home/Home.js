import React, { useState,useEffect, useContext } from 'react';

import api from '../../api/api';
import './Home.css';
import Table from '../../Components/Table/Table';
import Header from '../../Components/Header/Header';

import { Context } from '../../Context/AuthContext';

const Home = () => {

  const { handleLogout } = useContext(Context);

  return (
    <>
      <Table />
    </>
  );
};

export default Home;
