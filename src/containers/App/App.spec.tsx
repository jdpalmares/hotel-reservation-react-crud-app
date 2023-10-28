/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import React from "react";
import { HotelReservation } from "../../Types/HotelReservation";
import App from "./App";

function renderApp(_props: Partial<HotelReservation> = {}) {
  return render(<App/>);
}

describe('Test App Sample Unit Test', () => {
  test("Should display Hotel Reservation System", async () => {
    // const { getByText } = renderApp();
    // const appText = getByText("Hotel Reservation System");
    // expect(appText).toBeInTheDocument();
  });
});
