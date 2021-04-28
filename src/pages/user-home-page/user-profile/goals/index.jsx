import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Share} from '@material-ui/icons';
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
    fontSize: 20,
    fontWeight: 600,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function GoalCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const goalsFakeData = [
    {
      title: 'Improve Communication Skills',
      deadline: '2020',
      status: 'completed',
    },
    {
      title: 'Make home page responsive',
      deadline: '2020',
      status: 'late',
    },
    {
      title: 'Show the latest updates',
      deadline: '2020',
      status: 'on schedule hopefully',
    },
  ];

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom>
          My Goals
        </Typography>

        <div className={classes.content}>
          {goalsFakeData.map((element, index) => {
            return (
              <div key={index} className='dataRow'>
                <div className='dataRowElement' style={{textAlign: 'left'}}>
                  {element.title}
                </div>
                <div className='dataRowElement'>{element.deadline}</div>
                <div className='dataRowElement'>{element.status}</div>
                <div className='dataRowElement'>
                  <Share />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardActions>
        <div style={{margin: 'auto'}}>
          <Button variant='contained'>Edit</Button>
          <Button
            variant='contained'
            color='secondary'
            style={{marginLeft: '5px'}}>
            Save
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
