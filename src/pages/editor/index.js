import React, {useState, useEffect} from 'react';
import AdminHeader from 'pages/admin-header';
import {Container, Select, MenuItem, TextField} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import './style.css';
import SunEditor from '../../components/sunEditor';
import {KeyboardDatePicker} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useParams} from 'react-router-dom';
import formatDate from 'utils/formatDate';
import {
  createSessionTitle,
  getContentData,
  getSessionListData,
} from 'redux/actions/sessionActions';
import {getUserMediaList, getSignedUrl} from '../../redux/actions/media';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {Show_Message} from '../../shared/constants/ActionTypes';
import InfoIcon from '@material-ui/icons/Info';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import {createResource, getResourceData} from 'redux/actions/cfg';
import jsCookie from 'js-cookie';
import PromptModal from 'components/PromptModal';
import NavigationPrompt from 'react-router-navigation-prompt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MediaUpload from 'components/MediaUpload';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';
import {parseXML} from 'jquery';
import Api from '../../utils/axios';
import JournalModal from '../../components/JournalModal';
import SearchDropdown from 'react-select';
import {onGetUserList} from '../../redux/actions';
import {
  getInviteOfMiniCfg,
  deleteInvite,
  sendInvite,
} from 'redux/actions/sessionActions';

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
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const toolState = useSelector((state) => state.tool);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [sub_title, setsub_title] = useState('Enter a subtitle');
  const [appliedGroup, setAppliedGroup] = useState('');
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [group, setGroup] = useState('candidate');
  const [value, setValue] = useState('');
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setend_date] = useState(new Date());
  const [status, setStatus] = useState('draft');
  const [total_points, settotal_points] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [createdContentId, setCreatedContentId] = useState(0);
  const [previous_page, setprevious_page] = useState('');
  const [next_page, setnext_page] = useState('');
  const [contentType, setContentType] = useState('');
  const [groupValue, setGroupValue] = useState('');
  const [accumulativeTitlePoints, setAccumulativeTitlePoints] = useState(0);
  const [originalTotalPoints, setOriginalTotalPoints] = useState(0);
  const [showMessageError, setShowMessageError] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [publishDate, setPublishDate] = useState(null);
  const history = useHistory();
  const [author, setAuthor] = useState('');
  const [isContentChange, setContentChanged] = useState(false);
  const {id} = useParams();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [timelineContent, setTimelineContent] = useState([]);
  const [eventType, setEventType] = useState('live-video');
  const [duration, setDuration] = useState(0);
  const [facilitator, setFacilitator] = useState('');
  const [facilitatorUsers, setFacilitatorUsers] = useState([]);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [subject, setSubject] = useState(null);
  const [journalId, setJournalId] = useState(null);
  const [inviteUserIds, setInviteUserIds] = useState([]);
  const usersList = useSelector(({userList}) => userList.usersList);
  const [invites, setInvites] = useState([]);
  const [inviteValue, setInviteValue] = useState('');
  const [allCompleteInvites, setAllCompleteInvites] = useState([]);

  const classes = useStyles();
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

  const handleEditorChange = (e) => {
    setContentChanged(true);
    setContent(e);
    setImageData(
      e.split('"').filter((element) => element.startsWith('data:image')),
    );
  };

  const sendInvites = async (contentId) => {
    let allInvites = [];
    const body = {
      cfg_id: contentId,
      detail: '',
    };
    for (let user of inviteUserIds) {
      allInvites.push(sendInvite({...body, user_id: user}));
    }

    try {
      let allInvitesSent = await Promise.all(allInvites);
      setTimeout(() => {
        if (!isContentChange) {
          history.push(`/admin/content/display/${contentId}`);
        } else {
          setTimeout(() => {
            history.push(`/admin/content/display/${contentId}`);
          }, 500);
        }
      }, 1000);
    } catch (err) {
      console.log('the error or recieving..', err);
    }
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
    if (params.id !== 'null') dispatch(getContentData(params.id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getUserMediaList());
    Api.get('api/users/list?_count=10000&_pageNo=1').then((users) => {
      setFacilitator(
        users.data.userResponse.length ? users.data.userResponse[0].id : '',
      );
      setFacilitatorUsers(users.data.userResponse);
    });
  }, []);

  useEffect(() => {
    dispatch(onGetUserList({page: 0}));
  }, []);

  // useEffect(() => {
  //   if(params.cfgType === 'mini'){
  //     const miniCfgId = parseInt(params.id);
  //     getInviteOfMiniCfg(miniCfgId).then(res => {
  //       setAllCompleteInvites(res)
  //       const userIds = res.map(invite => invite.user_id)
  //       const userName = usersList.filter(user => {
  //         if(userIds.includes(user.id)) return true
  //         return false
  //       }).map(user => user.first_name)
  //       setInvites(userName)
  //       setInviteUserIds(userIds)
  //     })
  //   }
  // }, [dispatch, usersList]);

  useEffect(() => {
    if (['event', 'timeline', 'mini'].includes(params.cfgType))
      dispatch(getSessionListData(params.id, params.cfgType));
  }, []);

  const isValidJSONString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (['event', 'timeline', 'mini'].includes(params.cfgType))
      dispatch(getResourceData(params.cfgType));
  }, [dispatch]);

  useEffect(() => {
    if (state.titleCreation) {
      setOpen1(true);
    }
    setAuthor(JSON.parse(jsCookie.get('user')).user_name);
    if (state.titles && state.titles.rows && state.titles.rows.length) {
      let totalPoints = 0;

      state.titles.rows.map((row) => {
        if (row && row.total_points <= state.current.total_points)
          totalPoints = totalPoints + row.total_points;
      });
      settotal_points(state.current.total_points - totalPoints);
      setAccumulativeTitlePoints(totalPoints);
    }

    if (state.currentContent) {
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

      setsub_title(state.currentContent.sub_title || '');
      setContent('');
      setstart_date(new Date(state.currentContent.start_date));
      setend_date(new Date(state.currentContent.end_date));
      setStatus(state.currentContent.status || 'draft');
      setOriginalTotalPoints(state.currentContent.total_points || 0);
      setnext_page(state.currentContent.next_page || '');
      setPublishDate(moment().format('MM/DD/yyyy'));
      setprevious_page(state.currentContent.previous_page || '');
      setContentType(state.currentContent.type || '');
    }

    setTimelineContent(toolState.content);
    if (state.createdContent) {
      setCreatedContentId(state.createdContent.id);
    }
  }, [state]);

  const publish = (publishStatus) => {
    setContentChanged(false);
    let totalTags = [];

    keywords.map((element) => {
      totalTags.push({
        tag_type: 'keyword',
        text: element,
      });
    });

    if (['event', 'timeline', 'mini'].includes(params.cfgType)) {
      if (
        (total_points === '0' ||
          title === '' ||
          content === '' ||
          group === '' ||
          categories.length === 0 ||
          keywords.length === 0) &&
        publishStatus === 'publish'
      )
        setShowMessageError(true);
      else {
        if (title === '') {
          dispatch({
            type: Show_Message,
            payload: {
              message:
                'The title should be present in order to preview the content.',
              success: false,
            },
          });
        } else {
          let subtitles = toolState.content;
          subtitles = subtitles && subtitles.length ? subtitles : [];

          if (
            subtitles &&
            subtitles.length > 0 &&
            subtitles.filter((content) => content.title === title).length > 0
          ) {
            dispatch({
              type: Show_Message,
              payload: {
                message: 'This title is already used.Please use another one.',
                success: false,
              },
            });
          } else {
            dispatch(
              createResource(
                {
                  title,
                  author: author,
                  start_date: formatDate(start_date),
                  end_date: formatDate(end_date),
                  total_points,
                  status: publishStatus === 'publish' ? status : 'draft',
                  tags: totalTags,
                  detail: content,
                  assigned_group: group,
                  categories: JSON.stringify(categories),
                  featured_image_url: featuredImage
                    ? featuredImage.fileName
                    : '',
                  event_type: eventType,
                  duration: parseInt(duration),
                  facilitator,
                },
                params.cfgType,
              ),
            ).then((response) => {
              if (params.cfgType === 'mini') {
                const miniCfgId = response.data.content.id;
                sendInvites(miniCfgId);
              } else {
                if (response) {
                  setTimeout(() => {
                    if (!isContentChange) {
                      history.push(
                        `/admin/content/display/${response.data.content.id}`,
                      );
                    } else {
                      setTimeout(() => {
                        history.push(
                          `/admin/content/display/${response.data.content.id}`,
                        );
                      }, 500);
                    }
                  }, 1000);
                }
              }
            });
          }
        }
      }
    } else {
      if (
        (total_points === '0' ||
          title === '' ||
          content === '' ||
          group === '' ||
          categories.length === 0 ||
          keywords.length === 0) &&
        publishStatus === 'publish'
      )
        setShowMessageError(true);
      else {
        const allTitles = state.titles.rows;
        let isSubtitleFound = false;
        let subtitles = [];

        subtitles = allTitles
          ? allTitles.filter(
              (content) => content.id === parseInt(params.contentHeaderId),
            )[0]
          : [];
        subtitles =
          subtitles && subtitles.length && subtitles.subtitles.rows.length
            ? subtitles.subtitles.rows
            : [];

        if (
          subtitles &&
          subtitles.length > 0 &&
          subtitles.filter((content) => content.title === title).length > 0
        ) {
          dispatch({
            type: Show_Message,
            payload: {
              message:
                'This Subtitle is already used For this Title.Please use another one.',
              success: false,
            },
          });
        } else if (
          allTitles &&
          allTitles.length &&
          allTitles.filter((content) => content.title === title).length > 0
        ) {
          dispatch({
            type: Show_Message,
            payload: {
              message: 'This title is already used.Please use another one.',
              success: false,
            },
          });
        } else {
          if (title === '') {
            dispatch({
              type: Show_Message,
              payload: {
                message:
                  'The title should be present in order to preview the content.',
                success: false,
              },
            });
          } else {
            let cfgSessionStatus = state.current.status;
            if (
              cfgSessionStatus === 'published' ||
              publishStatus === 'preview'
            ) {
              let parent = null;
              if (params.contentHeaderId === 'null') {
                parent = params.id;
              } else {
                parent = params.contentHeaderId;
              }
              const tags = keywords.map((element) => {
                return {
                  tag_type: 'keyword',
                  text: element,
                };
              });

              if (
                parseInt(total_points) + parseInt(accumulativeTitlePoints) >
                originalTotalPoints
              ) {
                dispatch({
                  type: Show_Message,
                  payload: {
                    message: 'Cannot be added.Please follow the requirements',
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
                  createSessionTitle(
                    {
                      title,
                      sub_title,
                      detail: content,
                      start_date: formatDate(start_date),
                      end_date: formatDate(end_date),
                      tags: totalTags,
                      type: params.type,
                      assigned_group: group,
                      categories: JSON.stringify(categories),
                      total_points,
                      content_header_id: parseInt(parent),
                      status: publishStatus === 'publish' ? status : 'draft',
                      previous_page,
                      next_page,
                      featured_image_url: featuredImage
                        ? featuredImage.fileName
                        : '',
                      event_type: eventType,
                      duration,
                      facilitator,
                    },
                    params.type,
                  ),
                ).then((response) => {
                  if (response) {
                    setTimeout(() => {
                      if (!isContentChange) {
                        history.push(
                          `/admin/content/display/${response.content.id}`,
                        );
                      } else {
                        setTimeout(() => {
                          history.push(
                            `/admin/content/display/${response.content.id}`,
                          );
                        }, 1000);
                      }
                    }, 1000);
                  }
                });
              }
            } else {
              dispatch({
                type: Show_Message,
                payload: {
                  message:
                    'Session must be published in order to publish the content.',
                  success: false,
                },
              });
              setTimeout(() => {
                dispatch({
                  type: Show_Message,
                  payload: {message: null, success: true},
                });
              }, 3000);
            }
          }
        }
      }
    }
  };

  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };

  const userList = useSelector((state) => state.userList);

  return (
    <div className='editor-page-full-container'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <NavigationPrompt when={isContentChange ? true : false}>
        {({onConfirm, onCancel}) => (
          <PromptModal when={true} onCancel={onCancel} onConfirm={onConfirm} />
        )}
      </NavigationPrompt>
      {userList.message && (
        <Snackbar
          variant='filled'
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
        <Alert variant='filled' onClose={handleClose1} severity='success'>
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
            <button
              className='flex-button preview'
              onClick={() => publish('preview')}>
              <VisibilityIcon style={{fill: '#ffffff'}} />{' '}
              <span className='button-text'>Preview</span>
            </button>
            <button
              className='flex-button publish'
              onClick={() => publish('publish')}>
              <PublishIcon style={{fill: '#ffffff'}} />{' '}
              <span className='button-text'>Publish</span>
            </button>
          </div>
        </div>
        <MediaUpload
          showDialogue={showDialogue}
          onClose={() => setShowDialogue(false)}
          onImageSave={(file) => {
            getSignedUrl(file[0]).then((res) => {
              setFeaturedImage(res);
            });
          }}
        />
        <div className='editor-container'>
          <div className='editor-side'>
            <SunEditor
              onClickSmartClick={(params) => {
                if (params.subject) {
                  setSubject(params.subject ? params.subject : null);
                }
                setShowJournalModal(true);
              }}
              onContentSave={(content) => {
                setContent(content);
              }}
              onContentChanged={() => setContentChanged(true)}
              content={content}
              onGetSubject={(subject) => setSubject(subject)}
              showToolbar={true}
              modalType='external'
            />
          </div>
          <JournalModal
            onOpen={() => setShowJournalModal(true)}
            onClose={() => {
              setShowJournalModal(false);
              setJournalId(null);
            }}
            show={showJournalModal}
            journalId={journalId}
            getJournalData={(journalData) => {
              setJournalId(journalData ? journalData.id : null);
            }}
            subject={subject}
            parent={params.cfgType}
          />

          <div className='options-side'>
            {!['mini', 'event'].includes(params.cfgType) && (
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

            {params.cfgType === 'event' && (
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

            {params.cfgType === 'mini' && (
              <div>
                <SearchDropdown
                  style={{marginTop: 50}}
                  defaultValue={usersList.length ? usersList[0] : ''}
                  placeholder={'Select users to invite'}
                  onChange={(e) => {
                    const {first_name, id} = e.value;
                    let changeInviteIds = inviteUserIds;
                    if (e.value) {
                      setInviteValue(first_name);

                      if (!inviteUserIds.includes(id)) {
                        changeInviteIds.push(id);
                        setInvites([...invites, first_name]);
                      } else {
                        setInvites(
                          invites.filter((invite) => invite !== first_name),
                        );
                        changeInviteIds = changeInviteIds.filter(
                          (value) => value !== id,
                        );
                      }
                      setInviteUserIds(changeInviteIds);
                      setCategoryValue('');
                    }
                  }}
                  options={usersList.map((user) => {
                    return {
                      label: user.first_name,
                      value: user,
                    };
                  })}
                />
                <div>
                  {invites && invites.length > 0 && <span>Invite users:</span>}

                  {invites && invites.length
                    ? invites.map((element, index) => {
                        return (
                          <Chip
                            label={element}
                            key={index}
                            className='chip-style'
                            onDelete={() => {
                              setInvites(
                                invites.filter((value) => value !== element),
                              );
                            }}
                          />
                        );
                      })
                    : null}
                </div>
                <div style={{marginTop: 20}}>
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
              </div>
            )}

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
                  required
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
            {showMessageError && keywords.length === 0 && (
              <p className='showErrorMessage'>Keywords are required</p>
            )}
            <br />
            <div className='dates'>
              <KeyboardDatePicker
                disableToolbar
                variant='filled'
                className={classes.datePicker}
                format='MM/DD/yyyy'
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
            {['mini', 'event'].includes(params.cfgType) && (
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
                params.cfgType !== 'timeline' && (
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
            {!['event', 'mini'].includes(params.cfgType) && (
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
            {!['event', 'mini'].includes(params.cfgType) && (
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
                  {featuredImage && (
                    <img
                      style={{width: 50, height: 50}}
                      src={featuredImage.newUrl}
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
