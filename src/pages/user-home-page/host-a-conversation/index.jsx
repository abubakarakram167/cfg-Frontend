import React, {useState, useEffect} from 'react';
import CommonComponent from '../common-component';
import {makeStyles} from '@material-ui/core/styles';
import {Forum, Save, Cancel, CameraAlt} from '@material-ui/icons';
import Logo from 'assets/Logo.png';
import {TextField, Chip, withStyles, MenuItem} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {getSignedUrl} from '../../../redux/actions/media';
import MediaUpload from 'components/MediaUpload';
import CameraIcon from '@material-ui/icons/CameraAlt';
import {KeyboardDatePicker} from '@material-ui/pickers';
import moment from 'moment';
import './style.css';
import {onGetUserList} from '../../../redux/actions';
import userList from '@crema/services/db/userList';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import {createSessionTitle, sendInvite} from 'redux/actions/sessionActions';
import {Show_Message} from '../../../shared/constants/ActionTypes';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {DateTimePicker} from '@material-ui/pickers';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

const StyledChip = withStyles((theme) => ({
  label: {
    fontSize: 10,
    fontWeight: 400,
  },
  icon: {
    fontSize: 15,
  },
}))(Chip);

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

export default React.memo(function HostAConversation() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const handleDateChange = (date) => {
    console.log('the date', date);
    setDate(date);
  };
  const [showDialogue, setShowDialogue] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState({});
  const [inviteUserIds, setInviteUserIds] = useState([]);
  const dispatch = useDispatch();
  const usersList = useSelector(({userList}) => userList.usersList);
  const userList = useSelector((state) => state.userList);
  const [open1, setOpen1] = useState(false);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    dispatch(onGetUserList({page: 0}));
  }, [dispatch]);

  const sendInvites = async (contentId) => {
    let allInvites = [];
    const body = {
      cfg_id: contentId,
      detail: '',
    };
    for (let user of inviteUserIds) {
      allInvites.push(sendInvite({...body, user_id: user}));
    }

    try {
      let allInvitesSent = await Promise.all(allInvites);
      setTimeout(() => {
        history.push(`/home`);
      }, 1000);
    } catch (err) {
      console.log('the error or recieving..', err);
    }
  };

  const createHostConversation = () => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    const payload = {
      title: name,
      sub_title: '',
      detail: '',
      start_date: date,
      end_date: moment().format('MM/DD/YYYY'),
      status: 'draft',
      type: 'mini',
      featured_image_url: featuredImageUrl.fileName,
      assigned_group: 'candidate',
      total_points: 0,
      facilitator: user.id,
      meeting_start_time: new Date(date),
    };
    console.log('the payload before', payload);
    dispatch(createSessionTitle(payload, 'mini')).then((response) => {
      dispatch({
        type: Show_Message,
        payload: {message: 'Mini Cfg Created Successfully', success: true},
      });
      setTimeout(() => {
        dispatch({
          type: Show_Message,
          payload: {message: null, success: false},
        });
      }, 1000);

      sendInvites(response.content.id);
    });
  };

  const handleClose1 = () => {
    setOpen1(false);
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  return (
    <CommonComponent left={''} right={''}>
      <Snackbar
        open={userList.message}
        autoHideDuration={6000}
        onClose={handleClose1}>
        <Alert
          variant='filled'
          onClose={handleClose1}
          severity={userList.success ? 'success' : 'error'}>
          {userList.message}
        </Alert>
      </Snackbar>
      <div className='host-a-conversation-container'>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Forum />{' '}
          <span style={{marginLeft: '20px', fontSize: '18px'}}>
            Create a Session To Host
          </span>
        </div>
        <br />
        <div className='whole-container' variant='outlined'>
          <div className='image-container'>
            <img
              src={
                featuredImageUrl.newUrl && featuredImageUrl.fileName
                  ? featuredImageUrl.newUrl
                  : Logo
              }
              className={featuredImageUrl.newUrl ? 'feature-image' : 'image'}
            />
          </div>
          <div style={{textAlign: 'end'}}>
            <button
              onClick={() => setShowDialogue(true)}
              style={{
                position: 'relative',
                bottom: 50,
                right: '5%',
                padding: 10,
                paddingTop: 7,
                paddingBottom: 7,
                borderRadius: 7,
                borderWidth: 1,
                borderColor: 'darkgray',
                color: '#4c4343',
              }}>
              <CameraIcon style={{fontSize: 10, marginRight: 5}} />
              Edit Photo
            </button>
          </div>
          <TextField
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant='filled'
            fullWidth
          />
          <MediaUpload
            showDialogue={showDialogue}
            onClose={() => setShowDialogue(false)}
            onImageSave={(file) => {
              getSignedUrl(file[0]).then((res) => {
                setFeaturedImageUrl(res);
              });
            }}
          />
          <br />
          {/* <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label='Event date and time'
            format='MM/DD/YYYY'
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
          /> */}

          <DateTimePicker
            style={{
              backgroundColor: '#e7e7e7',
              marginTop: 10,
              marginBottom: 10,
              paddingLeft: 10,
              paddingTop: 10,
            }}
            onChange={handleDateChange}
            value={date}
            fullWidth
            label='Event Date and Time'
          />
          <br />
          <div>
            {categories && categories.length > 0 && <span>Invite users:</span>}

            {categories && categories.length
              ? categories.map((element, index) => {
                  return (
                    <Chip
                      label={element}
                      key={index}
                      className='chip-style'
                      onDelete={() => {
                        setCategories(
                          categories.filter((value) => value !== element),
                        );
                      }}
                    />
                  );
                })
              : null}
          </div>
          <div style={{height: 60}}>
            {/* <TextField
                variant='filled'
                value={categoryValue}
                required
                onSubmit={(e) =>
                  setCategories([...categories, e.target.value])
                }
                onChange={(e) => setCategoryValue(e.target.value)}
                fullWidth
                label='Categories'
              /> */}
            {/* <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              onChange={(e) => {
                const {first_name, id} = e.target.value;
                let changeInviteIds = inviteUserIds;
                if (e.target.value) {
                  setCategoryValue(first_name);

                  if (!inviteUserIds.includes(id)) {
                    changeInviteIds.push(id);
                    setCategories([...categories, first_name]);
                  } else {
                    setCategories(
                      categories.filter((category) => category !== first_name),
                    );
                    changeInviteIds = changeInviteIds.filter(
                      (value) => value !== id,
                    );
                  }
                  console.log('the change', changeInviteIds);
                  setInviteUserIds(changeInviteIds);

                  setCategoryValue('');
                }
                console.log('the user on change id', inviteUserIds);
              }}
              variant='filled'
              fullWidth
              value={usersList.length ? usersList[0] : ''}
              label='Invite Users'
              required
              options = {usersList.map((user) => {
                return {
                  label: user.first_name,
                  value: user
                }
              })}
              /> */}
            <Select
              defaultValue={usersList.length ? usersList[0] : ''}
              placeholder={'Select users to invite'}
              onChange={(e) => {
                const {first_name, id} = e.value;
                let changeInviteIds = inviteUserIds;
                if (e.value) {
                  setCategoryValue(first_name);

                  if (!inviteUserIds.includes(id)) {
                    changeInviteIds.push(id);
                    setCategories([...categories, first_name]);
                  } else {
                    setCategories(
                      categories.filter((category) => category !== first_name),
                    );
                    changeInviteIds = changeInviteIds.filter(
                      (value) => value !== id,
                    );
                  }
                  console.log('the change', changeInviteIds);
                  setInviteUserIds(changeInviteIds);
                  setCategoryValue('');
                }
                console.log('the user on change id', inviteUserIds);
              }}
              options={usersList.map((user) => {
                return {
                  label: user.first_name,
                  value: user,
                };
              })}
            />

            {/* <button
                className='flex-button preview form-button-add'
                onClick={() => {
                  setCategories([...categories, categoryValue]);
                  setCategoryValue('');
                }}>
                <AddCircleIcon style={{fill: '#ffffff', fontSize: 15}} />{' '}
                <span onClick = {handleCategorySubmit} className='button-text custom-add-button'>Add</span>
              </button>    */}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <StyledChip
              icon={<CancelIcon style={{fill: 'white'}} />}
              label={'Cancel'}
              className='gray-chip'
              onClick={() => {}}
            />
            <StyledChip
              icon={<SaveIcon style={{fill: 'white'}} />}
              label={'Save'}
              className='chip-style'
              onClick={() => {
                createHostConversation();
              }}
            />
          </div>
        </div>
      </div>
    </CommonComponent>
  );
});
