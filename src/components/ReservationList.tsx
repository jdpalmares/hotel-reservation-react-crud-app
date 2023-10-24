import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HotelReservation } from '../Types/HotelReservation';
import { getAllReservations } from '../apis';

interface ReservationsListProps {
}

const ReservationList: React.FC<ReservationsListProps> = () => {
    const [reservations, setReservations] = useState<HotelReservation[]>([]);

    useEffect(() => {
        getAllReservations()
            .then((data) => setReservations(data))
            .catch((error) => {
                console.error('Error fetching appointments:', error);
                setReservations([]); // Handle the error, e.g., by displaying an error message
            });
    }, []);

    return (
        <div>
            <h2>Appointments</h2>
            <List>
            {reservations.map((reservation) => (
                <Card key={reservation.id} variant="outlined" style={{ marginBottom: '16px' }}>
                <CardContent>
                    <Typography variant="h6">
                        Stay Duration: {formatStayDuration(reservation.stay)}
                    </Typography>
                    <List>
                    <ListItem>
                        <ListItemText primary={`First Name: ${reservation.firstName}`} />
                        </ListItem>
                        <ListItem>
                        <ListItemText primary={`Last Name: ${reservation.lastName}`} />
                        </ListItem>
                        <ListItem>
                        <ListItemText primary={`Email: ${reservation.email}`} />
                        </ListItem>
                    </List>
                    </CardContent>
                </Card>
                ))}
            </List>
        </div>
    );
};

// Helper function to format the stay duration
function formatStayDuration(stay: HotelReservation['stay']): string {
    const arrivalDate : any = new Date(stay.arrivalDate);
    const departureDate : any = new Date(stay.departureDate);
    const durationInDays = Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
    return `${durationInDays} days`;
}

export default ReservationList;