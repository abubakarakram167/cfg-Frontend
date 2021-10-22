import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AdminHeader from 'pages/admin-header';
import './journal.css';
import moment from 'moment';
import {getUserJourney} from '../../redux/actions/journal';

export default function MediaLibrary() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

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

  console.log('all the journals', allJournals);

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
          {allJournals.map((journal) => {
            return (
              <div className='journal-container'>
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
                <p style={getColorStatus(journal.status)}> {journal.status} </p>
                <p className='journal-points'> {journal.points + 'P'} </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
