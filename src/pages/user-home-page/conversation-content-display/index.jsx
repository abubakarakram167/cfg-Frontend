import React, {useEffect, useState, lazy} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './style.css';
import SunEditor from '../../../components/sunEditor';
import Banner from './banner';
import {Button} from '@material-ui/core';
import {
  transformImagesInContent,
  getRestoredImage,
} from '../../../components/ReUsable';
import {getSignedUrl} from '../../../redux/actions/media';

const CommonComponent = lazy(() =>
  import('pages/user-home-page/common-component'),
);
const JournalModal = lazy(() => import('../../../components/JournalModal'));
const Session = lazy(() => import('redux/services/session'));

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
    console.log('the specific session', specificSession);
    setData(specificSession);
    setContent(specificSession);
  };
  useEffect(() => {
    getSessionById(params.id);
  }, []);

  const setPrevious = (link) => {
    var url = new URL(link);

    window.location = url.href;
  };

  const setNext = (link) => {
    var url = new URL(link);

    window.location = url.href;
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
