import React from 'react';
import './style.css';
export default function CfgToolOfTheDay({url, title}) {
  return (
    <div className='cfg-tool-of-the-day-container'>
      <img className='cfg-tool-image' src={url} alt={title} />{' '}
      <span className='cfg-tool-text'>{title}</span>
    </div>
  );
}
