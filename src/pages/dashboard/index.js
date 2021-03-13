import React from 'react';
import AdminHeader from 'pages/admin-header';
import Container from '@material-ui/core/Container';
import EarningGraph from './EarningGraph';
import AppCard from '@crema/core/AppCard';
import OrdersGraph from './OrdersGraph';
import './style.css';

export default function index() {
  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>

      <Container>
        <div className='container-graphs'>
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
        </div>
      </Container>
    </div>
  );
}
