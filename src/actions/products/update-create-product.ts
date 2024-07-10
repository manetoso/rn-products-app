import { isAxiosError } from 'axios';
import { tesloApi } from '../../config/api/tesloApi';
import { Product } from '../../domain/entities/product';

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 1 : Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }
  throw new Error('Creation not implemented');
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;

  try {
    const checkImages = prepareImages(images);

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log({ axiosError: error.response?.data });
    }
    console.log({ error });
    throw new Error(`Error updating product: ${id}`);
  }
};

const prepareImages = (images: string[]) => {
  return images.map(image => image.split('/').pop());
};
