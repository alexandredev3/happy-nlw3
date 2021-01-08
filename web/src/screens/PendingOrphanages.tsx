import React from 'react';

import {
  DashboardPage,
  Content,
  Header,
  Main,
} from '../styles/screens/pending-orphanages';

import Sidebar from '../components/SidebarDeshboard';
import PendingOrphanagesCard from '../components/OrphanagesCard';
import { useDashboard } from '../hooks/DashboardContext';

export default function PendingOrphanages() {
  const { pendingOrphanages, pendingOrphanagesCount } = useDashboard()

  return (
    <DashboardPage>
      <Sidebar />

      <Content>
        <Header>
          <h1>Cadastros pendentes</h1>
          <span>{ pendingOrphanagesCount } orfanatos</span>
        </Header>
        <Main>
          { pendingOrphanages?.map(({ 
            name,
            latitude,
            longitude 
          }) => {
            return (
              <PendingOrphanagesCard 
                isPendingOrphanages 
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