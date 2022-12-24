import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Videocam, Forum, QueryBuilder} from '@material-ui/icons';
import {PlayArrowOutlined, Event} from '@material-ui/icons';
import '../event/style.css';
import NoImage from '../../../../assets/noImage.jpeg';
import PeopleIcon from '@material-ui/icons/People';
import moment from 'moment';
import './style.css';
import EventCalendarModal from 'components/EventCalendarModal';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
});

export default function UpcomingEvent({
  element,
  setSelectedEvent,
  setShowPrompt,
}) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            setSelectedEvent(element);
            setShowPrompt(true);
          }}>
          <CardMedia
            className={classes.media}
            image={element.newUrl ? element.newUrl : NoImage}
            title={element.title}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {element.title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!element.event_type && (
                  <div>
                    <Videocam style={{fill: '#5a5ae5', fontSize: 28}} />
                    <span
                      style={{fontSize: 12, fontWeight: 500, marginLeft: 5}}>
                      Nothing
                    </span>
                  </div>
                )}
                {element.event_type === 'live-video' && (
                  <div>
                    <Videocam style={{fill: '#5a5ae5', fontSize: 28}} />
                    <span
                      style={{fontSize: 12, fontWeight: 500, marginLeft: 5}}>
                      Live Video
                    </span>
                  </div>
                )}
                {element.event_type === 'zoom-video' && (
                  <div>
                    <Videocam style={{fill: '#5a5ae5', fontSize: 28}} />
                    <span
                      style={{fontSize: 12, fontWeight: 500, marginLeft: 5}}>
                      Zoom Event
                    </span>
                  </div>
                )}
                {element.event_type === 'group-chat' && (
                  <div>
                    <Forum style={{fill: '#bd3535', fontSize: 28}} />
                    <span
                      style={{fontSize: 12, fontWeight: 500, marginLeft: 5}}>
                      Group Chat
                    </span>
                  </div>
                )}
                {element.event_type === 'face-to-face' && (
                  <div>
                    <PeopleIcon style={{fill: '#bd3535', fontSize: 28}} />
                    <span
                      style={{fontSize: 12, fontWeight: 500, marginLeft: 5}}>
                      Face to Face
                    </span>
                  </div>
                )}
              </div>
            </Typography>
            <div className='event-start-date'>
              {moment(element.meeting_start_time).format('MMMM Do, YYYY hA')}
            </div>
            <div className='event-points'>
              {element.total_points ? element.total_points : 0} P
            </div>
            <Typography variant='body2' color='textSecondary' component='p'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <QueryBuilder />
                <span className='event-duration'>
                  {' '}
                  Duration {element.duration ? element.duration : 0} mins
                </span>
              </div>
            </Typography>
            <br />
            <Typography variant='body2' color='textSecondary' component='p'>
              {element.summary}
            </Typography>
            {element.link && (
              <a
                href={element.link}
                style={{color: '#88B9E0'}}
                target='_blank'
                rel='noreferrer'>
                Meeting Link
              </a>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div style={{margin: 'auto'}} onClick={() => setShowModal(true)}>
            <button
              style={{border: 0}}
              className='youtube-button remind-button'
              size='large'>
              <Event style={{fill: 'white', fontSize: 18}} />
              <span style={{fontSize: 10}}>Remind Me</span>
            </button>
          </div>
        </CardActions>
      </Card>
      <EventCalendarModal
        when={showModal}
        onConfirm={() => {}}
        onCancel={() => {
          setShowModal(false);
        }}
        element={element}
      />
    </div>
  );
}
