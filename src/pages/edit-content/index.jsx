import React, {useState, useEffect, useRef} from 'react';
import AdminHeader from 'pages/admin-header';
import {Container, Select, MenuItem, TextField} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import './style.css';
import SunEditor from '../../components/sunEditor';
import {KeyboardDatePicker} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';
import PromptModal from 'components/PromptModal';
import {
  getContentData,
  editContent,
  getSessionListData,
} from 'redux/actions/sessionActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from 'moment';
import {Show_Message} from '../../shared/constants/ActionTypes';
import InfoIcon from '@material-ui/icons/Info';
import {useHistory} from 'react-router-dom';
import NavigationPrompt from 'react-router-navigation-prompt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MediaUpload from 'components/MediaUpload';
import {makeStyles} from '@material-ui/core/styles';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
import Api from '../../utils/axios';

const useStyles = makeStyles({
  datePicker: {
    '& .MuiFormLabel-root': {
      paddingLeft: 10,
    },
    '& .MuiInputBase-root': {
      paddingLeft: 8,
    },
  },
});

export default function Editor() {
  const myRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  state.currentContent = state.newData;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Enter a title');
  const [sub_title, setsub_title] = useState('Enter a subtitle');
  const [value, setValue] = useState('');
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setend_date] = useState(new Date());
  const [publishDate, setPublishDate] = useState(null);
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
  const [isContentChange, setContentChanged] = useState(false);
  const [featuredImage, setFeaturedImage] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);
  const [eventType, setEventType] = useState('live-video');
  const [duration, setDuration] = useState(0);
  const [facilitator, setFacilitator] = useState('');
  const [facilitatorUsers, setFacilitatorUsers] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    setKeywords([...keywords, keywordValue]);
    setKeywordValue('');
  };

  const isValidJSONString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setCategories([...categories, categoryValue]);
    setCategoryValue('');
  };

  useEffect(() => {
    dispatch(getContentData(params.id));
  }, [params.id, params.content_id, dispatch]);

  useEffect(() => {
    dispatch(getSessionListData(params.id, params.type));
    Api.get('api/users/list?_count=10000&_pageNo=1').then((users) => {
      setFacilitatorUsers(users.data.userResponse);
    });
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
      settotal_points(
        totalPointsSpecific.length ? totalPointsSpecific[0].total_points : 0,
      );
      setAccumulativeTitlePoints(totalPoints);
    }
    if (state.current) setOriginalTotalPoints(state.current.total_points || 0);
    if (state.currentContent) {
      console.log('the current content', state.currentContent);
      setTitle(
        (state.currentContent.title && state.currentContent.title) || '',
      );
      setsub_title(state.currentContent.sub_title || '');
      setContent(state.currentContent.detail || '');
      setstart_date(
        moment(state.currentContent.start_date).format('MM/DD/yyyy'),
      );
      setend_date(moment(state.currentContent.end_date).format('MM/DD/yyyy'));
      setPublishDate(
        moment(state.currentContent.created_at).format('MM/DD/yyyy'),
      );
      setStatus(state.currentContent.status || 'draft');
      setEventType(state.currentContent.eventType || 'live-video');
      setDuration(state.currentContent.duration || 0);
      setFacilitator(state.currentContent.facilitator || '');
      setFeaturedImage(state.currentContent.featured_image_url || '');
      if (
        state.currentContent.tags &&
        state.currentContent.tags.length &&
        isValidJSONString(state.currentContent.tags)
      ) {
        setKeywords(
          state.currentContent
            ? JSON.parse(state.currentContent.tags).map(
                (element) => element.text,
              )
            : [],
        );
      } else {
        setKeywords([]);
      }
      if (
        state.currentContent.categories &&
        state.currentContent.categories.length &&
        isValidJSONString(state.currentContent.categories)
      ) {
        setCategories(
          state.currentContent
            ? JSON.parse(state.currentContent.categories)
            : [],
        );
      } else {
        setCategories([]);
      }

      setGroup(state.currentContent.assigned_group);
      setnext_page(state.currentContent.next_page || '');
      setprevious_page(state.currentContent.previous_page || '');
      setContentType(state.currentContent.type || '');
    }
  }, [state]);

  const publish = () => {
    let totalTags = [];
    setContentChanged(false);

    keywords.map((element) => {
      totalTags.push({
        tag_type: 'keyword',
        text: element,
      });
    });

    if (
      parseInt(total_points) + parseInt(accumulativeTitlePoints) >
        parseInt(originalTotalPoints) &&
      params.contentType !== 'timeline'
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
            status,
            total_points,
            next_page,
            updated_at: moment(moment()).format('YYYY-MM-DD'),
            previous_page,
            featured_image_url: featuredImage,
            event_type: eventType,
            duration,
            facilitator,
          },
          params.id,
        ),
      )
        .then((response) => {
          if (response) {
            setTimeout(() => {
              if (!isContentChange) {
                history.push(`/admin/content/display/${params.id}`);
              } else {
                setTimeout(() => {
                  history.push(`/admin/content/display/${params.id}`);
                }, 500);
              }
            }, 1000);
          }
        })
        .catch((err) => {
          console.log('the error', err);
        });
    }
  };
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const userList = useSelector((state) => state.userList);
  const handleImageUploadBefore = async (files, info, uploadHandler) => {
    const formData = new FormData();
    formData.append('media', files[0]);
    formData.append('category', 'cover');
    const data = await Media.addMedia(formData);
    const photo_url = baseUrl + 'static/' + data.data[0].file_name;
    uploadHandler({
      result: [
        {
          url: photo_url,
          name: data.data[0].file_name,
          size: files[0].size,
        },
      ],
    });
  };

  return (
    <div className='editor-page-full-container'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      {userList.message && (
        <Snackbar
          open={userList.message}
          autoHideDuration={6000}
          onClose={handleClose1}>
          <Alert
            variant='filled'
            onClose={handleClose1}
            severity={userList.success ? 'success' : 'error'}>
            {userList.message}
          </Alert>
        </Snackbar>
      )}
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert variant='filled' onClose={handleClose1} severity='success'>
          Record updated successfully.
        </Alert>
      </Snackbar>
      <NavigationPrompt when={isContentChange ? true : false}>
        {({onConfirm, onCancel}) => (
          <PromptModal when={true} onCancel={onCancel} onConfirm={onConfirm} />
        )}
      </NavigationPrompt>
      <Container>
        <div className='top-section'>
          <div style={{width: '100%'}}>
            <div style={{width: '100%'}}>
              <TextareaAutosize
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                style={{
                  fontSize: 25,
                  width: '88%',
                  border: 'none',
                  backgroundColor: '#f9f9f9',
                  color: 'gray',
                }}
                aria-label='empty textarea'
                placeholder='Enter a title'
              />
              {showMessageError && title === '' && (
                <p className='showErrorMessage'>Title is required</p>
              )}
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
        <MediaUpload
          showDialogue={showDialogue}
          onClose={() => setShowDialogue(false)}
          onImageSave={(image) => {
            setFeaturedImage(image[0].url);
          }}
        />
        <div className='editor-container'>
          <div className='editor-side'>
            <SunEditor
              onImageUploadBefore={handleImageUploadBefore}
              onContentSave={(content) => setContent(content)}
              content={content}
              onContentChanged={() => setContentChanged(true)}
            />
          </div>

          <div className='options-side'>
            {!['mini', 'event'].includes(params.contentType) && (
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
            )}

            {params.contentType === 'event' && (
              <div>
                <Select
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  onChange={(e) => setEventType(e.target.value)}
                  variant='filled'
                  fullWidth
                  value={eventType}
                  label='Event Type'
                  required>
                  <MenuItem value={'live-video'}>Live Video</MenuItem>
                  <MenuItem value={'group-chat'}>Group Chat</MenuItem>
                  <MenuItem value={'zoom-video'}>Zoom Video</MenuItem>
                </Select>
              </div>
            )}
            {params.contentType === 'mini' && (
              <div>
                <Select
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  onChange={(e) => setFacilitator(e.target.value)}
                  variant='filled'
                  fullWidth
                  value={facilitator}
                  label='Facilitator'
                  required>
                  {facilitatorUsers.map((user) => (
                    <MenuItem value={user.id}>{user.first_name}</MenuItem>
                  ))}
                </Select>
              </div>
            )}

            <br />
            {showMessageError && group === '' && (
              <p className='showErrorMessage'> group is required</p>
            )}

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
            <div style={{height: 60}}>
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
            {showMessageError && group === '' && (
              <p className='showErrorMessage'> group is required</p>
            )}
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
            <div style={{height: 60}}>
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
              <button
                className='flex-button preview form-button-add'
                onClick={() => {
                  setKeywords([...keywords, keywordValue]);
                  setKeywordValue('');
                }}>
                <AddCircleIcon style={{fill: '#ffffff', fontSize: 15}} />{' '}
                <span className='button-text custom-add-button'>Add</span>
              </button>
            </div>
            {showMessageError && group.length === 0 && (
              <p className='showErrorMessage'>Keywords is required</p>
            )}
            <br />
            <div className='dates'>
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                format='MM/DD/yyyy'
                className={classes.datePicker}
                fullWidth={true}
                label='Publish Date'
                value={publishDate}
                onChange={(e) => setPublishDate(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
            <br />
            {['mini', 'event'].includes(params.contentType) && (
              <div>
                <div>
                  <TextField
                    type='number'
                    variant='filled'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    fullWidth
                    label='Duration (In minutes)'
                    required
                  />
                </div>
                <br />
              </div>
            )}
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
                onChange={(e) => settotal_points(e.target.value)}
                fullWidth
                label='Total Points'
                required
              />
              {parseInt(total_points) + parseInt(accumulativeTitlePoints) >
                originalTotalPoints &&
                !['event', 'timeline', 'mini'].includes(params.contentType) && (
                  <p className='total-points-text'>
                    <InfoIcon
                      style={{
                        fill: 'red',
                        fontSize: 18,
                        position: 'relative',
                        top: 3,
                      }}
                    />{' '}
                    The total points for this title cannot be exceed than{' '}
                    {originalTotalPoints - accumulativeTitlePoints}
                  </p>
                )}
            </div>
            {showMessageError && total_points === 0 && (
              <p className='showErrorMessage'>Total Points are required </p>
            )}
            <br />
            {!['event', 'mini'].includes(params.contentType) && (
              <div>
                <TextField
                  type='url'
                  variant='filled'
                  value={previous_page}
                  onChange={(e) => setprevious_page(e.target.value)}
                  fullWidth
                  label='previous page url'
                  required
                />
              </div>
            )}
            <br />
            {!['event', 'mini'].includes(params.contentType) && (
              <div>
                <TextField
                  type='url'
                  variant='filled'
                  value={next_page}
                  onChange={(e) => setnext_page(e.target.value)}
                  fullWidth
                  label='next page url'
                  required
                />
              </div>
            )}
            <br />
            <div>
              <div style={{display: 'flex'}}>
                <div style={{fontSize: '20px', fontWeight: 600}}>
                  Featured Image
                </div>
                <div
                  className='featured-image-button'
                  onClick={() => {
                    setShowDialogue(true);
                  }}>
                  <AddCircleIcon style={{color: 'red'}} />
                </div>
              </div>
              <div style={{display: 'flex'}}>
                <div className='image-preview'>
                  {featuredImage !== '' && (
                    <img
                      style={{width: 50, height: 50}}
                      src={featuredImage}
                      alt='data-text'
                    />
                  )}
                </div>
              </div>
              <div className='last-feature-image'></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
