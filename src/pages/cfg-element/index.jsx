import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import './style.css';
import AdminHeader from 'pages/admin-header';
import {useDispatch, useSelector} from 'react-redux';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import {getSessionListData} from 'redux/actions/sessionActions';
import CustomTablePagination from '../user-management/pagination';
import FilterList from '@material-ui/icons/FilterList';
import TableCell from '@material-ui/core/TableCell';
import {
  Container,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  Checkbox,
  AccordionDetails,
  TextField,
} from '@material-ui/core';
import {ControlPoint, ExpandMore} from '@material-ui/icons';
import {formatDate} from 'utils/stampToFormat';
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

export default function CfgElement() {
  const dispatch = useDispatch();
  const params = useParams();
  const state = useSelector((state) => state.session.contentData);
  const [data, setData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [startDateFilter, setStartdateFilter] = useState('');
  const [endDateFilter, setEnddateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPointsFilter, settotalPointsFilter] = useState('');
  const [createAtFilter, setCreateAtFilter] = useState('');
  // const [title, setTitle] = useState('');
  // const [totalPoints, setTotalPoints] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    dispatch(getSessionListData(params.id));
  }, []);

  useEffect(() => {
    setData(state);
  }, [state]);

  const toggleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   dispatch(
  //     createSessionTitle({
  //       content_header_id: parseInt(params.id),
  //       title,
  //       total_points: totalPoints,
  //     }),
  //   );
  // };
  if (data.data) console.log('after it', data.data);

  return (
    <div className='cfg-element-page'>
      <div>
        <AdminHeader />
      </div>
      <br />
      <br />

      <Container>
        <div className='options'>
          <Typography variant='h6' className='titleText'>
            {data.data && data.data.rows.length && data.data.rows[0].title}
          </Typography>
          <Link
            to={`/admin/cfg-session/${selectedTitle ? 'sub-title' : 'title'}/${
              params.id
            }/${selectedTitle}`}>
            <Chip
              icon={<ControlPoint style={{fill: 'white'}} />}
              label={'ADD NEW'}
              className='chip-style'
              onClick={() => toggleDialogOpen()}
            />
          </Link>
        </div>
        <br />

        <div>
          <div className='custom-row-design-cfg-details'>
            <div></div>
            <StyledTableCell style={{position: 'relative', right: 60}}>
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
            <StyledTableCell style={{position: 'relative', right: 10}}>
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
              <span className='column-heading'> Date Published </span>
              <div style={{display: 'flex', alignItems: 'center'}}>
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
              <span className='column-heading'>Points </span>
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
          </div>
          <br />
          {data.data &&
            data?.data.titles.rows
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
                (element.total_points ? element.total_points.toString() : '')
                  .toLowerCase()
                  .startsWith(totalPointsFilter),
              )
              .filter((element) =>
                (element.created_at ? element.created_at.toString() : '')
                  .toLowerCase()
                  .startsWith(createAtFilter),
              )
              .map((element, index) => {
                return (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <div className='custom-row-design-cfg-details'>
                        <div className='custom-row-design-header'>
                          <Checkbox
                            checked={element.id === selectedTitle}
                            onClick={() => {
                              if (selectedTitle !== element.id) {
                                setSelectedTitle(element.id);
                              } else {
                                setSelectedTitle(null);
                              }
                            }}
                          />
                        </div>
                        <div
                          className='custom-row-design-header'
                          style={{position: 'relative', right: 50}}>
                          <Link to={`/admin/content/edit/${element.id}`}>
                            {element.title}
                          </Link>
                        </div>
                        <div className='custom-row-design-header'>
                          {/* {element.author.first_name +
                          ' ' +
                          element.author.last_name} */}{' '}
                          Author not found
                        </div>
                        <div className='custom-row-design-header summary-margin-left'>
                          {formatDate(
                            element.updated_at
                              ? element.updated_at
                              : element.created_at,
                          )}
                        </div>
                        <div className='custom-row-design-header summary-margin-left'>
                          {element.total_points}
                        </div>
                        <div className='custom-row-design-header summary-margin-left'>
                          {element.status}
                        </div>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <div className='subtitles-container-custom'>
                        {element.subtitles.rows.map((subs, index) => {
                          return (
                            <div
                              key={index}
                              className='custom-row-design-cfg-details subtitle-card-custom'>
                              <div className='custom-row-design-header'></div>
                              <div className='custom-row-design-header'>
                                <Link to={`/admin/content/edit/${subs.id}`}>
                                  {subs.title}
                                </Link>
                              </div>
                              <div className='custom-row-design-header'>
                                {/* {subs.author.first_name +
                                ' ' +
                                subs.author.last_name} */}
                                Author not found
                              </div>
                              <div className='custom-row-design-header'>
                                {formatDate(subs.updated_at)}
                              </div>
                              <div className='custom-row-design-header'>
                                {subs.total_points}
                              </div>
                              <div className='custom-row-design-header'>
                                {subs.status}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
        </div>
        <StyledTableRow style={{width: 400}}>
          <CustomTablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            userData={data && data.titles ? data.titles.rows : []}
            style={{width: 400}}
            setPage={(page) => setPage(page)}
            setRowsPerPage={(page) => setRowsPerPage(page)}
          />
        </StyledTableRow>
      </Container>
    </div>
  );
}
