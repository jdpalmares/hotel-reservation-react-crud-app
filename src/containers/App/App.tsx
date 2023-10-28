import React from 'react';
import ReservationList from '../../components/ReservationList';
import logo from '../../lib/media/icons/logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" data-testid="app-title-text">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Hotel Reservation System</h3>
      </header>
      <main>
        <ReservationList />
      </main>
    </div>
  );
}

export default App;
