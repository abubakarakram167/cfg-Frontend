import React from 'react';
import ReactPlayer from 'react-player';
import {Card} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './style.css';
import {QueryBuilder} from '@material-ui/icons';
const Event = ({element}) => {
  return (
    <div className='event-card-container'>
      <Card>
        <div className='event-card-container-video'>
          <ReactPlayer url={element.url} />
        </div>
        <br />
        <hr />

        <div className='event-card-container-text'>
          <strong>{element.title}</strong>
          <br />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FiberManualRecordIcon style={{color: 'red'}} />{' '}
            <span style={{marginLeft: '5px'}}>Live Now</span>
          </div>

          <div style={{color: 'green'}}>
            <strong>{element.status}</strong>
          </div>
          <div style={{color: 'red'}}>
            <strong>{element.points}P</strong>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <QueryBuilder />{' '}
            <span style={{marginLeft: '5px'}}>{element.duration} mins</span>
          </div>

          <div>{element.summary}</div>
        </div>
      </Card>
    </div>
  );
};

export default Event;
