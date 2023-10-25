import { fireEvent, render, screen } from '@testing-library/react';
import ReservationList from './ReservationList';

describe('renders learn react link', () => {
    render(<ReservationList />);
    const linkElement = screen.getByText(/Reservations/i);
    expect(linkElement).toBeInTheDocument();
});

describe('reservations table is there by column', () => {
    render(<ReservationList />);
    const linkElement = screen.getByText(/Guest Name/i);
    expect(linkElement).toBeInTheDocument();
});

describe('filters data based on the search text', () => {
    render(<ReservationList />);

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