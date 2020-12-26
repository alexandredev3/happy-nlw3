import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

type Props = {
  isLoading: boolean;
}

export const Container = styled.button<Props | any>`
  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #37C77F;
  border-radius: 20px;
  color: #FFFFFF;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  > svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36CF82;
  }

  ${
    (props) => props.isLoading 
      ? css`
        cursor: not-allowed;
        opacity: 50%;
        background: #37C77F;
      `
      : css`
        cursor: pointer;
        background: #37C77F;
      `
  }
`;

export const AnimatedCircle = styled(motion.div)`
  svg {
    stroke-width: 1.2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`