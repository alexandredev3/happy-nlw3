import styled, { css } from 'styled-components';

interface Props {
  read: boolean;
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
  align-items: column;
`;

export const NotificationPreview = styled.div<Props>`
  display: flex;
  align-items: center;

  padding: 18px;
  font-size: 14px;
  color: #4D6F80;

  max-height: 300px;
  width: 450px;
  height: 80%;


  border-radius: 20px;

  background: #FFFF;

  > h3 {
    font-size: 19px;
    margin-right: 12px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  > p {
    margin-top: 30px;
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

export const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: column;

  padding: 18px;
  font-size: 14px;
  color: #4D6F80;

  max-height: 300px;
  width: 450px;

  border: 1px solid #D3E2E5;
  border-radius: 20px;

  background: #FFFF;

  > h3 {
    font-size: 19px;
  }

  > p {
    font-size: 16px;
    line-height: 18px;

    margin-top: 4px;
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

