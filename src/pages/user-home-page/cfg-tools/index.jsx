import React, {useState, useEffect} from 'react';
import CommonComponent from '../common-component';
import CfgCard from './cfg-card';
import './style.css';
import {getToolsData} from '../../../redux/actions/toolActions';
import {useDispatch, useSelector} from 'react-redux';
import {getSignedUrl} from '../../../redux/actions/media';

export default function HomeCFGTools() {
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.tool.tools);
  const [imageTools, setImageTools] = useState(null);

  const getImages = async (tools) => {
    const images = [];
    let transformTools = [];
    tools.map((tool) => {
      if (tool && tool.featured_image_url !== '') {
        tool.fileName = tool.featured_image_url;
        images.push(getSignedUrl(tool));
      }
    });
    const getImages = await Promise.all(images);
    transformTools = tools.map((tool) => {
      let specificImage = getImages.filter(
        (image) => tool && image.fileName === tool.featured_image_url,
      )[0];
      if (tool) tool.newUrl = specificImage ? specificImage.newUrl : null;
      return tool;
    });
    console.log('the transform', transformTools);
    setImageTools(transformTools);
  };

  useEffect(() => {
    dispatch(getToolsData());
  }, []);

  useEffect(() => {
    if (tools && tools.length !== 0) {
      getImages(tools);
    }
  }, [tools]);

  return (
    <CommonComponent left={''} right={''}>
      <div className='cfg-details-box-container'>
        {imageTools &&
          imageTools.map((element, index) => {
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
