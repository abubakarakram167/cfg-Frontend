import React from 'react';
import CommonComponent from '../common-component';
import BioCard from './bio';
import CfgCard from './cfg';
import DemographyCard from './demography';
import GoalCard from './goals';

export default function UserProfile() {
  return (
    <CommonComponent left='' right=''>
      <BioCard />
      <br />
      {/* <CfgCard /> */}
      {/* <br /> */}
      {/* <GoalCard /> */}
      <br />
      <DemographyCard />
    </CommonComponent>
  );
}
