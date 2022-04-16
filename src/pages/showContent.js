import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {getContentData} from 'redux/actions/sessionActions';
import AdminHeader from 'pages/admin-header';
import './showContent.css';
import SunEditor from '../components/sunEditor';
import {transformImagesInContent} from '../components/ReUsable';
import JournalModal from '../components/JournalModal';
import InviteModal from '../components/inviteModal';
import {getInvite, updateInvite} from 'redux/actions/sessionActions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

var CryptoJS = require('crypto-js');

export default React.memo(function ContentDisplay() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [data, setData] = useState({detail: ''});
  const [isContentTransform, setIsContentTransform] = useState(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalId, setJournalId] = useState(null);
  const [subject, setSubject] = useState(null);
  const [isContentChange, setContentChanged] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSnackBar, setShowSnackbar] = useState(null);
  const [inviteData, setInviteData] = useState({});

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    let encrypted_id = window.location.href.substring(
      window.location.href.indexOf('mini') + 5,
    );
    var bytes = CryptoJS.AES.decrypt(
      encrypted_id,
      `mini@cfg#983&${user.first_name}`,
    );
    const paramsInfo = bytes.toString(CryptoJS.enc.Utf8);

    if (paramsInfo !== '') {
      var originalObject = JSON.parse(paramsInfo);
      const {cfg_id, user_id, invite_id} = originalObject;

      if (user && user_id !== user.id) {
        history.push({
          pathname: '/unAuthorizedPage',
        });
      }

      dispatch(getContentData(cfg_id));
      getInvite(originalObject).then((res) => {
        if (res.length) {
          const inviteStatus = res[0];
          setInviteData(inviteStatus);
          if (inviteStatus.status === 'sent') {
            setShowInvite(true);
          }
        }
      });
    } else {
      history.push({
        pathname: '/unAuthorizedPage',
      });
    }
  }, []);

  const updateInviteTo = (status) => {
    updateInvite({
      inviteId: inviteData.id,
      status,
    }).then((res) => {
      if (status === 'accepted') {
        setShowSnackbar('accepted');
      } else if (status === 'rejected') {
        setShowSnackbar('rejected');
      }
      setTimeout(() => {
        history.push({
          pathname: '/home',
        });
      }, 1500);
    });
  };

  useEffect(() => {
    if (state.currentContent) {
      transformImagesInContent(
        state.currentContent.detail,
        false,
        params.id,
      ).then((res) => {
        // setIsContentTransform(res.html);
      });
      setData(state.currentContent);
    }
  }, [state]);

  return (
    <div className='content-display-body'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <div className='titles-container-display-page'>
        <div className='title-display-container'>
          <h1>{data && data.title}</h1>
        </div>
        {showInvite === true && (
          <div style={{textAlign: 'center'}}>
            <span> You've got an invite </span>
            <div style={{marginTop: 5}}>
              <button
                className='accept-reject-button'
                onClick={() => setShowModal(true)}>
                Accept/Reject
              </button>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={showSnackBar && showSnackBar}
        autoHideDuration={6000}
        onClose={() => {}}>
        <Alert
          variant='filled'
          onClose={() => {}}
          severity={showSnackBar === 'accepted' ? 'success' : 'warning'}>
          You have {showSnackBar} the request.
        </Alert>
      </Snackbar>

      <div className='display-content-container'>
        <br />
        <br />
        <div className='display-content'>
          <div className='rich-content-user-container'>
            <SunEditor
              onClickSmartClick={(params) => {
                if (params.subject) {
                  setSubject(params.subject ? params.subject : null);
                }

                setShowJournalModal(true);
              }}
              onContentSave={() => {}}
              onContentChanged={() => setContentChanged(true)}
              content={isContentTransform ? isContentTransform : data.detail}
              onGetSubject={(subject) => setSubject(subject)}
              showToolbar={false}
              modalType='external'
            />
          </div>
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
          parent='user-cfg-session'
        />
        <InviteModal
          when={showInvite && showModal}
          onConfirm={() => updateInviteTo('accepted')}
          onCancel={() => updateInviteTo('rejected')}
        />
      </div>
    </div>
  );
});
