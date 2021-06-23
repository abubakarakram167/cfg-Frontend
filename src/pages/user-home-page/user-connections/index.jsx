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
import CommonComponent from '../common-component';
import Friend from 'redux/services/friends';

import './style.css';
export default function UserConnections() {
  const [requestsExpanded, setRequestsExpanded] = useState(true);
  const [requestSent, setRequestsSent] = useState(true);
  const [connectionsView, setConnectionView] = useState(true);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [reloadData, setReloadData] = useState(true);

  const toggleReloadData = () => {
    setReloadData(!reloadData);
  };
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
  async function getRequests() {
    const data = await Friend.getFriendRequests();
    if (data) {
      if (data.data) {
        setFriendRequests(data.data);
      }
    }
  }

  async function getSentRequests() {
    const data = await Friend.getSentFriendRequests();
    if (data) {
      if (data.data) {
        setSentFriendRequests(data.data);
      }
    }
  }

  async function getFriends() {
    const data = await Friend.getFriends();
    if (data) {
      if (data.data) {
        setFriends(data.data);
      }
    }
  }

  useEffect(() => {
    getFriends();
    getRequests();
    getSentRequests();
  }, [reloadData]);

  const left = (
    <div>
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
      {requestsExpanded && (
        <div className='requests-section-list'>
          {friendRequests.map((element, index) => {
            return (
              <UserInfoBox
                key={index}
                type={'request'}
                userId={element.userId}
                setSelected={setSelected}
                toggleReloadData={toggleReloadData}
              />
            );
          })}
        </div>
      )}
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
          sentFriendRequests.map((element, index) => {
            return (
              <UserInfoBox
                key={index}
                userId={element.userId}
                setSelected={setSelected}
                type={'sent'}
                toggleReloadData={toggleReloadData}
              />
            );
          })}
      </div>
    </div>
  );

  const right = (
    <div>
      <div className='requests-section'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Mail style={{color: '#E09B3B', marginRight: '5px'}} />
          <strong>My Connections</strong>
        </div>
        {!connectionsView ? (
          <ExpandMore onClick={toggleConnectionView} />
        ) : (
          <ExpandLess onClick={toggleConnectionView} />
        )}{' '}
      </div>
      <div className='requests-section-list'>
        {connectionsView &&
          friends.map((element, index) => {
            return (
              <UserInfoBox
                userId={element}
                type={'connection'}
                key={index}
                setSelected={setSelected}
                toggleReloadData={toggleReloadData}
              />
            );
          })}
      </div>
      <br />
      {/* <Button color='secondary' variant='contained' fullWidth>
        Add Friend
      </Button> */}
    </div>
  );
  return (
    <CommonComponent left={left} right={right}>
      {currentlySelected && <UserDetails element={currentlySelected} />}

      <div className='mobile-connections-view'>
        {left}
        {right}
      </div>
    </CommonComponent>
  );
}
