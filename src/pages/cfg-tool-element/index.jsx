import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import './style.css';
import AdminHeader from 'pages/admin-header';
import {useDispatch, useSelector} from 'react-redux';
import {getToolListData} from 'redux/actions/toolActions';
import {
  Container,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  Checkbox,
  AccordionDetails,
} from '@material-ui/core';
import {ControlPoint, ExpandMore} from '@material-ui/icons';
import {formatDate} from 'utils/stampToFormat';

export default function CfgElement() {
  const dispatch = useDispatch();
  const params = useParams();
  const state = useSelector((state) => state.tool.contentData);
  console.log('the state', state);
  const [data, setData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [title, setTitle] = useState('');
  // const [totalPoints, setTotalPoints] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    dispatch(getToolListData(params.id));
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
            {data.data && data.data.rows.length
              ? data.data.rows[0].title
              : null}
          </Typography>
          <Link
            to={`/admin/cfg-tools/${selectedTitle ? 'sub-title' : 'title'}/${
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
                      <div className='custom-row-design-header summary-margin-left'>
                        <Link to={`/admin/content/edit/${element.id}`}>
                          {element.title}
                        </Link>
                      </div>
                      <div className='custom-row-design-header summary-margin-left'>
                        {/* {element.author.first_name +
                          ' ' +
                          element.author.last_name} */}{' '}
                        Author not found
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
