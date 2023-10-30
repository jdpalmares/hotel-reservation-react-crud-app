import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField } from '@mui/material';
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
const FIRST_NAME_LIMIT = 25;
const LAST_NAME_LIMIT = 50;

const ReservationPopup : React.FC<ReservationPopupProps> = ({open, onClose, reservationToEdit, onConfirm, isEdit}) => {
        const [currentTag, setCurrentTag] = useState<string>("");
        const [newReservation, setNewReservation] = useState<HotelReservation>( () => {
            if (localStorage.getItem(LOCAL_STORAGE_KEY)){
                const storedReservation = localStorage.getItem(LOCAL_STORAGE_KEY);
                return storedReservation ? JSON.parse(storedReservation) : getDefaultHotelReservation();
            } else
                return getDefaultHotelReservation();
        });
        const isFormValid = newReservation.stay.arrivalDate && newReservation.stay.departureDate &&
        newReservation.stay.arrivalDate < newReservation.stay.departureDate &&
        newReservation.room.roomSize &&
        newReservation.room.roomQuantity > 0 && newReservation.room.roomQuantity < 6 &&
        newReservation.firstName && newReservation.lastName &&
        newReservation.email &&  newReservation.phone &&
        newReservation.addressStreet.streetName &&  newReservation.addressStreet.streetNumber &&
        newReservation.addressLocation.zipCode &&  newReservation.addressLocation.state &&
        newReservation.addressLocation.city && newReservation.payment &&
        newReservation.confirm;
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

        const handleDeleteTag = (value: string) => {
            setNewReservation({ ...newReservation, tags: newReservation.tags.filter((val) => val !== value)});
        };
        
        const handleAddTag = (value : string) => {
            if(!newReservation.tags.includes(value))
                newReservation.tags.push(value);
            setCurrentTag("");
        };

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
                <FormControl sx={{ m: 1, minWidth: 120 }} >
                    <InputLabel>Room Size</InputLabel>
                    <Select
                        variant="standard"
                        value={newReservation.room.roomSize}
                        onChange={(e) => setNewReservation({ ...newReservation, room: { ...newReservation.room, roomSize: e.target.value}})}>
                            <MenuItem value={"deluxe-room"}>Deluxe Room</MenuItem>
                            <MenuItem value={"double-room"}>Double Room</MenuItem>
                            <MenuItem value={"business-suite"}>Business Suite</MenuItem>
                            <MenuItem value={"presidential-suite"}>Presidential Suite</MenuItem>
                            <MenuItem value={"penthouse-suite"}>Penthouse Suite</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }} >
                    <TextField
                        variant="standard"
                        label="Room Quantity"
                        type="number"
                        fullWidth
                        helperText="Maximum: 5"
                        InputProps={{ inputProps: {min: 0, max: 5 } }}
                        value={newReservation.room.roomQuantity}
                        onChange={(e) => setNewReservation({ ...newReservation, room: { ...newReservation.room, roomQuantity: Number(e.target.value)}})}
                    />
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="First Name"
                        InputProps={{ inputProps: { maxLength: 25 } }}
                        value={newReservation.firstName}
                        helperText={`${newReservation.firstName.length}/${FIRST_NAME_LIMIT}`}
                        onChange={(e) => setNewReservation({ ...newReservation, firstName: e.target.value })}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="Last Name"
                        InputProps={{ inputProps: { maxLength: 50 } }}
                        value={newReservation.lastName}
                        helperText={`${newReservation.lastName.length}/${LAST_NAME_LIMIT}`}
                        onChange={(e) => setNewReservation({ ...newReservation, lastName: e.target.value })}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="Email"
                        value={newReservation.email}
                        onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="Phone Number"
                        value={newReservation.phone}
                        onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="Street Name"
                        value={newReservation.addressStreet.streetName}
                        onChange={(e) => setNewReservation({ ...newReservation, addressStreet: { ...newReservation.addressStreet, streetName: e.target.value}})}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="Street Number"
                        value={newReservation.addressStreet.streetNumber}
                        onChange={(e) => setNewReservation({ ...newReservation, addressStreet: { ...newReservation.addressStreet, streetNumber: e.target.value}})}
                    />
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 10, maxWidth: 100}}>
                    <TextField
                        variant="standard"
                        label="Zip"
                        value={newReservation.addressLocation.zipCode}
                        onChange={(e) => setNewReservation({ ...newReservation, addressLocation: { ...newReservation.addressLocation, zipCode: e.target.value}})}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 10, maxWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="State"
                        value={newReservation.addressLocation.state}
                        onChange={(e) => setNewReservation({ ...newReservation, addressLocation: { ...newReservation.addressLocation, state: e.target.value}})}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 10, maxWidth: 100 }}>
                    <TextField
                        variant="standard"
                        label="City"
                        value={newReservation.addressLocation.city}
                        onChange={(e) => setNewReservation({ ...newReservation, addressLocation: { ...newReservation.addressLocation, city: e.target.value}})}
                    />
                </FormControl>
                <br/>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 150, maxWidth: 300 }}>
                    <InputLabel>Extras</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={newReservation.extras}
                        onChange={(e) => setNewReservation({
                            ...newReservation,
                            extras: Array.isArray(e.target.value) ? e.target.value : Array.of(e.target.value)
                        })} >
                            <MenuItem value={"extraBreakfast"}>Extra Breakfast</MenuItem>
                            <MenuItem value={"extraTV"}>Extra TV</MenuItem>
                            <MenuItem value={"extraWiFi"}>Extra WiFi</MenuItem>
                            <MenuItem value={"extraParking"}>Extra Parking</MenuItem>
                            <MenuItem value={"extraBalcony"}>Extra Balcony</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 150}}>
                    <RadioGroup
                        row
                        value={newReservation.payment}
                        name="controlled-radio-buttons-group"
                        onChange={(e) => setNewReservation({ ...newReservation, payment: e.target.value })} >
                        <FormControlLabel value="cc" control={<Radio />} label="Credit Card" />
                        <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                        <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 2500 }}>
                    <TextField
                        variant="standard"
                        label="Personal Note"
                        multiline
                        value={newReservation.note}
                        onChange={(e) => setNewReservation({ ...newReservation, note: e.target.value })}
                    />
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, minWidth: 500, maxWidth: 500 }}>
                    <TextField
                        variant="standard"
                        label="Tags"
                        fullWidth
                        value={currentTag}
                        onKeyDown={(ev) => {
                            if ((ev.key === 'Enter') && currentTag) {
                                ev.preventDefault();
                                handleAddTag(currentTag);
                            } else if (ev.key === 'Backspace' && !currentTag) {
                                ev.preventDefault();
                                handleDeleteTag(newReservation.tags[newReservation.tags.length-1]);
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                                    {newReservation.tags.map((data, index) => {
                                        return (
                                            <Chip label={data} onDelete={() => handleDeleteTag(data)} key={index} />
                                        );
                                    })}
                                </Box>
                            ),
                        }}
                        onChange={(e) => setCurrentTag(e.target.value)}
                    />
                </FormControl>
                <br/>
                <FormControl className='reservation-formcontrol-switch'>
                    <FormControlLabel
                        label="Send me a reminder"
                        control={
                            <Switch
                                checked={newReservation.reminder}
                                onChange={(e) => setNewReservation({ ...newReservation, reminder: e.target.checked})}
                            />}
                    />
                </FormControl>
                <br/>
                <FormControl className='reservation-formcontrol-switch'>
                    <FormControlLabel
                        label="Subscribe to newsletter"
                        control={
                            <Switch
                                checked={newReservation.newsletter}
                                onChange={(e) => setNewReservation({ ...newReservation, newsletter: e.target.checked})}
                            />}
                    />
                </FormControl>
                <br/>
                <FormControl className='reservation-formcontrol-checkbox'>
                    <FormControlLabel
                        label="I confirm the information given above"
                        control={
                            <Checkbox
                                checked={newReservation.confirm}
                                onChange={(e) => setNewReservation({ ...newReservation, confirm: e.target.checked})}
                            />}
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