import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style.css';
import {Bookmark, Score} from '@material-ui/icons';
import {baseUrl} from 'utils/axios';
import UserAvatar from 'assets/user-avatar.png';
const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: '0px 1px 2px gainsboro',
  },
  media: {
    height: 500,
  },
});

export default function UserDetails(props) {
  console.log('the props', props);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardMedia
        className={classes.media}
        image={
          props.avatarImage && props.element.photo_url
            ? props.avatarImage
            : UserAvatar
        }
        title={props.element.first_name + ' ' + props.element.last_name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {props.element.first_name + ' ' + props.element.last_name}
        </Typography>
        <div className='bio-text'>Bio</div>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          style={{fontSize: '15px'}}>
          {props.element.bio}
          {/* bio not being returned */}
        </Typography>
        <br />
        <hr style={{color: 'gainsboro'}} />

        <br />
        {/* <div className='user-details-bottom-section'>
          <div className='user-details-bottom-section-left'>
            <strong>CFG Achievement</strong>
            <br />
            <br />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Bookmark style={{color: '#CB9986', fontSize: 40}} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '5px',
                }}>
                <strong>Badge</strong>
                <strong>Points</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '20px',
                }}>
                <Score style={{color: '#CB9986', fontSize: 40}} />
                <strong>2000</strong>
              </div>
            </div>
          </div>
          <div className='user-details-bottom-section-right'>
            <strong>CFG Session</strong>
            <br />
            <br />
            <br />
            <strong style={{color: 'green'}}>Complete 2020</strong>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
