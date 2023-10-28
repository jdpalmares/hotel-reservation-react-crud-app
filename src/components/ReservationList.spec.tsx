/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import React from "react";
import { HotelReservation } from '../Types/HotelReservation';
import * as apis from "../apis";
import { getDefaultHotelReservation } from '../utils/HotelReservationUtils';
import ReservationList, { ReservationsListProps } from "./ReservationList";

jest.mock('./ReservationPopup', () => {
  return function MockEditReservationDialog(props: { onOpen: () => void; isOpen: any; }) {
    return (
      <div>
        <button
          data-testid="open-dialog-button"
          onClick={() => props.onOpen()}
        >
          Open Dialog
        </button>
        {props.isOpen && (
          <div data-testid="dialog-content">Mock Dialog Content</div>
        )}
      </div>
    );
  };
});

// function renderHotelPopupOnList(_props: Partial<ReservationPopupProps> = {}) {
//   const defaultProps: ReservationPopupProps = {
//     open: false,
//     onClose() {
//       return;
//     },
//     reservationToEdit: getDefaultHotelReservation(),
//     onConfirm() {
//       return;
//     },
//     isEdit: false
//   };
//   return render(<ReservationPopup {...defaultProps} {..._props} />);
// }

jest.mock('../apis');

beforeEach(() => {
  // Mock the API functions to resolve with the mock data
  (apis.addReservation as jest.Mock).mockResolvedValue(
    new Promise<HotelReservation[]>(() => {
      return getDefaultHotelReservation();
    })
  );
  (apis.deleteReservation as jest.Mock).mockResolvedValue(
    new Promise<number>(() => {
      return 1;
    })
  );
  (apis.getAllReservations as jest.Mock).mockResolvedValue(getDefaultHotelReservation());
  (apis.updateReservation as jest.Mock).mockResolvedValue(
    new Promise<number>(() => {
      return 1;
    })
  );
});

function renderHotelList(_props: Partial<ReservationsListProps> = {}) {
  const defaultProps: ReservationsListProps = {
  };
  const ReservationPopup = require('./ReservationPopup').default;
  return render(<ReservationList {...defaultProps} {..._props} />);
}

describe('Render Hotel List', () => {
    // const setup = () => {
    //   renderHotelPopupOnList();
    // };
    jest.spyOn(apis,"getAllReservations").mockReturnValueOnce(
      new Promise<HotelReservation[]>(() => {
          return getDefaultHotelReservation();
    }));

    jest.spyOn(apis,"addReservation").mockReturnValueOnce(
      new Promise<HotelReservation>(() => {
          return getDefaultHotelReservation();
    }));

    jest.spyOn(apis,"deleteReservation").mockReturnValueOnce(
      new Promise<number>(() => {
          return 1;
    }));

    jest.spyOn(apis,"updateReservation").mockReturnValueOnce(
      new Promise<number>(() => {
          return 1;
    }));

    test("Should display Hotel List", async () => {
        // setup();
        // const { findByTestId } = renderHotelList();

        // const hotelList = await findByTestId("hotel-list");
    
        // expect(hotelList).toBeInTheDocument();
        // const textElement = screen.getByText(/Reservations/i);
        // expect(textElement).toBeInTheDocument();
    });
});

// describe('reservations table is there by column', () => {
//     render(<ReservationList />);
//     const linkElement = screen.getByText(/Guest Name/i);
//     expect(linkElement).toBeInTheDocument();
// });

// describe('filters data based on the search text', () => {
//     render(<ReservationList />);

//     // Check if the initial data is displayed
//     expect(screen.getByText('IDM ENG')).toBeInTheDocument();
//     expect(screen.getByText('IDM PM')).toBeInTheDocument();

//     // Find the search input and enter a search term
//     const searchInput = screen.getByLabelText('Search By Guest Name or Email');
//     fireEvent.change(searchInput, { target: { value: 'ENG' } });

//     // Check if the data is filtered correctly
//     expect(screen.getByText('IDM ENG')).toBeInTheDocument();
//     expect(screen.queryByText('IDM PM')).toBeNull();
// });