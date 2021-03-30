import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import './style.css';
import AdminHeader from 'pages/admin-header';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSessionListData,
  createSessionTitle,
} from 'redux/actions/sessionActions';
import {
  Container,
  Chip,
  Typography,
  Dialog,
  List,
  ListItem,
  TextField,
  Button,
  DialogTitle,
  Accordion,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  AccordionDetails,
} from '@material-ui/core';
import {ControlPoint, ExpandMore} from '@material-ui/icons';
import {formatDate} from 'utils/stampToFormat';

export default function CfgElement() {
  const dispatch = useDispatch();
  const params = useParams();
  const state = useSelector((state) => state.session.contentData);
  const [data, setData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    dispatch(getSessionListData(params.id));
  }, []);

  useEffect(() => {
    console.log(state);
    setData(state);
  }, [state]);

  const toggleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createSessionTitle({
        content_header_id: parseInt(params.id),
        title,
        total_points: totalPoints,
      }),
    );
  };

  return (
    <div className='cfg-element-page'>
      <div>
        <AdminHeader />
      </div>
      <br />
      <br />

      <Dialog open={dialogOpen}>
        <DialogTitle>
          <div style={{minWidth: '400px'}}>Create New Title</div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem>
              <TextField
                variant='filled'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                variant='filled'
                value={totalPoints}
                placeholder='Total Points'
                type='number'
                onChange={(e) => setTotalPoints(e.target.value)}
                fullWidth
                required
              />
            </ListItem>
            <ListItem>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={() => toggleDialogOpen()}>Cancel</Button>
                <Button type='submit'>Submit</Button>
              </div>
            </ListItem>
          </List>
        </form>
      </Dialog>
      <Container>
        <div className='options'>
          <Typography variant='h6' className='titleText'>
            {data.data && data?.data.rows[0].title}
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
            <div className='custom-row-design-header'>Title</div>
            <div className='custom-row-design-header'>Author</div>
            <div className='custom-row-design-header'>Date Published</div>
            <div className='custom-row-design-header'>Points</div>
            <div className='custom-row-design-header'>Status</div>
          </div>
          <br />
          {data.data &&
            data?.data.titles.rows.map((element, index) => {
              return (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    {/* <FormControlLabel control={<Checkbox />} label={

                                } /> */}
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
                        className='custom-row-design-header summary-margin-left'
                        onClick={() => console.log('take me to something new')}>
                        {element.title}
                      </div>
                      <div className='custom-row-design-header summary-margin-left'>
                        {element.author.first_name +
                          ' ' +
                          element.author.last_name}
                      </div>
                      <div className='custom-row-design-header summary-margin-left'>
                        {formatDate(element.created_at)}
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
                              {subs.title}
                            </div>
                            <div className='custom-row-design-header'>
                              {subs.author.first_name +
                                ' ' +
                                subs.author.last_name}
                            </div>
                            <div className='custom-row-design-header'>
                              {formatDate(subs.created_at)}
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
      </Container>
    </div>
  );
}
