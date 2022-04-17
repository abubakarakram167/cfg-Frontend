import React, {useState, useEffect, Fragment, lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, Box, makeStyles} from '@material-ui/core';
import {transformImagesInContent} from 'components/ReUsable';
import {red} from '@material-ui/core/colors';
import {getUserPost} from 'redux/actions/UserPost';
import {Loader} from '../../@crema';

const AdminHeader = lazy(() => import('pages/admin-header'));
const CommonComponent = lazy(() =>
  import('pages/user-home-page/common-component'),
);
const Posts = lazy(() => import('./posts'));

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: 'inherit',
    padding: '16px 48px',
    '@media (max-width: 520px)': {
      padding: 16,
    },
  },
  heading: {
    color: '#74788d',
    marginBottom: 36,
  },
  card: {
    maxWidth: '100%',
    margin: '16px 0',
    borderRadius: 8,
    border: '1px solid lightgray',
  },
  title: {
    color: '#74788d',
    fontWeight: 'bolder',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  btnContainer: {
    paddingLeft: 0,
    paddingRight: 48,
    outline: 'none !important',
    backgroundColor: 'transparent !important',
    '@media (max-width: 520px)': {
      paddingRight: 20,
    },
  },
  btnDown: {
    outline: 'none !important',
    backgroundColor: 'transparent !important',
  },
  block: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  relative: {
    position: 'relative',
  },
  arrowUp: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    outline: 'none !important',
    backgroundColor: 'transparent !important',
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconTxt: {
    marginLeft: 10,
  },
  fontPointer: {
    cursor: 'pointer',
  },
  comment: {
    '& .MuiFilledInput-root': {
      borderRadius: '36px !important',
    },
  },
}));

let loadFirst = true;

const TimeLinePosts = () => {
  const classes = useStyles();
  const {
    posts: getposts,
    getPostLoader: loading,
    isEditFetch,
    postCount = 0,
  } = useSelector((state) => state.userPost);

  const dispatch = useDispatch();

  const [count, setCount] = useState(3);
  const [posts, setPosts] = useState([]);
  const [showUp, setShowUp] = useState([]);
  const [allTransformPosts, setAllTransformPosts] = useState(null);
  const [getPosts, setGetPosts] = useState(false);

  useEffect(() => {
    let modifiedArr = [];
    if (getposts?.length) {
      modifiedArr = getposts?.map((el) => {
        return {
          ...el,
          counter: 1,
        };
      });
      transformPosts([...modifiedArr]);
      // setPosts([...modifiedArr]);
      loadFirst = false;
    }
  }, [getposts, isEditFetch]);

  const getUserPostsAll = (count) => {
    dispatch(getUserPost(count, null));
  };

  useEffect(() => {
    getUserPostsAll(count);
  }, [count]);

  // useEffect(() => {
  //   transformPosts(posts);
  // }, [posts]);

  const transformPosts = async (posts) => {
    let allContent = [];
    for (let post of posts) {
      allContent.push(transformImagesInContent(post.content, false, post.id));
    }

    const allTransformPosts = await Promise.all(allContent);
    const newContentPosts = posts.map((post) => {
      return {
        ...post,
        content: allTransformPosts.filter(
          (newPost) => newPost.id === post.id,
        )[0].html,
      };
    });

    setPosts(newContentPosts);
  };

  const returnPosts = () => {
    if (loadFirst) {
      return <Loader />;
    }
    return posts.map((post, index) => {
      return (
        <Fragment key={index}>
          <Posts
            setPosts={setPosts}
            posts={posts}
            post={post}
            index={index}
            classes={classes}
            getPostCount={count}
            showUp={showUp}
            setShowUp={setShowUp}
            getUserPosts={(content, getPost) => {
              console.log('on getting post', post);
              console.log('all posts', posts);
              const filterPosts = posts.map((post) => {
                if (post.id === getPost.id) {
                  return {
                    ...post,
                    content: content,
                  };
                } else return post;
              });

              console.log('filter Posts', filterPosts);
              setPosts(filterPosts);
            }}
          />
        </Fragment>
      );
    });
  };

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <CommonComponent
        showHeader={true}
        scroll={true}
        left='noMenu'
        right='noMenu'
        scrollAction={() => {
          setCount(count + 3);
        }}>
        <Box className={classes.root}>
          <Typography class={classes.heading} variant='h2'>
            User Moderation
          </Typography>
          {returnPosts()}
          <Box style={{height: 16}}></Box>
        </Box>
      </CommonComponent>
    </div>
  );
};

export default TimeLinePosts;
