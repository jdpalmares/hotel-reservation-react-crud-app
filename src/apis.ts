import { HotelReservation } from './Types/HotelReservation';
import reservations from './_api/reservations.json';


export const getAllReservations = async (): Promise<HotelReservation[]> => {
    try {
        // TODO replace with REST API implementation once backend is done
        // const response = await axios.get('/reservations');
        // return response.data;
        if(localStorage.getItem('myReservations')){
            return JSON.parse(localStorage.getItem('myReservations') || '{}');
        } else {
            localStorage.setItem('myReservations', JSON.stringify(reservations));
            return reservations;
        }
    } catch (error) {
        console.error('Error reading data from JSON file:', error);
        return [];
    }
};

export const addReservation = async (newReservation: HotelReservation): Promise<HotelReservation> => {
    try {
        // TODO replace with REST API implementation once backend is done
        // const response = await axios.post('/reservations', newReservation);
        // return response.data;
        const currReservations = JSON.parse(localStorage.getItem('myReservations') || '{}');
        let nextId : number;
        if (currReservations) {
            const maxId = Math.max(...currReservations.map((a : HotelReservation) => a.id));
            nextId = maxId + 1;
        } else {
            nextId = 1;
        }
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
        // TODO replace with REST API implementation once backend is done
        // const response = await axios.delete(`/reservations/${id}`);
        // return response.data;
        const currReservations = JSON.parse(localStorage.getItem('myReservations') || '{}');
        if (currReservations) {
            const updatedArray = currReservations.filter(
                (reservation : HotelReservation) => reservation.id !== id );
            localStorage.setItem('myReservations', JSON.stringify(updatedArray));
        } else {
            console.log('Empty Reservations');
            throw new Error('Failed to delete the reservation.');
        }
        return -1;
    } catch (error) {
        console.error('Error deleting reservation to local storage:', error);
        throw new Error('Failed to add the reservation.');
    }
};

export const updateReservation = async (updatedReservation: HotelReservation, idToBeReplaced: number): Promise<number> => {
    try {
        // TODO replace with REST API implementation once backend is done
        // const response = await axios.put(`/reservations/${idToBeReplaced}`, updatedReservation);
        // return response.data;
        const currReservations = JSON.parse(localStorage.getItem('myReservations') || '{}');
        if (currReservations) {
            const updatedArray = currReservations.filter(
                (reservation : HotelReservation) => reservation.id !== idToBeReplaced );
            updatedReservation.id = idToBeReplaced;
            updatedArray.push(updatedReservation);
            localStorage.setItem('myReservations', JSON.stringify(updatedArray));
        } else {
            console.log('Empty Reservations');
            throw new Error('Failed to update the reservation.');
        }
        return -1;
    } catch (error) {
        console.error('Error deleting reservation to local storage:', error);
        throw new Error('Failed to add the reservation.');
    }
};