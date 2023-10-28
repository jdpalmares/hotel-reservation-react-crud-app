import * as apis from './apis';
import { getDefaultHotelReservation } from './utils/HotelReservationUtils';

describe('API Functions', () => {
    test('should add a reservation', async () => {
        const addReservationSpy = jest.spyOn(apis, 'addReservation');
        addReservationSpy.mockResolvedValue(getDefaultHotelReservation());
    
        await apis.addReservation(getDefaultHotelReservation());
    
        expect(addReservationSpy).toHaveBeenCalledWith(getDefaultHotelReservation());
    });

    test('should delete a reservation', async () => {
        const deleteReservationSpy = jest.spyOn(apis, 'deleteReservation');
        deleteReservationSpy.mockResolvedValue(1);
    
        const reservationId = 1; // Replace with a valid ID
    
        await apis.deleteReservation(reservationId);
    
        expect(deleteReservationSpy).toHaveBeenCalledWith(reservationId);
    });

    // Test getAllReservations
    test('should get all reservations', async () => {
        const getAllReservationsSpy = jest.spyOn(apis, 'getAllReservations');
        // getAllReservationsSpy.mockResolvedValue(mockReservations);
    
        const reservations = await apis.getAllReservations();
    
        expect(getAllReservationsSpy).toHaveBeenCalled();
        expect(reservations).toEqual(reservations);
    });

    // Test updateReservation
    test('should update a reservation', async () => {
        const updateReservationSpy = jest.spyOn(apis, 'updateReservation');
        // updateReservationSpy.mockResolvedValue(1);
    
        const reservationId = 0; // Replace with a valid ID
    
        await apis.updateReservation(getDefaultHotelReservation(), reservationId);
    
        expect(updateReservationSpy).toHaveBeenCalledWith(getDefaultHotelReservation(), reservationId);
    });
});