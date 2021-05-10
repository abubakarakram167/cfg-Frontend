import React, {useState, useEffect} from 'react';
import CommonComponent from '../common-component';
import CfgCard from './cfg-card';
import './style.css';
import {getToolData} from '../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';
export default function HomeCFGTools() {
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.tool.content);

  useEffect(() => {
    dispatch(getToolData());
  }, []);
  useEffect(() => {
    console.log('hello');
    console.log(tools);
  }, [tools]);

  return (
    <CommonComponent left={''} right={''}>
      <div className='cfg-details-box-container'>
        {tools &&
          tools.map((element, index) => {
            return (
              <div className='cfg-details-box' key={index}>
                <CfgCard element={element} />
              </div>
            );
          })}
      </div>
    </CommonComponent>
  );
}
