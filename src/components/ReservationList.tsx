import { Button } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HotelReservation } from '../Types/HotelReservation';
import { addReservation, deleteReservation, getAllReservations } from '../apis';
import ReservationPopup from './ReservationPopup';

interface ReservationsListProps {
}

const ReservationList: React.FC<ReservationsListProps> = () => {
    const [reservations, setReservations] = useState<HotelReservation[]>([]);
    const [filter, setFilter] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);

    function getReservations () {
        getAllReservations()
            .then((data) => setReservations(data))
            .catch((error) => {
                console.error('Error fetching reservations:', error);
                setReservations([]);
            });
    }

    useEffect(() => {
        getReservations();
    }, []);

    useEffect(() => {
        const filteredData = reservations.filter((item : HotelReservation) =>
            item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            item.email.toLowerCase().includes(filter.toLowerCase())
        );
        setReservations(filteredData);
    }, [filter, reservations]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        getReservations();
        setFilter(event.target.value);
    };
    
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    
    const handleAddData = (newData: HotelReservation) => {
        // Add the new data to the existing data (you can add validation and unique IDs as needed)
        // setData([...data, { id: data.length + 1, ...newData }]);
        addReservation(newData);
        getReservations();
    };

    const handleDeleteData = (id: number) => {
        // Add the new data to the existing data (you can add validation and unique IDs as needed)
        // setData([...data, { id: data.length + 1, ...newData }]);
        deleteReservation(id);
        getReservations();
    };

    return (
        <div>
            <div className='reservations-header'>
                <Typography variant='h4' className='reservations-headertext'>
                    Reservations
                </Typography>
                <TextField
                        className='reservations-search'
                        label="Search By Guest Name or Email"
                        variant="outlined"
                        value={filter}
                        onChange={handleFilterChange}
                />
                <div style={{ flex: 1, textAlign: 'right'}} >
                    <Button className='button' onClick={handleDialogOpen}>
                        Make a Reservation
                    </Button>
                </div>
                
            </div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Guest Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Arrival</TableCell>
                    <TableCell>Departure</TableCell>
                    <TableCell>Stay</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                            <TableCell>{reservation.id}</TableCell>
                            <TableCell>{reservation.firstName + " " + reservation.lastName}</TableCell>
                            <TableCell>{reservation.email}</TableCell>
                            <TableCell>{reservation.stay.arrivalDate}</TableCell>
                            <TableCell>{reservation.stay.departureDate}</TableCell>
                            <TableCell>{formatStayDuration(reservation.stay)}</TableCell>
                            <TableCell>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteData(reservation.id)} >
                                <DeleteIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <ReservationPopup open={isDialogOpen} onClose={handleDialogClose} onAdd={handleAddData}/>
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