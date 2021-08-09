import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
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
import {useHistory} from 'react-router-dom';

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

export default function MiniCfg() {
  const [miniCfgData, setMiniCfgData] = useState([
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
    setMiniCfgData(
      miniCfgData.filter((data, index) => {
        if (id === index) {
          data.checked = !data.checked;
          return data;
        }

        return data;
      }),
    );
  };

  const toggleAll = () => {
    setMiniCfgData(
      miniCfgData.filter((data, index) => {
        data.checked = !currentCheckState;
        setCurrentCheckState(!currentCheckState);
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

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <br />
      <Container>
        <div className='options'>
          <Typography variant='h6'>Conversations</Typography>
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
              {miniCfgData.map((row, index) => (
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
                  <StyledTableCell>{row.startDate}</StyledTableCell>
                  <StyledTableCell>{row.endDate}</StyledTableCell>
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
