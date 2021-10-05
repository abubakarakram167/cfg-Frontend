import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './style.css';
import CommonComponent from 'pages/user-home-page/common-component';
import Session from 'redux/services/session';
import SunEditor from '../../../components/sunEditor';
import Banner from './banner';
import {Button} from '@material-ui/core';
import JournalModal from '../../../components/JournalModal';
import {
  transformImagesInContent,
  getRestoredImage,
} from '../../../components/ReUsable';
import {getSignedUrl} from '../../../redux/actions/media';

export default function ConversationContentDisplay() {
  const params = useParams();
  const [content, setContent] = useState(null);
  const history = useHistory();
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalId, setJournalId] = useState(null);
  const [subject, setSubject] = useState(null);
  const [data, setData] = useState({detail: ''});
  const [isContentTransform, setIsContentTransform] = useState(null);
  const [isContentChange, setContentChanged] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);

  const getSessionById = async (id) => {
    const data = await Session.getContentData(id);
    console.log('the data', data);
    const specificSession = data.data;
    let getFileName = null;
    if (
      specificSession.featured_image_url &&
      specificSession.featured_image_url !== ''
    ) {
      getFileName = getRestoredImage(specificSession.featured_image_url);
    }
    if (getFileName) {
      getSignedUrl({fileName: getFileName}).then((res) => {
        setFeaturedImageUrl(res.newUrl);
      });
    } else setFeaturedImageUrl(null);

    transformImagesInContent(specificSession.detail, false, params.id).then(
      (res) => {
        setIsContentTransform(res.html);
      },
    );
    setData(specificSession);
    setContent(specificSession);
  };
  useEffect(() => {
    getSessionById(params.id);
  }, []);

  const setPrevious = (id) => {
    history.push(`/home/conversation/${id}`);
  };
  const setNext = (id) => {
    history.push(`/home/conversation/${id}`);
  };
  return (
    <CommonComponent left={''} right={''}>
      {featuredImageUrl && <Banner url={featuredImageUrl} />}
      <br />

      {content && (
        <div>
          <span className='learn-title'>{content.title}</span>
          <br />
          <div className='learn-content'>
            <div className='rich-content-user-container'>
              <SunEditor
                onClickSmartClick={(id) => {
                  setJournalId(id);
                  setShowJournalModal(true);
                }}
                onContentSave={() => {}}
                onContentChanged={() => setContentChanged(true)}
                content={isContentTransform ? isContentTransform : data.detail}
                onGetSubject={(subject) => setSubject(subject)}
                journalId={journalId}
                showToolbar={false}
                modalType='external'
              />
            </div>
          </div>
          <JournalModal
            onOpen={() => setShowJournalModal(true)}
            onClose={() => {
              // setContent(isContentTransform ? isContentTransform : data.detail);
              setShowJournalModal(false);
              setJournalId(null);
            }}
            show={showJournalModal}
            journalId={journalId}
            getJournalData={(journalData) => {
              setJournalId(journalData ? journalData.id : null);
              setShowJournalModal(false);
            }}
            subject={subject}
          />
          <br />
          <div className='learn-content-buttons'>
            {content && content.previous_page && (
              <Button
                variant='contained'
                onClick={() => setPrevious(content.previous_page)}>
                Previous
              </Button>
            )}
            {content && content.next_page && (
              <Button
                variant='contained'
                style={{marginLeft: '10px'}}
                onClick={() => setNext(content.next_page)}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </CommonComponent>
  );
}
