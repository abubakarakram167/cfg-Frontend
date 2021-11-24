import React from 'react';
import ReactPlayer from 'react-player';
import {Card} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './style.css';
import {AccessTimeOutlined, PlayArrowOutlined} from '@material-ui/icons';

const Event = ({element}) => {
  return (
    <div className='event-card-container'>
      <Card>
        <div className='event-card-container-video'>
          <ReactPlayer
            height='450px'
            width='100%'
            style={{width: '100%', height: '100%'}}
            url={element.url}
          />
        </div>
        {/* <br /> */}

        {/* <div className='event-card-container-text'>
          <strong>{element.title}</strong>
          <br />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FiberManualRecordIcon style={{color: 'red'}} />{' '}
            <span style={{marginLeft: '5px'}}>
              {' '}
              {element.type === 'live-video' ? 'Live Now' : 'Recording'}
            </span>
          </div>

          {element.duration > 0 && (
            <div>
              <div style={{color: 'green'}}>
                <strong>Now</strong>
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
                <AccessTimeOutlined style={{fill: 'gray', fontSize: 16}} />{' '}
                <span
                  style={{
                    marginLeft: '5px',
                    marginLeft: 5,
                    color: '#767676',
                    fontWeight: 500,
                  }}>
                  Duration {element.duration} mins
                </span>
              </div>
            </div>
          )}
          <div style={{textAlign: 'left', width: '40%', margin: 'auto'}}>
            {element.summary}
          </div>

          <a
            href={element.url}
            target='_blank'
            class='youtube-button'
            rel='noreferrer'>
            {' '}
            <PlayArrowOutlined style={{fill: 'white', fontSize: 18}} /> Watch it{' '}
          </a>
        </div> */}
      </Card>
    </div>
  );
};

export default Event;
