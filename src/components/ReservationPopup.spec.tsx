/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';
import React from "react";
import { getDefaultHotelReservation } from "../utils/HotelReservationUtils";
import ReservationPopup, { ReservationPopupProps } from "./ReservationPopup";

function renderHotelPopup(_props: Partial<ReservationPopupProps> = {}) {
  const defaultProps: ReservationPopupProps = {
    open: true,
    onClose() {
      return;
    },
    reservationToEdit: getDefaultHotelReservation(),
    onConfirm() {
      return;
    },
    isEdit: false
  };
  return render(<ReservationPopup {...defaultProps} {..._props} />);
}

describe('renders learn react link add reservation', () => {
    test("Should display Hotel Popup", async () => {
      const { findByTestId } = renderHotelPopup();

      const hotelPopup = await findByTestId("hotel-popup");
  
      expect(hotelPopup).toBeInTheDocument();
      const textElement = screen.getByText(/Add Reservation/i);
      expect(textElement).toBeInTheDocument();
    });
});

// describe('renders learn react link edit reservation', () => {
//     render(<ReservationPopup
//                 open={true}
//                 onClose={function (): void {
//                     throw new Error('Function not implemented.');}}
//                 onConfirm={function (isEdit: boolean, editId: number, data: HotelReservation): void {
//                     throw new Error('Function not implemented.');}}
//                 reservationToEdit={getDefaultHotelReservation()}
//                 isEdit={true}
//             />);
//     const linkElement = screen.getByText(/Edit Reservation/i);
//     expect(linkElement).toBeInTheDocument();
// });