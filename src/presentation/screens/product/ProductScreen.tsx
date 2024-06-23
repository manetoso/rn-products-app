import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {}

export const ProductScreen: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<Text>ProductScreen</Text>
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
