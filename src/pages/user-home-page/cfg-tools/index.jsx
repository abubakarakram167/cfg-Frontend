import React, {useState, useEffect, lazy} from 'react';
import './style.css';
import {getToolsData} from '../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';

const CommonComponent = lazy(() => import('../common-component'));
const CfgCard = lazy(() => import('./cfg-card'));

export default function HomeCFGTools() {
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.tool.tools);
  console.log('the tools', tools);
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
                  <CfgCard
                    parentToolId={element.content_header_id}
                    element={element}
                  />
                </div>
              );
            }
          })}
      </div>
    </CommonComponent>
  );
}
