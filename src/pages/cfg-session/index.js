import React, {useState, useEffect} from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import {Link, useHistory} from 'react-router-dom';
import CfgElement from 'pages/cfg-element';
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import formatDate from 'utils/formatDate';

import {useDispatch, useSelector} from 'react-redux';
import {createSession, getSessionData} from 'redux/actions/sessionActions';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'none',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CfgSession(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [content, setContent] = useState([]);
  const [checked, setChecked] = useState([]);
  const history = useHistory();
  useEffect(() => {
    setContent(state.content);
  }, [state]);

  useEffect(() => {
    dispatch(getSessionData());
  }, []);

  const [currentCheckState, setCurrentCheckState] = useState(false);

  const classes = useStyles();

  const toggleCheckbox = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((element) => element !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const toggleAll = () => {
    if (!currentCheckState) {
      console.log('here');
      let arr = [];
      content.forEach((element) => {
        arr.push(element.id);
      });
      setChecked(arr);
      setCurrentCheckState(true);
    } else {
      setCurrentCheckState(false);
      setChecked([]);
    }
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setend_date] = useState(new Date());
  const [total_points, settotal_points] = useState('');
  const [status, setStatus] = useState('draft');

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createSession({
        title,
        author,
        start_date: formatDate(start_date),
        end_date: formatDate(end_date),
        total_points,
        status,
      }),
    );

    setTitle('');
    setAuthor('');
    setstart_date(new Date());
    setend_date(new Date());
    settotal_points('');
    setStatus('');
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Add New CFG Session</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                label='Name'
                variant='filled'
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Author'
                variant='filled'
                fullWidth
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </ListItem>
            <ListItem>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='Start Date'
                value={start_date}
                onChange={(e) => setstart_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                required
              />
            </ListItem>
            <ListItem>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='End Date'
                value={end_date}
                onChange={(e) => setend_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Total Points'
                variant='filled'
                fullWidth
                onChange={(e) => settotal_points(e.target.value)}
                required
                type='number'
              />
            </ListItem>
            <ListItem>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant='filled'
                fullWidth
                label='status'
                required>
                <MenuItem value={''}>
                  <em>Status</em>
                </MenuItem>
                <MenuItem value={'saved'}>Saved</MenuItem>
                <MenuItem value={'draft'}>Draft</MenuItem>
                <MenuItem value={'published'}>Published</MenuItem>
              </Select>
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
        <div className='options'>
          <Typography variant='h6'>CFG Session</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
          />
          <Chip
            icon={<EditIcon style={{fill: 'white'}} />}
            label={'EDIT'}
            className='chip-style gray-chip'
          />
        </div>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox checked={currentCheckState} onChange={toggleAll} />
                </StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Author</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Total Points</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <Checkbox
                      checked={checked.includes(row.id)}
                      onChange={() => {
                        toggleCheckbox(row.id);
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    {' '}
                    <Link to={`/admin/cfg-session/${row.id}`}>
                      {row.title}{' '}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell>{row.start_date}</StyledTableCell>
                  <StyledTableCell>{row.end_date}</StyledTableCell>
                  <StyledTableCell>{row.total_points}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
