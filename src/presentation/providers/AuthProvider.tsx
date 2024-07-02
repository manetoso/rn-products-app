import React, { FC, useEffect, type PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuthStore } from '../store/auth/useAuthStore';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParams } from '../navigation/StackNavigator';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};
