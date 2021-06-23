import React, {useState} from 'react';
import {
  makeStyles,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: '25px',
    marginRight: '15px',
    fontSize: '12px',
  },
  questionCard: {
    backgroundColor: '#f6f6f6',
    fontSize: '1.3rem',
    padding: '15px',
    border: '1px solid grey',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    maxHeight: '500px',
    overflowY: 'scroll',
  },
  formGroup: {},
  btnCont: {
    margin: '15px 0',
  },
  formControlling: {
    '& .MuiTypography-root': {
      width: '100%',
    },
  },
}));

const AddFromBank = ({
  onImport,
  onClose,
  bankQuestions,
  quizName,
  onDelete,
}) => {
  const classes = useStyles();
  const data = bankQuestions;
  // const data = [
  //   {
  //     question: 'What can mindfulness do for teachers?',
  //     quizName: 'CFG For Secondary Schools',
  //     id: 'one',
  //     answers: [
  //       {option: 'First', points: 0},
  //       {option: 'Second', points: 10},
  //       {option: 'Third', points: 0},
  //       {option: 'Fourth', points: 0},
  //     ],
  //   },
  //   {question: 'Who are you?', quizName: 'jksdfd', id: 'two', answers: []},
  //   {
  //     question: 'Gibberreishsiio',
  //     quizName: 'jjsd nb s f',
  //     id: 'three',
  //     answers: [],
  //   },
  //   {question: 'uoa hber?', quizName: 'oa ai dhef', id: 'four', answers: []},
  //   {question: 'sdfghdf rt e', quizName: 'dsdfgsd', id: 'five', answers: []},
  //   {question: 'sdfghdf rt e', quizName: 'dsdfgsd', id: 'six', answers: []},
  //   {question: 'sdfghdf rt e', quizName: 'dsdfgsd', id: 'seven', answers: []},
  // ];
  const [list, setList] = useState(data);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  console.log('the list', bankQuestions);

  const handleChange = (event) => {
    let tempArray = [...selected];
    if (event.target.checked) {
      let select = list.find((l) => l.id == event.target.name);
      tempArray.push(select);
    } else {
      tempArray = tempArray.filter((l) => l.id !== event.target.name);
    }
    setSelected(tempArray);
  };

  const handleSelectAll = (e) => {
    setSelectAll(e);
    if (e) {
      setSelected(list);
    } else {
      setSelected([]);
    }
  };

  const deleteSelected = () => {
    let difference = _.difference(list, selected);
    setList(difference);
    onDelete(selected);
  };

  const importSelected = async () => {
    await onImport(selected);
    onClose();
  };

  const importSingle = async (e) => {
    await onImport([e]);
    onClose();
  };

  return (
    <div>
      <div className={classes.btnCont}>
        <Button
          variant='contained'
          onClick={deleteSelected}
          style={{backgroundColor: 'grey'}}
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}>
          DELETE SELECTED QUESTION FROM BANK
        </Button>

        <Button
          variant='contained'
          onClick={importSelected}
          style={{backgroundColor: 'red'}}
          color='secondary'
          className={classes.button}
          startIcon={<CheckCircleIcon />}>
          IMPORT ALL SELECTED QUESTIONS
        </Button>
      </div>

      <div>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            }
            label='Select All Questions'
          />
          <FormGroup className={classes.formGroup}>
            {list &&
              list.map((l) => (
                <div className={classes.questionCard}>
                  <FormControlLabel
                    style={{width: '100%'}}
                    className={classes.formControlling}
                    control={
                      <Checkbox
                        checked={selected.indexOf(l) !== -1}
                        onChange={handleChange}
                        name={l.id}
                      />
                    }
                    label={
                      <Card
                        quizName={quizName}
                        data={l}
                        importData={(e) => importSingle(e)}
                      />
                    }
                  />
                </div>
              ))}
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default AddFromBank;

const Card = ({data, importData, quizName}) => {
  const classes = useStyles();
  const {question} = data;
  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: 1, flexDirection: 'column'}}>
        <p style={{marginBottom: '0px'}}>{question}</p>
        <p style={{marginBottom: '0px'}}>
          <strong>Quiz Name: </strong>
          {quizName}
        </p>
      </div>
      <div style={{flex: 1}}>
        <Button
          variant='contained'
          onClick={() => importData(data)}
          style={{backgroundColor: 'red'}}
          color='secondary'
          className={classes.button}
          startIcon={<AddCircleOutlinedIcon />}>
          IMPORT THIS QUESTION
        </Button>
      </div>
    </div>
  );
};
