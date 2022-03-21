import React, {useState, useEffect} from 'react';
import './style.css';
import {getSignedUrl} from 'redux/actions/media';
import NoUserProfile from 'assets/accountProfile.png';
import Friend from 'redux/services/friends';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {AccountCircleRounded} from '@material-ui/icons';

const UserInfo = ({user, addFriend, toggleReloadData}) => {
  const [avatarImage, setAvatarImage] = useState(null);
  const [showMessage, setShowMessage] = useState(null);

  useEffect(() => {
    async function getUserDetails() {
      getSignedUrl({
        fileName: user && user.photo_url ? user.photo_url : '',
      }).then((res) => {
        setAvatarImage(res.newUrl);
      });
    }
    getUserDetails();
  }, []);

  const sentFriendRequest = () => {
    console.log('send frienddd requestt', user);
    Friend.sendFriendRequest({userId: user.id})
      .then((res) => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        toggleReloadData();
      })
      .catch((err) => {
        console.log('the error', err);
      });
  };

  const acceptFriendRequest = async () => {
    try {
      const data = await Friend.approveFriendRequest({userId: user.id});
      console.log('after accept', data);
      toggleReloadData();
    } catch (err) {
      console.log('the err in accepting friend', err);
    }
  };

  console.log('the user', user);

  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
      <div className='user-card-container'>
        <div className='user-image'>
          <img
            style={{
              borderRadius: 20,
              width: '100%',
              height: '100%',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            src={user && user.photo_url ? avatarImage : NoUserProfile}
          />
        </div>
        <h3 className='avatar-name'>
          {user ? user.first_name + user.last_name : 'not Available'}
        </h3>
        <div className='button-container'>
          {addFriend ? (
            <button onClick={sentFriendRequest} className='confirm-buttton'>
              AddFriend
            </button>
          ) : (
            <button className='confirm-buttton'>Confirm</button>
          )}
        </div>
      </div>
      {showMessage && (
        <div>
          <Snackbar
            open={true}
            autoHideDuration={2000}
            onClose={() => setShowMessage(false)}>
            <Alert variant='filled' severity='success'>
              Friend Request Sent.
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
