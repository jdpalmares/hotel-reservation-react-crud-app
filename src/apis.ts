import { HotelReservation } from './Types/HotelReservation';
import reservations from './_api/reservations.json';


export const getAllReservations = async (): Promise<HotelReservation[]> => {
    try {
        if(!localStorage.getItem('myReservations')){
            localStorage.setItem('myReservations', JSON.stringify(reservations));
            return reservations;
        } else {
            return JSON.parse(localStorage.getItem('myReservations') || '{}');
        }
    } catch (error) {
        console.error('Error reading data from JSON file:', error);
        return [];
    }
};

export const addReservation = async (newReservation: HotelReservation): Promise<HotelReservation> => {
    try {
        const currReservations = JSON.parse(localStorage.getItem('myReservations') || '{}');
        const maxId = Math.max(...currReservations.map((a : HotelReservation) => a.id));
        const nextId = maxId + 1;
        newReservation.id = nextId;
        currReservations.push(newReservation);
    
        localStorage.setItem('myReservations', JSON.stringify(currReservations));
        return newReservation;
    } catch (error) {
        console.error('Error adding reservation to local storage:', error);
        throw new Error('Failed to add the reservation.');
    }
};

export const deleteReservation = async (id: number): Promise<number> => {
    try {
        const currReservations = JSON.parse(localStorage.getItem('myReservations') || '{}');
        if (currReservations) {
            const updatedArray = currReservations.filter(
                (reservation : HotelReservation) => reservation.id !== id );
            localStorage.setItem('myReservations', JSON.stringify(updatedArray));
        }
        return -1;
    } catch (error) {
        console.error('Error deleting reservation to local storage:', error);
        throw new Error('Failed to add the reservation.');
    }
};