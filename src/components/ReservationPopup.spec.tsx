import { fireEvent, render, screen } from '@testing-library/react';
import { HotelReservation } from '../Types/HotelReservation';
import ReservationPopup from './ReservationPopup';

describe('renders learn react link', () => {
    render(<ReservationPopup open={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } onAdd={function (data: HotelReservation): void {
        throw new Error('Function not implemented.');
    } } />);
    const linkElement = screen.getByText(/Add Reservation/i);
    expect(linkElement).toBeInTheDocument();
});

describe('reservations table is there by column', () => {
    render(<ReservationPopup open={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } onAdd={function (data: HotelReservation): void {
        throw new Error('Function not implemented.');
    } } />);
    const linkElement = screen.getByText(/Enter data to add/i);
    expect(linkElement).toBeInTheDocument();
});

describe('filters data based on the search text', () => {
    render(<ReservationPopup open={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } } onAdd={function (data: HotelReservation): void {
        throw new Error('Function not implemented.');
    } } />);

    // Check if the initial data is displayed
    expect(screen.getByText('IDM ENG')).toBeInTheDocument();
    expect(screen.getByText('IDM PM')).toBeInTheDocument();

    // Find the search input and enter a search term
    const searchInput = screen.getByLabelText('Search By Guest Name or Email');
    fireEvent.change(searchInput, { target: { value: 'ENG' } });

    // Check if the data is filtered correctly
    expect(screen.getByText('IDM ENG')).toBeInTheDocument();
    expect(screen.queryByText('IDM PM')).toBeNull();
});