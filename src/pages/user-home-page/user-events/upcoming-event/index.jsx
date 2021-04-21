import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Videocam, Forum, QueryBuilder} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
});

export default function UpcomingEvent({element}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={element.image}
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
              {element.type === 'zoom' && <Videocam />}
              {element.type === 'group-chat' && <Forum />}
              <span style={{marginLeft: '10px'}}>{element.type}</span>
            </div>
          </Typography>
          <br />
          <Typography variant='body2' color='textSecondary' component='p'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <QueryBuilder />
              <span style={{marginLeft: '10px'}}>{element.duration} mins</span>
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
        <div style={{margin: 'auto'}}>
          <Button variant='contained' size='large' color='secondary'>
            Share
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
