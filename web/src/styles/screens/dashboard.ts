import styled from 'styled-components';

export const DashboardPage = styled.div`
  display: flex;

  .orphanages__button {
    background: #FFD666;

    svg {
      stroke: #0089A5;
    }

    &:hover {
      background: #ffe18f;
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  max-width: 900px;
  margin: 28px auto;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #D3E2E5;
  padding: 20px 0;

  > h1 {
    color: #4D6F80;
  }

  > span {
    color: #8FA7B2;
  }
`;

export const Main = styled.div`
  margin-top: 38px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;