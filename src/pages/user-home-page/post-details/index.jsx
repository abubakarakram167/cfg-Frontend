import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  TextField,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {red} from '@material-ui/core/colors';
import {
  MoreVert,
  ExpandMore,
  Share,
  Favorite,
  ArrowRight,
} from '@material-ui/icons';
import Comment from './comment';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({
  post,
  addCommentData,
  addReplyAction,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const addComment = (e) => {
    if (e.key === 'Enter' && comment.length > 0) {
      addCommentData(comment, post.id);
      setComment('');
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={`Jermaine Gray > ${post.group}`}
        subheader='September 14, 2016'
      />
      {post.media && (
        <CardMedia
          className={classes.media}
          image={post.media}
          title='Paella dish'
        />
      )}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          <span className='caption-text'>{post.caption}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <Favorite />
        </IconButton>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {post.comments.map((element, index) => {
            const addReplyDataAction = (replyText) => {
              addReplyAction(post.id, element.id, replyText);
            };
            return (
              <Comment
                key={index}
                comment={element}
                addReplyAction={addReplyDataAction}
              />
            );
          })}
          <TextField
            label='comment'
            variant='filled'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={addComment}
            fullWidth
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
