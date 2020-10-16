import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`;

export const CalloutContainer = styled.View`
  width: 160px;
  height: 46px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  justify-content: center;

  elevation: 3;
`;

export const CalloutText = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 14px;
  color: #0089a5;
`;

export const Footer = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;

  background: #FFF;
  border-radius: 28px;
  height: 56px;
  padding-left: 24px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* Sombra no Android */
  elevation: 3;

  /* Sombra no iSO, */
  /* shadow: ; */
  /* shadow-opacity: ; */
  /* shadow-color: ; */
  /* shadow-offset: ; */
  /* shadow-radius: ; */
`;

export const FooterText = styled.Text`
  font-family: 'Nunito_700Bold';
  color: #8fa7b3;
`;

export const CreateOrphanageButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  background: #15c3d6;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
`;
