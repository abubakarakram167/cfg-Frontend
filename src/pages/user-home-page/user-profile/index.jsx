import React from 'react';
import CommonComponent from '../common-component';
import BioCard from './bio';
import CfgCard from './cfg';
import DemographyCard from './demography';
import GoalCard from './goals';
import DefaultView from './default-homepage-view';

export default React.memo(function UserProfile() {
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
});
