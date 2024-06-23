import 'react-native-gesture-handler';

import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';

interface Props {}

export const ProductsApp: FC<Props> = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
