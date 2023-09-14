import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Chip} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate  } from "react-router-dom"
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { loginsetter } from './header/Header';
import MoreOptionsButton from './post/MoreOptionsButton';


const StyledCard = styled(Card)({
  maxWidth: 345,
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    transform: 'scale(1.05)'
  },
});

const defaultPic = 'https://cdn.dribbble.com/users/1098005/screenshots/5337394/empty_bag_4x.jpg?compress=1&resize=400x300'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function truncateText(text, maxWords = 30) {
  let words = text.split(" "); // Split text into words
  let truncatedText = '';

  if (words.length > maxWords) {
    words = words.slice(0, maxWords);
    truncatedText = words.join(' ') + '...';
  } else {
    truncatedText = text;
  }

  return truncatedText;
}

export default function Post(props) {
    
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  let {data, isSinglePage, isPersonalPage, postsState} = props
  const url = '/post/'
  const handleExpandClick = () => {
    if (!isSinglePage){
      navigate(url+data.id)
      return
    }
    setExpanded(!expanded);
  };

  const handleDate = (data) => {
    let date = (new Date(data?.created_at)).toLocaleDateString('GR')
    if (date === 'Invalid Date'){
      date = Date.now()
      data.date = date
      return new Date(date).toLocaleDateString('GR')
    }
    return date
  }

  const handleTagClick = (tagName) => {
    return e => {
      navigate(`/post/tag/${tagName}`)
      e.stopPropagation()
    }
  }

  const baseMargin = 1
  const makeVw = (num) => `${baseMargin+num}vw`
  const makeVh = (num) => `${baseMargin+num}vh`
  const sidesMargin = {
    xxs: makeVw(1),
    xs: makeVw(1),
    sm: makeVw(2),
    md: makeVw(4),
    lg: makeVw(6),
    xl: makeVw(7)
  }
  const buttonMargin = {
    xxs: makeVh(1),
    xs: makeVh(1),
    sm: makeVh(2),
    md: makeVh(3),
    lg: makeVh(3),
    xl: makeVh(4)
  }
  

  return (
    <Box my = {buttonMargin} mx={sidesMargin} className='postBox' key={data?.title + data.index ?? Date.now()}>
        <StyledCard  onClick={() => handleExpandClick()}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {data.authorName[0].toUpperCase()}
            </Avatar>
            }
            action={
              isPersonalPage ?  <MoreOptionsButton postId={data.id} postsState={postsState} data={data}/> : null
            }
            title={`${data?.title}`}
            subheader={`${data?.authorName || ''} ${handleDate(data)}`}
        />
        <CardMedia
            component="img"
            height="194"
            image={data.imageUrl || defaultPic}
            alt=""
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
            {data.data ? truncateText(data.data) : ''}
            </Typography>
            {typeof data.tag_names === 'string' && data.tag_names.trim().length > 0 && data.tag_names.split(',').map((tag, index) => (
            <Chip 
                key={index} 
                label={`#${tag}`}
                onClick={handleTagClick(tag)}
                style={{cursor: "pointer", marginRight: "5px"}}
            />
        ))}
        </CardContent>
        <CardActions disableSpacing>
            {loginsetter.loggedin ? <IconButton aria-label="add to favorites" onClick={event => event.stopPropagation()}> 
                <FavoriteIcon />
            </IconButton> : <></>}
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            {isSinglePage ? <ExpandMoreIcon /> : <></>}
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            
            <Typography paragraph>
                {data.data || ''}
            </Typography>
            </CardContent>
        </Collapse>
        </StyledCard>
    </Box>
  );
}
