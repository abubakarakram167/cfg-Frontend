import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import CustomTablePagination from './pagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ControlPoint from '@material-ui/icons/ControlPoint';
import ResetIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import ApproveIcon from '@material-ui/icons/CheckCircle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import EditIcon from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserList} from '../../redux/actions';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';
import {
  addUserToList,
  editUserInList,
  updateUserStatus,
} from '../../redux/actions/UserList';
import './style.css';
import userList from '@crema/services/db/userList';
import data from 'modules/thirdParty/recharts/Area/Components/data';

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7f5f5',
    },
  },
}))(TableRow);

const allCheckBox = withStyles((theme) => ({
  colorSecondary: {
    position: 'relative',
    bottom: 20,
  },
}))(Checkbox);

const StyledTextField = withStyles((theme) => ({
  root: {
    borderRadius: 10,
    borderWidth: 10,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}))(OutlinedInput);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UserManagement() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [currentCheckState, setCurrentCheckState] = useState(false);
  const BlackCheckbox = withStyles({
    // root: {
    //   '&$checked': {
    //     color: 'black',
    //   },
    //   borderWidth: 25,
    // },
    // checked: {},
  })((props) => <Checkbox color='default' {...props} />);

  const getUserStatus = (status) => {
    if (status === 0) return 'pending';
    else if (status === 1) return 'approved';
    else return 'disabled';
  };

  const userListData = useSelector(({userList}) => {
    return userList.usersList.map((user) => {
      return {
        ...user,
        status: getUserStatus(user.status),
      };
    });
  });

  if (userListData.length && !userData.length) {
    setUserData(userListData);
  }

  useEffect(() => {
    dispatch(onGetUserList());
  }, [dispatch]);
  const classes = useStyles();
  const toggleCheckbox = (id) => {
    setUserData(
      userData.filter((data, index) => {
        if (id === data.id) {
          data.checked = !data.checked;
          return data;
        }
        return data;
      }),
    );
  };

  const toggleAll = () => {
    setUserData(
      userData.filter((data, index) => {
        data.checked = !currentCheckState;
        setCurrentCheckState(!currentCheckState);
        return data;
      }),
    );
  };
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [editForm, setEditForm] = useState(false);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allUserIds, setUserIds] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const changeUserStatus = (status) => {
    const body = {
      status,
      users: allUserIds,
    };
    dispatch(updateUserStatus(body));
    const updatedUserData = userData.map((user) => {
      if (body.users.includes(user.id)) {
        return {
          ...user,
          status,
        };
      } else return user;
    });
    setUserData(updatedUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editForm) {
      const newUser = {
        user_name: username,
        first_name: name,
        email,
        role,
        status,
      };
      const getResult = await dispatch(addUserToList(newUser));
      newUser.status = status === 0 ? 'pending' : 'approved';
      setUserData([...userData, newUser]);
    } else {
      const editUser = {
        user_name: username,
        first_name: name,
        email,
        role,
        status,
        id: userId,
      };
      const getResult = await dispatch(editUserInList(editUser));
      editUser.status = status === '0' ? 'pending' : 'approved';
      const changedUserData = userData.map((user) => {
        if (user.id === userId) {
          return editUser;
        } else return user;
      });
      setUserData(changedUserData);
    }
    setUsername('');
    setName('');
    setEmail('');
    setRole('');
    setStatus('');
    setDialogOpen(false);
  };
  const resetFilters = () => {
    setUsernameFilter('');
    setNameFilter('');
    setRoleFilter('');
    setEmailFilter('');
    setStatusFilter('');
  };

  const capitalize = ([first, ...rest]) =>
    first.toUpperCase() + rest.join('').toLowerCase();

  return (
    <div className='body-page' style={{paddingBottom: 150}}>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Add New User</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                label='Username'
                variant='filled'
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Name'
                variant='filled'
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Email'
                variant='filled'
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Role'
                variant='filled'
                fullWidth
                onChange={(e) => setRole(e.target.value)}
                value={role}
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
      <Container maxWidth='xl' style={{maxWidth: '96%'}}>
        <div className='options'>
          <Typography style={{color: 'black'}} variant='h6'>
            User Management
          </Typography>
          <Chip
            icon={<AddCircleRoundedIcon style={{fill: 'white'}} />}
            label={'ADD NEW User'}
            className='chip-style'
            onClick={() => {
              setEditForm(false);
              setDialogOpen(true);
            }}
          />
          <Chip
            icon={<ResetIcon style={{fill: 'white'}} />}
            label={'RESET'}
            className='chip-style'
            onClick={() => resetFilters()}
          />
          <Chip
            icon={<LockIcon style={{fill: 'white'}} />}
            label={'LOCK'}
            className='chip-style'
            onClick={() => {
              changeUserStatus('disabled');
            }}
          />
          <Chip
            icon={<ApproveIcon style={{fill: 'white'}} />}
            label={'APPROVE'}
            className='chip-style'
            onClick={() => {
              changeUserStatus('approved');
            }}
          />
          <Chip
            icon={<EditIcon style={{fill: 'white'}} />}
            label={'EDIT'}
            className='chip-style'
            onClick={() => {
              setEditForm(true);
              setDialogOpen(true);
            }}
          />
        </div>
        <br />

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead className='body-page'>
              <TableRow>
                <StyledTableCell>
                  <Checkbox checked={currentCheckState} onChange={toggleAll} />
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Username </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      size='small'
                      label='Username'
                      placeholder=''
                      value={usernameFilter}
                      onChange={(e) => setUsernameFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'>Name</span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      label='Name'
                      size='small'
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Email </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      label='Email'
                      size='small'
                      value={emailFilter}
                      onChange={(e) => setEmailFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Role </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      label='Role'
                      size='small'
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='column-heading'> Status </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      variant='filled'
                      label='Status'
                      value={statusFilter}
                      size='small'
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData &&
                userData &&
                rowsPerPage > 0 &&
                userData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter(
                    (element) =>
                      element.user_name &&
                      element.user_name
                        .toLowerCase()
                        .startsWith(usernameFilter),
                  )
                  .filter(
                    (element) =>
                      element.first_name &&
                      element.first_name.toLowerCase().startsWith(nameFilter),
                  )
                  .filter(
                    (element) =>
                      element.email &&
                      element.email.toLowerCase().startsWith(emailFilter),
                  )
                  .filter(
                    (element) =>
                      element.status &&
                      element.status.toLowerCase().startsWith(statusFilter),
                  )
                  .filter(
                    (element) =>
                      element.role &&
                      element.role.toLowerCase().startsWith(roleFilter),
                  )
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <BlackCheckbox
                          checked={row.checked}
                          onChange={() => {
                            let allIds = allUserIds;
                            if (!allIds.includes(row.id)) allIds.push(row.id);
                            else
                              allIds = allIds.filter(
                                (userId) => userId !== row.id,
                              );
                            setUserIds(allIds);
                            setUserId(row.id);
                            setUsername(row.user_name);
                            setName(row.first_name);
                            setEmail(row.email);
                            setRole(row.role);
                            setStatus(row.status);
                            toggleCheckbox(row.id);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {capitalize(row.user_name)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {capitalize(row.first_name)}
                      </StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{capitalize(row.role)}</StyledTableCell>
                      <StyledTableCell>
                        {capitalize(row.status)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              <CustomTablePagination
                rowsPerPage={rowsPerPage}
                page={page}
                userData={userData}
                setPage={(page) => setPage(page)}
                setRowsPerPage={(page) => setRowsPerPage(page)}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
