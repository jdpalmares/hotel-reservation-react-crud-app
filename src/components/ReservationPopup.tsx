import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { HotelReservation } from '../Types/HotelReservation';
import { getDefaultHotelReservation } from '../utils/HotelReservationUtils';

interface ReservationPopupProps {
    open: boolean;
    onClose: () => void;
    reservationToEdit: HotelReservation | null;
    onConfirm: (isEdit: boolean, editId: number, data: HotelReservation) => void;
    isEdit: boolean;
}

const ReservationPopup : React.FC<ReservationPopupProps> = ({open, onClose, reservationToEdit, onConfirm, isEdit}) => {
        const [newReservation, setNewReservation] = useState<HotelReservation>(getDefaultHotelReservation());

        useEffect(() => {
            if (isEdit && reservationToEdit)
                setNewReservation({ ...reservationToEdit });
            else
                setNewReservation(getDefaultHotelReservation());
        }, [isEdit, reservationToEdit]);

        const handleConfirmData = () => {
            onConfirm(isEdit, reservationToEdit ? reservationToEdit.id : 0, newReservation);
            setNewReservation(getDefaultHotelReservation());
            onClose();
        };

    return (
        <Dialog className='reservation-dialog' open={open} onClose={onClose}>
            <DialogTitle>{isEdit ? 'Edit Reservation' : 'Add Reservation'}</DialogTitle>
            <DialogContent className='dialog-content'>
                <br></br>
                {/* <DatePicker //TODO change arrivalDate date to datepickers
                    label="From Date"
                    value={newReservation.stay.arrivalDate}
                    onChange={(date: Date ) => setNewReservation({ ...newReservation, stay: { ...newReservation.stay, arrivalDate: date.toISOString()}})}
                    renderInput={(params : Text) => <TextField {...params} className='date-picker-container'/>}
                /> */}
                {/* <DatePicker //TODO change departureDate date to datepickers
                    label="To Date"
                    value={newReservation.stay.departureDate}
                    onChange={(date: Date ) => setNewReservation({ ...newReservation, stay: { ...newReservation.stay, departureDate: date.toISOString()}})}
                    renderInput={(params : Text) => <TextField {...params} className='date-picker-container'/>}
                /> */}
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Arrival Date</InputLabel>
                    <Input
                        value={newReservation.stay.arrivalDate}
                        onChange={(e) => setNewReservation({ ...newReservation, stay: { ...newReservation.stay, arrivalDate: e.target.value}})}
                    />
                    <br></br>
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Departure Date</InputLabel>
                    <Input
                        value={newReservation.stay.departureDate}
                        onChange={(e) => setNewReservation({ ...newReservation, stay: { ...newReservation.stay, departureDate: e.target.value}})}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Room Size</InputLabel>
                    <Input
                        value={newReservation.room.roomSize}
                        onChange={(e) => setNewReservation({ ...newReservation, room: { ...newReservation.room, roomSize: e.target.value}})}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Room Quantity</InputLabel>
                    <Input
                        value={newReservation.room.roomQuantity}
                        onChange={(e) => setNewReservation({ ...newReservation, room: { ...newReservation.room, roomQuantity: Number(e.target.value)}})}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>First Name</InputLabel>
                    <Input
                        value={newReservation.firstName}
                        onChange={(e) => setNewReservation({ ...newReservation, firstName: e.target.value })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Last Name</InputLabel>
                    <Input
                        value={newReservation.lastName}
                        onChange={(e) => setNewReservation({ ...newReservation, lastName: e.target.value })}
                    />
                </FormControl>
            </DialogContent>
            <DialogContent className='dialog-content'>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Email</InputLabel>
                    <Input
                        value={newReservation.email}
                        onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                    />
                    <br></br>
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Phone Number</InputLabel>
                    <Input
                        value={newReservation.phone}
                        onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Street Name</InputLabel>
                    <Input
                        value={newReservation.addressStreet.streetName}
                        onChange={(e) => setNewReservation({ ...newReservation, addressStreet: { ...newReservation.addressStreet, streetName: e.target.value}})}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Street Number</InputLabel>
                    <Input
                        value={newReservation.addressStreet.streetNumber}
                        onChange={(e) => setNewReservation({ ...newReservation, addressStreet: { ...newReservation.addressStreet, streetNumber: e.target.value}})}
                    />
                    <br></br>
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Zip</InputLabel>
                    <Input
                        value={newReservation.addressLocation.zipCode}
                        onChange={(e) => setNewReservation({ ...newReservation, addressLocation: { ...newReservation.addressLocation, zipCode: e.target.value}})}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>State</InputLabel>
                    <Input
                        value={newReservation.addressLocation.state}
                        onChange={(e) => setNewReservation({ ...newReservation, addressLocation: { ...newReservation.addressLocation, state: e.target.value}})}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>City</InputLabel>
                    <Input
                        value={newReservation.addressLocation.city}
                        onChange={(e) => setNewReservation({ ...newReservation, addressLocation: { ...newReservation.addressLocation, city: e.target.value}})}
                    />
                    <br></br>
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Extras</InputLabel>
                    <Input
                        value={newReservation.extras}
                        onChange={(e) => setNewReservation({ ...newReservation, extras: Array.of(e.target.value) })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Payment</InputLabel>
                    <Input
                        value={newReservation.payment}
                        onChange={(e) => setNewReservation({ ...newReservation, payment: e.target.value })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Personal Note</InputLabel>
                    <Input
                        value={newReservation.note}
                        onChange={(e) => setNewReservation({ ...newReservation, note: e.target.value })}
                    />
                    <br></br>
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Tags</InputLabel>
                    <Input
                        value={newReservation.tags}
                        onChange={(e) => setNewReservation({ ...newReservation, tags: Array.of(e.target.value) })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Send me a reminder</InputLabel>
                    <Input
                        value={newReservation.reminder}
                        onChange={(e) => setNewReservation({ ...newReservation, reminder: e.target.value ? true : false })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>Subscribe to newsletter</InputLabel>
                    <Input
                        value={newReservation.newsletter}
                        onChange={(e) => setNewReservation({ ...newReservation, newsletter: e.target.value ? true : false })}
                    />
                </FormControl>
                <FormControl className='reservation-formcontrol'>
                    <InputLabel>I confirm the information given above</InputLabel>
                    <Input
                        value={newReservation.confirm}
                        onChange={(e) => setNewReservation({ ...newReservation, confirm: e.target.value ? true : false })}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions className='dialog-actions'>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirmData} color="primary">
                    {isEdit ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReservationPopup;