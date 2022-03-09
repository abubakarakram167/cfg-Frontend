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
import {Link} from 'react-router-dom';

export default function Learn() {
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
    getSessionById(params.learnId);
  }, []);

  const getUrlFormat = (url) => {
    return new URL(url).pathname;
  };

  const isUrl = (string) => {
    var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matcher.test(string);
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
            {content && isUrl(content.previous_page) && content.previous_page && (
              <Link to={getUrlFormat(data.previous_page)}>
                <button className='next-prev-button'>Previous</button>
              </Link>
            )}
            {content && isUrl(content.next_page) && content.next_page && (
              <Link to={getUrlFormat(content.next_page)}>
                <button className='next-prev-button'>Next</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </CommonComponent>
  );
}
