import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import CommonComponent from '../common-component';
import Banner from './banner';
import LearnCard from './learn-card';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {getToolListData} from '../../../redux/actions/toolActions';

export default function CfgToolsPage() {
  const params = useParams();

  const fakeLearnData = [
    {
      id: 1,
      title: 'something',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 2,
      title: 'something',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 3,
      title: 'something',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 4,
      title: 'something',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 5,
      title: 'something',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
    {
      id: 6,
      title: 'something',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque magni incidunt inventore? Consequatur distinctio rem provident quas, maiores voluptatem animi ullam tenetur et excepturi, optio odit, sequi similique nisi officiis!',
      point: '5000',
    },
  ];

  const dispatch = useDispatch();
  const titles = useSelector((state) => state.tool.titles.rows);

  useEffect(() => {
    dispatch(getToolListData(parseInt(params.id)));
  }, []);

  useEffect(() => {
    console.log(titles);
  }, [titles]);

  return (
    <CommonComponent left={''} right={''}>
      <Banner
        url={
          'https://opalwealthadvisors.com/wp-content/uploads/2019/05/blog-052919.jpg'
        }
      />
      <br />
      <div className='learn-data-container'>
        {titles &&
          titles.map((element, index) => {
            return (
              <div className='learn-data-box' key={index}>
                <LearnCard element={element} />
              </div>
            );
          })}
      </div>
    </CommonComponent>
  );
}
