import React, {useState, useEffect} from 'react';
import UserPageHeader from '../user-page-header';
import UserInfoBox from './user-info-box';
import UserDetails from './user-details';
import {
  ExpandMore,
  ExpandLess,
  GroupAdd,
  Mail,
  AddCircle,
} from '@material-ui/icons';
import {Button} from '@material-ui/core';

import './style.css';
export default function UserConnections() {
  const [requestsExpanded, setRequestsExpanded] = useState(true);
  const [requestSent, setRequestsSent] = useState(true);
  const [connectionsView, setConnectionView] = useState(true);
  const [currentlySelected, setCurrentlySelected] = useState(null);

  const setSelected = (element) => {
    setCurrentlySelected(element);
  };
  const toggleConnectionView = () => {
    setConnectionView(!connectionsView);
  };

  const toggleRequestsSent = () => {
    setRequestsSent(!requestSent);
  };

  const toggleRequestsExpanded = () => {
    setRequestsExpanded(!requestsExpanded);
  };

  const requestsFakeData = [
    {
      name: 'Kamala Harris',
      image:
        'https://mediad.publicbroadcasting.net/p/shared/npr/styles/x_large/nprshared/202011/881415541.jpg',
      mutualCount: 2,
      type: 'request',
    },
    {
      name: 'Donald Trump',
      image:
        'https://bsmedia.business-standard.com/_media/bs/img/article/2021-02/23/full/1614048401-668.jpg',
      mutualCount: 2,
      type: 'request',
    },
    {
      name: 'Joe Biden',
      image:
        'https://www.aljazeera.com/wp-content/uploads/2020/08/cdad9943b3564adbb0c4747ab7819375_18.jpeg?fit=1000%2C561',
      mutualCount: 2,
      type: 'sent',
    },
    {
      name: 'Barack Obama',
      image:
        'https://assets.vogue.com/photos/59839f025ce7e830e273e428/master/w_2560%2Cc_limit/00-lede-barack-obama-five-things.jpg',
      mutualCount: 1,
      type: 'connection',
    },
  ];

  return (
    <div>
      <UserPageHeader />
      <div className='user-connection-container'>
        <div className='user-connection-container-left'>
          <div className='requests-section'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <GroupAdd style={{color: 'green', marginRight: '5px'}} />
              <strong>Connection Requests</strong>
            </div>
            {!requestsExpanded ? (
              <ExpandMore onClick={toggleRequestsExpanded} />
            ) : (
              <ExpandLess onClick={toggleRequestsExpanded} />
            )}
          </div>
          <div className='requests-section-list'>
            {requestsExpanded &&
              requestsFakeData.map((element, index) => {
                if (element.type === 'request') {
                  return (
                    <UserInfoBox
                      key={index}
                      userData={element}
                      setSelected={setSelected}
                    />
                  );
                }
              })}
          </div>
          <br />
          <div className='requests-section'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Mail style={{color: '#E09B3B', marginRight: '5px'}} />
              <strong>Requests Sent</strong>
            </div>
            {!requestSent ? (
              <ExpandMore onClick={toggleRequestsSent} />
            ) : (
              <ExpandLess onClick={toggleRequestsSent} />
            )}
          </div>
          <div className='requests-section-list'>
            {requestSent &&
              requestsFakeData.map((element, index) => {
                if (element.type === 'sent') {
                  return (
                    <UserInfoBox
                      key={index}
                      userData={element}
                      setSelected={setSelected}
                    />
                  );
                }
              })}
          </div>
        </div>
        <div className='user-connection-container-center'>
          {currentlySelected && <UserDetails element={currentlySelected} />}
        </div>
        <div className='user-connection-container-right'>
          <br />
          <div className='requests-section'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Mail style={{color: '#E09B3B', marginRight: '5px'}} />
              <strong>My Connections</strong>
            </div>
            {!connectionsView ? (
              <ExpandMore onClick={toggleConnectionView} />
            ) : (
              <ExpandLess onClick={toggleConnectionView} />
            )}{' '}
            <AddCircle style={{color: 'white', marginRight: '5px'}} />{' '}
            <Button color='secondary' variant='contained'>
              Add Friend
            </Button>
          </div>
          <div className='requests-section-list'>
            {connectionsView &&
              requestsFakeData.map((element, index) => {
                if (element.type === 'connection') {
                  return (
                    <UserInfoBox
                      userData={element}
                      key={index}
                      setSelected={setSelected}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
