import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import './style.css';
export default function AchievementList(props) {
  return (
    <div>
      <div className='achivement-list-title'>{props.element.title}</div>
      <List>
        {props.element.achievementList.map((element, index) => {
          return (
            <ListItem key={index}>
              <ListItemText>
                <div className='achievement-list-elements'>
                  <span>
                    {index + 1}. <strong>{element.text}</strong>
                  </span>
                  <strong>{element.points} Points</strong>
                </div>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
