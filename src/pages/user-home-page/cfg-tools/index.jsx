import React from 'react';
import CommonComponent from '../common-component';
import CfgCard from './cfg-card';
import './style.css';
export default function HomeCFGTools() {
  const fakeData = [
    {
      id: 1,
      title: 'Building Wealth',
      details:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt iure eligendi veniam nesciunt doloribus. Quae tempore eius nesciunt eligendi et ducimus eaque eos saepe, assumenda, magni, architecto qui! Officia, eaque.',
      image:
        'https://i2.wp.com/thewhitelawoffice.com/wp-content/uploads/2018/03/Blog-Cover-2-1.jpg?fit=2560%2C1440&ssl=1',
    },
    {
      id: 2,
      title: 'Building Wealth',
      details:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt iure eligendi veniam nesciunt doloribus. Quae tempore eius nesciunt eligendi et ducimus eaque eos saepe, assumenda, magni, architecto qui! Officia, eaque.',
      image:
        'https://i2.wp.com/thewhitelawoffice.com/wp-content/uploads/2018/03/Blog-Cover-2-1.jpg?fit=2560%2C1440&ssl=1',
    },
    {
      id: 3,
      title: 'Building Wealth',
      details:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt iure eligendi veniam nesciunt doloribus. Quae tempore eius nesciunt eligendi et ducimus eaque eos saepe, assumenda, magni, architecto qui! Officia, eaque.',
      image:
        'https://i2.wp.com/thewhitelawoffice.com/wp-content/uploads/2018/03/Blog-Cover-2-1.jpg?fit=2560%2C1440&ssl=1',
    },
    {
      id: 4,
      title: 'Building Wealth',
      details:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt iure eligendi veniam nesciunt doloribus. Quae tempore eius nesciunt eligendi et ducimus eaque eos saepe, assumenda, magni, architecto qui! Officia, eaque.',
      image:
        'https://i2.wp.com/thewhitelawoffice.com/wp-content/uploads/2018/03/Blog-Cover-2-1.jpg?fit=2560%2C1440&ssl=1',
    },
  ];

  return (
    <CommonComponent left={''} right={''}>
      <div className='cfg-details-box-container'>
        {fakeData.map((element, index) => {
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
