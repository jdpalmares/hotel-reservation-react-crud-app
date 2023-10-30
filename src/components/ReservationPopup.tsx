import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { HotelReservation } from '../Types/HotelReservation';
import { getDefaultHotelReservation } from '../utils/HotelReservationUtils';

export interface ReservationPopupProps {
    open: boolean;
    onClose: () => void;
    reservationToEdit: HotelReservation | null;
    onConfirm: (isEdit: boolean, editId: number, data: HotelReservation) => void;
    isEdit: boolean;
}

const LOCAL_STORAGE_KEY = 'storedReservation';

const ReservationPopup : React.FC<ReservationPopupProps> = ({open, onClose, reservationToEdit, onConfirm, isEdit}) => {
        const [newReservation, setNewReservation] = useState<HotelReservation>( () => {
            if (localStorage.getItem(LOCAL_STORAGE_KEY)){
                const storedReservation = localStorage.getItem(LOCAL_STORAGE_KEY);
                return storedReservation ? JSON.parse(storedReservation) : getDefaultHotelReservation();
            } else
                return getDefaultHotelReservation();
        });
        const isFormValid = Object.values(newReservation).every((value) => value !== '') &&
        newReservation.stay.arrivalDate < newReservation.stay.departureDate;
        //uncomment line below and remove semicolon to have a legitimate arrival date
        // && newReservation.stay.arrivalDate > toLocaleString(dayjs().add(12, 'hour'));

        useEffect(() => {
            if (isEdit && reservationToEdit)
                setNewReservation({ ...reservationToEdit });
            else if (!isEdit){
                const storedReservation = localStorage.getItem(LOCAL_STORAGE_KEY);
                return storedReservation ?
                    setNewReservation(JSON.parse(storedReservation)) :
                    setNewReservation(getDefaultHotelReservation());
            }
        }, [isEdit, reservationToEdit]);

        useEffect(() => {
            if (!isEdit) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newReservation));
            }
        }, [newReservation, isEdit]);

        const handleConfirmData = () => {
            onConfirm(isEdit, reservationToEdit ? reservationToEdit.id : 0, newReservation);
            setNewReservation(getDefaultHotelReservation());
            onClose();
        };

        function toLocaleString(date: Dayjs): string {
            
            const dayjsIst = date.locale(navigator.language); //TODO change depending on locale of client
            const istString = dayjsIst.format('YYYY-MM-DDTHH:mm:ss');
            // let dateAsString =  date.set('hour', date.hour() - (date.utcOffset() * 60)).toISOString();
            return istString;
        }

    return (
        <Dialog className='reservation-dialog' open={open} onClose={onClose} data-testid="hotel-popup">
            <DialogTitle>{isEdit ? 'Edit Reservation' : 'Add Reservation'}</DialogTitle>
            <DialogContent className='dialog-content'>
                <br></br>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        value={dayjs(newReservation.stay.arrivalDate)}
                        label="Arrival Date"
                        onChange={
                            (date : Dayjs | null) => {
                                setNewReservation({
                                    ...newReservation,
                                    stay: {
                                        ...newReservation.stay,
                                        arrivalDate: date ? toLocaleString(date) : ""
                                    }
                                });
                            }
                        }
                        //uncomment line below to have a legitimate arrival date
                        // minDateTime={dayjs().add(12, 'hour')}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        value={dayjs(newReservation.stay.departureDate)}
                        label="Departure Date"
                        onChange={
                            (date : Dayjs | null) => {
                                setNewReservation({
                                    ...newReservation,
                                    stay: {
                                        ...newReservation.stay,
                                        departureDate: date ? toLocaleString(date) : ""
                                    }
                                });
                            }
                        }
                        minDateTime={dayjs(newReservation.stay.arrivalDate).add(1, 'day')}
                    />
                </LocalizationProvider>
                <br></br><br></br>
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
                    <br></br>
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
                <Button onClick={handleConfirmData} color="primary" disabled={!isFormValid}>
                    {isEdit ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReservationPopup;