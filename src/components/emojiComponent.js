import React, {useState} from 'react';
import Picker from 'emoji-picker-react';
import './emojiComponent.css';

const App = (props) => {
  const onEmojiClick = (event, emojiObject) => {
    props.onGetEmoji(emojiObject.emoji);
  };

  return (
    <div>
      {props.show && (
        <Picker className='picker-emoji' onEmojiClick={onEmojiClick} />
      )}
    </div>
  );
};

export default App;
