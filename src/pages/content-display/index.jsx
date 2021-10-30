import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {getContentData} from 'redux/actions/sessionActions';
import AdminHeader from 'pages/admin-header';
import './style.css';
import {Link} from 'react-router-dom';
import SunEditor from '../../components/sunEditor';
import {transformImagesInContent} from '../../components/ReUsable';
import JournalModal from '../../components/JournalModal';

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
        // setIsContentTransform(res.html);
      });
      setData(state.currentContent);
    }
  }, [state]);

  const getUrlFormat = (url) => {
    return new URL(url).pathname;
  };

  const isUrl = (string) => {
    var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matcher.test(string);
  };

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

        {/* <div
          className='display-content'
          dangerouslySetInnerHTML={{ __html: data ? data.detail : '' }}></div> */}
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
      </div>
      <div className='content-display-buttons-container'>
        <div className='content-display-buttons'>
          {data && isUrl(data.previous_page) && data.previous_page && (
            <Link to={getUrlFormat(data.previous_page)}>
              <button className='next-prev-button'>Previous</button>
            </Link>
          )}
          {data && isUrl(data.next_page) && data.next_page && (
            <Link to={getUrlFormat(data.next_page)}>
              <button className='next-prev-button'>Next</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
