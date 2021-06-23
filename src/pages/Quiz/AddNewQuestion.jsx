import React, {useState} from 'react';
import {makeStyles, TextField, Checkbox} from '@material-ui/core';
import SunEditor from '../../components/sunEditor';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    flexDirection: 'column',
    height: '520px',
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
        changeHeight={true}
      />
      <div className='d-block' style={{textAlign: 'center'}}>
        <button
          className='button primary_button_custom'
          style={{marginRight: 10, backgroundColor: 'red', borderColor: 'red'}}
          onClick={() => handleSave()}>
          <SaveIcon style={{fill: 'white', fontSize: 25}} />
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNewQuestion;
