import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Button,
  Box,
  Collapse,
  Dialog,
  DialogTitle,
  Paper,
  DialogActions,
} from '@material-ui/core';
import {
  Favorite,
  Edit,
  Delete,
  Message,
  ArrowDropDown,
  ArrowDropUp,
} from '@material-ui/icons';
import {transformImagesInContent} from 'components/ReUsable';
import Comments from './comments';
import {DELETE_USER_POST} from '../../redux/actions/action.types';
// import Confirmation from './deleteConfirmation'

import Comment from 'redux/services/comment';
import {setLoader, getUserPost} from 'redux/actions/UserPost';
import Post from 'redux/services/post';
import moment from 'moment';
import {TextFieldMui} from './comments';

let allPosts = [];

const Confirmation = ({open, setDelete, submit}) => {
  const handleClose = () => setDelete(null);
  return (
    <Dialog
      open={!!open}
      onClose={handleClose}
      PaperComponent={Paper}
      aria-labelledby='draggable-dialog-title'>
      <DialogTitle id='draggable-dialog-title'>
        Are you sure you want to delete this post.
      </DialogTitle>
      <DialogActions>
        <Button
          style={{outline: 'none'}}
          autoFocus
          onClick={handleClose}
          color='primary'>
          Cancel
        </Button>
        <Button style={{outline: 'none'}} onClick={submit} color='primary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Posts = ({
  post,
  index,
  classes,
  userSpecificImage,
  getPostCount,
  posts,
  setPosts,
}) => {
  const dispatch = useDispatch();

  const [count, setcounter] = useState(1);
  const [disable, setDisable] = useState(false);
  const [expanded, setExpanded] = React.useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loveCount, setLoveCount] = useState(post.love_count || 0);
  const [loveLoading, setLoveLoading] = useState(false);
  const [deleted, setDelete] = useState(null);
  const [textFieldDisable, setTextFieldDisable] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.userPost.loading);
  const [user] = useState(currentUser);

  useEffect(() => {
    getPostComments();
  }, []);

  const setCounter = () => {
    if (count <= commentList?.length) {
      setcounter((prevState) => prevState + 1);
    }
  };

  const handleExpand = (panel) => {
    let ele = [...expanded];
    const idx = ele?.findIndex((el) => el?.id == panel);
    if (idx > -1) {
      ele = ele.filter((el) => el?.id != panel);
    } else {
      ele.push(...expanded, {id: panel, status: true});
    }
    setExpanded(ele);
  };

  const onBlur = () => setEditDialogOpen(false);

  const onChange = ({target: {value = ''} = {}}) => setCommentValue(value);

  const renderTxtOrInput = (post) => {
    if (editDialogOpen) {
      return (
        <TextFieldMui
          disabled={textFieldDisable}
          onKeyDown={editPostAction}
          setCommentValue={setCommentValue}
          fullWidth={true}
          value={commentValue}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    } else {
      return (
        <Typography
          variant='h5'
          style={{padding: 16, paddingLeft: 0}}
          component={'strong'}>
          {' '}
          {post?.content}
        </Typography>
      );
    }
  };

  useEffect(() => {
    if (editDialogOpen) setCommentValue(post?.content);
  }, [editDialogOpen]);

  const sliceData = (data) => {
    const datas = [...data];
    const size = 1;
    const dataLength = size * count;
    if (count <= allPosts?.length) {
      const newData = allPosts?.slice(0, dataLength);
      setCommentList(newData);
    }
    if (count == allPosts?.length) {
      setDisable(true);
    }
  };

  useEffect(() => {
    sliceData(commentList);
  }, [count]);

  async function getPostComments() {
    try {
      const data = await Comment.getPostComments(post.id);
      if (data) {
        if (data.data) {
          allPosts = data.data;
          let newPosts;
          if (allPosts?.length > 0) {
            const fId = allPosts[0]?.post_id;
            newPosts = posts?.map((el) => {
              if (el.id == fId) {
                return {
                  ...el,
                  messageCount: allPosts?.length,
                };
              }
              return {...el};
            });
            setPosts(newPosts);
          }
          sliceData(data.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const delete_Comment = async (comment) => {
    // const comments = await Comment.deleteComment(comment?.id)
    // console.log("comment===>", comments)
  };

  const editPostAction = async (e) => {
    if (e.key === 'Enter' && commentValue.length > 0) {
      setTextFieldDisable(true);
      try {
        const data = await Post.updatePost(post.id, {content: commentValue});
        if (data.status !== 200) {
          setCommentValue(post.content);
        }
        dispatch(getUserPost(getPostCount, 'isNewUser'));
        dispatch(setLoader());
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      setEditDialogOpen(false);
      setTextFieldDisable(false);
    }
  }, [loading]);

  const likeAction = async () => {
    setLoveLoading(true);
    try {
      const data = await Post.updatePost(post.id, {love_count: loveCount + 1});
      if (data.status === 200) {
        setLoveCount(loveCount + 1);
      }
    } catch (err) {
      console.log(err);
    }
    setLoveLoading(false);
  };

  const getfromNow = () => {
    const dt = moment(post.createdAt).fromNow();
    const ar = dt.split(' ');
    if (ar[0] == 'a') {
      ar[0] = '1';
    }
    return ar.join(' ');
  };

  const deletePost = async () => {
    try {
      const data = await Post.deleteUserPost(deleted);
      if (data.status === 200) {
        dispatch(setLoader());
        dispatch({
          type: DELETE_USER_POST,
          payload: {id: deleted},
        });
      }
    } catch (err) {
      console.log(err);
    }
    setDelete(null);
  };

  return (
    <Fragment key={post?.id}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              className={classes.avatar}
              src={userSpecificImage}
              alt='avtar'
            />
          }
          title={
            <Typography component='strong' className={classes.title}>
              {user?.first_name} {user?.last_name}
            </Typography>
          }
          subheader={
            <Fragment>
              <Typography component='span'>
                {moment(post.createdAt).format('DD MMM')}
              </Typography>{' '}
              <Typography component='span'>{`(${getfromNow()})`}</Typography>
            </Fragment>
          }
        />
        <CardContent>
          {renderTxtOrInput(post)}
          <Box className={classes.iconContainer}>
            <Box>
              <IconButton
                disabled={loveLoading}
                className={classes.btnContainer}
                aria-label='add to favorites'
                onClick={() => {}}>
                <Favorite
                  onClick={likeAction}
                  className={classes.fontPointer}
                  style={{color: 'red'}}
                />
                <Box className={classes.iconTxt}>{loveCount}</Box>
              </IconButton>
              <IconButton
                className={classes.btnContainer}
                aria-label='add to favorites'
                onClick={() => {}}>
                <Message
                  className={classes.fontPointer}
                  style={{color: '#2D83D5'}}
                />
                <Box className={classes.iconTxt}>{post?.messageCount}</Box>
              </IconButton>
              <IconButton
                className={classes.btnContainer}
                aria-label='add to favorites'
                onClick={() => {}}>
                <Edit
                  className={classes.fontPointer}
                  onClick={() => setEditDialogOpen(true)}
                />
              </IconButton>
              <IconButton
                className={classes.btnContainer}
                aria-label='add to favorites'
                onClick={() => {
                  setDelete(post?.id);
                }}>
                <Delete
                  className={classes.fontPointer}
                  style={{color: '#B42826'}}
                />
              </IconButton>
            </Box>
            <Box>
              {!!commentList?.length &&
                expanded.findIndex((el) => el?.id == post.id) <= -1 && (
                  <IconButton
                    className={classes.btnDown}
                    style={{outline: 'none !important'}}
                    aria-label='add to favorites'>
                    <ArrowDropDown
                      style={{fontSize: 30}}
                      onClick={() => handleExpand(post?.id)}
                    />
                  </IconButton>
                )}
            </Box>
          </Box>
        </CardContent>
        <Box
          className={`${
            expanded.findIndex((el) => el?.id == post.id) > -1
              ? classes.block
              : classes.hide
          } ${classes.relative}`}>
          <Collapse in={expanded.findIndex((el) => el?.id == post.id) > -1}>
            <Box>
              {commentList?.length > 0 &&
                commentList?.map((el, subIndex) => {
                  return (
                    <Fragment key={subIndex}>
                      <Comments
                        deleteComment={delete_Comment}
                        index={index}
                        getPostComments={getPostComments}
                        postId={post?.id}
                        subIndex={subIndex}
                        comments={el}
                      />
                      {el?.replies?.map((item, idx) => (
                        <Comments
                          key={idx}
                          deleteComment={delete_Comment}
                          getPostComments={getPostComments}
                          postId={post?.id}
                          idx={idx}
                          index={index}
                          subIndex={subIndex}
                          comments={item}
                          hasPaddingLeft={true}
                        />
                      ))}
                    </Fragment>
                  );
                })}
              {!!commentList?.length && !disable && (
                <Typography
                  style={{
                    padding: 24,
                    color: '#0A8FDC',
                    cursor: 'pointer',
                    width: 145,
                  }}
                  onClick={setCounter}>
                  Load More...
                </Typography>
              )}
              <IconButton
                className={classes.arrowUp}
                aria-label='add to favorites'>
                <ArrowDropUp
                  style={{fontSize: 30}}
                  onClick={() => {
                    setcounter(1);
                    setDisable(false);
                    handleExpand(post?.id);
                  }}
                />
              </IconButton>
            </Box>
          </Collapse>
        </Box>
      </Card>
      {deleted && (
        <Confirmation
          submit={deletePost}
          open={deleted}
          setDelete={setDelete}
        />
      )}
    </Fragment>
  );
};

export default Posts;
