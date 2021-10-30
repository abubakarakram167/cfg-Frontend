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
var CryptoJS = require('crypto-js');

var ciphertext = CryptoJS.AES.encrypt(
  'my message to be game...',
  'secret key 123',
).toString();

// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log('before showing message.....');

console.log(originalText); // 'my message'

export default function ContentDisplay() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [data, setData] = useState({detail: ''});
  const [isContentTransform, setIsContentTransform] = useState(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalId, setJournalId] = useState(null);
  const [subject, setSubject] = useState(null);
  const [isContentChange, setContentChanged] = useState(false);

  const history = useHistory();

  useEffect(() => {
    dispatch(getContentData(params.id));
  }, [params.id, dispatch]);
  useEffect(() => {
    if (state.currentContent) {
      transformImagesInContent(
        state.currentContent.detail,
        false,
        params.id,
      ).then((res) => {
        setIsContentTransform(res.html);
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
          {/* <h6>{data && data.sub_title}</h6> */}
        </div>
      </div>

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
          when={true}
          onConfirm={() => console.log('on confirm.')}
          onCancel={() => console.log('on cancel pressed.')}
        />
      </div>
    </div>
  );
}
