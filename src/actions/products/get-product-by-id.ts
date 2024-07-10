import { tesloApi } from '../../config/api/tesloApi';
import { ProductMapper } from '../../infraestructure/mappers/product.mapper';

import type { TesloProduct } from '../../infraestructure/interfaces/teslo.products.response';
import type { Product } from '../../domain/entities/product';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log({ error });
    throw new Error(`Error getting product by id: ${id}`);
  }
};
