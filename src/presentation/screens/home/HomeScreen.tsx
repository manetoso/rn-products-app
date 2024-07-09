import React, { FC } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';

import { getProductsByPage } from '../../../actions/products/get-products-by-page';

interface Props {}

export const HomeScreen: FC<Props> = () => {
  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1hr,
  //   queryFn: () => getProductsByPage(0),
  // });
  // HERE data IS AND ARRAY OF ARRAYS: [[p1,p2,p3],[p4,p5,p6]]
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1hr,
    initialPageParam: 0,
    queryFn: async params => await getProductsByPage(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  return (
    <MainLayout
      title="TesloShop - Products"
      // rightAction={logout}
      // rightActionIcon="log-out-outline"
      subtitle="Administrative App">
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList products={data?.pages.flat() ?? []} fetchNextPage={fetchNextPage} />
      )}
    </MainLayout>
  );
};
