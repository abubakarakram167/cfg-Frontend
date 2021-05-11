import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {Container, Select, MenuItem, TextField} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ContentEditable from 'react-contenteditable';
import './style.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {KeyboardDatePicker} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useParams} from 'react-router-dom';
import formatDate from 'utils/formatDate';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';
import {
  getContentData,
  editContent,
  getSessionListData,
} from 'redux/actions/sessionActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from 'moment';
import {InputBase} from '@material-ui/core';
import {Show_Message} from '../../shared/constants/ActionTypes';
import InfoIcon from '@material-ui/icons/Info';
import {useHistory} from 'react-router-dom';

export default function Editor() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Enter a title');
  const [sub_title, setsub_title] = useState('Enter a subtitle');
  const [value, setValue] = useState('');
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setend_date] = useState(new Date());
  const [status, setStatus] = useState('draft');
  const [total_points, settotal_points] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [previous_page, setprevious_page] = useState('');
  const [next_page, setnext_page] = useState('');
  const [accumulativeTitlePoints, setAccumulativeTitlePoints] = useState(0);
  const [originalTotalPoints, setOriginalTotalPoints] = useState(0);
  const [categoryValue, setCategoryValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [group, setGroup] = useState('candidate');
  const [showMessageError, setShowMessageError] = useState(false);
  const [contentType, setContentType] = useState(false);

  const history = useHistory();

  const handleEditorChange = (e) => {
    setContent(e);
    setImageData(
      e.split('"').filter((element) => element.startsWith('data:image')),
    );
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    setKeywords([...keywords, keywordValue]);
    setKeywordValue('');
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setCategories([...categories, categoryValue]);
    setCategoryValue('');
  };

  useEffect(() => {
    dispatch(getContentData(params.id));
    // dispatch(getContentData(params.content_id));
  }, [params.id, params.content_id, dispatch]);

  useEffect(() => {
    dispatch(getSessionListData(params.id, params.type));
  }, []);

  useEffect(() => {
    if (state.editedContent) {
      setOpen1(true);
    }

    if (
      state.titles &&
      state.titles.rows &&
      state.titles.rows.length &&
      state.current
    ) {
      let totalPoints = 0;

      state.titles.rows.map((row) => {
        if (
          row &&
          row.total_points <= state.current.total_points &&
          row.id !== parseInt(params.id)
        )
          totalPoints = totalPoints + row.total_points;
      });

      const totalPointsSpecific = state.titles.rows.filter((allTitles) => {
        return allTitles.id === parseInt(params.id);
      });
      // debugger
      settotal_points(
        totalPointsSpecific.length ? totalPointsSpecific[0].total_points : 0,
      );
      setAccumulativeTitlePoints(totalPoints);
    }
    if (state.current) setOriginalTotalPoints(state.current.total_points || 0);
    if (state.currentContent) {
      console.log('the state', state);
      setTitle(params.title || '');
      setsub_title(state.currentContent.sub_title || '');
      setContent(state.currentContent.detail || '');
      setstart_date(
        moment(state.currentContent.start_date).format('MM/DD/yyyy'),
      );
      setend_date(moment(state.currentContent.end_date).format('MM/DD/yyyy'));
      setStatus(state.currentContent.status || 'draft');
      setKeywords(
        state.currentContent
          ? JSON.parse(state.currentContent.tags).map((element) => element.text)
          : [],
      );
      setGroup(state.currentContent.assigned_group);
      setCategories(JSON.parse(state.currentContent.categories || []));
      setnext_page(state.currentContent.next_page || '');
      setprevious_page(state.currentContent.previous_page || '');
      setContentType(state.currentContent.type || '');
    }
  }, [state]);
  const publish = () => {
    let totalTags = [];

    keywords.map((element) => {
      totalTags.push({
        tag_type: 'keyword',
        text: element,
      });
    });

    if (
      parseInt(total_points) + parseInt(accumulativeTitlePoints) >
      parseInt(originalTotalPoints)
    ) {
      dispatch({
        type: Show_Message,
        payload: {
          message: 'Cannot be edit.Please follow the requirements',
          success: false,
        },
      });
      setTimeout(() => {
        dispatch({
          type: Show_Message,
          payload: {message: null, success: true},
        });
      }, 5000);
    } else {
      dispatch(
        editContent(
          {
            id: params.id,
            title,
            sub_title,
            detail: content,
            start_date: start_date,
            end_date: end_date,
            tags: JSON.stringify(totalTags),
            type: params.contentType,
            assigned_group: group,
            categories: JSON.stringify(categories),
            total_points,
            next_page,
            updated_at: moment(moment()).format('YYYY-MM-DD'),
            previous_page,
          },
          params.id,
        ),
      ).then((response) => {
        if (response) {
          setTimeout(() => {
            history.push(`/admin/content/display/${params.id}`);
          }, 1000);
        }
      });
    }
  };
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const userList = useSelector((state) => state.userList);

  console.log(
    'the manipulation',
    parseInt(originalTotalPoints) -
      parseInt(accumulativeTitlePoints) +
      parseInt(total_points),
  );

  return (
    <div className='editor-page-full-container'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      {userList.message && (
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
      )}
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity='success'>
          Record updated successfully.
        </Alert>
      </Snackbar>

      <Container>
        <div className='top-section'>
          <div style={{width: '100%'}}>
            <div style={{width: '100%'}}>
              <TextareaAutosize
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Enter a title'
                style={{
                  fontSize: 25,
                  width: '88%',
                  border: 'none',
                  backgroundColor: '#f9f9f9',
                  color: 'gray',
                }}
                aria-label='empty textarea'
                placeholder='Empty'
              />
              {/* <InputBase
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Enter a title'
                style={{fontSize: 20}}
              /> */}
            </div>
          </div>
          <div className='flex-buttons-publish'>
            <Link to={`/admin/content/display/${params.id}`}>
              <button className='flex-button preview'>
                {' '}
                <VisibilityIcon style={{fill: '#ffffff'}} />{' '}
                <span className='button-text'>Preview</span>
              </button>
            </Link>
            <button className='flex-button publish' onClick={publish}>
              <PublishIcon style={{fill: '#ffffff'}} />{' '}
              <span className='button-text'>Publish</span>
            </button>
          </div>
        </div>
        <div className='editor-container'>
          <div className='editor-side'>
            <SunEditor
              setContents={content}
              setOptions={{
                height: 630,
                buttonList: [
                  ['bold', 'italic', 'underline'],
                  ['indent', 'outdent'],
                  ['list'],
                  ['fontColor'],
                  ['fontSize'],
                  ['font', 'align'],
                  ['video', 'image', 'link', 'audio'],
                ], // Or Array of button list, eg. [['font', 'align'], ['image']]
              }}
              onChange={handleEditorChange}
            />
          </div>

          <div className='options-side'>
            <div>
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
            </div>
            <br />
            {showMessageError && group === '' && (
              <p className='showErrorMessage'> group is required</p>
            )}

            <div>
              {categories.map((element, index) => {
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
              })}
            </div>
            <div>
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
              </form>
            </div>

            <br />
            <div>
              {keywords.map((element, index) => {
                return (
                  <Chip
                    label={element}
                    key={index}
                    className='chip-style'
                    onDelete={() => {
                      setKeywords(
                        keywords.filter((value) => value !== element),
                      );
                    }}
                  />
                );
              })}
            </div>
            <div>
              <form onSubmit={handleKeywordSubmit}>
                <TextField
                  variant='filled'
                  value={keywordValue}
                  onSubmit={(e) => setKeywords([...keywords, e.target.value])}
                  onChange={(e) => setKeywordValue(e.target.value)}
                  fullWidth
                  label='Key words'
                />
              </form>
            </div>

            <br />
            <div className='dates'>
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='Start Date'
                value={start_date}
                onChange={(e) => {
                  setstart_date(moment(e).format('MM/DD/yyyy'));
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                margin='normal'
                fullWidth={true}
                label='End Date'
                value={end_date}
                onChange={(e) => {
                  setend_date(moment(e).format('MM/DD/yyyy'));
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
            <br />
            <div>
              <Select
                variant='filled'
                value={status}
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
                required>
                <MenuItem value='draft'>Draft</MenuItem>
                <MenuItem value='saved'>Saved</MenuItem>
                <MenuItem value={'published'}>Published</MenuItem>
              </Select>
            </div>
            <br />
            <div>
              <TextField
                type='number'
                variant='filled'
                value={total_points}
                onChange={(e) => settotal_points(parseInt(e.target.value))}
                fullWidth
                label='Total Points'
                required
              />
              {parseInt(total_points) + parseInt(accumulativeTitlePoints) >
                parseInt(originalTotalPoints) && (
                <p className='total-points-text'>
                  <InfoIcon
                    style={{
                      fill: 'red',
                      fontSize: 18,
                      position: 'relative',
                      top: 3,
                    }}
                  />{' '}
                  The total points for this title cannot be exceed than
                  {parseInt(originalTotalPoints) -
                    parseInt(accumulativeTitlePoints)}
                </p>
              )}
            </div>
            <br />
            <div>
              <TextField
                type='number'
                variant='filled'
                value={previous_page}
                onChange={(e) => setprevious_page(e.target.value)}
                fullWidth
                label='previous page id'
                required
              />
            </div>
            <br />
            <div>
              <TextField
                type='number'
                variant='filled'
                value={next_page}
                onChange={(e) => setnext_page(e.target.value)}
                fullWidth
                label='next page id'
                required
              />
            </div>
            <br />
            <div>
              <div style={{fontSize: '20px', fontWeight: 600}}>
                Featured Image
              </div>
              <div style={{display: 'flex'}}>
                {imageData.map((element, index) => {
                  return (
                    <div key={index} className='image-preview'>
                      <img src={element} alt='data-text' />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
