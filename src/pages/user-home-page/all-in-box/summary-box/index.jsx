import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

export default function SummaryBox({element}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <div className='summary-block'>
          <div className='summary-block-title'>Total Points Required</div>
          <div className='summary-block-points'>
            {element.totalPointsRequired}
          </div>
        </div>
        <br />
        <div className='summary-block'>
          <div className='summary-block-title'>Total Points Available</div>
          <div className='summary-block-points'>
            {element.totalPointsAvailable}
          </div>
        </div>
        <br />
        <div className='summary-block'>
          <div className='summary-block-title'>Balance</div>
          <div className='summary-block-points'>{element.balance}</div>
        </div>
        <br />
        <div className='summary-buttons'>
          <Button variant='contained' style={{marginRight: '10px'}}>
            Cancel
          </Button>
          <Button variant='contained' color='secondary'>
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
