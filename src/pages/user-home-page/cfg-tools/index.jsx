import React, {useState, useEffect} from 'react';
import CommonComponent from '../common-component';
import CfgCard from './cfg-card';
import './style.css';
import {getToolsData} from '../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';

export default function HomeCFGTools() {
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.tool.tools);

  useEffect(() => {
    dispatch(getToolsData());
  }, []);

  return (
    <CommonComponent left={''} right={''}>
      <div className='cfg-details-box-container'>
        {tools &&
          tools.map((element, index) => {
            if (element) {
              return (
                <div className='cfg-details-box' key={index}>
                  <CfgCard element={element} />
                </div>
              );
            }
          })}
      </div>
    </CommonComponent>
  );
}
