import React from 'react';

import {
  DashboardPage,
  Content,
  Header,
  Main,
} from '../styles/screens/dashboard';

import Sidebar from '../components/SidebarDeshboard';
import PendingOrphanagesCard from '../components/OrphanagesCard';

export default function Dashboard() {
  return (
    <DashboardPage>
      <Sidebar />

      <Content>
        <Header>
          <h1>Orfanatos Cadastrados</h1>
          <span>2 orfanatos</span>
        </Header>
        <Main>
          <PendingOrphanagesCard />
          <PendingOrphanagesCard />
          <PendingOrphanagesCard />
        </Main>
      </Content>
    </DashboardPage>
  );
}