import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {
  Cancel,
  CheckCircle,
  Visibility,
  AccountCircleRounded,
} from '@material-ui/icons';
import './style.css';
import GroupIcon from '@material-ui/icons/Group';
import {fromPairs} from 'lodash';
import Friend from 'redux/services/friends';
import {baseUrl} from 'utils/axios';
import {getSignedUrl} from '../../../../redux/actions/media';
import NoUserProfile from 'assets/accountProfile.png';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  large: {
    width: '60px',
    height: '60px',
  },
});

export default function UserInfo({
  userId,
  type,
  setSelected,
  toggleReloadData,
}) {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    image: '',
    first_name: '',
    last_name: '',
    photo_url: '',
  });
  const [avatarImage, setAvatarImage] = useState(null);

  const approveRequest = async () => {
    const data = await Friend.approveFriendRequest({userId});
    toggleReloadData();
  };

  const deleteRequest = async () => {
    const data = await Friend.deleteFriendRequest({userId});
    toggleReloadData();
  };

  useEffect(() => {
    async function getUserDetails() {
      const data = await Friend.getUserDetails(userId);
      if (data) {
        if (data.data) {
          setUserData(data.data);

          getSignedUrl({fileName: data.data.photo_url}).then((res) => {
            console.log('the user id', userId);
            console.log('the data of image getting', res);
            setAvatarImage(res.newUrl);
          });
        }
      }
    }

    getUserDetails();
  }, []);

  // return (
  //   <div className='user-profile-container'>
  //     <Card className={classes.root}>
  //       <CardActionArea
  //         onClick={() => {
  //           setSelected({userData, avatarImage});
  //         }}>
  //         <CardContent>
  //           <div className='user-info-card-content'>
  //             <Avatar
  //               src={avatarImage}
  //               alt={userData.first_name}
  //               className={classes.large}
  //             />
  //             <div>
  //               <Typography gutterBottom variant='p'>
  //                 <strong>
  //                   {userData.first_name} {userData.last_name}
  //                 </strong>
  //               </Typography>
  //               {/* <Typography
  //                 variant='body2'
  //                 color='textSecondary'
  //                 component='p'
  //                 style={{display: 'flex', alignItems: 'center'}}>
  //                 <GroupIcon
  //                   style={{color: 'green', fontSize: 25, marginRight: '5px'}}
  //                 />
  //                 <strong> Coming mutual connections</strong>
  //               </Typography> */}
  //             </div>
  //           </div>
  //         </CardContent>
  //       </CardActionArea>
  //       <CardActions style={{textAlign: 'center'}}>
  //         <div style={{margin: 'auto', display: 'flex', alignItems: 'center'}}>
  //           {type === 'request' && (
  //             <>
  //               <div className='user-info-card-action-button'>
  //                 <Button
  //                   size='small'
  //                   color='secondary'
  //                   variant='contained'
  //                   onClick={approveRequest}>
  //                   <CheckCircle style={{color: 'white', marginRight: '5px'}} />
  //                   Confirm
  //                 </Button>
  //               </div>
  //               <div className='user-info-card-action-button'>
  //                 <Button
  //                   size='small'
  //                   variant='contained'
  //                   className='user-info-card-action-button'
  //                   onClick={deleteRequest}>
  //                   <Cancel style={{color: '#1D1D2F', marginRight: '5px'}} />{' '}
  //                   Reject
  //                 </Button>
  //               </div>
  //             </>
  //           )}
  //           {type === 'sent' && (
  //             <>
  //               <div className={{margin: 'auto'}}>
  //                 <Button variant='contained' onClick={deleteRequest}>
  //                   <Cancel style={{color: '#1D1D2F', marginRight: '5px'}} />{' '}
  //                   Cancel Request
  //                 </Button>
  //               </div>
  //             </>
  //           )}
  //           {/* {type === 'connection' && (
  //             <>
  //               <div className={{margin: 'auto'}}>
  //                 <Button variant='contained' color='secondary'>
  //                   {' '}
  //                   <Visibility
  //                     style={{color: 'white', marginRight: '5px'}}
  //                   />{' '}
  //                   View Profile{' '}
  //                 </Button>
  //               </div>
  //             </>
  //           )} */}
  //         </div>
  //       </CardActions>
  //     </Card>
  //   </div>
  // );

  const user = userData;

  return (
    <div className='new-container'>
      <div className='user-card-container'>
        <div className='user-image'>
          {user && user.photo_url ? (
            <img
              style={{borderRadius: 20, width: '100%', height: '100%'}}
              src={user && user.photo_url && avatarImage}
            />
          ) : (
            <div style={{width: '50%', margin: 'auto'}}>
              <AccountCircleRounded className='circle-outlined' />
            </div>
          )}
        </div>
        <h3 className='avatar-name'>
          {user ? user.first_name + user.last_name : 'not Available'}
        </h3>
        <div className='button-container'>
          {type === 'sent' && (
            <button onClick={deleteRequest} className='confirm-buttton'>
              Cancel Request
            </button>
          )}

          {type === 'connection' && (
            <button className='confirm-buttton'>View Profile</button>
          )}

          {type === 'request' && (
            <>
              <div className='user-info-card-action-button'>
                <Button
                  size='small'
                  color='secondary'
                  variant='contained'
                  onClick={approveRequest}>
                  <CheckCircle style={{color: 'white', marginRight: '5px'}} />
                  Confirm
                </Button>
              </div>
              <div className='user-info-card-action-button'>
                <Button
                  size='small'
                  variant='contained'
                  className='user-info-card-action-button'
                  onClick={deleteRequest}>
                  <Cancel style={{color: '#1D1D2F', marginRight: '5px'}} />{' '}
                  Reject
                </Button>
              </div>
            </>
          )}
        </div>

        {/* {showMessage && (
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
        )} */}
      </div>
    </div>
  );
}
