import React from "react";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PropertyKeys } from "ag-grid-community";

export default function Editcar(props) {

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });

    const handleClickOpen = () => {
        setCar({brand: props.car.brand,
                model: props.car.model, 
                color: props.car.color,
                fuel: props.car.fuel,
                year: props.car.year,
                price: props.car.price,});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) =>{
        setCar({...car,[event.target.name]: event.target.value})

    };

    const updateCar =() => {
        props.updateCar(car, props.car._links.car.href);
        handleClose();
    }

    return (
        <div>
            <Button  color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Brand"
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleInputChange(e)}                        
                        fullWidth
                    />
                    <TextField
                        label="Model"
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handleInputChange(e)}                        
                        fullWidth
                    />
                    <TextField
                        label="Color"
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handleInputChange(e)}                        
                        fullWidth
                    />
                    <TextField
                        label="Fuel"
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}                        
                        fullWidth
                    />
                    <TextField
                        label="Year"
                        margin="dense"
                        name="year"
                        value={car.year}
                        onChange={e => handleInputChange(e)}                        
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => handleInputChange(e)}                        
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCar} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}