import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AdminHeader from 'pages/admin-header';
import './journal.css';
import moment from 'moment';
import {getUserJourney, deleteJournal} from '../../redux/actions/journal';
import {Select, MenuItem} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import JournalModal from '../../components/JournalModal';

export default function MediaLibrary() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [subject, setSubject] = useState(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [content, setContent] = useState('');
  const [isContentChange, setContentChanged] = useState(false);
  const [journalId, setJournalId] = useState(null);

  const allJournals = useSelector((state) => {
    return state.journal.userJournals;
  });

  const getColorStatus = (status) => {
    let style = {color: 'green', fontSize: 16, margin: 1};
    if (status === 'Complete') style.color = 'green';
    else if (status === 'In Progress') style.color = '#787474';
    else if (status === 'Not Started') style.color = 'grey';
    else style.color = 'red';

    return style;
  };

  const getUserJourneys = () => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    dispatch(getUserJourney(user.id));
  };

  useEffect(() => {
    getUserJourneys();
  }, []);

  return (
    <div>
      <AdminHeader />
      {/* <div className = "outer-div" >
        <img 
          className = "image"
          src = {require('../../assets/journey.png')} 
        />
      </div> */}
      <div class='promo'>
        <img
          className='image'
          src={require('../../assets/new_journey_image.png')}
        />
        <div class='hilight'>
          <div>
            {!type && (
              <span
                style={{
                  color: '#666666',
                  position: 'absolute',
                  left: 10,
                  marginTop: 15,
                }}>
                Type
              </span>
            )}
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              onChange={(e) => setType(e.target.value)}
              variant='filled'
              fullWidth
              defaultValue='journal'
              value={type}
              label='Type'
              style={{backgroundColor: 'transparent', borderBottom: 0}}
              required>
              <MenuItem value={null}>Not any</MenuItem>
              <MenuItem value={'goal'}>Goal</MenuItem>
              <MenuItem value={'journey'}>Journey</MenuItem>
              <MenuItem value={'journal'}>Journal</MenuItem>
            </Select>
          </div>
          <div>
            {!status && (
              <span
                style={{
                  color: '#666666',
                  position: 'absolute',
                  left: 10,
                  marginTop: 15,
                }}>
                Status
              </span>
            )}
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              onChange={(e) => setStatus(e.target.value)}
              variant='filled'
              fullWidth
              defaultValue='journal'
              value={status}
              label='Status'
              style={{backgroundColor: 'transparent'}}
              required>
              <MenuItem value={null}> Not any </MenuItem>
              <MenuItem value={'Not Started'}>Not Started</MenuItem>
              <MenuItem value={'In Progress'}>In Progress</MenuItem>
              <MenuItem value={'Complete'}>Complete</MenuItem>
              <MenuItem value={'Overdue'}>Overdue</MenuItem>
            </Select>
          </div>

          {allJournals
            .filter((journal) => {
              if (status && type)
                return journal.status === status && type === journal.type;
              else if (status || type)
                return journal.status === status || type === journal.type;
              else return true;
            })
            .map((journal) => {
              return (
                <div
                  onClick={() => {
                    setShowJournalModal(true);
                    setJournalId(journal.id);
                    setSubject(journal.subject);
                  }}
                  className='journal-container'>
                  <p className='journal-title'>{journal.subject}</p>
                  <p className='journal-date-interval'>
                    {' '}
                    <span>
                      {' '}
                      {moment(journal.start_date).format(
                        'YYYY-MM-DD HH:MM',
                      )} - {moment(journal.end_date).format('YYYY-MM-DD HH:MM')}{' '}
                    </span>
                  </p>
                  <p style={getColorStatus(journal.status)}>
                    {' '}
                    {journal.status}{' '}
                  </p>
                  <div
                    style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span className='journal-points'>
                      {' '}
                      {journal.points + 'P'}{' '}
                    </span>
                    <DeleteIcon
                      style={{color: '#605d5d', fontSize: 28, marginRight: 10}}
                      onClick={() =>
                        dispatch(deleteJournal(journal.id)).then((res) => {})
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <AddCircleIcon
          onClick={() => {
            setShowJournalModal(true);
          }}
          fill='transparent'
          style={{
            color: '#e91010',
            fontSize: 35,
            top: '93%',
            right: '2%',
            position: 'absolute',
          }}
        />
        <JournalModal
          onOpen={() => setShowJournalModal(true)}
          onClose={() => {
            setShowJournalModal(false);
            setJournalId(null);
            getUserJourneys();
          }}
          show={showJournalModal}
          journalId={journalId}
          getJournalData={(journalData) => {
            setJournalId(journalData ? journalData.id : null);
          }}
          subject={subject}
          parent='home'
          showTextField={true}
        />
      </div>
    </div>
  );
}
