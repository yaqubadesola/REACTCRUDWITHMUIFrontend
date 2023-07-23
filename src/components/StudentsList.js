import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import CircularProgress from '@mui/material/CircularProgress';

import api from "../api";
import AddButton from "./AddButton";
import AddEditDialog from "./AddEditDialog";
const StudentsList = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] =  useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const getAllStudents = async () => {
        try {
            setIsLoading(true)
            const response = await api.get("students")
            if (response) {
                console.log("Response Data ", response.data)
                setData(response.data)
                setError(null)
            }
        } catch (error) {
            console.log("Error", error)
            setError(error.message)
            setData([])
        } finally {
             setIsLoading(false)
        }
    }
    useEffect(() => {
      getAllStudents()
    }, [open])
    
    const options = {
        filterType: 'checkbox',
        customToolbar: () => {
            return <AddButton handleClickOpen={handleClickOpen} />
        },
    };

    const columns = [
        {
        name: "name",
        label: "Name",
        options: {
        filter: true,
        sort: true,
        }
        },
        {
        name: "username",
        label: "Username",
        options: {
        filter: true,
        sort: false,
        }
        },
        {
        name: "email",
        label: "E-mail",
        options: {
        filter: true,
        sort: true,
        }
        },
        {
        name: "phone",
        label: "Phone",
        options: {
        filter: true,
        sort: false,
        }
        },
         {
        name: "website",
        label: "Website",
        options: {
        filter: true,
        sort: true,
        }
        },
    ];

    return (
        <>
            <h1>MUI DATATABLES</h1>
            {isLoading && <CircularProgress/>}
            {data.length > 0 ?
                <MUIDataTable
                    title={"Students List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
                : ""}
            
            {error && <h2>Error : {error}</h2>}
            {open && <AddEditDialog handleClose={handleClose} open={open} />}
        </>
    );
}
 
export default StudentsList;