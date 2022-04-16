import React from 'react';
import AdminHeader from 'pages/admin-header';
import Container from '@material-ui/core/Container';
import EarningGraph from './EarningGraph';
import AppCard from '@crema/core/AppCard';
import OrdersGraph from './OrdersGraph';
import './style.css';

export default React.memo(function Dashboard() {
  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>

      <Container>
        {/* <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/fb080705-25ff-4f39-a3a5-9ae015a29976/page/chMoC" frameborder="0" style="border:0" allowfullscreen></iframe> */}
        {/* <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/fb080705-25ff-4f39-a3a5-9ae015a29976/page/chMoC" frameborder="0" style="border:0" allowfullscreen></iframe> */}

        {/* <div className='container-graphs'>
          <div className='graph-container'>
            <AppCard>
              <EarningGraph
                data={[
                  {
                    value: 20,
                    color: '#4299E1',
                  },
                  {value: 40, color: '#38B2AC'},
                  {value: 40, color: '#E53E3E'},
                ]}
              />
            </AppCard>
          </div>
          <div className='graph-container-bar'>
            <AppCard>
              <OrdersGraph
                data={[
                  {value: 10, label: 'hello', color: 'red'},
                  {value: 20, label: 'world', color: 'red'},
                  {value: 30, label: 'javascript', color: 'red'},
                  {value: 40, label: 'react', color: 'red'},
                ]}
              />
            </AppCard>
          </div>
        </div> */}
      </Container>
      <div className='report-chart'>
        <object
          data='https://datastudio.google.com/embed/reporting/fb080705-25ff-4f39-a3a5-9ae015a29976/page/chMoC'
          className='object-tag'>
          Alternative Content
        </object>
      </div>
    </div>
  );
});
