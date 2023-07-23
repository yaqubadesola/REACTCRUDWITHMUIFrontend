import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import api from "../api";

const formInput = {name:"", username:"", email:"", phone:"", website:""}
export default function AddEditDialog({ open, handleClose }) {
  const [formData, setFormData] = useState(formInput)

  const  handleChange = (event) => {
    const { name, value } = event.target
    setFormData({...formData, [name]:value})
  }

   const saveDataToDB = async (data) => {
    try {
      const requestBody = {
        id: uuidv4(),//unique ID
        ...data
      }
      
      const response = api.post("students", requestBody)
      if (response) {
        alert("Record Saved Succesfully")
      }
    } catch (error) {
      console.log("error = ",error.message)
      //alert("Record Could not save")
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    saveDataToDB(formData)
    handleClose()
    console.log("All formData to be submited ", formData)
  }

 
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h4>Add New Student</h4></DialogTitle>
        <DialogContent style={{width:"500px", margin:"auto"}}>
          <DialogContentText>
            All fields are required "*"
          </DialogContentText>
          <div style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <Box component="form">
            <TextField
              autoFocus
              id="name"
              name="name"
              label="Name"
              value={formData.name || ""}
              onChange={handleChange}
              type="text"
              fullWidth
              variant="outlined"
            /><br/><br/>
            <TextField
              id="username"
              label="Username"
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            /><br/><br/>
          
            <TextField
              id="email"
              label="Email Address"
                type="email"
                name="email"
              fullWidth
               value={formData.email || ""}
              onChange={handleChange}
              variant="outlined"
            /><br/><br/>
            <TextField
              id="phone"
              label="Phone Number"
                type="text"
                name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            /><br/><br/>
            <TextField
              id="website"
              label="Website"
                type="text"
                name="website"
              value={formData.website || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              />
              </Box>
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}