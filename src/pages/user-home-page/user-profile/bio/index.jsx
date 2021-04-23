import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  media: {
    height: 250,
  },
});

export default function BioCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='https://www.history.com/.image/t_share/MTc5MzY2ODYwNDIzMTc3NTQ5/michelle-obama-gettyimages-1138043297.jpg'
          title='Michelle Obama'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Michelle Obama
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            eligendi tenetur sequi vitae facilis, nesciunt labore esse sint
            officia repudiandae dolorum! Obcaecati officiis voluptate non veniam
            possimus, distinctio ex provident.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Add Bio
        </Button>
      </CardActions>
    </Card>
  );
}
