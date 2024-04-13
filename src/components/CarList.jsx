import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import Addnewcar from "./Addnewcar";
import Editcar from "./Editcar";


// Githun päivitys

export default function CarList() {

    //states
    const [cars, setCars] = useState([{ brand: '', model: '', color:'', fuel:'', year:'', price:''  }]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");


    const [colDefs, setColDefs] = useState([
        { field: 'brand', sortable: true, filter: true},
        { field: 'model',sortable: true, filter: true },
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}
                >Delete</Button>
            , width: 120
        }
    ]);

    useEffect(() => getCars, []); //fetch only after the first rendering

    // functions
    //getcars
    const getCars = () => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars", { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responseDate => {
                console.log(responseDate._embedded.cars)
                setCars(responseDate._embedded.cars);
            })
            .catch(error => console.error(error))
    }

    // deleteCar
    const deleteCar = (params) => {
        console.log(params.data);
        console.log(params.data._links.car.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {

                        setOpenSnackbar(true);
                        setMsgSnackbar("The car was deleted successfuly!")
                        getCars(); // haetaan tietokannasta tuore/päivitetty auto tilanne
                    }

                    else {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Something goes with deleting")
                        // window.alert("Something goes with deleting")   Molemmat on mahdollista sekä alerti, snackbar
                    }


                })
                .catch(error => console.error(error));
        }

    }

    const saveCar = (car) => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setMsgSnackbar("The car was saved successfully!");
                getCars(); // Fetch the updated car list after successfully saving
            } else {
                setOpenSnackbar(true);
                setMsgSnackbar("Something went wrong with saving the car.");
            }
        })
        .catch(error => console.error(error));
    }
    
    // return:
    return (
        <>
        <Addnewcar saveCar={saveCar} />
        
            <div className="ag-theme-material" style={{ width: 1400, height: 500 }}>
            
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false);
                        setMsgSnackbar("")
                    }}>

                </Snackbar>


            </div>
        </>
    )
}