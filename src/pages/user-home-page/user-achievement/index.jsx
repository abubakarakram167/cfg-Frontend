import React, {useEffect, lazy} from 'react';
import {ChatBubbleOutline, Whatshot} from '@material-ui/icons';
import './style.css';

const CommonComponent = lazy(() => import('../common-component'));
const AchievementCard = lazy(() => import('./achievement-card'));
const AchievementList = lazy(() => import('./achievement-list'));
const Summary = lazy(() => import('./summary'));
const UserPageHeader = lazy(() => import('../user-page-header'));

export default function UserAcievement() {
  const achievementCardFakeData = [
    {
      cfgSession: 'CFG Session 1',
      points: 10000,
      status: 'Redeemed',
    },
    {
      cfgSession: 'CFG Session 2',
      points: 20000,
      status: 'Redeemed',
    },
    {
      cfgSession: 'CFG Session 13',
      points: 100,
      status: 'Redeemed',
    },
  ];

  const LeaderboardByGroupFakeData = {
    title: (
      <div className='list-tile-with-icon'>
        {' '}
        <Whatshot style={{color: 'blue', marginRight: '10px'}} />
        <strong>Leaderboard by group </strong>
      </div>
    ),
    achievementList: [
      {
        text: 'Me',
        points: 9000,
      },
      {
        text: 'Barack',
        points: 6000,
      },
      {
        text: 'Michelle',
        points: 4500,
      },
      {
        text: 'Jermaine',
        points: 90000,
      },
    ],
  };

  const LeaderboardByRegionFakeData = {
    title: (
      <div className='list-tile-with-icon'>
        {' '}
        <Whatshot style={{color: 'blue', marginRight: '10px'}} />
        <strong>Leaderboard by region </strong>
      </div>
    ),
    achievementList: [
      {
        text: 'Me',
        points: 9000,
      },
      {
        text: 'Barack',
        points: 6000,
      },
      {
        text: 'Michelle',
        points: 4500,
      },
      {
        text: 'Jermaine',
        points: 90000,
      },
    ],
  };
  const LeaderboardByGlobalFakeData = {
    title: (
      <div className='list-tile-with-icon'>
        {' '}
        <Whatshot style={{color: 'blue', marginRight: '10px'}} />
        <strong>Leaderboard by region </strong>
      </div>
    ),
    achievementList: [
      {
        text: 'Me',
        points: 9000,
      },
      {
        text: 'Barack',
        points: 6000,
      },
      {
        text: 'Michelle',
        points: 4500,
      },
      {
        text: 'Jermaine',
        points: 90000,
      },
    ],
  };

  const achievementListFakeData = {
    title: (
      <div className='list-tile-with-icon'>
        {' '}
        <ChatBubbleOutline style={{color: 'green', marginRight: '10px'}} />{' '}
        <strong>Converstaions with highest reward </strong>
      </div>
    ),
    achievementList: [
      {
        text: 'CFG Session 1',
        points: 9000,
      },
      {
        text: 'CFG Session 2',
        points: 6000,
      },
      {
        text: 'CFG Session 3',
        points: 4500,
      },
      {
        text: 'CFG Session 4',
        points: 90000,
      },
    ],
  };

  const left = (
    <div>
      <br />
      <AchievementList element={achievementListFakeData} />
    </div>
  );

  const right = (
    <div>
      <br />
      <AchievementList element={LeaderboardByGroupFakeData} />
      <br />
      <hr />
      <br />
      <AchievementList element={LeaderboardByRegionFakeData} />
      <br />
      <hr />
      <br />
      <AchievementList element={LeaderboardByGlobalFakeData} />
    </div>
  );

  return (
    <CommonComponent left={left} right={right}>
      <div className='user-achievement-mobile-view'>{right}</div>
      {achievementCardFakeData.map((element, index) => {
        return (
          <div key={index} className='achievement-card-style'>
            <AchievementCard element={element} />
          </div>
        );
      })}

      <br />
      <br />
      <br />
      <Summary pointsAchieved={1000} pointsRedeemed={1000} balance={2000} />
    </CommonComponent>
  );
}
