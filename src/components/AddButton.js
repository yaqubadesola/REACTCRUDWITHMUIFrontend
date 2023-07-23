import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
function AddButton({handleClickOpen}) {
    return (
        <Tooltip title="Add new student">
            <IconButton onClick={handleClickOpen}>
                <AddIcon/>
            </IconButton>
        </Tooltip>
    );
}

export default AddButton;