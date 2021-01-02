import styled, { css } from 'styled-components';

interface Props {
  read: boolean;
}

interface DotProps {
  active: boolean;
}

const ButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  background: #EBF2F5;

  border-radius: 16px;

  cursor: pointer;
`;

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 8px;
  }
`;

export const NotificationPreview = styled.div<Props>`
  padding: 18px;
  font-size: 14px;
  color: #4D6F80;

  max-height: 300px;
  width: 100%;
  height: 70%;

  border-radius: 20px;

  background: #FFFF;

  > span {
    font-size: 18px;
  }

  ${(props) => props.read 
    ? css`
      opacity: 50%;
      border: 1px solid #D3E2E5;
    ` 
    : css`
      opacity: 100%;
      border: 1px solid #37C77F;
    ` }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    margin-top: 30px;
  }

  > h3 {
    font-size: 21px;
    margin-right: 12px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Dot = styled.div<DotProps>`
  width: 8px;
  height: 8px;

  border-radius: 50%;

  margin-right: 14px;

  background: ${(props) => props.active ? '#37C77F' : '#9CB0BB'};
`;

export const Notification = styled.div`
  display: flex;
  flex-direction: column;

  padding: 18px;
  font-size: 14px;
  color: #4D6F80;

  max-height: 300px;
  width: 100%;

  border: 1px solid #D3E2E5;
  border-radius: 20px;

  background: #FFFF;

  > h3 {
    font-size: 21px;
    margin-top: 8px;
  }

  > span {
    font-weight: bold;
    font-size: 18px;
  }

  > p {
    width: 90%;
    font-size: 18px;
    line-height: 26px;

    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OpenNotificationButton = styled.div`
  margin-right: 8px;
  ${ButtonStyles}
`;

export const DeleteNotificationButton = styled.div`
  ${ButtonStyles}
`;

