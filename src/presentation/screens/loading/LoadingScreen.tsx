import { Spinner } from '@ui-kitten/components';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {}

export const LoadingScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Spinner status="primary" size="large" />
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
