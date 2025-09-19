import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../screens/Login';
import Register from '../screens/Register';
import Cards from '../screens/Cards';
import Details from '../screens/Details';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register} options={{title:`cadastrar usuário`}}/>
                <Stack.Screen name="Cards" component={Cards} options={{title:`Cards`}}/>
                <Stack.Screen name="Details" component={Details} options={{title:`Detalhes`}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );


}