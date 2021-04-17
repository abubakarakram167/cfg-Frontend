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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CfgSession(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const auth = useSelector((state) => state);
  const [content, setContent] = useState([]);
  const [checked, setChecked] = useState([]);
  const [singleId, setSingleId] = useState(null);

  console.log('the auth..', auth);

  useEffect(() => {
    setContent(state.content);
  }, [state]);

  useEffect(() => {
    dispatch(getSessionData());
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
          console.log('the allContent', allContent);
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
    setAuthor('');
    setstart_date(new Date());
    setend_date(new Date());
    settotal_points('');
    setStatus('');
    setDialogOpen(false);
  };

  console.log('the content', content);

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
            <ListItem>
              <TextField
                label='Author'
                variant='filled'
                fullWidth
                onChange={(e) => setAuthor(e.target.value)}
                required
                value={author}
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
                value={total_points}
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
            onClick={() => setDialogOpen(true)}
          />
          <Chip
            icon={<EditIcon style={{fill: 'white'}} />}
            label={'EDIT'}
            className='chip-style gray-chip'
            onClick={() => {
              setEdit(true);
              setDialogOpen(true);
            }}
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
                    <FilterList style={{fill: 'black', fontSize: 30}} />
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
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Start Date </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    {/* <KeyboardDatePicker
                      disableToolbar
                      variant='inline'
                      format='MM/DD/yyyy'
                      margin='normal'
                      fullWidth={true}
                      label='Start Date'
                      onChange={(e) =>  {
                        setStartdateFilter( moment(e).format('YYYY-MM-DD') )
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    /> */}
                    <TextField
                      variant='filled'
                      size='small'
                      label='Start Date'
                      placeholder=''
                      value={startDateFilter}
                      onChange={(e) => setStartdateFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> End Date </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='End Date'
                      placeholder=''
                      value={endDateFilter}
                      onChange={(e) => setEnddateFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Created On </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Created On'
                      placeholder=''
                      value={createAtFilter}
                      onChange={(e) => setCreateAtFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
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
                    <FilterList style={{fill: 'black', fontSize: 30}} />
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
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.length > 0 &&
                rowsPerPage > 0 &&
                content
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
                            console.log('the author clicked', row);
                            setSingleId(row.id);
                            setCurrentIds(allIds);
                            setTitle(row.title);
                            setstart_date(new Date());
                            setend_date(new Date());
                            settotal_points(row.total_points);
                            setStatus(row.status);
                            toggleCheckbox(row.id);
                            setAuthor(row.author.user_name);
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
                        {row.author ? row.author.user_name : ''}
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
              <StyledTableRow style={{width: 200}}>
                <CustomTablePagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  userData={content}
                  style={{width: 200}}
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
