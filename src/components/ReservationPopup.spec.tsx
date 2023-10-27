import { render, screen } from '@testing-library/react';
import { HotelReservation } from '../Types/HotelReservation';
import { getDefaultHotelReservation } from '../utils/HotelReservationUtils';
import ReservationPopup from './ReservationPopup';

describe('renders learn react link add reservation', () => {
    render(<ReservationPopup
                open={false}
                onClose={function (): void {
                    throw new Error('Function not implemented.');}}
                onConfirm={function (isEdit: boolean, editId: number, data: HotelReservation): void {
                    throw new Error('Function not implemented.');}}
                reservationToEdit={getDefaultHotelReservation()}
                isEdit={false}
            />);
    const linkElement = screen.getByText(/Add Reservation/i);
    expect(linkElement).toBeInTheDocument();
});

describe('renders learn react link edit reservation', () => {
    render(<ReservationPopup
                open={false}
                onClose={function (): void {
                    throw new Error('Function not implemented.');}}
                onConfirm={function (isEdit: boolean, editId: number, data: HotelReservation): void {
                    throw new Error('Function not implemented.');}}
                reservationToEdit={getDefaultHotelReservation()}
                isEdit={true}
            />);
    const linkElement = screen.getByText(/Edit Reservation/i);
    expect(linkElement).toBeInTheDocument();
});