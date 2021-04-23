import {element} from 'prop-types';
import React, {useState} from 'react';
import CommonComponent from '../common-component';
import GroupContainer from './group-container';
import PostDetails from '../post-details';
import {AddCircle} from '@material-ui/icons';
import './style.css';
export default function UserGroup() {
  const [currentGroup, setCurrentGroup] = useState('');

  const createComment = (id, commentText) => {
    return {
      id,
      commentText,
      commentReplies: [],
    };
  };
  const fakeGroupData = [
    {
      image:
        'https://ultimatemember.com/wp-content/uploads/edd/2018/10/groupimage.png',
      title: 'group 1',
    },
    {
      image:
        'https://ultimatemember.com/wp-content/uploads/edd/2018/10/groupimage.png',
      title: 'group 2',
    },
  ];

  const [fakeData, setFakeData] = useState([
    {
      id: 1,
      group: 'group 1',
      caption: 'hello sir jermaine group 1 sir',
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
      group: 'group 1',
      caption: 'hello sir jermaine group 1 sir again',
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
      caption: 'hello sir jermaine group 2',
      group: 'group 2',
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
      group: 'group 2',
      caption: 'This is a post without a comment',
      media:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      comments: [],
    },
  ]);

  const left = (
    <div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <strong style={{marginRight: '10px'}}>My Groups</strong>
        <AddCircle />
      </div>
      <br />
      {fakeGroupData.map((element, index) => {
        return (
          <div key={index} onClick={() => setCurrentGroup(element.title)}>
            <GroupContainer group={element} />
          </div>
        );
      })}
    </div>
  );

  return (
    <CommonComponent left={left} right={''}>
      <input
        type='text'
        className='group-searcher'
        placeholder='enter group name'
        value={currentGroup}
        onChange={(e) => setCurrentGroup(e.target.value)}
      />

      {fakeData
        .filter((element) => element.group.startsWith(currentGroup))
        .map((post, index) => {
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
            <div key={index} style={{marginBottom: '10px'}}>
              <PostDetails
                post={post}
                addCommentData={addComment}
                addReplyAction={addReplyAction}
              />
            </div>
          );
        })}
    </CommonComponent>
  );
}
