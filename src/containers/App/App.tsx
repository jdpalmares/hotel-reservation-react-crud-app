import ReservationList from '../../components/ReservationList';
import logo from '../../lib/media/icons/logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hotel Appointments</h1>
      </header>
      <main>
        <ReservationList />
      </main>
    </div>
  );
}

export default App;
