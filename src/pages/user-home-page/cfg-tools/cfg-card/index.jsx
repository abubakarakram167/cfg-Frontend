import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TrendingUp} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 200,
  },
});

export default function CfgCard({element}) {
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
            <div style={{textAlign: 'center'}}>{element.details}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div style={{margin: 'auto'}}>
          <Link to={`/home/cfg-tools/${element.id}`}>
            <Button size='small' color='secondary' variant='contained'>
              <TrendingUp />{' '}
              <span style={{marginLeft: '10px'}}>Deepen the CFG</span>
            </Button>
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}
