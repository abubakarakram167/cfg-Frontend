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
  getToolsData,
} from '../../../redux/actions/toolActions';

export default React.memo(function CfgToolsPage() {
  const params = useParams();
  const selectedTool = useSelector((state) => state.tool.selectedTool);
  const dispatch = useDispatch();
  const [titles, setTitles] = useState([]);
  const tools = useSelector((state) => state.tool.tools);

  useEffect(() => {
    dispatch(getToolsData());
  }, []);

  useEffect(() => {
    dispatch(getToolListData(parseInt(params.id))).then((response) => {
      dispatch(setSelectedToolData(parseInt(params.id)));
    });
  }, []);

  useEffect(() => {
    if (selectedTool && selectedTool.length) {
      setTitles(selectedTool);
    }
  }, [selectedTool]);

  console.log('the selected Tool....', selectedTool);
  console.log('the titles....', titles);

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
});
