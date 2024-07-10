import { tesloApi } from '../../config/api/tesloApi';
import { ProductMapper } from '../../infraestructure/mappers/product.mapper';

import type { TesloProduct } from '../../infraestructure/interfaces/teslo.products.response';
import { Gender, Product } from '../../domain/entities/product';

const emptyProduct: Product = {
  id: '',
  title: 'Nuevo producto',
  description: '',
  price: 0,
  sizes: [],
  slug: '',
  gender: Gender.Unisex,
  images: [],
  stock: 0,
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') return emptyProduct;
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting product by id: ${id}`);
  }
};
