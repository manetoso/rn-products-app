import { Button, Icon } from '@ui-kitten/components';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props {}

export const HomeScreen: FC<Props> = () => {
  const { logout } = useAuthStore();
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button accessoryLeft={<Icon name="log-out-outline" />} onPress={logout}>
        Cerrar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
