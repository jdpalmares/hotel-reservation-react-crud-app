import { Button, FormControl, Input } from '@mui/base';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HotelReservation } from '../Types/HotelReservation';
import { getAllReservations } from '../apis';

interface ReservationsListProps {
}

const ReservationList: React.FC<ReservationsListProps> = () => {
    const [reservations, setReservations] = useState<HotelReservation[]>([]);
    const [filter, setFilter] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newData, setNewData] = useState({ name: '', age: '', email: '' });

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
        setFilter(event.target.value);
        if (!event.target.value) //TODO need to modify to reset search
            getReservations();
    };
    
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    
    const handleDialogClose = () => {
    setDialogOpen(false);
    };

    const handleAddData = () => {
        // Add the new data to the existing data (you can add validation and unique IDs as needed)
        // setData([...data, { id: data.length + 1, ...newData }]);
        setDialogOpen(false);
        // Clear the form fields
        setNewData({ name: '', age: '', email: '' });
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
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add Reservation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter data to add:</DialogContentText>
                    <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input
                        value={newData.name}
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                    />
                    </FormControl>
                    <FormControl>
                    <InputLabel>Age</InputLabel>
                    <Input
                        value={newData.age}
                        onChange={(e) => setNewData({ ...newData, age: e.target.value })}
                    />
                    </FormControl>
                    <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input
                        value={newData.email}
                        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                    />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddData} color="primary">
                    Add
                    </Button>
                </DialogActions>
            </Dialog>
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