import React, { FC, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';

import { genders, sizes } from '../../../config/constants/constants';
import { getProductById, updateCreateProduct } from '../../../actions/products';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { ProductImageSlideShow } from '../../components/products';
import { MainLayout } from '../../layouts/MainLayout';
import { LoadingScreen } from '..';

import type { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import type { Product } from '../../../domain/entities/product';
import type { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends NativeStackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen: FC<Props> = ({ route }) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: product,
  } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductById(productIdRef.current),
  });
  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', productIdRef.current],
      });
    },
  });
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError || !product) {
    return (
      <MainLayout title="Product">
        <Text>Cannot get product, go back and try again later</Text>
      </MainLayout>
    );
  }
  return (
    <Formik initialValues={product} onSubmit={mutation.mutate}>
      {({ handleChange, handleSubmit, setFieldValue, values }) => (
        <MainLayout title={values.title} subtitle={`$${values.price}`}>
          <ScrollView style={styles.container}>
            <Layout>
              <ProductImageSlideShow images={values.images} />
            </Layout>
            <Layout style={styles.wrapper}>
              <Input
                label="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                style={styles.input}
              />
              <Input
                label="Slug"
                value={values.slug}
                onChangeText={handleChange('slug')}
                style={styles.input}
              />
              <Input
                label="Description"
                value={values.description}
                onChangeText={handleChange('description')}
                multiline
                numberOfLines={5}
                style={styles.input}
              />
            </Layout>
            <Layout style={styles.infoContainer}>
              <Input
                label="Price"
                keyboardType="numeric"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={[styles.input, styles.infoInput]}
              />
              <Input
                label="Inventory"
                keyboardType="numeric"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={[styles.input, styles.infoInput]}
              />
            </Layout>
            <ButtonGroup style={styles.buttonGroup} size="small" appearance="outline">
              {sizes.map(size => (
                <Button
                  key={size}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={[
                    styles.button,
                    {
                      backgroundColor: values.sizes.includes(size)
                        ? theme['color-primary-200']
                        : undefined,
                    },
                  ]}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup style={styles.buttonGroup} size="small" appearance="outline">
              {genders.map(gender => (
                <Button
                  key={gender}
                  onPress={() => setFieldValue('gender', gender)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: values.gender.startsWith(gender)
                        ? theme['color-primary-200']
                        : undefined,
                    },
                  ]}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>
            <Button
              accessoryLeft={<CustomIcon name="save-outline" white />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={styles.buttonGroup}>
              Save
            </Button>
            <Layout style={styles.footer} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 10,
  },
  input: {
    marginVertical: 5,
  },
  infoContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
  },
  infoInput: {
    flex: 1,
  },
  buttonGroup: {
    margin: 2,
    marginTop: 20,
    marginHorizontal: 15,
  },
  button: {
    flex: 1,
  },
  footer: {
    height: 250,
  },
});
