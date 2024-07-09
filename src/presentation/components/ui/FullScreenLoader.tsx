import { Layout, Spinner } from '@ui-kitten/components';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {}

export const FullScreenLoader: FC<Props> = () => {
  return (
    <Layout style={styles.container}>
      <Spinner size="giant" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
