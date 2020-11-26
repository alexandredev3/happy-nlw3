import React from 'react';

import {
  DashboardPage,
  Content,
  Header,
  Main,
} from '../styles/screens/pending-orphanages';

import Sidebar from '../components/SidebarDeshboard';
import PendingOrphanagesCard from '../components/OrphanagesCard';

export default function Dashboard() {
  return (
    <DashboardPage>
      <Sidebar />

      <Content>
        <Header>
          <h1>Cadastros pendentes</h1>
          <span>2 orfanatos</span>
        </Header>
        <Main>
          <PendingOrphanagesCard isPendingOrphanages />
          <PendingOrphanagesCard isPendingOrphanages />
          <PendingOrphanagesCard isPendingOrphanages />
        </Main>
      </Content>
    </DashboardPage>
  );
}