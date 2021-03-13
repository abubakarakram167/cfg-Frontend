import React, {useState} from 'react';
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
import ResetIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import ApproveIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import {
  Dialog,
  List,
  ListItem,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';

import './style.css';

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

export default function UserManagement() {
  const [userData, setUserData] = useState([
    {
      checked: false,
      username: 'JaneDoe',
      name: 'Jane Doe',
      email: 'jane@doe.com',
      role: 'Candidate',
      status: 'Approved',
    },
    {
      checked: false,
      username: 'JohnDoe',
      name: 'John Doe',
      email: 'john@doe.com',
      role: 'Candidate',
      status: 'Un Approved',
    },
    {
      checked: false,
      username: 'HelloWorld',
      name: 'Hello World',
      email: 'hello@world.com',
      role: 'Candidate',
      status: 'Pending',
    },
  ]);

  const [currentCheckState, setCurrentCheckState] = useState(false);

  const classes = useStyles();

  const toggleCheckbox = (id) => {
    setUserData(
      userData.filter((data, index) => {
        if (id === index) {
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

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const [usernameFilter, setUsernameFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData([
      ...userData,
      {
        username,
        name,
        email,
        role,
        status,
      },
    ]);
    setUsername('');
    setName('');
    setEmail('');
    setRole('');
    setStatus('');
    setDialogOpen(false);
  };

  return (
    <div>
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
              />
            </ListItem>
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
                label='Email'
                variant='filled'
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Role'
                variant='filled'
                fullWidth
                onChange={(e) => setRole(e.target.value)}
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
          <Typography variant='h6'>User Management</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
          />
          <Chip
            icon={<ResetIcon style={{fill: 'white'}} />}
            label={'RESET'}
            className='chip-style gray-chip'
          />
          <Chip
            icon={<LockIcon style={{fill: 'white'}} />}
            label={'LOCK'}
            className='chip-style gray-chip'
          />
          <Chip
            icon={<ApproveIcon style={{fill: 'white'}} />}
            label={'APPROVE'}
            className='chip-style green-chip'
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
                <StyledTableCell>
                  Username
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      label='Username'
                      variant='filled'
                      size='small'
                      onChange={(e) => setUsernameFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  Name
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      label='Name'
                      variant='filled'
                      size='small'
                      onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  Email
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      label='Email'
                      variant='filled'
                      size='small'
                      onChange={(e) => setEmailFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  Role
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      label='Role'
                      variant='filled'
                      size='small'
                      onChange={(e) => setRoleFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  Status
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                      label='Status'
                      variant='filled'
                      size='small'
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                    <FilterList style={{fill: 'black', fontSize: 30}} />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData
                .filter((element) =>
                  element.username.toLowerCase().startsWith(usernameFilter),
                )
                .filter((element) =>
                  element.name.toLowerCase().startsWith(nameFilter),
                )
                .filter((element) =>
                  element.email.toLowerCase().startsWith(emailFilter),
                )
                .filter((element) =>
                  element.status.toLowerCase().startsWith(statusFilter),
                )
                .filter((element) =>
                  element.role.toLowerCase().startsWith(roleFilter),
                )
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <Checkbox
                        checked={row.checked}
                        onChange={() => {
                          toggleCheckbox(index);
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row.username}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.role}</StyledTableCell>
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
