import React from 'react';
import './style.css';
import {List, ListItem, ListItemText} from '@material-ui/core';
export default function Summary(props) {
  return (
    <div class='summary-list'>
      <List style={{backgrounColor: '#AF0C0C'}}>
        <ListItem>
          <ListItemText>
            <div className='summary-list-content'>
              <span className='summary-property-name'>Points Achieved</span>
              <span className='summary-property-value'>
                {props.pointsAchieved}
              </span>
            </div>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <div className='summary-list-content'>
              <span className='summary-property-name'>Points Redeemed</span>
              <span className='summary-property-value'>
                {props.pointsRedeemed}
              </span>
            </div>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <div className='summary-list-content'>
              <span className='summary-property-name'>Balance</span>
              <span className='summary-property-value'>{props.balance}</span>
            </div>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
