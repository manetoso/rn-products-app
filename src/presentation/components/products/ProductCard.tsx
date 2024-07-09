import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

import { Product } from '../../../domain/entities/product';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}>
      {product.images.length === 0 ? (
        <Image source={require('../../../assets/no-product-image.png')} style={styles.image} />
      ) : (
        <FadeInImage uri={product.images[0]} style={styles.image} />
      )}
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    margin: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    textAlign: 'center',
  },
});
