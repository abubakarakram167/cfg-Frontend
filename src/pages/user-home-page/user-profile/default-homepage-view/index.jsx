import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SaveIcon from '@material-ui/icons/Save';
import {updateUser, setLoader} from 'redux/actions/authActions';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    marginBottom: 30,
    display: 'flex',
  },
  classContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
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
  formControl: {
    minWidth: '100%',
  },
  radioGroup: {
    justifyContent: 'space-around',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    color: '#74788d',
  },
  chipBtn: {
    margin: '0 !important',
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

export default function DefaultView() {
  const classes = useStyles();
  const [default_home_page_view, setView] = useState('timeline');
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setView(user?.default_home_page_view);
    }
  }, [user]);

  const submit = () => {
    dispatch(setLoader());
    dispatch(
      updateUser({
        id: user.id,
        username: user?.user_name,
        default_home_page_view,
      }),
    );
  };

  const handleChange = (event) => {
    setView(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.classContent}>
        <Typography
          className={classes.title}
          variant='h1'
          color='textSecondary'
          gutterBottom>
          Default Homepage View
        </Typography>
        <FormControl className={classes.formControl}>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            className={classes.radioGroup}
            onChange={handleChange}
            value={default_home_page_view}>
            <FormControlLabel
              value='timeline'
              control={<Radio />}
              label={
                <Typography className={classes.label}>Timeline</Typography>
              }
            />
            <FormControlLabel
              value='icon'
              control={<Radio />}
              label={<Typography className={classes.label}>Icons</Typography>}
            />
          </RadioGroup>
        </FormControl>
        <div className={classes.actionContainer}>
          <StyledChip
            icon={<SaveIcon style={{fill: 'white'}} />}
            label={loading ? 'Saving...' : 'Save'}
            className={`chip-style ${classes.chipBtn}`}
            onClick={submit}
          />
        </div>
      </CardContent>
    </Card>
  );
}
