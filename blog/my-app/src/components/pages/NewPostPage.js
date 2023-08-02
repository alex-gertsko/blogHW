import React from "react"
import GoBackBtn from "../GoBackBtn"
import {useNavigate, useLocation } from "react-router-dom"
import { Stack, TextField, Button} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { postData } from "../../App";

const wrongTitleAlert = 'must insert title and some description to sumbit'

const NewPostPage = function(props){
    const textData = React.useRef('')
    const title = React.useRef('')
    const imageUrl = React.useRef('')
    const navigate = useNavigate();
    const location = useLocation();
    const {isUpdatePage, existingPostData} = location.state ? location.state : {}


    const handleSubmit = async () => {
        if (!title.current.value || !textData.current.value){
            alert(wrongTitleAlert)
            return
        }
        const data = {
            title: title.current.value,
            data: textData.current.value,
            imageUrl: imageUrl.current.value,
        }
        let res, route
        // handle update part!
        if (isUpdatePage){
            res = await fetch('/post/' + existingPostData.id, 
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data), 

            })
            route = '/personalpost'
        } else {
            // handle new post!
            res = await postData('/post', data)
            route = '/'
        }
        if (res.status === 401){
            alert('you must login first')
        }
        if (res.ok === false){
            return
        }
        navigate('/')
    }
    return (
        <div className="newPost">
            <GoBackBtn/>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <TextField
                    required
                    id="postTitle"
                    label="Title"
                    defaultValue={existingPostData ? existingPostData.title : ""}
                    inputRef={title}
                />
                <TextField
                    id="postData"
                    label="Post Text"
                    multiline
                    rows={5}
                    defaultValue={existingPostData ? existingPostData.data : ""}
                    variant="standard"
                    placeholder="Enter description here..."
                    inputRef={textData}
                />
                <div align='left'>
                <TextField
                    id="imageUrl"
                    label="Image Url"
                    defaultValue={existingPostData ? existingPostData.imageUrl : ""}
                    placeholder='insert image url'
                    inputRef={imageUrl}
                />
                {/* <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button> */}
                </div>
                <div>
                    {/* <input type = "reset" name = "reset"  value = "Reset" onClick={()=> textData.current.value=''}/> */}
                    <Button variant="contained" onClick={handleSubmit}>
                        {isUpdatePage ? 'Update' : 'Submit'}
                    </Button>
                    <IconButton aria-label="delete" size="large" onClick={()=> textData.current.value=''}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </Stack>
        </div>
    )
}

export default NewPostPage