import React, { FC, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Layout, List } from '@ui-kitten/components';

import { ProductCard } from './ProductCard';
import { Product } from '../../../domain/entities/product';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList: FC<Props> = ({ products, fetchNextPage }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      // eslint-disable-next-line react/no-unstable-nested-components
      ListFooterComponent={() => <Layout style={styles.container} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
});
