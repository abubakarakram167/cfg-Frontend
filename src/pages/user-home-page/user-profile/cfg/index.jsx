import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {AcUnit, Bookmark} from '@material-ui/icons';
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

export default function CfgCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className='user-profile-cfg'>
          <div className='user-profile-cfg-left'>
            <h1>My CFG Achievements</h1>
            <div className='user-cfg-achievement-container'>
              <div className='cfg-achievement-icon-container'>
                <Bookmark />
              </div>
              <div className='cfg-achievement-info-container'>
                <div className='cfg-achievement-info-container-top'>Badge</div>
                <div className='cfg-achievement-info-container-bottom'>
                  Points
                </div>
              </div>
              <div className='cfg-achievement-info-container'>
                <div className='cfg-achievement-info-container-top'>
                  <AcUnit />
                </div>
                <div className='cfg-achievement-info-container-bottom'>
                  20000
                </div>
              </div>
            </div>
          </div>
          <div className='user-profile-cfg-right'>
            <h1>CFG Session</h1>
            <h2 style={{color: 'green'}}>Complete 2020</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
