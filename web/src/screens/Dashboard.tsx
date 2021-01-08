import React from 'react';

import {
  DashboardPage,
  Content,
  Header,
  Main,
} from '../styles/screens/dashboard';

import { useDashboard } from '../hooks/DashboardContext';

import Sidebar from '../components/SidebarDeshboard';
import RegisteredOrphanages from '../components/OrphanagesCard';

export default function Dashboard() {
  const { orphanages, orphanagesCount } = useDashboard();

  return (
    <DashboardPage>
      <Sidebar />

      <Content>
        <Header>
          <h1>Orfanatos Cadastrados</h1>
          <span>{ orphanagesCount } orfanatos</span>
        </Header>
        <Main>
          { orphanages?.map(({ 
            id,
            name,
            latitude,
            longitude 
          }) => {
            return (
              <RegisteredOrphanages
                key={id}
                title={name}
                latitude={latitude}
                longitude={longitude}
              />
            )
          }) }
        </Main>
      </Content>
    </DashboardPage>
  );
}