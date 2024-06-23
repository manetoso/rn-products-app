import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {}

export const LoginScreen: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<Text>LoginScreen</Text>
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
