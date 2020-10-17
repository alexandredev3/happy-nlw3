import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  color: #5c8599;
  font-size: 24px;
  font-family: 'Nunito_700Bold';
  border: 0.8px solid #D3E2E6;
  margin-bottom: 32px;
  padding-bottom: 24px;
`;

export const Label = styled.Text`
  color: #8fa7b3;
  font-family: 'Nunito_600SemiBold';
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput`
  background-color: #fff;
  border: 1.4px solid #d3e2e6;
  border-radius: 20px;
  height: 56px;
  padding: 18px 0;
  padding: 0 24px;
  margin-bottom: 16px;

`;

export const ImagesInput = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.5);
  border: 1.4px dashed #96D2F0;
  border-radius: 20px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

export const UploadedImagesContainer = styled.View`
  flex-direction: row;
`;

export const UploadedImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  margin-bottom: 32px;
  margin-right: 8px;
`;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const NextButtonText = styled.Text`
  font-family: 'Nunito_800ExtraBold';
  font-size: 16px;
  color: #FFF;
`;
