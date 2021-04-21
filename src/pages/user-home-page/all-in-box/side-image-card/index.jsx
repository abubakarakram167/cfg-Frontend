import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Delete} from '@material-ui/icons';
import './style.css';
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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SideImageCard({element}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <div className='side-image-card'>
          <div className='side-image-card-left'>
            <div className='side-image-left'>
              <img
                src={element.image}
                alt={element.content}
                width='100px'
                height='100px'
              />
            </div>
            <span className='side-image-card-text'>{element.content}</span>
          </div>
          <div className='side-image-card-right'>
            <span className='points-text'>{element.points}</span>
            <Delete />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
