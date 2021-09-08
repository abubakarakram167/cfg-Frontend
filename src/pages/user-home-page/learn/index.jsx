import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import CommonComponent from '../common-component';
import Banner from './banner';
import {Button} from '@material-ui/core';
import './style.css';
import {getContentData} from '../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';
import SunEditor from 'suneditor-react';

export default function Learn() {
  const params = useParams();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentContent, setCurrentContent] = useState(null);
  const dispatch = useDispatch();
  const content = useSelector((state) => {
    return state.session.currentContent;
  });

  useEffect(() => {
    console.log(params);
    dispatch(getContentData(params.learnId));
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  const setPrevious = (id) => {
    history.push(`/home/cfg-tools/4/${id}`);
  };
  const setNext = (id) => {
    history.push(`/home/cfg-tools/4/${id}`);
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
