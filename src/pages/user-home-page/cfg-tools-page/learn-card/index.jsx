import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ErrorOutline} from '@material-ui/icons';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {getContentData} from '../../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LearnCard({element}) {
  const classes = useStyles();
  const params = useParams();

  const getTruncatedText = (str) => {
    return str.length > 100 ? str.substring(0, 100) + '...' : str;
  };

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent
        style={{
          height: 180,
          overflowY: 'auto',
        }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {element.title}
        </Typography>

        <Typography variant='body2' color='textSecondary' component='p'>
          <div
            dangerouslySetInnerHTML={{
              __html: getTruncatedText(element.detail),
            }}></div>
        </Typography>

        <br />
      </CardContent>
      <CardActions>
        <div style={{margin: 'auto'}}>
          <Link to={`/home/cfg-tools/${params.id}/${element.id}`}>
            <Button size='small' variant='contained'>
              <ErrorOutline /> Learn More
            </Button>
          </Link>
          <div
            style={{
              color: 'red',
              textAlign: 'center',
              marginTop: '5px',
              fontWeight: '600',
            }}>
            {element.point}
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
