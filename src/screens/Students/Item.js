import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const Div = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

const TextName = styled.Text`
  font-size: 24px;
  text-align: justify;
  color: ${COLORS.white};
`;

const TextSigla = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

const TextModulos = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
  margin-left: 5px;
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextName>{item.name}</TextName>
        <Div>
          <TextSigla>{item.sigla}</TextSigla>
          <TextModulos>{item.modulos}</TextModulos>
        </Div>
      </>
    </Button>
  );
};

export default Item;
