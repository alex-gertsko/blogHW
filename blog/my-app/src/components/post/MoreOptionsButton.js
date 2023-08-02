import React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function MoreOptionsButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const {postId, data} = props
  const navigate = useNavigate()
  

  const makeDelete = async (postId) => {
    const res = await fetch("/post/" + postId, {method: "DELETE"})
    if (!res.ok){
        alert("failed to delete")
        return false
    }
    window.location.reload()
    return true
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation()
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation()
  };

  const handleUpdate = (event) => {
    event.stopPropagation()
    navigate(`/post/update/${postId}`,{state:{existingPostData:data, isUpdatePage: true}});
  }

  const handleDelete = (event) => {
    setOpenDialog(true);
    setAnchorEl(null);
    event.stopPropagation()
  };

  const handleCloseDialog = (event) => {
    setOpenDialog(false);
    event.stopPropagation()
  };

  const handleConfirmDelete = (event) => {
    setOpenDialog(false);
    event.stopPropagation()
    makeDelete(postId).then(

    )
  };

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          Draft
        </MenuItem>
        <MenuItem onClick={handleUpdate}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, you will not be able to recover this data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
