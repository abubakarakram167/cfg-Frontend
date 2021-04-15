import React, {useState} from 'react';
import AppSideBar from './AppSidebar';
import CreatePost from './create-post-box';
import './style.css';
import PostDetails from './post-details';
import CommonComponent from './common-component';

export default function UserHomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [fakeData, setFakeData] = useState([
    {
      id: 1,
      caption: 'hello sir jermaine',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [
        {
          id: 1,
          commentText: 'this is a comment',
          commentReplies: ['hello', 'world'],
        },
      ],
    },
    {
      id: 2,
      caption: 'hello sir jermaine',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [
        {
          id: 1,
          commentText: 'this is a comment',
          commentReplies: ['hello', 'world'],
        },
        {
          id: 2,
          commentText: 'this is another',
          commentReplies: ['hello', 'world'],
        },
      ],
    },
    {
      id: 3,
      caption: 'hello sir jermaine',
      media: '',
      comments: [
        {
          id: 1,
          commentText: 'this is a comment',
          commentReplies: ['hello', 'world'],
        },
      ],
    },
    {
      id: 4,
      caption: 'This is a post without a comment',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [],
    },
  ]);

  const createComment = (id, commentText) => {
    return {
      id,
      commentText,
      commentReplies: [],
    };
  };

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <CommonComponent>
      <CreatePost />
      {fakeData.map((element, index) => {
        const addComment = (comment, postId) => {
          setFakeData(
            fakeData.map((data) => {
              if (postId === data.id) {
                data.comments.push(
                  createComment(data.comments.length + 1, comment),
                );
              }
              return data;
            }),
          );
        };

        const addReplyAction = (postId, commentId, replyText) => {
          console.log('add reply executed');
          console.log(postId);
          console.log(commentId);
          setFakeData(
            fakeData.map((data) => {
              if (postId === data.id) {
                data.comments.map((comment) => {
                  if (comment.id === commentId) {
                    comment.commentReplies.push(replyText);
                  }
                  return comment;
                });
              }
              console.log(data);
              return data;
            }),
          );
        };

        return (
          <PostDetails
            key={index}
            post={element}
            addCommentData={addComment}
            addReplyAction={addReplyAction}
          />
        );
      })}
    </CommonComponent>
  );
}
