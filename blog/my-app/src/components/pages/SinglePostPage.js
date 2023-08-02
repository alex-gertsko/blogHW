import React from 'react';
import { Grid,
    //  Paper, Button, Card, CardContent, Typography, Box 
    } from '@mui/material';
import Post from "../Post.js";
import { getData } from "../../App.js";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import CommentsBox from '../post/CommentsBox.js';
let loading = true, failed = false



const SinglePostPage = (props) => {
    const {postRef} = props
    const location = useLocation()
    const id = location.pathname.split('/').pop()
    const [data, setData] = useState(postRef.current.value);
    

    const qeuryBack = async () => {
        const data = await getData('/post/' + id)
        return data
    }

    if (!data){
        loading = true
        qeuryBack().then(data => {
            setData(data)
            loading = false
        })
    }



//   const classes = useStyles();
//   const history = useHistory();

//   const handleGoBack = () => {
    // history.goBack();
//   };

  return (
    <div >
    {loading ? <p>loading....</p> : (failed ? <p>something went wrong....</p> :  
      <Grid container spacing={2} sx={{flexGrow: 1}}>
        <Grid item xs={12} md={6}>
          {/* <Button className={classes.goBack} variant="outlined" onClick={handleGoBack}>Go Back</Button> */}
          <Post data={data} isSinglePage={true}/>
          {/* <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Post Title
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This is a sample post content. More text here...
              </Typography>
            </CardContent>
          </Card> */}
        </Grid>
        <Grid item xs={12} md={6}>
        <CommentsBox postId={id}/>
          
        </Grid>
      </Grid>)}
    </div>
  );
};

export default SinglePostPage;

