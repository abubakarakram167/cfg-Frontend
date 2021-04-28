import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Cancel, CheckCircle, Visibility} from '@material-ui/icons';
import './style.css';
import GroupIcon from '@material-ui/icons/Group';
import {fromPairs} from 'lodash';
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  large: {
    width: '60px',
    height: '60px',
  },
});

export default function UserInfo(props) {
  const classes = useStyles();

  return (
    <div style={{boxShadow: '0px 1px 2px gainsboro', margin: '20px 0px'}}>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            props.setSelected(props.userData);
          }}>
          <CardContent>
            <div className='user-info-card-content'>
              <Avatar
                src={props.userData.image}
                alt={props.userData.name}
                className={classes.large}
              />
              <div>
                <Typography gutterBottom variant='p'>
                  <strong>{props.userData.name}</strong>
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  style={{display: 'flex', alignItems: 'center'}}>
                  <GroupIcon
                    style={{color: 'green', fontSize: 25, marginRight: '5px'}}
                  />
                  <strong>
                    {' '}
                    {props.userData.mutualCount} mutual connections
                  </strong>
                </Typography>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions style={{textAlign: 'center'}}>
          <div style={{margin: 'auto', display: 'flex', alignItems: 'center'}}>
            {props.userData.type === 'request' && (
              <>
                <div className='user-info-card-action-button'>
                  <Button size='small' color='secondary' variant='contained'>
                    <CheckCircle style={{color: 'white', marginRight: '5px'}} />
                    Confirm
                  </Button>
                </div>
                <div className='user-info-card-action-button'>
                  <Button
                    size='small'
                    variant='contained'
                    className='user-info-card-action-button'>
                    <Cancel style={{color: '#1D1D2F', marginRight: '5px'}} />{' '}
                    Reject
                  </Button>
                </div>
              </>
            )}
            {props.userData.type === 'sent' && (
              <>
                <div className={{margin: 'auto'}}>
                  <Button variant='contained'>
                    <Cancel style={{color: '#1D1D2F', marginRight: '5px'}} />{' '}
                    Cancel Request
                  </Button>
                </div>
              </>
            )}
            {props.userData.type === 'connection' && (
              <>
                <div className={{margin: 'auto'}}>
                  <Button variant='contained' color='secondary'>
                    {' '}
                    <Visibility
                      style={{color: 'white', marginRight: '5px'}}
                    />{' '}
                    View Profile{' '}
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
