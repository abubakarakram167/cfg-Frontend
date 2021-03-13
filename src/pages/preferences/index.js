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

export default function Preferences() {
  const [preferences, setPreferences] = useState([
    {
      checked: false,
      option: 'Login with username',
      value: 'Jane Doe',
      description: 'hello world this is a description',
    },
    {
      checked: false,
      option: 'Login with username',
      value: 'Jane Doe',
      description: 'hello world this is a description',
    },
    {
      checked: false,
      option: 'Login with username',
      value: 'Jane Doe',
      description: 'hello world this is a description',
    },
    {
      checked: false,
      option: 'Login with username',
      value: 'Jane Doe',
      description: 'hello world this is a description',
    },
  ]);
  const [currentCheckState, setCurrentCheckState] = useState(false);

  const classes = useStyles();

  const toggleCheckbox = (id) => {
    setPreferences(
      preferences.filter((data, index) => {
        if (id === index) {
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

  const [option, setOption] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPreferences([
      ...preferences,
      {
        option,
        value,
        description,
      },
    ]);
    setOption('');
    setValue('');
    setDescription('');
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Add New Preferences</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                label='Option'
                variant='filled'
                fullWidth
                onChange={(e) => setOption(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Value'
                variant='filled'
                fullWidth
                onChange={(e) => setValue(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label='Description'
                variant='filled'
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
        <div className='options'>
          <Typography variant='h6'>Preferences</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
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
                <StyledTableCell>Option</StyledTableCell>
                <StyledTableCell>Value</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {preferences.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <Checkbox
                      checked={row.checked}
                      onChange={() => {
                        toggleCheckbox(index);
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.option}</StyledTableCell>
                  <StyledTableCell>{row.value}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
