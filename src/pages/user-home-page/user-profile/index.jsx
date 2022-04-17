import React, {lazy} from 'react';

const CommonComponent = lazy(() => import('../common-component'));
const BioCard = lazy(() => import('./bio'));
const CfgCard = lazy(() => import('./cfg'));
const DemographyCard = lazy(() => import('./demography'));
const GoalCard = lazy(() => import('./goals'));
const DefaultView = lazy(() => import('./default-homepage-view'));

export default function UserProfile() {
  return (
    <CommonComponent left='' right=''>
      <BioCard />
      <br />
      {/* <CfgCard /> */}
      {/* <br /> */}
      <GoalCard />
      <br />
      <DemographyCard />
      <br />
      <DefaultView />
    </CommonComponent>
  );
}
