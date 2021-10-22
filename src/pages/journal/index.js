import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AdminHeader from 'pages/admin-header';
import './journal.css';

export default function MediaLibrary() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const allJournals = useSelector((state) => {
    return state.journal.userJournals;
  });

  useEffect(() => {}, []);

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
        <img className='image' src={require('../../assets/journey.png')} />
        <div class='hilight'>
          <h2>Hockey</h2>
          <p>Sample text</p>
        </div>
      </div>
    </div>
  );
}
