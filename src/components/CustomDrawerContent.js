import React from 'react';
import styled from 'styled-components/native';
import DrawerHeader from '../components/DrawerHeader';
import {AuthUserContext} from '../context/AuthUserProvider';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';

const Page = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: ${COLORS.primaryDark};
`;

const Body = styled.View`
  flex: 6;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 18px;
  padding-top: 30px;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const DivItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`;

const ItemMenuText = styled.Text`
  font-size: 16px;
  margin: 10px;
  color: ${COLORS.primaryDark};
`;

const CustomDrawerContent = ({navigation}) => {
  return (
    <Page>
      <Header>
        <DrawerHeader />
      </Header>

      <Body>
        <ScrollView style={{width: '100%'}}>
          <DivItem>
            <Icon name="school-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Cursos');
              }}>
              Cursos
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <Icon name="people-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Usuarios');
              }}>
              Usuários
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <Icon name="exit-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                alert('implementar isso');
              }}>
              Sair
            </ItemMenuText>
          </DivItem>
        </ScrollView>
      </Body>
    </Page>
  );
};

export default CustomDrawerContent;
