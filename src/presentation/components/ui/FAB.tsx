import { Button } from '@ui-kitten/components';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomIcon } from './CustomIcon';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FAB: FC<Props> = ({ iconName, onPress, style }) => {
  return (
    <Button
      style={[style, styles.button]}
      accessoryLeft={<CustomIcon name={iconName} white />}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 13,
  },
});
