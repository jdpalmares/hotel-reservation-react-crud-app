import { HotelReservation } from '../Types/HotelReservation';

export const getDefaultHotelReservation = (): HotelReservation => ({
    id: 0,
    stay: {
        arrivalDate: '',
        departureDate: '',
    },
    room: {
    roomSize: '',
    roomQuantity: 0,
    },
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressStreet: {
    streetName: '',
    streetNumber: '',
    },
    addressLocation: {
    zipCode: '',
    state: '',
    city: '',
    },
    extras: [],
    payment: '',
    note: '',
    tags: [],
    reminder: false,
    newsletter: false,
    confirm: false,
});