import React, {useState} from 'react';
import CommonComponent from '../common-component';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Forum, Save, Cancel, CameraAlt} from '@material-ui/icons';
import Logo from 'assets/Logo.png';
import {TextField, Chip} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './style.css';
const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    textAlign: 'center',
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

export default function HostAConversation() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(Logo);
  const handleDateChange = (date) => {
    setDate(date);
  };

  const addParticipant = (e) => {
    if (e.key === 'Enter') {
      setParticipants([...participants, participant]);
      setParticipant('');
    }
  };

  return (
    <CommonComponent left={''} right={''}>
      <div className='host-a-conversation-container'>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Forum />{' '}
          <span style={{marginLeft: '20px', fontSize: '18px'}}>
            Host a conversation
          </span>
        </div>
        <br />
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <img src={currentPhoto} alt='logo' width='50%' />
            <br />
            <Button variant='contained'>
              <label
                htmlFor='file-upload'
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <CameraAlt />{' '}
                <span style={{marginLeft: '5px'}}>Edit Photo</span>
              </label>
            </Button>
            <br />
            <input id='file-upload' type='file' style={{display: 'none'}} />

            <br />

            <TextField
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant='filled'
              fullWidth
            />
            <br />
            <KeyboardDatePicker
              margin='normal'
              id='date-picker-dialog'
              label='Event date and time'
              format='MM/dd/yyyy'
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
            <br />
            {participants.length > 0 && (
              <div className='conversation-invites'>
                {participants.map((element, index) => {
                  return (
                    <div key={index} className='conversation-participant-chip'>
                      <Chip
                        label={element}
                        onDelete={() => {
                          setParticipants(
                            participants.filter(
                              (participant) => participant !== element,
                            ),
                          );
                          setParticipant('');
                        }}
                        color='secondary'
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <br />
            <TextField
              label='Enter participant'
              variant='filled'
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
              onKeyDown={addParticipant}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <div style={{margin: 'auto'}}>
              <Button
                color='secondary'
                style={{marginRight: '10px'}}
                variant='contained'>
                <Save /> Save
              </Button>
              <Button style={{marginRight: '10px'}} variant='contained'>
                <Cancel /> Cancel
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    </CommonComponent>
  );
}
