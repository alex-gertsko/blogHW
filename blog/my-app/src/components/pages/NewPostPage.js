import React from "react"
import GoBackBtn from "../GoBackBtn"
import {useNavigate, useLocation } from "react-router-dom"
import { Stack, TextField, Button} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { postData } from "../../App";

const MyFormHelperText = React.forwardRef(
    function(props, ref){
        const {defaultValue} = props
        const [inputValue, setInputValue] = React.useState(defaultValue);
        const [isError, setIsError] = React.useState(false);
        const allowedNumOfLetters = 30

        const handleChange = (event) => {
          const value = event.target.value;
          if (value.length <= allowedNumOfLetters) {
            setInputValue(value);
            setIsError(false);
          } else {
            setIsError(true);
          }
        };
        
          return (
            <TextField
                label="Tags (separated by , )"
                variant="outlined"
                value={inputValue}
                onChange={handleChange}
                error={isError}
                inputRef={ref}
                helperText={isError ? `up to ${allowedNumOfLetters} letters can be used!` : ''}
            />
          )
        }
        
)


const wrongTitleAlert = 'Must insert title and some description to sumbit'

const NewPostPage = function(props){
    const textData = React.useRef('')
    const title = React.useRef('')
    const imageUrl = React.useRef('')
    const tags = React.useRef('')
    const navigate = useNavigate()
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
            tags: tags.current.value.split(",").map(label => label.trim())
        }
        let res, route
        // handle update part!
        if (isUpdatePage){
            res = await fetch('/post/' + existingPostData.id, 
            {
                method: 'PUT',
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
    console.log('existingData is: ', existingPostData)

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
                <div>
                    <MyFormHelperText 
                        ref={tags}
                        defaultValue={existingPostData ? existingPostData['tag_names'] : ""}
                    />
                </div>
                <TextField
                    id="imageUrl"
                    label="Image Url"
                    defaultValue={existingPostData ? existingPostData.imageUrl : ""}
                    placeholder='insert image url'
                    inputRef={imageUrl}
                />
                </div>
                <div>
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

