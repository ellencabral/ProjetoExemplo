import styled from 'styled-components/native';

import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
`;
