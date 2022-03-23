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
import SunEditor from '../../components/sunEditor';

import {Loader} from '../../@crema';
import Comment from 'redux/services/comment';
import {setLoader, getUserPost} from 'redux/actions/UserPost';
import Post from 'redux/services/post';
import {getSignedUrl} from 'redux/actions/media';
import moment from 'moment';
import {TextFieldMui} from './comments';
import './post.css';

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
  getUserPosts,
}) => {
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loveCount, setLoveCount] = useState(post.love_count || 0);
  const [loveLoading, setLoveLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleted, setDelete] = useState(null);
  const [textFieldDisable, setTextFieldDisable] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [lMore, setLmore] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalId, setJournalId] = useState(null);
  const [subject, setSubject] = useState(null);
  const [updatedContent, setUpdatedContent] = useState(null);

  const loading = useSelector((state) => state.userPost.loading);
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
    setMessageCount(post?.comment_count);
    getSignedUrl({fileName: post.photo_url})
      .then((res) => {
        console.log('getSignedUrl===>', res, res.newUrl);
        setAvatarImage(res.newUrl);
      })
      .catch((err) => console.log('Err==>', err));
  }, []);

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
    setLmore(false);
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
          upDatePost(data.data.comments, 'close');
        }
      }
    } catch (err) {
      console.log(err);
    }
    setCommentLoading(false);
  }

  const delete_Comment = async (comment) => {
    try {
      const resp = await Comment.deleteComment(comment?.id);
      if (resp?.status == 200) {
        const po = post?.comments?.filter((c) => c?.id != comment.id);
        post.comments = [...po];
        const idx = posts?.findIndex((p) => p.id == post.id);
        posts[idx] = {...post};
        setMessageCount((prevState) => prevState - 1);
      }
    } catch (err) {
      console.log('err===>', err);
    }
  };

  const editPostAction = async () => {
    try {
      const data = await Post.updatePost(post.id, {content: updatedContent});
      console.log('after edit post', data);
      // debugger
      setEditDialogOpen(false);
      if (data.status !== 200) {
        setCommentValue(post.content);
      }
      btnShow(true);
      // dispatch(getUserPost(getPostCount, 'isNewUser', 1));
      getUserPosts(updatedContent, post);
      dispatch(setLoader());
    } catch (err) {
      console.log(err);
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
      if (data.status === 200) {
        setPosts(posts.filter((post) => post.id !== deleted));
      }
    } catch (err) {
      console.log(err);
    }
    setLoveLoading(false);
    setDelete(null);
  };

  const getChangeVideoThumbnail = (editText) => {
    var el = document.createElement('html');
    el.innerHTML = editText;
    var iframe = el.getElementsByTagName('iframe');
    var figure = el.getElementsByTagName('figure');

    if (figure.length) {
      figure[0].setAttribute(
        'style',
        'height: 56.25%; width: 100%; padding-bottom: 0px; margin: 0px;',
      );
    }

    if (iframe.length) {
      iframe[0].setAttribute('style', 'height: 400px; width: 100%;');
    }

    // console.log("the selected db..", selectedB)

    return el.innerHTML;
  };

  useEffect(() => {
    if (post?.comments?.length == post?.counter) setLmore(true);
  }, [post]);

  console.log('the posttt', post);

  return (
    <Fragment key={post?.id}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              className={classes.avatar}
              src={avatarImage}
              alt='avtar'
            />
          }
          title={
            <Typography component='strong' className={classes.title}>
              {post?.first_name} {post?.last_name}
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
          {/* {renderTxtOrInput(post)} */}
          {editDialogOpen ? (
            <SunEditor
              onClickSmartClick={(id) => {
                setJournalId(id);
                setShowJournalModal(true);
              }}
              onContentSave={(content) => {
                console.log('on content');
                setUpdatedContent(content);
                // setEditText(content);
                // editPostAction()
              }}
              content={post.content}
              onContentChanged={() => {}}
              onGetSubject={(subject) => setSubject(subject)}
              journalId={journalId}
              showToolbar={true}
              modalType='external'
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: getChangeVideoThumbnail(post.content),
              }}
            />
          )}

          <Box className={classes.iconContainer}>
            <Box>
              {/* <IconButton
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
              </IconButton> */}
              <IconButton
                className={classes.btnContainer}
                aria-label='add to favorites'
                onClick={() => {}}>
                <Message
                  className={classes.fontPointer}
                  style={{color: '#2D83D5'}}
                />
                <Box className={classes.iconTxt}>{messageCount}</Box>
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
              {editDialogOpen && (
                <button
                  className='update-post'
                  onClick={() => editPostAction()}>
                  Update
                </button>
              )}
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
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        </CardContent>
        <Box className={`${classes.relative}`}>
          <Collapse in={showUp?.includes(post.id)}>
            <Box>
              {commentLoading && <div style={{padding: 24}}>...Loading</div>}
              {/* {!commentLoading && post?.comments?.length == 0 && (
                <div style={{padding: 24}}>There are no comments!</div>
              )} */}
              {post?.comments?.length &&
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
                      {el?.replies?.length &&
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
                !lMore &&
                post?.comments?.length &&
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
