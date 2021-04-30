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
import {Link} from 'react-router-dom';
import {editContent} from 'redux/actions/sessionActions';
import CustomTablePagination from '../user-management/pagination';
import FilterList from '@material-ui/icons/FilterList';
import jsCookie from 'js-cookie';
import {Spinner} from 'react-bootstrap';
import {CircleSpinner} from 'react-spinners-kit';
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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Show_Message} from '../../shared/constants/ActionTypes';
import moment from 'moment';

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

const StyledChip = withStyles((theme) => ({
  root: {
    backgroundColor: '#949494',
    color: 'white',
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
  },
}))(Chip);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    '& .MuiInputBase-root': {
      height: 45,
      paddingLeft: 10,
      color: '#020101',
    },
  },
  secondRoot: {
    '& .MuiInputBase-root': {
      height: 30,
    },
  },
});

export default function CfgSession(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const auth = useSelector((state) => state);
  const [content, setContent] = useState([]);
  const [checked, setChecked] = useState([]);
  const [singleId, setSingleId] = useState(null);

  useEffect(() => {
    setContent(state.content);
  }, [state]);

  useEffect(() => {
    dispatch(getSessionData());
    setAuthor(JSON.parse(jsCookie.get('user')).first_name);
  }, [dispatch]);

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
  const [edit, setEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const userList = useSelector((state) => state.userList);
  const [open1, setOpen1] = useState(false);
  const [currentIds, setCurrentIds] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [startDateFilter, setStartdateFilter] = useState('');
  const [endDateFilter, setEnddateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPointsFilter, settotalPointsFilter] = useState('');
  const [createAtFilter, setCreateAtFilter] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('CFG Session');

  console.log('the content', content);

  const handleClose1 = () => {
    setOpen1(false);
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      dispatch(
        editContent({
          title,
          author,
          start_date,
          total_points,
          end_date,
          type: 'session',
          status,
          id: singleId,
        }),
      ).then((res) => {
        if (res) {
          const allContent = content.map((content) => {
            if (content.id === singleId) {
              const authorName = {...content.author, user_name: author};
              return {
                ...content,
                title,
                total_points,
                status,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD'),
              };
            } else return content;
          });
          setContent(allContent);
        }
      });
    } else {
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
    }
    setTitle('');
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
                value={title}
              />
            </ListItem>
            {/* <ListItem>
              <TextField
                label='Author'
                variant='filled'
                fullWidth
                onChange={(e) => setAuthor(e.target.value)}
                required
                disabled
                value={author}
              />
            </ListItem> */}
            <ListItem>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='Start Date'
                value={moment(start_date).format('MM/DD/yyyy')}
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
                value={moment(end_date).format('MM/DD/yyyy')}
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
                onChange={(e) => settotal_points(parseInt(e.target.value))}
                required
                type='number'
                value={total_points}
              />
            </ListItem>
            {/* <ListItem>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant='filled'
                fullWidth
                label='category'
                required>
                <MenuItem value={'session'}>CFG Session</MenuItem>
                <MenuItem value={'event'}>Events</MenuItem>
                <MenuItem value={'tool'}>CFG Tools</MenuItem>
              </Select>
            </ListItem> */}
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
      <Container style={{maxWidth: 3000, width: '97%'}}>
        <Snackbar
          open={userList.message}
          autoHideDuration={6000}
          onClose={handleClose1}>
          <Alert
            onClose={handleClose1}
            severity={userList.success ? 'success' : 'error'}>
            {userList.message}
          </Alert>
        </Snackbar>
        <div className='options'>
          <Typography variant='h6'>CFG Session</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => {
              setDialogOpen(true);
              setTitle('');
              setstart_date(new Date());
              setend_date(new Date());
              settotal_points('');
              setStatus('draft');
            }}
          />
          <StyledChip
            icon={<EditIcon style={{fill: 'white', fontSize: 20}} />}
            label={'EDIT'}
            className='chip-style-id'
            onClick={() => {
              setEdit(true);
              setDialogOpen(true);
            }}
          />
        </div>
        <br />
        <TableContainer style={{marginBottom: 50}} component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox checked={currentCheckState} onChange={toggleAll} />
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Name </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Name'
                      placeholder=''
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Author </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Author'
                      placeholder=''
                      value={authorFilter}
                      onChange={(e) => setAuthorFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Start Date </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{backgroundColor: '#eaeaea'}}
                      variant='filled'
                      format='YYYY-MM-DD'
                      autoOk={true}
                      value={startDateFilter === '' ? null : startDateFilter}
                      fullWidth={true}
                      placeholder='Start date'
                      className={classes.root}
                      onChange={(e) => {
                        if (e && e !== '')
                          setStartdateFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else setStartdateFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> End Date </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{backgroundColor: '#eaeaea'}}
                      variant='filled'
                      format='YYYY-MM-DD'
                      autoOk={true}
                      value={endDateFilter === '' ? null : endDateFilter}
                      fullWidth={true}
                      placeholder='End date'
                      className={classes.root}
                      onChange={(e) => {
                        if (e && e !== '')
                          setEnddateFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else setEnddateFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Created On </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{backgroundColor: '#eaeaea'}}
                      variant='filled'
                      format='YYYY-MM-DD'
                      autoOk={true}
                      value={createAtFilter === '' ? null : createAtFilter}
                      fullWidth={true}
                      placeholder='Create on'
                      className={classes.root}
                      onChange={(e) => {
                        if (e && e !== '')
                          setCreateAtFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else createAtFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>

                {/* <StyledTableCell>
                  <span className='column-heading'> Created On </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 40
                    }}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{backgroundColor: '#eaeaea'}}
                      variant='filled'
                      format='YYYY-MM-DD'
                      autoOk={true}
                      className={classes.secondRoot}
                      value={createAtFilter === '' ? null : createAtFilter}
                      fullWidth={true}
                      label='Create On'
                      onChange={(e) => {
                        if (e && e !== '')
                          setCreateAtFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else setCreateAtFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell> */}
                <StyledTableCell>
                  <span className='column-heading'> Total Points </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Total Points'
                      placeholder=''
                      value={totalPointsFilter}
                      onChange={(e) => settotalPointsFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Status </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Status'
                      placeholder=''
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 22}} />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {content.length > 0 &&
                rowsPerPage > 0 &&
                content
                  .sort(function (a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((element) =>
                    (element.title ? element.title : '')
                      .toLowerCase()
                      .startsWith(nameFilter),
                  )
                  .filter((element) =>
                    (element.author ? element.author.user_name : '')
                      .toLowerCase()
                      .startsWith(authorFilter),
                  )
                  .filter((element) =>
                    (element.start_date ? element.start_date : '')
                      .toLowerCase()
                      .startsWith(startDateFilter),
                  )
                  .filter((element) =>
                    (element.end_date ? element.end_date : '')
                      .toLowerCase()
                      .startsWith(endDateFilter),
                  )
                  .filter((element) =>
                    (element.status ? element.status : '')
                      .toLowerCase()
                      .startsWith(statusFilter),
                  )
                  .filter((element) =>
                    (element.total_points
                      ? element.total_points.toString()
                      : ''
                    )
                      .toLowerCase()
                      .startsWith(totalPointsFilter),
                  )
                  .filter((element) =>
                    (element.created_at ? element.created_at.toString() : '')
                      .toLowerCase()
                      .startsWith(createAtFilter),
                  )
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Checkbox
                          checked={checked.includes(row.id)}
                          onChange={() => {
                            let allIds = currentIds.length ? currentIds : [];
                            if (!allIds.includes(row.id)) allIds.push(row.id);
                            else {
                              allIds = allIds.filter(
                                (userId) => userId !== row.id,
                              );
                            }
                            setSingleId(row.id);
                            setCurrentIds(allIds);
                            setTitle(row.title);
                            setstart_date(row.start_date);
                            setend_date(row.end_date);
                            settotal_points(row.total_points);
                            setStatus(row.status);
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
                      <StyledTableCell>
                        {row.author ? row.author.first_name : ' '}
                      </StyledTableCell>
                      <StyledTableCell>{row.start_date}</StyledTableCell>
                      <StyledTableCell>{row.end_date}</StyledTableCell>
                      <StyledTableCell>
                        {moment(row.created_at).format('YYYY-MM-DD  HH:mm')}
                      </StyledTableCell>
                      <StyledTableCell>{row.total_points}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              <StyledTableRow>
                <CustomTablePagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  userData={content}
                  setPage={(page) => setPage(page)}
                  setRowsPerPage={(page) => setRowsPerPage(page)}
                />
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
