import React from 'react';
import './style.css';
export default function index({group}) {
  return (
    <div className='user-group-container'>
      <img src={group.image} width='100px' height='100px' alt={group.title} />
      <strong style={{marginLeft: '10px'}}>{group.title}</strong>
    </div>
  );
}
