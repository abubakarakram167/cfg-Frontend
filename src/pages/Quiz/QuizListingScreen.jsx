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
import CustomTablePagination from '../user-management/pagination';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import moment from 'moment';
import jsCookie from 'js-cookie';
import FilterList from '@material-ui/icons/FilterList';
import {useHistory} from 'react-router-dom';
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
import {
  quizList,
  addQuiz,
  getAllCompleteQuestions,
  editQuiz,
} from 'redux/actions/quiz';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Show_Message} from '../../shared/constants/ActionTypes';

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

const StyledTextField = withStyles((theme) => ({}))(TextField);

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
      width: '100%',
    },
  },
});

export default function CfgTool(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.quiz);
  const [content, setContent] = useState([]);
  const [checked, setChecked] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [created_date, setstart_date] = useState(new Date());
  const [publishDate, setPublishDate] = useState(new Date());
  const [updated_date, setend_date] = useState(new Date());
  const [total_points, settotal_points] = useState('');
  const [status, setStatus] = useState('draft');
  const [edit, setEdit] = useState(false);
  const [currentIds, setCurrentIds] = useState([]);
  const [singleId, setSingleId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const userList = useSelector((state) => state.userList);
  const [currentCheckState, setCurrentCheckState] = useState(false);
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [publishDateFilter, setPublishdateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPointsFilter, settotalPointsFilter] = useState('');
  const [group, setGroup] = useState('candidate');
  const [value, setValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [successNavigatePage, setSuccessNavigatePage] = useState('');
  const [failNavigatePage, setFailNavigatePage] = useState('');
  const history = useHistory();
  const permissions = useSelector((state) => state.roles.permissions);

  useEffect(() => {
    setContent(state.content);
    dispatch(getAllCompleteQuestions());
  }, [state]);

  useEffect(() => {
    dispatch(quizList());
    setAuthor(JSON.parse(jsCookie.get('user')).user_name);
  }, [dispatch]);

  useEffect(() => {
    if (!permissions.quiz.view) {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(
        editQuiz({
          quiz_name: title,
          total_points,
          created_by: JSON.parse(jsCookie.get('user')).id,
          status,
          apply_to_group: group,
          category: JSON.stringify(categories),
          success_navigate_page: successNavigatePage,
          fail_navigate_page: failNavigatePage,
          publish_date: formatDate(created_date),
          id: singleId,
        }),
      );
      setSingleId(null);
      setTitle('');
      setAuthor('');
      setstart_date(new Date());
      setend_date(new Date());
      settotal_points('');
      setStatus('');
      setDialogOpen(false);
    } else {
      let allContents = state.quiz;
      if (
        allContents.length &&
        allContents.filter((content) => content.title === title).length > 0
      ) {
        dispatch({
          type: Show_Message,
          payload: {message: 'Quiz already Exist', success: false},
        });
      } else {
        dispatch(
          addQuiz({
            quiz_name: title,
            created_at: formatDate(created_date),
            updated_at: formatDate(updated_date),
            total_points,
            created_by: JSON.parse(jsCookie.get('user')).id,
            status,
            apply_to_group: group,
            category: JSON.stringify(categories),
            success_navigate_page: successNavigatePage,
            fail_navigate_page: failNavigatePage,
            publish_date: formatDate(created_date),
            author,
          }),
        );
      }
    }

    setTitle('');
    setAuthor('');
    setstart_date(new Date());
    setend_date(new Date());
    settotal_points('');
    setStatus('');
    setDialogOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
    dispatch({type: Show_Message, payload: {message: null, success: false}});
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setCategories([...categories, categoryValue]);
    setCategoryValue('');
  };
  console.log('the user', JSON.parse(jsCookie.get('user')));

  return (
    <div style={{paddingBottom: 80}}>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Add New Quiz</div>
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
                label='Total Points'
                variant='filled'
                fullWidth
                onChange={(e) => settotal_points(e.target.value)}
                required
                value={total_points}
                type='number'
              />
            </ListItem>
            <div>
              {categories && categories.length
                ? categories.map((element, index) => {
                    return (
                      <Chip
                        label={element}
                        key={index}
                        className='chip-style'
                        onDelete={() => {
                          setCategories(
                            categories.filter((value) => value !== element),
                          );
                        }}
                      />
                    );
                  })
                : null}
            </div>
            <ListItem>
              <div style={{height: 60, width: '100%'}}>
                <form onSubmit={handleCategorySubmit}>
                  <TextField
                    variant='filled'
                    value={categoryValue}
                    required
                    onSubmit={(e) =>
                      setCategories([...categories, e.target.value])
                    }
                    onChange={(e) => setCategoryValue(e.target.value)}
                    fullWidth
                    label='Categories'
                  />
                  <button
                    style={{position: 'relative', left: '75%'}}
                    className='flex-button preview form-button-add'
                    onClick={() => {
                      setCategories([...categories, categoryValue]);
                      setCategoryValue('');
                    }}>
                    <AddCircleIcon style={{fill: '#ffffff', fontSize: 15}} />{' '}
                    <span className='button-text custom-add-button'>Add</span>
                  </button>
                </form>
              </div>
            </ListItem>
            <ListItem>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                onChange={(e) => setGroup(e.target.value)}
                variant='filled'
                fullWidth
                value={group}
                label='Group'
                required>
                <MenuItem value={'candidate'}>Candidate</MenuItem>
                <MenuItem value={'facilitator'}>Facilitator</MenuItem>
                <MenuItem value={'content-manager'}>Content Manager</MenuItem>
                <MenuItem value={'support'}>Support</MenuItem>
                <MenuItem value={'reviewer'}>Reviewer</MenuItem>
                <MenuItem value={'system-administrator'}>
                  System Adminsitrator
                </MenuItem>
                <MenuItem value={'auditor'}>Auditor</MenuItem>
              </Select>
            </ListItem>
            <ListItem>
              <TextField
                variant='filled'
                label='Page to navigate to after assessment succeeds'
                name='success_navigate_page'
                required
                fullWidth
                value={successNavigatePage}
                onChange={(e) => setSuccessNavigatePage(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Failure Page'
                variant='filled'
                label='Page to navigate to after assessment fails'
                name='fail_navigate_page'
                value={failNavigatePage}
                required
                onChange={(e) => setFailNavigatePage(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant='filled'
                fullWidth
                value={status}
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
      <Container
        style={{
          maxWidth: 5000,
          width: '96%',
        }}>
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
          <Typography variant='h6'>Quiz</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => {
              if (singleId) toggleCheckbox(singleId);
              setSingleId(null);
              setEdit(false);
              setDialogOpen(true);
              setTitle('');
              setstart_date(new Date());
              setend_date(new Date());
              settotal_points('');
              setStatus('draft');
              setCategories([]);
              setValue('');
            }}
          />
          <Chip
            icon={<EditIcon style={{fill: 'white', fontSize: 20}} />}
            label={'EDIT'}
            className='chip-style gray-chip'
            onClick={() => {
              setEdit(true);
              if (singleId) setDialogOpen(true);
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
                  <span className='column-heading'> Publish Date </span>
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
                      value={
                        publishDateFilter === '' ? null : publishDateFilter
                      }
                      fullWidth={true}
                      placeholder='Publish date'
                      className={classes.root}
                      onChange={(e) => {
                        if (e && e !== '')
                          setPublishdateFilter(
                            moment(e).format('YYYY-MM-DD').toString(),
                          );
                        else setPublishdateFilter('');
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
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
                  .sort(function (a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((element) =>
                    (element.quiz_name ? element.quiz_name : '')
                      .toLowerCase()
                      .startsWith(nameFilter),
                  )
                  .filter((element) =>
                    (element.author ? element.author.user_name : '')
                      .toLowerCase()
                      .startsWith(authorFilter),
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
                      .startsWith(publishDateFilter),
                  )
                  .map((row, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Checkbox
                            checked={checked.includes(row.id)}
                            onChange={() => {
                              const {author} = row;
                              let allIds = currentIds.length ? currentIds : [];
                              if (!allIds.includes(row.id)) allIds.push(row.id);
                              else {
                                allIds = allIds.filter(
                                  (userId) => userId !== row.id,
                                );
                              }

                              setSingleId(row.id);
                              setCurrentIds(allIds);
                              setTitle(row.quiz_name);
                              setPublishDate(row.created_at);
                              settotal_points(row.total_points);
                              setStatus(row.status);
                              setGroup(
                                row.apply_to_group
                                  ? row.apply_to_group
                                  : 'candidate',
                              );
                              setSuccessNavigatePage(row.success_navigate_page);
                              setFailNavigatePage(row.fail_navigate_page);
                              if (row.category)
                                setCategories(JSON.parse(row.category));
                              else setCategories([]);
                              toggleCheckbox(row.id);
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {' '}
                          <Link
                            to={`/content/quiz/?quiz_id=${row.id}&quiz_name=${row.quiz_name}`}>
                            {row.quiz_name}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>
                          {JSON.parse(jsCookie.get('user')).user_name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {moment(row.created_at).format('YYYY-MM-DD')}
                        </StyledTableCell>
                        {/* <StyledTableCell>{row.end_date}</StyledTableCell> */}
                        <StyledTableCell>{row.total_points}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
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
