import React from "react"
import GoBackBtn from "../GoBackBtn"
import {useNavigate } from "react-router-dom"
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

    const handleSubmit = async () => {
        if (!title.current.value || !textData.current.value){
            alert(wrongTitleAlert)
            return
        }
        const data = {
            title: title.current.value,
            data: textData.current.value,
            imageUrl: imageUrl.current.value,
            userId: 1 //TODO: change this when loggin is implemented
        }
        // addPost(title.current.value, data)
        const res = await postData('/post', data)
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
                    defaultValue=""
                    inputRef={title}
                />
                <TextField
                    id="postData"
                    label="Post Text"
                    multiline
                    rows={5}
                    defaultValue=""
                    variant="standard"
                    placeholder="Enter description here..."
                    inputRef={textData}
                />
                <div align='left'>
                <TextField
                    id="imageUrl"
                    label="Image Url"
                    defaultValue=""
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
                        Submit
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




// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   try{
//       const response = await fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         // mode: "cors", // no-cors, *cors, same-origin
//         // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         // // credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         // redirect: "follow", // manual, *follow, error
//         // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//       });
//       if(response.ok === false){
//         throw new Error(response.statusText)
//       }
//       return response.json(); // parses JSON response into native JavaScript objects
//   } catch(err){
//     console.log("error at posting post /n", err)
//     return false
//   }
// }