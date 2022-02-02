import React, {useState, useEffect} from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {red} from '@material-ui/core/colors';
import {ExpandMore, Favorite, Edit, Delete} from '@material-ui/icons';
import Comment from './comment';
import './style.css';
import Friend from 'redux/services/friends';
import Comments from 'redux/services/comment';
import {useDispatch, useSelector} from 'react-redux';
import Posts from 'redux/services/post';
import {formatDatePost} from 'utils/stampToFormat';
import SunEditor from '../../../components/sunEditor';
import * as actions from '../../../redux/actions/action.types';
import {getSignedUrl} from '../../../redux/actions/media';
import {onGetUserList} from '../../../redux/actions';
import JournalModal from '../../../components/JournalModal';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

let reRender = true;
let userList = [];

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

export default function RecipeReviewCard({post, getUserPost}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const currentUser = useSelector((state) => state.auth.user);
  const [editText, setEditText] = useState(post.content);
  const [content, setContent] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isContentChange, setContentChanged] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [userNewList, setUserNewList] = useState([]);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalId, setJournalId] = useState(null);
  const [subject, setSubject] = useState(null);
  const [showMessage, setShowMessage] = useState(null);

  const userSpecificImage = userList.filter(
    (user) => user.id === post.user_id,
  )[0]
    ? userList.filter((user) => user.id === post.user_id)[0].newUrl
    : '';

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    photo_url: '',
  });

  const [loveCount, setLoveCount] = useState(post.love_count || 0);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);

  async function getUserData() {
    const data = await Friend.getUserDetails(post.user_id);
    if (data) {
      if (data.data) {
        setUser(data.data);
      }
    }
  }

  const getUserStatus = (status) => {
    if (status === 0) return 'pending';
    else if (status === 1) return 'approved';
    else return 'disabled';
  };

  async function getPostComments() {
    const data = await Comments.getPostComments(post.id);
    if (data) {
      if (data.data) {
        setComments(data.data);
      }
    }
  }

  // const afterDeleteCommentGetPost = async(postId) => {
  //   const data = await Comments.getPostComments(postId);
  //   if (data) {
  //     if (data.data) {
  //       setComments(data.data);
  //     }
  //   }
  // }

  useEffect(() => {
    getSignedUrl({fileName: currentUser.photo_url}).then((res) => {
      setAvatarImage(res.newUrl);
    });
    dispatch(onGetUserList({page: 0}));
    getUserData();
    getPostComments();
  }, []);

  const getRestoredImage = (featureImageUrl) => {
    return featureImageUrl
      ? featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1)
      : '';
  };

  const getUserRestoredImages = async (userListData) => {
    let images = [];
    userListData.map((user) => {
      if (user && user.photo_url !== '') {
        user.fileName = getRestoredImage(user.photo_url);
        images.push(getSignedUrl(user));
      }
    });
    const getUserImages = await Promise.all(images);
    userList = getUserImages;
    setUserNewList(getUserImages);
  };

  const userListData = useSelector(({userList}) => {
    return userList.usersList.map((user) => {
      return {
        ...user,
        status: getUserStatus(user.status),
      };
    });
  });

  if (userListData.length !== 0 && reRender) {
    reRender = false;
    getUserRestoredImages(userListData);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const addComment = async (e) => {
    if (e.key === 'Enter' && comment.length > 0) {
      await Comments.addComment({
        post_id: post.id,
        content: comment,
      });
      getPostComments();
      setComment('');
    }
  };

  const likeAction = async () => {
    const data = await Posts.updatePost(post.id, {love_count: loveCount + 1});

    if (data.status === 200) {
      setLoveCount(loveCount + 1);
    }
  };

  const editPostAction = async () => {
    const data = await Posts.updatePost(post.id, {content: editText});

    if (data.status !== 200) {
      setEditText(post.content);
    }
    setEditDialogOpen(false);
  };

  const deleteUserPost = async (post) => {
    const data = await Posts.deleteUserPost(post.id);
    if (data.status === 200) {
      dispatch({
        type: actions.DELETE_USER_POST,
        payload: {id: post.id},
      });
    }
  };

  const mediaJSX = () => {
    let mediaType = null;
    let image = post.media.split('.').pop().substr(0, 3);

    if (
      image === 'JPG' ||
      image === 'png' ||
      image === 'jpg' ||
      image === 'PNG'
    ) {
      mediaType = 'image';
    } else if (image === 'mp4') {
      mediaType = 'video';
    }
    switch (mediaType) {
      case 'image':
        return <img src={post.newUrl} width='100%' />;
      case 'video':
        return (
          <video width='100%' controls>
            <source src={post.newUrl} type='video/mp4' />
          </video>
        );
    }
  };

  const editDialogJSX = (
    <Dialog open={editDialogOpen} fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        {post && (
          <div>
            <div className='editor-side'>
              <SunEditor
                onClickSmartClick={(id) => {
                  setJournalId(id);
                  setShowJournalModal(true);
                }}
                onContentSave={(content) => {
                  setEditText(content);
                }}
                content={editText}
                onContentChanged={() => setContentChanged(true)}
                onGetSubject={(subject) => setSubject(subject)}
                journalId={journalId}
                showToolbar={true}
                modalType='external'
              />
            </div>
            <JournalModal
              onOpen={() => setShowJournalModal(true)}
              onClose={() => {
                setContent(editText);
                setShowJournalModal(false);
                setJournalId(null);
              }}
              show={showJournalModal}
              journalId={journalId}
              getJournalData={(journalData) => {
                setJournalId(journalData ? journalData.id : null);
                setShowJournalModal(false);
              }}
              subject={subject}
            />
          </div>
          // <SunEditor
          //   onContentSave={(content) => setEditText(content)}
          //   content={editText}
          //   onContentChanged={() => setContentChanged(true)}
          // />
        )}

        <DialogActions style={{width: '100%'}}>
          <Button
            onClick={() => {
              setEditText(post.content);
              setEditDialogOpen(false);
            }}
            variant='contained'
            color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => editPostAction()}>
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {editDialogJSX}
      <Card className={classes.root}>
        {showMessage && (
          <div>
            <Snackbar
              open={true}
              autoHideDuration={2000}
              onClose={() => setShowMessage(false)}>
              <Alert variant='filled' severity='success'>
                comment deleted Successfully
              </Alert>
            </Snackbar>
          </div>
        )}

        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              className={classes.avatar}
              src={avatarImage}
            />
          }
          action={
            currentUser &&
            currentUser.user_name === user.user_name && (
              <div>
                <IconButton aria-label='delete'>
                  <Delete onClick={() => deleteUserPost(post)} />
                </IconButton>
                <IconButton aria-label='edit'>
                  <Edit onClick={() => setEditDialogOpen(true)} />
                </IconButton>
              </div>
            )
          }
          title={`${user.first_name} ${user.last_name} ${
            post.assigned_group ? '> ' + post.assigned_group : ''
          }`}
          subheader={formatDatePost(Date.parse(post.createdAt))}
        />
        {post.media && mediaJSX()}
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            <span className='caption-text'>
              <div dangerouslySetInnerHTML={{__html: editText}} />
            </span>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={likeAction}>
            <Favorite style={{color: 'red'}} />
            <div style={{marginLeft: '10px'}}>{loveCount}</div>
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
            {comments.map((comment, index) => {
              const addReplyDataAction = async (replyText) => {
                await Comments.addComment({
                  post_id: post.id,
                  content: replyText,
                  parent_id: comment.id,
                });
                getPostComments();
              };
              if (comment.parent_id === null) {
                return (
                  <Comment
                    key={index}
                    comment={comment}
                    addReplyAction={addReplyDataAction}
                    replies={comment.replies}
                    postId={post.id}
                    afterDeleteCommentGetPost={() => {
                      setShowMessage(true);
                      getPostComments();
                    }}
                  />
                );
              }
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
    </>
  );
}
