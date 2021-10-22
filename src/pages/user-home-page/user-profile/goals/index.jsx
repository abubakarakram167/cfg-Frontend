import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {Share} from '@material-ui/icons';
import {Chip, withStyles} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {getUserGoals} from '../../../../redux/actions/journal';
import './style.css';
import moment from 'moment';

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

const StyledChip = withStyles((theme) => ({
  label: {
    fontSize: 10,
    fontWeight: 400,
  },
  icon: {
    fontSize: 15,
  },
}))(Chip);

export default function GoalCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bull = <span className={classes.bullet}>•</span>;
  const allGoals = useSelector((state) => {
    return state.journal.userGoals;
  });

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

  const getUserGoal = () => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    dispatch(getUserGoals(user.id));
  };

  useEffect(() => {
    getUserGoal();
  }, []);

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
          {allGoals &&
            allGoals.map((element, index) => {
              console.log('the goal element', element);
              return (
                <div key={index} className='dataRow'>
                  <div className='dataRowElement'>{element.subject}</div>
                  <div className='dataRowElement year'>
                    {element.end_date &&
                      moment(element.end_date).format('YYYY')}
                  </div>
                  <div className='dataRowElement status'>{element.status}</div>
                  <div className='dataRowElement share'>
                    <Share />
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <StyledChip
          icon={<EditIcon style={{fill: 'white'}} />}
          label={'edit'}
          className='gray-chip'
          onClick={() => {}}
        />
        <StyledChip
          icon={<SaveIcon style={{fill: 'white'}} />}
          label={'Save'}
          className='chip-style'
          onClick={() => {}}
        />
      </div>
    </Card>
  );
}
