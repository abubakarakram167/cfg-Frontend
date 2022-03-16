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

import {Loader} from '../../@crema';
import Comment from 'redux/services/comment';
import {setLoader, getUserPost} from 'redux/actions/UserPost';
import Post from 'redux/services/post';
import moment from 'moment';
import {TextFieldMui} from './comments';

const Confirmation = ({open, setDelete, submit, loading}) => {
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
          onClick={() => {
            handleClose();
          }}
          color='primary'>
          Cancel
        </Button>
        <Button style={{outline: 'none'}} onClick={submit} color='primary'>
          {loading ? 'deleting...' : 'delete'}
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
  showUp,
  setShowUp,
}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loveCount, setLoveCount] = useState(post.love_count || 0);
  const [loveLoading, setLoveLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleted, setDelete] = useState(null);
  const [textFieldDisable, setTextFieldDisable] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.userPost.loading);
  const [user] = useState(currentUser);

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

  const upDatePost = (data = []) => {
    let newPosts = [];
    if (data?.length > 0) {
      const fId = data[0]?.post_id;
      newPosts = posts?.map((el) => {
        if (el.id == fId) {
          return {
            ...el,
            comments: data,
          };
        }
        return {...el};
      });
      setPosts(newPosts);
    }
  };

  const btnShow = (remove) => {
    let arr = [...showUp];
    if (remove) arr = arr.filter((a) => a != post.id);
    else arr.push(post.id);
    setShowUp(arr);
  };

  const setMyCounter = (isDefault) => {
    let newPosts = [];
    if (post?.comments?.length > 0) {
      const fId = post?.comments[0]?.post_id;
      newPosts = posts?.map((el) => {
        if (el.id == fId) {
          return {
            ...el,
            counter: isDefault == 'default' ? 1 : el?.counter + 1,
          };
        }
        return {...el};
      });
      setPosts([...newPosts]);
    }
  };

  async function getPostComments(id) {
    if (post?.comments?.length > 0) return;
    setCommentLoading(true);
    try {
      const data = await Comment.getPostComments(id);
      if (data) {
        if (data.data) {
          upDatePost(data.data, 'close');
        }
      }
    } catch (err) {
      console.log(err);
    }
    setCommentLoading(false);
  }

  const delete_Comment = async (comment) => {
    // const comments = await Comment.deleteComment(comment?.id)
    // console.log("comment===>", comments)
  };

  const editPostAction = async (e) => {
    if (e.key === 'Enter' && commentValue.length > 0) {
      setTextFieldDisable(true);
      handleExpand(post?.id);
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
    setLoveLoading(true);
    try {
      const data = await Post.deleteUserPost(deleted);
      if (Object.keys(data?.error)?.length == 0) {
        setPosts(posts.filter((post) => post.id !== deleted));
      }
    } catch (err) {
      console.log(err);
    }
    setLoveLoading(false);
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
                <Box className={classes.iconTxt}>{post?.comment_count}</Box>
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
              {!showUp?.includes(post.id) && (
                <IconButton
                  className={classes.btnDown}
                  style={{outline: 'none !important'}}
                  aria-label='add to favorites'>
                  <ArrowDropDown
                    style={{fontSize: 30}}
                    onClick={() => {
                      btnShow(false);
                      getPostComments(post?.id);
                      handleExpand(post?.id);
                    }}
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
              {commentLoading && <div style={{padding: 24}}>...Loading</div>}
              {!commentLoading && !post?.comments && (
                <div style={{padding: 24}}>There are no comments!</div>
              )}
              {post?.comments?.length > 0 &&
                post?.comments?.slice(0, post?.counter)?.map((el, subIndex) => {
                  return (
                    <Fragment key={subIndex}>
                      <Comments
                        deleteComment={delete_Comment}
                        index={index}
                        postId={post?.id}
                        subIndex={subIndex}
                        comments={el}
                      />
                      {el?.replies?.length > 0 &&
                        el?.replies?.map((item, idx) => {
                          return (
                            <Comments
                              key={idx}
                              deleteComment={delete_Comment}
                              postId={post?.id}
                              idx={idx}
                              index={index}
                              subIndex={subIndex}
                              comments={item}
                              hasPaddingLeft={true}
                            />
                          );
                        })}
                    </Fragment>
                  );
                })}
              {!commentLoading &&
                post?.comments?.length > 0 &&
                !(post?.comments?.length == post?.counter) && (
                  <Typography
                    style={{
                      padding: 24,
                      color: '#0A8FDC',
                      cursor: 'pointer',
                      width: 145,
                    }}
                    onClick={() => setMyCounter('idefault')}>
                    Load More...
                  </Typography>
                )}
              <IconButton
                className={classes.arrowUp}
                aria-label='add to favorites'>
                <ArrowDropUp
                  style={{fontSize: 30}}
                  onClick={() => {
                    btnShow(true);
                    setMyCounter('default');
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
          loading={loveLoading}
        />
      )}
    </Fragment>
  );
};

export default Posts;
