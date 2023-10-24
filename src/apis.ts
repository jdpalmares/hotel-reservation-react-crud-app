import { HotelReservation } from './Types/HotelReservation';
import reservations from './data/reservations.json';


export const getAllReservations = async (): Promise<HotelReservation[]> => {
    try {
        return reservations;
    } catch (error) {
        console.error('Error reading data from JSON file:', error);
        return [];
    }
};

export const addReservation = async (newReservation: HotelReservation): Promise<HotelReservation> => {
    try {
        const maxId = Math.max(...reservations.map((a) => a.id));
        const nextId = maxId + 1;
        newReservation.id = nextId;
        reservations.push(newReservation);
    
        localStorage.setItem('myReservations', JSON.stringify(reservations));
        return newReservation;
    } catch (error) {
        console.error('Error adding appointment to JSON file:', error);
        throw new Error('Failed to add the appointment.');
    }
};