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
    fontSize: 20,
    fontWeight: 600,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DemographyCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          variant='h1'
          color='textSecondary'
          gutterBottom>
          Demographics
        </Typography>
        <div className='demographics-data'>
          <div className='demographics-key'>Email:</div>
          <div className='demographics-value'>mchelleo@email.us</div>
        </div>
        <div className='demographics-data'>
          <div className='demographics-key'>Region:</div>
          <div className='demographics-value'>Jamaica</div>
        </div>
        <div className='demographics-data'>
          <div className='demographics-key'>Parish:</div>
          <div className='demographics-value'>St Catherine</div>
        </div>
        <div className='demographics-data'>
          <div className='demographics-key'>Age Range:</div>
          <div className='demographics-value'>31-40</div>
        </div>
        <div className='demographics-data'>
          <div className='demographics-key'>Affiliation</div>
          <div className='demographics-value'></div>
        </div>
        <div className='demographics-data'>
          <div className='demographics-key'>Institution</div>
          <div className='demographics-value'></div>
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
