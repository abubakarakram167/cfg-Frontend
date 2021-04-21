import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Redeem} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
  pointsRequired: {
    textAlign: 'center',
  },
  points: {
    color: 'red',
    fontWeight: 600,
    fontSize: '20px',
  },
  description: {
    fontSize: '12px',
  },
  actionArea: {
    margin: 'auto',
  },
});

export default function RewardCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.element.image}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            className={classes.description}
            component='h2'>
            {props.element.description}
          </Typography>
          <div className={classes.pointsRequired}>
            <Typography variant='body2' color='textSecondary' component='p'>
              Points Required
              <div className={classes.points}>{props.element.points}P</div>
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.actionArea}>
          <Button
            variant='contained'
            color='secondary'
            onClick={props.toggleOpen}>
            <Redeem style={{color: 'white', marginRight: '5px'}} /> Redeem
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
