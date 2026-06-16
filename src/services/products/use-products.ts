import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products', { params: { limit: 6 } });
  return data;
}

export const productsQueryKey = ['products'] as const;

export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
  });
}
