import React, {useState} from 'react';
import {
  Avatar,
  Typography,
  TextField,
  Box,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';
//
const useStyles = makeStyles(() => {
  return {
    root: {
      padding: '12px 24px',
    },
    wrapper: {
      display: 'flex',
    },
    avatar: {
      marginTop: 5,
    },
    contentWrapper: {
      marginLeft: 12,
    },
    headWrapper: {
      border: '1px solid lightgray',
      borderRadius: '36px',
      padding: '4px 16px',
      backgroundColor: '#EEF4F6',
    },
    headContent: {
      fontSize: 12,
      fontWeight: 500,
      color: '#74788d',
    },
    metaContent: {
      cursor: 'pointer',
      fontSize: 12,
    },
    padLeft: {
      marginLeft: 54,
      '@media (max-width:460px)': {
        marginLeft: 24,
      },
    },
  };
});

export const TextFieldMui = ({
  value,
  onBlur,
  onChange,
  setCommentValue,
  fullWidth,
  onKeyDown,
  disabled,
}) => {
  return (
    <TextField
      id={'standard-basic'}
      value={value}
      onBlur={onBlur}
      autoFocus={true}
      onChange={onChange}
      setCommentValue={setCommentValue}
      fullWidth={fullWidth}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
};

const Comment = ({
  comments,
  hasPaddingLeft,
  subIndex,
  idx,
  postId,
  getPostComments,
  deleteComment,
}) => {
  const classes = useStyles(hasPaddingLeft);

  const [commentValue, setCommentValue] = useState('');

  const onBlur = () => setCommentValue('');

  const onChange = ({target: {value = ''} = {}}) => setCommentValue(value);

  const renderTxtOrInput = ({content}) => {
    if (commentValue) {
      return (
        <TextFieldMui
          setCommentValue={setCommentValue}
          value={commentValue}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    } else {
      return (
        <Typography className={classes.metaContent} style={{color: '#74788d'}}>
          {content}
        </Typography>
      );
    }
  };

  const openTextfield = (val) => setCommentValue(val);

  const returnAgoTime = () => {
    const dd = moment(comments?.createdAt).fromNow();
    const ft = dd?.split(' ');
    if (ft[0] == 'a') {
      ft[0] = '1';
    }
    return ft?.join(' ');
  };

  return (
    <Box
      className={`${classes?.root} ${hasPaddingLeft ? classes.padLeft : ''}`}>
      <Box className={classes.wrapper}>
        <Avatar
          className={classes.avatar}
          alt='Remy Sharp'
          src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
        />
        <Box className={classes.contentWrapper}>
          <Box className={classes.headWrapper}>
            <Typography className={classes.headContent}>
              Orpha brenton
            </Typography>
            {renderTxtOrInput(comments)}
          </Box>
          <Box style={{marginLeft: 5}}>
            <Typography
              className={classes.metaContent}
              component='span'
              style={{color: '#777B7B'}}>
              {`${returnAgoTime()}`}{' '}
            </Typography>{' '}
            |{' '}
            <Typography
              className={classes.metaContent}
              component='span'
              style={{color: '#488CE8'}}
              onClick={() => openTextfield(comments?.content)}>
              Edit
            </Typography>{' '}
            |
            <span onClick={() => deleteComment(comments)}>
              {' '}
              <Typography
                className={classes.metaContent}
                component='span'
                style={{color: '#992E30'}}>
                Delete
              </Typography>
            </span>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Comment;
