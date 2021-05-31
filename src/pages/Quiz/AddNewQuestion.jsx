import React, {useState} from 'react';
import {makeStyles, TextField} from '@material-ui/core';
// import save from "../../../components/common/assets/icons/save.svg";

const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    justifyContent: 'space-between',
  },
}));

const AddNewQuestion = ({onSave, onClose}) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('');

  const handleSave = async () => {
    if (question !== '') {
      await onSave(question);
    }
    onClose();
  };

  return (
    <div className={classes.cont}>
      <TextField
        id='standard-full-width'
        label='Question'
        placeholder='Write your question here!'
        variant='filled'
        fullWidth
        margin='normal'
        onChange={(e) => setQuestion(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div className='d-block' style={{textAlign: 'center'}}>
        <button
          className='button primary_button'
          style={{marginRight: 10}}
          onClick={() => handleSave()}>
          <div className='d-flex align-items-center justify-content-center'>
            {/* <img src={save} /> */}
            <span style={{marginLeft: 5}}>Save</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddNewQuestion;
