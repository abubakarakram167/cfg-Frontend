import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import CommonComponent from '../common-component';
import Banner from './banner';
import LearnCard from './learn-card';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {
  getToolListData,
  setSelectedToolData,
} from '../../../redux/actions/toolActions';

export default function CfgToolsPage() {
  const params = useParams();

  const selectedTool = useSelector((state) => state.tool.selectedTool);
  const statedTool = useSelector((state) =>
    console.log('the state to be find', state),
  );
  const dispatch = useDispatch();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    dispatch(getToolListData(parseInt(params.id)));
    dispatch(setSelectedToolData(parseInt(params.id)));
  }, []);

  useEffect(() => {
    if (selectedTool) {
      setTitles(selectedTool.subTitles.rows);
    }
  }, [selectedTool]);

  return (
    <CommonComponent left={''} right={''}>
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
