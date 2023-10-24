export interface HotelReservation {
    id: number;
    stay: {
        arrivalDate: string;
        departureDate: string;
    };
    room: {
        roomSize: string;
        roomQuantity: number;
    };
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressStreet: {
        streetName: string;
        streetNumber: string;
    };
    addressLocation: {
        zipCode: string;
        state: string;
        city: string;
    };
    extras: string[];
    payment: string;
    note: string;
    tags: string[];
    reminder: boolean;
    newsletter: boolean;
    confirm: boolean;
}