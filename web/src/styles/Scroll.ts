import { createGlobalStyle } from 'styled-components';

interface Props {
  hide: boolean;
}

export default createGlobalStyle<Props>`
  body {
    overflow: ${props => props.hide ? 'hidden' : 'unset'};
  }
`;