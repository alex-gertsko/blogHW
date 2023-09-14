import React from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { postData, getData } from '../../App';
import { useEffect } from 'react';

const CommentsBox = (props) => {
    const [Comments, setComment] = React.useState('');
    const newComment = React.useRef('')
    const {postId} = props
    const handleSubmit = async () => {
        addComment()
      };

    const getComments = async () => {
        const res = await getData(`/post/comments/${postId}`)
        if (!res){
            setComment(false)
            return false
        }
        setComment(Object.values(res))
        return true
    }
    const addComment = async () => {
        const res = await postData(`/post/comments/${postId}`, {comment: newComment.current.value})
        if (!res){
            alert("failed to post comment ;(")
            return
        }
        if (await getComments()){
            newComment.current.value = ''
        }
    }
    const wrapper = () => getComments()
    useEffect(() => {
      wrapper()
      return
    }, [])

  return (
    <Box my={2} style={{maxHeight: '80vh', overflowY: 'auto'}}>
      <Typography variant="h5">Comments Section</Typography>
      {!Comments ? <p>Loading....</p> : Comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((comment, i) => (
        <Paper key={i} style={{ padding: "10px", margin: "10px 0" }}>
          <Typography variant="subtitle1"><b>{comment.authorName}</b></Typography>
          <Typography variant="body1">{comment.comment}</Typography>
          <Typography align="right" variant="body1">{new Date(comment.created_at).toLocaleString()}</Typography>
        </Paper>
      ))}
      <Box style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '10px' }}>
        <TextField
          variant="outlined"
          placeholder="Write a comment..."
          fullWidth
          multiline
        //   value={newComment.current.value}
          onChange={()=>{}}
          inputRef={newComment}
          style={{maxHeight: '15vh', overflowY: 'auto'}}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
}

export default CommentsBox;
