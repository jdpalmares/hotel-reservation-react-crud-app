import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ReservationList />
        </LocalizationProvider>
      </main>
    </div>
  );
}

export default App;
