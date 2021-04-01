import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AdminHeader from 'pages/admin-header';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ControlPoint from '@material-ui/icons/ControlPoint';
import FilterList from '@material-ui/icons/FilterList';
import {getUserPreferencesList} from '../../redux/actions/Preference';
import CustomTablePagination from '../user-management/pagination';
import EditIcon from '@material-ui/icons/Edit';
import {editPreferenceInList} from '../../redux/actions/Preference';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Show_Message} from '../../shared/constants/ActionTypes';
import '../user-management/style.css';
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'none',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
    color: '#6b6b6b',
    fontWeight: 500,
    paddingTop: 16,
    paddingBottom: 16,
  },
}))(TableCell);
const ValueTableCell = withStyles((theme) => ({
  root: {
    width: 300,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTable = withStyles((theme) => ({
  root: {
    wordBreak: 'break-all',
    width: '100%',
  },
}))(Table);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Preferences() {
  // const [preferences, setPreferences] = useState([
  //   {
  //     checked: false,
  //     option: 'Login with username',
  //     value: 'Jane Doe',
  //     description: 'hello world this is a description',
  //   },
  //   {
  //     checked: false,
  //     option: 'Login with username',
  //     value: 'Jane Doe',
  //     description: 'hello world this is a description',
  //   },
  //   {
  //     checked: false,
  //     option: 'Login with username',
  //     value: 'Jane Doe',
  //     description: 'hello world this is a description',
  //   },
  //   {
  //     checked: false,
  //     option: 'Login with username',
  //     value: 'Jane Doe',
  //     description: 'hello world this is a description',
  //   },
  // ]);
  const [option, setOption] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [optionFilter, setOptionFilter] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCheckState, setCurrentCheckState] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allPreferenceIds, setPreferenceIds] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {preferenceList} = useSelector((state) => state.preference);
  const message = useSelector((state) => state.userList);

  if (preferences.length === 0 && preferenceList.length)
    setPreferences(preferenceList);

  useEffect(() => {
    dispatch(getUserPreferencesList());
  }, [dispatch, preferences]);

  console.log('the option', optionFilter);

  const toggleCheckbox = (id) => {
    setPreferences(
      preferences.filter((data, index) => {
        if (id === data.id) {
          data.checked = !data.checked;
          return data;
        }
        return data;
      }),
    );
  };

  const toggleAll = () => {
    setPreferences(
      preferences.filter((data, index) => {
        data.checked = !currentCheckState;
        setCurrentCheckState(!currentCheckState);
        return data;
      }),
    );
  };
  const handleClose1 = () => {
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const changedPreferenceData = preferences.map((preference) => {
      if (allPreferenceIds.includes(preference.id)) {
        return {
          ...preference,
          option_value: value,
        };
      } else return preference;
    });
    dispatch(editPreferenceInList(value, changedPreferenceData));

    setPreferences(changedPreferenceData);
    setOption('');
    setValue('');
    setDescription('');
    setDialogOpen(false);
  };

  return (
    <div style={{marginBottom: 100}}>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Edit New Preferences</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                label='Option'
                variant='filled'
                fullWidth
                disabled={true}
                value={option}
                onChange={(e) => setOption(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Value'
                variant='filled'
                value={value}
                fullWidth
                onChange={(e) => setValue(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Description'
                variant='filled'
                disabled={true}
                value={description}
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Button size='large' onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button size='large' type='submit'>
                  Save
                </Button>
              </div>
            </ListItem>
          </List>
        </form>
      </Dialog>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <br />
      <Container>
        <Snackbar
          open={message.message}
          autoHideDuration={6000}
          onClose={handleClose1}>
          <Alert
            onClose={handleClose1}
            severity={message.success ? 'success' : 'error'}>
            {message.message}
          </Alert>
        </Snackbar>
        <div className='options'>
          <Typography variant='h6'>Preferences</Typography>
          <Chip
            icon={<EditIcon style={{fill: 'white'}} />}
            label={'Edit Preference'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
          />
        </div>
        <br />
        <TableContainer component={Paper}>
          <StyledTable className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox checked={currentCheckState} onChange={toggleAll} />
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Option </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Option'
                      placeholder=''
                      value={optionFilter}
                      onChange={(e) => setOptionFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell size='small'>
                  <span className='column-heading'> Value </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Value'
                      placeholder=''
                      value={valueFilter}
                      onChange={(e) => setValueFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell size='large'>
                  <span className='column-heading'> Description </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Description'
                      placeholder=''
                      value={descriptionFilter}
                      onChange={(e) => setDescriptionFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {preferences.length &&
                rowsPerPage > 0 &&
                preferences
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((element) =>
                    (element.option_description
                      ? element.option_description
                      : ' '
                    )

                      .toLowerCase()
                      .startsWith(descriptionFilter),
                  )
                  .filter((element) =>
                    (element.option_name ? element.option_name : ' ')
                      .toLowerCase()
                      .startsWith(optionFilter),
                  )
                  .filter((element) =>
                    (element.option_value ? element.option_value : ' ')
                      .toLowerCase()
                      .startsWith(valueFilter),
                  )
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Checkbox
                          checked={row.checked}
                          onChange={() => {
                            console.log('the row status', row);
                            let allIds = allPreferenceIds;
                            if (!allIds.includes(row.id)) allIds.push(row.id);
                            else
                              allIds = allIds.filter(
                                (userId) => userId !== row.id,
                              );
                            setPreferenceIds(allIds);
                            setPreferenceId(row.id);
                            setOption(row.option_name);
                            setValue(row.option_value);
                            setDescription(row.option_description);
                            toggleCheckbox(row.id);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{row.option_name}</StyledTableCell>

                      <ValueTableCell size='small'>
                        {row.option_value}
                      </ValueTableCell>

                      <StyledTableCell>
                        {row.option_description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              <CustomTablePagination
                rowsPerPage={rowsPerPage}
                page={page}
                userData={preferences}
                setPage={(page) => setPage(page)}
                setRowsPerPage={(page) => setRowsPerPage(page)}
              />
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Container>
    </div>
  );
}
