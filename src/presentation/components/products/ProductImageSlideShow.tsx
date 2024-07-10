import React, { FC } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
  images: string[];
}

export const ProductImageSlideShow: FC<Props> = ({ images }) => {
  return (
    <>
      {images.length === 0 && (
        <FadeInImage uri="https://via.placeholder.com/300" style={styles.image} />
      )}
      <FlatList
        data={images}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <FadeInImage uri={item} style={styles.image} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
});
