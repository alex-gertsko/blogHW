import React from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { postData, getData } from '../../App';
import { useEffect } from 'react';

const commentsData = [
  {
    authorName: "John Doe",
    comment: "This is a fantastic post! Thanks for sharing.",
    created_at: "2023-07-16T12:00:00Z"
  },
  // (34, 1, "This is a fantastic post! Thanks for sharing."),(34, 25, "I learned a lot from this post. Looking forward to more content like this."),(34, 4, "I have a question about the topic discussed in the post."),(34, 25, "Great post! Keep up the good work.")
  {
    authorName: "Jane Smith",
    comment: "I learned a lot from this post. Looking forward to more content like this.",
    created_at: "2023-07-16T13:00:00Z"
  },
  {
    author: "Alice Johnson",
    comment: "I have a question about the topic discussed in the post.",
    created_at: "2023-07-16T14:00:00Z"
  },
  {
    authorName: "Bob Williams",
    comment: "Great post! Keep up the good work.",
    created_at: "2023-07-16T15:00:00Z"
  },
  {
    authorName: "Bob Williams",
    comment: "Great post! Keep up the good work. fgjhgthbenuterrrrrrrggjh rkegerhjerj  eirgerg oier ireeriy se seio er yoe hyesuihy oieahy",
    created_at: "2023-07-16T15:00:00Z"
  },
];

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
    
    useEffect(() => {getComments()
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
