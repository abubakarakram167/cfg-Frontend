import React, {useState} from 'react';
import {makeStyles, TextField, Checkbox} from '@material-ui/core';
import SunEditor from '../../components/sunEditor';

const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    justifyContent: 'space-between',
    overflowY: 'auto',
  },
}));

const AddNewQuestion = ({onSave, onClose}) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [isAddToBank, setIsAddToBank] = useState(false);

  const handleSave = async () => {
    if (question !== '') {
      await onSave({
        question,
        questionDetail,
        isAddToBank,
      });
    }
    onClose();
  };

  return (
    <div className={classes.cont}>
      <span>
        Add To Bank{' '}
        <Checkbox
          checked={isAddToBank}
          onChange={() => {
            setIsAddToBank(!isAddToBank);
          }}
        />{' '}
      </span>

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
      <SunEditor
        onContentSave={(content) => setQuestionDetail(content)}
        content={questionDetail}
        onContentChanged={() => console.log('heree')}
      />
      <div className='d-block' style={{textAlign: 'center'}}>
        <button
          className='button primary_button_custom'
          style={{marginRight: 10}}
          onClick={() => handleSave()}>
          <div className='d-flex align-items-center justify-content-center'>
            Save
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddNewQuestion;
