import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './style.css';
import CommonComponent from 'pages/user-home-page/common-component';
import Session from 'redux/services/session';
import SunEditor from 'suneditor-react';
import Banner from './banner';
import {Button} from '@material-ui/core';

export default function ConversationContentDisplay() {
  const params = useParams();
  const [content, setContent] = useState(null);
  const history = useHistory();

  const getSessionById = async (id) => {
    const data = await Session.getContentData(id);
    setContent(data.data);
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
      {content?.featured_image_url && (
        <Banner url={content.featured_image_url} />
      )}
      <br />

      {content && (
        <div>
          <span className='learn-title'>{content.title}</span>
          <br />
          <div className='learn-content'>
            <div className='rich-content-user-container'>
              <SunEditor
                disable={true}
                height='100%'
                setContents={content ? content.detail : ''}
                showToolbar={false}
              />
            </div>
          </div>
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
