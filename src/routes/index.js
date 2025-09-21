import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Cards from '../screens/Cards';
import Details from '../screens/Details';
import Users from '../screens/Users';   // ⬅️ IMPORTANTE: importar aqui

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Cadastrar Usuário' }}/>
        <Stack.Screen name="Cards" component={Cards} options={{ title: 'Cards' }}/>
        <Stack.Screen name="Details" component={Details} options={{ title: 'Detalhes' }}/>
        <Stack.Screen name="Users" component={Users} options={{ title: 'Usuários Cadastrados' }}/> 
        {/* ⬆️ Agora o Navigator conhece a tela Users */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
