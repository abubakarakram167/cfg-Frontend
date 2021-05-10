import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import CommonComponent from '../common-component';
import Banner from './banner';
import {Button} from '@material-ui/core';
import './style.css';
import {getContentData} from '../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';
export default function Learn() {
  const params = useParams();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentContent, setCurrentContent] = useState(null);
  const dispatch = useDispatch();
  const content = useSelector((state) => state.tool.currentContent);

  useEffect(() => {
    console.log(params.learnId);
    dispatch(getContentData(params.learnId));
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  useEffect(() => {
    setCurrentContent(
      fakeLearnData.find((element) => element.id === parseInt(params.learnId)),
    );
    fakeLearnData.forEach((element, index) => {
      if (element.id === parseInt(params.learnId)) {
        setCurrentIndex(index);
      }
    });
  }, []);

  const fakeLearnData = [
    {
      id: 1,
      title: 'something 1',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 2,
      title: 'something 2',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 3,
      title: 'something 3',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 4,
      title: 'something 4',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 5,
      title: 'something 5',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 6,
      title: 'something 6',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
  ];

  const setPrevious = (id) => {
    history.push(`/home/cfg-tools/4/${id}`);
  };
  const setNext = (id) => {
    history.push(`/home/cfg-tools/4/${id}`);
  };

  return (
    <CommonComponent left={''} right={''}>
      <Banner
        url={
          'https://opalwealthadvisors.com/wp-content/uploads/2019/05/blog-052919.jpg'
        }
      />
      <br />

      {content && (
        <div>
          <span className='learn-title'>{content.title}</span>
          <br />
          <div
            className='learn-content'
            dangerouslySetInnerHTML={{__html: content.detail}}></div>
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
