import React, {lazy} from 'react';

const CommonComponent = lazy(() => import('../common-component'));
const SideImageCard = lazy(() => import('./side-image-card'));
const SummaryBox = lazy(() => import('./summary-box'));

export default function AllInboxPage() {
  const fakeSideImageData = [
    {
      image:
        'https://opalwealthadvisors.com/wp-content/uploads/2019/05/blog-052919.jpg',
      content: 'Hello world',
      points: '10000',
    },
    {
      image:
        'https://opalwealthadvisors.com/wp-content/uploads/2019/05/blog-052919.jpg',
      content: 'Hello world',
      points: '10000',
    },
  ];
  const fakeSummaryData = {
    totalPointsRequired: 110000,
    totalPointsAvailable: 140000,
    balance: 40000,
  };
  return (
    <CommonComponent left={''} right={''}>
      <br />
      {fakeSideImageData.map((element, index) => {
        return (
          <div style={{marginBottom: '10px'}} key={index}>
            <SideImageCard element={element} />
          </div>
        );
      })}
      <br />
      <SummaryBox element={fakeSummaryData} />
    </CommonComponent>
  );
}
