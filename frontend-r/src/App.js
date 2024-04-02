import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import TeamModal from './components/TeamModal/TeamModal';

const App = () => {
  return (
    <>
      <Header  />
      <TeamModal />
      <main className='mt-5'>
        <Outlet />
      </main>
    </>
  )
}

export default App