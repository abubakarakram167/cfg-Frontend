import React, {useState, useEffect} from 'react';
import CommonComponent from '../common-component';
import UserInfo from './userInfo';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {getResourceData} from 'redux/actions/cfg';

export default function UserEvents() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cfg);

  useEffect(() => {}, [state]);

  useEffect(() => {
    dispatch(getResourceData('event'));
  }, [dispatch]);

  return (
    <CommonComponent>
      <div>
        <div>
          <h1>Friend Requests</h1>
          <div className='row'>
            <UserInfo />
          </div>
        </div>
        <div>
          <h1>People you may know</h1>
        </div>
      </div>
    </CommonComponent>
  );
}
