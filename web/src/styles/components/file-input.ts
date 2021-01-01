import styled from 'styled-components';

interface Props {
  error: string | undefined;
}

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
`;

export const NewImageButton = styled.label<Props>`
  height: 96px;
  background: #F5F8FA;
  border: 1px dashed;
  border-color: ${props => props.error ? '#FF669D' : '#96D2F0'};
  border-radius: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImagesPreview = styled.div`
  > img {
    width: 100%;
    height: 96px;
    object-fit: cover;
    border-radius: 20px;
  }

  position: relative;
`;

export const DeleteImageButton = styled.button`
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  position: absolute;
  left: 55px;

  border: 1px solid #D3E2E5;
  border-bottom-left-radius: 50%;
  border-top-right-radius: 50%;

  cursor: pointer;

  > svg {
    margin-top: 4px;
  }
`;

