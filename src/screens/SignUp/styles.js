import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

// componente do módulo native: ScrollView
export const Body = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 40px;
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
