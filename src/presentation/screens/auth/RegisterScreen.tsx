import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {}

export const RegisterScreen: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<Text>RegisterScreen</Text>
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
