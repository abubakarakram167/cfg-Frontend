import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
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
import {useHistory} from 'react-router-dom';
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import {KeyboardDatePicker} from '@material-ui/pickers';

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

export default function Events() {
  const [eventData, setEventData] = useState([
    {
      checked: false,
      name: 'JaneDoe',
      author: 'Jane Doe',
      startDate: '2020/1/1',
      endDate: '2020/1/1',
      totalPoints: 500,
      status: 'Approved',
    },
    {
      checked: false,
      name: 'JaneDoe',
      author: 'Jane Doe',
      startDate: '2020/1/1',
      endDate: '2020/1/1',
      totalPoints: 500,
      status: 'Approved',
    },
    {
      checked: false,
      name: 'JaneDoe',
      author: 'Jane Doe',
      startDate: '2020/1/1',
      endDate: '2020/1/1',
      totalPoints: 500,
      status: 'Approved',
    },
    {
      checked: false,
      name: 'JaneDoe',
      author: 'Jane Doe',
      startDate: '2020/1/1',
      endDate: '2020/1/1',
      totalPoints: 500,
      status: 'Approved',
    },
  ]);
  const [currentCheckState, setCurrentCheckState] = useState(false);
  const permissions = useSelector((state) => state.roles.permissions);
  const history = useHistory();
  const classes = useStyles();

  const toggleCheckbox = (id) => {
    setEventData(
      eventData.filter((data, index) => {
        if (id === index) {
          data.checked = !data.checked;
          return data;
        }

        return data;
      }),
    );
  };

  useEffect(() => {
    if (!permissions.miniCfg.view) {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
  }, []);

  const toggleAll = () => {
    setEventData(
      eventData.filter((data, index) => {
        data.checked = !currentCheckState;
        setCurrentCheckState(!currentCheckState);
        return data;
      }),
    );
  };
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalPoints, setTotalPoints] = useState('');
  const [status, setStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEventData([
      ...eventData,
      {
        name,
        author,
        startDate,
        endDate,
        totalPoints,
        status,
      },
    ]);
    setName('');
    setAuthor('');
    setStartDate(new Date());
    setEndDate(new Date());
    setTotalPoints('');
    setStatus('');
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Add New Event Data</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                label='Name'
                variant='filled'
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Author'
                variant='filled'
                fullWidth
                onChange={(e) => setAuthor(e.target.value)}
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
                value={startDate}
                onChange={(e) => setStartDate(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
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
                value={endDate}
                onChange={(e) => setEndDate(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Total Points'
                variant='filled'
                fullWidth
                onChange={(e) => setTotalPoints(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Status'
                variant='filled'
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
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
        <div className='options'>
          <Typography variant='h6'>Events</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            disabled={!permissions.events.create}
            onClick={() => setDialogOpen(true)}
          />
          <Chip
            icon={<EditIcon style={{fill: 'white'}} />}
            disabled={!permissions.events.update}
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
              {eventData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <Checkbox
                      checked={row.checked}
                      onChange={() => {
                        toggleCheckbox(index);
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.author}</StyledTableCell>
                  <StyledTableCell>{row.startDate.toString()}</StyledTableCell>
                  <StyledTableCell>{row.endDate.toString()}</StyledTableCell>
                  <StyledTableCell>{row.totalPoints}</StyledTableCell>
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
