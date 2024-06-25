import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, LoginScreen, RegisterScreen, HomeScreen, ProductScreen } from '../screens';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
