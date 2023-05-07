import React from "react"
import GoBackBtn from "../GoBackBtn"
import {useNavigate } from "react-router-dom"

const wrongTitleAlert = 'must insert title and some description to sumbit'

const NewPostPage = function(props){
    const addPost = props?.addPost
    const textData = React.useRef('')
    const title = React.useRef('')
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!title.current.value || !textData.current.value){
            alert(wrongTitleAlert)
            return
        }
        addPost(title.current.value, textData.current.value)
        navigate('/')
    }
    return (
        <div className="newPost">
            <GoBackBtn/>
            Title : <input type = "text" name = "title" ref={title} />
            <div>Description :</div>
            <textarea ref={textData} placeholder="Enter description here..." />
            <div>
                <input type = "submit" onClick={handleSubmit} name = "submit" value = "Submit"/>
                <input type = "reset" name = "reset"  value = "Reset" onClick={()=> textData.current.value=''}/>
            </div>
        </div>
    )
}

export default NewPostPage