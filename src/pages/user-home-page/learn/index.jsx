import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import CommonComponent from '../common-component';
import Banner from './banner';
import {Button} from '@material-ui/core';
import './style.css';
export default function Learn() {
  const params = useParams();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentContent, setCurrentContent] = useState(null);

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

  const setPrevious = () => {
    setCurrentContent(fakeLearnData[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
    history.push(`/home/cfg-tools/4/${fakeLearnData[currentIndex - 1].id}`);
  };
  const setNext = () => {
    setCurrentContent(fakeLearnData[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
    params.id = fakeLearnData[currentIndex + 1].id;
    history.push(`/home/cfg-tools/4/${fakeLearnData[currentIndex + 1].id}`);
  };

  return (
    <CommonComponent left={''} right={''}>
      <Banner
        url={
          'https://opalwealthadvisors.com/wp-content/uploads/2019/05/blog-052919.jpg'
        }
      />
      <br />

      {currentContent && (
        <div>
          <span className='learn-title'>{currentContent.title}</span>
          <br />
          <div className='learn-content'>{currentContent.content}</div>
          <br />
          <div className='learn-content-buttons'>
            {currentIndex > 0 && (
              <Button variant='contained' onClick={setPrevious}>
                Previous
              </Button>
            )}
            {currentIndex < fakeLearnData.length - 1 && (
              <Button
                variant='contained'
                style={{marginLeft: '10px'}}
                onClick={setNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </CommonComponent>
  );
}
