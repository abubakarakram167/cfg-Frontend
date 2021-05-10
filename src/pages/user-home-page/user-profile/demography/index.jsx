import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
} from '@material-ui/core';
import './style.css';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from 'redux/actions/authActions';
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
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [parish, setParish] = useState('');
  const [age_range, setAge_range] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [institution, setInstitution] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setRegion(user.region || '');
      setParish(user.parish || '');
      setAge_range(user.age_range || '');
      setAffiliation(user.affiliation || '');
      setInstitution(user.institution || '');
    }
  }, [user]);

  const bull = <span className={classes.bullet}>•</span>;

  const updateUserData = () => {
    // console.log(user.id)
    dispatch(
      updateUser({
        id: user.id,
        email,
        region,
        parish,
        age_range,
        affiliation,
        institution,
      }),
    );
    setDialogOpen(false);
  };

  const dialogJSX = (
    <Dialog open={dialogOpen} fullWidth>
      <DialogTitle id='simple-dialog-title'>
        Change demography details
      </DialogTitle>
      <div className='dialog-content'>
        <List>
          <ListItem>
            <TextField
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <TextField
              label='Region'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              fullWidth
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <TextField
              label='Parish'
              value={parish}
              onChange={(e) => setParish(e.target.value)}
              fullWidth
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <TextField
              label='Age-range'
              value={age_range}
              onChange={(e) => setAge_range(e.target.value)}
              fullWidth
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <TextField
              label='Affiliation'
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              fullWidth
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <TextField
              label='Institution'
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              fullWidth
              variant='filled'
            />
          </ListItem>
        </List>
      </div>
      <div style={{padding: '10px', textAlign: 'right'}}>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={updateUserData} color='primary' autoFocus>
            Save
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );

  return (
    <>
      {dialogJSX}
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
            <div className='demographics-value'>{email}</div>
          </div>
          <div className='demographics-data'>
            <div className='demographics-key'>Region:</div>
            <div className='demographics-value'>{region}</div>
          </div>
          <div className='demographics-data'>
            <div className='demographics-key'>Parish:</div>
            <div className='demographics-value'>{parish}</div>
          </div>
          <div className='demographics-data'>
            <div className='demographics-key'>Age Range:</div>
            <div className='demographics-value'>{age_range}</div>
          </div>
          <div className='demographics-data'>
            <div className='demographics-key'>Affiliation:</div>
            <div className='demographics-value'>{affiliation}</div>
          </div>
          <div className='demographics-data'>
            <div className='demographics-key'>Institution:</div>
            <div className='demographics-value'>{institution}</div>
          </div>
        </CardContent>
        <CardActions>
          <div style={{margin: 'auto'}}>
            <Button variant='contained' onClick={() => setDialogOpen(true)}>
              Edit
            </Button>
            <Button
              variant='contained'
              color='secondary'
              style={{marginLeft: '5px'}}>
              Save
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  );
}
